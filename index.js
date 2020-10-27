const getRestaurants = async () => {
    const response = await fetch("http://localhost:3000/restaurants");
    const restaurants = await response.json();
    return restaurants;
};

const getReviews = async () => {
    const response = await fetch("http://localhost:3000/reviews");
    const reviews = await response.json();
    return reviews;
};

const createNewReview2 = async (restaurantId, stars, text) => {
    
    const newReview = {
        restaurantId,
        stars,
        text,
    };
    
    await fetch("http://localhost:3000/reviews", {
        method: "POST",
        body: JSON.stringify(newReview),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });

    showRestaurantInfo();
    alert("Thanks for the review!");
};

const deleteReview = async (reviewsId) => {
    
    await fetch(`http://localhost:3000/reviews/${reviewsId}`, {
        method: "DELETE"
    });

    showRestaurantInfo();
    alert("Your review has been deleted");
};


let userStars;
let userReviewFormText;
let submitForm;
let restaurants;

const showRestaurantInfo = async () => {
    const result = document.getElementsByClassName("result")[0];
    const restaurantsInfo = await getRestaurants();
    const restaurantReviews = await getReviews();
    result.innerHTML = "";
        
        const restaurantWithOverallRatings = restaurantsInfo.map((restaurants) => {

            const starFilter = restaurantReviews.filter((reviews) => {
                return restaurants.id === reviews.restaurantId;
            });
            const starMapper = starFilter.map((reviews) => {
                return reviews.stars;
            });
        
            const starAverageRating = starMapper.reduce((a, b) => (a + b), 0) / starMapper.length;

            return {
                ...restaurants,
                starAverageRating
            };

        });
        
        const restaurantSorter = restaurantWithOverallRatings.sort((a, b) => b.starAverageRating - a.starAverageRating);
        
        const showRestaurants = restaurantSorter.map((restaurants) => {

            const starFilter2 = restaurantReviews.filter((reviews) => {
                return restaurants.id === reviews.restaurantId;
            });

            infoBox = document.createElement("div");
            infoBox.classList.add("infoBox");
            result.appendChild(infoBox);

            let restaurantPic = document.createElement("div");
            restaurantPic.classList.add("restaurantPic");
            restaurantPic.style.backgroundImage = `url("${restaurants.imgUrl}")`;
            restaurantPic.style.backgroundSize = "cover";
            restaurantPic.style.backgroundPosition = "center";
            restaurantPic.style.backgroundRepeat = "no-repeat";
            infoBox.appendChild(restaurantPic);

            let restaurantName = document.createElement("h2");
            restaurantName.classList.add("restaurantName");
            infoBox.appendChild(restaurantName);
            restaurantName.innerHTML += `${restaurants.name}</br>`;

            let restaurantAddress = document.createElement("p");
            restaurantAddress.classList.add("restaurantAddress");
            infoBox.appendChild(restaurantAddress);
            restaurantAddress.innerHTML += `${restaurants.address}</br>`;

            let restaurantAverageRating = document.createElement("p");
            restaurantAverageRating.classList.add("restaurantAverageRating");
            infoBox.appendChild(restaurantAverageRating);
            restaurantAverageRating.innerHTML = `Overall Star Rating: ${restaurants.starAverageRating}</br>`;

            let deleteButton = document.getElementsByClassName("deleteButton")[0];

            let indyReviews = starFilter2.map((reviews) => {
                    let restaurantIndividualRating = document.createElement("p");
                    restaurantIndividualRating.classList.add("restaurantIndividualRating");
                    infoBox.appendChild(restaurantIndividualRating);
                    restaurantIndividualRating.innerHTML += `Stars: ${reviews.stars}</br>
                                                                ${reviews.text}</br>`;
                    deleteButton = document.createElement("div");
                    deleteButton.classList.add("deleteButton");
                    deleteButton.setAttribute("type", "button");
                    deleteButton.innerHTML = "Delete";
                    infoBox.appendChild(deleteButton);

                    const deleteThisReview = async (event) => {
                
                        event.preventDefault();
                        const reviewText = document.getElementsByClassName("userReviewFormText")[0].value;
                        const reviewStars = document.getElementsByClassName("userStars")[0].value;
                        const reviewToDelete = document.getElementsByClassName("restaurantIndividualRating")[0].value;
                        const goodbyeReview = deleteReview(reviews.id);
                        showRestaurantInfo();
                    
                    };
                    deleteButton.addEventListener("click", deleteThisReview);

            });


            let reviewButton = document.createElement("div");
            reviewButton.classList.add("reviewButton");
            reviewButton.classList.add("show");
            reviewButton.innerHTML = "Review";
            infoBox.appendChild(reviewButton);
            reviewButton.addEventListener("click", () => {
                userReviewForm.classList.toggle("show");
            });

            let userReviewForm = document.createElement("form");
            userReviewForm.classList.add("userReviewForm");
            userReviewForm.classList.add("hide");
            infoBox.appendChild(userReviewForm);

            let userReviewFormStars = document.createElement("div");
            userReviewFormStars.classList.add("userReviewFormStars");
            userReviewFormStars.innerHTML = "Stars: ";
            userReviewForm.appendChild(userReviewFormStars);

            userStars = document.createElement("input");
            userStars.classList.add("userStars");
            userStars.setAttribute("placeholder", "1 to 5");
            userStars.setAttribute("type", "number");
            userStars.setAttribute("min", "1");
            userStars.setAttribute("max", "5");
            userReviewFormStars.appendChild(userStars);

            let reviewHeader = document.createElement("div");
            reviewHeader.classList.add("reviewHeader");
            reviewHeader.innerHTML = "Write your own review...";
            userReviewForm.appendChild(reviewHeader);

            userReviewFormText = document.createElement("textarea");
            userReviewFormText.classList.add("userReviewFormText");
            userReviewFormText.setAttribute("placeholder", "Type in your opinion");
            userReviewFormText.setAttribute("type", "textarea");
            userReviewFormText.setAttribute("maxlength", "5000");
            userReviewFormText.setAttribute("rows", "50");
            userReviewFormText.setAttribute("cols", "10");
            userReviewForm.appendChild(userReviewFormText);

            submitForm = document.createElement("input");
            submitForm.classList.add("submitForm");
            submitForm.setAttribute("type", "submit");
            submitForm.setAttribute("value", "Submit");
            userReviewForm.appendChild(submitForm);
            const newestReview = async (event) => {
                event.preventDefault();
                const reviewText = document.getElementsByClassName("userReviewFormText")[0].value;
                const reviewStars = document.getElementsByClassName("userStars")[0].value;
                const deleteReviewButton = document.getElementsByClassName("deleteButton")[0].value;
                if(reviewText && reviewStars){
                    const nextReview = createNewReview2(restaurants.id, parseInt(reviewStars), reviewText, deleteReviewButton);
                    showRestaurantInfo();
                };
            };
            submitForm.addEventListener("click", newestReview);

        });

};

showRestaurantInfo();