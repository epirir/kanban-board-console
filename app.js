require("colors");
const Tasks = require("./models/tasks");
const { writeFile, readFile } = require("./helpers/controller");
const {
  readInput,
  pause,
  inquirerMenu,
  listTaskDelete,
  confirm,
  showListCheckList,
} = require("./helpers/inquirer");

const main = async () => {
  const tasks = new Tasks();

  const tasksFile = readFile();

  if (tasksFile) {
    tasks.chargeTasksFromArray(tasksFile);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        const desc = await readInput("Description: ");
        tasks.createTask(desc);
        break;

      case 2:
        tasks.completeList();
        break;

      case 3:
        tasks.listTaskByStatus();
        break;

      case 4:
        tasks.listTaskByStatus(false);
        break;

      case 5:
        const ids = await showListCheckList(tasks.listArr);
        tasks.toggleCompleted(ids);
        break;

      case 6:
        const id = await listTaskDelete(tasks.listArr);
        if (id !== 0) {
          if (ok) {
            const ok = await confirm("Are you sure?");
            tasks.deleteTask(id);
            console.log("Task deleted");
          }
        }

        break;
    }

    writeFile(tasks.listArr);

    await pause();
  } while (opt !== 0);
};

main();
