const express = require('express');
const { PORT = 3221 } = process.env;
const app = express();

app.use(express.static(__dirname));
app.get('/', (req, res) => {
  res.sendFile('index.html');
}); 

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});