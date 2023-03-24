const todoForm = document.querySelector('.todo-form');
const todoList = document.querySelector('.todo-list')
let tasks = [];

const input = document.querySelector('input');

todoForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const inputValue = input.value;
  // console.log(inputValue);

  if (inputValue != "") {
    const task = {
      id: new Date().getTime(),
      name: inputValue,
    };
    tasks.push(task);
    // console.log(tasks);
    createTask(task);

    todoForm.reset();
  }
  input.focus();
});

const createTask = function (task) {
  const taskItem = document.createElement("li");
  taskItem.setAttribute("id", task.id);
  const taskHtml = `
  <div class = "list-wrapper">
  <input type="checkbox" id="${task.id}">
  <label for="${task.name}"></label>
  <span>${task.name}</span>
  </div>
  <div class="list-btn">
  <button class="edit-btn">Edit</button>
  <button class="delete-btn">Delete</button>
  </div>
  `;
  taskItem.innerHTML = taskHtml;
  todoList.appendChild(taskItem);
}

todoList.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-btn")) {
    const taskId = e.target.closest("li").id;
    const taskSpan = document.getElementById(taskId).querySelector("span");
    // console.log(taskSpan.textContent);
    if (e.target.textContent == 'Edit') {
      e.target.textContent = "Save";
      taskSpan.contentEditable = true;
      taskSpan.focus();
    } else {
      e.target.textContent = "Edit";
      taskSpan.contentEditable = false;
    }
  } else if (e.target.classList.contains("delete-btn")) {
    const taskId = e.target.closest("li").id;
    // console.log(taskId);
    document.getElementById(taskId).remove();
  }
});

