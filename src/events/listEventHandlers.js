import { getTodoInput } from "../helpers.js";

import todoStorage from "../model/todoStorage.js";
import renderTodoList from "../view/todoListPage/todoList.js";

import configureRouter from "../routerConfig.js";

function addTodoHandler(doc) {
  console.log("Add button clicked");
  const todoTextInput = getTodoInput(doc);
  todoStorage.createTodo(todoTextInput.value);

  const todoItemCreated = new Event("todo-item-created");
  doc.dispatchEvent(todoItemCreated);
}

function clearFormHandler(doc) {
  console.log("Clear button clicked");
  const todoTextInput = getTodoInput(doc);
  todoTextInput.value = "";
}

function updateTotalTodoCount(doc) {
  console.log("Updating Total Todo Count");

  const h2 = doc.getElementById("total-counter-number");
  h2.innerHTML = `${todoStorage.totalTodoCount()}`;
}

async function updateTodoList(doc) {
  console.log("Updating Todo List");

  const allTodo = await todoStorage.getAllTodo();
  renderTodoList(doc, allTodo);
}

function navigateToTodo(doc, event) {
  const todoId = event.detail.todoId;
  console.log(`Rendering todo screen for todo: ${todoId}`);

  const router = configureRouter(doc, "/");
  router.navigate(`todo/${todoId}`);
}

function notifyAboutTodoChange(doc) {
  const todoItemChanged = new Event("todo-item-changed");
  doc.dispatchEvent(todoItemChanged);
}

function notifyAboutDeletedTodo(doc) {
  const todoItemDeleted = new Event("todo-item-deleted");
  doc.dispatchEvent(todoItemDeleted);
}

function notifyAboutTodoView(doc, todoId) {
  const todoItemShown = new CustomEvent("todo-item-shown", {
    detail: { todoId },
  });
  doc.dispatchEvent(todoItemShown);
}

async function todoListActionHandler(doc, event) {
  const actionName = event.target.dataset["action"];
  const todoId = event.target.dataset["id"];

  switch (actionName) {
    case "view":
      console.log(`Processing view action for id: ${todoId}`);
      notifyAboutTodoView(doc, todoId);
      break;
    case "postpone":
      console.log(`Processing postpone action for id: ${todoId}`);
      await todoStorage.postponeById(todoId);
      notifyAboutTodoChange(doc);
      break;
    case "resume":
      console.log(`Processing resume action for id: ${todoId}`);
      await todoStorage.resumeById(todoId);
      notifyAboutTodoChange(doc);
      break;
    case "done":
      console.log(`Processing done action for id: ${todoId}`);
      await todoStorage.completeById(todoId);
      notifyAboutTodoChange(doc);
      break;
    case "delete":
      console.log(`Processing delete action for id: ${todoId}`);
      await todoStorage.deleteById(todoId);
      notifyAboutDeletedTodo(doc);
      break;

    default:
      console.log("Panic! Unknown Action.");
  }
}

let boundaddTodoHandler = null;
let boundclearFormHandler = null;
let boundtodoListActionHandler = null;
let boundupdateTotalTodoCount = null;
let boundupdateTodoList = null;
let boundnavigateToTodo = null;

export function getListEventHandlers(doc) {
  boundaddTodoHandler =
    boundaddTodoHandler !== null
      ? boundaddTodoHandler
      : addTodoHandler.bind(null, doc);

  boundclearFormHandler =
    boundclearFormHandler !== null
      ? boundclearFormHandler
      : clearFormHandler.bind(null, doc);

  boundtodoListActionHandler =
    boundtodoListActionHandler !== null
      ? boundtodoListActionHandler
      : todoListActionHandler.bind(null, doc);

  boundupdateTotalTodoCount =
    boundupdateTotalTodoCount !== null
      ? boundupdateTotalTodoCount
      : updateTotalTodoCount.bind(null, doc);

  boundupdateTodoList =
    boundupdateTodoList !== null
      ? boundupdateTodoList
      : updateTodoList.bind(null, doc);

  boundnavigateToTodo =
    boundnavigateToTodo !== null
      ? boundnavigateToTodo
      : navigateToTodo.bind(null, doc);

  return [
    {
      elementId: "add-todo-button",
      eventName: "click",
      handler: boundaddTodoHandler,
    },

    {
      elementId: "clear-form-button",
      eventName: "click",
      handler: boundclearFormHandler,
    },
    {
      elementId: "todo-list",
      eventName: "click",
      handler: boundtodoListActionHandler,
    },
    {
      element: doc,
      eventName: "todo-item-created",
      handler: boundupdateTotalTodoCount,
    },
    {
      element: doc,
      eventName: "todo-item-created",
      handler: boundupdateTodoList,
    },
    {
      element: doc,
      eventName: "todo-item-created",
      handler: boundclearFormHandler,
    },
    {
      element: doc,
      eventName: "todo-item-changed",
      handler: boundupdateTodoList,
    },
    {
      element: doc,
      eventName: "todo-item-deleted",
      handler: boundupdateTotalTodoCount,
    },
    {
      element: doc,
      eventName: "todo-item-deleted",
      handler: boundupdateTodoList,
    },
    {
      element: doc,
      eventName: "todo-item-shown",
      handler: boundnavigateToTodo,
    },
  ];
}
