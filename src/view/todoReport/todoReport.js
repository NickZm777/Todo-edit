import { createElement } from "../../helpers.js";
import { clearRootElement } from "../../helpers.js";

export default function renderReportPage(doc) {
  const rootElement = clearRootElement(doc);

  const container = createElement(doc, "div", "report-container");
  const info = createElement(doc, "h1", "report-info");
  info.innerHTML = "TODO Statistics";
  const postponed = createElement(doc, "div", "postponed-info");
  postponed.innerHTML = "Total Todo postponed: #";
  const resumed = createElement(doc, "div", "resumed-info");
  resumed.innerHTML = "Total Todo resumed: #";
  const done = createElement(doc, "div", "done-info");
  done.innerHTML = "Total Todo done: #";
  const deleted = createElement(doc, "div", "deleted-info");
  deleted.innerHTML = "Total Todo deleted: #";
  container.append(info, postponed, resumed, done, deleted);

  rootElement.append(container);
}
