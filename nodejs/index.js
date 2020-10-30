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

    // 4. Enviar respuesta dependiendo de la ruta
    // ESTAS RESPUESTAS DEBEN ENVIARSE LUEGO DE FINALIZADO EL REQUEST (por eso las moví dentro de req.on('end'))
    // "res.end" termina el procesa de respuesta, puede recibir string
    switch(rutaLimpia){
        case 'ruta':
            res.end("Hola, estas en /ruta");
            break
        default:
            res.end("Estas en una ruta que no conozco");
            break;
        }
    });
});

// Escuchar puerto 5000
server.listen(5000, () => {
    console.log("Servidor escuchando peticiones en localhost:5000")
});