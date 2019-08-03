// from data.js
var tableData = data;
var Data = data;
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

var addFilter = d3.select("#add-filter")
var filterButton = d3.select("#filter-btn")
var startOver = d3.select("#start-over")
var form = d3.select(".filter-input")

var filters = [];
var count = 0;

function filterName(value) {
    filters.push(value);
    var input = d3.select("#input-"+count)
    switch (value) {
        case "Date":
            input.attr("placeholder", "1/11/2011")
            break;
        case "City":
            input.attr("placeholder", "benton")
        break;
        case "State":
            input.attr("placeholder", "ar")
            break;
        case "Country":
            input.attr("placeholder", "us")
            break;
        case "Shape":
            input.attr("placeholder", "circle")
            break;
        default:
            break;
    }
}




addFilter.on("click", function() {

    count += 1;
    console.log(count)

    var sel = form.append("select").attr("onchange", "filterName(this.value)")
    sel.append("option").text("---")
    sel.append("option").text("Date")
    sel.append("option").text("City")
    sel.append("option").text("State")
    sel.append("option").text("Country")
    sel.append("option").text("Shape")

    var ul = form.append("ul").classed("list-group", true).attr("id", "filters")
    var li = ul.append("li").classed("filter list-group-item", true);
    li.append("input").classed("form-control", true).attr("type", "text").attr("id", function(){return "input-"+count})

})



filterButton.on("click", function() {
    
    // var inputElement = d3.select("#datetime")
    // var inputValue = inputElement.property("value")
    // var filterData = tableData.filter(tableData => tableData.datetime === inputValue)

    for (let i = 0; i < count; i++) {
        var indice = i + 1;
        var inputElement = d3.select("#input-"+indice)
        var inputValue = inputElement.property("value")
        console.log(inputValue)
        switch (filters[i]) {
            case "Date":
                tableData = tableData.filter(tableData => tableData.datetime === inputValue)
                break;
            case "City":
                tableData = tableData.filter(tableData => tableData.city === inputValue)
            break;
            case "State":
                tableData = tableData.filter(tableData => tableData.state === inputValue)
                break;
            case "Country":
                tableData = tableData.filter(tableData => tableData.country === inputValue)
                break;
            case "Shape":
                tableData = tableData.filter(tableData => tableData.shape === inputValue)
                break;
            default:
                break;
        }
        
    }

    tbody.html("")
    
    tableData.forEach(x => fillData(x));
});

startOver.on("click", function(){
    tableData = data;
    tbody.html("")
    form.html("")
    tableData.forEach(ufoData => fillData(ufoData));
    count = 0;
    filters = [];
})
