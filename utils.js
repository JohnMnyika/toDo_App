import { handleDeleteAll, removeTodo, render } from './modules/crud.js';

function addDeleteBtn(todos) {
    // insert delete all button before todo list
    const todoList = document.getElementById('todo-list');

    // create the button
    const deleteAllBtn = document.createElement('button');
    deleteAllBtn.setAttribute('id', 'deleteAllBtn');

    // create the text node
    const deleteAllTextNode = document.createTextNode('Delete All');

    // append the text node to the button
    deleteAllBtn.appendChild(deleteAllTextNode);

    // assign an event handler
    deleteAllBtn.addEventListener('click', () => {
        handleDeleteAll(todos);
    });

    // insert the button
    document.body.insertBefore(deleteAllBtn, todoList);
}

function deleteTodo(event, todos) {
    const deleteButton = event.target;
    const idToDelete = deleteButton.id;

    const newTodos = removeTodo(idToDelete, todos);
    render(newTodos);            
}

function exists(title, dueDate, todos) {
    // loop through existing todo list
    // return todos.find(todo => (todo.title === title && todo.dueDate === dueDate));
    let todoExists = false;
    todos.forEach(todo => {
        if (todo.title === title && todo.dueDate === dueDate) {
            todoExists = true;
        }
    });
    return todoExists;
}

function createErrorMessage(parent, message, id){
    const textNode = document.createTextNode(message);
    const div = document.createElement('div');
    div.appendChild(textNode);
    div.id = id;
    div.style.color = 'red';
    return div;
}

function toggleDeleteBtn(todos) {
    const deleteAllBtn = document.getElementById('deleteAllBtn');
    if (todos.length !== 0) {
        if (!deleteAllBtn)
            addDeleteBtn(todos);
    } else {
        if (deleteAllBtn)
            deleteAllBtn.remove();
    }
}

export {
    addDeleteBtn,
    toggleDeleteBtn,
    deleteTodo,
    exists,
    createErrorMessage
}