"use strict";
class FirstClass {
    constructor(_name, _age) {
        this._name = _name;
        this._age = _age;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get age() {
        return this._age;
    }
    set age(value) {
        this._age = value;
    }
}
let obj = new FirstClass("Saad", 23);
console.log(obj.age);
console.log(obj.name);
obj.name = "Ahmed"; // ✅ Valid
obj.age = 30;
console.log(obj.age);
console.log(obj.name);
