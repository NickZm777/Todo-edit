import { createElement } from "../../helpers.js";
import { clearRootElement } from "../../helpers.js";
import configureRouter from "../../routerConfig.js";
import todoStorage from "../../model/todoStorage.js";

export default function renderReportPage(doc) {
  const rootElement = clearRootElement(doc);

  const container = createElement(doc, "div", "report-container");

  const info = createElement(doc, "h1", "report-info");
  info.innerHTML = "TODO Statistics";

  const postponed = createElement(doc, "div", "postponed-info");
  postponed.innerHTML = `Total Todo postponed: ${todoStorage.todoPosponed}`;

  const done = createElement(doc, "div", "done-info");
  done.innerHTML = `Total Todo done: ${todoStorage.todoDone}`;

  const deleted = createElement(doc, "div", "deleted-info");
  deleted.innerHTML = `Total Todo deleted: ${todoStorage.todoDeleted}`;

  const backButton = createElement(doc, "button", "back-button");
  backButton.innerHTML = "Return to list";
  backButton.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Returning back to list page!!!!");
    const router = configureRouter(doc, "/");
    router.navigate("/");
  });

  const clearButton = createElement(doc, "button", "clear-statistics-button");
  clearButton.innerHTML = "Clear statistics";
  clearButton.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Clearing statistics information");
    todoStorage.todoPosponed = 0;
    todoStorage.todoDone = 0;
    todoStorage.todoDeleted = 0;
  });

  container.append(info, postponed, done, deleted, backButton, clearButton);

  rootElement.append(container);
}
