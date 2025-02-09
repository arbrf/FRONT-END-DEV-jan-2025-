import { Coach } from "./Coach";

export class Cricket implements Coach{
    getDailyWorkout(): string {
        return "dailyWorkout with Cricket coach";
    }
    
}