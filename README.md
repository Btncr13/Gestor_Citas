# 🦷 DavanteDent - Gestión de Citas

> **Trabajo de enfoque de la asignatura de Desarrollo Web en Entorno Cliente**
> Aplicación SPA (Single Page Application) para gestión clínica desarrollada con JavaScript Nativo (Vanilla) y Cookies.

![Estado](https://img.shields.io/badge/Estado-Terminado-success)
![JS](https://img.shields.io/badge/Frontend-JavaScript_ES6-yellow)
![HTML5](https://img.shields.io/badge/Core-HTML5_%26_CSS3-orange)
![Arquitectura](https://img.shields.io/badge/Arquitectura-MVC-purple)

---

## 📄 Descripción del Proyecto

Este sistema simula el panel de recepción de una clínica dental. A diferencia de proyectos que dependen de una base de datos externa, esta aplicación resuelve la persistencia de datos y la lógica de negocio **íntegramente en el navegador del cliente**.

El objetivo es demostrar el dominio de la manipulación del DOM, la Programación Orientada a Objetos en JS y el manejo del ciclo de vida de las Cookies sin utilizar frameworks ni librerías externas.

## 🚀 Funcionalidades Principales

### 📅 Gestión de Agenda (CRUD)
* **Creación de Citas:** Generación de objetos con ID único basado en Timestamp.
* **Persistencia Local:** Uso de Cookies para almacenar la agenda, permitiendo recuperar los datos tras cerrar el navegador.
* **Edición Segura:** Al editar, los datos se recuperan desde la estructura de datos (Cookie) y no desde la vista HTML, garantizando la integridad.
* **Listado Dinámico:** Renderizado de la tabla en tiempo real con numeración secuencial visual.

### 🎨 Interfaz y UX (SPA)
* **Navegación sin Recargas:** Sistema de pestañas para alternar entre el formulario y la lista de citas instantáneamente.
* **Feedback Visual:** Mensajes de estado (ej: "Dato vacío") y alertas visuales.

---

## 🔐 Arquitectura Técnica y Buenas Prácticas

Se han implementado patrones de diseño para asegurar un código escalable:

1.  **Arquitectura MVC Modular:** Separación estricta del código en módulos ES6:
    * `UI.js` (Vista)
    * `App.js` (Controlador)
    * `Cita.js` (Modelo)
2.  **Validación No Intrusiva:** Uso de **Expresiones Regulares (Regex)** para validar DNI y Teléfono estrictamente. Si hay error, se avisa al usuario sin borrar los datos del formulario.
3.  **Seguridad en Cookies:** Implementación de `encodeURIComponent` para sanear los datos antes de guardarlos, evitando corrupción de la cookie por caracteres especiales.
4.  **POO:** Uso de Clases para estandarizar la creación de objetos Cita.

---

## 💻 Instalación y Uso

Al ser una aplicación puramente cliente (`Client-Side`), no requiere servidor Apache/Nginx ni base de datos MySQL.

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/Btncr13/davante_dent.git
    ```

2.  **Ejecución:**
    * Opción A: Abre el archivo `index.html` directamente en tu navegador (Chrome/Edge/Firefox).
    * Opción B (Recomendada): Usa la extensión "Live Server" de VS Code para evitar restricciones de cookies locales en algunos navegadores estrictos.

---

## 📂 Estructura del Código

```text
/davante_dent
│
├── /js
│   ├── /clases
│   │   └── cita.js          # Modelo de datos (POO)
│   ├── /servicios
│   │   ├── cookies.js       # Gestión de persistencia (Storage)
│   │   ├── ui.js            # Manipulación del DOM (Vista)
│   │   └── validaciones.js  # Reglas de negocio (Regex)
│   └── app.js               # Controlador principal (Eventos)
│
├── /css
│   └── styles.css           # Estilos y Grid Layout
│
└── index.html               # Punto de entrada (SPA)

---
*Desarrollado por César Betancor - 2025*
