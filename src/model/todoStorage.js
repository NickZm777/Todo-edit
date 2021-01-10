import Todo from "./todo.js";

const route = "http://localhost:3000/todo";

class TodoStorage {
  constructor() {
    this.storage = {};
    this.todoDeleted = 0;
  }

  async todoPost(body) {
    const response = await fetch(route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.log(`Error with status ${addResponse.status}`);
      return;
    }

    const object = await response.json();
    console.log(object);
    console.log(
      `ToDo added successfull with id ${object.id} and status ${response.status}`
    );
    return object;
  }

  createTodo(text) {
    const newTodo = new Todo(text);
    this.storage[this.currentId] = newTodo;
    this.todoPost(newTodo);
  }

  totalTodoCount() {
    return this.todoCount;
  }

  totalTodoDeleted() {
    return this.todoDeleted;
  }

  async getTodoById(id) {
    const response = await fetch(`${route}/${id}`);
    const todo = await response.json();
    console.log(
      `ToDo with id ${id} rendered successfully - status: ${response.status}`
    );
    const convertedToDo = this.todoConverter(todo);
    return convertedToDo;
  }

  async deleteToDo(id) {
    const response = await fetch(`${route}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      console.log(`Error with status ${response.status}`);
      return;
    }

    console.log(
      `ToDo with id ${id} deleted successfully with status ${response.status}`
    );
  }

  async patch(id, body) {
    const response = await fetch(`${route}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.log(`Error with status ${response.status}`);
      return;
    }

    console.log(`Ok with status ${response.status}`);

    const todo = await response.json();

    return todo.id;
  }

  async postponeById(id) {
    const todo = this.todoConverter(this.getTodoById(id));
    todo.postpone();
    const patch = { state: todo.state };
    return await this.patch(id, patch);
  }

  async resumeById(id) {
    const todo = this.todoConverter(this.getTodoById(id));
    todo.resume();
    const patch = { state: todo.state };
    return await this.patch(id, patch);
  }

  async completeById(id) {
    const todo = this.todoConverter(this.getTodoById(id));
    todo.done();
    const patch = { state: todo.state, dateCompleted: todo.dateCompleted };
    return await this.patch(id, patch);
  }

  deleteById(id) {
    this.deleteToDo(id);
    this.todoDeleted += 1;
  }

  todoConverter(dto) {
    const todo = new Todo(dto.text);
    todo.id = dto.id;
    todo.state = dto.state;
    todo.dateCreated = new Date(dto.dateCreated);
    todo.dateCompleted =
      dto.dateCompleted === null ? null : new Date(dto.dateCompleted);

    return todo;
  }

  async getAllTodo() {
    const allTodoResponse = await fetch(route);

    if (!allTodoResponse.ok) {
      console.log(`Error with status ${allTodoResponse.status}`);
      return;
    }

    console.log(
      `All ToDo rendered successfull with status ${allTodoResponse.status}`
    );

    const arrayObj = await allTodoResponse.json();
    this.todoCount = arrayObj.length;
    return arrayObj.map((dto) => this.todoConverter(dto));
  }

  async checkerInProcess() {
    const allTodoResponse = await fetch(route);
    const array = [];
    const data = await allTodoResponse.json();
    data.forEach((element) => {
      if (element.state === "in-process") {
        array.push(element.state);
      }
    });
    console.log(`statistics - in-process: ${array.length}`);
    return array.length;
  }

  async checkerPostponed() {
    const allTodoResponse = await fetch(route);
    const array = [];
    const data = await allTodoResponse.json();
    data.forEach((element) => {
      if (element.state === "postponed") {
        array.push(element.state);
      }
    });
    console.log(`statistics - postponed: ${array.length}`);
    return array.length;
  }

  async checkerDone() {
    const allTodoResponse = await fetch(route);
    const array = [];
    const data = await allTodoResponse.json();
    data.forEach((element) => {
      if (element.state === "done") {
        array.push(element.state);
      }
    });
    console.log(`statistics - done: ${array.length}`);
    console.log(`statistics - deleted: ${this.todoDeleted}`);
    return array.length;
  }
}

const todoStorage = new TodoStorage();

export default todoStorage;
