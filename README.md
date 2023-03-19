# losstudy
React app for online studying

The sortLessons function takes an array of lessons as an argument.
The function uses the spread operator (...) to make a copy of the lessons array and then sorts the copy in ascending order based on the order property of each object. 
Finally, the sorted copy of lessons is returned to the caller.
Here is the code documented:
/**
 * Sorts an array of lessons in ascending order based on the 'order' property of each object.
 * @param {Array} lessons - An array of lesson objects to be sorted.
 * @returns {Array} A new array of sorted lesson objects.
 */
const sortLessons = (lessons) => {
  // make a copy of the lessons array using the spread operator
  const lessonsCopy = [...lessons];
  
  // sort the copied lessons array based on the 'order' property of each object
  const sortedLessons = lessonsCopy.sort((a, b) => a.order - b.order);
  
  // return the sorted lessons array to the caller
  return sortedLessons;
};

