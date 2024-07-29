class CaloriesTracker {
  constructor() {
    this._caloriesLimit = 2000;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];
    this._render();
  }

  // Public Methods
  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    this._render();
  }

  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    this._render();
  }

  setCaloriesLimit(limit) {
    this._caloriesLimit = limit;
    this._render();
  }

  _render() {
    this._displayCaloriesTotal();
    this._displayCaloriesLimit();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
  }

  // Private Methods
  _displayCaloriesTotal() {
    const totalCalories = document.querySelector('#calories-total');
    totalCalories.textContent = `${this._totalCalories}`;
  }

  _displayCaloriesLimit() {
    const caloriesLimit = document.querySelector('#calories-limit');
    caloriesLimit.textContent = `${this._caloriesLimit}`;
  }

  _displayCaloriesConsumed() {
    const caloriesConsumed = document.querySelector('#calories-consumed');
    let totalConsumed = this._meals.reduce((sum, meal) => sum + meal.calories, 0);
    caloriesConsumed.textContent = `${totalConsumed}`;
  }

  _displayCaloriesBurned() {
    const caloriesBurned = document.querySelector('#calories-burned');
    let totalBurned = this._workouts.reduce((sum, workout) => sum + workout.calories, 0);
    caloriesBurned.textContent = `${totalBurned}`;
  }

  _displayCaloriesRemaining() {
    const caloriesRemaining = document.querySelector('#calories-remaining');
    const remaining = this._caloriesLimit - this._totalCalories;
    caloriesRemaining.textContent = `${remaining}`;
  }
}

class Meal {
  constructor(name, calories) {
    this.id = (Math.random() + 1).toString(36).substring(7);
    this.name = name;
    this.calories = calories;
  }
}

class Workout {
  constructor(name, calories) {
    this.id = (Math.random() + 1).toString(36).substring(7);
    this.name = name;
    this.calories = calories;
  }
}

// Example Usage
const tracker = new CaloriesTracker();

const breakfast = new Meal('Breakfast', 500);
const lunch = new Meal('Lunch', 600);
const dinner = new Meal('Dinner', 700);
const snacks = new Meal('Snacks', 2300);

tracker.addMeal(breakfast);
tracker.addMeal(lunch);
tracker.addMeal(dinner);
tracker.addMeal(snacks);

const running = new Workout('Running', 2000);
tracker.addWorkout(running);

console.log(tracker);
