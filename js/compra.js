let formulario = document.getElementById('profile-form');
let listarCompras = document.getElementById('listarCompras');
let borra = []

const pintartabla =  async () =>{

    let resp1 = await fetch('http://localhost:4006/compras');
    let data1 = await resp1.json();
    console.log(data1);
    data1.forEach(compra => {
    const { imagenC,nomC,precioC,cantidadC, id } = compra;
    
        let SubTotal = precioC * cantidadC;
        
        listarCompras.innerHTML += `
                            <td><img  id= "imgComp" src="${imagenC}" alt=""></td>
                            <td>${nomC}</td>
                            <td>${precioC}</td>
                            <td><button id="${id}" class="less">-</button>  ${cantidadC} <button id="${id}" class="plus">+</button> </td>
                            <td>${SubTotal} <button id="${id}" class="less">X</button></td>
        `  
        document.getElementById('subtotal').textContent = SubTotal;
        document.getElementById('total').textContent = SubTotal; 
        localStorage.setItem("total", SubTotal)
    })
  
}

document.addEventListener('DOMContentLoaded',pintartabla);
procesarCompra.addEventListener("click", (e) =>{
    e.preventDefault();
   let totaliza = localStorage.getItem('total')
  document.getElementById("top").value = totaliza;
  document.getElementById('containerCompra').style.display = "none"
  document.getElementById('containerPago').style.display = "block"
  vaciar()
})
const restar = async(id2) =>{
    console.log(id2)
    let idModificar = id2;
    let resp5 = await fetch('http://localhost:4006/compras');
    let data5 = await resp5.json();
    console.log(data5);
    let modificar = data5.find(user5 => user5.id == idModificar)
    console.log(modificar);
    const {imagenC,nomC,precioC,cantidadC, id} = modificar;
    let cantidadC1 = cantidadC - 1;
    if (cantidadC1 < 1) {
        alert('la cantidad es invalida')
    }else{
    let resp2 = await fetch(`http://localhost:4006/compras/${idModificar}`, {
    method: 'PUT',
    body: JSON.stringify({
        idModificar ,
        nomC,
        precioC,
        imagenC,
        id,
        cantidadC: cantidadC1

    }),
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    }
}) 
    }
}
const sumar = async(id2) =>{
    console.log(id2)
    let idModificar = id2;
    let resp5 = await fetch('http://localhost:4006/compras');
    let data5 = await resp5.json();
    console.log(data5);
    let modificar = data5.find(user5 => user5.id == idModificar)
    console.log(modificar);
    const {imagenC,nomC,precioC,cantidadC,iddata, cantidadZ,id} = modificar;
    let cantidadC1 = cantidadC + 1;
    let resp2 = await fetch(`http://localhost:4006/compras/${idModificar}`, {
    method: 'PUT',
    body: JSON.stringify({
        idModificar ,
        nomC,
        precioC,
        imagenC,
        id,
        cantidadC: cantidadC1

    }),
    headers: {
        "Content-Type": "application/json; charset=UTF-8"
    }
}) 
}
const borrar = async(id2) =>{
    console.log(id2)
    let idModificar = id2;

    
    let resp = await fetch(`http://localhost:4006/compras/${idModificar}`,{
        method: 'DELETE',
    })

}
listarCompras.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target.innerHTML == '-') {
        let id2 = e.target.id;

        restar(id2);
    }
    if (e.target.innerHTML == '+') {
        let id2 = e.target.id;

        sumar(id2);
    }
    if (e.target.innerHTML == 'X') {
        let id2 = e.target.id;

        borrar(id2);
    }
})
formulario.addEventListener("submit", (e) =>{
    e.preventDefault()
    // swal("Genial", "¡tu pago se realizo con exito! Gracias por tu compra", "success" );
    borrartodo()
    
    localStorage.setItem('Borra',0);
    // document.getElementById('profile-form').reset();
})

const vaciar = async () =>{
   
    let resp1 = await fetch('http://localhost:4006/compras');
    let data1 = await resp1.json();
    console.log(data1);
    data1.forEach(compra => {
    const { id } = compra;
       let idB = id;
       borra.push(idB);
       localStorage.setItem('Borra',JSON.stringify(borra));
    })
  
}
const borrartodo = async () =>{
    let data = JSON.parse(localStorage.getItem('Borra'));
    console.log(data);
    data.forEach(elemento => {
        console.log(elemento)
        elemento
        borrar(elemento)
        
    })
}


