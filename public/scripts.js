// Webに埋め込むスクリプト
// Taskを読み込む=getAllTasksのエンドポイントにアクセスする。

// DOM: Document Object Model： JavaScript を使って、HTML 要素を動的に追加、削除、編集することが可能
// 特定の HTML 要素を指す変数で、指定したクラス名の最初の要素を選択します。
// したがって、このコードはHTMLドキュメントからクラス名'tasks'の最初の要素（おそらく<div>要素）を選択し、その参照をtasksDOM変数に格納します。
const tasksDOM = document.querySelector(".tasks");
const formDOM = document.querySelector(".task-form");
const taskInputDOM = document.querySelector(".task-input");
const formAlertDOM = document.querySelector(".form-alert");

const showTasks = async () => {
  try {
    // 自作のAPIをたたく
    const { data: tasks } = await axios.get("/api/v1/tasks");

    // Alert when there is no task
    if (tasks.length < 1) {
      tasksDOM.innerHTML = '<h5 class="empty-list">No Tasks ...</h5>';
      return;
    }

    // tasksの中身を取得
    const allTasks = tasks
      .map((task) => {
        // map関数で配列の中身を取り出す
        const { completed, _id, name } = task; // 分割代入
        //
        return `<div class="single-task ${completed && "task-completed"}"> 
                                <h5>
                                    <span><i class="far fa-check-circle"></i></span>
                                    ${name}
                                </h5>
                                <div class="task-links">
                                    <!-- 編集リンク -->
                                    <a href="edit.html?id=${_id}" class="edit-link">
                                        <i class="fas fa-edit"></i>
                                    </a>
                                    <!-- 削除リンク -->
                                    <button type="button" class="delete-btn" data-id="${_id}">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>`;
      })
      .join(""); // join関数で配列を文字列に変換

    tasksDOM.innerHTML = allTasks; // HTMLのtaskDOM部分ををallTasksで更新
  } catch (error) {
    console.log(error);
  }
};
showTasks(); // Call the function

// Create Task
formDOM.addEventListener("submit", async (event) => {
  // 'submit'は任意の名前？
  event.preventDefault(); // 送信ボタンを押したときのリロードを防ぐ
  const newName = taskInputDOM.value; // taskInputDOMのvalueを取得
  try {
    await axios.post("/api/v1/tasks", { name: newName });
    showTasks(); // Update the tasks
    taskInputDOM.value = ""; // Clear

    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = "New Task was added.";
    formAlertDOM.classList.add("text-success");
    setTimeout(() => {
      // style は DOM 要素の CSS スタイルを示す。
      // display は CSS プロパティの一つで、要素がページにどのように表示されるかを制御します。block、inline、none などがある。
      formAlertDOM.style.display = "none";
      formAlertDOM.classList.remove("text-success");
    }, 3000);
  } catch (error) {
    console.log(error);
    formAlertDOM.style.display = "block";
    formAlertDOM.innerHTML =
      "Task is too long. Please try again within 20 words.";
    setTimeout(() => {
      formAlertDOM.style.display = "none";
    }, 3000);
  }
});

// Delete Task
tasksDOM.addEventListener("click", async (event) => {
  const element = event.target; // クリックされた要素を取得
  if (element.parentElement.classList.contains("delete-btn")) {
    // クリックされた要素がdelete-btnクラスを持っているか確認
    // datasetプロパティは、HTML要素のdata-*属性を操作する。
    const id = element.parentElement.dataset.id; // クリックされた要素のdata-idを取得
    console.log(id);
    try {
      await axios.delete(`/api/v1/tasks/${id}`);
      showTasks(); // Update the tasks
    } catch (error) {
      console.log(error);
    }
  }
});
