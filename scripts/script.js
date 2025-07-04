const API_URL = 'https://jsonplaceholder.typicode.com/todos?_limit=10';

function fetchTodos() {
  fetch(API_URL)
    .then(response => {
      if (!response.ok) throw new Error(`状態コード: ${response.status}`);
      return response.json();
    })
    .then(todos => renderTodos(todos))
    .catch(error => console.error('Fetchエラー:', error));
}

function renderTodos(todos) {
    const ul = document.getElementById('todo-list');
    ul.innerHTML = '';  // 既存のリストをクリア
    todos.forEach(todo => {
      const li = document.createElement('li');
      li.textContent = todo.title;
      ul.appendChild(li);
    });
  }
  

document.addEventListener('DOMContentLoaded', fetchTodos);
