const books = [
  {
    title: "Gone are",
    author: "Angeles Mich",
    year: 2009,
    country: "Italy",
    language: "Italian",
    stateOfFocus: true,
  },
  {
    title: "Things fall",
    author: "Chinua Achebe",
    year: 2011,
    country: "Nigeria",
    language: "English",
    stateOfFocus: false,
  },
  {
    title: "The navy man",
    author: "Ade biyi",
    year: 2021,
    country: "America",
    language: "English",
    stateOfFocus: false,
  },
];

// function arrayToJSON(arr) {
//   return arr.map((item) => {
//     if (
//       typeof item === "object" &&
//       item !== null &&
//       typeof item.toJSON === "function"
//     ) {
//       console.log("Here 1: ", true);
//       return item.toJSON();
//     }
//     return item.toJSON();
//   });
// }

// // console.log(arrayToJSON(books));
// console.log(new Date());
// console.log(new Date() > new Date("2022-10-01T16:44:40.043Z"));

// function computeJoinPoint(s1, s2) {
//   // Write your code here
//   // To debug: console.error('Debug messages...');
//   console.time();
//   const maximum = 20000000;
//   let s1sum = s1;
//   let s2sum = s2;

//   let joinPoint = 0;

//   const calcSum = (num) => {
//     let nums = num.toString().split("");
//     let sum = nums.reduce((a, b) => parseInt(a) + parseInt(b));
//     return num + sum;
//   };

//   const run = () => {
//     s1sum = calcSum(s1sum);
//     s2sum = calcSum(s2sum);

//     const found = checkForJoin(s1sum, s2sum);

//     if (found) {
//       joinPoint = s1sum;
//       return;
//     } else {
//       run();
//     }
//   };

//   const checkForJoin = (a, b) => {
//     if (a === b) {
//       return true;
//     } else {
//       return false;
//     }
//   };

//   run();
//   console.timeEnd();
//   return joinPoint;
// }

// function computeJoinPointa(s1, s2) {
//   console.time();
//   const numbers = (nb) =>
//     String(nb)
//       .split("")
//       .reduce((a, b) => parseInt(a) + parseInt(b));
//   while (s1 !== s2) {
//     s1 += numbers(s1);
//     s2 += numbers(s2);
//   }
//   console.timeEnd();
//   return s1;
// }

// console.log(computeJoinPoint(471, 480));

// console.log(computeJoinPointa(471, 480));

// const generateBucketListTripDateArray = (startDate, endDate) => {
//   startDate = new Date(startDate);
//   endDate = new Date(endDate);
//   const date = new Date(startDate.getTime());
//   let array = [];

//   while (date <= endDate) {
//     const arrayDateName = `${date.getMonth()} ${date.getDate()}`;
//     array.push({
//       label: arrayDateName,
//     });
//     date.setDate(date.getDate() + 1);
//   }
//   console.log(array);
//   array = array.map((item, index) => {
//     return { ...item, key: index };
//   });

//   return array;
// };

// // console.log(new Date());

// console.log(
//   generateBucketListTripDateArray(
//     new Date("2022-10-22T14:00:06.606Z"),
//     new Date("2022-10-25T14:00:06.606Z")
//   )
// );
