{
  let tasks = [];
  let hideDoneTask = false;

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
    tasks = tasks.map((task, index) =>
      index === taskIndex ? { ...task, done: !task.done } : task);

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
      <li class="list__item  
          ${task.done && hideDoneTask ? "list__item--hidden" : ""}">
        <button class="js-done task__button task__button--done">
          ${task.done ? "✔️" : ""}
        </button>
        <span class= "flexButton${task.done ? " list__item--done " : ""}">
          ${task.content}
        </span>
        <button class="js-remove task__button task__button--remove">🗑️</button>
      </li>
              `;
    }

    document.querySelector(".js-tasks").innerHTML = htmlString;

  };

  const markAllDone = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));

    render();
  };

  const toggleHideDoneTasks = () => {
    hideDoneTask = !hideDoneTask;

    render();
  };
  const renderButtons = () => {
    let taskHtmlButton = "";

    if (tasks.length === 0) {
      taskHtmlButton = "";
    } else {
      taskHtmlButton += `
      <button 
        class= "section__button js-toggleHideDoneTask">
          ${hideDoneTask ? "Pokaż ukończone" : "Ukryj ukończone"}
      </button>
      <button
        class= "section__button js-markAllDone"
         ${tasks.every(({ done }) => done) ? "disabled" : ""}
      >
        Ukończ wszystkie
      </button>
      `;
    }

    document.querySelector(".js-button").innerHTML = taskHtmlButton;

  };

  const bindButtonEvents = () => {
    const markAllDoneButton = document.querySelector(".js-markAllDone");

    if (markAllDoneButton) {
      markAllDoneButton.addEventListener("click", markAllDone);
    }

    const toggleHideDoneButton = document.querySelector(
      ".js-toggleHideDoneTask"
    );

    if (toggleHideDoneButton) {
      toggleHideDoneButton.addEventListener("click", toggleHideDoneTasks);
    }

  };

  const render = () => {
    renderTasks();
    renderButtons();

    bindRemoveEvents();
    bindToggleDoneEvents();
    bindButtonEvents();
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