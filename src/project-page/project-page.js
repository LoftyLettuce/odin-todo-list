import { itemPage } from "../item-page/item-page";
import { todoItem } from "../todoItem";
import { homePage } from "../home-page/home";
export const projectPage = function(){
  function display(project){
    //remove all elements in the previous page
    let root = document.querySelector("body>div");
    root.remove();
    //add new page
    root = document.createElement('div');
    root.className = 'project-page';
    document.querySelector('body').appendChild(root);
    const backButton = document.createElement('button');
    backButton.addEventListener('click', ()=>{
      homePage.display();
    })
    root.appendChild(backButton);
    function createContainer(itemInfo){
      let container = document.createElement('div');
      container.textContent = `${itemInfo.title}: ${itemInfo.content}`;
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
    project.toDoList.forEach((item)=>{itemDisplay(new todoItem(item))});
    itemDisplay(new todoItem(project.addItem("title", "content", "priority")));
    itemDisplay(new todoItem(project.addItem("title2", "content2", "priority2")));
    itemDisplay(new todoItem(project.addItem("title3", "content3", "priority3")));
  }
  return {display};
}();