var form = document.getElementById("my-form");

console.log(form);

async function handleSubmit(event) {
    event.preventDefault() /*previene y evita el cambio de pagina*/
    var status = document.getElementById("my-form-status")
    var data = new FormData(event.target)
    fetch(event.target.action, 
    {
        method: form.method,
        body: data,
        headers: {'Accept': 'application/json'}
    }).then(response =>
    {
        if(response.ok) 
        {
            status.innerHTML = "Gracias por contactarnos! en breve recibirá respuesta!";
            form.reset();
        }
        else
        {
            response.json().then(data =>
            {
                if (Object.hasOwn(data, 'errors'))
                {
                    status.innerHTML = data["errors"].map(error => error["message"]).join(", ") 
                }
                else
                {
                    status.innerHTML = "Error al enviar el formulario de consulta."
                }
            })
        }
    }).catch(error => 
        {
            status.innerHTML= "Error al enviar el formulario de consulta."
        });    
}

form.addEventListener("submit", handleSubmit);