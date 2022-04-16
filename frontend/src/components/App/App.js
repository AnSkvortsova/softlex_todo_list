import { React, useState, useEffect } from 'react';
import { Buttons } from '../Buttons/Buttons';
import { TasksList } from '../TasksList/TasksList';
import { Pagination } from '../Pagination/Pagination';
import { AddTaskPopup } from '../Popups/AddTaskPopup';
import { LoginPopup } from '../Popups/LoginPopup';
import { SortTaskPopup } from '../Popups/SortTaskPopup';

import { PAGE_SIZE } from '../../utils/constance';

import * as api from '../../utils/api';

function App() {
  const [isTasksLoaded, setIsTasksLoadedState] = useState(false);
  const [isSorted, setIsSortedState] = useState(false);

  const [isSortTaskPopupOpend, setIsSortTaskPopupOpendState] = useState(false);
  const [isAddTaskPopupOpend, setIsAddTaskPopupOpendState] = useState(false);
  const [isLoginPopupOpend, setIsLoginPopupOpendState] = useState(false);
  
  const [allTasks, setAllTasksState] = useState([]);
  const [tasksOnPage, setTasksOnPageState] = useState([]);
  const [sortedTasks, setSortedTasksState] = useState([]);

  function handleSortTaskBtn() {
    setIsSortTaskPopupOpendState(true);
  };

  function handleAddTaskBtn() {
    setIsAddTaskPopupOpendState(true);
  };

  function handleLoginBtn() {
    setIsLoginPopupOpendState(true);
  };

  function closePopup() {
    setIsSortTaskPopupOpendState(false);
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
        setAllTasksState(res.message.tasks);
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }, [isTasksLoaded, allTasks]);

  //количество задач на странице
  function handlePaginationBtn(pageNumber) {
    if (sortedTasks.length !== 0) {
      const copySortedTasks = sortedTasks.slice();
      return setTasksOnPageState(copySortedTasks.splice(pageNumber * PAGE_SIZE - PAGE_SIZE, PAGE_SIZE));
    }
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

  //сортировать задачи
  function sortTasks(username, email, status) {
    setSortedTasksState(allTasks.filter(item => item.username === username || item.email === email || +item.status === +status));
    setIsSortedState(true);
  };

  function resetSorting() {
    setSortedTasksState([]);
    setIsSortedState(false);
  };

  useEffect(() => {
    if (sortedTasks.length === 0) {
      const copyAllTasks = allTasks.slice();
      return setTasksOnPageState(copyAllTasks.splice(0, PAGE_SIZE));
    }
    const copySortedTasks = sortedTasks.slice();
    setTasksOnPageState(copySortedTasks.splice(0, PAGE_SIZE));
  }, [allTasks, sortTasks.length, sortedTasks]);

  return (
    <div className="app">
      <header className="app__header">To Do List</header>
      <Buttons 
      onAddTaskBtn={handleAddTaskBtn}
      onLoginBtn={handleLoginBtn}
      onSortTaskBtn={handleSortTaskBtn} />

      <TasksList 
      tasks = {tasksOnPage} />

      <Pagination
      totalTaskCount = {isSorted ? sortedTasks.length : allTasks.length}
      onPaginationBtn = {handlePaginationBtn} />

      <AddTaskPopup
      isPopupOpend = {isAddTaskPopupOpend}
      addNewTask = {addNewTask}
      closePopup = {closePopup} />

      <LoginPopup
      isPopupOpend = {isLoginPopupOpend}
      closePopup = {closePopup} />

      <SortTaskPopup
      isPopupOpend = {isSortTaskPopupOpend}
      sortTasks = {sortTasks}
      resetSorting = {resetSorting}
      closePopup = {closePopup} />
    </div>
  );
}

export default App;
