$(document).ready(function () {
    checkToken();
    var accessToken = getAccessToken();
    if (!accessToken) {
        window.location.href = "../login.html"; // Redirect to login if no token
    }

    var typeId = document.querySelector("#typeId");
    var typeEn = document.querySelector("#typeNameEn");
    var typeNp = document.querySelector("#typeNameNp");
    var apiUrl = `${siteUrl}/LocalLevelType`;
    var id = "";
    const queryString = window.location.search;
    //console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has('id')) {
        id = urlParams.get('id');
        updateType(id);
        document.getElementById("title").textContent = "Update Local Level Type";
        document.getElementById("submit").value = "Update";
        document.getElementById("reset").value = "cancel";
        document.getElementById("reset").addEventListener("click", function () {
            window.history.back();
        });
    }


    function updateType(id) {
        // console.log(id);
        $.ajax({
            url: apiUrl + `/${id}`, // Replace with your API URL
            method: "GET",
            dataType: "json",
            headers: {
                "Authorization": "Bearer " + accessToken // Set the Authorization header with the token
              },
            success: function (data) {
                // Handle the data received from the API
                //console.log(data);
                loadForm(data);
            },
            error: function (error) {
                console.log("Error fetching data:", error);
            }
        });

    }


    function loadForm(data) {
        typeEn.value = data.typeNameEn;
        typeNp.value = data.typeNameNp;
        typeId.value = data.id;
    }

    $("form").submit(function (event) {
        event.preventDefault(); // Prevent form submission
        //var form= this;
        var id = typeId.value;
        var typeNameEn = typeEn.value;
        var typeNameNp = typeNp.value;
        var formData = {
            TypeNameEn: typeNameEn,
            TypeNameNp: typeNameNp
        };

        var url = apiUrl;
        var method = "POST";

        if (!id.trim()) {
            method = "POST";

        } else {

            url = apiUrl + `/${id}`;
            var method = "PUT";
        }

        $.ajax({
            url: url, // Replace with your API URL
            data: formData,
            method: method,
            dataType: "json",
            headers: {
                "Authorization": "Bearer " + accessToken // Set the Authorization header with the token
              },
            success: function (data) {
                // Handle the data received from the API

                $("form").trigger("reset");



                if (id != "") {
                    alert("Local Level Updated Successfully");
                   

                } else {
                    alert("Local Level Created Successfully");
                }
                window.history.back();
            },
            error: function (error) {
                alert("Error : check console for detail");
                console.log("Error :", error);
            }
        });
    });
});