const todoForm = document.querySelector('.todo-form');
const todoList = document.querySelector('.todo-list');
const input = document.querySelector('input');

const tasks = [];

const filterKeys = [
  { value: 'all', selected: true },
  { value: 'active', selected: false },
  { value: 'done', selected: false }
];

const addTask = function (task) {
  tasks.push({
    text: task,
    isDone: false,
    isVisible: true
  });
  input.value = '';
  filterTasks();
}

const filterTasks = function () {
  for (let i = 0; i < filterKeys.length; i++) {
    if (filterKeys[i].selected === true) {
      switch (filterKeys[i].value) {
        case 'all':
          tasks.forEach(task => task.isVisible = true)
          break;
        case 'active':
          tasks.forEach(task => task.isVisible = !task.isDone);
          break;
        case 'done':
          tasks.forEach(task => task.isVisible = task.isDone);
          break;
      }
      displayTasks();
    }
  }
}

const displayTasks = function () {
  todoList.innerHTML = '';
  tasks.forEach((task, index) => {
    if (task.isVisible) {
      const taskItem = document.createElement('li');
      const listWrap = document.createElement('div');
      taskItem.appendChild(listWrap);

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.isDone;
      checkbox.addEventListener('click', () => {
        const isDone = task.isDone;
        if (!isDone) {
          task.isDone = true;
          filterTasks();
        } else {
          task.isDone = false;
        }
        filterTasks();
      });
      listWrap.appendChild(checkbox);

      const taskText = document.createElement('span');
      taskText.textContent = task.text;
      listWrap.appendChild(taskText);


      const listBtn = document.createElement('div');
      listBtn.className = 'list-btn';

      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';
      editBtn.className = 'edit-btn';
      editBtn.addEventListener('click', () => {
        const isEditing = taskText.isContentEditable;
        if (!isEditing) {
          editBtn.textContent = 'Save';
          taskText.contentEditable = true;
          taskText.focus();
        } else {
          editBtn.textContent = 'Edit';
          taskText.contentEditable = false;
          tasks[index].text = taskText.textContent;
          filterTasks();
        }
      })
      listBtn.appendChild(editBtn);

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.className = 'delete-btn';
      deleteBtn.addEventListener('click', () => {
        tasks.splice(index, 1);
        filterTasks();
      })
      listBtn.appendChild(deleteBtn);

      taskItem.appendChild(listBtn);
      todoList.appendChild(taskItem);
    }
  })
}


todoForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const inputValue = input.value;
  if (inputValue != '') {
    addTask(inputValue);
  }
  input.focus();
})

const select = document.querySelector('.drop');
select.addEventListener('change', function () {
  selectedValue = select.value;
  index = select.selectedIndex;
  filterKeys.forEach((key) => key.selected = false)
  filterKeys[index].selected = true;
  filterTasks();
})


// const deleteTask = function (index) {
//   const taskText = filteredTasks[index].text;
//   const taskIndex = tasks.findIndex(task => task.text === taskText);
//   tasks.splice(taskIndex, 1);
//   filterTasks();
// }










