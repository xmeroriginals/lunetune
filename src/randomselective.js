const start = 1, end = 10, exclude = 5;

const getJsonResult = () => {
  const sendJson = obj => JSON.stringify(obj);

  if ([start, end, exclude].some(isNaN) || start > end) {
    return sendJson({ error: "Invalid" });
  } else {
    const validNumbers = [];
    for (let i = start; i <= end; i++) {
      if (i !== exclude) validNumbers.push(i);
    }
    return validNumbers.length === 0
      ? sendJson({ error: "Error" })
      : sendJson({ selected: validNumbers[Math.floor(Math.random() * validNumbers.length)] });
  }
};

console.log(getJsonResult());
