import { Shape } from "./Shapes";
import { Circle } from "./Circle";
import { Rectangle } from "./Rectangle";
let shape=new Shape(10,20);
let circle=new Circle(5,4,36);

let rectangle=new Rectangle(0,0,8,4);

console.log(rectangle.getInfo());
console.log(circle.getInfo());
console.log(shape.getInfo());