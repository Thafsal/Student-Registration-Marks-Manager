document.getElementById("submit").addEventListener("click", function () {
  console.log("clicked");
});


let formData = document
  .getElementById("form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    validateForm();
  });


  // Get form elements inputs
let nameInput = document.getElementById("name");
let ageInput = document.getElementById("age");
let emailInput = document.getElementById("email");
let marksInput = document.getElementById("marks");  

// Get error elements

let nameError = document.getElementById("name-error");
let ageError = document.getElementById("age-error");
let emailError = document.getElementById("email-error");
let marksError = document.getElementById("marks-error");

let tableBody = document.querySelector("#students-body");


//email validator function
function isValidEmail(email) {
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
//form validator function
function validateForm() {
  let name = nameInput.value.trim();
  let age = parseInt(ageInput.value);
  let email = emailInput.value.trim();
  let marks = parseInt(marksInput.value);

  nameError.style.display = "none";
  ageError.style.display = "none";
  emailError.style.display = "none";
  marksError.style.display = "none";

  let isValid = true;

  if (name === "" || name.length < 3 ||  /\d/.test(name)) {
    nameError.style.display = "block";
    nameError.textContent = "Name must be at least 3 characters and no special characters allowed";
    isValid = false;
  }

  if (isNaN(age) || age < 5 || age > 80) {
    ageError.style.display = "block";
    ageError.textContent = "Age must be between 5 and 80";
    isValid = false;
  }

  if (!isValidEmail(email)) {
    emailError.style.display = "block";
    emailError.textContent = "Invalid email format";
    isValid = false;
  }

  if (isNaN(marks) || marks < 0 || marks > 100) {
    marksError.style.display = "block";
    marksError.textContent = "Marks must be between 0 and 100";
    isValid = false;
  }

  if (isValid) {
    addStudent(name, age, email, marks);
    nameInput.value = "";
    ageInput.value = "";
    emailInput.value = "";
    marksInput.value = "";
  }
}

function addStudent(name, age, email, marks) {
  let row = document.createElement("tr");
  if (marks < 40) row.style.backgroundColor = "salmon";

  row.innerHTML = `
    <td>${name}</td>
    <td>${age}</td>
    <td>${email}</td>
    <td>${marks}</td>
    <td><button class="edit">Edit</button></td>
    <td><button class="delete">Delete</button></td>
  `;

  row.querySelector(".delete").addEventListener("click", function () {
    row.remove();
    updateStats();
  });

  row.querySelector(".edit").addEventListener("click", function () {
    nameInput.value = name;
    ageInput.value = age;
    emailInput.value = email;
    marksInput.value = marks;
    row.remove();
    updateStats();
  });

  tableBody.appendChild(row);
  updateStats();
}

function updateStats() {
  let rows = document.querySelectorAll("#students-body tr");
  let totalStudents = rows.length;
  document.getElementById("total-students").textContent = totalStudents;

  let totalMarks = 0;
  rows.forEach((row) => {
    totalMarks += parseInt(row.children[3].textContent);
  });

  let averageMarks =
    totalStudents > 0 ? (totalMarks / totalStudents).toFixed(2) : 0;
  document.getElementById("average-marks").textContent = averageMarks;
}
