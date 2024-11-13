import { projectPage } from "../project-page/project-page";
export const itemPage = function(){
  function display(item){
    //remove all elements in the previous page
    let root = document.querySelector("body .content");
    root.remove();
    //add new page
    root = document.createElement('div');
    root.className = 'content';
    document.querySelector('body').appendChild(root);
    const itemInfo = item.getContent();
    console.log(itemInfo);
    const titleBox = document.createElement('input');
    const contentBox = document.createElement('input');
    titleBox.value = itemInfo.title;
    titleBox.required = true;
    contentBox.value = itemInfo.content;
    root.append(titleBox, contentBox);
    //back to project
    const backButton = document.createElement('button');
    backButton.addEventListener('click', ()=>{
      projectPage.display(itemInfo.parent);
      console.log(itemInfo.parent);
    })
    root.appendChild(backButton);
    //edit item
    const editButton = document.createElement('button');
    editButton.addEventListener('click', ()=>{
      item.setProperty(titleBox.value, contentBox.value);
      projectPage.display(itemInfo.parent);
    })
    root.appendChild(editButton);
    //add new item
    const addButton = document.createElement('button');
    addButton.addEventListener('click', ()=>{
      if (!titleBox.checkValidity()){return;}
      let parent = itemInfo.parent;
      parent.addItem(titleBox.value, contentBox.value, 0);
      projectPage.display(itemInfo.parent);
    })
    root.appendChild(addButton);
  }
  return {display}
}();