var form = document.getElementById("my-form");

const textarea = document.getElementById("exampleFormControlTextarea1");
const charCount = document.getElementById("char-count");

textarea.addEventListener("input", () => {
    const currentLength = textarea.value.length;
    charCount.innerText = `${currentLength} / 200`;
    
    // Un toque extra: ponerlo en rojo si llega al límite
    if (currentLength >= 200) {
        charCount.classList.add("text-danger");
    } else {
        charCount.classList.remove("text-danger");
    }
});


//Funcion para generar HTML de alerta personalizado con Bootstrap
function showAlert(message, type)
{
    var status = document.getElementById("my-form-status");
    let icon = "";

    //Seleccionamos el icono segun el tipo de alerta
    if (type === "seccess") icon = "#check-circle-fill";
    else if (type === "danger") icon = "#exclamation-triangle-fill";
    else if (type === "warning") icon = "#exclamation-triangle-fill";
    else icon = "#info-fill"; 

    //Creamos el msj personalizado 
    status.innerHTML = 
    `<div class= "alert alert-${type} d-flex align-items-center alert-dismissible fade show" role= "alert"> 
        <svg class= "bi flex-shrink-0 me-2" role= "img" width"24" height="24"><use xlink:href="${icon}"/></svg>
         <div> ${message}</div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>

    </div>`;
}

async function handleSubmit(event) 
{
    event.preventDefault() /*previene y evita el cambio de pagina*/
    const formElement = event.target;
    var data = new FormData(event.target)
    
    // 1. Extraemos los valores para validar
    const nombre= data.get("nombre").trim();
    const telefono= data.get("telefono").trim();
    const mensaje = data.get("texto ingresado").trim();

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
    fetch(event.target.action, 
    {
        method: form.method,
        body: data,
        headers: {'Accept': 'application/json'}
    }).then(response =>
    {
        if(response.ok) 
        {
            showAlert("Gracias por contactarnos! en breve recibirá respuesta 🎉" , "success");
            formElemnt.reset();
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

form.addEventListener("submit", handleSubmit);