document.addEventListener('DOMContentLoaded', function() {
    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];
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
            li.innerHTML = `${producto.nombre} - $${producto.precio} <button class="remove-from-cart" data-index="${index}">Eliminar</button>`;
            if (carritoLista) {
                carritoLista.appendChild(li);
            }

            total += producto.precio;
        });

        if (carritoTotalElement) {
            carritoTotalElement.textContent = total.toFixed(2);
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarritoEnlace();

        // Add event listeners for remove buttons
        var removeButtons = document.querySelectorAll('.remove-from-cart');
        removeButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                var index = parseInt(button.getAttribute('data-index'));
                eliminarDelCarrito(index);
            });
        });
    }

    function agregarAlCarrito(producto) {
        carrito.push(producto);
        actualizarCarrito();
    }

    function eliminarDelCarrito(index) {
        carrito.splice(index, 1);
        actualizarCarrito();
    }

    var botones = document.querySelectorAll('.add-to-cart');
    botones.forEach(function(boton) {
        boton.addEventListener('click', function() {
            var producto = {
                nombre: boton.getAttribute('data-product'),
                precio: parseFloat(boton.getAttribute('data-price'))
            };

            agregarAlCarrito(producto);
        });
    });

    actualizarCarrito(); // Update the cart on page load
});
