import { projectPage } from "../project-page/project-page";

export const itemPage = function(){
  function display(item, htmlItem){
    //remove all elements in the previous page
    // let root = document.querySelector("body .content");
    // root.remove();
    // Create dialog
    const itemInfo = item.getContent();
    const root = document.createElement('dialog');
    root.className = 'dialog';
    const titleBox = document.createElement('input');
    const contentBox = document.createElement('input');
    titleBox.value = itemInfo.title;
    titleBox.required = true;
    contentBox.value = itemInfo.content;
    root.append(titleBox, contentBox);
    document.querySelector('body').appendChild(root);
    root.showModal();
    //back to project
    const backButton = document.createElement('button');
    backButton.addEventListener('click', ()=>{
      root.remove();
    })
    root.appendChild(backButton);
    //edit item
    const editButton = document.createElement('button');
    editButton.addEventListener('click', ()=>{
      item.setProperty(titleBox.value, contentBox.value);
      htmlItem.textContent = `${titleBox.value}: ${contentBox.value}`;
      root.remove();
    })
    root.appendChild(editButton);
    //add new item
    const addButton = document.createElement('button');
    addButton.addEventListener('click', ()=>{
      if (!titleBox.checkValidity()){return;}
      let parent = itemInfo.parent;
      parent.addItem(titleBox.value, contentBox.value, 0);
      projectPage.display(itemInfo.parent);
      root.remove();
    })
    root.appendChild(addButton);
  }
  return {display}
}();