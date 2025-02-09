let reviews:number[]=[5,5,3,4,2,3];
let total:number=0;
for (let i=0; i<reviews.length; i++){
    total += reviews[i];
}
let average:number=total/reviews.length;
console.log(`The revies average is ${average}`);