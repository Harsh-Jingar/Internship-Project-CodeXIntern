const todoInput = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

function renderTodos() {
    todoList.innerHTML = '';

    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        
        li.innerHTML = `
            <span contenteditable="false">${todo}</span>
            <button class="update" onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        todoList.appendChild(li);
    });
}


function addTodo() {
    const newTodo = todoInput.value.trim();

    if (newTodo !== '') {
        todos.push(newTodo);
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
        todoInput.value = '';
    }
}


function deleteTask(index) {
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
}


function editTask(index) {
    const li = todoList.children[index];
    const span = li.querySelector('span'); 
    const editBtn = li.querySelector('.update'); 

    if (editBtn.textContent === 'Edit') {
        span.contentEditable = true;
        span.focus();
        editBtn.textContent = 'Save'; 
    } else {
        
        todos[index] = span.textContent; 
        localStorage.setItem('todos', JSON.stringify(todos)); 
        span.contentEditable = false; 
        editBtn.textContent = 'Edit'; 
        renderTodos(); 
    }
}

addTodoBtn.addEventListener('click', addTodo);

renderTodos();
