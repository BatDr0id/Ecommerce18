
function setItem(){
    var storage = JSON.parse(sessionStorage.getItem('item-selected'));
    //console.log(storage[2]);
    $('.product-title').html(storage[0]);
    $('.product-image').children('img').attr('src', storage[3]);
    $('.product-description').html(storage[2]);

    
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
            $('.product-description').html(storage[2]);
            $(tab).css('background-color', 'black');
            $(tab).css('color', 'white' );
            break;
        case 'review':
            $('.product-description').html("Hey, there are no reviews. Be the first to write one");
            $(tab).css('background-color', 'black');
            $(tab).css('color', 'white' );
            break;
    }
});
}

