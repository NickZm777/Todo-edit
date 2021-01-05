import Todo from "./todo.js";
import { todoCreateFetch } from "../fetch.js";
import { convertObject } from "../fetch.js";
import { todoAllFetch } from "../fetch.js";
import { netDemo } from "../fetch.js";
class TodoStorage {
  constructor() {
    this.storage = {};

    // this.currentId = 0;
    // this.todoCount = 0;
    this.todoPosponed = 0;
    this.todoDone = 0;
    this.todoDeleted = 0;
  }

  createTodo(text) {
    const newTodo = new Todo(text);
    this.storage[this.currentId] = newTodo;
    // this.currentId += 1;
    const todoPost = todoCreateFetch(newTodo);

    // const objS = convertObject(todoPost);
    // // this.todoCount += 1;
    // console.log(objS);
  }

  totalTodoCount() {
    return this.todoCount;
  }

  totalTodoPosponed() {
    return this.todoPosponed;
  }

  totalTodoDone() {
    return this.todoDone;
  }

  totalTodoDeleted() {
    return this.todoDeleted;
  }

  getTodoById(id) {
    const todo = this.storage[id];
    // const todo = todoDeleteFetch("GET", id);
    return {
      id,
      text: todo.text,
      state: todo.state,
      dateCreated: new Date(todo.dateCreated),
      dateCompleted:
        todo.dateCompleted !== null ? new Date(todo.dateCompleted) : null,
    };
  }

  postponeById(id) {
    const todo = this.storage[id];
    todo.postpone();
    this.todoPosponed += 1;
    this.todoResumed -= 1;
  }

  resumeById(id) {
    const todo = this.storage[id];
    todo.resume();
    this.todoPosponed -= 1;
  }

  completeById(id) {
    const todo = this.storage[id];
    todo.done();
    this.todoDone += 1;
  }

  deleteById(id) {
    todoDeleteFetch("DELETE", id);
    // delete todoID;
    // this.todoCount -= 1;
    this.todoDeleted += 1;
  }

  convertToTodo(todoDto) {
    const todo = new Todo(todoDto.text);
    todo.id = todoDto.id;
    todo.state = todoDto.state;
    todo.dateCreated = new Date(todoDto.dateCreated);
    todo.dateCompleted =
      todoDto.dateCompleted === null ? null : new Date(todoDto.dateCompleted);

    return todo;
  }

  async getAllTodo() {
    const allTodoResponse = await fetch("http://localhost:3000/todo");

    if (!allTodoResponse.ok) {
      console.log(`Error with status ${allTodoResponse.status}`);
      return;
    }

    console.log(`Ok with status ${allTodoResponse.status}`);

    const arrayObj = await allTodoResponse.json();
    this.todoCount = arrayObj.length;
    return arrayObj.map((dto) => this.convertToTodo(dto));
  }
}

const todoStorage = new TodoStorage();

export default todoStorage;
