var productos = [
    { nombre: 'camisa', precio: 300 },
    { nombre: 'pantalon', precio: 500 },
    { nombre: 'zapatos', precio: 400 },
    { nombre: 'sombrero', precio: 200 }
];

var carrito = [];

function mostrarMenuCliente() {
    let menu = "Seleccione un producto para agregar al carrito:\n";
    productos.forEach((producto, index) => {
        menu += `${index + 1}. ${producto.nombre} - $${producto.precio}\n`;
    });
    menu += `${productos.length + 1}. Ver Carrito y Total\n`;
    menu += `${productos.length + 2}. Finalizar Compra\n`;
    menu += `${productos.length + 3}. Salir`;
    return menu;
}

function agregarAlCarrito(indice) {
    const productoSeleccionado = productos[indice];
    const productoEnCarrito = carrito.find(item => item.nombre === productoSeleccionado.nombre);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({ ...productoSeleccionado, cantidad: 1 });
    }
    alert(`'${productoSeleccionado.nombre}' ha sido agregado al carrito.`);
}

function verCarritoYTotal() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    let mensajeCarrito = "--- Carrito de Compras ---\n";
    let total = 0;
    carrito.forEach((item, index) => {
        mensajeCarrito += `${index + 1}. ${item.nombre} (x${item.cantidad}) - $${item.precio * item.cantidad}\n`;
        total += item.precio * item.cantidad;
    });
    mensajeCarrito += `\nTotal a pagar: $${total}\n`;
    mensajeCarrito += "\n¿Deseas eliminar algún producto? (Escribe el número del producto o 'no')";

    let respuesta = prompt(mensajeCarrito);

    if (respuesta && respuesta.toLowerCase() !== 'no') {
        let indiceAEliminar = parseInt(respuesta) - 1;
        eliminarDelCarrito(indiceAEliminar);
    }
}

function eliminarDelCarrito(indice) {
    if (indice >= 0 && indice < carrito.length) {
        const productoEliminado = carrito[indice];
        if (productoEliminado.cantidad > 1) {
            productoEliminado.cantidad--;
            alert(`Se ha reducido la cantidad de '${productoEliminado.nombre}'.`);
        } else {
            carrito.splice(indice, 1);
            alert(`'${productoEliminado.nombre}' ha sido eliminado del carrito.`);
        }
    } else {
        alert("Opción no válida.");
    }
}

function mostrarMenuAdmin() {
    return prompt(
        "--- Panel de Administrador ---\n" +
        "1. Agregar nuevo producto\n" +
        "2. Eliminar producto existente\n" +
        "3. Actualizar precio de un producto\n" +
        "4. Ver inventario\n" +
        "5. Volver al menú principal"
    );
}

function agregarProducto() {
    let nombre = prompt("Ingresa el nombre del nuevo producto:");
    let precio = parseFloat(prompt("Ingresa el precio del nuevo producto:"));

    if (nombre && !isNaN(precio)) {
        productos.push({ nombre, precio });
        alert(`Producto '${nombre}' agregado correctamente.`);
    } else {
        alert("Datos inválidos. No se pudo agregar el producto.");
    }
}

function eliminarProducto() {
    let lista = "Selecciona el producto a eliminar:\n";
    productos.forEach((p, i) => {
        lista += `${i + 1}. ${p.nombre}\n`;
    });
    let indice = parseInt(prompt(lista)) - 1;

    if (indice >= 0 && indice < productos.length) {
        let eliminado = productos.splice(indice, 1);
        alert(`'${eliminado[0].nombre}' ha sido eliminado.`);
    } else {
        alert("Selección no válida.");
    }
}

function actualizarPrecio() {
    let lista = "Selecciona el producto para actualizar su precio:\n";
    productos.forEach((p, i) => {
        lista += `${i + 1}. ${p.nombre} - $${p.precio}\n`;
    });
    let indice = parseInt(prompt(lista)) - 1;

    if (indice >= 0 && indice < productos.length) {
        let nuevoPrecio = parseFloat(prompt(`Ingresa el nuevo precio para '${productos[indice].nombre}':`));
        if (!isNaN(nuevoPrecio)) {
            productos[indice].precio = nuevoPrecio;
            alert("Precio actualizado correctamente.");
        } else {
            alert("Precio no válido.");
        }
    } else {
        alert("Selección no válida.");
    }
}

function verInventario() {
    let inventario = "--- Inventario Actual ---\n";
    productos.forEach(p => {
        inventario += `${p.nombre} - $${p.precio}\n`;
    });
    alert(inventario);
}

function iniciarModoCliente() {
    let opcion;
    do {
        opcion = parseInt(prompt(mostrarMenuCliente()));
        const opcionSalir = productos.length + 3;
        const opcionFinalizar = productos.length + 2;
        const opcionVerCarrito = productos.length + 1;

        if (opcion >= 1 && opcion <= productos.length) {
            agregarAlCarrito(opcion - 1);
        } else if (opcion === opcionVerCarrito) {
            verCarritoYTotal();
        } else if (opcion === opcionFinalizar) {
            if (carrito.length > 0) {
                alert("¡Gracias por tu compra! Vuelve pronto.");
                carrito = [];
                break;
            } else {
                alert("Tu carrito está vacío. Agrega productos antes de finalizar.");
            }
        } else if (opcion !== opcionSalir) {
            alert("Opción no válida. Por favor, intenta de nuevo.");
        }

    } while (opcion !== productos.length + 3);
}

function iniciarModoAdmin() {
    let password = prompt("Ingresa la contraseña de administrador:");
    if (password === "12345") {
        let opcionAdmin;
        do {
            opcionAdmin = mostrarMenuAdmin();
            switch (opcionAdmin) {
                case "1":
                    agregarProducto();
                    break;
                case "2":
                    eliminarProducto();
                    break;
                case "3":
                    actualizarPrecio();
                    break;
                case "4":
                    verInventario();
                    break;
                case "5":
                    alert("Saliendo del panel de administrador.");
                    break;
                default:
                    alert("Opción no válida.");
            }
        } while (opcionAdmin !== "5");
    } else {
        alert("Contraseña incorrecta.");
    }
}

function iniciarTienda() {
    let seleccion;
    while (seleccion !== "3") {
        seleccion = prompt(
            "¡Bienvenido a la Tienda!\n" +
            "1. Entrar como Cliente\n" +
            "2. Entrar como Administrador\n" +
            "3. Salir"
        );

        switch (seleccion) {
            case "1":
                iniciarModoCliente();
                break;
            case "2":
                iniciarModoAdmin();
                break;
            case "3":
                alert("Gracias por visitar la tienda. ¡Adiós!");
                break;
            default:
                alert("Por favor, selecciona una opción válida.");
        }
    }
}

iniciarTienda();