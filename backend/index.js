const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const routerTasks = require('./routes/tasks');
const routerAdmins = require('./routes/admins')
const { PORT = 3000 } = process.env;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cors());

app.use('/tasks', routerTasks);
app.use('/', routerAdmins);

app.listen(PORT, () => {
  console.log(`Aplication started on port ${PORT}`)
});
