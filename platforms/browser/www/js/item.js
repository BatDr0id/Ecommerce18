var array;
function setItem(){
    var storage = JSON.parse(sessionStorage.getItem('item-selected'));
    //console.log(storage[2]);
    $('.product-title').html(storage[1]);
    $('.product-image').children('img').attr('src', storage[4]);
    $('.product-description').html(storage[3]);

    
$('.tab').click(function(e) {
        //console.log('hello');

    var tab = e.target;
    if($('.tab') != tab){
        $('.tab').css('background-color', '#eee');
        $('.tab').css('color', 'black' );
    }
    var attr = e.target.getAttribute("attr");
    //console.log(attr);
    switch (attr){
        case 'description':
            $(".product-tab-content").empty();
            $('.product-tab-content').append('<div class="product-description"></div>');
            $('.product-description').html(storage[3]);
            $(tab).css('background-color', 'black');
            $(tab).css('color', 'white' );
            break;
        case 'review':
            $(tab).css('background-color', 'black');
            $(tab).css('color', 'white' );
            //console.log(array.length);
            if (array.length > 0){
                $('.product-description').remove();
                for (i = 0; i < Object.keys(array).length; i++){
                $(".product-tab-content").append(
                    '<div class="review-setter">'+
                        ' <div class="review-name">By: </div><p class="review-name-paragraph">'+ array[i].name +'</p>'+
                        '<div class="review-paragraph">'+ array[i].review+'</div>'+
                    '</div>');
                }
            }
            else{
                $('.product-description').html("Hey, there are no reviews. Be the first to write one");
            }
            break;
    }
});
}
$(window).ready(function(){
    var storage = JSON.parse(sessionStorage.getItem('item-selected'));
    var id = storage[0];
    console.log(id);
    console.log("Hello");
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url : hurl + "/wp-json/wc/v2/products/"+id+"/reviews?"+authkey,
        success: function(data){
            console.log(data);
            array = data;
        }
               });         
                
});

