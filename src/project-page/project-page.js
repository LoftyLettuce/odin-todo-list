import { homePage, createForm } from "../home-page/home";
import { itemPage } from "../item-page/item-page";
import { todoItem } from "../todoItem";
export const projectPage = function(){
  function display(project){
    //remove all elements in the previous page
      let root = document.querySelector("body .content");
      if (root)
      {
        root.remove();
      }
    //add new page
    root = document.createElement('div');
    root.className = 'content';
    document.querySelector('body').appendChild(root);
    //add edit button
    const titleBox = document.createElement('input');
    titleBox.value = project.name;
    titleBox.required = true;
    const editBtn = document.createElement('button');
    editBtn.textContent = "Edit";
    editBtn.addEventListener('click', ()=>{
      if (!titleBox.checkValidity()){return;}
      const dialog = document.createElement('dialog');
      dialog.className = 'dialog';
      const form = createForm();
      const inputs = form.querySelectorAll('input');
      inputs[0].value = project.name;
      inputs[1].value = project.startDate;
      inputs[2].value = project.dueDate;
      dialog.appendChild(form);
      for (let i = 0; i < 2; i++)
      {
        dialog.appendChild(document.createElement('button'));
      }
      const buttons = dialog.querySelectorAll('button');
      buttons[0].addEventListener('click', () => {
        dialog.remove();
      })
      buttons[1].addEventListener('click', () => {
        console.log(inputs[1].value);
        project.setProperties(inputs[0].value, inputs[1].value, inputs[2].value);
        homePage.update(project);
        dialog.remove();
      })
      root.appendChild(dialog);
      dialog.showModal();
    })
    root.append(titleBox, editBtn);
    //display toDoItem
    function createContainer(itemInfo){
      let container = document.createElement('div');
      let p = document.createElement('p');
      p.textContent = `${itemInfo.title}: ${itemInfo.content}`;
      //add remove item
      const removeBtn = document.createElement('button');
      removeBtn.textContent = "remove";
      removeBtn.addEventListener('click', (e)=>{
        itemInfo.parent.removeItem(itemInfo.id);
        container.remove();
        e.stopPropagation();
      })
      container.append(p, removeBtn);
      return container;
    }
    function itemDisplay(item){
      const itemInfo = item.getContent();
      const container = createContainer(itemInfo)
      container.addEventListener("click", function(){
        itemPage.display(item, container.querySelector('p'));
      })
      root.appendChild(container);
    }
    project.toDoList.forEach((item)=>{
      const itemWithParent = Object.assign({}, item, {parent: project,});
      itemDisplay(new todoItem(itemWithParent));
    });
    //add new item
    const addButton = document.createElement('button');
    addButton.addEventListener('click', ()=>{
      itemPage.display(new todoItem({title:"", content:"", priority:"", parent: project, id: 0}));
    })
    root.appendChild(addButton);
  }
  return {display};
}();