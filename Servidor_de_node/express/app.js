const express = require('express');
const PORT = 3000;
const app = express();

app.get('/', (req, res) => {
  res.type('text/plain'); 
  res.send('Hola Mundo desde servidor express de Node.js');
});


app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});
