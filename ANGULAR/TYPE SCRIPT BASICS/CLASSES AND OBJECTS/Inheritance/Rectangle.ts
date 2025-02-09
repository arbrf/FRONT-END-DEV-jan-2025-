import { Shape } from "./Shapes";
export class Rectangle extends Shape {
 
   
 constructor(thex: number, they: number,private _length: number,private _width: number){
    super(thex,they);
 }
   
 public get length(): number {
    return this._length;
}
public set length(value: number) {
    this._length = value;
}

public get width(): number {
    return this._width;
}
public set width(value: number) {
    this._width = value;
}

public getInfo(): string {
    return super.getInfo()+`the length is ${this._length} the width is ${this._width}`
}

}