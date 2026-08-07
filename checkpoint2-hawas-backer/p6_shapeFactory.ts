class Shape {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    area(): number | undefined {
        throw new Error("Not implemented");
    }

    static create(
        type: "circle" | "rectangle" | "triangle",
        ...args: number[]
    ) {
        if (!(type === "circle" || type === "rectangle" || type === "triangle"))
            throw new Error(`Unknown shape type:${type}`);
        switch (type) {
            case "circle":
                return new Circle(args[0]);
            case "rectangle":
                return new Rectangle(args[0], args[1]);
            case "triangle":
                return new Triangle(args[0], args[1]);
        }
    }
}

class Circle extends Shape {
    radius: number;
    constructor(radius: number) {
        super("circle");
        this.radius = radius;
    }
    area() {
        return Math.PI * this.radius * this.radius;
    }
}

class Rectangle extends Shape {
    width: number;
    height: number;
    constructor(width: number, height: number) {
        super("rectangle");
        this.width = width;
        this.height = height;
    }
    area() {
        return this.width * this.height;
    }
}

class Triangle extends Shape {
    base: number;
    height: number;
    constructor(base: number, height: number) {
        super("triangle");
        this.base = base;
        this.height = height;
    }
    area() {
        return (this.base * this.height) / 2;
    }
}

class ShapeGroupBuilder {
    shapes: Shape[];

    constructor() {
        this.shapes = [];
    }

    add(shape: Shape) {
        this.shapes.push(shape);
        return this;
    }

    filterMinArea(min: number) {
        let newShapes: Shape[] = [];
        this.shapes.forEach((shape) => {
            let area = shape.area();
            if (area) if (area >= min) newShapes.push(shape);
        });
        this.shapes = newShapes;
        return this;
    }

    sortByArea(direction: "desc" | "asc") {
        if (direction === "asc")
            this.shapes.sort((a, b) => {
                let aArea = a.area();
                let bArea = b.area();
                if (aArea && bArea) return aArea - bArea;
                return 0;
            });

        if (direction === "desc")
            this.shapes.sort((a, b) => {
                let aArea = a.area();
                let bArea = b.area();
                if (aArea && bArea) return bArea - aArea;
                return 0;
            });
        return this;
    }

    build() {
        return this.shapes;
    }
}

//--------------------------Test------------------------

const group = new ShapeGroupBuilder()
    .add(Shape.create("circle", 2))
    .add(Shape.create("rectangle", 10, 5))
    .filterMinArea(20)
    .sortByArea("asc")
    .build();

console.log(group);

const triangle = Shape.create("triangle", 10, 15);
triangle.area();
