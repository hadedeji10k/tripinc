// let ratings = [
//   {
//     userId: 1,
//     fullName: "string",
//     attractionId: 12,
//     rating: 2,
//     comment: "string",
//   },
//   {
//     userId: 1,
//     fullName: "string",
//     attractionId: 12,
//     rating: 3,
//     comment: "string",
//   },
//   {
//     userId: 1,
//     fullName: "string",
//     attractionId: 12,
//     rating: 4,
//     comment: "string",
//   },
// ];

// let numOfRatings = ratings.length;
// let starsArray = ratings.map((item) => {
//   return item.rating;
// });

// let sum = starsArray.reduce((a, b) => a + b, 0);
// let average = sum / numOfRatings;
// console.log(starsArray);
// console.log(average);

let array = [
  {
    id: 1,
    item: "item1",
  },
  {
    id: 2,
    item: "item2",
  },
  {
    id: 3,
    item: "item3",
  },
];

let array1 = [
  {
    id: 1,
    item: "item1",
    amount: 5,
  },
  {
    id: 2,
    item: "item1",
    amount: 10,
  },
];
let index = array1.find((item) => item?.id === array[2].id);
const starsArray = array1.map((item) => {
  return item.amount;
});

const sum = starsArray.reduce((a, b) => a + b, 0);
console.log(sum);
// if (index) {
//   console.log(index);
// }
// console.log(index);
// let obj = {
//   id: 1,
//   name: "hello",
// };
// let newArray = [...array1, ...obj];
// console.log(newArray);
