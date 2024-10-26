import {todoItem} from "./todoItem"
import { addDays } from "date-fns";
export class project {
  constructor(name, startDate, dueDate) {
    this.name = name;
    this.startDate = startDate;
    this.dueDate = dueDate;
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