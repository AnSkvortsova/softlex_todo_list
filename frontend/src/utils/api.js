const checkResult = (response) => {
  if(response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка: ${response.status}`)
};

export const getTasks = () => {
  return fetch(`http://localhost:3000/tasks/`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	}).then((response) => checkResult(response));
};