const http = require('http');

const PORT = 3001;


const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });

  res.end('Hola Mundo desde http de Node.js');
});


server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
