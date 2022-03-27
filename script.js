const inputTask = document.querySelector(".inputText input");
const task = document.querySelector(".task-list");
const filter = document.querySelectorAll(".filter span");
const clearAll = document.querySelector(".btn");
const spanAll = document.getElementById("all");

// get localStorage value
let storeData = JSON.parse(localStorage.getItem("todo-list"));

// span tracker for filter
let spanTracker = "all";

// local variable for edit item
let editId = 0;
let editTracker = false;

// filer  (7th or wish)
filter.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    spanTracker = btn.id;
    showList(spanTracker);
  });
});

// show value after from local storage (2nd)
function showList(filter) {
  let li = "";
  if (storeData) {
    storeData.forEach((value, id) => {
      let isCompleted = value.status == "completed" ? "checked" : "";
      if (value.status == filter || "all" == filter) {
        //for filer
        li += `<li class="task" >
        <label for=${id}>
          <input onclick = "updateStatus(this)" type="checkbox" id=${id} ${isCompleted}/>
          <p class=" ${isCompleted}">${value.name}</p>
        </label>
        <div class="setting" >
          <i onclick ="showMenu(this)" class="uil uil-ellipsis-h"></i>
          <ul class="sideMenu" >
            <li onclick ="editor(${id})">
              <i  class="uil uil-pen">Edit</i>
            </li>
            <li onclick ="deleteFunc(${id})">
              <i class="uil uil-trash">Delete</i>
            </li>
          </ul>
        </div>
      </li>`;
      }
    });
  }
  task.innerHTML = li || "There is no value"; // when clear span
}
// for window update
showList("all");

// update status (3rd)
function updateStatus(checkbox) {
  let paragrapTag = checkbox.parentElement.lastElementChild;
  if (checkbox.checked) {
    paragrapTag.classList.add("checked");
    storeData[checkbox.id].status = "completed";
  } else {
    paragrapTag.classList.remove("checked");
    storeData[checkbox.id].status = "pending";
  }
  localStorage.setItem("todo-list", JSON.stringify(storeData));
}

// show side menu by click (4th)
function showMenu(ellipsis) {
  let menu = ellipsis.parentElement.lastElementChild;
  menu.classList.add("show");
  document.addEventListener("click", (e) => {
    if (e.target.tagName != "I" && e.target != ellipsis) {
      menu.classList.remove("show");
    }
  });
}

// edit task (5th or wish)
function editor(id) {
  editId = id;
  inputTask.value = storeData[id].name;
  editTracker = true;
}

//delete function (6th or wish)
function deleteFunc(id) {
  storeData.splice(id, 1);
  localStorage.setItem("todo-list", JSON.stringify(storeData));
  showList(spanTracker); //spanTracker means delete it will go current span
}

//clear all (last task)
clearAll.addEventListener("click", () => {
  storeData.splice(0, storeData.length);
  //  reset active span
  document.querySelector("span.active").classList.remove("active");
  spanAll.classList.add("active");
  //  set value into local storage
  localStorage.setItem("todo-list", JSON.stringify(storeData));
  showList("all"); //all means after clear all it will go all span
});

// start from here
inputTask.addEventListener("keyup", (e) => {
  let todoData = inputTask.value.trim();
  if (e.key == "Enter" && todoData) {
    if (!editTracker) {
      //when work with edit task (edit func)
      if (!storeData) {
        storeData = [];
      }
      let users = { name: todoData, status: "pending" };
      //  push value
      storeData.push(users);
    } else {
      //edit just name (edit func)
      storeData[editId].name = todoData; //todoData get value inputTask.value after edit func
      editTracker = false;
    }
    //  clear input
    inputTask.value = "";
    //  set value into local storage
    localStorage.setItem("todo-list", JSON.stringify(storeData));
    showList("all"); //all means after enter new text it will go all span
  }
});
