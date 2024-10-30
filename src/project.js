import {todoItem} from "./todoItem"
import { addDays } from "date-fns";
export class project {
  constructor(name, startDate, dueDate) {
    this.name = name;
    this.startDate = startDate;
    this.dueDate = dueDate;
    this.toDoList = new Array();
  }
  getStorageInfo(){
    return {name: this.name, startDate: this.startDate, dueDate: this.dueDate, toDoList: this.toDoList};
  }
  addItem(title, content, priority) {
    const newItem = {title, content, priority, id: this.toDoList.length};
    this.toDoList.push(newItem);
    try {
      localStorage.setItem(this.name, JSON.stringify({name: this.name, startDate: this.startDate, dueDate: this.dueDate, toDoList: this.toDoList}));
    }
    catch(e) {
      console.log(e);
    }
    return newItem;
  }
  removeItem(target) {
    this.toDoList.splice(this.toDoList.indexOf(target), 1);
    try {
      localStorage.setItem(this.name, JSON.stringify(this.getStorageInfo()));
    }
    catch(e) {
      console.log(e);
    }
  }
};