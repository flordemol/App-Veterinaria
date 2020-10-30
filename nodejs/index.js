const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

// Crear servidor que escuche peticiones http
const server = http.createServer((req, res) => {
    // 1. Obtener url desde objeto request
    const urlActual = req.url; // string
    const urlParseada = url.parse(urlActual, true); // Parseo a url y true para convertir en objeto los parametros (si tiene)
    
    // 2. Obtener la ruta
    const ruta = urlParseada.pathname;
    
    // 3. Quitar slash
    const rutaLimpia = ruta.replace(/^\/+|\/+$/g, '')

    // 3.1 Obtener el método HTTP
    const metodo = req.method.toLocaleLowerCase();

    // 3.2 Obtener variables del Query URL
    // Si urlParseada tiene query, lo guardo. Si no tiene, lo guardo vacío 
    const { query = {} } = urlParseada;
    
    // 3.3 Obtener headers
    const { headers = {} } = req;

    // 3.4 Obtener datos de un payload, si existe
    const decoder = new StringDecoder('utf-8'); // recibir paquetes y encodificar en utf-8
    let buffer = ''; // acumulo los strings de datos
    
    // 3.4.1 Ir acumulando la data cuando el request reciba un payload
    req.on('data', (data) => { // el evento se ejecuta cuando lleguen datos
        buffer += decoder.write(data); // decodificar y escribir el stream, acumulando los string
    });

    // 3.4.2 Terminar de acumular datos y decir al decoder que finalice
    // Se ejecuta luego de que TERMINA EL REQUEST
    req.on('end', () => {
        buffer += decoder.end();

        // 3.5 Ordenar los datos del request
        const data = {
            ruta : rutaLimpia,
            query,
            metodo,
            headers,
            payload : buffer
        };

        // 3.6 Elegir el manejador dependiendo de la ruta y asignar la función que el enrutador tiene
        let handler;
        if(rutaLimpia && enrutador[rutaLimpia]) {
            handler = enrutador[rutaLimpia];
        } else {
            handler = enrutador.noEncontrado;
        }

        // 4. Ejecutar handler (manejador) para enviar la respuesta
        if(typeof handler === 'function'){
            handler(data, (statusCode = 200, mensaje) => {
                const respuesta = JSON.stringify(mensaje);
                res.writeHead(statusCode);
                // Línea donde estamos respondiendo a la aplicación cliente
                res.end(respuesta);
            });
        };
    });
});

// Crear rutas y manejadores (handler)
const enrutador = {
    ruta : (data, callback) => {
        callback(200, {mensaje: "Esta es /ruta"});
    },
    usuarios : (data, callback) => {
        callback(200, [{nombre: "usuario 1"}, {nombre: "usuario 2"}]);
    },
    noEncontrado : (data, callback) => {
        callback(404, {mensaje: "No encontrado"});
    }
}

// Escuchar puerto 5000
server.listen(5000, () => {
    console.log("Servidor escuchando peticiones en localhost:5000")
});