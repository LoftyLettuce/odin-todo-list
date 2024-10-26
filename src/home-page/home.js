import "./style.css"
import { add, differenceInDays } from "date-fns";
import { project } from "../project";
import { projectPage } from "../project-page/project-page"
const projectList = new Array();
function displayProject(project){
    const container = document.createElement("div");
    const title = document.createElement("h1");
    const closeBtn = document.createElement("button");
    const p = document.createElement("p");
    p.textContent = "Days left: " + differenceInDays(project.dueDate, new Date());
    closeBtn.textContent = "x";
    closeBtn.addEventListener("click", function(){
      container.remove();
      //remove project from projectlist
      projectList.splice(projectList.indexOf(project), 1);
    })
    container.addEventListener("click", function(){
      projectPage.display(project);
    })
    title.textContent = project.name;
    container.appendChild(title);
    container.appendChild(closeBtn);
    container.appendChild(p);
    console.log(`${project.name} : ${project.todoList}`);
    return container;
}
function newInput(type, name, title, id, required, hasValue, value="")
{
  const label = document.createElement("label");
  const input = document.createElement("input");
  label.for = id;
  label.textContent = title;
  input.type = type;
  input.name = name;
  input.id = id;
  input.required = required;
  if (hasValue)
  {
    input.value = value;
  }
  label.appendChild(input);
  return label;
}
function createForm(){
  const dialog = document.createElement("dialog");
  const h1 = document.createElement("h1");
  const form = document.createElement("form");
  const fieldset = document.createElement("fieldset");
  const legend = document.createElement("legend");
  const addBtn = document.createElement("button");
  const cancelBtn = document.createElement("button");
  h1.textContent = "New Project";
  form.method = "dialog";
  form.appendChild(newInput("text", "Name", "Name: ", "name", true, false));
  form.appendChild(newInput("date", "start", "Day start: ", "start", true, false));
  form.appendChild(newInput("date", "due", "Day due: ", "due", true, false));
  form.appendChild(fieldset);
  legend.textContent = "Priority";
  fieldset.appendChild(legend);
  fieldset.appendChild(newInput("radio", "priority", "super important", "superImportant", true, true, 1));
  fieldset.appendChild(newInput("radio", "priority", "important", "important", true, true, 0));
  fieldset.appendChild(newInput("radio", "priority", "not that important", "notThatImportant", true, true, -1));
  addBtn.textContent = "Add";
  addBtn.type = "submit";
  addBtn.value = "add";
  //Create cancel button event
  cancelBtn.textContent = "Cancel";
  cancelBtn.type = "button";
  cancelBtn.addEventListener("click", function(){
    dialog.returnValue = "cancel";
    dialog.close();
  })
  dialog.addEventListener("close", function(e){
    if (e.target.returnValue == "cancel"){return;}
    // add new project
    const root = document.querySelector("div[class='home']");
    const inputList = dialog.querySelectorAll("input");
    const priority = document.querySelector("input[name='priority']:checked");
    const newProject = new project(inputList[0].value, inputList[1].value, inputList[2].value);
    projectList.push(newProject);
    priority.checked = false;
    // reset
    inputList.forEach(function(input){
      input.value = null;
    })
    root.appendChild(displayProject(newProject));
  })
  form.appendChild(addBtn);
  form.appendChild(cancelBtn);
  dialog.appendChild(h1);
  dialog.appendChild(form);
  return dialog;
}

export const homePage = function(){
  function display()
  {
    const root = document.querySelector("div");
    const addBtn = document.createElement("button");
    // add Modal
    root.appendChild(createForm());
    root.className = "home";
    //display
    projectList.forEach(function(project){
      root.appendChild(displayProject(project));
    })
    addBtn.textContent = "Add";
    addBtn.addEventListener("click", function(){
      document.querySelector("dialog").showModal();
    })
    root.appendChild(addBtn);
  };
  return {display};
}();