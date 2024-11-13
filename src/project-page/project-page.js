import { itemPage } from "../item-page/item-page";
import { todoItem } from "../todoItem";
export const projectPage = function(){
  function display(project){
    //remove all elements in the previous page
    let root = document.querySelector("body .content");
    root.remove();
    //add new page
    root = document.createElement('div');
    root.className = 'content';
    document.querySelector('body').appendChild(root);
    root.appendChild(backButton);
    //add edit button
    const titleBox = document.createElement('input');
    titleBox.value = project.name;
    titleBox.required = true;
    const editBtn = document.createElement('button');
    editBtn.textContent = "Edit";
    editBtn.addEventListener('click', ()=>{
      if (!titleBox.checkValidity()){return;}
      project.setProperties(titleBox.value);
    })
    root.appendChild(titleBox);
    root.appendChild(editBtn);
    //display toDoItem
    function createContainer(itemInfo){
      let container = document.createElement('div');
      container.textContent = `${itemInfo.title}: ${itemInfo.content}`;
      //add remove item
      const removeBtn = document.createElement('button');
      removeBtn.textContent = "remove";
      removeBtn.addEventListener('click', (e)=>{
        itemInfo.parent.removeItem(itemInfo.id);
        container.remove();
        e.stopPropagation();
      })
      container.appendChild(removeBtn);
      return container;
    }
    function itemDisplay(item){
      const itemInfo = item.getContent();
      const container = createContainer(itemInfo)
      container.addEventListener("click", function(){
        itemPage.display(item);
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