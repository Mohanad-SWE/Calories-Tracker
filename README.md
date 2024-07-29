# Calories Tracker

Calories Tracker is a JavaScript application designed to help you manage your daily calorie intake and expenditure. This app allows you to add meals and workouts, set a daily calorie limit, and monitor your progress in real-time. Data is persisted using local storage, ensuring your information is saved even after refreshing the page.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Add and Remove Meals**: Log meals with their calorie content.
- **Add and Remove Workouts**: Log workouts with calories burned.
- **Set Calorie Limit**: Define a daily calorie limit to manage your intake.
- **Real-Time Tracking**: View total calories consumed, burned, and remaining.
- **Filter Entries**: Easily search and filter through your logged meals and workouts.
- **Data Persistence**: Uses local storage to save data across sessions.

## Installation

To run the Calories Tracker locally, follow these steps:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/Mohanad-SWE/calories-tracker.git
   ```

2. **Navigate to the project directory:**

   ```sh
   cd calories-tracker
   ```

3. **Open the `index.html` file in your web browser:**
   ```sh
   open index.html
   ```
   Alternatively, you can open `index.html` directly by double-clicking it.

## Usage

1. **Adding a Meal:**

   - Fill in the meal name and calories in the form.
   - Click "Add Meal" to log the meal.
   - The meal will appear in the meal list, and the total calories will update accordingly.

2. **Adding a Workout:**

   - Fill in the workout name and calories burned in the form.
   - Click "Add Workout" to log the workout.
   - The workout will appear in the workout list, and the total calories will update accordingly.

3. **Setting a Calorie Limit:**

   - Click on "Set Limit" and enter your desired daily calorie limit.
   - The limit will be updated, and progress will be tracked against it.

4. **Removing Entries:**

   - Click the delete button next to a meal or workout to remove it from the list.

5. **Filtering Entries:**

   - Use the filter input boxes to search through your meals and workouts.

6. **Resetting Data:**
   - Click the "Reset" button to clear all logged meals, workouts, and reset the calorie count.

## Contributing

Contributions are welcome! If you have suggestions for improvements or want to report issues, please create a pull request or open an issue on GitHub.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
