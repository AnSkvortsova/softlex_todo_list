import { BASE_URL } from './constance';

const checkResult = (response) => {
  if(response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.status}`)
};

export const getTasks = () => {
  return fetch(`${BASE_URL}/tasks`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	}).then((response) => checkResult(response));
};

export const addTask = (data) => {
  return fetch(`${BASE_URL}/tasks/create`, {
    method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
    body: JSON.stringify({
      id: Date.now(),
      username: data.username,
      email: data.email,
      text: data.text,
      status: 0
    })
  }).then((response) => checkResult(response));
};

export const login = (username, password) => {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username, password}),
  }).then((response) => checkResult(response));
};

export const auth = (token) => {
  return fetch(`${BASE_URL}/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({token}),
  }).then((response) => checkResult(response));
};

export const editTask = (data, token) => {
  return fetch(`${BASE_URL}/tasks/edit/${data.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify({
      id: data.id, 
      username: data.username,
      email: data.email,
      text: data.text, 
      status: data.status
    }),
  }).then((response) => checkResult(response));
};