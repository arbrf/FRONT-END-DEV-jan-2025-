import { Coach } from "./Coach";

export class Golf implements Coach{
    getDailyWorkout(): string {
        return "dailyWorkout with Golf coach";
    }
    
}