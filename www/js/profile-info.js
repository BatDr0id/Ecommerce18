var selection;
var data;
var id, username, first, last;
var first, last, username, email;
var itemId, itemName, itemQuantity, itemtotal, itemImage
function initiate(){
    var selection = localStorage.getItem("customer-select");
    $('.title-profile-id').html(sessionStorage.getItem('first') + ' ' + sessionStorage.getItem('last'));
    $('.title-name').html(sessionStorage.getItem('name'));
    $('.image-setter-image').attr('src', sessionStorage.getItem('image'));
    profileinfo();
}
function profileinfo(){
    id = sessionStorage.getItem('id');
    $.ajax({
        type: "GET",
        dataType: 'json',
        url: hurl + "/wp-json/wc/v2/customers/"+id+"?"+authkey,
        success: function(e){
            console.log(e);
            $('#username').html(e.username);
            $('#name').html(e.first_name + " " + e.last_name);
            $('#email').html(e.email);
            $('#billing-name').html(e.billing.first_name + " " + e.billing.last_name);
            $('#billing-address_1').html(e.billing.address_1);
            $('#phone').html(e.billing.phone);
            if(e.billing.address_2 == ""){
                $('#billing-address_2').remove();
                $('#billing-address_3').css("margin-top", "-1.6em");
            }
            else{
                $('billing-address_2').html(e.billing.address_2);
            }
            $('#shipping-name').html(e.shipping.first_name + " " + e.shipping.last_name);
            $('#shipping-address_1').html(e.shipping.address_1);
            if(e.billing.address_2 == ""){
                $('#shipping-address_2').remove();
                $('#shipping-address_3').css("margin-top", "-1.6em");
            }
            else{
                $('shipping-address_2').html(e.billing.address_2);
            }
        }
    });
};