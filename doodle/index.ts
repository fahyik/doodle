export * from "./vending-machine";

// import { buildVendingMachine } from "./vending-machine";
// import * as readline from "readline";

// // const rl = readline.createInterface({
// //   input: process.stdin,
// //   output: process.stdout,
// // });

// // rl.question("What is your name? ", (answer) => {
// //   console.log(`Oh, so your name is ${answer}`);
// // });

// const machine = buildVendingMachine({
//   initialInventory: [{ id: "apple", quantity: 1, price: 11 }],
//   initialBank: {
//     "1p": 5,
//     "2p": 5,
//     "5p": 5,
//     "10p": 5,
//     "20p": 5,
//     "50p": 5,
//     "100p": 5,
//     "200p": 5,
//   },
// });

// console.log(
//   machine.topUpBank({
//     "1p": 5,
//     "2p": 5,
//     "5p": 5,
//     "10p": 5,
//     "20p": 5,
//     "50p": 5,
//     "100p": 5,
//     "200p": 5,
//   })
// );

// console.log(
//   machine.sell(
//     "apple",
//     {
//       "1p": 0,
//       "2p": 0,
//       "5p": 0,
//       "10p": 0,
//       "20p": 1,
//       "50p": 0,
//       "100p": 0,
//       "200p": 0,
//     },
//     false
//   )
// );

// console.log(machine.getBankHistory());
// console.log(machine.getBankState());
// console.log(machine.getInventoryHistory());
// console.log(machine.getInventoryState());

// // console.log(
// //   machine.sell(
// //     "apple",
// //     {
// //       "1p": 0,
// //       "2p": 0,
// //       "5p": 0,
// //       "10p": 1,
// //       "20p": 0,
// //       "50p": 0,
// //       "100p": 0,
// //       "200p": 0,
// //     },
// //     false
// //   )
// // );

// // console.log(machine.getBankHistory());
// // console.log(machine.getBankState());
// // console.log(machine.getInventoryHistory());
// // console.log(machine.getInventoryState());

// // const { buildVendingMachine } = require("./build/doodle/vending-machine");
// // const machine = buildVendingMachine();
// // machine.addProductToInventory({ id: "orange", price: 78, quantity: 10 });
// // machine.addProductToInventory({ id: "coke", price: 116, quantity: 10 });
// // machine.topUpInventory({ productId: "coke", quantityToAdd: 4 });
// // machine.getInventoryState();
// // machine.getInventoryHistory();
// // machine.sell("coke", {});
// // machine.sell("coke", { "20p": 6 });
// // machine.topUpBank()
// // machine.getBankState()
