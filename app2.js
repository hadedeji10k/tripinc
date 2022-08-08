// function move(array, moveIndex, toIndex) {
//   /* #move - Moves an array item from one position in an array to another.
//        Note: This is a pure function so a new array will be returned, instead
//        of altering the array argument.
//       Arguments:
//       1. array     (String) : Array in which to move an item.         (required)
//       2. moveIndex (Object) : The index of the item to move.          (required)
//       3. toIndex   (Object) : The index to move item at moveIndex to. (required)
//     */
//   //    a,b,c
//   //    2,0
//   let itemRemovedArray = [
//     ...array.slice(0, moveIndex), // [a,b]
//     ...array.slice(moveIndex + 1, array.length), // []
//   ];
//   console.log(itemRemovedArray);
//   return [
//     ...itemRemovedArray.slice(0, toIndex), // []
//     array[moveIndex], // [c]
//     ...itemRemovedArray.slice(toIndex, itemRemovedArray.length), // [a,b]
//   ];
//   //   [c,a,b]
// }

// // Examples
// // --------

// console.log(move(["a", "b", "c"], 2, 0));

// console.log(
//   move(
//     [
//       { name: "Fred" },
//       { name: "Barney" },
//       { name: "Wilma" },
//       { name: "Betty" },
//     ],
//     3,
//     0
//   )
// );

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
// const author = "",
//   year = "",
//   country = "",
//   language = "",
//   title = "";

// const result = books
//   .filter((item) => item.author.toLowerCase().includes(author.toLowerCase()))
//   .filter((item) => item.title.toLowerCase().includes(title.toLowerCase()))
//   .filter((item) =>
//     item.year.toString().toLowerCase().includes(year.toString().toLowerCase())
//   )
//   .filter((item) => item.country.toLowerCase().includes(country.toLowerCase()))
//   .filter((item) =>
//     item.language.toLowerCase().includes(language.toLowerCase())
//   );
// console.log(result);

// setArray((prev) => {
//   for (let i = 0; i < prev.length; i++) {
//     prev[i].stateOfFocus = false;
//   }

//   return [
//     ...prev,
//     {
//       id: prev.length + 1,
//       stateOfFocus: true,
//     },
//   ];
// });

// const deleteInput = (id) => {
//     const newFiltered = array.filter((item) => item.id !== id)
//     setArray(newFiltered)
// }

// const moveArray = (array, moveIndex, toIndex) => {
//   let itemRemovedArray = [
//     ...array.slice(0, moveIndex),
//     ...array.slice(moveIndex + 1, array.length),
//   ];

//   return [
//     ...itemRemovedArray.slice(0, toIndex),
//     array[moveIndex],
//     ...itemRemovedArray.slice(toIndex, itemRemovedArray.length),
//   ];
// };

// const array = [1, 2, 3, 4];
// const handleUp = (id) => {
//   const newArray = moveArray(array, id, id - 1);
//   return newArray;
// };

// const handleDown = (id) => {
//   const newArray = moveArray(array, id, id + 1);
//   return newArray;
// };

// console.log(handleUp(2));
// console.log(handleDown(2));
