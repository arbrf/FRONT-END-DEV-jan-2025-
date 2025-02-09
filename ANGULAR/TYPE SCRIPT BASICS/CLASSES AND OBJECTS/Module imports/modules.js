"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirstClass = void 0;
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
exports.FirstClass = FirstClass;
