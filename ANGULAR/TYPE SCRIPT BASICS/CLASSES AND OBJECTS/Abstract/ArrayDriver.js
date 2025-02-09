"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Circle_1 = require("./Circle");
const Rectangle_1 = require("./Rectangle");
let circle = new Circle_1.Circle(5, 4, 36);
let rectangle = new Rectangle_1.Rectangle(0, 0, 8, 4);
let theShapes = [];
theShapes.push(circle);
theShapes.push(rectangle);
theShapes.forEach(sh => {
    console.log(sh.getInfo());
    console.log(sh.calculateArea());
    console.log();
});
