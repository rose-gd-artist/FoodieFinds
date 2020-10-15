/*

Pre-requisites: install JSON server: https://github.com/typicode/json-server#getting-started

Create a web application that shows a list of restaurants from your database and their reviews. 

Core requirements:

1. Populate the page with restaurants from your local database, showing the name,
address, an image, and the average review score. For instance, if there are 2 reviews
on a restaurant, one for 4 stars and one for 3 stars, the average review score should
be 3.5. Use .map(). 

2. Show the reviews from your local database below each restaurant, showing the text
and star rating. Use .filter() and .map().

3. Sort the restaurants from highest-rated to lowest-rated. Use .sort().

4. Create a form that allows the user to write a new review and give a star rating.
When the user submits the form the new review should show up on the page WITHOUT
reloading the page.

Complete at least one of the following requirements then complete as many others as
possible in whichever order you'd like.

1. The form should not be shown until someone clicks a button. Make sure the correct
restaurantId is being added to the review. Only one form should be visible at a time.

2. The reviews should only be shown below the restaurant after the user clicks a
restaurant. Only one restaurant's reviews should be visible at a time.

3. Add the option to delete reviews, but not restaurants. Deleting a review should
remove it from the database. After deleting, show the updated list of reviews WITHOUT
reloading the page.

4. Add users to the database. Associate them with reviews and show the user's details
on the review. Use the .find() method to do so.

Grading criteria:

1. Use the methods that are listed in each requirement.

2. Use async/await and fetch and use only the data that exists in your database.

3. Use only ES6+ techniques if needed: template strings (`${}`), arrow functions,
forEach(), etc.

4. Use GitHub and make a new branch for each numbered task, so at least 5 branches
total. Give the branch a meaningful name using this convention: feature/show-restaurants.
Merge the feature branch into your main branch when you complete the task. 

5. Do not have any extraneous comments beyond explanations of code (if needed)
in your final result. Do not have any console.logs, in comments or otherwise.

6. CSS is not necessary and will not be graded but is encouraged for the sake of
practice.

*/
//     For Node.js database in hard drive in terminal desktop/restaurantReview/
//     This package has installed:
//     •	Node.js v14.13.1 to /usr/local/bin/node
//     •	npm v6.14.8 to /usr/local/bin/npm
//     Make sure that /usr/local/bin is in your $PATH. 


const getRestaurants = async () => {
    const response = await fetch("http://localhost:3000/restaurants");
    const restaurants = await response.json();
    return response;
};
const showRestaurantInfo = async () => {
    const result = document.getElementsByClassName("result")[0];
    const restaurantsInfo = await getRestaurants();
    restaurantsInfo.forEach((restaurants) => {

    });
};

showRestaurantInfo()