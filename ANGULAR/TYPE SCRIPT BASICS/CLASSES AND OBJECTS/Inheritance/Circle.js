"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Circle = void 0;
const Shapes_1 = require("./Shapes");
class Circle extends Shapes_1.Shape {
    constructor(thex, they, radius) {
        super(thex, they);
        this.radius = radius;
        this.radius = radius;
    }
    getInfo() {
        return super.getInfo() + `The radius of the circle is ${this.radius}`;
    }
}
exports.Circle = Circle;
