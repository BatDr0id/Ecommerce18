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
function orders(){
    var userid = sessionStorage.getItem('id');
    $.ajax({
        type: "GET",
        dataType: "json",
        url:hurl +"/wc-api/v3/orders?filter[customer_id]="+userid+"&"+authkey,
        success: function(data){
            console.log(data);
        }
    });
}
function setup(){}