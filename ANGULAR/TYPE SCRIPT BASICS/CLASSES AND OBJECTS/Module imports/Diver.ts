import { FirstClass } from "./modules";
let obj=new FirstClass("Saad",23);
 
 
console.log(obj.age);
console.log(obj.name);

obj.name = "Ahmed"; // ✅ Valid
obj.age = 30; 

console.log(obj.age);
console.log(obj.name);