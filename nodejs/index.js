const http = require('http');
const url = require('url');

// Crear servidor que escuche peticiones http
const server = http.createServer((req, res) => {
    // 1. Obtener url desde objeto request
    const urlActual = req.url; // string
    const urlParseada = url.parse(urlActual, true); // Parseo a url y true para convertir en objeto los parametros (si tiene)
    
    // 2. Obtener la ruta
    const ruta = urlParseada.pathname;
    
    // 3. Enviar respuesta dependiendo de la ruta
    // "res.end" termina el procesa de respuesta, puede recibir string
    if(ruta === "/ruta"){
        res.end("Hola, estas es /ruta");
    } else {
        res.end("Estas en una ruta que no conozco");
    }
});

// Escuchar puerto 5000
server.listen(5000, () => {
    console.log("Servidor escuchando peticiones en localhost:5000")
});