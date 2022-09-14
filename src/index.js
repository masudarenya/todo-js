import "./styles.css";

const onClickAdd = () => {
  //値取得、初期化
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  createIncompleteList(inputText);
};

//押されたボタンの親タグ(li)を未完了リストから削除
const deleteFormImcompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
};

//未完了リストに追加する関数
const createIncompleteList = (text) => {
  //<li>生成
  const li = document.createElement("li");

  //<div class="list-low">生成
  const div = document.createElement("div");
  div.className = "list-row";

  //<p>生成
  const todo = document.createElement("p");
  todo.innerText = text;

  //<button>(完了)生成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    //押された完了ボタンの親タグ(li)を未完了リストから削除
    deleteFormImcompleteList(completeButton.closest("li"));

    //完了リストに追加する要素
    const addTarget = completeButton.parentNode;

    //ToDO内容テキストを取得
    const text = addTarget.firstElementChild.innerText;
    //div以下を初期化(使いまわし)
    addTarget.textContent = null;

    //pタグ生成
    const todo = document.createElement("p");
    todo.innerText = text;
    //buttonタグ生成
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    backButton.addEventListener("click", () => {
      //押された戻すボタンの親タグ(li)を未完了リストから削除
      const deleteTarget = backButton.closest("li");
      document.getElementById("complete-list").removeChild(deleteTarget);

      //テキスト取得
      const text = backButton.parentNode.firstElementChild.innerText;
      createIncompleteList(text);
    });

    //divタグの子要素に各要素設定
    addTarget.appendChild(todo);
    addTarget.appendChild(backButton);

    const li = document.createElement("li");
    li.appendChild(addTarget);

    document.getElementById("complete-list").appendChild(li);
  });

  //<button>(削除)生成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    //押された削除ボタンの親タグ(li)を未完了リストから削除
    deleteFormImcompleteList(deleteButton.closest("li"));
  });

  //<div>の中に<p>入れる
  div.appendChild(todo);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  li.appendChild(div);
  //本文のタグの中に入れる
  document.getElementById("incomplete-list").appendChild(li);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
