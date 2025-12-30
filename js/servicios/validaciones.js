/**
 * Servicio de Validaciones
 * Contiene reglas para verificar los datos antes de guardar
 */
export const Validaciones = {

    validarFormulario: function(datos) {
        let errores = {}; // Objeto para guardar los errores encontrados

        // 1. Validar Teléfono
        // Debe tener 9 dígitos y ser numérico.
        const regexTelefono = /^\d{9}$/;
        if (!regexTelefono.test(datos.telefono)) {
            errores.telefono = "El teléfono debe tener 9 dígitos numéricos.";
        }

        // 2. Validar DNI (Que no esté vacío y tenga formato 8 numeros + letra)
        const regexDNI = /^\d{8}[A-Za-z]$/;
        if (!regexDNI.test(datos.dni)) {
            errores.dni = "Formato inválido (Ej: 12345678A)";
        }

        // 3. Validar Campos Obligatorios (Nombre, Apellidos, Fecha)
        if (datos.nombre.trim().length < 2) {
            errores.nombre = "El nombre es muy corto.";
        }
        
        if (datos.apellidos.trim().length < 2) {
            errores.apellidos = "Introduce apellidos válidos.";
        }

        if (!datos.fecha) {
            errores.fecha = "La fecha es obligatoria.";
        }

        if (!datos.hora) {
            errores.hora = "La hora es obligatoria.";
        }

        // Devolvemos el objeto con los errores (si está vacío, todo OK)
        return errores;
    }
};