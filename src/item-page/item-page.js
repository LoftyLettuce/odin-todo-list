import { projectPage } from "../project-page/project-page";
import { newInput } from "../home-page/home";
export const itemPage = function(){
  function display(item, htmlItem){
    // Create dialog
    const itemInfo = item.getContent();
    const root = document.createElement('dialog');
    root.className = 'dialog';
    const form = document.createElement("form");
    const fieldset = document.createElement("fieldset");
    const legend = document.createElement("legend");
    const labelTitle = document.createElement("label");
    labelTitle.textContent = "Name:";
    const titleBox = document.createElement('input');
    labelTitle.appendChild(titleBox);
    const labelContent = document.createElement("label");
    labelContent.textContent = "Content:"
    const contentBox = document.createElement('input');
    labelContent.appendChild(contentBox);
    titleBox.value = itemInfo.title;
    titleBox.required = true;
    contentBox.value = itemInfo.content;
    form.append(labelTitle, labelContent);
    legend.textContent = "Priority";
    fieldset.appendChild(legend);
    fieldset.appendChild(newInput("radio", "priority", "not that important", "notThatImportant", true, true, -1).label);
    fieldset.appendChild(newInput("radio", "priority", "important", "important", true, true, 0).label);
    fieldset.appendChild(newInput("radio", "priority", "super important", "superImportant", true, true, 1).label);
    const inputs = fieldset.querySelectorAll('fieldset input');
    for (let i = 0; i < 3; i++)
    {
        inputs[i].checked = (inputs[i].value == itemInfo.priority);
    }
    form.appendChild(fieldset);
    //back to project
    const backButton = document.createElement('button');
    backButton.addEventListener('click', ()=>{
      root.remove();
    })
    //edit item
    const editButton = document.createElement('button');
    editButton.addEventListener('click', ()=>{
      item.setProperty(titleBox.value, contentBox.value, document.querySelector('input[name="priority"]:checked').value);
      htmlItem.textContent = `${titleBox.value}: ${contentBox.value}`;

      root.remove();
    })
    //add new item
    const addButton = document.createElement('button');
    addButton.addEventListener('click', ()=>{
      if (!titleBox.checkValidity()){return;}
      let parent = itemInfo.parent;
      parent.addItem(titleBox.value, contentBox.value, document.querySelector('input[name="priority"]:checked').value);
      projectPage.display(itemInfo.parent);
      root.remove();
    })
    form.append(backButton, editButton, addButton);
    root.appendChild(form);
    document.querySelector('body').appendChild(root);
    root.showModal();
  }
  return {display}
}();