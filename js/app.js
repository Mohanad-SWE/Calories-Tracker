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

    if (remaining <= 0) {
      caloriesRemaining.parentElement.classList.add('bg-danger');
    } else {
      caloriesRemaining.parentElement.classList.remove('bg-danger');
    }
  }

  _displayCalorieProgress() {
    const calorieProgress = document.querySelector('#calorie-progress');
    const percentage = (this._totalCalories / this._caloriesLimit) * 100;
    const width = Math.min(percentage, 100);
    calorieProgress.style.width = `${width}%`;

    if (this._totalCalories >= this._caloriesLimit) {
      calorieProgress.classList.add('bg-danger');
    } else {
      calorieProgress.classList.remove('bg-danger');
    }
  }

  _render() {
    this._displayCaloriesTotal();
    this._displayCaloriesLimit();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCalorieProgress();
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

class App {
  constructor() {
    this._caloriesTracker = new CaloriesTracker();
    this._mealForm = document.querySelector('#meal-form');
    this._workoutForm = document.querySelector('#workout-form');

    this._mealForm.addEventListener('submit', this._newEntry.bind(this, 'meal'));
    this._workoutForm.addEventListener('submit', this._newEntry.bind(this, 'workout'));
  }

  _newEntry(type, event) {
    event.preventDefault();

    const nameSelector = type === 'meal' ? '#meal-name' : '#workout-name';
    const caloriesSelector = type === 'meal' ? '#meal-calories' : '#workout-calories';
    const collapseSelector = type === 'meal' ? '#collapse-meal' : '#collapse-workout';

    const entryName = document.querySelector(nameSelector).value;
    const entryCalories = document.querySelector(caloriesSelector).value;

    if (!entryName || !entryCalories) {
      alert('Please fill in all fields');
      return;
    }

    if (type === 'meal') {
      const meal = new Meal(entryName, +entryCalories);
      this._caloriesTracker.addMeal(meal);
      this._mealForm.reset();
    } else if (type === 'workout') {
      const workout = new Workout(entryName, +entryCalories);
      this._caloriesTracker.addWorkout(workout);
      this._workoutForm.reset();
    }

    const collapseElement = document.querySelector(collapseSelector);
    if (collapseElement.classList.contains('show')) {
      collapseElement.classList.remove('show');
    }
  }
}

new App();