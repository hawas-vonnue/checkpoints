function createRateLimiter(fn: Function, maxCalls: number, windowMs: number) {
    let count = 0;
    let lastCalled: number;
    return function (...args: unknown[]) {
        if (Date.now() - lastCalled < windowMs) {
            count++;
            if (count === maxCalls) throw new Error("Rate limit exceeded");
            lastCalled = Date.now();
            return fn(args);
        } else {
            lastCalled = Date.now();
            count = 0;
            return fn(args);
        }
    };
}

const limited = createRateLimiter((x: number) => x * 2, 2, 1000);

console.log(limited(1));
console.log(limited(2));
setTimeout(() => {
    console.log(limited(3));
}, 1000);

export default { createRateLimiter };
