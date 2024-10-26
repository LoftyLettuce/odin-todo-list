import { itemPage } from "../item-page/item-page";
export const projectPage = function(){
  function display(project){
    //remove all elements in the previous page
    let root = document.querySelector("body>div");
    root.remove();
    //add new page
    root = document.createElement('div');
    root.className = 'project-page';
    document.querySelector('body').appendChild(root);
    function createContainer(itemInfo){
      let container = document.createElement('div');
      container.textContent = `${itemInfo.title}: ${itemInfo.content}`;
      container.addEventListener("click", function(){
        itemPage.display(itemInfo);
      })
      return container;
    }
    function itemDisplay(item){
      item.setProperty("hehe");
      const itemInfo = item.getContent();
      root.appendChild(createContainer(itemInfo))
    }
    project.toDoList.forEach((item)=>{itemDisplay(item)});
    itemDisplay(project.addItem("title", "content", "priority"));
    itemDisplay(project.addItem("title2", "content2", "priority2"));
    itemDisplay(project.addItem("title3", "content3", "priority3"));
  }
  return {display};
}();