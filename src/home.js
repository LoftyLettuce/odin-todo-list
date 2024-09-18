export const homePage = function(){
  function display(projectList)
  {
    projectList.forEach(function(project){
      console.log(`${project.name} : ${project.todoList}`);
    })
  };
  return {display};
}();