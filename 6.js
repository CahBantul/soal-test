function lastLetters(word) {
  // Write your code here
  const result = `${word.charAt(word.length - 1)} ${word.charAt(
    word.length - 2
  )}`;
  console.log(result);
}

lastLetters('APPLE');
