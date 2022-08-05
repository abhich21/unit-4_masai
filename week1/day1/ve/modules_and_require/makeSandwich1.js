const name = "Dhaval";

const makeSandwich1 = () => {
  console.log(`${name} is making sandwich`);
};

const makePizza1 = () => {
  console.log(`${name} is making pizza`);
};

// console.log(module.exports);

// module.exports = makeSandwich1;
module.exports = { makeSandwich1, makePizza1 };

// default export => export without putting in object
// named export => export with putting in object
