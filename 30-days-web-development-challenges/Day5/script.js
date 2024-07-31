document.addEventListener("DOMContentLoaded", () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
  
    if (savedTasks) {
      savedTasks.forEach((task) => taskList.push(task));
      renderTaskList();
      updateProgress();
    }
  });
  
  let taskList = [];
  
  const storeTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(taskList));
  };
  
  const addNewTask = () => {
    const taskInputField = document.getElementById("taskInput");
    const taskText = taskInputField.value.trim();
  
    if (taskText) {
      taskList.push({ text: taskText, completed: false });
      taskInputField.value = "";
      renderTaskList();
      updateProgress();
      storeTasks();
    }
  };
  
  const toggleTaskStatus = (index) => {
    taskList[index].completed = !taskList[index].completed;
    renderTaskList();
    updateProgress();
    storeTasks();
  };
  
  const removeTask = (index) => {
    taskList.splice(index, 1);
    renderTaskList();
    updateProgress();
    storeTasks();
  };
  
  const modifyTask = (index) => {
    const taskInputField = document.getElementById("taskInput");
    taskInputField.value = taskList[index].text;
  
    taskList.splice(index, 1);
    renderTaskList();
    updateProgress();
    storeTasks();
  };
  
  const updateProgress = () => {
    const completedTasksCount = taskList.filter((task) => task.completed).length;
    const totalTasksCount = taskList.length;
    const completionPercentage = (completedTasksCount / totalTasksCount) * 100;
    const progressBarElement = document.getElementById("progress");
  
    progressBarElement.style.width = `${completionPercentage}%`;
  
    document.getElementById("numbers").innerText = `${completedTasksCount} / ${totalTasksCount}`;
  
    if (taskList.length && completedTasksCount === totalTasksCount) {
      triggerConfetti();
    }
  };
  
  const renderTaskList = () => {
    const taskListElement = document.getElementById("task-list");
    taskListElement.innerHTML = "";
  
    taskList.forEach((task, index) => {
      const taskItemElement = document.createElement("li");
  
      taskItemElement.innerHTML = `
        <div class="taskItem">
          <div class="task ${task.completed ? "completed" : ""}">
            <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} />
            <p>${task.text}</p>
          </div>
          <div class="icons">
            <i class="fas fa-edit" onClick="modifyTask(${index})"></i>
            <i class="fas fa-trash" onClick="removeTask(${index})"></i>
          </div>
        </div>
      `;
      taskItemElement.addEventListener("change", () => toggleTaskStatus(index));
      taskListElement.append(taskItemElement);
    });
  };
  
  document.getElementById("newTask").addEventListener("click", function (e) {
    e.preventDefault();
    addNewTask();
  });
  
  const triggerConfetti = () => {
    const particleCount = 200,
      defaultOptions = {
        origin: { y: 0.7 },
      };
  
    function fireConfetti(ratio, options) {
      confetti(
        Object.assign({}, defaultOptions, options, {
          particleCount: Math.floor(particleCount * ratio),
        })
      );
    }
  
    fireConfetti(0.25, {
      spread: 26,
      startVelocity: 55,
    });
  
    fireConfetti(0.2, {
      spread: 60,
    });
  
    fireConfetti(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
  
    fireConfetti(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
  
    fireConfetti(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };
