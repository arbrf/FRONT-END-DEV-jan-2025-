import { Shape } from "./Shapes";
import { Circle } from "./Circle";
import { Rectangle } from "./Rectangle";

let circle=new Circle(5,4,36);

let rectangle=new Rectangle(0,0,8,4);
 let theShapes: Shape[] =[];

 theShapes.push(circle);
 theShapes.push(rectangle);


 theShapes.forEach(
    sh => {
        console.log(sh.getInfo());
        console.log(sh.calculateArea());
        console.log();
    }
);