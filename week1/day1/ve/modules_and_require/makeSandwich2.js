const makeSandwich3 = require("./makeSandwich3");
const name = "Dhaval";

const makeSandwich2 = () => {
  console.log(`${name} is making sandwich 2`);
};

makeSandwich3();

// console.log(module.exports); // {makeSandwich2: makeSandwich2}

module.exports.makeSandwich2 = makeSandwich2;
