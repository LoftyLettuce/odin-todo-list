import {todoItem} from "./todoItem"
export class project {
  constructor(name, date) {
    this.name = name;
    this.dueDate = date;
    this.toDoList = new Array();
  }
  addItem(title, content, priority) {
    const newItem = new todoItem(title, content, priority);
    this.toDoList.push(newItem);
    return newItem;
  }
  removeItem(target) {
    this.toDoList.splice(this.toDoList.indexOf(target), 1);
  }
};