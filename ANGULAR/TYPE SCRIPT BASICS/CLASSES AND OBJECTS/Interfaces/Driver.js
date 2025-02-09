"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cricket_1 = require("./Cricket");
const Golf_1 = require("./Golf");
let coaches = [];
let cricket = new Cricket_1.Cricket();
let golf = new Golf_1.Golf();
coaches.push(cricket);
coaches.push(golf);
for (let tempCoach of coaches) {
    console.log(tempCoach.getDailyWorkout());
    console.log();
}
