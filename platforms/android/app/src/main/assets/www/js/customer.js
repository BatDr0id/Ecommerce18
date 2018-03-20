var selection;
var data;
var id, username, first, last;
var address, orderId, orderStatus, total, quantity;
var itemId, itemName, itemQuantity, itemtotal, itemImage
function initiate(){
    var selection = localStorage.getItem("customer-select");
    $('.title-profile-id').html(sessionStorage.getItem('first') + ' ' + sessionStorage.getItem('last'));
    $('.title-name').html(sessionStorage.getItem('name'));
    $('.image-setter-image').attr('src', sessionStorage.getItem('image'));
    orders();
}
function orders(){
    var userid = sessionStorage.getItem('id');
    $.ajax({
        type: "POST",
        data: {user_id: sessionStorage.getItem('id')},
        dataType: "json",
        url:hurl +"/custom/get-orders-info.php",
        success: function(data){
            //console.log(data);
        
            for(i=1; i <= Object.keys(data).length; i++){
                //console.log(data[1].billing_info);
                address = "<br>"+data[i].billing_info.address_1+"<br>"+data[i].billing_info.city+
                ", "+data[i].billing_info.state+" "+data[i].billing_info.postcode;
                orderId = data[i].order_id;
                orderStatus = data[i].status;
                total = data[i].order_total;
                quantity = data[i].items.length;
                $('.customer-content').append(
                    '<div class="title-divider"></div>'+
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
                var lineitem = data[i].items;
                //console.log(lineitem[0].product_id);
                for(j=0; j < lineitem.length; j++){
                    itemId = lineitem[j].product_id;
                    itemName = lineitem[j].item_name;
                    itemQuantity = lineitem[j].quantity;
                    itemtotal = lineitem[j].subtotal;
                    itemImage = lineitem[j].image;
                    var string = "#"+i;
                    //console.log(string);
                    $(string).append(
                        '<div class="order-content">'+
                            '<div class="order-image-setter">'+
                                '<img class="order-image" src="'+itemImage+'" alt="">'+
                            '</div>'+
                            '<div class="order-name-setter">'+
                                '<p class="order-name">'+itemName+'</p>'+
                                '<p class="order-price sub-order">Price $'+itemtotal+'</p>'+
                                '<p class="order-item-quantity sub-order">Quantity: '+itemQuantity+'</p>'+
                            '</div>'
                    );
                }
            }
           
        }
    });
}

