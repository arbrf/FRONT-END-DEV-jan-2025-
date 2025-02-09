export class Shape {
    

    constructor(public thex: number,public they: number) {
       this.thex =thex;
       this.they =they;
    }

    getInfo(): string { 
        return `The x is ${this.thex}, the y is ${this.they}`;
    }
}
