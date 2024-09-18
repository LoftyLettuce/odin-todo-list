export const projectPage = function(){
  function display(project){
    function itemDisplay(item){
      item.setProperty("hehe");
      const itemInfo = item.getContent();
      console.log(`${itemInfo.title}: ${itemInfo.content}`);
    }
    project.toDoList.forEach((item)=>{itemDisplay(item)});
    itemDisplay(project.addItem("title", "content", "priority"));
    itemDisplay(project.addItem("title2", "content2", "priority2"));
    itemDisplay(project.addItem("title3", "content3", "priority3"));
  }
  return {display};
}();