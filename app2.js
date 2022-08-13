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

let newBook = books.map((a) => ({ ...a }));
// console.log(newBook);
newBook[1].title = "Things fall apart";
console.log(newBook);
console.log(books);

// <div aria-label="decrement" data-unique_id="Unique number">
//   Yes
// </div>;

// const decrementSelector = '[aria-label="decrement"]';

// /*
// 1. Add a data attribute to the HTML element showing the status of pack
// 2. Also add the unique_id (of the package) as a data attribute
// 3. Add data attribute to the HTML element of button of pack to click
// */

// cy.get(decrementSelector)
//   .contains("Yes")
//   .then(($el) => {
//     $el.invoke("attr", "data-unique_id").then((dataId) => {
//       cy.log("dataId : ", dataId);

//       // get the input element and type the dataId in the input
//       cy.get('[data-testid="first-name"]').type(dataId);
//       // Get the button element and click on the button element
//       cy.get('[data-testid="submit_button"]').click();
//       // expect the result
//       $el.should("have.text", "Yes");
//     });
//   });

// <<<<<<<<<<<<<<<<<<<<<<< CYPRESS TESTING <<<<<<<<<<<<<<<<<<<<

// data-test_input="login_submit_button"
// data-test_input="password"
// data-test_input="email"

// dinko@fulfillment.test
// Test1234!

describe("Mounts the transaction page", () => {
  before(() => {
    cy.visit("http://localhost:3000", { timeout: 30000 });

    // get the email input and type login details to it
    cy.get('[data-test_input="email"]').type("dinko@fulfillment.test");

    // get the password input and type login details to it
    cy.get('[data-test_input="password"]').type("Test1234!");

    // get the button to submit and click
    cy.get('[data-test_input="login_submit_button"]').click();

    // wait for the page to login
    cy.wait(1000);
    // rediect to the home page
    cy.visit("http://localhost:3000/home");

    // select one transaction data to pop up the modal
    cy.get("div.react-bootstrap-table tbody tr", { timeout: 7000 })
      .first()
      .click();

    cy.wait(1000);
  });

  it("Should Pack Item", () => {
    cy.get('[data-test_order="packed_item"]')
      .contains("Yes")
      .invoke("attr", "data-unique_id")
      .then((dataId) => {
        cy.log("dataId : ", dataId);

        // get the input element and type the dataId in the input
        cy.get('[data-test_order="input"]').type(dataId);

        // Get the button element and click on the button element
        cy.get('[data-test_order="pack_button"]').click();
      });
  });

  it("Should Unpack Item", () => {
    cy.get('[data-test_order="unpack_button"]').first().click();
  });

  it("Should Re-Print Label", () => {
    cy.get('[data-test_order="reprint_label"]').click();
  });

  it("Should Hold Order", () => {
    cy.get('[data-test_order="hold_button"]').click();
  });
});
