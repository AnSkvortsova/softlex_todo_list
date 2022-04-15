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
