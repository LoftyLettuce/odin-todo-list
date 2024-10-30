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