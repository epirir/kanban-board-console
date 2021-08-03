const Task = require("./task");

class Tasks {
  _list = {};

  get listArr() {
    const list = [];
    Object.keys(this._list).forEach((key) => {
      const task = this._list[key];
      list.push(task);
    });

    return list;
  }

  constructor() {
    this._list = {};
  }

  deleteTask(id) {
    if (this._list[id]) {
      delete this._list[id];
    }
  }

  chargeTasksFromArray(tasks = []) {
    tasks.forEach((task) => {
      this._list[task.id] = task;
    });
  }

  createTask(desc = "") {
    const task = new Task(desc);

    this._list[task.id] = task;
  }

  completeList() {
    this.listArr.forEach((task, key) => {
      const idx = `${key + 1}`.green;
      const { desc, completedAt } = task;
      const status = completedAt ? "Completed".green : "Pending...".red;
      console.log(`${idx} ${desc} :: ${status}`);
    });
  }

  listTaskByStatus(completed = true) {
    let count = 0;
    this.listArr.forEach((task) => {
      const { desc, completedAt } = task;
      const status = completedAt ? "Completed".green : "Pending...".red;

      if (completed) {
        if (completedAt) {
          count += 1;
          console.log(`${(count + ".").green} ${desc} :: ${completedAt.green}`);
        }
      } else {
        if (!completedAt) {
          count += 1;
          console.log(`${(count + ".").green} ${desc} :: ${status.red}`);
        }
      }
    });
  }

  toggleCompleted(ids = []) {
    ids.forEach((id) => {
      const task = this._list[id];
      if (!task.completedAt) {
        task.completedAt = new Date().toISOString();
      }
    });

    this.listArr.forEach((task) => {
      if (!ids.includes(task.id)) {
        this._list[task.id].completedAt = null;
      }
    });
  }
}

module.exports = Tasks;
