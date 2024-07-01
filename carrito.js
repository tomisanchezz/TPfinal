document.addEventListener('DOMContentLoaded', function() {
    var carrito = JSON.parse(localStorage.getItem('carrito')) || []; //si no recupera el carrito lo inica como vacio
    var carritoEnlace = document.getElementById('carrito-enlace');
    var carritoTotalElement = document.getElementById('carrito-total');

    function actualizarCarritoEnlace() {
        var total = 0;
        carrito.forEach(function(producto) {
            total += producto.precio;
        });
        if (carritoEnlace) {
            carritoEnlace.textContent = `Carrito de compras ($${total.toFixed(2)})`;
        }
    }

    function actualizarCarrito() {
        var carritoLista = document.getElementById('carrito-lista');

        if (carritoLista) {
            carritoLista.innerHTML = '';
        }

        var total = 0;
        carrito.forEach(function(producto, index) {
            var li = document.createElement('li');
            li.innerHTML = `${producto.nombre} - $${producto.precio} <button class="remove-from-cart" data-index="${index}">Eliminar</button>`; //creo el botton aca para que se agregue al li unicamente y sea mejor el manejo de los botones
            if (carritoLista) {
                carritoLista.appendChild(li); //se le agrega el "texto" al li
            }

            total += producto.precio;
        });

        if (carritoTotalElement) {
            carritoTotalElement.textContent = total.toFixed(2);
        }

        localStorage.setItem('carrito', JSON.stringify(carrito)); //guarda el estado actual del carro en localstorage
        actualizarCarritoEnlace();
        //añadir events para que los botones de eliminar creados arriba funcionen.
        var removeButtons = document.querySelectorAll('.remove-from-cart');
        removeButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                var index = parseInt(button.getAttribute('data-index')); //con el indice del producto lo elimina
                eliminarDelCarrito(index);
            });
        });
    }

    function agregarAlCarrito(producto) {
        carrito.push(producto); //agrega al array carrito el producto
        actualizarCarrito();
    }

    function eliminarDelCarrito(index) {
        carrito.splice(index, 1); //elimina del array carrito el producto con su indice
        actualizarCarrito();
    }

    var botones = document.querySelectorAll('.add-to-cart');
    botones.forEach(function(boton) {
        boton.addEventListener('click', function() {
            var producto = { //creo el produco con el nombre y precio correspondiente
                nombre: boton.getAttribute('data-product'),
                precio: parseFloat(boton.getAttribute('data-price'))
            };

            agregarAlCarrito(producto); //lo agrego
        });
    });

    actualizarCarrito(); //Llama a la función para actualizar la visualización del carrito cuando se carga la página.


});
