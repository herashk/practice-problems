function isValid(code) {
    const brackets = {
        '(': ')',
        '[': ']',
        '{': '}',
    };
    const openers = new Set(['(', '[', '{']);
    const closers = new Set([')', ']', '}']);

    const stack = [];

    for (let i = 0; i < code.length; i++) {
        const char = code[i];
        if (openers.has(char)) {
            stack.push(char);
        }
        if (closers.has(char)) {
            if (stack.length === 0);
            if (brackets[stack[stack.length - 1]] === char) {
                stack.pop();
            } else {
                return false;
            }
        }
    }
  
    if (stack.length === 0) {
        return true;
      }
      return false;
  }
  
  
  
  
  
  
  
  
  
  // Tests
  
  let desc = 'valid short code';
  assertEqual(isValid('()'), true, desc);
  
  desc = 'valid longer code';
  assertEqual(isValid('([]{[]})[]{{}()}'), true, desc);
  
  desc = 'mismatched opener and closer';
  assertEqual(isValid('([][]}'), false, desc);
  
  desc = 'missing closer';
  assertEqual(isValid('[[]()'), false, desc);
  
  desc = 'extra closer';
  assertEqual(isValid('[[]]())'), false, desc);
  
  desc = 'empty string';
  assertEqual(isValid(''), true, desc);
  
  function assertEqual(a, b, desc) {
    if (a === b) {
      console.log(`${desc} ... PASS`);
    } else {
      console.log(`${desc} ... FAIL: ${a} != ${b}`);
    }
  }