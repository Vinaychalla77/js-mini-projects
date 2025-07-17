let logindata = document.querySelectorAll("input[data-key]");
let loginbutton = document.querySelector(".loginbutton");

let userdatalogin = {
    UserEmail: "",
    PassEmail: ""
};

// Collect user input
logindata.forEach(input => {
    input.addEventListener("input", (event) => {
        let userkey = event.target.dataset.key;
        userdatalogin[userkey] = event.target.value.trim();
        event.target.nextElementSibling.innerText = "";
        input.style.border = ""; 
    });
});

// On login button click
loginbutton.addEventListener("click", (event) => {
    event.preventDefault();

    let userList = JSON.parse(localStorage.getItem("userList")) || [];

    
    let matchuser = userList.find(
        user => user.Email === userdatalogin.UserEmail && user.Password === userdatalogin.PassEmail
    );

    if (matchuser) {
        localStorage.setItem("currentuser", JSON.stringify(matchuser));
        
        window.location.href = "user.html";
    } else {
        logindata.forEach(input => {
            if (input.dataset.key === "UserEmail" || input.dataset.key === "PassEmail") {
                input.nextElementSibling.innerText = "Invalid email or password";
                input.style.border = "2px solid red";
            }
        });
    }
});

let registerbutton=document.querySelector(".newregisbutt");
 registerbutton.addEventListener("click",(event)=>{
    event.preventDefault();
    window.location.href="newregister.html";
 })
