import { renderArchiveView } from "./pages/archiveView.js";
import { store } from "./store.js";
import { renderBoardView } from "./pages/boardView.js";
import { renderStats } from "./pages/stats.js";
import { fetchJson } from "./utils.js";

export function init() {
    const links = document.querySelectorAll("a");
    links.forEach((link) => {
        link.addEventListener("click", () => {
            event.preventDefault();
            history.pushState({}, "", `#/${event.target.id}`);
            onRouteChange();
        });
    });

    store.subscribe(render);
    window.addEventListener("load", async () => {
        const loading = document.querySelector(".loading");
        loading.classList.remove("hidden");
        setTimeout(async () => {
            await addToState();
            onRouteChange();
            loading.classList.add("hidden");
        }, 300);
    });
}

function render(state) {
    let hashName = document.location.hash;
    switch (hashName) {
        case "#/stats":
            renderStats(state);
            break;
        case "#/board":
            renderBoardView(state);
            break;
        case "#/archive":
            renderArchiveView(state);
            break;
    }
}
function onRouteChange() {
    store.dispatch();
}

async function addToState() {
    if (localStorage.getItem("tasks") === null) {
        try {
            let tasks = await fetchJson("../mock-tasks.json");
            store.state.board = tasks;
        } catch (error) {
            console.log(error);
            const errorElement = document.querySelector(".error");
            errorElement.textContent = error.message;
            errorElement.classList.remove("hidden");
        }
    } else {
        let data = JSON.parse(localStorage.getItem("tasks"));
        store.state.board = data.board;
        store.state.archive = data.archive;
    }
}
