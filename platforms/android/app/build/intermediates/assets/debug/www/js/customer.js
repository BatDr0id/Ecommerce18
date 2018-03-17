var selection;
var data;
var id, username, first, last;
var address, orderId, orderStatus, total, quantity;
var itemId, itemName, itemQuantity, itemtotal
function initiate(){
    var selection = localStorage.getItem("customer-select");
    $('.title-profile-id').html(sessionStorage.getItem('first') + ' ' + sessionStorage.getItem('last'));
    $('.title-name').html(sessionStorage.getItem('name'));
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
            for(i=0; i < Object.keys(data.orders).length; i++){
                console.log(i);
                address = "<br>"+data.orders[i].billing_address.address_1+"<br>"+data.orders[i].billing_address.city+
                ", "+data.orders[i].billing_address.state+" "+data.orders[i].billing_address.postcode;
                orderId = data.orders[i].id;
                orderStatus = data.orders[i].status;
                total = data.orders[i].total;
                quantity = data.orders[i].total_line_items_quantity;
                $('.customer-content').append(
                    '<div class="order-setter">'+
                            '<div class="order-information">'+
                                '<p id="order-number">Order Numer: '+orderId+'</p>'+
                                '<p id="order-status">Order Status: '+orderStatus+'</p>'+
                                '<p id="order-total">Total: $'+total+'</p>'+
                                '<p id="order-quantity">Quantity: '+quantity+'</p>'+
                                '<p id="order-shipping">Shipping Address'+address+'</p>'+
                            '</div>'+
                            '<div class="order-content-setter" id='+i+'>'+
                            '</div>'+
                        '</div>'+            
                    '</div>');
                var lineitem = data.orders[i].line_items;
                console.log(lineitem[0].product_id);
                for(j=0; j < lineitem.length; j++){
                    itemId = lineitem[j].product_id;
                    itemName = lineitem[j].name;
                    itemQuantity = lineitem[j].quantity;
                    var string = "#"+i;
                    console.log(string);
                    $(string).append(
                        '<div class="order-content">'+
                            '<div class="order-image-setter">'+
                                '<img class="order-image" src="img/Frameworks/0x11f7f24ae4cbbef191cff1a711df9e1_729e92116ce550fff4d2164d0de359ed_0_.jpg" alt="">'+
                            '</div>'+
                            '<div class="order-name-setter">'+
                                '<p class="order-name">Hello</p>'+
                                '<p class="order-price sub-order">Price $46.09</p>'+
                                '<p class="order-item-quantity sub-order">Quantity: 1</p>'+
                            '</div>'
                    );
                }
            }
           
        }
    });
}

