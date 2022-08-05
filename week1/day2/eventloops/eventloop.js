const fs = require("fs"); // done

function someAsyncOperation(callback) {
  // Assume this takes 95ms to complete
  fs.readFile("abc.txt", callback); // waiting
}

const timeoutScheduled = Date.now(); // done

setTimeout(() => {
  // waiting
  const delay = Date.now() - timeoutScheduled;

  console.log(`${delay}ms have passed since I was scheduled`);
}, 100);

// do someAsyncOperation which takes 95 ms to complete
someAsyncOperation(() => {
  // done
  const startCallback = Date.now(); // done
  // 1643363343037
  // do something that will take 10ms...
  while (Date.now() - startCallback < 10) {
    //1643363343038 - 1643363343037 = 1
    // do nothing
  }
});

// 1 Jan 1970 number of milliseconds
