import "./style.css"
import { add, differenceInDays, format } from "date-fns";
import { project } from "../project";
import { projectPage } from "../project-page/project-page"
const projectList = new Array();
let recentProject = null;
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
  localStorage.idGenerator = ++highestIdValue;
})();

function displayProject(project){
    const container = document.createElement("div");
    container.id = project.id;
    container.classList.add("project");
    const title = document.createElement("h1");
    const closeBtn = document.createElement("button");
    const projectInfoDisplay = document.createElement("ul");
    for (let i = 0; i < 3; i++)
    {
      const li = document.createElement("li");
      projectInfoDisplay.appendChild(li);
    }
    const lines = Array.from(projectInfoDisplay.children);
    let today = project.startDate;
    if (differenceInDays(new Date(), project.startDate) < 0)
    {
      today = new Date();
    }
    lines[0].textContent = `Starting from: ${project.startDate}`;
    lines[1].textContent = `End in: ${project.dueDate}`;
    lines[2].textContent = "Days left: " + differenceInDays(project.dueDate, today);
    closeBtn.textContent = "x";
    closeBtn.addEventListener("click", function(e){
      container.remove();
      //remove project from projectlist
      try{
        localStorage.removeItem(project.id);
      }
      catch(e){
        console.log(e);
      }
      projectList.splice(projectList.indexOf(project), 1);
      e.stopPropagation();
      function reset(){
        let root = document.querySelector("body .content");
        if (root)
        {
          root.remove();
        }
      }
      reset();
    })
    container.addEventListener("click", function(){
      if (recentProject)
      {
        recentProject.classList.remove('focus');
      }
      recentProject = container;
      container.classList.add('focus');
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
  const span = document.createElement("span");
  label.for = id;
  span.textContent = title;
  span.classList.add("name");
  input.type = type;
  input.name = name;
  input.id = id;
  input.required = required;
  if (hasValue)
  {
    input.value = value;
  }
  if (type == "radio")
  {
    label.append(input, span);
  }
  else
  {
    label.append(span, input);
  }
  if (type == "date")
  {
    console.log(type);
    const span = document.createElement('span');
    span.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>calendar-month</title><path d="M9,10V12H7V10H9M13,10V12H11V10H13M17,10V12H15V10H17M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5A2,2 0 0,1 5,3H6V1H8V3H16V1H18V3H19M19,19V8H5V19H19M9,14V16H7V14H9M13,14V16H11V14H13M17,14V16H15V14H17Z" /></svg>';
    span.addEventListener('click', ()=>{
      if (!input.disabled)
      {
        input.showPicker();
      }
    })
    span.classList.add("calendar-icon");
    label.appendChild(span);
  }
  return {label: label, input: input};
}
function createForm(){
  const form = document.createElement("form");
  form.method = "dialog";
  form.appendChild(newInput("text", "Name", "Name: ", "name", true, false).label);
  const startDay = newInput("date", "start", "Day start: ", "start", true, false);
  const dueDate = newInput("date", "due", "Day due: ", "due", true, false);
  dueDate.input.disabled = true;
  startDay.input.setAttribute('min', format(new Date(), 'yyyy-MM-dd'));
  startDay.input.addEventListener('input', ()=>{
    if (startDay.input.value != null)
    {
      if (dueDate.input.value != null && new Date(startDay.input.value) > new Date(dueDate.input.value))
      {  
        dueDate.input.value = null;
      }
      else if (startDay.input.checkValidity())
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
export {createForm, newInput};
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
    const welcome = document.createElement('h1');
    welcome.textContent = 'WELCOME TO TODO LIST';
    welcome.id = 'welcome';
    content.appendChild(welcome);
    //add Add Button
    const addBtn = document.createElement("button");
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
    projectElement.click();
  };
  return {display, update};
}();