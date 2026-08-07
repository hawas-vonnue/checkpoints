let initialState = {
    board: [],
    archive: [],
};

export function reducer(state, payload) {
    if (payload === undefined) return state;
    if (payload.type === "add") {
        let array = state.board;
        let maxId = 0;
        state.board.forEach((task) => (maxId = Math.max(maxId, task.id)));
        state.archive.forEach((task) => (maxId = Math.max(maxId, task.id)));
        const id = maxId + 1;
        array.push({
            id: id,
            title: payload.title,
            assignee: payload.assignee,
            priority: payload.priority,
            column: "todo",
        });
        state.board = array;
    }
    if (payload.type === "delete") {
        let array = state.board;
        let task = array.find((element) => element.id === payload.id);
        let index = array.indexOf(task);
        array.splice(index, 1);
        state.board = array;

        state.archive.push(task);
    }
    if (payload.type === "move") {
        let array = state.board;
        let task = array.find((element) => element.id === payload.id);
        task.column = payload.newColumn;
    }
    if (payload.type === "restore") {
        let array = state.archive;
        let task = array.find((element) => element.id === payload.id);
        let index = array.indexOf(task);
        array.splice(index, 1);
        state.archive = array;

        state.board.push({ ...task, column: "todo" });
    }

    let data = { board: state.board, archive: state.archive };
    localStorage.setItem("tasks", JSON.stringify(data));

    return state;
}

export class createStore {
    constructor(initialState, reducer) {
        this.state = initialState;
        this.listeners = [];
    }
    getState() {
        return this.state;
    }
    subscribe(listener) {
        this.listeners.push(listener);
    }
    dispatch(payload) {
        this.state = reducer(this.state, payload);

        this.listeners.forEach((listener) => {
            listener(this.state);
        });
    }
}

export const store = new createStore(initialState, reducer);
