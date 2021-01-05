import Todo from "./model/todo.js";

export async function todoCreateFetch(body) {
  const response = await fetch("http://localhost:3000/todo", {
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

  console.log(`Ok with status ${response.status}`);

  const object = await response.json();
  console.log(object);
  console.log(object.id);
  const objConv = convertToTodo(object);

  return objConv;
}

// export async function todoDeleteFetch(method, id) {
//   const addResponse = await fetch(`http://localhost:3000/todo/${id}`, {
//     method: `${method}`,
//     // headers: {
//     //   "Content-Type": "application/json",
//     // },
//     // body: JSON.stringify(body),
//   });

//   if (!addResponse.ok) {
//     console.log(`Error with status ${addResponse.status}`);
//     return;
//   }

//   console.log(`Ok with status ${addResponse.status}`);

//   const data = await addResponse.json();
//   console.log(data);

//   const response = await fetch("http://localhost:3000/todo");

//   if (!response.ok) {
//     console.log(`Error with status ${response.status}`);
//     return;
//   }

//   console.log(`Ok with status ${response.status}`);

//   const json = await response.json();
//   console.log(json);
// }

async function createTodo(todoText) {
  const todo = new Todo(todoText);

  const addResponse = await fetch("http://localhost:3000/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (!addResponse.ok) {
    console.log(`Error with status ${addResponse.status}`);
    return;
  }

  console.log(`Ok with status ${addResponse.status}`);

  const addedTodo = await addResponse.json();

  return addedTodo.id;
}

export async function todoAllFetch() {
  const response = await fetch("http://localhost:3000/todo");

  if (!response.ok) {
    console.log(`Error with status ${response.status}`);
    return;
  }
  console.log(`Ok with staiiiiiiiiiiiiiiiitus ${response.status}`);
  const qw = await response.json();

  let arr = [];
  qw.forEach((element) => {
    arr.push(convertToTodo(element));
  });
  console.log(arr);
  return arr;
}

// function convertObject(dto) {
//   const todo = new Todo(dto.text);
//   todo.state = dto.state;
//   todo.dateCreated = new Date(dto.dateCreated);
//   todo.dateCompleted =
//     dto.dateComplete !== null ? new Date(dto.dateCompleted) : null;
//   return todo;
// }

async function getAllTodo() {
  const allTodoResponse = await fetch("http://localhost:3000/todo");

  if (!allTodoResponse.ok) {
    console.log(`Error with status ${allTodoResponse.status}`);
    return;
  }

  console.log(`Ok with status ${allTodoResponse.status}`);

  return await allTodoResponse.json();
}

function convertToTodo(todoDto) {
  const todo = new Todo(todoDto.text);
  todo.id = todoDto.id;
  todo.state = todoDto.state;
  todo.dateCreated = new Date(todoDto.dateCreated);
  todo.dateCompleted =
    todoDto.dateCompleted === null ? null : new Date(todoDto.dateCompleted);

  return todo;
}

export async function convertObject(dto) {
  const todo = new Todo(dto.text);

  todo.state = dto.state;
  todo.dateCreated = new Date(dto.dateCreated);
  todo.dateCompleted =
    dto.dateCompleted === null ? null : new Date(dto.dateCompleted);

  return todo;
}

async function updateTodo(todoId, todo) {
  const updateResponse = await fetch(`http://localhost:3000/todo/${todoId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (!updateResponse.ok) {
    console.log(`Error with status ${updateResponse.status}`);
    return;
  }

  console.log(`Ok with status ${updateResponse.status}`);

  const updatedTodo = await updateResponse.json();

  return updatedTodo.id;
}

async function patchTodo(todoId, patch) {
  const patchResponse = await fetch(`http://localhost:3000/todo/${todoId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(patch),
  });

  if (!patchResponse.ok) {
    console.log(`Error with status ${patchResponse.status}`);
    return;
  }

  console.log(`Ok with status ${patchResponse.status}`);

  const patchedTodo = await patchResponse.json();

  return patchedTodo.id;
}

async function postponeById(id, todo) {
  todo.postpone();
  const patch = { state: todo.state };
  return await patchTodo(id, patch);
}

async function resumeById(id, todo) {
  todo.resume();
  const patch = { state: todo.state };
  return await patchTodo(id, patch);
}

async function completeById(id, todo) {
  todo.done();
  const patch = {
    state: todo.state,
    dateCompleted: todo.dateCompleted,
  };
  return await patchTodo(id, patch);
}

async function getTodoById(id) {
  const idResponse = await fetch(`http://localhost:3000/todo/${id}`);
  const todoById = await idResponse.json();
  console.log(`------------by id---------${todoById}`);
  return todoById;
}
getTodoById(2);

export async function netDemo() {
  const todoNumber = Math.trunc(Math.random() * 1000);
  const newTodoId = await createTodo(
    `One more todo demo record ${todoNumber}.`
  );

  console.log(`=> ${newTodoId}`);

  const allTodo = await getAllTodo();

  const changedTodoPosition = Math.trunc(Math.random() * allTodo.length);
  const todoDto = allTodo[changedTodoPosition];
  const changedTodoId = todoDto.id;

  const todo = convertToTodo(todoDto);

  console.log(todo);
  await completeById(changedTodoId, todo);
  console.log(todo);

  const id = await patchTodo(changedTodoId, todo);
  console.log(`=> ${id}`);
}

// netDemo();
