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

function debounce(fn: Function, delayMS: number) {
    let timer: number;
    return function (args: any) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(args);
        }, delayMS);
    };
}

function buildSearchIndex(items: Record<string, string>[], fields: string[]) {
    return function search(query: string) {
        let itemsMatched: Record<string, string>[] = [];
        items.forEach((item) => {
            fields.forEach((field) => {
                if (
                    item[field]
                        .toLocaleLowerCase()
                        .includes(query.toLocaleLowerCase())
                ) {
                    itemsMatched.push(item);
                }
            });
        });
        return itemsMatched;
    };
}

function createDebouncedSearcher(
    items: Record<string, string>[],
    fields: string[],
    delayMS: number,
    onResults: Function
) {
    let timer: number;
    const search = buildSearchIndex(items, fields);
    return function handleInput(query: string) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            const results = search(query);
            onResults(results);
        }, delayMS);
    };
}

export { debounce, buildSearchIndex, createDebouncedSearcher };

//-------------------Test-------------------
let fn = (n: number) => console.log(n * 2);
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

type items = Record<string, string>[];

const results: items = [];
const search2 = createDebouncedSearcher(
    items,
    ["name"],
    300,
    (r: Record<string, string>[]) => console.log(r, "only once")
);
search2("re");
search2("red");
