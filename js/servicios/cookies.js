/**
 * Servicio encargado de la persistencia de datos usando COOKIES.
 * Requisito del proyecto: "Los datos de las citas se almacenarán en cookies"
 */
export const GestionCookies = {

    // Guarda el array de citas en una cookie llamada 'davante_citas'
    guardarCitas: function (citas) {
        // Convertimos el array de objetos a Texto (JSON)
        const datosTexto = JSON.stringify(citas);

        // Creamos la cookie para que dure 30 días
        // path=/ asegura que esté disponible en toda la web
        // Añadimos encodeURIComponent para proteger caracteres especiales como ; , /
        document.cookie = `davante_citas=${encodeURIComponent(datosTexto)}; max-age=${60 * 60 * 24 * 30}; path=/`;
    },

    // Recupera las citas guardadas
    obtenerCitas: function () {
        const nombre = "davante_citas=";
        const cookiesDecodificadas = decodeURIComponent(document.cookie);
        const arrayCookies = cookiesDecodificadas.split(';');

        for (let i = 0; i < arrayCookies.length; i++) {
            let c = arrayCookies[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            // Si encontramos nuestra cookie
            if (c.indexOf(nombre) === 0) {
                // Quitamos el nombre y nos quedamos con el JSON
                const json = c.substring(nombre.length, c.length);
                // Convertimos el texto JSON de vuelta a Objetos JS
                return JSON.parse(json);
            }
        }
        // Si no hay cookie, devolvemos array vacío
        return [];
    }
};