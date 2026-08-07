// first function is only called
// function debounce(fn: Function, delayMS: number) {
//     let time = 0;
//     return function (args: any) {
//         if (time === 0) {
//             time = Date.now();
//             return fn(args);
//         } else {
//             if (Date.now() - time <= delayMS) {
//                 return;
//             }
//             time = Date.now();
//             return fn(args);
//         }
//     };
// }
function debounce(fn, delayMS) {
    let timer;
    return function (args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(args);
        }, delayMS);
    };
}
function buildSearchIndex(items, fields) {
    return function search(query) {
        let itemsMatched = [];
        items.forEach((item) => {
            fields.forEach((field) => {
                if (item[field]
                    .toLocaleLowerCase()
                    .includes(query.toLocaleLowerCase())) {
                    itemsMatched.push(item);
                }
            });
        });
        return itemsMatched;
    };
}
function createDebouncedSearcher(items, fields, delayMS, onResults) {
    let timer;
    const search = buildSearchIndex(items, fields);
    return function handleInput(query) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            const results = search(query);
            onResults(results);
        }, delayMS);
    };
}
export { debounce, buildSearchIndex, createDebouncedSearcher };
//-------------------Test-------------------
let fn = (n) => console.log(n * 2);
let debouncedfn = debounce(fn, 1000);
debouncedfn(2);
debouncedfn(4);
setTimeout(() => {
    debouncedfn(5);
}, 1000);
debouncedfn(2);
const items = [{ name: "Red shoes" }, { name: "Blue hat" }, { name: "Retard" }];
const search = buildSearchIndex(items, ["name"]);
console.log(search("re"));
console.log(search("red"));
const results = [];
const search2 = createDebouncedSearcher(items, ["name"], 300, (r) => console.log(r, "only once"));
search2("re");
search2("red");
