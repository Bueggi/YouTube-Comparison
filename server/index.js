const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router.js');
const port = 3001;

app
  .use(cors())
  .use(express.json())
  .use(router);

app.listen(port, () => console.log(`Server running on port ${port}`));