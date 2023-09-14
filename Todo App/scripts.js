document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const tasksList = document.getElementById("pendingTasks");
    const completedTasksList = document.getElementById("completedTasks");

    addTaskBtn.addEventListener("click", function() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const taskItem = document.createElement("li");
            const currentDate = new Date().toLocaleString();
            taskItem.innerHTML = `
                <div class="task-text">${taskText}</div>
                <div class="task-actions">
                    <span class="task-date">${currentDate}</span>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                    <input type="checkbox" class="complete-checkbox">
                </div>
            `;

            const completeCheckbox = taskItem.querySelector(".complete-checkbox");
            const editButton = taskItem.querySelector(".edit-btn");
            const deleteButton = taskItem.querySelector(".delete-btn");

            completeCheckbox.addEventListener("change", function() {
                if (completeCheckbox.checked) {
                    taskItem.classList.add("completed");
                    completedTasksList.appendChild(taskItem);
                } else {
                    taskItem.classList.remove("completed");
                    tasksList.appendChild(taskItem);
                }
                updateTaskCount();
            });

            deleteButton.addEventListener("click", function() {
                taskItem.remove();
                updateTaskCount();
            });

            editButton.addEventListener("click", function() {
                const taskTextElement = taskItem.querySelector(".task-text");
                const updatedText = prompt("Edit task:", taskTextElement.textContent);
                if (updatedText !== null) {
                    taskTextElement.textContent = updatedText;
                }
            });

            tasksList.appendChild(taskItem);
            taskInput.value = "";
            updateTaskCount();
        }
    });

    function updateTaskCount() {
        const totalTasks = tasksList.childElementCount;
        const completedTasks = completedTasksList.childElementCount;
        const taskCountElements = document.querySelectorAll(".task-count");

        taskCountElements.forEach(element => {
            element.textContent = `${totalTasks} Pending, ${completedTasks} Completed`;
        });
    }
});
