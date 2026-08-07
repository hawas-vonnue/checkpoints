function createRateLimiter(fn, maxCalls, windowMs) {
    let count = 0;
    let lastCalled;
    return function (args) {
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

const limited = createRateLimiter((x) => x * 2, 1, 1000);

console.log(limited(1));
console.log(limited(2));
console.log(limited(3));

modules.export = {
    createRateLimiter,
};
