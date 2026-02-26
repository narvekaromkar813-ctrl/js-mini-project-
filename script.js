let foods = [];
let nutritionChart;
let dailyChart;


function addFood() {
  let date = document.getElementById("foodDate").value;
  let name = document.getElementById("foodName").value;
  let calories = Number(document.getElementById("calories").value);
  let protein = Number(document.getElementById("protein").value);
  let fat = Number(document.getElementById("fat").value);
  let carbs = Number(document.getElementById("carbs").value);

  if (date === "" || name === "" || calories === 0) {
    alert("Please fill all required fields");
    return;
  }

  let foodItem = {
    date: date,
    name: name,
    calories: calories,
    protein: protein,
    fat: fat,
    carbs: carbs
  };

  foods.push(foodItem); 

  displayTable();
  calculateTotals();
  updateNutritionChart();
  updateDailyCalorieChart();
  clearInputs();
}


function displayTable() {
  let table = document.getElementById("foodTable");
  table.innerHTML = "";

  for (let i = 0; i < foods.length; i++) {
    table.innerHTML += `
      <tr>
        <td>${foods[i].date}</td>
        <td>${foods[i].name}</td>
        <td>${foods[i].calories}</td>
        <td>${foods[i].protein}</td>
        <td>${foods[i].fat}</td>
        <td>${foods[i].carbs}</td>
      </tr>
    `;
  } 
}



function calculateTotals() {
  let cal = 0, pro = 0, fat = 0, carb = 0;

  for (let i = 0; i < foods.length; i++) {
    cal += foods[i].calories;
    pro += foods[i].protein;
    fat += foods[i].fat;
    carb += foods[i].carbs;
  }

  document.getElementById("totalCalories").innerText = cal;
  document.getElementById("totalProtein").innerText = pro;
  document.getElementById("totalFat").innerText = fat;
  document.getElementById("totalCarbs").innerText = carb;
}


function updateNutritionChart() {
  let p = 0, f = 0, c = 0;

  for (let i = 0; i < foods.length; i++) {
    p += foods[i].protein;
    f += foods[i].fat;
    c += foods[i].carbs;
  }

  if (nutritionChart) nutritionChart.destroy();

  nutritionChart = new Chart(document.getElementById("nutritionChart"), {
    type: "bar",
    data: {
      labels: ["Protein", "Fat", "Carbs"],
      datasets: [{
        label: "Macros (g)",
        data: [p, f, c]
      }]
    }
  });
}


function updateDailyCalorieChart() {
  let dates = [];
  let caloriesPerDay = [];

  for (let i = 0; i < foods.length; i++) {
    let index = dates.indexOf(foods[i].date);

    if (index === -1) {
      dates.push(foods[i].date);
      caloriesPerDay.push(foods[i].calories);
    } else{
      caloriesPerDay[index] += foods[i].calories;
    }
  }

  if (dailyChart) dailyChart.destroy();

  dailyChart = new Chart(document.getElementById("dailyCalorieChart"), {
    type: "bar",
    data: {
      labels: dates,
      datasets: [{
        label: "Calories per Day",
        data: caloriesPerDay
      }]
    }
  });
}


function clearInputs() {
  document.getElementById("foodName").value = "";
  document.getElementById("calories").value = "";
  document.getElementById("protein").value = "";
  document.getElementById("fat").value = "";
  document.getElementById("carbs").value = "";
}
