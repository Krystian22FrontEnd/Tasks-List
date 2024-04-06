{
  let tasks = [];

  const addNewTask = (newTaskContent) => {
    tasks = [...tasks, {
      content: newTaskContent
    }];

    const input = document.querySelector(".form__input")
    input.value = "";

    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)],
      render();
  }

  const toggleTaskDone = (taskIndex) => {
    tasks[taskIndex].done = !tasks[taskIndex].done;
    render();
  }

  const bindRemoveEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });
  }

  const bindToggleDoneEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  }
    
  

  const renderTasks = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
        <li class="list__item">
        <button class="js-done task__button task__button--done">
        ${task.done ? "✔️" : ""}
        </button>
        <span class= "flexContent${task.done ? " list__item--done " : ""}">
        ${task.content}
        </span>
        <button class="js-remove task__button task__button--remove">🗑️</button>
        </li>
              `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;

  };

  const renderButtons = () => { };

  const render = () => {
    renderTasks();
    renderButtons();

    bindRemoveEvents();
    bindToggleDoneEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskContent = document.querySelector(".js-newTask").value.trim();
    const input = document.querySelector(".form__input");

    input.focus();
    ;

    if (newTaskContent === "") {
      return;
    }

    addNewTask(newTaskContent);
  };


  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit)
  };

  init();
}