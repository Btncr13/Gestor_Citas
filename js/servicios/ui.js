/**
 * Servicio encargado de manipular el DOM (Interfaz de Usuario)
 */
export const UI = {

    // Función principal para dibujar la tabla
    renderizarTabla: function(citas) {
        const tbody = document.getElementById('listaCitasBody');
        
        // 1. Limpiamos la tabla actual
        tbody.innerHTML = '';

        // 2. Comprobamos si hay citas (Lógica de "Dato vacío")
        if (citas.length === 0) {
            const filaVacia = document.createElement('tr');
            filaVacia.innerHTML = `<td colspan="6" class="text-center">Dato vacío</td>`;
            tbody.appendChild(filaVacia);
            return; // Salimos, no hay nada más que pintar
        }

        // 3. Recorremos las citas y creamos las filas
        citas.forEach((cita, index) => {
            const tr = document.createElement('tr');
            
            // Construimos el HTML de la fila
            // Nota: El ID va oculto en el botón (data-id) o en memoria, no en una celda visible
            // La primera columna es el ORDEN (index + 1)
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>
                    ${cita.fecha} <br> 
                    <small>${cita.hora}</small>
                </td>
                <td>
                    <strong>${cita.paciente.nombre} ${cita.paciente.apellidos}</strong><br>
                    <small>DNI: ${cita.paciente.dni}</small>
                </td>
                <td>${cita.paciente.telefono}</td>
                <td>${cita.observaciones}</td>
                <td>
                    <button class="btn btn-warning btn-sm editar-btn" data-id="${cita.id}">✏️</button>
                    <button class="btn btn-danger btn-sm eliminar-btn" data-id="${cita.id}">🗑️</button>
                </td>
            `;

            tbody.appendChild(tr);
        });
    },

    // Muestra una alerta visual en el formulario (bordes rojos)
    mostrarAlerta: function(input, mensaje) {
        // Añadimos clase de error al input
        input.classList.add('error');
        
        // Creamos un mensaje pequeño debajo si no existe
        let divError = input.nextElementSibling;
        if (!divError || !divError.classList.contains('msg-error')) {
            divError = document.createElement('div');
            divError.classList.add('msg-error');
            divError.style.color = 'red';
            divError.style.fontSize = '0.8rem';
            input.parentNode.insertBefore(divError, input.nextSibling);
        }
        divError.textContent = mensaje;
    },

    // Limpia los errores visuales
    limpiarAlertas: function(formulario) {
        const inputs = formulario.querySelectorAll('.error');
        inputs.forEach(input => input.classList.remove('error'));
        
        const mensajes = formulario.querySelectorAll('.msg-error');
        mensajes.forEach(msg => msg.remove());
    }
};