// Keep track of previously generated questions
const usedQuestions = new Set();

export function generateQuestion(ops, nums, formats = ["x+y=?"]) {
  let question;
  let attempt = 0;

  do {
    const op = ops[Math.floor(Math.random() * ops.length)];
    const num1 = nums[Math.floor(Math.random() * nums.length)];
    const factor = Math.floor(Math.random() * 12) + 1; // 1–12
    const format = formats[Math.floor(Math.random() * formats.length)];

    let X, Y, Z;

    // ➗ Division: only integer results, within selected range
    if (op === "÷") {
      Y = nums[Math.floor(Math.random() * nums.length)];
      const quotient = Math.floor(Math.random() * 12) + 1;
      X = Y * quotient;
      Z = quotient;
    }

    // ✖️ Multiplication
    else if (op === "×") {
      X = num1;
      Y = factor;
      Z = X * Y;
    }

    // ➕ Addition
    else if (op === "+") {
      X = num1;
      Y = factor;
      Z = X + Y;
    }

    // ➖ Subtraction
    else if (op === "-") {
      Y = num1;
      X = num1 + Math.floor(Math.random() * 12) + 1; // ensure positive
      Z = X - Y;
    }

    // --- Determine hidden element from format ---
    let hiddenIndex = 3; // default: hide result (x+y=?)
    if (format === "x+?=y") hiddenIndex = 2; // hide second number
    else if (format === "?+x=y") hiddenIndex = 1; // hide first number

    // --- Build display text ---
    let qText;
    if (hiddenIndex === 1) qText = `? ${op} ${Y} = ${Z}`;
    else if (hiddenIndex === 2) qText = `${X} ${op} ? = ${Z}`;
    else qText = `${X} ${op} ${Y} = ?`;

    const answer = hiddenIndex === 1 ? X : hiddenIndex === 2 ? Y : Z;

    question = {
      data: [X, Y, Z, op, hiddenIndex],
      qText,
      answer,
      options: generateOptions(answer),
    };

    attempt++;
  } while (usedQuestions.has(question.qText) && attempt < 50); // ensure unique question

  usedQuestions.add(question.qText);
  return question;
}

function generateOptions(correct) {
  const options = new Set([correct]);
  while (options.size < 4) {
    const rand = correct + Math.floor(Math.random() * 10 - 5);
    if (rand >= 0) options.add(rand);
  }
  return Array.from(options).sort(() => Math.random() - 0.5);
}
