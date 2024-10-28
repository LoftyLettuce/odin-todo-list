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
    const backButton = document.createElement('button');
    backButton.addEventListener('click', ()=>{
      projectPage.display(item.parent);
    })
    root.appendChild(backButton);
    const titleBox = document.createElement('input');
    const contentBox = document.createElement('input');
    titleBox.value = item.title;
    contentBox.value = item.content;
    root.append(titleBox, contentBox);
  }
  return {display}
}();