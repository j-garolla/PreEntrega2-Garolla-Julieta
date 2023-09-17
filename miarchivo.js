// Función para mostrar un mensaje con instrucciones:
function mostrarMensaje(mensaje) {
    console.log(mensaje);
    alert(mensaje);
}

// Función para obtener el nivel de cuidado que querrá darle el cliente y hacer una recomendación:
function obtenerNivelCuidadoYRecomendacion() {
    do {
        const nivelCuidado = prompt('¿Qué nivel de cuidado está dispuesto a darle a su planta carnívora?\nOpciones: Bajo, Medio, Alto');
        
        const recomendacion = nivelesCuidadoCliente.find(nivel => nivel.nivel.toLowerCase() === nivelCuidado.toLowerCase());

        if (recomendacion) {
            alert(recomendacion.recomendacion);
            console.log(recomendacion.recomendacion);
            return nivelCuidado;
        } else {
            alert('Nivel de cuidado no válido. Por favor, elija entre Bajo, Medio o Alto.');
        }
    } while (true);
}

// Función para obtener la planta seleccionada por el usuario:
function obtenerPlantaSeleccionada() {
    do {
        let planta = parseInt(prompt('Ingrese el número que identifica a la planta que desea comprar:\n1 - Venus ($100.50)\n2 - Nepenthes ($150.75)\n3 - Drosera (120.25)'));
        
        if (planta >= 1 && planta <= 3) {
            return planta;
        } else {
            mostrarMensaje('Dato inválido. Por favor, seleccione una planta válida.');
        }
    } while (true);
}

// Función para obtener la cantidad de plantas a comprar
function obtenerCantidad() {
    do {
        let cantidad = parseInt(prompt('Ingrese la cantidad que desea comprar (se aplica un 10% de descuento a compras mayores a $1000):'));

        if (!isNaN(cantidad) && cantidad > 0) {
            return cantidad;
        } else {
            mostrarMensaje('Dato inválido. Por favor, ingrese una cantidad válida.');
        }
    } while (true);
}

// Niveles de cuidado y recomendaciones:
const nivelesCuidadoCliente = [
    { 
        nivel: 'bajo', 
        recomendacion: 'Recomendamos la planta Drosera para un nivel de cuidado bajo. Es importante mantenerla en luz solar directa y el sustrato húmedo pero no encharcado. \nLa Drosera tiene hojas cubiertas de pelos pegajosos que atraen a los insectos. Cuando un insecto se posa en las hojas, queda atrapado en el líquido pegajoso y es digerido por la planta para obtener nutrientes.' 
    },
    { 
        nivel: 'medio', 
        recomendacion: 'Recomendamos la planta Venus para un nivel de cuidado medio. Debe colocarse en luz solar directa y mantener el sustrato húmedo.\nLa Venus es conocida por sus hojas en forma de trampa que atraen y capturan insectos. Estas trampas se cierran cuando un insecto entra en ellas. La planta obtiene nutrientes de los insectos atrapados.' 
    },
    { 
        nivel: 'alto', 
        recomendacion: 'Recomendamos la planta Nepenthes para un nivel de cuidado alto. Debe ubicarse en luz indirecta brillante y mantener el sustrato húmedo.\nLa Nepenthes es una planta con jarros o ascidios en forma de copa que contienen un líquido digestivo. Atrae a los insectos a caer en los jarros y los digiere para obtener nutrientes.' 
    }
];

const mensajesConocimiento = [];

// Función principal, comprar plantas:
function comprarPlantas() {
    // Preguntar al cliente su nivel de conocimiento sobre plantas carnívoras
    const conocimientoCliente = prompt('¿Cuál es su nivel de conocimiento sobre plantas carnívoras?\nOpciones: Ninguno, Medio, Alto');

    let mensajeConocimiento = '';

    // Según la respuesta del cliente, se proporcionará un mensaje informativo diferente
    switch (conocimientoCliente.toLowerCase()) {
        case 'ninguno':
            mensajeConocimiento = 'Las plantas carnívoras son fascinantes y únicas. Se originaron en diversas partes del mundo, como Norteamérica, Sudamérica, África y Australia. En términos de reproducción, la mayoría de las plantas carnívoras se propagan por semillas, aunque algunos tipos también pueden ser propagados mediante esquejes. Estás a punto de descubrir más sobre estas asombrosas plantas mientras haces tu compra.';
            break;
        case 'medio':
            mensajeConocimiento = 'Tienes un nivel medio de conocimiento sobre las plantas carnívoras, ¡excelente! Estas plantas se originaron en diferentes regiones del mundo, incluyendo Norteamérica, Sudamérica, África y Australia. Estás a punto de explorar más sobre estas increíbles plantas mientras haces tu compra.';
            break;
        case 'alto':
            mensajeConocimiento = '¡Genial! Ya conoces bien las plantas carnívoras. ¡Disfruta de tu experiencia de compra!';
            break;
        default:
            mensajeConocimiento = 'Opción no válida.';
            break;
    }

    mensajesConocimiento.push(mensajeConocimiento);

    mostrarMensaje(mensajeConocimiento);

    // Comienza la Tienda de Plantas Carnivoras:
    mostrarMensaje('¡Bienvenido a la Tienda de Plantas Carnívoras!');
    
    const nivelCuidado = obtenerNivelCuidadoYRecomendacion();

    let precioFinal = 0;
    let cantidadTotalPlantas = 0;

    do {
        const planta = obtenerPlantaSeleccionada();
        const cantidad = obtenerCantidad();
        const plantaSeleccionada = plantas[planta - 1];
        const total = plantaSeleccionada.precio * cantidad;
    
        mostrarMensaje(`Ha seleccionado ${cantidad} ${plantaSeleccionada.nombre}. Precio unitario: $${plantaSeleccionada.precio}. Total a pagar: $${total.toFixed(2)}`);
    
        precioFinal += total;
        cantidadTotalPlantas += cantidad;
        
        const cancelarCompra = confirm('¿Desea cancelar la compra y salir?');
        if (cancelarCompra) {
            mostrarMensaje('Compra cancelada. ¡Hasta luego!');
            return; 
        }
    } while (confirm('¿Desea comprar más plantas carnívoras?'));

    const fechaHora = new Date();
    const fechaCompra = fechaHora.toLocaleDateString();
    const horaCompra = fechaHora.toLocaleTimeString();

    if (precioFinal > 1000) {
        const descuento = precioFinal * 0.1;
        precioFinal -= descuento;
    
    // Se usó Math.round para redondear el total del precio para el descuento del 10%:
        const descuentoRedondeado = Math.round(descuento);
        mostrarMensaje(`Se aplicó un descuento del 10% a su compra (redondeado a ${descuentoRedondeado}).`);
    }

    // La fecha, la hora, el precio final con el descuento y la cantidad total de plantas compradas para que las vea el cliente:
    const mensajeFinal = `Fecha de compra: ${fechaCompra}\n\nHora de compra: ${horaCompra}\n\nPrecio final con descuento: $${precioFinal.toFixed(2)}\n\nCantidad total de plantas compradas: ${cantidadTotalPlantas}`;
    mostrarMensaje(mensajeFinal);
    mostrarMensaje('Gracias por su compra. ¡Hasta luego!');
}

// Plantas y sus precios:
const plantas = [
    { 
        nombre: 'Venus',
        precio: 100.50 // 
    },
    { 
        nombre: 'Nepenthes',
        precio: 150.75 // 
    },
    { 
        nombre: 'Drosera',
        precio: 120.25 // 
    }
]

comprarPlantas();
