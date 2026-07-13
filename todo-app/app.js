console.log("JS conectado correctamente!");
const tasksSavedString = localStorage.getItem("mis_tareas");
let taskList = tasksSavedString ? JSON.parse(tasksSavedString) : [];

const taskListElement = document.getElementById("task-list");

const renderTasks = () => {
  taskListElement.innerHTML = "";

  if (taskList.length === 0) {
    const taskItem = document.createElement("li");
    const taskText = document.createElement("span");
    taskText.classList.add("list-task-empty");
    taskText.textContent = "No tienes tareas pendientes";

    taskItem.appendChild(taskText);
    taskListElement.appendChild(taskItem);
  } else {
    for (const task of taskList) {
      const taskItem = document.createElement("li");
      taskItem.dataset.id = task.id;

      const taskCheck = document.createElement("input");
      taskCheck.type = "checkbox";
      taskCheck.classList.add("btn-check");
      taskCheck.checked = task.completed;

      const taskText = document.createElement("span");
      taskText.classList.add("text-task");
      if (task.completed) taskText.classList.add("completed");
      taskText.textContent = ` ${task.text}`;

      const taskDelete = document.createElement("button");
      taskDelete.type = "button";
      taskDelete.classList.add("btn-delete");
      taskDelete.setAttribute("aria-label", "Eliminar tarea");

      const deleteIcon = document.createElement("i");
      deleteIcon.dataset.feather = "trash-2";

      taskDelete.appendChild(deleteIcon);
      taskItem.appendChild(taskCheck);
      taskItem.appendChild(taskText);
      taskItem.appendChild(taskDelete);

      taskListElement.appendChild(taskItem);
    }
  }
  feather.replace();
};

renderTasks();

const taskFormElement = document.getElementById("task-form");
const taskInputElement = document.getElementById("task-input");

taskFormElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTaskText = taskInputElement.value.trim();

  if (!newTaskText) return;

  const newTask = { id: Date.now(), text: newTaskText, completed: false };

  taskList.push(newTask);

  saveTasks();
  renderTasks();

  taskInputElement.value = "";
});

taskListElement.addEventListener("click", (e) => {
  const deleteButton = e.target.closest(".btn-delete");
  if (e.target.type === "checkbox") {
    const taskItemElement = e.target.closest("li");
    const taskId = Number(taskItemElement.dataset.id);

    const task = taskList.find((t) => t.id === taskId);
    task.completed = !task.completed;

    saveTasks();
    renderTasks();
  } else if (deleteButton) {
    const taskItemElement = deleteButton.closest("li");
    const taskId = Number(taskItemElement.dataset.id);

    taskList = taskList.filter((t) => t.id !== taskId);
    saveTasks();
    renderTasks();
  }
});

const saveTasks = () => {
  const tasksToString = JSON.stringify(taskList);
  localStorage.setItem("mis_tareas", tasksToString);
};
