//const siteUrl = "https://localhost:44308/api";
const siteUrl = "https://localaddress.dilliramkhatiwada.com.np/api";
document.addEventListener("DOMContentLoaded", function () {

const login=document.getElementById("login");
const logout=document.getElementById("logout");

const goBack=document.getElementById("goBack");


     var accessToken = getAccessToken();
     //console.log(accessToken);
     if (!accessToken) {
        if(login || logout){
        logout.classList.add("hidden");
        login.classList.remove("hidden");
        }
     }else{
        if(login || logout){
        login.classList.add("hidden");
        logout.classList.remove("hidden");

            logout.addEventListener("click", function () {

           
                        console.log("Logged out successfully");
                        removeToken();
                        window.location.reload();   
                   
           
        });
        }
     }

    var nepaliNumberInputs = document.querySelectorAll(".nepaliNumberInput");
    nepaliNumberInputs.forEach(nepaliNumberInput => {

        nepaliNumberInput.addEventListener("input", function (event) {
            var inputValue = event.target.value;
            var validNepaliDigits = /^[०-९]+$/; // Regular expression for Nepali digits

            if (!validNepaliDigits.test(inputValue)) {
                // Remove non-Nepali digit characters
                event.target.value = inputValue.replace(/[^\u0966-\u096F]/g, "");
            }
        });

    });

    var nepaliInputs = document.querySelectorAll(".nepaliInput");
    nepaliInputs.forEach(nepaliInput => {
        nepaliInput.addEventListener("input", function (event) {
            var inputValue = event.target.value;
            var validNepaliCharacters = /^[\u0900-\u097F\s]+$/; // Regular expression for Nepali characters

            if (!validNepaliCharacters.test(inputValue)) {
                // Remove non-Nepali characters
                event.target.value = inputValue.replace(/[^\u0900-\u097F\s]/g, "");
            }
        });
    });

    if(goBack){
goBack.addEventListener("click",function(){
    $.ajax({
        url: `${siteUrl}/account/login`,
        method: "POST",
        data: {
            userName: username,
            password: password
        },
        success: function(data) {
           
    window.history.back();
            // Store tokens in local storage or cookies
            storeAccessToken(data.token);
            storeRefreshToken(data.refreshToken);
            console.log("Logged in successfully");
            window.location.href="index.html";
           // console.log("Access Token:", accessToken);
            
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error("Login failed:", textStatus, errorThrown);
        }
    });
});  }
});
