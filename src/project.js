import {todoItem} from "./todoItem"
import { addDays } from "date-fns";
export class project {
  constructor(id, name, startDate, dueDate) {
    this.id = id;
    this.name = name;
    this.startDate = startDate;
    this.dueDate = dueDate;
    this.toDoList = new Array();
    this.idGenerator = 0;
  }
  saveToLocal(){
    try {
      localStorage.setItem(this.id, JSON.stringify({name: this.name, startDate: this.startDate, dueDate: this.dueDate, toDoList: this.toDoList}));
    }
    catch(e) {
      console.log(e);
    }
  }
  getStorageInfo(){
    return {name: this.name, startDate: this.startDate, dueDate: this.dueDate, toDoList: this.toDoList};
  }
  setProperties(name, startDate, dueDate)
  {
    this.name = name;
    this.startDate = startDate;
    this.dueDate = dueDate;
    this.saveToLocal();
  }
  addItem(title, content, priority) {
    const newItem = {title, content, priority, id: this.idGenerator};
    this.idGenerator++;
    this.toDoList.push(newItem);
    this.saveToLocal();
    return newItem;
  }
  removeItem(target) {
    this.toDoList.splice(this.toDoList.indexOf(this.toDoList.find((item)=>item.id == target)), 1);
    this.saveToLocal();
  }
};