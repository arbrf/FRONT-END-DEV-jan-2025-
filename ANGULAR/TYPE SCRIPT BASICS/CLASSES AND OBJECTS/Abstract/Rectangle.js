"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rectangle = void 0;
const Shapes_1 = require("./Shapes");
class Rectangle extends Shapes_1.Shape {
    constructor(thex, they, _length, _width) {
        super(thex, they);
        this._length = _length;
        this._width = _width;
    }
    calculateArea() {
        return this._length * this._width;
    }
    get length() {
        return this._length;
    }
    set length(value) {
        this._length = value;
    }
    get width() {
        return this._width;
    }
    set width(value) {
        this._width = value;
    }
    getInfo() {
        return super.getInfo() + `the length is ${this._length} the width is ${this._width} of rectangle`;
    }
}
exports.Rectangle = Rectangle;
