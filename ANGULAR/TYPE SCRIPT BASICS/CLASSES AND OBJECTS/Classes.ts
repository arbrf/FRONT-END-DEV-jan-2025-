class FirstClass{
   
   constructor(private _name: string,private _age: number){
      
   }
   public get name(): string {
      return this._name;
   }
   public set name(value: string) {
      this._name = value;
   }
   
   public get age(): number {
      return this._age;
   }
   public set age(value: number) {
      this._age = value;
   }
     
}

let obj=new FirstClass("Saad",23);


console.log(obj.age);
console.log(obj.name);

obj.name = "Ahmed"; // ✅ Valid
obj.age = 30; 

console.log(obj.age);
console.log(obj.name);