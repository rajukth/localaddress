// // // main.js
function checkToken(){
//    console.log(window.localStorage.getItem("refreshToken"));
    if(isTokenExpired()){
handleTokenExpiration();

    }
}


// Check if the token is expired
function isTokenExpired() {
    const accessToken = getAccessToken(); // Retrieve the token from storage
    if (!accessToken) {
        return true; // No token available
    }
    var token=decodeJwt(accessToken);
    const expiration = token.exp; // Replace with the actual token expiration property
    const currentTime = Math.floor(Date.now() / 1000);
    return expiration < currentTime;
}
// Function to decode a JWT token
function decodeJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
}


// Handle token expiration
function handleTokenExpiration() {
    //alert("Your session has expired. Please log in again.");
    window.localStorage.removeItem("accessToken");
    //window.location.href = "/login.html"; // Redirect to the login page
}



// // Perform AJAX requests with token checking
// $(document).ajaxSend(function (event, jqxhr, settings) {
//     if (isTokenExpired()) {
//         // console.log("handaling ");
//          handleTokenExpiration();
//         //refreshToken(); // Attempt to refresh the token
//         jqxhr.abort(); // Cancel the current request
//     }else{
//         console.log("also havetoken");
//     }

// });
// // Function to refresh the token
function refreshToken() {
    $.ajax({
        url: `${siteUrl}/account/refresh`, // Replace with your token refresh endpoint
        type: 'POST',
        data: { token:getAccessToken(),refreshToken:getRefreshToken() }, // Pass the refresh token
        success: function (data) {
            if (data.token) {
                // Update the stored token with the new one
                storeAccessToken(data.token);
                storeRefreshToken(data.refreshToken);
            } else {
                // Handle the case where token refresh failed
                handleTokenExpiration();
            }
        },
        error: function (error) {
            // Handle errors, e.g., network issues or server errors
            console.error('Token refresh failed:', error);
            handleTokenExpiration();
        }
    });
}

// Function to get the access token
function getAccessToken(){
    var accessToken = localStorage.getItem("accessToken");
    return accessToken;
}
// Function to store the access token
function storeAccessToken(token) {
    localStorage.setItem('accessToken', token);
}

// // Function to store the refresh token
function storeRefreshToken(refreshToken) {
    localStorage.setItem('refreshToken', refreshToken);
}

// // Function to get the refresh token
function getRefreshToken() {
    return localStorage.getItem('refreshToken');
}
function removeToken(){
     localStorage.removeItem("accessToken");
     localStorage.removeItem("refreshToken");
}
