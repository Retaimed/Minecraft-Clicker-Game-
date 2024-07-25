console.log("running")

// Variables
let score = 0
let total_score = 0


// let auto_clicker_speed = 1000 // in milliseconds
// let auto_clicker_multiplier = 1
// let clicker_multiplier = 1
// let clicker_multiplier_modifier = 10 //changes how much the clicker multiplier upgrades based on the level of the multiplier
// let game_level = 1

// // Parameter Variables
// let auto_clicker_unlock = false
// let auto_clicker_cost = 1000
// let clicker_multiplier_cost = 100
// let auto_clicker_speed_cost = 100
// let auto_clicker_multiplier_cost = 1000
let user_data = {
  score: 0,
  total_score: 0,
}

let auto_clicker = {
  unlock: false,
  cost: 1000,
  speed: 1000, // in milliseconds
  speed_cost: 100,
  multiplier: 1,
  multiplier_cost: 1000
}

let clicker = {
  multiplier: 1,
  multiplier_modifier: 10,
  multiplier_cost: 10
}

// check for local storage key values
// if there is a save in local storage copy over to local variables
if (localStorage.getItem("User_Data") != null) {
  user_data = JSON.parse(localStorage.getItem("User_Data"))
  clicker = JSON.parse(localStorage.getItem("Clicker"))
  auto_clicker = JSON.parse(localStorage.getItem("Auto_Clicker"))
}

// test for local storage
// let clicker_serialized = JSON.stringify(clicker);
// console.log(clicker_serialized)
// localStorage.setItem("test", clicker_serialized)
// console.log(localStorage)

// let clicker_deserialized = JSON.parse(localStorage.getItem("test"));
// console.log(clicker_deserialized)

const clicker_card = document.querySelector(".clicker")
// console.log(clicker_card)
const score_counter = document.querySelector(".score")
const scoreboard = document.querySelector("#scoreboard")

console.log(score_counter)
console.log(scoreboard)

scoreboard.innerHTML = "Current Score: <br>"+user_data.score + "<br> Total Score: <br>" + user_data.total_score



// Document Query Selectors to display the initial costs of upgrades
const button_multiplier_card = document.querySelector(".card4")
const auto_clicker_unlock_card = document.querySelector(".card1")
const auto_clicker_speed_card = document.querySelector(".card2")
const auto_clicker_multiplier_card = document.querySelector(".card3")

const auto_clicker_unlock_card_price = document.querySelector(".A")
const auto_clicker_speed_price = document.querySelector(".B")
const auto_clicker_multiplier_price = document.querySelector(".C")
const button_multiplier_card_price = document.querySelector(".D")

// // Inner HMTL lines to display the initial costs and stats of the upgrades
auto_clicker_unlock_card_price.innerHTML = "Price: "+ auto_clicker.cost
auto_clicker_speed_price.innerHTML = "Price: "+ auto_clicker.speed_cost
auto_clicker_multiplier_price.innerHTML = "Price: "+ auto_clicker.multiplier_cost
button_multiplier_card_price.innerHTML = "Price: "+ clicker.multiplier_cost

// Actual button user is supposed to click
clicker_card.addEventListener("click", (e) => {
  user_data.score = user_data.score + 1 * clicker.multiplier
  user_data.total_score = user_data.total_score + 1 * clicker.multiplier
  score_counter.innerHTML = user_data.score;
  scoreboard.innerHTML = "Current Score: <br>"+user_data.score + "<br> Total Score: <br>" + user_data.total_score;
})

// auto clicker function (multiple clickers)
async function autoclicker() {
  if (auto_clicker.unlock) {
    user_data.score = user_data.score + 1 * auto_clicker.multiplier
    user_data.total_score = user_data.total_score + 1 * auto_clicker.multiplier
    score_counter.innerHTML = user_data.score;
    scoreboard.innerHTML = "Current Score: <br>"+user_data.score + "<br> Total Score: <br>" + user_data.total_score
  }
}
setInterval(autoclicker, auto_clicker.speed)

