let formdata = document.querySelectorAll("input[data-key]");
let showoutput = document.querySelector(".output");
let submiButt = document.querySelector(".butt");
let formlist = {
  FirstName: "",
  LastName: "",
  Email: "",
  Password: "",
};

formdata.forEach(input => {
  input.addEventListener("input", (event) => {
    let key = event.target.dataset.key;
    formlist[key] = event.target.value;
    event.target.nextElementSibling.innerText = "";
  });
});

submiButt.addEventListener("click", (event) => {
  event.preventDefault();
  let isvalid = true;

  const nameregx = /^[A-Za-z]+$/;
  const emailregx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  formdata.forEach(input => {
    let key = input.dataset.key;
    let value = input.value.trim();
    let error = input.nextElementSibling;

    if (value === "") {
      error.innerText = `${key} is required`;
      input.style.border = "2px solid red";
      isvalid = false;
    }
    else if ((key === "FirstName" || key === "LastName") && !nameregx.test(value)) {
      error.innerText = `${key} must contain only letters`;
      input.style.border = "2px solid red";
      isvalid = false;
    }
    else if (key === "Email" && !emailregx.test(value)) {
      error.innerText = "Invalid email format";
      input.style.border = "2px solid red";
      isvalid = false;
    }
    else if (key === "Password" && value.length < 6) {
      error.innerText = "Password must be at least 6 characters";
      input.style.border = "2px solid red";
      isvalid = false;
    } else {
      error.innerText = "";
      input.style.border = "2px solid green";
    }
  });

  if (!isvalid) return;


  let userlist = JSON.parse(localStorage.getItem("userList")) || [];
  let existingUser = userlist.find(user => user.Email === formlist.Email);

  if (existingUser) {
    formdata.forEach(input => {
      if (input.dataset.key === "Email") {
        input.nextElementSibling.innerText = "Email already registered";
        input.style.border = "2px solid red";
      }
    });
    return;
  }

  userlist.push({ ...formlist });
  localStorage.setItem("userList", JSON.stringify(userlist));
  localStorage.setItem("currentuser", JSON.stringify(formlist));

  window.location.href = "user.html";
});

