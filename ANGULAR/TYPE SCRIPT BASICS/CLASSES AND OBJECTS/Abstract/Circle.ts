import { Shape } from "./Shapes";
export class Circle extends Shape {
    calculateArea(): number {
        return Math.PI * Math.pow(this.radius, 2);
    }
  
    constructor( thex:number,  they:number, private radius:number){
        super(thex, they);
        this.radius = radius;
    }


    getInfo(): string {
       return super.getInfo()+`The radius of the circle is ${this.radius}`;
    }


}