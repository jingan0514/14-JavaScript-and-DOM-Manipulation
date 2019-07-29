// from data.js
var tableData = data;

// YOUR CODE HERE!
var tbody = d3.select("tbody")

function fillData(data) {
    var row = tbody.append("tr")
    Object.entries(data).forEach(function([key, value]) {
        var cell = row.append("td")
        cell.text(value)
    });
};

tableData.forEach(ufoData => fillData(ufoData));

var button = d3.select("#filter-btn")
 
button.on("click", function() {
    
    var inputElement = d3.select("#datetime")
    var inputValue = inputElement.property("value")
    var filterData = tableData.filter(tableData => tableData.datetime === inputValue)
 
    tbody.html("")
    
    filterData.forEach(x => fillData(x));
});
