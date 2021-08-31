const divImagen = document.getElementById('product');


const verProductos = async () => {
 divImagen.innerHTML="";
 const response = await fetch('http://localhost:4000/productos');
 const data = await response.json();

 data.forEach(productos => {
     const {categoria,title,precio,descripcion,thumbnailUrl} = productos;
     divImagen.innerHTML +=`
     <div class="col">
     <div class="card">
       <a href="">
         <img src="${thumbnailUrl.img2}">
       </a>            
       <div class="card-body">
         <h5 class="card-title">${title}</h5>
         <p class="card-text">${categoria}</p>
         <p class="card-text">${descripcion}</p>
         <p class="card-text">$ ${precio}</p>
         <button class="btn btn-dark">Comprar</button>
       </div>
     </div>
 </div>    
     `;
 });
}

verProductos();


