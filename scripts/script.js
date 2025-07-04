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


function addTodo() {
    const input = document.getElementById('new-todo');
    const title = input.value.trim();
    if (!title) return alert('入力してください');

    fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, completed: false, userId: 1 })
    })
    .then(response => {
        if (!response.ok) throw new Error(`状態コード: ${response.status}`);
        return response.json();
    })
    .then(todo => {
        renderNewTodo(todo);
        input.value = '';
    })
    .catch(error => console.error('POSTエラー:', error));

}


function renderNewTodo(todo) {
    const ul = document.getElementById('todo-list');
    const li = document.createElement('li');
    li.textContent = todo.title;
    ul.appendChild(li);
}
  

document.addEventListener('DOMContentLoaded', fetchTodos);
document.getElementById('add-btn').addEventListener('click', addTodo);
