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

function arrayToJSON(arr) {
  return arr.map((item) => {
    if (
      typeof item === "object" &&
      item !== null &&
      typeof item.toJSON === "function"
    ) {
      console.log("Here 1: ", true);
      return item.toJSON();
    }
    return item.toJSON();
  });
}

// console.log(arrayToJSON(books));
console.log(new Date());
console.log(new Date() > new Date("2022-10-01T16:44:40.043Z"));
