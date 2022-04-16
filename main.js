import { render, addTodo } from './modules/crud.js';
import { toggleDeleteBtn } from './utils.js';

//Model
//if local storage has a todos array, then use it
//Otherwise use the default array.
let todos = [];

//Retrieve local storage
const savedTodos = JSON.parse(localStorage.getItem('todos'));
//Check if it is an array
if (Array.isArray(savedTodos)) {
    todos = savedTodos;
}

window.addEventListener('load', () => {
    toggleDeleteBtn(todos);
});
document.getElementById('addTasks').addEventListener('click', function() {
    addTodo(todos);
    // get the title input
    const todoTitleInput = document.getElementById('todo-title');
    // get the due date input
    const dueDateInput = document.getElementById('date-picker');
    // clear the inputs
    todoTitleInput.value = "";
    dueDateInput.value = "";
});

render(todos);

//Another way of writing functions
const addTodo2 = function () {

};


