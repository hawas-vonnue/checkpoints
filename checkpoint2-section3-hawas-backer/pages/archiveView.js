import { store } from "../store.js";
export async function renderArchiveView(state) {
    const archiveView = document.createElement("div");
    archiveView.classList.add("archiveView");

    const header = document.createElement("h1");
    header.textContent = "Archive view";

    const subHeader = document.createElement("h2");
    subHeader.textContent = "Deleted tasks";

    const deletedTaskContainer = document.createElement("div");
    deletedTaskContainer.classList.add("deletedTaskContainer");

    state.archive.forEach((task) => {
        deletedTaskContainer.append(createDeletedCard(task.id, task.title));
    });

    archiveView.append(header, subHeader, deletedTaskContainer);

    const main = document.querySelector("main");
    main.innerHTML = "";
    main.append(archiveView);
}

function createDeletedCard(id, title) {
    const deletedCard = document.createElement("div");
    deletedCard.classList.add("deletedCard");

    const idElement = document.createElement("span");
    idElement.textContent = id;

    const titleElement = document.createElement("span");
    titleElement.textContent = title;

    const button = document.createElement("button");
    button.textContent = "Restore";

    deletedCard.append(idElement, titleElement, button);

    button.addEventListener("click", () => {
        const parentElement = event.target.parentElement;
        const id = parentElement.querySelector("span").textContent;
        store.dispatch({ type: "restore", id: id });
    });

    return deletedCard;
}
