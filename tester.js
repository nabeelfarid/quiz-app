// // Convert number in words. Example
// // Input
// // 23
// // 123

// // Output
// // Twenty Three
// // One Hundred and Twenty Three

// var singles = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
// var tens = ['', "onety", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninty"];
// var oneties = ['ten', "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];

// var input = '465';

// //4 is third digit
// //6 is second digit
// //5 is third digit

// var strNo = ''

// //check for hundreds first
// if (input.length > 2) {
//     var firstDigit = Number(input[input.length - 3]);
//     strNo = singles[firstDigit] + ' hundred'
// }

// //then check for tens
// if (input.length > 1) {
//     var secondDigit = Number(input[input.length - 2]);
//     var thirdDigit = Number(input[input.length - 1]);

//     if (secondDigit === 1) {  //incase tens are oneties, add oneties and finish
//         strNo += ' ' + oneties[thirdDigit];
//     } else { //prints tens with singles also and finish
//         strNo += ' ' + tens[secondDigit];
//         strNo += ' ' + singles[thirdDigit];
//     }
// } else {
//     //if its a single digit number then print it
//     var thirdDigit = Number(input[input.length - 1])
//     strNo += ' ' + singles[thirdDigit];
// }


// console.log(strNo.trim())

var array = [0,5,6,7];
function mirror(arr){
    var newArray = arr.slice();
    newArray.reverse();
    return arr.concat(newArray)
}
console.log(mirror(array));
// mirror(array)