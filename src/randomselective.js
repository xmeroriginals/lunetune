const start = 1, end = {SELECTLIMIT*}, exclude = {NOTSELECT*};

const getResult = () => {
  if ([start, end, exclude].some(isNaN) || start > end) {
    return "Invalid";
  } else {
    const validNumbers = [];
    for (let i = start; i <= end; i++) {
      if (i !== exclude) validNumbers.push(i);
    }
    return validNumbers.length === 0
      ? "Error"
      : validNumbers[Math.floor(Math.random() * validNumbers.length)];
  }
};

console.log(getResult());
