import todoState from "../../model/todoState.js";

import { createElement } from "../../helpers.js";
import { clearRootElement } from "../../helpers.js";

import { getTodoEventHandlers } from "../../events/todoEventHandlers.js";
import { setupEventListeners } from "../../events.js";

function renderTextBlock(doc, todo) {
  const textItem = createElement(doc, "h3");
  textItem.innerHTML = todo.text;
  return textItem;
}

function renderStatusPanel(doc, todo) {
  const statusPanel = createElement(doc, "p", "status-panel");
  let statusText = "Unknown state";

  if (todo.state === todoState.InProcess) statusText = "Task in progress";
  if (todo.state === todoState.Done) statusText = "Task done";
  if (todo.state === todoState.Postponed) statusText = "Task postponed";

  statusPanel.innerHTML = statusText;

  return statusPanel;
}

function formatDateForPanel(prefix, date) {
  const datePart = date.toLocaleString("ru", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  const timePart = date.toLocaleString("ru", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${prefix}: ${datePart} - ${timePart}`;
}

function renderCreatedDatePanel(doc, todo) {
  const createdDatePanel = createElement(doc, "p", "created-date-panel");

  createdDatePanel.innerHTML = formatDateForPanel("Created", todo.dateCreated);

  return createdDatePanel;
}

function renderDoneDatePanel(doc, todo) {
  const doneDatePanel = createElement(doc, "p", "done-date-panel");

  doneDatePanel.innerHTML = formatDateForPanel("Completed", todo.dateCompleted);

  return doneDatePanel;
}

function renderInfoBlock(doc, todo) {
  const infoBlock = createElement(doc, "div", "info-block");

  infoBlock.append(renderStatusPanel(doc, todo));
  infoBlock.append(renderCreatedDatePanel(doc, todo));
  if (todo.dateCompleted !== null) {
    infoBlock.append(renderDoneDatePanel(doc, todo));
  }

  return infoBlock;
}

function renderButton(doc, actionName, todoId, className, title) {
  const button = createElement(doc, "button", className);
  button.innerHTML = title;
  button.setAttribute("data-action", actionName);
  button.setAttribute("data-id", todoId);

  return button;
}

function renderControlBlock(doc, todo) {
  const controlBlock = createElement(doc, "div", "control-block");

  controlBlock.append(
    renderButton(
      doc,
      "back-to-list",
      todo.id,
      "back-to-list-button",
      "Back to list"
    )
  );

  if (todo.state === todoState.InProcess) {
    controlBlock.append(
      renderButton(doc, "postpone", todo.id, "postpone-button", "Postpone")
    );
    controlBlock.append(
      renderButton(doc, "done", todo.id, "done-button", "Done")
    );
    controlBlock.append(
      renderButton(doc, "delete", todo.id, "delete-button", "Delete")
    );
  }
  if (todo.state === todoState.Done) {
    controlBlock.append(
      renderButton(doc, "delete", todo.id, "delete-button", "Delete")
    );
  }
  if (todo.state === todoState.Postponed) {
    controlBlock.append(
      renderButton(doc, "resume", todo.id, "resume-button", "Resume")
    );
    controlBlock.append(
      renderButton(doc, "delete", todo.id, "delete-button", "Delete")
    );
  }

  return controlBlock;
}

export default function renderTodoPage(doc, todo) {
  const rootElement = clearRootElement(doc);

  const container = createElement(doc, "div");
  container.id = "todo-list";

  const todoItem = createElement(doc, "div", "item");

  todoItem.append(renderTextBlock(doc, todo));
  todoItem.append(renderInfoBlock(doc, todo));
  todoItem.append(renderControlBlock(doc, todo));

  container.append(todoItem);
  rootElement.append(container);

  setupEventListeners(doc, getTodoEventHandlers(doc));
}
