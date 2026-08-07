import { fetchJson } from "../utils.js";
import { validateForm } from "../utils.js";
import { store } from "../store.js";

export async function renderBoardView(state) {
    const boardView = document.createElement("div");
    boardView.classList.add("boardView");
    const button = document.createElement("button");
    button.classList.add("addButton");
    button.textContent = "Add task";

    const todo = document.createElement("div");
    todo.classList.add("column");
    todo.id = "todo";
    const progress = document.createElement("div");
    progress.classList.add("column");
    progress.id = "progress";
    const done = document.createElement("div");
    done.classList.add("column");
    done.id = "done";

    const todoHeader = document.createElement("h3");
    todoHeader.textContent = "To do";
    todo.append(todoHeader);

    const progressHeader = document.createElement("h3");
    progressHeader.textContent = "In Progress";
    progress.append(progressHeader);

    const doneHeader = document.createElement("h3");
    doneHeader.textContent = "Done";
    done.append(doneHeader);

    const card = document.querySelector(".hidden .card");

    let tasks = state.board;
    tasks.forEach((task) => {
        let cardClone = card.cloneNode(true);
        cardClone.id = task.id;
        const assignee = cardClone.querySelector(".assignee");
        assignee.textContent = task.assignee;
        const priority = cardClone.querySelector(".priority");
        priority.textContent = task.priority;
        const title = cardClone.querySelector("h3");
        title.textContent = task.title;

        switch (task.column) {
            case "done":
                done.append(cardClone);
                break;
            case "in-progress":
                progress.append(cardClone);
                break;
            case "todo":
                todo.append(cardClone);
                break;
        }
        cardClone.tabIndex = 1;

        const deleteButton = cardClone.querySelector(".deleteButton");
        deleteButton.addEventListener("click", () => {
            const id = event.target.parentElement.id;
            store.dispatch({ type: "delete", id: id });
        });
    });

    const container = document.createElement("div");
    container.classList.add("columnContainer");

    container.append(todo, progress, done);

    boardView.append(button, container);

    const main = document.querySelector("main");
    main.innerHTML = "";
    main.append(boardView);

    window.addEventListener("keydown", () => {
        if (event.code === "ArrowRight") {
            if (document.activeElement.className !== "card") return;
            const parent = document.activeElement.parentElement.id;
            const id = document.activeElement.id;
            switch (parent) {
                case "todo":
                    store.dispatch({
                        type: "move",
                        id: id,
                        newColumn: "in-progress",
                    });
                    break;
                case "progress":
                    store.dispatch({
                        type: "move",
                        id: id,
                        newColumn: "done",
                    });
                    break;
                case "done":
                    store.dispatch({
                        type: "move",
                        id: id,
                        newColumn: "todo",
                    });
                    break;
            }
        }

        if (event.code === "ArrowLeft") {
            if (document.activeElement.className !== "card") return;
            const parent = document.activeElement.parentElement.id;
            const id = document.activeElement.id;
            switch (parent) {
                case "todo":
                    store.dispatch({
                        type: "move",
                        id: id,
                        newColumn: "done",
                    });
                    break;
                case "progress":
                    store.dispatch({
                        type: "move",
                        id: id,
                        newColumn: "todo",
                    });
                    break;
                case "done":
                    store.dispatch({
                        type: "move",
                        id: id,
                        newColumn: "in-progress",
                    });
                    break;
            }
        }
    });

    button.addEventListener("click", () => {
        addOverlay();
    });
}

function addOverlay() {
    const overlay = document.querySelector(".overlay");
    overlay.classList.remove("hidden");

    const button = overlay.querySelector("button");
    button.addEventListener("click", () => {
        overlay.classList.add("hidden");
    });

    const form = overlay.querySelector("form");
    form.addEventListener("submit", () => {
        event.preventDefault();
        const flag = validateForm(form);
        if (flag === 0) overlay.classList.add("hidden");
    });
}
