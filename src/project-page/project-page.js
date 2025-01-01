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
    const title = document.createElement('h1');
    title.textContent = project.name;
    const header = document.createElement('div');
    header.className = 'header';
    const editBtn = document.createElement('button');
    editBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>tag-edit-outline</title><path d="M21.41 11.58L12.41 2.58C12.04 2.21 11.53 2 11 2H4C3.47 2 2.96 2.21 2.59 2.59C2.21 2.96 2 3.47 2 4V11C2 11.26 2.05 11.53 2.15 11.77C2.25 12 2.4 12.23 2.59 12.42L4.57 14.4L6 13L4 11V4H11L20 13L13 20L10.87 17.87L10.7 18.04L10.7 18.03L9.45 19.28L11.59 21.42C11.97 21.79 12.47 22 13 22C13.53 22 14.04 21.79 14.41 21.41L21.41 14.41C21.79 14.04 22 13.53 22 13C22 12.74 21.95 12.5 21.85 12.23C21.75 12 21.6 11.77 21.41 11.58M6.5 5C6.8 5 7.09 5.09 7.33 5.25C7.58 5.42 7.77 5.65 7.89 5.93C8 6.2 8.03 6.5 7.97 6.79C7.91 7.08 7.77 7.35 7.56 7.56C7.35 7.77 7.08 7.91 6.79 7.97C6.5 8.03 6.2 8 5.93 7.89C5.65 7.77 5.42 7.58 5.25 7.33C5.09 7.09 5 6.8 5 6.5C5 6.1 5.16 5.72 5.44 5.44C5.72 5.16 6.1 5 6.5 5M10.7 15.35L11.7 14.35C11.91 14.14 11.91 13.79 11.7 13.58L10.42 12.3C10.21 12.09 9.86 12.09 9.65 12.3L8.65 13.3L10.7 15.35M8.06 13.88L2 19.94V22H4.06L10.11 15.93L8.06 13.88Z" /></svg>';
    editBtn.className = 'edit';
    editBtn.addEventListener('click', ()=>{
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
        form.appendChild(document.createElement('button'));
      }
      const buttons = dialog.querySelectorAll('button');
      buttons[0].textContent = 'Cancel';
      buttons[0].addEventListener('click', () => {
        dialog.remove();
      })
      buttons[1].textContent = 'Add';
      buttons[1].addEventListener('click', () => {
        console.log(inputs[1].value);
        project.setProperties(inputs[0].value, inputs[1].value, inputs[2].value);
        homePage.update(project);
        dialog.remove();
      })
      root.appendChild(dialog);
      dialog.showModal();
    })
    header.append(title, editBtn);
    root.append(header);
    //display toDoItem
    function createContainer(itemInfo){
      let container = document.createElement('div');
      let p = document.createElement('p');
      container.classList.add("item")
      p.textContent = `${itemInfo.title}: ${itemInfo.content}`;
      p.className = itemInfo.priority;
      //add remove item
      const removeBtn = document.createElement('button');
      removeBtn.addEventListener('click', (e)=>{
        itemInfo.parent.removeItem(itemInfo.id);
        container.remove();
        e.stopPropagation();
      })
      container.append(removeBtn, p);
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
    addButton.className = 'add';
    addButton.addEventListener('click', ()=>{
      itemPage.display(new todoItem({title:"", content:"", priority:-1, parent: project, id: 0}));
    })
    header.appendChild(addButton);
  }
  return {display};
}();