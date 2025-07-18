document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.getElementById("addBtn");
    const timeInput = document.getElementById("timeInput");
    const taskInput = document.getElementById("taskInput");
    const tasksContainer = document.getElementById("tasksContainer");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTasks() {
        tasksContainer.innerHTML = "";
        tasks.forEach((task, index) => {
            const taskDiv = document.createElement("div");
            taskDiv.classList.add("task-item");

            taskDiv.innerHTML = `
                <span class="task-time">${task.time}</span>
                <span>${task.text}</span>
                <button class="delete-btn" data-index="${index}">Delete</button>
            `;

            tasksContainer.appendChild(taskDiv);
        });
    }

    addBtn.addEventListener("click", () => {
        const time = timeInput.value;
        const text = taskInput.value.trim();

        if (!time || !text) {
            alert("Please enter both time and task.");
            return;
        }

        tasks.push({ time, text });
        saveTasks();
        renderTasks();

        timeInput.value = "";
        taskInput.value = "";
    });

    tasksContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const index = e.target.getAttribute("data-index");
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        }
    });

    renderTasks();
});
