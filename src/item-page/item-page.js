import { projectPage } from "../project-page/project-page";
export const itemPage = function(){
  function display(item){
    //remove all elements in the previous page
    let root = document.querySelector("body>div");
    root.remove();
    //add new page
    root = document.createElement('div');
    root.className = 'item-page';
    document.querySelector('body').appendChild(root);
    const itemInfo = item.getContent();
    console.log(itemInfo);
    const titleBox = document.createElement('input');
    const contentBox = document.createElement('input');
    titleBox.value = itemInfo.title;
    contentBox.value = itemInfo.content;
    root.append(titleBox, contentBox);
    //back button
    const backButton = document.createElement('button');
    backButton.addEventListener('click', ()=>{
      projectPage.display(itemInfo.parent);
    })
    root.appendChild(backButton);
    //edit button
    const editButton = document.createElement('button');
    editButton.addEventListener('click', ()=>{
      item.setProperty(titleBox.value, contentBox.value);
    })
    root.appendChild(editButton);
  }
  return {display}
}();