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

// function to manage the preference button when it is clicked
const handlePreferencesClick = (e) => {
  // prevent default so it won't refresh the page
  e.preventDefault();
  // set input field to empty when preference is clicked
  // setInputField("");
  // console.log(e.target.id)
  console.log(pagination);

  // get the id of the preference tag clicked
  const id = e.target.id;

  // get the index of the preference in the preferenceData state
  const index = preferenceData.findIndex((item) => item.id === parseInt(id));
  // change the state of the class of the clicked preference tag
  preferenceData[index].stateOfClass = !preferenceData[index].stateOfClass;
  // set the preference data state to be the current preference data
  setPreferenceData([...preferenceData]);
  // console.log(preferenceData);
  // get all clicked preferences
  const clickedPreferences = preferenceData.filter(
    (item) => item.stateOfClass === true
  );

  // let input = document.getElementById("input") as HTMLInputElement;
  // let preferences: any = [];

  // if (inputField.length > 0 && attractionData.length > 0) {
  //   // loop through all clicked preferences and filter the attraction data to the clicked preferences
  //   for (let i = 0; i < clickedPreferences.length; i++) {
  //     const element = clickedPreferences[i];
  //     const catArray: any = [];
  //     // loop through the current attractions
  //     for (let index = 0; index < attractionData.length; index++) {
  //       // get one attraction
  //       const attraction = attractionData[index];
  //       // get the categories of the attraction
  //       const data = attraction?.categories.filter(
  //         (catItem) => catItem.name === element.title
  //       );
  //       // if category selected matches any of the categories of the attraction, push the attraction id to the catArray
  //       if (data.length > 0) {
  //         catArray.push(attraction.id);
  //       }
  //     }
  //     // loop through the catArray and filter the result with the attraction id
  //     for (let i = 0; i < catArray.length; i++) {
  //       const element = catArray[i];
  //       const filtered = attractionData.filter((item) => item.id === element);
  //       // push the result into the preferences array
  //       let insideArray = false;
  //       preferences.forEach((element) => {
  //         if (element.id === filtered[0].id) insideArray = true;
  //       });
  //       if (!insideArray) {
  //         preferences.push(filtered[0]);
  //       }
  //     }
  //   }
  // } else {
  //   // loop through all clicked preferences and filter the attraction data to the clicked preferences
  //   for (let i = 0; i < clickedPreferences.length; i++) {
  //     const element = clickedPreferences[i];
  //     const catArray: any = [];
  //     // loop through the initial attractions
  //     for (let index = 0; index < initialAttractionData.length; index++) {
  //       // get one attraction
  //       const attraction = initialAttractionData[index];
  //       // get the categories of the attraction
  //       const data = attraction?.categories.filter(
  //         (catItem) => catItem.name === element.title
  //       );
  //       // if category selected matches any of the categories of the attraction, push the attraction id to the catArray
  //       if (data.length > 0) {
  //         catArray.push(attraction.id);
  //       }
  //     }
  //     // loop through the catArray and filter the result with the attraction id
  //     for (let i = 0; i < catArray.length; i++) {
  //       const element = catArray[i];
  //       const filtered = initialAttractionData.filter(
  //         (item) => item.id === element
  //       );
  //       // push the result into the preferences array
  //       let insideArray = false;
  //       preferences.forEach((element) => {
  //         if (element.id === filtered[0].id) insideArray = true;
  //       });
  //       if (!insideArray) {
  //         preferences.push(filtered[0]);
  //       }
  //     }
  //   }
  // }

  // // if the preference is not undefined, it should push the filtered data into a new array
  // if (preferences.length >= 1 && preferences !== undefined) {
  //   setAttractionData(preferences);
  //   setPreferenceExistingData(preferences);
  // }
};

// if (inputField !== "") {
//   if (preferences.length > 0 && attractionData.length > 0) {
//     let data = attractionData.filter((item) =>
//       item.location.toLowerCase().includes(inputField.toLowerCase())
//     );
//     setAttractionData(data);
//   } else if (preferences.length === 0 && attractionData.length > 0) {
//     let data = attractionData.filter((item) =>
//       item.location.toLowerCase().includes(inputField.toLowerCase())
//     );
//     setAttractionData(data);
//   } else {
//     let data = initialAttractionData.filter((item) =>
//       item.location.toLowerCase().includes(inputField.toLowerCase())
//     );
//     setAttractionData(data);
//   }
// } else if (inputField === "" && preferences.length === 0) {
//   setAttractionData(initialAttractionData);
// }

// preferences changing
// let preferencesDataArray: any = [];

// if (preferences.length > 0) {
//   if (inputField.length > 0 && attractionData.length > 0) {
//     // loop through all clicked preferences and filter the attraction data to the clicked preferences
//     for (let i = 0; i < preferences.length; i++) {
//       const element = preferences[i];
//       const catArray: any = [];
//       // loop through the current attractions
//       for (let index = 0; index < attractionData.length; index++) {
//         // get one attraction
//         const attraction = attractionData[index];
//         // get the categories of the attraction
//         const data = attraction?.categories.filter(
//           (catItem) => catItem.name === element.title
//         );
//         // if category selected matches any of the categories of the attraction, push the attraction id to the catArray
//         if (data.length > 0) {
//           catArray.push(attraction.id);
//         }
//       }
//       // loop through the catArray and filter the result with the attraction id
//       for (let i = 0; i < catArray.length; i++) {
//         const element = catArray[i];
//         const filtered = attractionData.filter(
//           (item) => item.id === element
//         );
//         // push the result into the preferences array
//         let insideArray = false;
//         preferencesDataArray.forEach((element) => {
//           if (element.id === filtered[0].id) insideArray = true;
//         });
//         if (!insideArray) {
//           preferencesDataArray.push(filtered[0]);
//         }
//       }
//     }
//   } else {
//     // loop through all clicked preferences and filter the attraction data to the clicked preferences
//     for (let i = 0; i < preferences.length; i++) {
//       const element = preferences[i];
//       const catArray: any = [];
//       // loop through the initial attractions
//       for (let index = 0; index < initialAttractionData.length; index++) {
//         // get one attraction
//         const attraction = initialAttractionData[index];
//         // get the categories of the attraction
//         const data = attraction?.categories.filter(
//           (catItem) => catItem.name === element.title
//         );
//         // if category selected matches any of the categories of the attraction, push the attraction id to the catArray
//         if (data.length > 0) {
//           catArray.push(attraction.id);
//         }
//       }
//       // loop through the catArray and filter the result with the attraction id
//       for (let i = 0; i < catArray.length; i++) {
//         const element = catArray[i];
//         const filtered = initialAttractionData.filter(
//           (item) => item.id === element
//         );
//         // push the result into the preferences array
//         let insideArray = false;
//         preferencesDataArray.forEach((element) => {
//           if (element.id === filtered[0].id) insideArray = true;
//         });
//         if (!insideArray) {
//           preferencesDataArray.push(filtered[0]);
//         }
//       }
//     }
//   }

//   // if the preference is not undefined, it should push the filtered data into a new array
// if (
//   preferencesDataArray.length >= 1 &&
//   preferencesDataArray !== undefined
// ) {
//   setAttractionData(preferencesDataArray);
//   setPreferenceExistingData(preferencesDataArray);
// }
// }
