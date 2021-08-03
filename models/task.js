const { v4: uuid4 } = require("uuid");

class Task {
  id = "";
  desc = "";
  completedAt = null;

  constructor(desc) {
    this.id = uuid4();
    this.desc = desc;
  }
}

module.exports = Task;
