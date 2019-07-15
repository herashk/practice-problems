//  Implement the enqueue and dequeue methods
// each enqueue is O(1) time and so is each dequeue when outStack has length/items
// each item that enqueues and dequeues costs 1 push (inStack) 1 pop (inStack) 1 push(outStack) and 1 pop (outStack) so runtime is O(m)
class QueueTwoStacks {
    constructor() {
        this.inStack = [];
        this.outStack = [];
    }
    enqueue(item) {
        this.inStack.push(item);
    }
  
    dequeue() {
      if (this.outStack.length === 0) {
          while (this.inStack.length) {
              this.outStack.push(this.inStack.pop());
          }
          if (this.outStack.length === 0) throw error; // can't dequeue from an empty stack
      }
      return this.outStack.pop();
    }
  }
  
  
  
  
  
  
  // Tests
  const q = new QueueTwoStacks();
  
  q.enqueue(1);
  q.enqueue(2);
  q.enqueue(3);
  
  let desc = 'dequeue #1';
  let actual = q.dequeue();
  let expected = 1;
  assertEquals(actual, expected, desc);
  
  desc = 'dequeue #2';
  actual = q.dequeue();
  expected = 2;
  assertEquals(actual, expected, desc);
  
  q.enqueue(4);
  
  desc = 'dequeue #3';
  actual = q.dequeue();
  expected = 3;
  assertEquals(actual, expected, desc);
  
  desc = 'dequeue #4';
  actual = q.dequeue();
  expected = 4;
  assertEquals(actual, expected, desc);
  
  desc = 'dequeue from empty queue';
  const emptyDequeue = () => q.dequeue();
  assertThrowsError(emptyDequeue, desc);
  
  function assertEquals(a, b, desc) {
    if (a === b) {
      console.log(`${desc} ... PASS`);
    } else {
      console.log(`${desc} ... FAIL: ${a} != ${b}`);
    }
  }
  
  function assertThrowsError(func, desc) {
    try {
      func();
      console.log(`${desc} ... FAIL`);
    } catch (e) {
      console.log(`${desc} ... PASS`);
    }
  }