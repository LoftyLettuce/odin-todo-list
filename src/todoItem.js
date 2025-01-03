export class todoItem
{
  #title; #priority; #completed; #parent; #id; #content;
  constructor(itemInfo){
    this.#id = itemInfo.id;
    this.#title = itemInfo.title;
    this.#content = itemInfo.content;
    this.#priority = itemInfo.priority;
    this.#parent = itemInfo.parent;
    this.#completed = false;
  }
  getContent() {
    return {
      title : this.#title, 
      content : this.#content, 
      priority : this.#priority,
      parent: this.#parent,
    };    
  }
  get completeStatus() {
    return this.#completed;
  }
  setProperty(title = this.#title, content = this.#content, priority = this.#priority) {
    this.#title = title;
    this.#content = content;
    this.#priority = priority;
    this.#parent.updateList(this.#id, {title, content, priority, id: this.#id});
  }
  setCompleteStatus() {
    this.#completed = !this.#completed;
  }
}