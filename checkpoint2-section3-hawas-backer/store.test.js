import { createStore, reducer } from "./store";

const initialState = [];
const reducer = jest.fn().mockImplementation((state, payload) => {
    if (payload.type === "pop") state.pop();
    if (payload.type === "push") state.push(payload.value);

    return state;
});
const log = jest.fn().mockImplementation((state) => console.log(state));

const newStore = new createStore(initialState, reducer);
test("testing dispatch", () => {
    newStore.subscribe(log);
    newStore.dispatch({ type: "push", value: 10 });
    expect(log).toHaveBeenCalled();
});

test("testing reducer", () => {
    newStore.dispatch({ type: "push", value: 10 });
    expect(reducer).toHaveBeenCalled();
});

test("state changes", () => {
    newStore.dispatch({ type: "push", value: 10 });
    expect(newStore.getState()).includes(10);
});
