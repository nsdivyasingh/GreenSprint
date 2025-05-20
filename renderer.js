let tasks = [];

function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  if (!text) return;

  tasks.push({ text, completed: false });
  input.value = '';
  renderTasks();
  updateProgress();
}

function renderTasks() {
  const list = document.getElementById('taskList');
  list.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task.text;
    if (task.completed) li.classList.add('completed');
    li.onclick = () => {
      tasks[index].completed = !tasks[index].completed;
      renderTasks();
      updateProgress();
    };
    list.appendChild(li);
  });
}

function updateProgress() {
  const completed = tasks.filter(t => t.completed).length;
  const total = tasks.length;
  const percent = total ? (completed / total) * 100 : 0;

  document.getElementById('progressBar').style.width = percent + '%';

  const score = total ? Math.round((completed / total) * 10) : 0;
  document.getElementById('scoreDisplay').textContent = `Score: ${score}/10`;
}
