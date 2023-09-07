$(document).ready(function () {
    checkToken();
var accessToken = getAccessToken();
    if (!accessToken) {
        window.location.href = "../login.html"; // Redirect to login if no token
    }
    const provinceId = document.querySelector("#provinceId");
    const provinceNameEn = document.querySelector("#provinceNameEn");
    const provinceNameNp = document.querySelector("#provinceNameNp");
    const noOfDistrictEn = document.querySelector("#noOfDistrictEn");
    const noOfDistrictNp = document.querySelector("#noOfDistrictNp");
    const descriptionEn = document.querySelector("#descriptionEn");
    const descriptionNp = document.querySelector("#descriptionNp");
    const apiUrl=`${siteUrl}/Province`;
    
    var id="";
    const queryString = window.location.search;
    // console.log(queryString);
    const urlParams = new URLSearchParams(queryString);
if(urlParams.has('id')){
    id=urlParams.get('id');
    updateProvince(id);
    document.getElementById("title").textContent="Update province";
    document.getElementById("submit").value="Update";
    document.getElementById("reset").value="cancel";
    document.getElementById("reset").addEventListener("click",function(){
    window.history.back();
    });
}

    function updateProvince(id) {
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
    
//loading form for updating
     function loadForm(data) {
        provinceId.value = data.id;
        provinceNameEn.value = data.provinceNameEn;
        provinceNameNp.value = data.provinceNameNp;
        
        noOfDistrictEn.value = data.noOfDistrictEn;
        noOfDistrictNp.value = data.noOfDistrictNp;
        descriptionEn.value=data.descriptionEn;
        descriptionNp.value=data.descriptionNp;
        
    }


    //post or update 
    
  $("form").submit(function(event) {
    event.preventDefault(); // Prevent form submission
var form=this;
var $provinceId=provinceId.value;
var $provinceNameEn=provinceNameEn.value;
var $provinceNameNp=provinceNameNp.value;

var $noOfDistrictEn =noOfDistrictEn.value;
var $noOfDistrictNp=noOfDistrictNp.value;
var $descriptionEn=descriptionEn.value;
var $descriptionNp = descriptionNp.value;
    var formData = {
        ProvinceNameEn :$provinceNameEn ,
        ProvinceNameNp :$provinceNameNp,
        NoOfDistrictEn:$noOfDistrictEn,
        NoOfDistrictNp:$noOfDistrictNp,
        DescriptionEn:$descriptionEn,
        DescriptionNp:$descriptionNp

};

    var url=apiUrl;
    var method = "POST";

    if (!id.trim()) {
        method = "POST";

    } else {

        url = `${apiUrl}/${$provinceId}`;
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
           
            
            
            if(id!=""){
                alert("Province Updated Successfully");

            }else{
                alert("Province created successfully");
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