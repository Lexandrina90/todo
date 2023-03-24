const todoForm = document.querySelector('.todo-form');
const todoList = document.querySelector('.todo-list');

const tasks = [];
const input = document.querySelector('input');

const addTask = function (task) {
  tasks.push({
    text: task,
    isDone: false
  });
  input.value="";
  displayTasks();
}
const deleteTask = function (index) {
  tasks.splice(index, 1);
  displayTasks();
}
const toggleDone = function (index) {
  tasks[index].isDone = !tasks[index].isDone;
  displayTasks();
}


const displayTasks = function () {
  todoList.innerHTML = '';

  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');

    const listWrap = document.createElement('div');
    taskItem.appendChild(listWrap);

    //checkbox
    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.checked = task.isDone;
    checkbox.addEventListener('click', () => {
      toggleDone(index);
    });
    listWrap.appendChild(checkbox);

    //taskText
    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    listWrap.appendChild(taskText);


    //BTN
    const listBtn = document.createElement('div');
    listBtn.className = "list-btn";

    const editBtn = document.createElement('button');
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";
    editBtn.addEventListener('click', () => {
      if (editBtn.textContent == "Edit") {
        editBtn.textContent = "Save";
        taskText.contentEditable = true;
        taskText.focus();
      } else {
        editBtn.textContent = "Edit";
        taskText.contentEditable = false;
      }
      })
    listBtn.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete"
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener('click', () => {
      deleteTask(index);
    })
    listBtn.appendChild(deleteBtn);


    taskItem.appendChild(listBtn);

    todoList.appendChild(taskItem);
  })
}


todoForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const inputValue = input.value;
  if (inputValue != "") {
    addTask(inputValue);
  }
  input.focus();
})

displayTasks();







