import { store } from "./store.js";

class HttpError extends Error {
    constructor(message) {
        super(message);
    }
}

export async function fetchJson(url) {
    try {
        const response = await fetch(url);

        //to simulate error
        // throw new Error("Error while fetching");

        if (!response.ok) throw new HttpError("HTTP error");
        const responseJson = await response.json();

        return responseJson;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}

export function validateForm(form) {
    const title = document.querySelector("#title");
    const assignee = document.querySelector("#assignee");
    const priority = document.querySelector("#priority");
    let flag = 0;
    if (title.value === "") {
        const span = title.nextElementSibling;
        span.textContent = "title shouldnt be empty";
        flag = 1;
    } else if (title.value.length <= 3 || title.value.length >= 60) {
        const span = title.nextElementSibling;
        span.textContent = "title length should be 3-60";
        flag = 1;
    }
    if (assignee.value === "") {
        const span = assignee.nextElementSibling;
        span.textContent = "title shouldnt be empty";
        flag = 1;
    }
    if (flag === 0) {
        store.dispatch({
            type: "add",
            title: title.value,
            assignee: assignee.value,
            priority: priority.value,
        });
    }
    return flag;
}
