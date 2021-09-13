'use strict';



/*
 * Complete the 'countDuplicate' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY numbers as parameter.
 */

function countDuplicate(numbers) {
    // Write your code here
    let result = {}
    let duplicate = 0
    numbers.forEach( (n) => {
    result[n] = (result[n] || 0) + 1
    });
    console.log(result)
     for (let key in result) {
        if (result.hasOwnProperty(key)) {
         result[key] > 1 ? duplicate++ : duplicate;
        }
     }
     return console.log(duplicate);
    
}

countDuplicate([1, 3, 1, 4, 5, 6, 3, 2])
