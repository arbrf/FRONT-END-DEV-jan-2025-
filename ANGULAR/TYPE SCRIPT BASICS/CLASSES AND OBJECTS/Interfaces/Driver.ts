import { Coach } from "./Coach";
import { Cricket } from "./Cricket";
import { Golf } from "./Golf";

let  coaches:Coach[] = [];
let cricket=new Cricket();
let  golf=new Golf();
coaches.push(cricket);
coaches.push(golf);

for(let tempCoach of coaches){
 console.log(tempCoach.getDailyWorkout());
 console.log();
}