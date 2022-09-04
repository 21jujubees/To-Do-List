const parentListElement = document.getElementById("list");

let todoList = [];

class Task {
  constructor(name, priority) {
    this.name = name;
    this.priority = priority;
  }
}

const listStorage = localStorage.getItem("todoList");
if (listStorage !== null) {
  todoList = JSON.parse(listStorage).map((item) => {
    return new Task(item.name, item.priority);
  });
}

refreshUI();

function updateStorage() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

function refreshUI() {
  parentListElement.innerHTML = "";
	console.log(todoList);
	
	todoList.forEach((item, index) => {
		const listElement = document.createElement("li");
		const textNode = document.createTextNode(`${item.name}`);
		listElement.appendChild(textNode);
		parentListElement.appendChild(listElement);
		listElement.classList.add("list-group-item", "d-flex", "justify-content-between");
    
    if (item.priority == "High") {
      listElement.classList.add('bg-danger');
    }
    else if (item.priority == "Medium") {
      listElement.classList.add('bg-warning');
    }
    else listElement.classList.add('bg-success');

    const deleteButton = document.createElement("button");
    const deleteTextNode = document.createTextNode("delete");
    deleteButton.appendChild(deleteTextNode);
    deleteButton.classList.add("btn", "btn-primary");
    listElement.appendChild(deleteButton);
  
    deleteButton.addEventListener("click", () => {
      todoList.splice(index, 1);
      updateStorage();
      refreshUI();
    });
	});  
}

function addTask(form) {
  const taskName = form.taskName.value;
  const taskPriority = form.taskPriority.value;

  const task = new Task(taskName, taskPriority);
  todoList.push(task);

  updateStorage();
  refreshUI();

  return false;
}