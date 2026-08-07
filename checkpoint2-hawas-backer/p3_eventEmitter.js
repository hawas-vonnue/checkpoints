class EventEmitter {
    eventMap;
    constructor() {
        this.eventMap = new Map();
    }
    on(event, listener) {
        if (!this.eventMap.has(event)) this.eventMap.set(event, []);
        let array = this.eventMap.get(event);
        array.push(listener);
        this.eventMap.set(event, array);

        return this;
    }

    off(event, listener) {
        if (!this.eventMap.has(event)) return;

        let listenerArray = this.eventMap.get(event);
        let index = listenerArray.indexOf(listener);
        if (index === undefined) return;
        listenerArray.splice(index, 1);

        this.eventMap.set(listenerArray);
    }

    emit(event, ...args) {
        if (!this.eventMap.has(event)) return 0;

        let listenerArray = this.eventMap.get(event);
        listenerArray.forEach((listener) => {
            listener(args);
        });

        let wildCardArray = this.eventMap.get("*");
        wildCardArray.forEach((listener) => {
            listener(event, args);
        });

        return listenerArray.length + wildCardArray.length;
    }

    once(event, listener) {
        let wrapped = (...args) => {
            listener(args);
            this.off(event, wrapped);
        };
        this.on(event, wrapped);
    }
}

modules.export = {
    EventEmitter,
};

//-----------------Test-------
const bus = new EventEmitter();

const log = [];
bus.on("greet", (name) => log.push(`hi ${name}`));
bus.once("greet", (name) => log.push(`once ${name}`));
bus.on("*", (event, name) => log.push(`* ${event} ${name}`));

bus.emit("greet", "sijin");
bus.emit("greet", "sijin");

console.log(log);
