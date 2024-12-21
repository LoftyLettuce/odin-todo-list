import "./style.css"
import { add, differenceInDays, format } from "date-fns";
import { project } from "../project";
import { projectPage } from "../project-page/project-page"
const projectList = new Array();
let storageLength;
try 
{
  storageLength = localStorage.length;
}
catch(e)
{
  storageLength = 0;
}
(function displayLocalProject(){
  let highestIdValue = -1;
  for (let i = 0; i < storageLength; i++)
  {
    try {
      if (localStorage.key(i) == "idGenerator"){continue;}
      let projectInfo = JSON.parse(localStorage.getItem(localStorage.key(i)));
      let newProject = new project(localStorage.key(i), projectInfo.name, projectInfo.startDate, projectInfo.dueDate);
      newProject.toDoList = projectInfo.toDoList;
      projectList.push(newProject);
      if (highestIdValue < newProject.id)
      {
        highestIdValue = newProject.id;
      }
    }
    catch(e)
    {
      console.log(e);
    }
  }
  localStorage.idGenerator = highestIdValue++;
})();

function displayProject(project){
    const container = document.createElement("div");
    container.id = project.id;
    const title = document.createElement("h1");
    const closeBtn = document.createElement("button");
    const projectInfoDisplay = document.createElement("ul");
    for (let i = 0; i < 3; i++)
    {
      const li = document.createElement("li");
      projectInfoDisplay.appendChild(li);
    }
    const lines = Array.from(projectInfoDisplay.children);
    lines[0].textContent = `Starting from: ${project.startDate}`;
    lines[1].textContent = `End in: ${project.dueDate}`;
    lines[2].textContent = "Days left: " + differenceInDays(project.dueDate, project.startDate);
    closeBtn.textContent = "x";
    closeBtn.addEventListener("click", function(e){
      container.remove();
      //remove project from projectlist
      try{
        console.log(project.id);
        localStorage.removeItem(project.id);
      }
      catch(e){
        console.log(e);
      }
      projectList.splice(projectList.indexOf(project), 1);
      e.stopPropagation();
      function reset(){
        let root = document.querySelector("body .content");
        root.remove();
      }
      reset();
    })
    container.addEventListener("click", function(){
      projectPage.display(project);
    })
    title.textContent = project.name;
    container.append(title, closeBtn, projectInfoDisplay);
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
  return {label: label, input: input};
}
function createForm(){
  const form = document.createElement("form");
  const fieldset = document.createElement("fieldset");
  const legend = document.createElement("legend");
  form.method = "dialog";
  form.appendChild(newInput("text", "Name", "Name: ", "name", true, false).label);
  const startDay = newInput("date", "start", "Day start: ", "start", true, false);
  const dueDate = newInput("date", "due", "Day due: ", "due", true, false);
  dueDate.input.disabled = true;
  startDay.input.setAttribute('min', format(new Date(), 'yyyy-MM-dd'));
  startDay.input.addEventListener('input', ()=>{
    console.log(startDay.input.value)
    if (startDay.input.value != null)
    {
      if (dueDate.input.value != null && new Date(startDay.input.value) > new Date(dueDate.input.value))
      {  
        dueDate.input.value = null;
      }
      else if (dueDate.input.disabled)
      {
        dueDate.input.setAttribute('min', startDay.input.value);
        dueDate.input.disabled = false;
      }
    }
    if (startDay.input.value == null || startDay.input.value == "")
    {
      dueDate.input.disabled = true;
      dueDate.input.value = null
    }
  })
  form.appendChild(startDay.label);
  form.appendChild(dueDate.label);
  form.appendChild(fieldset);
  legend.textContent = "Priority";
  fieldset.appendChild(legend);
  fieldset.appendChild(newInput("radio", "priority", "super important", "superImportant", true, true, 1).label);
  fieldset.appendChild(newInput("radio", "priority", "important", "important", true, true, 0).label);
  fieldset.appendChild(newInput("radio", "priority", "not that important", "notThatImportant", true, true, -1).label);
  return form;
}
function createDialog()
{
  const dialog = document.createElement("dialog");
  dialog.className = 'dialog';
  const h1 = document.createElement("h1");
  h1.textContent = "New Project";
  const form = createForm();
  //add button
  const addBtn = document.createElement("button");
  const cancelBtn = document.createElement("button");
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
    const today = new Date();
    const root = document.querySelector("div[class='home']");
    const inputList = dialog.querySelectorAll("input");
    const priority = document.querySelector("input[name='priority']:checked");
    const nameProject = inputList[0].value, startDateValue  = inputList[1].value, dueDateValue = inputList[2].value;
    //Check date validity
    if (dueDateValue < today || startDateValue < today) {return;} 
    ///name, startdate, duedate
    const newProject = new project(localStorage.idGenerator, nameProject, startDateValue, dueDateValue);
    projectList.push(newProject);
    try {
      localStorage.idGenerator++;
      localStorage.setItem(newProject.id, JSON.stringify(newProject.getStorageInfo()));
    }
    catch(e) {
      console.log(e);
    }
    priority.checked = false;
    // reset
    inputList.forEach(function(input){
      input.value = null;
    })
    root.appendChild(displayProject(newProject))
  })
  dialog.append(h1, form);
  form.append(addBtn, cancelBtn);
  return dialog;
}
export {createForm};
export const homePage = function(){
  function display()
  {
    // add dialog
    const root = document.createElement('div');
    root.appendChild(createDialog());
    document.querySelector('body').appendChild(root);
    root.className = "home";
    const content = document.createElement('div');
    document.querySelector('body').appendChild(content);
    content.className = 'content';
    const addBtn = document.createElement("button");
    //add Add Button
    addBtn.textContent = "Add";
    addBtn.addEventListener("click", function(){
      document.querySelector("dialog").showModal();
    })
    root.appendChild(addBtn);
    //display
    projectList.forEach(function(project){
      root.appendChild(displayProject(project));
    })
  };
  function update(project)
  {
    const projectElement = document.getElementById(project.id);
    projectElement.querySelector('h1').textContent = project.name;
    const lines = projectElement.querySelector('ul').children;
    lines[0].textContent = `Starting from: ${project.startDate}`;
    lines[1].textContent = `End in: ${project.dueDate}`;
    lines[2].textContent = "Days left: " + differenceInDays(project.dueDate, project.startDate);
  };
  return {display, update};
}();