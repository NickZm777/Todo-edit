import todoState from "./todoState.js";

// function formatDate() {
//   return new Date().toLocaleString("ru", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "2-digit",
//     hour: "2-digit",
//     minute: "2-digit",
//     second: "2-digit",
//   });
// }

// console.log(new Date().toString().split(" ")[2]);
// console.log(new Date().toString().split(" ")[1]);
// console.log(new Date().toString().split(" ")[3]);
// console.log(new Date().toString().split(" ")[4]);

export default class Todo {
  constructor(text) {
    this.text = text;
    this.state = todoState.InProcess;
    this.dateCreated = new Date();
    this.dateCompleted = null;
  }

  postpone() {
    this.state = todoState.Postponed;
  }

  resume() {
    this.state = todoState.InProcess;
  }

  done() {
    this.state = todoState.Done;
    this.dateCompleted = new Date();
  }
}
