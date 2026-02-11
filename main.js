//*************************************************//
//*******REDIRECCION A INSTAGRAM O WHATSAPP*********//
document.addEventListener("DOMContentLoaded", function()
{
    const INSTAGRAM = document.querySelector(".instagram");
    const WHATSAPP = document.querySelector(".whatsapp");

    INSTAGRAM.addEventListener("click", function()
    {   window.open("https://www.instagram.com/candy_dyma/", "_blank");});

    WHATSAPP.addEventListener("click", function()
    {   window.open("https://api.whatsapp.com/send?phone=5401167211393&text=Hola, quisiera consultar por el servicio de Candy Dyma", "_blank");} )
});

//*************************************************//
//*******MENSAJE EN FORMULARIOS REQUERIDOS*********//
document.addEventListener("DOMContentLoaded", function(){
    //Seleccionamos todos los campos requeridos del formulario
    const inputs = document.querySelectorAll("input, textarea, select");

    inputs.forEach(input => {
        //1. Cuando el campo es invalido (se intenta enviar vacio o mal formato)
        input.addEventListener("invalid", function(){
            if (this.validity.valueMissing){
                //Mensaje si el campo esta vacio
                this.setCustomValidity("Este campo es necesario para poder contactarte. 😅");
            }
            else if (this.validity.patternMismatch){
                //Mensaje si el campo esta vacio    
                this.setCustomValidity("El formato no es correcto. Revisa los números.");
            }
            else if (this.validity.tooShort){
                //Mensaje si el texto es muy corto.
                this.setCustomValidity(`Debes escribir al menos ${this.minLength} caracteres.`);
            }
            else {
                //Mensaje por defecto.
                this.setCustomValidity("Por favor, revisa este campo.");
            }
        });
        //2. Limpiar el mensaje en cuanto el usuario comienza a escribir nuevamente.
        input.addEventListener("input", function(){
            this.setCustomValidity("");
        });
    });
});

// *********************************************** //
/* ============ CONTADOR DE CARACTERES ============= */
const textarea = document.getElementById("mensajeUsuario");
const charCount = document.getElementById("char-count");

if (textarea)
{
    textarea.addEventListener("input", () => {
        const currentLength = textarea.value.length;
        charCount.innerText = `${currentLength} / 300`;
    
        // Un toque extra: ponerlo en rojo si llega al límite
        if (currentLength >= 250) {
            charCount.classList.add("text-danger");
        } else {
            charCount.classList.remove("text-danger");
        }
    });    
}

/* ================================================= */
/* ============ ENVÍO DE FORMULARIO ================ */
var form = document.getElementById("my-form");
//Funcion para generar HTML de alerta personalizado con Bootstrap
function showAlert(message, type)
{
    var status = document.getElementById("my-form-status");
    let icon = "";

    //Seleccionamos el icono segun el tipo de alerta
    switch(type){
        case "success": icon= "fa-check-circle"; break;
        case "danger":  icon= "fa-exclamation-triangle"; break;
        case "warning": icon= "fa-exclamation-circle"; break;
        default:        icon= "fa-info-circle";
    }
    
    //Creamos el msj personalizado 
    status.innerHTML = `
    <div class="alert alert-${type} d-flex align-items-center alert-dismissible fade show w-100 text-start" role="alert" style="margin-top: 20px;"> 
        <i class="fas ${icon} me-2" style="font-size: 1.2rem;"></i>
        <div style="flex-grow: 1; padding-right: 20px;">
            ${message}
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
    </div>`;
}

async function handleSubmit(event) 
{
    event.preventDefault() /*previene y evita el cambio de pagina*/
    const formElement = event.target;
    var data = new FormData(formElement);
    
    // 1. Extraemos los valores 'name' del HTML para validar
    const nombre= data.get("nombre")?.trim() || "";
    const telefono= data.get("telefono")?.trim() || "";
    const mensaje = data.get("mensaje")?.trim() || "";

    // 2. Validaciones personalizadas
    // Validacion de nombre (3-30 caracteres)
    if (nombre.length < 3 || nombre.length > 30) 
        {
            showAlert("El nombre debe tener entre 3 y 30 caracteres. ✍️", "danger");
            return;
        }
    
    // Validacion de telefono
    const telRegex = /^(\+\d{1,3})?\d{10,13}$/ ;
    if(!telRegex.test(telefono)){
        showAlert("El telefono debe enpezar con + ('codigo area') o 10 y 13 dígitos en total. 📞", "danger");
        return;
    }

    // Validacion del mensaje 
    if (mensaje.length === 0)
    {
        showAlert("No olvides contarnos sobre tu evento! 😊", "warning");
        return;
    }
    else if (mensaje.length > 300)
    {
        showAlert("El mensaje es muy largo (maximo 300 caracteres). ✂️", "danger");
        return;
    }
  
    // 3. Si la validacion esta bien, enviamos a Formspree
    fetch(formElement.action, 
    {
        method: formElement.method,
        body: data,
        headers: {'Accept': 'application/json'}
    }).then(response =>
    {
        if(response.ok) 
        {
            showAlert("Gracias por contactarnos! en breve recibirá respuesta 🎉" , "success");
            formElement.reset();
            charCount.innerText = "0 / 300"; // Reiniciamos el contador visual
            charCount.classList.remove("text-danger");
        }
        else
        {
            showAlert("Hubo un problema con el servidor. Intenta más tarde. ⚠️", "warning");  
        }
    }).catch(error => 
        {
            showAlert("Error de conexión. Revisa tu internet. 🌐", "danger");
        });    
}

if (form) {form.addEventListener("submit", handleSubmit);} 