import { Cita } from './clases/cita.js';
import { GestionCookies } from './servicios/cookies.js';
import { UI } from './servicios/ui.js';
import { Validaciones } from './servicios/validaciones.js'; // Nuevo import

let listaCitas = [];
let modoEdicion = false; // Bandera para saber si estamos editando

document.addEventListener('DOMContentLoaded', () => {
    
    // Cargar datos iniciales
    listaCitas = GestionCookies.obtenerCitas();
    UI.renderizarTabla(listaCitas);

    // Referencias DOM
    const form = document.getElementById('formCitas');
    const tablaBody = document.getElementById('listaCitasBody');
    const btnGuardar = document.getElementById('btnGuardar');
    const tituloForm = document.getElementById('formTitle'); // El H2 del formulario

    // --- 1. EVENTO GUARDAR (SUBMIT) ---
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        UI.limpiarAlertas(form);

        // Recogemos datos
        const datosFormulario = {
            id: document.getElementById('idCita').value, // El campo oculto
            fecha: document.getElementById('fecha').value,
            hora: document.getElementById('hora').value,
            dni: document.getElementById('dni').value,
            nombre: document.getElementById('nombre').value,
            apellidos: document.getElementById('apellidos').value,
            telefono: document.getElementById('telefono').value,
            fechaNacimiento: document.getElementById('fechaNacimiento').value,
            observaciones: document.getElementById('observaciones').value
        };

        // PASO DE VALIDACIÓN
        const errores = Validaciones.validarFormulario(datosFormulario);
        
        // Si hay errores (el objeto tiene claves), paramos y mostramos alertas
        if (Object.keys(errores).length > 0) {
            for (const [campo, mensaje] of Object.entries(errores)) {
                const input = document.getElementById(campo);
                UI.mostrarAlerta(input, mensaje);
            }
            return; // STOP AQUÍ
        }

        // Si pasa la validación...
        if (modoEdicion) {
            // --- MODO ACTUALIZAR ---
            // Buscamos la cita antigua y actualizamos sus datos
            listaCitas = listaCitas.map(cita => {
                if (cita.id == datosFormulario.id) {
                    // Mantenemos el ID original, actualizamos el resto
                    // Recreamos el objeto para asegurar la estructura
                    const citaActualizada = new Cita(datosFormulario);
                    citaActualizada.id = cita.id; // Restauramos ID original
                    return citaActualizada;
                }
                return cita;
            });

            // Resetear modo edición
            modoEdicion = false;
            btnGuardar.textContent = 'Guardar Cita';
            btnGuardar.classList.remove('btn-warning');
            btnGuardar.classList.add('btn-primary');
            tituloForm.textContent = '📅 Nueva Cita';

        } else {
            // --- MODO CREAR ---
            const nuevaCita = new Cita(datosFormulario);
            listaCitas.push(nuevaCita);
        }

        // Guardar, Pintar y Resetear
        GestionCookies.guardarCitas(listaCitas);
        UI.renderizarTabla(listaCitas);
        form.reset();
        document.getElementById('idCita').value = ''; // Limpiar ID oculto

        // Volver a la lista
        document.getElementById('nav-listar').click();
    });

    // --- 2. EVENTOS DE LA TABLA (Delegación) ---
    // Escuchamos clics en el TBODY porque los botones se crean dinámicamente
    tablaBody.addEventListener('click', (e) => {
        
        // A) ¿Click en ELIMINAR?
        if (e.target.classList.contains('eliminar-btn')) {
            const id = e.target.getAttribute('data-id');
            // Confirmación sencilla
            if(confirm('¿Seguro que quieres borrar esta cita?')) {
                // Filtramos para quitar el ID seleccionado
                listaCitas = listaCitas.filter(cita => cita.id != id);
                GestionCookies.guardarCitas(listaCitas);
                UI.renderizarTabla(listaCitas);
            }
        }

        // B) ¿Click en EDITAR?
        if (e.target.classList.contains('editar-btn')) {
            const id = e.target.getAttribute('data-id');
            
            // Buscar la cita en el array
            const citaAEditar = listaCitas.find(cita => cita.id == id);

            if (citaAEditar) {
                // Rellenar el formulario
                document.getElementById('idCita').value = citaAEditar.id;
                document.getElementById('fecha').value = citaAEditar.fecha;
                document.getElementById('hora').value = citaAEditar.hora;
                document.getElementById('dni').value = citaAEditar.paciente.dni;
                document.getElementById('nombre').value = citaAEditar.paciente.nombre;
                document.getElementById('apellidos').value = citaAEditar.paciente.apellidos;
                document.getElementById('telefono').value = citaAEditar.paciente.telefono;
                document.getElementById('fechaNacimiento').value = citaAEditar.paciente.fechaNacimiento;
                document.getElementById('observaciones').value = citaAEditar.observaciones;

                // Cambiar estado a "Edición"
                modoEdicion = true;
                btnGuardar.textContent = 'Actualizar Cita';
                // Cambio visual del botón para que se note
                btnGuardar.classList.remove('btn-primary');
                btnGuardar.classList.add('btn-warning'); 
                tituloForm.textContent = '✏️ Editando Cita';

                // Ir a la pestaña formulario
                document.getElementById('nav-crear').click();
            }
        }
    });

    // --- Pestañas y Limpieza ---
    const btnNavCrear = document.getElementById('nav-crear');
    const btnNavListar = document.getElementById('nav-listar');
    const vistaFormulario = document.getElementById('vista-formulario');
    const vistaTabla = document.getElementById('vista-tabla');

    // Botón Limpiar del formulario
    document.getElementById('btnLimpiar').addEventListener('click', () => {
        modoEdicion = false;
        btnGuardar.textContent = 'Guardar Cita';
        btnGuardar.classList.remove('btn-warning');
        btnGuardar.classList.add('btn-primary');
        tituloForm.textContent = '📅 Nueva Cita';
        UI.limpiarAlertas(form);
    });

    function cambiarPestaña(pestaña) {
        if (pestaña === 'crear') {
            vistaFormulario.classList.remove('hidden');
            vistaTabla.classList.add('hidden');
            btnNavCrear.classList.add('active');
            btnNavListar.classList.remove('active');
        } else {
            vistaFormulario.classList.add('hidden');
            vistaTabla.classList.remove('hidden');
            btnNavCrear.classList.remove('active');
            btnNavListar.classList.add('active');
        }
    }
    btnNavCrear.addEventListener('click', () => cambiarPestaña('crear'));
    btnNavListar.addEventListener('click', () => cambiarPestaña('listar'));
});