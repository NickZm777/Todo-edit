import { createElement } from "../../helpers.js";
import { clearRootElement } from "../../helpers.js";
import configureRouter from "../../routerConfig.js";
import todoStorage from "../../model/todoStorage.js";

export default async function renderReportPage(doc) {
  const rootElement = clearRootElement(doc);

  const container = createElement(doc, "div", "report-container");

  const info = createElement(doc, "h1", "report-info");
  info.innerHTML = "TODO Statistics";

  const inProcess = createElement(doc, "div", "InProcess-info");
  const inProcessInfo = createElement(doc, "span");
  inProcessInfo.innerHTML = "Total Todo in-process:";

  const inProcessResult = createElement(doc, "span", "result");
  inProcessResult.innerHTML = `${await todoStorage.checkerInProcess()}`;

  inProcess.append(inProcessInfo, inProcessResult);

  const postponed = createElement(doc, "div", "postponed-info");
  const postponedInfo = createElement(doc, "span");
  postponedInfo.innerHTML = "Total Todo postponed:";

  const posponedResult = createElement(doc, "span", "result");
  posponedResult.innerHTML = `${await todoStorage.checkerPostponed()}`;

  postponed.append(postponedInfo, posponedResult);

  const done = createElement(doc, "div", "done-info");
  const doneInfo = createElement(doc, "span");
  doneInfo.innerHTML = "Total Todo done:";

  const doneResult = createElement(doc, "span", "result");
  doneResult.innerHTML = `${await todoStorage.checkerDone()}`;

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
  clearButton.innerHTML = "Clear deleted-statistics";
  clearButton.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Clearing deleted-statistics information");
    todoStorage.todoDeleted = 0;
    const router = configureRouter(doc, "/");
    router.navigate("report");
  });

  container.append(
    info,
    inProcess,
    postponed,
    done,
    deleted,
    backButton,
    clearButton
  );

  rootElement.append(container);
}
