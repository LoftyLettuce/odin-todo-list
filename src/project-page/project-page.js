export const projectPage = function(){
  function display(project){
    let root = document.querySelector(".home");
    root.remove();
    console.log(root)
    root = document.createElement('div');
    root.className = 'project-page';
    document.querySelector('body').appendChild(root);
    function createContainer(itemInfo){
      let container = document.createElement('div');
      container.textContent = `${itemInfo.title}: ${itemInfo.content}`;
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