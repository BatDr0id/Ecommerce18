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
    downloads();
}
function downloads(){
    var userid = sessionStorage.getItem('id');
    id = sessionStorage.getItem('id');
    $.ajax({
        type: "GET",
        dataType: 'json',
        url: hurl + "/wp-json/wc/v2/customers/"+id+"/downloads?"+authkey,
        success: function(e){
            console.log(e);
            for(i=0; i < Object.keys(e).length; i++){
                    itemName = e[i].product_name;
                    itemImage = e[i].file.file;
                    itemLink = e[i].download_url;
                    itemLinkName = e[i].download_name;
                    itemDownloads = e[i].downloads_remaining;
                    var string = "#"+i;
                    //console.log(string);
                    $('.customer-content').append(
                        '<div class="order-content">'+
                            '<div class="order-image-setter">'+
                                '<img class="order-image" src="'+itemImage+'" alt="">'+
                            '</div>'+
                            '<div class="order-name-setter">'+
                                '<p class="order-name">'+itemName+'</p>'+
                                '<p class="downloads-left" style="font-weight: 100;font-size: .8em;">Downloads remaining: '+itemDownloads+'</p>'+
                                '<a href="'+itemLink+'" download="'+itemLinkName+'"><button class="download-button">'+
                            '</div>'
                        );}}
        
    });
}

