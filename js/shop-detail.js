class UI {

  async checkAdd () {
    const id = localStorage.getItem('idProduct');
    const size = localStorage.getItem('size').toUpperCase();
    const data = (await (await fetch('http://localhost:4000/productos')).json()).find(e => e.id == id);

    if (data.cantidad[size] > 0) {
      data.cantidad[size]--;
      this.addProduct(data);

      await fetch(`http://localhost:4000/productos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json; charset=UTF-8" }
      });
      return data;

    } else {
      Swal.fire("No más productos de esa talla");
      return false;
    }
  }



  addProduct (data) {
    const currCompra = JSON.parse(localStorage.getItem('Compra'));
    const id = localStorage.getItem('idProduct');
    const size = localStorage.getItem('size');
    
    if (currCompra.some(e => e.id == id)) {
      currCompra.find(e => e.id == id).cantidad ++;
      alert("zsd");

    } else { 
      console.log(data.cantidad[size])
      currCompra.push({
        "img": data.thumbnailUrl.img1,
        "nombre": data.title ,
        "precio": data.precio,
        "cantidad": 4 - data.cantidad[size],
        "size": data.cantidad[size],
        "id": data.id,
      });
    }
    
    localStorage.setItem('Compra', JSON.stringify(currCompra));
  }

  changeSizeStyle (allSize, size) {
    allSize.querySelectorAll('.size').forEach(e => e.style.border = '.2rem solid #ffffff');
    size.style.border = '.2rem solid #000000';
  }

  async showProduct () {
    const id = localStorage.getItem('idProduct');
    const data = (await (await fetch('http://localhost:4000/productos')).json()).find(e => e.id == id);
    const {thumbnailUrl, title, precio, descripcion} = data;

    document.getElementById('injeccion').innerHTML =
    `  
    <div class="col-md-2"> 
      <div class="model-2"> <img src="${thumbnailUrl.img1}" alt=""> </div>
      <div class="model-2"> <img src="${thumbnailUrl.img2}" alt=""> </div>
      <div class="model-2"> <img src="${thumbnailUrl.img3}" alt=""> </div>
    </div>
    <div class="col-md-4">
      <div class="model-1"> <img src="${thumbnailUrl.img1}" alt=""> </div>
      <div class="model-1"> <img src="${thumbnailUrl.img2}" alt=""> </div>
      <div class="model-1"> <img src="${thumbnailUrl.img3}" alt=""> </div>
    </div>
    <div class="col-md-5">
      <h2 class="titulo-1"> ${title} </h2>
      <div class="precio">
        <h3 class="card-title pricing-card-title ">$<span class=""> ${precio} </span></h3>
      </div>  
      <div class="tallas"  id="Ticki">
        <p> ${descripcion} </p>
      <div class="texto">
      </div>
        <h5> Size </h5>
        <span><img src="./img/S.png" id="s" class="size"></span>
        <span><img src="./img/M.png" id="m" class="size"></span>
        <span><img src="./img/L.png" id="l" class="size"></span>
        <span><img src="img/XL.png" id="xl" class="size"></span>
      </div>
      <div class="but-ons">
        <button type="button" class="btn btn-primary" id="addCard" > ADD TO CART </button>
      </div>
      <div class="but-ons off-less">
        <button type="button" class="btn btn-dark" id="compraH"> BUY IT NOW </button>  <!--ENLACE A CARRITO -->
      </div>  
    </div>
    `

    return "true";
  }
}

window.addEventListener('DOMContentLoaded', e =>{
  const userInterface = new UI();
  const currCompra = JSON.parse(localStorage.getItem('Compra')) || [];
  localStorage.removeItem('size');
  localStorage.setItem('Compra', JSON.stringify(currCompra));
  userInterface.showProduct();
});


document.getElementById('injeccion').addEventListener('click', e => {
  const userInterface = new UI();

  if(e.target.classList.contains('size')){
    localStorage.setItem('size', e.target.id);
    userInterface.changeSizeStyle(e.target.parentElement.parentElement, e.target);
  }
  
  if(e.target.id == 'addCard'){
    if(localStorage.getItem('size'))
      userInterface.checkAdd();
      cargaCarrito()
  }
  if(e.target.id == 'compraH'){
    if(localStorage.getItem('size'))
      userInterface.checkAdd();
      cargaCarrito()
      window.open('compra.html', '_self');
  }


});


const cargaCarrito = async () =>{  
  let detCompra = JSON.parse(localStorage.getItem('Compra'));  
  
  detCompra.forEach(comp => {
    const { id, img, nombre, precio, size } = comp;
    postCarrito(id, img, nombre, precio, size)
  })
  }
  const postCarrito = async (id, img, nombre, precio, size) =>{    
  
    let resp = await fetch('http://localhost:4006/compras',{
        method: 'POST',
        body: JSON.stringify({
        
        nomC: nombre,
        precioC: precio,
        imagenC: img,
        cantidadC: 1,
        iddata: id,
        cantidadZ: size
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })
  }