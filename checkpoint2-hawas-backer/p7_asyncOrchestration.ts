function mockFetchUser(id: number): Promise<object> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id <= 0)
                reject(
                    new Error(
                        `Invalid user
id: ${id}`
                    )
                );
            else resolve({ id, name: `User${id}` });
        }, 50);
    });
}

function mockFetchOrders(userId: number) {
    return new Promise((resolve) => {
        setTimeout(
            () =>
                resolve([
                    { orderId: userId * 10 + 1 },
                    {
                        orderId: userId * 10 + 2,
                    },
                ]),
            30
        );
    });
}

async function loadUserSequential(id: number) {
    const user = await mockFetchUser(id);
    const orders = await mockFetchOrders(id);

    return { user, orders };
}

async function loadUsersParallel(ids: number[]) {
    let promises: Promise<object>[] = [];
    ids.forEach((id) => {
        let promise = mockFetchUser(id);
        promises.push(promise);
    });

    let users = [];
    Promise.allSettled(promises).then((results) => {
        // console.log(results);

        for (let i = 0; i < ids.length; i++) {
            const result = results[i];
            if (result.status === "rejected") {
                const obj = { id: ids[i], error: result.reason };
                users.push(obj);
            } else {
                const obj = { id: ids[i], user: result.value };
                users.push(obj);
            }
        }
        // console.log(users);

        return users;
    });
}

async function loadUserWithTimeout(id: number, timeoutMs: number) {
    const timer = setTimeout(() => {
        throw new Error("Timed out");
    }, timeoutMs);
    mockFetchUser(id).then((user) => {
        clearTimeout(timer);
        console.log(user);

        return user;
    });
}

//-------------------------------Tests--------------------------
console.time("one");
await mockFetchUser(7);
console.timeEnd("one");

console.time("parallel");
await loadUsersParallel([0, 2, -1, 3, 4]);
console.timeEnd("parallel");

console.time("sequential");
await mockFetchOrders(2);
await mockFetchOrders(3);
await mockFetchOrders(4);
await mockFetchOrders(5);
await mockFetchOrders(6);
console.timeEnd("sequential");

// await loadUserWithTimeout(1, 100);
//throws error
await loadUserWithTimeout(1, 30);

export default { loadUserSequential, loadUsersParallel, loadUserWithTimeout };
