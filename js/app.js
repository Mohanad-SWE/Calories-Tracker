class CaloriesTracker {
  constructor() {
    this._caloriesLimit = this._getValidNumber(localStorage.getItem('caloriesLimit'), 2000);
    this._totalCalories = this._getValidNumber(localStorage.getItem('totalCalories'), 0);
    this._meals = JSON.parse(localStorage.getItem('meals')) || [];
    this._workouts = JSON.parse(localStorage.getItem('workouts')) || [];
    this._render();
  }

  // Public Methods
  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    this._saveData();
    this._displayNewMeal(meal);
    this._render();
  }

  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    this._saveData();
    this._displayNewWorkout(workout);
    this._render();
  }

  removeMeal(id) {
    const index = this._meals.findIndex((meal) => meal.id === id);
    if (index === -1) return; // Meal not found
    const meal = this._meals.splice(index, 1)[0];
    this._totalCalories -= meal.calories;
    this._saveData();
    this._render();
  }

  removeWorkout(id) {
    const index = this._workouts.findIndex((workout) => workout.id === id);
    if (index === -1) return; // Workout not found
    const workout = this._workouts.splice(index, 1)[0];
    this._totalCalories += workout.calories;
    this._saveData();
    this._render();
  }

  setLimit(calorieLimit) {
    if (isNaN(calorieLimit) || calorieLimit <= 0) {
      alert('Please enter a valid number for the calorie limit');
      return;
    }
    this._caloriesLimit = calorieLimit;
    this._saveData();
    this._displayCaloriesLimit();
    this._render();
  }

  // Private Methods
  _getValidNumber(value, defaultValue) {
    const number = parseInt(value, 10);
    return isNaN(number) ? defaultValue : number;
  }

  _saveData() {
    localStorage.setItem('caloriesLimit', this._caloriesLimit);
    localStorage.setItem('totalCalories', this._totalCalories);
    localStorage.setItem('meals', JSON.stringify(this._meals));
    localStorage.setItem('workouts', JSON.stringify(this._workouts));
  }

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
    const totalConsumed = this._meals.reduce((sum, meal) => sum + meal.calories, 0);
    caloriesConsumed.textContent = `${totalConsumed}`;
  }

  _displayCaloriesBurned() {
    const caloriesBurned = document.querySelector('#calories-burned');
    const totalBurned = this._workouts.reduce((sum, workout) => sum + workout.calories, 0);
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

  _displayNewMeal(meal) {
    const mealItems = document.querySelector('#meal-items');
    const newMeal = document.createElement('div');
    newMeal.classList.add('card', 'my-2');
    newMeal.setAttribute('data-id', meal.id);

    newMeal.innerHTML = `
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <h4 class="mx-1"> ${meal.name} </h4>
          <div class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5">
            ${meal.calories}
          </div>
          <button class="delete btn btn-danger btn-sm mx-2">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    `;
    mealItems.appendChild(newMeal);
  }

  _displayNewWorkout(workout) {
    const workoutItems = document.querySelector('#workout-items');
    const newWorkout = document.createElement('div');
    newWorkout.classList.add('card', 'my-2');
    newWorkout.setAttribute('data-id', workout.id);

    newWorkout.innerHTML = `
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <h4 class="mx-1"> ${workout.name} </h4>
          <div class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5">
            ${workout.calories}
          </div>
          <button class="delete btn btn-danger btn-sm mx-2">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    `;
    workoutItems.appendChild(newWorkout);
  }

  reset() {
    this._meals = [];
    this._workouts = [];
    this._totalCalories = 0;
    this._saveData();
    this._render();
  }

  _render() {
    this._displayCaloriesTotal();
    this._displayCaloriesLimit();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCalorieProgress();

    // Display existing meals and workouts from localStorage
    document.getElementById('meal-items').innerHTML = '';
    document.getElementById('workout-items').innerHTML = '';
    this._meals.forEach(meal => this._displayNewMeal(meal));
    this._workouts.forEach(workout => this._displayNewWorkout(workout));
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

    document.getElementById('meal-items')
      .addEventListener('click', this._removeItems.bind(this, 'meal'));

    document.getElementById('workout-items')
      .addEventListener('click', this._removeItems.bind(this, 'workout'));

    document.getElementById('filter-meals')
      .addEventListener('keyup', this._filterItems.bind(this, 'meal'));

    document.getElementById('filter-workouts')
      .addEventListener('keyup', this._filterItems.bind(this, 'workout'));

    document.getElementById('reset')
      .addEventListener('click', this._reset.bind(this));

    document.getElementById('limit-form')
      .addEventListener('submit', this._setLimit.bind(this));
  }

  _newEntry(type, event) {
    event.preventDefault();

    const nameSelector = type === 'meal' ? '#meal-name' : '#workout-name';
    const caloriesSelector = type === 'meal' ? '#meal-calories' : '#workout-calories';
    const collapseSelector = type === 'meal' ? '#collapse-meal' : '#collapse-workout';

    const entryName = document.querySelector(nameSelector).value;
    const entryCalories = parseInt(document.querySelector(caloriesSelector).value);

    if (!entryName || isNaN(entryCalories) || entryCalories <= 0) {
      alert('Please fill in all fields with valid data');
      return;
    }

    if (type === 'meal') {
      const meal = new Meal(entryName, entryCalories);
      this._caloriesTracker.addMeal(meal);
      this._mealForm.reset();
    } else if (type === 'workout') {
      const workout = new Workout(entryName, entryCalories);
      this._caloriesTracker.addWorkout(workout);
      this._workoutForm.reset();
    }

    const collapseElement = document.querySelector(collapseSelector);
    if (collapseElement.classList.contains('show')) {
      collapseElement.classList.remove('show');
    }
  }

  _removeItems(type, event) {
    if (event.target.classList.contains('delete') || event.target.classList.contains('fa-xmark')) {
      if (confirm('Are you sure you want to delete this item?')) {
        const id = event.target.closest('.card').getAttribute('data-id');

        if (type === 'meal') {
          this._caloriesTracker.removeMeal(id);
        } else if (type === 'workout') {
          this._caloriesTracker.removeWorkout(id);
        }

        event.target.closest('.card').remove();
      }
    }
  }

  _filterItems(type, event) {
    const filter = event.target.value.toLowerCase();
    const items = document.querySelectorAll(`#${type}-items .card`);

    items.forEach(item => {
      const itemName = item.querySelector('h4').textContent.toLowerCase();
      item.style.display = itemName.includes(filter) ? 'block' : 'none';
    });
  }

  _reset() {
    this._caloriesTracker.reset();
    document.getElementById('meal-items').innerHTML = '';
    document.getElementById('workout-items').innerHTML = '';
    document.getElementById('filter-meals').value = '';
    document.getElementById('filter-workouts').value = '';
  }

  _setLimit(event) {
    event.preventDefault();
    const limitInput = document.querySelector('#limit');
    const limitValue = parseInt(limitInput.value);

    if (isNaN(limitValue) || limitValue <= 0) {
      alert('Please enter a valid number for the calorie limit');
      return;
    }

    this._caloriesTracker.setLimit(limitValue);
    limitInput.value = '';

    const modalEl = document.querySelector('#limit-modal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();

    document.querySelector('#limit-form').reset();
  }
}

new App();
