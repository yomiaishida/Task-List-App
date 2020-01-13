// Define UI Vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//Store task
const storeTaskInLocalStorage = task => {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Add Task
const addTask = e => {
  if (taskInput.value === "") {
    alert("Add a task");
  } else {
    // Create li elment
    const li = document.createElement("li");
    // Add class
    li.className = "collection-item";
    // Create text node and append to the li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement("a");
    // Add class
    link.className = "delete-item secondary-content";
    // Add icon html
    link.innerHTML = '<li class="fa fa-remove"></li>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);

    // Store in LS
    storeTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = "";
  }

  e.preventDefault();
};

// Remove from Local Storage
const removeTaskFromLocalStorage = taskItem => {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const removeTask = e => {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure")) {
      e.target.parentElement.parentElement.remove();

      // Remove From Local Storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
};

// Clear from local storage
const clearTasksFromLocalStorage = () => {
  localStorage.clear();
};
// Clear Tasks
const clearTasks = e => {
  // taskList.innerHTML = "";

  // Faster
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // clear from Local Storage
  clearTasksFromLocalStorage();
};

// Filter Tasks
const filterTasks = e => {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(task => {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
};

// Get Tasks From Local Storage
const getTasks = () => {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(task => {
    // Create li elment
    const li = document.createElement("li");
    // Add class
    li.className = "collection-item";
    // Create text node and append to the li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement("a");
    // Add class
    link.className = "delete-item secondary-content";
    // Add icon html
    link.innerHTML = '<li class="fa fa-remove"></li>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
};

// Load all event listeners
const loadEventListeners = () => {
  // DOM Load event
  document.addEventListener("DOMContentLoaded", getTasks);

  // Add task event
  form.addEventListener("submit", addTask);

  // Remove task event
  taskList.addEventListener("click", removeTask);

  // Clear task event
  clearBtn.addEventListener("click", clearTasks);
  // Filter Tasks event
  filter.addEventListener("keyup", filterTasks);
};

// Load all event listeners
loadEventListeners();
