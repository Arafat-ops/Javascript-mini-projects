getMealRandomly()
fetchFavMeals()

async function getMealRandomly() {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    const meal = await resp.json()
    const randomMeals = meal.meals[0]
    showRandomMeals(randomMeals, true)
    // console.log(meal.meals[0],true);
}
async function getMealById(id) {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id)
    const respData = await resp.json()
    const meal = respData.meals[0]
    // console.log(meal);
    return meal
}

async function getMealBySearch() {

}

function showRandomMeals(mealData, random = false) {
    const main = document.querySelector("#meals")
    main.innerHTML =
        `
    <div class="main-view">
    ${random?`<span class="random">Random Recipe</span>`:""}  
                    <img src="${mealData.strMealThumb}"
                        alt="${mealData.strMeal}" class="image">
                    <div class="footer">
                        <span class="meal-name">${mealData.strMeal}</span>
                        <button id="favorite" title="favorite" class="favorite"><i
                                class="fa fa-heart change"></i></button>
                    </div>
                   
                </div>
    `
    // console.log(mealData);

    // 2nd part start
    let btn = main.querySelector("#favorite .change")
    btn.addEventListener("click", () => {
        if (btn.classList.contains("active")) {
            removeMealLs(mealData.idMeal)
            btn.classList.remove("active")
        } else {
            addMealLs(mealData.idMeal)
            btn.classList.add("active")
        }
    })
}

function addMealLs(mealId) {
    const mealIds = getMealLs()
    localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]))
}

function removeMealLs(mealId) {
    const mealIds = getMealLs()
    localStorage.setItem("mealIds",
        JSON.stringify(mealIds.filter(id => id !== mealId))) //if not equal then it will go in array back

}

function getMealLs() {
    const mealIds = JSON.parse(localStorage.getItem("MealIds"))
    return mealIds == null ? [] : mealIds;
}

// 2nd part end

// 3rd part start


async function fetchFavMeals() {
    const mealIds = getMealLs()
    // const meals = []
    let meal = ""
    for (let i = 0; i < mealIds.length; i++) {
        const mealId = mealIds[i]
        meal = meals.push(await getMealById(mealId))
        addMealFav(meal)

    }
    // console.log(meals);
}

function addMealFav(mealData) {
    let favMeal = document.querySelector("#fav-items")
    favMeal.innerHTML = `
                    <div class="list-of-fav">
                        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}"
                            class="img">
                        <span class="meal-name">${mealData.strMeal}</span>
                    </div>
                    <div class="list-of-fav">
    
    `
}