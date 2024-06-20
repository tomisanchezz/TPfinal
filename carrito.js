document.addEventListener('DOMContentLoaded', () => {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoEnlace = document.getElementById('carrito-enlace');

    const actualizarCarritoEnlace = () => {
        let total = 0;
        carrito.forEach(producto => {
            total += producto.precio;
        });
        if (carritoEnlace) {
            carritoEnlace.textContent = `Carrito de compras ($${total.toFixed(2)})`;
        }
    };

    const actualizarCarrito = () => {
        let carritoLista = document.getElementById('carrito-lista');
        let carritoTotal = document.getElementById('carrito-total');

        if (carritoLista) {
            carritoLista.innerHTML = '';
        }

        let total = 0;
        carrito.forEach((producto, index) => {
            const li = document.createElement('li');
            li.textContent = `${producto.nombre} - $${producto.precio}`;
            if (carritoLista) {
                carritoLista.appendChild(li);
            }

            total += producto.precio;
        });

        if (carritoTotal) {
            carritoTotal.textContent = total.toFixed(2);
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarCarritoEnlace();
    };

    const agregarAlCarrito = (producto) => {
        carrito.push(producto);
        actualizarCarrito();
    };

    const botones = document.querySelectorAll('.add-to-cart');
    botones.forEach((boton) => {
        boton.addEventListener('click', () => {
            const producto = {
                nombre: boton.getAttribute('data-product'),
                precio: parseFloat(boton.getAttribute('data-price'))
            };

            agregarAlCarrito(producto);
        });
    });

    actualizarCarritoEnlace(); // Update the cart link on page load
});
