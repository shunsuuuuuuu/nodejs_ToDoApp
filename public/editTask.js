const taskIdDOM = document.querySelector(".task-edit-id");
const taskNameDOM = document.querySelector(".task-edit-name");
const taskCompletedDOM = document.querySelector(".task-edit-completed");
const editFormDOM = document.querySelector(".single-task-form");
const formAlertDOM = document.querySelector(".form-alert");

const params = window.location.search;
const id = new URLSearchParams(params).get("id");
console.log(id);

// Show the task id
const showTask = async () => {
  try {
    const { data: task } = await axios.get(`/api/v1/tasks/${id}`); // {data:task}:taskのdataを取得
    const { _id, completed, name } = task;
    taskIdDOM.textContent = _id;
    taskNameDOM.value = name;
    taskCompletedDOM.checked = completed;
  } catch (error) {
    console.log(error);
  }
};

showTask();

// Edit Task
editFormDOM.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    await axios.patch(`/api/v1/tasks/${id}`, {
      name: taskNameDOM.value,
      completed: taskCompletedDOM.checked,
    });

    // Alert
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = "Task was updated.";
    formAlertDOM.classList.add("text-success");

    setTimeout(() => {
      formAlertDOM.style.display = "none";
    }, 3000);
  } catch (error) {
    console.log(error);
  }
});
