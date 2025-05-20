let tasks = [];

function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  if (!text) return;

  tasks.push({ text, completed: false });
  input.value = '';
  renderTasks();
  updateProgress();
  updateStreak();
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
      updateStreak();
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

// Theme toggle
const toggle = document.getElementById('themeToggle');
const body = document.body;

toggle.addEventListener('change', () => {
  if (toggle.checked) {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
  } else {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
  }
});

// Set default theme
window.onload = () => {
  body.classList.add('light-mode'); // or load from localStorage
};

// Store in localStorage
toggle.addEventListener('change', () => {
  const theme = toggle.checked ? 'dark-mode' : 'light-mode';
  body.className = theme;
  localStorage.setItem('theme', theme);
});

window.onload = () => {
  const savedTheme = localStorage.getItem('theme') || 'light-mode';
  body.className = savedTheme;
  toggle.checked = savedTheme === 'dark-mode';
};

//Streaks display
function updateStreak() {
  const today = new Date().toDateString(); // 'Mon May 20 2025'
  const lastActive = localStorage.getItem('lastActiveDate');
  let streak = parseInt(localStorage.getItem('streak')) || 0;

  if (lastActive !== today) {
    if (lastActive) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (new Date(lastActive).toDateString() === yesterday.toDateString()) {
        streak += 1;
      } else {
        streak = 1; // Reset if missed a day
      }
    } else {
      streak = 1; // First ever entry
    }

    localStorage.setItem('lastActiveDate', today);
    localStorage.setItem('streak', streak);
  }

  document.getElementById('streakDisplay').textContent = `🔥 Streak: ${streak} day${streak !== 1 ? 's' : ''}`;
}
updateStreak(); 
