"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modules_1 = require("./modules");
let obj = new modules_1.FirstClass("Saad", 23);
console.log(obj.age);
console.log(obj.name);
obj.name = "Ahmed"; // ✅ Valid
obj.age = 30;
console.log(obj.age);
console.log(obj.name);
