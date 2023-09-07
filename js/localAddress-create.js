$(document).ready(function () {
    checkToken();
    var accessToken = getAccessToken();
    if (!accessToken) {
        window.location.href = "../login.html"; // Redirect to login if no token
    }
    const province = document.querySelector("#province");
    const district = document.querySelector("#district");
    const localLevelType = document.querySelector("#localLevelType");
    const localNameEn=document.querySelector("#localNameEn");
    const localId=document.querySelector("#localId");
    
    const localNameNp=document.querySelector("#localNameNp");
    const noOfWardsEn=document.querySelector("#noOfWardsEn");
    const noOfWardsNp=document.querySelector("#noOfWardsNp");
    const descriptionEn=document.querySelector("#descriptionEn");
    const descriptionNp=document.querySelector("#descriptionNp");

    var apiUrl=`${siteUrl}/LocalAddresses`;
    getProvince();
    getLocalLevelType();

    var id="";
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
if(urlParams.has('id')){
    id=urlParams.get('id');
    updateLocalAddress(id);
    document.getElementById("title").textContent="Update province";
    document.getElementById("submit").value="Update";
    document.getElementById("reset").value="cancel";
    document.getElementById("reset").addEventListener("click",function(){
window.history.back();
    });
}

   // fetchAPI();
function getProvince(){
    $.ajax({
        url: `${siteUrl}/Province/search?isDelete=false`, // Replace with your API URL
        method: "GET",
        dataType: "json",
        
        headers: {
            "Authorization": "Bearer " + accessToken // Set the Authorization header with the token
          },
        success: function (data) {
            // Handle the data received from the API
            
data.forEach(function(pro){
   
    var option=`<option value="${pro.id}">${pro.provinceNameEn}-${pro.provinceNameNp}</option>`;
    $("#province").append(option);
});

        },
        error: function (error) {
            console.log("Error fetching data:", error);
        }
    });
}
//changing province select get district related to province
province.addEventListener("change", function() {
    var selectedValue = province.value; // Get the selected option value
    //console.log("Selected value:", selectedValue);
    getDistrict(selectedValue);
});

//to get district after selecting province 

async function getDistrict(id){
    await $.ajax({
        url: `${siteUrl}/District/search?provinceId=${id}&&isDelete=false`, // Replace with your API URL
        method: "GET",
        dataType: "json",
        
        headers: {
            "Authorization": "Bearer " + accessToken // Set the Authorization header with the token
          },
        success: function (data) {
            //console.log(data);
            // Handle the data received from the API
            $("#district").empty();
            var optionSelect=`<option value="">*** select district ***</option>`;
            $("#district").append(optionSelect);

data.forEach(function(pro){
   
    var option=`<option value="${pro.id}">${pro.districtNameEn}-${pro.districtNameNp}</option>`;
    $("#district").append(option);
});

        },
        error: function (error) {
            console.log("Error fetching data:", error);
        }
    });
}

//to get local level type 
function getLocalLevelType(){
    $.ajax({
        url: `${siteUrl}/LocalLevelType/search?isDelete=false`, // Replace with your API URL
        method: "GET",
        dataType: "json",
        
        headers: {
            "Authorization": "Bearer " + accessToken // Set the Authorization header with the token
          },
        success: function (data) {
            // Handle the data received from the API
            
data.forEach(function(pro){
   
    var option=`<option value="${pro.id}">${pro.typeNameEn}-${pro.typeNameNp}</option>`;
    $("#localLevelType").append(option);
   
});

        },
        error: function (error) {
            console.log("Error fetching data:", error);
        }
    });
}


function updateLocalAddress(id) {
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
    
    localId.value=data.id;
    province.value = data.district.provinceId;
    getDistrict(data.district.provinceId).then(result=>{
        //console.log(data.districtId);
    district.value = data.districtId;
    });

    localLevelType.value=data.localLevelTypeId;
    localNameEn.value = data.localNameEn;
    localNameNp.value=data.localNameNp;    
    noOfWardsEn.value = data.noOfWardsEn;
    noOfWardsNp.value = data.noOfWardsNp;
    descriptionEn.value=data.descriptionEn;
    descriptionNp.value=data.descriptionNp;
    
}

//post or update 
    
$("form").submit(function(event) {
    event.preventDefault(); // Prevent form submission
var form=this;
var id=localId.value;
var $provinceId=province.value;
var $districtId=district.value;
var $localLevelTypeId=localLevelType.value;
var $localNameEn=localNameEn.value;

var $localNameNp =localNameNp.value;
var $noOfWardsEn=noOfWardsEn.value;
var $noOfWardsNp=noOfWardsNp.value;
var $descriptionEn = descriptionEn.value;
var $descriptionNp = descriptionNp.value;
    var formData = {
        // ProvinceId:$provinceid,
        DistrictId:$districtId,
        LocalNameEn:$localNameEn,
        LocalNameNp:$localNameNp,
        LocalLevelTypeId:$localLevelTypeId,
        NoOfWardsEn:$noOfWardsEn,
        NoOfWardsNp:$noOfWardsNp,
        DescriptionEn:$descriptionEn,
        DescriptionNp:$descriptionNp
};

    var url=apiUrl;
    var method = "POST";

    if (!id.trim()) {
        method = "POST";

    } else {

        url = `${apiUrl}/${id}`;
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
            // Handle the data received from the API
           
            if(id!=""){
                alert("Local Address Updated Successfully");

            }else{
                alert("Local Address created successfully");
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