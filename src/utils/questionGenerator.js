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

    // ✖️ Multiplication: up to 12 × chosen number
    else if (op === "×") {
      qText = `${num1} × ${factor} = ?`;
      answer = num1 * factor;
    }

    // ➕ Addition: up to 12 × chosen number
    else if (op === "+") {
      const addend = factor;
      qText = `${num1} + ${addend} = ?`;
      answer = num1 + addend;
    }

    // ➖ Subtraction: cannot be negative, up to 12 × chosen number
    else if (op === "-") {
      const subtractor = Math.floor(Math.random() * 12) + 1;
      const minuend = Math.max(num1 * factor, subtractor);
      const subtrahend = Math.min(minuend, subtractor);
      qText = `${minuend} - ${subtrahend} = ?`;
      answer = minuend - subtrahend;
    }

    question = { qText, answer, options: generateOptions(answer) };
    attempt++;
    // Keep generating until it's unique or after a few tries (to avoid infinite loop)
  } while (usedQuestions.has(question.qText) && attempt < 50);

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
