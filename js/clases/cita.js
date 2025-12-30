/**
 * Clase que representa una Cita Dental
 * Sigue el patrón de diseño POO (Programación Orientada a Objetos)
 */
export class Cita { // Exportamos la clase para poder usarla en otros módulos
    
    constructor(datos) {
        // Generamos un ID único usando el Timestamp actual (milisegundos)
        // Requisito del enunciado: "identificador único el instante en el que se ha grabado"
        this.id = Date.now(); 
        
        // Datos de la Cita
        this.fecha = datos.fecha;
        this.hora = datos.hora;
        
        // Datos del Paciente
        this.paciente = {
            dni: datos.dni,
            nombre: datos.nombre,
            apellidos: datos.apellidos,
            telefono: datos.telefono,
            fechaNacimiento: datos.fechaNacimiento
        };
        
        this.observaciones = datos.observaciones || ""; // Opcional
    }

    // Métodopara obtener la fecha formateada 
    getFechaFormateada() {
        return `${this.fecha} a las ${this.hora}`;
    }

    // Método para obtener nombre completo
    getNombrePaciente() {
        return `${this.paciente.nombre} ${this.paciente.apellidos}`;
    }
}