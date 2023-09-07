$(document).ready(function () {
    checkToken();
    var accessToken = getAccessToken();
    //if we dont have access token we can remove action buttons and add new btn from index 
    if (!accessToken) {
        document.getElementById("addNew").classList.add("hidden");
    } else {
        let table = document.querySelector('#myDataTable');
        let firstRow = table.querySelector('tr');



        if (firstRow) {
            let th = document.createElement('th');
            th.setAttribute('rowspan', '2'); // Add rowspan="2"
            th.style.textAlign = 'center';
            let title = document.createTextNode('Action'); // Replace with your desired title
            th.appendChild(title);
            firstRow.appendChild(th);
        }
    }


    var apiUrl = `${siteUrl}/district`;
    getProvince();

    fetchAPI();
    function getProvince() {
        $.ajax({
            url: `${siteUrl}/Province`, // Replace with your API URL
            method: "GET",
            dataType: "json",
            headers: {
                "Authorization": "Bearer " + accessToken // Set the Authorization header with the token
            },
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

    // Function to fetch data from the API
    function fetchAPI() {
        $.ajax({
            url: apiUrl, // Replace with your API URL
            method: "GET",
            dataType: "json",
            headers: {
                "Authorization": "Bearer " + accessToken // Set the Authorization header with the token
              },
            success: function (data) {
                // Handle the data received from the API
                // console.log(data);
                displayData(data);
            },
            error: function (error) {
                console.log("Error fetching data:", error);
            }
        });
    }

    // Function to display data on the page
    function displayData(data) {
        var contentTable = $("#myDataTable");
        contentTable.children("tbody").empty(); // Clear existing content

        // Loop through the data and create HTML elements
        data.forEach(function (item, index) {
            var sn = index + 1;
            var row = `<tr>`;
            if (accessToken) {
                var btnTd = `<td><button class="btn btn-primary update-btn" data-id="${item.id}">Update</button>` +
                    `<button class="btn btn-danger delete-btn" data-id="${item.id}">Delete</button></td>`;
                if (item.isDelete) {
                    row = `<tr class="deleted">`;
                    btnTd = `<td><button class="btn btn-info undelete-btn" data-id="${item.id}">Retrive</button></td>`;
                }
            }
            row += `<td>${sn}</td>` +
                `<td>${item.districtNameEn}</td>` +
                `<td>${item.districtNameNp}</td>` +
                `<td>${item.province.provinceNameEn}-${item.province.provinceNameNp}</td>` +
                `<td>${item.noOfLocalLevelEn}</td>` +
                `<td>${item.noOfLocalLevelNp}</td>` +
                `<td>${item.descriptionEn}</td>` +
                `<td>${item.descriptionNp}</td>` +
                `${btnTd}</tr>`;

            contentTable.children("tbody").append(row);
        });
        document.querySelectorAll('.update-btn').forEach(button => {
            button.addEventListener('click', function () {
                const itemId = this.getAttribute('data-id');
                var confirmed = confirm("Are you sure you want to update?");
                if (confirmed) {
                    updateDistrict(itemId);
                }
            });
        });
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function () {
                const itemId = this.getAttribute('data-id');
                var confirmed = confirm("Are you sure you want to delete?");
                if (confirmed) {
                    deleteDistrict(itemId);
                }
            });
        });
        document.querySelectorAll('.undelete-btn').forEach(button => {
            button.addEventListener('click', function () {
                const itemId = this.getAttribute('data-id');
                var confirmed = confirm("Are you sure you want to retrive?");
                if (confirmed) {
                    deleteDistrict(itemId);
                }
            });
        });
    }
    function updateDistrict(id) {
        // console.log(id);
        window.location.href = `district/create.html?id=${id}`;
    }
    function deleteDistrict(id) {
        // console.log(id);
        $.ajax({
            url: `${apiUrl}/${id}`, // Replace with your API URL
            method: "DELETE",
            dataType: "text",
            headers: {
                "Authorization": "Bearer " + accessToken // Set the Authorization header with the token
            },
            success: function (data) {
                // Handle the data received from the API
                //  console.log(data);
                alert(data);
                fetchAPI();
            },
            error: function (error) {
                console.log("Error deleting data:", error);
            }
        });
    }
});