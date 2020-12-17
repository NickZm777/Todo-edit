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
  const postponedInfo = createElement(doc, "span");
  postponedInfo.innerHTML = "Total Todo postponed:";

  const posponedResult = createElement(doc, "span", "result");
  posponedResult.innerHTML = `${todoStorage.todoPosponed}`;

  postponed.append(postponedInfo, posponedResult);

  const done = createElement(doc, "div", "done-info");
  const doneInfo = createElement(doc, "span");
  doneInfo.innerHTML = "Total Todo done:";

  const doneResult = createElement(doc, "span", "result");
  doneResult.innerHTML = `${todoStorage.todoDone}`;

  done.append(doneInfo, doneResult);

  const deleted = createElement(doc, "div", "deleted-info");
  const deletedInfo = createElement(doc, "span");
  deletedInfo.innerHTML = "Total Todo deleted:";

  const deletedResult = createElement(doc, "span", "result");
  deletedResult.innerHTML = `${todoStorage.todoDeleted}`;

  deleted.append(deletedInfo, deletedResult);

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
    const router = configureRouter(doc, "/");
    router.navigate("report");
  });

  container.append(info, postponed, done, deleted, backButton, clearButton);

  rootElement.append(container);
}
