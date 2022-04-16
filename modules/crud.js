import { 
    deleteTodo, 
    exists, 
    toggleDeleteBtn, 
    createErrorMessage 
} from '../utils.js';

//Create a todo
function createTodo(title, dueDate, todos) {
    const id = '' + new Date().getTime();

    todos.push({
        title: title,
        dueDate: dueDate,
        id: id
    });

    saveTodos(todos);
    toggleDeleteBtn(todos);
}

//Deletes a todo
function removeTodo(idToDelete, todos) {
    todos = todos.filter(function (todo) {
        if (todo.id === idToDelete) {
            return false;
        } else {
            return true;
        } //If the id of this todo matches idToDelete, return false. For everythng else, retrun true
    });

    saveTodos(todos);
    toggleDeleteBtn(todos);
    return todos;
}

//Delete all
function handleDeleteAll(todos) {
    if (!confirm('Are you sure you want to delete all?')) return;

    todos = [];
    localStorage.removeItem('todos');
    toggleDeleteBtn(todos);
    render(todos);
}

//Saving todos
function saveTodos(todos){
    localStorage.setItem('todos', JSON.stringify(todos));
}

//Controller 
function addTodo(todos) {
    const datePicker = document.getElementById('date-picker');
    const dueDate = datePicker.value;
    const todoTitle = document.getElementById('todo-title').value;
    const body = document.getElementsByTagName('body')[0];
    const titleErrorDiv = document.getElementById('title-error');
    const dateErrorDiv = document.getElementById('date-error');
    let valid = true;

    if (!todoTitle) {
        if (!titleErrorDiv) {
            const div = createErrorMessage(body, 'Please fill the task', 'title-error');
            document.getElementById('title-field').appendChild(div);
        }
        valid = false;
    } else {
        titleErrorDiv?.remove();
    }
    
    if (!dueDate) {
        if (!dateErrorDiv) {
            const div = createErrorMessage(body, 'Please enter the Due Date!', 'date-error');
            document.getElementById('date-field').appendChild(div);
        }
        valid = false;
    } else {
        dateErrorDiv?.remove();
    }

    if (exists(todoTitle, dueDate, todos)) {
        alert('Task (' + todoTitle + ') already exists');
        valid = false;
    }

    if (valid) {
        const textbox = document.getElementById('todo-title');
        const title = textbox.value;
        createTodo(title, dueDate, todos);
        render(todos);
    }
}

//View Section
function render(todos) {
    //reset our list
    document.getElementById('todo-list').innerHTML = '';
    todos.forEach(function(todo) {
        const element = document.createElement('div');
        element.innerText = todo.title + ' ' + todo.dueDate;

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.style = 'margin-left: 12px;';
        deleteButton.addEventListener('click', (event) => {
            deleteTodo(event, todos);
        })
        deleteButton.id = todo.id;
        element.appendChild(deleteButton)

        const todoList = document.getElementById('todo-list')
        todoList.appendChild(element); //To add elements to an end of the body  
    });   
}

// named exports
export { 
    createTodo, 
    removeTodo, 
    handleDeleteAll, 
    saveTodos, 
    addTodo, 
    render,
};
