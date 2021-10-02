//Initialize UI Elements

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//Load All Event Listeners
loadEventListeners();

//load All Event Listeners function

function loadEventListeners() {
  //DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks);
  //Add Task Event
  form.addEventListener("submit", addTask);

  //Remove Task Event
  taskList.addEventListener("click", removeTask);

  //clear Tasks Events
  clearBtn.addEventListener("click", clearTasks);

  //filter Events
  filter.addEventListener("keyup", filterTasks);
}

//get tasks from LocalStorage
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks=[];
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task){
    // create li element
    const li = document.createElement("li");
    // Add class
    li.className = "collection-item";
    // create textNode and append it to li
    li.appendChild(document.createTextNode(task));
    // create link element
    const link = document.createElement("a");
    // Add class
    link.className = "delete-item secondary-content";
    // Add icon
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append link to li
    li.appendChild(link);
    //append li to ul
    taskList.appendChild(li);

  });
}

//Add Task

function addTask(e) {
  if (taskInput.value === "") {
    alert("Enter a Task");
  }
  // create li element
  const li = document.createElement("li");
  // Add class
  li.className = "collection-item";
  // create textNode and append it to li
  li.appendChild(document.createTextNode(taskInput.value));
  // create link element
  const link = document.createElement("a");
  // Add class
  link.className = "delete-item secondary-content";
  // Add icon
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // append link to li
  li.appendChild(link);
  //append li to ul
  taskList.appendChild(li);
  
  //Store in LocalStorage
  storeTaskInLocalStorage(taskInput.value);

  //Clear Task
  taskInput.value = "";


  e.preventDefault();
}
//Store Task In LocalStorage
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    
    if(confirm("Are you sure?"))
    {
      e.target.parentElement.parentElement.remove();
    }
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
}
//Remove Task From LocalStorage
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks')===null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index){
    if(taskItem.textContent===task){
      tasks.splice(index,1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear Tasks
function clearTasks() {
  if (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  clearTasksFromLocalStorage();
}

//Clear Tasks from LocalStorage
function clearTasksFromLocalStorage(){
  localStorage.clear();
}
//Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
