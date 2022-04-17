import { React, useState, useEffect, useCallback } from 'react';
import { Buttons } from '../Buttons/Buttons';
import { TasksList } from '../TasksList/TasksList';
import { Pagination } from '../Pagination/Pagination';
import { AddTaskPopup } from '../Popups/AddTaskPopup';
import { LoginPopup } from '../Popups/LoginPopup';
import { SortTaskPopup } from '../Popups/SortTaskPopup';
import { EditTaskPopup } from '../Popups/EditTaskPopup';

import { PAGE_SIZE } from '../../utils/constance';

import * as api from '../../utils/api';

function App() {
  const [isTasksLoaded, setIsTasksLoadedState] = useState(false);
  const [isSorted, setIsSortedState] = useState(false);
  const [isLoggedIn, setIsLoggedInState] = useState(false);

  const [isSortTaskPopupOpend, setIsSortTaskPopupOpendState] = useState(false);
  const [isAddTaskPopupOpend, setIsAddTaskPopupOpendState] = useState(false);
  const [isLoginPopupOpend, setIsLoginPopupOpendState] = useState(false);
  const [isEditTaskPopupOpend, setIsEditTaskPopupOpendState] = useState(false);
  
  const [allTasks, setAllTasksState] = useState([]);
  const [tasksOnPage, setTasksOnPageState] = useState([]);
  const [sortedTasks, setSortedTasksState] = useState([]);
  const [oldTask, setOldTaskState] = useState({});

  function handleSortTaskBtn() {
    setIsSortTaskPopupOpendState(true);
  };

  function handleAddTaskBtn() {
    setIsAddTaskPopupOpendState(true);
  };

  function handleLoginBtn() {
    setIsLoginPopupOpendState(true);
  };

  function handleEditTaskBtn(data) {
    setOldTaskState(data)
    setIsEditTaskPopupOpendState(true);
  };

  function closePopup() {
    setIsSortTaskPopupOpendState(false);
    setIsAddTaskPopupOpendState(false);
    setIsLoginPopupOpendState(false);
    setIsEditTaskPopupOpendState(false);
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

  useEffect(() => {
    if (sortedTasks.length === 0) {
      const copyAllTasks = allTasks.slice();
      return setTasksOnPageState(copyAllTasks.splice(0, PAGE_SIZE));
    }
    const copySortedTasks = sortedTasks.slice();
    setTasksOnPageState(copySortedTasks.splice(0, PAGE_SIZE));
  }, [allTasks, sortTasks.length, sortedTasks]);

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
    setSortedTasksState(allTasks.filter(item => item.username === username || item.email === email || String(item.status) === String(status)));
    setIsSortedState(true);
  };

  function resetSorting() {
    setSortedTasksState([]);
    setIsSortedState(false);
  };

  //логин
  function login(username, password) {
    api.login(username, password)
    .then((res) => {
      if (res.status === 'ok') {
        setIsLoggedInState(true);
        localStorage.setItem('token', res.token)
      }
    })
    .catch((err) => console.log(err))
  };

  //проверка авторизации
  const auth = useCallback(() => {
    if (localStorage.token !== undefined) {
      api.auth(localStorage.token)
      .then((res) => {
        if(res.status === 'ok') {
          setIsLoggedInState(true);
        }
      })
      .catch((err) => console.log(err))
    }
  }, []);

  useEffect(() => {
    auth();
  });

  // редактирование задачи
  function editTask(data) {
    api.editTask(data, localStorage.token)
    .then((res) => {
      if (res.status === 'ok') {
        allTasks.map((item) => item.id === res.message.id
          ? item = res.message
          : item
        );
        sortedTasks.map((item) => item.id === res.message.id
          ? item = res.message
          : item
        );
      };
    })
    .catch((err) => console.log(err))
  };


  return (
    <div className="app">
      <header className="app__header">To Do List</header>
      <Buttons 
      onAddTaskBtn={handleAddTaskBtn}
      onLoginBtn={handleLoginBtn}
      onSortTaskBtn={handleSortTaskBtn} />

      <TasksList 
      tasks = {tasksOnPage}
      isLoggedIn = {isLoggedIn}
      onEditBtn = {handleEditTaskBtn} />

      <Pagination
      totalTaskCount = {isSorted ? sortedTasks.length : allTasks.length}
      onPaginationBtn = {handlePaginationBtn} />

      <AddTaskPopup
      isPopupOpend = {isAddTaskPopupOpend}
      addNewTask = {addNewTask}
      closePopup = {closePopup} />

      <LoginPopup
      isPopupOpend = {isLoginPopupOpend}
      login = {login}
      closePopup = {closePopup} />

      <SortTaskPopup
      isPopupOpend = {isSortTaskPopupOpend}
      sortTasks = {sortTasks}
      resetSorting = {resetSorting}
      closePopup = {closePopup} />

      <EditTaskPopup
      isPopupOpend = {isEditTaskPopupOpend}
      oldTask = {oldTask}
      editTask = {editTask}
      closePopup = {closePopup} />
    </div>
  );
}

export default App;
