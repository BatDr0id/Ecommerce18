var selection;
var id, username, first, last;
function initiate(){
    var selection = localStorage.getItem("customer-select");
    switch (selection){
        case "orders":
            orders();
            break;
        case "downloads":
            break;
    }
}
function setup(){}