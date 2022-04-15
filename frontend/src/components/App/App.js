import { React, useState, useEffect } from 'react';
import { TasksList } from '../TasksList/TasksList';
import { Pagination } from '../Pagination/Pagination';
import { AddTaskPopup } from '../Popups/AddTaskPopup';
import { LoginPopup } from '../Popups/LoginPopup';

import { PAGE_SIZE } from '../../utils/constance';

import * as api from '../../utils/api';

function App() {
  const [isTasksLoaded, setIsTasksLoadedState] = useState(false);
  const [isAddTaskPopupOpend, setIsAddTaskPopupOpendState] = useState(false);
  const [isLoginPopupOpend, setIsLoginPopupOpendState] = useState(false);
  const [allTasks, setAllTasksState] = useState([]);
  const [tasksOnPage, setTasksOnPageState] = useState([]);

  function handleAddTaskBtn() {
    setIsAddTaskPopupOpendState(true);
  };

  function handleLoginBtn() {
    setIsLoginPopupOpendState(true);
  };

  function closePopup() {
    setIsAddTaskPopupOpendState(false);
    setIsLoginPopupOpendState(false);
  };

  // обработчик Escape и overlay
  useEffect(() => {
    const closeByEscape = (evt) => {
      if(evt.key === 'Escape') {
        closePopup();
      };
    };
    document.addEventListener('keydown', closeByEscape);
    return () => document.removeEventListener('keydown', closeByEscape);
  }, []);

  useEffect(() => {
    const closeByOverlay = (evt) => {
      if(evt.target.classList.contains('popup_opend')) {
        closePopup();
      };
    };
    document.addEventListener('click', closeByOverlay);
    return () => document.removeEventListener('click', closeByOverlay);
  }, []);

  //получаем все задачи
  function checkIsTasksLoaded(allTasks) {
    if(allTasks.length !== 0) {
      setIsTasksLoadedState(true)
    }
  };

  useEffect(() => {
    api.getTasks()
    .then((res) => {
      checkIsTasksLoaded(allTasks)
      if(!isTasksLoaded) {
        setAllTasksState(res.message.tasks)
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }, [isTasksLoaded, allTasks]);

  //количество задач на странице
  function handlePaginationBtn(pageNumber) {
    const copyAllTasks = allTasks.slice();
    setTasksOnPageState(copyAllTasks.splice(pageNumber * PAGE_SIZE - PAGE_SIZE, PAGE_SIZE));
  };

  //добавить задачу
  function addNewTask(data) {
    api.addTask(data)
    .then((res) => {
      setAllTasksState([res.message, ...allTasks]);
      const updateTasksOnPage = [res.message, ...tasksOnPage]
      setTasksOnPageState(updateTasksOnPage.splice(0, PAGE_SIZE))
    })
    .catch((err) => console.log(err))
  };

 console.log(tasksOnPage)
 console.log(allTasks)
  return (
    <div className="app">
      <header className="app__header">To Do List</header>
      <button className='button' onClick={handleAddTaskBtn} type='button' aria-label='Добавить задачу'>Добавить задачу</button>
      <button className='buttom' onClick={handleLoginBtn} type='button' aria-label='Вход'>Вход</button>
      <TasksList 
      tasks = {tasksOnPage} />
      <Pagination
      totalTaskCount = {allTasks.length}
      onPaginationBtn = {handlePaginationBtn} />

      <AddTaskPopup
      isPopupOpend = {isAddTaskPopupOpend}
      addNewTask = {addNewTask}
      closePopup = {closePopup} />
      <LoginPopup
      isPopupOpend = {isLoginPopupOpend} />
    </div>
  );
}

export default App;
