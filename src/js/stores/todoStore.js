import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class TodoStore extends EventEmitter {
  constructor() {
    super();
    
  };

  getAll() {
    return this.todos;
  };
  
  addTodo(todo) {
    this.todos.push(todo);
    this.emit("change");
  };

 handleActions(action) {
    switch(action.type) {
      case "ADDED_TODO": {
        this.addTodo(action.todo);
        console.log(this.todos)
        break;
      }
      case "UPDATED_TODOS": {
        this.todos = action.todos;
        console.log("this is new state after calling update items", this.todos)
        this.emit("change");
        break;
      }
      case "DELETED_TODO": {
        this.todos = action.todos;
        this.emit("change");
        return;
      }
      case "INITIATE_TODOS": {
        this.todos = action.todos;
        break;
      }
    }
  }

}

const todoStore = new TodoStore;
dispatcher.register(todoStore.handleActions.bind(todoStore));


export default todoStore;