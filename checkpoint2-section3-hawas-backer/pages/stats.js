export async function renderStats(state) {
    let totalTasks = state.board.length;
    let todoTasks = getTodoTasks(state);
    let progressTasks = getProgressTasks(state);
    let doneTasks = totalTasks - (todoTasks + progressTasks);
    let lowPriorityTasks = getLowPriorityTasks(state);
    let mediumPriorityTasks = getMediumPriorityTasks(state);
    let highPriorityTasks =
        totalTasks - (lowPriorityTasks + mediumPriorityTasks);

    const stats = document.createElement("div");
    stats.classList.add("stats");

    const header = document.createElement("h1");
    header.textContent = "Stats";

    const totalTasksElement = document.createElement("span");
    totalTasksElement.textContent = `total tasks: ${totalTasks}`;

    const todoTasksElement = document.createElement("span");
    todoTasksElement.textContent = `tasks todo : ${todoTasks}`;

    const progressTasksElement = document.createElement("span");
    progressTasksElement.textContent = `tasks in progress: ${progressTasks}`;

    const doneTasksElement = document.createElement("span");
    doneTasksElement.textContent = `tasks done : ${doneTasks}`;

    const highPriorityTasksElement = document.createElement("span");
    highPriorityTasksElement.textContent = `high priority tasks: ${highPriorityTasks}`;

    const lowPriorityTasksElement = document.createElement("span");
    lowPriorityTasksElement.textContent = `low priority tasks: ${lowPriorityTasks}`;

    const mediumPriorityTasksElement = document.createElement("span");
    mediumPriorityTasksElement.textContent = `medium priority tasks: ${mediumPriorityTasks}`;

    const container = document.createElement("div");
    container.classList.add("statsContainer");
    container.append(
        totalTasksElement,
        todoTasksElement,
        progressTasksElement,
        doneTasksElement,
        lowPriorityTasksElement,
        mediumPriorityTasksElement,
        highPriorityTasksElement
    );

    stats.append(header, container);

    const main = document.querySelector("main");
    main.innerHTML = "";
    main.append(stats);
}

function getTodoTasks(state) {
    let count = 0;
    state.board.forEach((element) => {
        if (element.column === "todo") count++;
    });
    return count;
}

function getProgressTasks(state) {
    let count = 0;
    state.board.forEach((element) => {
        if (element.column === "in-progress") count++;
    });
    return count;
}

function getLowPriorityTasks(state) {
    let count = 0;
    state.board.forEach((element) => {
        if (element.priority === "low") count++;
    });
    return count;
}

function getMediumPriorityTasks(state) {
    let count = 0;
    state.board.forEach((element) => {
        if (element.priority === "medium") count++;
    });
    return count;
}
