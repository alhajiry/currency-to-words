var prompt = require("prompt-sync")();

const switchDigits = number => {
  if (number <= 0) {
    return "please input number above 0";
  } else if (isNaN(parseInt(number))) {
    return "this application only accept number";
  }

  const belowTen = {
    0: "zero",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine"
  };

  const aboveTen = {
    10: "ten",
    11: "eleven",
    12: "twelve",
    13: "thirteen",
    14: "fourteen",
    15: "fifteen",
    16: "sixteen",
    17: "seventeen",
    18: "eighteen",
    19: "nineteen"
  };

  const multiplyofTen = {
    20: "twenty",
    30: "thirty",
    40: "forty",
    50: "fifty",
    60: "sixty",
    70: "seventy",
    80: "eighty",
    90: "ninety"
  };

  const bigNumbers = {
    0: "",
    1: "thousand",
    2: "million",
    3: "billion",
    4: "trillion",
    5: "quadrillion",
    6: "quintillion"
  };

  const amount = number.toString().split("");

  if (amount.length > 18) {
    return "Number Too Big";
  }

  let centCounter = 0;
  let centChecker = amount.includes(".");

  // check digits after cent
  if (centChecker) {
    for (let i = amount.length - 1; i > 0; i--) {
      // console.log(i);
      if (amount[i] !== ".") {
        centCounter++;
      } else {
        break;
      }
    }
  }

  if (centCounter > 3) {
    return "cent length must not exceed 3 digits";
  }

  let digits = 0;
  let cents = centCounter >= 2 ? "cents" : "cent";
  let dollars = amount > 1 ? "dollars" : "dollar";

  //check whether cent exist or not
  const findCent = value => value === ".";
  const centIndex = amount.findIndex(findCent);
  // console.log(centIndex);

  //find the length of digits
  if (centIndex === -1) {
    digits = amount.length;
  } else {
    digits = centIndex;
  }

  // console.log(digits);

  // find the denominal (hundred, thousand, million, etc) //unused
  // let denominal = bigNumbers[digits];
  let accessKey = "";
  let digitsToWord = "";
  let checker = false;

  for (let i = 0; i < digits; i++) {
    // console.log(digits);
    if ((digits - i) % 3 === 2) {
      if (amount[i] === "1") {
        accessKey += amount[i] + amount[i + 1];
        digitsToWord += `${aboveTen[accessKey]} `;
        accessKey = "";
        i++;
        checker = true;
        // console.log(checker);
      } else if (amount[i] != 0) {
        accessKey += amount[i] + "0";
        digitsToWord += `${multiplyofTen[accessKey]} `;
        accessKey = "";
        checker = true;
        // console.log(checker);
      }
    } else if (amount[i] != 0) {
      accessKey += amount[i];
      digitsToWord += `${belowTen[accessKey]} `;
      accessKey = "";
      if ((digits - i) % 3 === 0) {
        digitsToWord += "hundred and ";
      }
      checker = true;
    }
    if ((digits - i) % 3 === 1) {
      // console.log(digits);
      // console.log(i);
      // console.log(checker);
      if (checker) {
        accessKey += (digits - i - 1) / 3;
        // console.log(digits);
        digitsToWord += `${bigNumbers[accessKey]} `;
        // console.log(accessKey);
        accessKey = "";
        checker = false;
      }
    }

    if (centChecker) {
      var digitsCent = "";
      let temp = [...amount];
      let amounts = temp
        .join("")
        .split(".")
        .pop();
      // console.log(amounts);

      if (amounts.length === 3) {
        digitsCent += `${dollars} and hundred ${cents}`;
      } else if (amounts.length === 2) {
        if (amounts[0] == 1) {
          accessKey += amounts[0] + amounts[1];
          digitsCent += `${dollars} and ${aboveTen[accessKey]} ${cents}`;
          accessKey = "";
        } else if (amounts[0] == 0) {
          accessKey += amounts[1];
          digitsCent += `${dollars} and ${belowTen[accessKey]} ${cents}`;
          accessKey = "";
        } else if (amounts[0] > 1) {
          if (amounts[1] > 0) {
            accessKey += amounts[1];
            let accessKey2 = amounts[0] + "0";
            console.log(accessKey2);
            digitsCent += `${dollars} and ${multiplyofTen[accessKey2]} ${belowTen[accessKey]} ${cents}`;
            accessKey = "";
            accessKey2 = "";
          } else if (amounts[1] == 0) {
            accessKey += amounts[0] + "0";
            digitsCent += `${dollars} and ${multiplyofTen[accessKey]} ${cents}`;
            accessKey = "";
          }
        }
      } else if (amounts.length === 1) {
        accessKey += amounts[0];
        digitsCent += `${dollars} and ${belowTen[accessKey]} ${cents}`;
        accessKey = "";
      }
    }
  }

  return centChecker
    ? `${digitsToWord} ${digitsCent}`
    : `${digitsToWord} ${dollars}`;
};

let question = prompt("Please input number : ");

console.log(switchDigits(question));

question = prompt("Try again ? ");

console.log(switchDigits(question));

// let question = prompt("What Number ?");

//test cases
// console.log(switchDigits(123));
// console.log(switchDigits(123.12));
// console.log(switchDigits(123.1));
// console.log(switchDigits(123.25));
// console.log(switchDigits(123.05));
// console.log(switchDigits(123.4567));
// console.log(switchDigits(-1));
// console.log(switchDigits(0));
// console.log(switchDigits("this is a string"));
// console.log(switchDigits(98821));
// console.log(switchDigits(15000));
