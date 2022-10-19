//web api
const baseUrl = "https://platzi-avo.vercel.app";
const appNode = document.querySelector('#app')

const formatPrice = (price) => {
    //API de internacionalizacion intl 
    //intl recibe 2 parametros el idioma y
    // opciones de estilo moneda y la modeda que va a usar
    const newPrice = new window.Intl.NumberFormat('en-EN', {
        style: "currency",
        currency: "USD"
    }).format(price);

    return newPrice;
}


//fecth la usamos para traer recursos desde cualquier sitio web

//debemos conectarnos al servidor
// fetch es alho que me devulve una promesa
 window.fetch(`${baseUrl}/api/avo`)

//procesar la respuesta y convertirla en JSON
.then((respuesta) => respuesta.json())

//ahora que tenemos el JSON -> ya tenemos data -> y esta es la que vamos a renderizar en 
//el browser
.then(respuestaJson =>{
    const todosLosItems = [];
    respuestaJson.data.forEach(item => {
        //crear imagen
        const image = document.createElement('img');
        //agregamos el contenido, le damos la url de la imagen
        image.src = `${baseUrl}${item.image}`;
        image.className = "h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6 "

        //crear titulo
        const title = document.createElement('h2');
        //agregamos el contenido
        title.textContent = item.name;
        //estilos
        title.className = "text-lg"
        

        //craer precio
        const price = document.createElement('div');
        //agregamos el contenido
        price.textContent = formatPrice(item.price); 
        //estilos
        price.className = "text-gray-600"

        const container = document.createElement('div');
        container.append(image,title,price);
        container.className = "rounded overflow-hidden shadow-lg"

        //para no modificar varias veces el DOM, lo guardamos en un array
        todosLosItems.push(container)
    });
    //y lo agregamos todo una sola vez
    appNode.append(...todosLosItems);
    appNode.className = "p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5"
})
