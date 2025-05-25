const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const progressFill = document.getElementById('progressFill');

function updateDate() {
  const now = new Date();

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  document.getElementById("dayName").textContent = days[now.getDay()];
  document.getElementById("dayNumber").textContent = now.getDate();
  document.getElementById("monthName").textContent = months[now.getMonth()];
}

// Call once on load
updateDate();

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
renderTasks();

// Add task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  tasks.push({ text: taskText, completed: false });
  taskInput.value = '';
  saveTasks();
  renderTasks();
}

// Render tasks
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'task-line';
    li.textContent = task.text;
    li.style.textDecoration = task.completed ? 'line-through' : 'none';
    li.onclick = () => toggleComplete(index);

    // Delete button
    const delBtn = document.createElement('button');
    delBtn.textContent = '✖';
    delBtn.style.marginLeft = '10px';
    delBtn.onclick = (e) => {
      e.stopPropagation();
      deleteTask(index);
    };

    li.appendChild(delBtn);
    taskList.appendChild(li);
  });

  updateProgress();
}

// Allow pressing Enter to add task
taskInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    addTask();
  }
});

// Toggle task completion
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Save to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update progress bar
function updateProgress() {
  const total = tasks.length;
  const done = tasks.filter(t => t.completed).length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  progressFill.style.width = percent + '%';
}

function finishDay() {
  if (confirm("Are you sure you want to finish the day and clear all tasks?")) {
    tasks = [];
    saveTasks();
    renderTasks();
  }
}

function finishDay() {
  const allCompleted = tasks.length > 0 && tasks.every(t => t.completed);

  if (allCompleted) {
    // Show the growth modal
    const modal = document.getElementById("growthModal");
    modal.classList.remove("hidden");

    // Reset tasks
    tasks = [];
    saveTasks();
    renderTasks();

    // ⏱️ Auto-hide after 5 seconds
    setTimeout(() => {
      modal.classList.add("hidden");
    }, 5000); // 5000ms = 5 seconds
  } else {
    alert("Finish all your tasks to grow your tree!");
  }
}

