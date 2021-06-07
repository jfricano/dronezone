const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.resolve(__dirname, './public')));

app.use('/dist', express.static(path.resolve(__dirname, '../dist')));

app.get('/', (req, res) => {
  return res.sendFile(path.resolve(__dirname, './public/index.html'));
});

app.listen(3000, () => console.log('change me later'));
