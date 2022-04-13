let tasks = require('../db/tasks_db.json');

const getTasks = (req, res) => {
  res.status(200).send({
    status: 'ok',
    message: {
      tasks: tasks,
      total_task_count: tasks.length
    }
    });
};

const addTask = (req, res) => {
  tasks.unshift(req.body);
  res.status(200).send({
    status: 'ok',
    message: req.body
  });
};

const editTask = (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  console.log(token)
  if (!token) {
    res.status(401).send({
      status: 'error',
      message: 'Необходимо авторизоваться'
    })
  } else {
    const isTask = tasks.some(item => item.id === +id);
    if (!isTask) {
      res.status(404).send({
      status: 'error',
      message: 'Задача не найдена'
    })
    } else {
      tasks = tasks.map(task => task.id === +id
        ? task = req.body
        : task )
  
      res.status(200).send({
        status: 'ok'
      });
    };
  };
};

module.exports = {
  getTasks,
  addTask,
  editTask
};