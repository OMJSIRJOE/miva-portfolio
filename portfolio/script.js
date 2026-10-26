// ---------- Mobile menu ----------
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
menuBtn.addEventListener("click", () => navMenu.classList.toggle("open"));

// ---------- Academic Planner ----------
const taskForm = document.getElementById("taskForm");
if (taskForm) {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");
  const taskCount = document.getElementById("taskCount");
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      if (task.done) li.classList.add("done");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.done;
      checkbox.style.width = "auto";
      checkbox.addEventListener("change", () => toggleTask(index));

      const span = document.createElement("span");
      span.textContent = task.text;

      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.className = "del";
      delBtn.addEventListener("click", () => deleteTask(index));

      li.append(checkbox, span, delBtn);
      taskList.appendChild(li);
    });
    const remaining = tasks.filter(t => !t.done).length;
    taskCount.textContent = tasks.length
      ? remaining + " of " + tasks.length + " task(s) remaining"
      : "No tasks yet. Add one above!";
  }

  function addTask(text) {
    tasks.push({ text: text, done: false });
    saveTasks();
    renderTasks();
  }

  function toggleTask(index) {
    tasks[index].done = !tasks[index].done;
    saveTasks();
    renderTasks();
  }

  function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (text === "") return;
    addTask(text);
    taskInput.value = "";
    taskInput.focus();
  });

  renderTasks();
}

// ---------- Contact form validation ----------
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  function setError(id, msg) {
    document.getElementById(id + "Error").textContent = msg;
    return msg === "";
  }

  function validateForm() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[0-9]+$/;

    let ok = true;
    ok = setError("name", name === "" ? "Name is required." : "") && ok;
    ok = setError("email",
      email === "" ? "Email is required." :
      !emailPattern.test(email) ? "Enter a valid email address." : "") && ok;
    ok = setError("phone",
      phone === "" ? "Phone number is required." :
      !phonePattern.test(phone) ? "Phone number must contain digits only." : "") && ok;
    ok = setError("message", message === "" ? "Message is required." : "") && ok;
    return ok;
  }

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const success = document.getElementById("formSuccess");
    if (validateForm()) {
      success.textContent = "Thank you! Your message has been sent successfully.";
      contactForm.reset();
    } else {
      success.textContent = "";
    }
  });
}
