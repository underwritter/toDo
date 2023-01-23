const inpuTitle = document.querySelector(".inpuTitle");
const inputDescription = document.querySelector(".inputDescription");
const btnAdd = document.querySelector(".btnAdd");
const list = document.querySelector(".list");
const toDo = document.querySelector(".toDo");
const delite = document.querySelector(".delite");
const edit = document.querySelector(".edit");
const check = document.querySelector(".check");

let toDos = [];

btnAdd.addEventListener("click", (e) => {
  if (inpuTitle.value === "" || inputDescription.value === "") return;

  toDos.push({
    title: inpuTitle.value,
    description: inputDescription.value,
  });

  localStorage.setItem("toDos", JSON.stringify(toDos));

  resetForm();
  renderToDo();
  console.log(toDos);
});

const renderToDo = () => {
  list.innerHTML = "";
  toDos.map((x, y) => {
    return (list.innerHTML += `
        <div id=${y} class="toDo">

            <span class="title">${x.title}</span>

            <div class="toolBar">
                <div onClick= "deliteTask(this)"class="delite"></div>
                <div onClick= "editeTask(this)" class="edit"></div>
                <div onClick= "saveTask(this)" class="check"></div> 
            </div>

            <span contenteditable="false" class="discription">${x.description}</span>

        </div>
    `);
  });
};

const deliteTask = (e) => {
  e.parentElement.parentElement.remove();
  toDos.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("toDos", JSON.stringify(toDos));
};

const editeTask = (e) => {
  if (document.querySelectorAll("[contenteditable=false]")) {
    document
      .querySelectorAll("[contenteditable=false]")
      .forEach((e) => {e.setAttribute("contentEditable", true)
     
    });
  }
};

const saveTask = (e) => {
  if (document.querySelectorAll("[contenteditable=true]")) {
    document.querySelectorAll("[contenteditable=true]").forEach((e, i) => {
      e.setAttribute("contentEditable", false);
      toDos[i].description = e.innerHTML;
    });
    localStorage.setItem("toDos", JSON.stringify(toDos));
  } 
};

const resetForm = (e) => {
  inpuTitle.value = "";
  inputDescription.value = "";
};

(() => {
  toDos = JSON.parse(localStorage.getItem("toDos")) || [];
  renderToDo();
})();
