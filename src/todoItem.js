export class todoItem
{
  #title; #priority; #completed; #content;
  constructor(itemInfo){
    this.#title = itemInfo.title;
    this.#content = itemInfo.content;
    this.#priority = itemInfo.priority;
    this.#completed = false;
  }
  getContent() {
    return {
      title : this.#title, 
      content : this.#content, 
      priority : this.#priority,
    };    
  }
  get completeStatus() {
    return this.#completed;
  }
  setProperty(title = this.#title, content = this.#content, priority = this.#priority) {
    this.#title = title;
    this.#content = content;
    this.#priority = priority;
    this.#completed = false;
  }
  setCompleteStatus() {
    this.#completed = !this.#completed;
  }
}