// Button Multiplier Event Listener (is there a way to dynamically change the value of parameters?)
button_multiplier_card.addEventListener("click", (e) => {
  if (user_data.score >= clicker.multiplier_cost) {
    user_data.score = user_data.score - clicker.multiplier_cost
    clicker.multiplier = clicker.multiplier + 1 * clicker.multiplier_modifier
    clicker.multiplier_modifier = clicker.multiplier_modifier + 5 // changes the multiplier modifier
    clicker.multiplier_cost = clicker.multiplier_cost ** 2 // updates the cost of the clicker
    score_counter.innerHTML = user_data.score;
    scoreboard.innerHTML = "Current Score: <br>"+user_data.score + "<br> Total Score: <br>" + user_data.total_score
    button_multiplier_card_price.innerHTML = "Price: "+ clicker.multiplier_cost + "<br> Multiplier: "+clicker.multiplier;
    }
})

// Auto clicker Unlock
auto_clicker_unlock_card.addEventListener("click", (e) => {
  if (user_data.score >= auto_clicker.cost && auto_clicker.unlock != true) {
    user_data.score = user_data.score - auto_clicker.cost;
    auto_clicker.unlock = true
    score_counter.innerHTML = user_data.score;
    scoreboard.innerHTML = "Current Score: <br>"+user_data.score + "<br> Total Score: <br>" + user_data.total_score
    auto_clicker_unlock_card_price.innerHTML = "Unlocked";
  }
})

// Auto clicker Speed
auto_clicker_speed_card.addEventListener("click", (e) => {
  if (user_data.score >= auto_clicker.speed_cost && auto_clicker.speed > 500 && auto_clicker.unlock == true) {
    user_data.score = user_data.score - auto_clicker.speed_cost;
    auto_clicker.speed = auto_clicker.speed - 100
    auto_clicker.speed_cost = auto_clicker.speed_cost * 2
    score_counter.innerHTML = user_data.score;
    scoreboard.innerHTML = "Current Score: <br>"+user_data.score + "<br> Total Score: <br>" + user_data.total_score
    auto_clicker_speed_price.innerHTML = "Price: "+ auto_clicker.speed_cost + "<br> Speed: "+auto_clicker.speed+" milliseconds";
    setInterval(autoclicker, auto_clicker.speed)
  }
  if (auto_clicker.speed == 500) {
    auto_clicker_speed_price.innerHTML = "Maxed" + "<br> Speed: "+auto_clicker.speed+" milliseconds";
  }
})

// Auto Clicker Multiplier
auto_clicker_multiplier_card.addEventListener("click", (e) => {
  if (user_data.score >= auto_clicker.multiplier_cost) {
    user_data.score = user_data.score - auto_clicker.multiplier_cost;
    auto_clicker.multiplier_cost = auto_clicker.multiplier_cost * 2
    auto_clicker.multiplier = auto_clicker.multiplier * 10
    score_counter.innerHTML = user_data.score;
    scoreboard.innerHTML = "Current Score: <br>"+user_data.score + "<br> Total Score: <br>" + user_data.total_score
    auto_clicker_multiplier_price.innerHTML = "Price: "+ auto_clicker.multiplier_cost + "<br> Multiplier: "+auto_clicker.multiplier;
  }
})

// Save Function
const save_button = document.querySelector(".save")
save_button.addEventListener("click", (e) => {
  let user_data_serialized = JSON.stringify(user_data)
  let clicker_serialized = JSON.stringify(clicker);
  let auto_clicker_serialized = JSON.stringify(auto_clicker);
  localStorage.setItem("User_Data", user_data_serialized)
  localStorage.setItem("Clicker", clicker_serialized)
  localStorage.setItem("Auto_Clicker", auto_clicker_serialized)
})

// Clear Button
const clear_button = document.querySelector(".clear")
clear_button.addEventListener("click", (e) => {
  user_data = {
  score: 0,
  total_score: 0,
  }

  auto_clicker = {
    unlock: false,
    cost: 1000,
    speed: 1000, // in milliseconds
    speed_cost: 100,
    multiplier: 1,
    multiplier_cost: 1000
  }

  clicker = {
    multiplier: 1,
    multiplier_modifier: 10,
    multiplier_cost: 10
  }
  user_data_serialized = JSON.stringify(user_data)
  clicker_serialized = JSON.stringify(clicker);
  auto_clicker_serialized = JSON.stringify(auto_clicker);
  localStorage.setItem("User_Data", user_data_serialized)
  localStorage.setItem("Clicker", clicker_serialized)
  localStorage.setItem("Auto_Clicker", auto_clicker_serialized)
})