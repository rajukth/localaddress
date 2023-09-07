$(document).ready(function () { 
    checkToken();
    var accessToken = getAccessToken();
    if (!accessToken) {
        window.location.href = "../login.html"; // Redirect to login if no token
    }
    const province = document.querySelector("#province");
    const districtId = document.querySelector("#districtId");
    const districtNameEn = document.querySelector("#districtNameEn");

    const districtNameNp = document.querySelector("#districtNameNp");
    const noOfLocalLevelEn = document.querySelector("#noOfLocalLevelEn");
    const noOfLocalLevelNp = document.querySelector("#noOfLocalLevelNp");
    const descriptionEn = document.querySelector("#descriptionEn");
    const descriptionNp = document.querySelector("#descriptionNp");
    var id="";
    var apiUrl = `${siteUrl}/District`;
    getProvince();

    const queryString = window.location.search;
    //console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has('id')) {
        id = urlParams.get('id');
        updateDistrict(id);
        document.getElementById("title").textContent = "Update province";
        document.getElementById("submit").value = "Update";
        document.getElementById("reset").value = "cancel";
        document.getElementById("reset").addEventListener("click", function () {
            window.history.back();
        });
    }

        function getProvince() {
            $.ajax({
                url: `${siteUrl}/Province`, // Replace with your API URL
                method: "GET",
                dataType: "json",
                success: function (data) {
                    // Handle the data received from the API

                    data.forEach(function (pro) {

                        var option = `<option value="${pro.id}">${pro.provinceNameEn}-${pro.provinceNameNp}</option>`;
                        $("#province").append(option);
                    });

                },
                error: function (error) {
                    console.log("Error fetching data:", error);
                }
            });
        }

        
        function updateDistrict(id) {
            // console.log(id);
            $.ajax({
                url: `${apiUrl}/${id}`, // Replace with your API URL
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
       
        //post or update 

        $("form").submit(function (event) {
            event.preventDefault(); // Prevent form submission
            var form = this;
            var $districtId = districtId.value;
            var $provinceid = province.value;
            var $districtNameEn = districtNameEn.value;

            var $districtNameNp = districtNameNp.value;
            var $noOfLocalLevelEn = noOfLocalLevelEn.value;
            var $noOfLocalLevelNp = noOfLocalLevelNp.value;
            var $descriptionEn = descriptionEn.value;
            var $descriptionNp = descriptionNp.value;
            var formData = {
                ProvinceId: $provinceid,
                DistrictNameEn: $districtNameEn,
                DistrictNameNp: $districtNameNp,
                NoOfLocalLevelEn: $noOfLocalLevelEn,
                NoOfLocalLevelNp: $noOfLocalLevelNp,
                DescriptionEn: $descriptionEn,
                DescriptionNp: $descriptionNp
            };

            var url = apiUrl;
            var method = "POST";

            if (!id.trim()) {
                method = "POST";

            } else {

                url = `${apiUrl}/${$districtId}`;
                var method = "PUT";
            }
            $.ajax({
                url: url, // Replace with your API URL
                data: formData,
                method: method,
                dataType: "text",
                headers: {
                    "Authorization": "Bearer " + accessToken // Set the Authorization header with the token
                  },
                success: function (data) {
                    if(id!=""){
                        alert("District Updated Successfully");
                    }else{
                        alert("District created successfully");
                    }
                    window.history.back();
                },
                error: function (error) {
                    alert("Error : check console for detail");
                    console.log("Error :", error);
                }
            });
        });
        //loading form for updating
        function loadForm(data) {
            districtId.value = data.id;
            province.value = data.provinceId;
            districtNameEn.value = data.districtNameEn;
            districtNameNp.value = data.districtNameNp;
            noOfLocalLevelEn.value = data.noOfLocalLevelEn;
            noOfLocalLevelNp.value = data.noOfLocalLevelNp;
            descriptionEn.value = data.descriptionEn;
            descriptionNp.value = data.descriptionNp;

        }
    });