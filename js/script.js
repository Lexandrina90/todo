const todoForm = document.querySelector('.todo-form');
const todoList = document.querySelector('.todo-list');
const input = document.querySelector('input');

const tasks = [];
let filteredTasks = tasks.slice();
const filterKeys = [
  {value:'all', selected: true},
  {value: 'active', selected: false},
  {value: 'done', selected: false}
];


const addTask = function (task) {
  tasks.push({
    text: task,
    isDone: false
  });
  input.value = "";
  filterTasks();
}
const deleteTask = function (index) {
  tasks.splice(index, 1);
  filterTasks();
}
const toggleDone = function (index) {
  tasks[index].isDone = !tasks[index].isDone;
  filterTasks();
}

const filterTasks = function () {
  for (let i = 0; i < filterKeys.length; i++) {
    if (filterKeys[i].selected == true) {
      switch(filterKeys[i].value) {
    case "all":
    
      break;
    case "active":
      filteredTasks = tasks.filter(task => !task.isDone);
      // tasks = tasks.map(x,i) => []
      break;
    case "done":
      filteredTasks = tasks.filter(task => task.isDone);
      break;
  }
  displayTasks();
    }}
}


const displayTasks = function () {
  todoList.innerHTML = '';

  filteredTasks.forEach((task, index) => {
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

const select = document.querySelector('.drop');
select.addEventListener('change', function () {
  selectedValue = select.value;
  index = select.selectedIndex;
  // console.log(index);
  filterKeys.forEach((key) => key.selected = false)
  filterKeys[index].selected = true;
  console.log(filterKeys);
  filterTasks();
})









// const filterActive = function () {
//   const filteredTasks = tasks.filter(task => !task.isDone);
//   tasks = filteredTasks;
//   displayTasks();
// }
// const filterDone = function () {
//   const filteredTasks = tasks.filter(task => task.isDone);
//   tasks = filteredTasks;
//   displayTasks();

// }






// const dropBtn = document.querySelector('.drop-btn');
// dropBtn.addEventListener('click', () => {
//   document.querySelector('.drop-content').classList.toggle('show');

// });


// const select = document.querySelector('.drop');
// select.addEventListener('change', function () {
//   let selectedValue = select.value;
//   switch (selectedValue) {
//     case "all":
//       displayTasks();
//       break;
//     case "active":
//       filterActive();
//       break;
//     case "done":
//       console.log('done')
//       filterDone();
//       break;
//   }
// })



