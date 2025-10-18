// Keep track of previously generated questions
const usedQuestions = new Set();

export function generateQuestion(ops, nums) {
  let question;
  let attempt = 0;

  do {
    const op = ops[Math.floor(Math.random() * ops.length)];
    const num1 = nums[Math.floor(Math.random() * nums.length)];
    const factor = Math.floor(Math.random() * 12) + 1; // 1–12
    let qText, answer;

    // ➗ Division: only integer results, up to 12 × chosen number
    if (op === "÷") {
      const dividend = num1 * factor;
      qText = `${dividend} ÷ ${num1} = ?`;
      answer = factor;
    }

    // ✖️ Multiplication: up to 12 × chosen number (random order)
    else if (op === "×") {
      if (Math.random() < 0.5) {
        qText = `${num1} × ${factor} = ?`;
      } else {
        qText = `${factor} × ${num1} = ?`;
      }
      answer = num1 * factor;
    }

    // ➕ Addition: up to 12 + chosen number (random order)
    else if (op === "+") {
      const addend = factor;
      if (Math.random() < 0.5) {
        qText = `${num1} + ${addend} = ?`;
      } else {
        qText = `${addend} + ${num1} = ?`;
      }
      answer = num1 + addend;
    }

    // ➖ Subtraction: practice "something - num1", ensure non-negative
    else if (op === "-") {
      const minuend = num1 + Math.floor(Math.random() * 12) + 1; // N+1 → N+12
      qText = `${minuend} - ${num1} = ?`;
      answer = minuend - num1;
    }

    question = { qText, answer, options: generateOptions(answer) };
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
