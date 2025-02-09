import { Shape } from "./Shapes";
export class Circle extends Shape {
  
    constructor( thex:number,  they:number, private radius:number){
        super(thex, they);
        this.radius = radius;
    }


    getInfo(): string {
       return super.getInfo()+`The radius of the circle is ${this.radius}`;
    }


}