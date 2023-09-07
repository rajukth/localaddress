$(document).ready(function() {
    checkToken();
    if(!isTokenExpired()){
     window.location.href="index.html";
    }
    $("#loginForm").submit(function(event) {
        event.preventDefault();

        var username = $("#username").val();
        var password = $("#password").val();

        $.ajax({
            url: `${siteUrl}/account/login`,
            method: "POST",
            data: {
                userName: username,
                password: password
            },
            success: function(data) {
               
                // Assuming the API returns tokens as data.accessToken and data.refreshToken
                var accessToken = data.token;
                var refreshToken=data.refreshToken;
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
    });
   
});