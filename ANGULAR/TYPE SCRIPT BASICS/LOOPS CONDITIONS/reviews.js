var reviews = [5, 5, 3, 4, 2, 3];
var total = 0;
for (var i = 0; i < reviews.length; i++) {
    total += reviews[i];
}
var average = total / reviews.length;
console.log("The revies average is ".concat(average));
