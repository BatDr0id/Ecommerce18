function getCategoryItems(){
    var urlReq;
   if(sessionStorage.getItem("slug") == null){
        urlReq = hurl + "/wp-json/wc/v2/products?per_page=50&consumer_key="+ck+"&consumer_secret="+cs;
        $.ajax({
        type :"GET", dataType: "json" ,url:urlReq,
        success: function(data){
            console.log(data);
            for(i = 0; i < Object.keys(data).length;i++){
                var name = data[i].name;
                var slug = data[i].slug;
                var link = data[i]._links.self[0].href;
                var description = data[i].short_description;
                var id = data[i].id;
                var link = data[i].permalink;
                var image = data[i].images[0].src;
                var price = data[i].price;
                createProduct(id, image, name, price, description, link);
            }
    }
    });
   }
    else {
        urlReq = hurl + "/custom/get-products-by-cat.php";
        $.ajax({
            type:"POST",
            url: urlReq,
            data: {slug: sessionStorage.getItem("slug")},
            dataType: "json",
            success: function(data){
                sessionStorage.removeItem("slug");
                console.log(data);
            for(i = 0; i < Object.keys(data).length;i++){
                var name = data[i].title;
                var slug = data[i].slug;
                var description = "<p>"+ data[i].description + "</p>";
                var id = data[i].id;
                var link = data[i].guid;
                var image = data[i].image;
                var price = data[i].price;
                createProduct(id, image, name, price, description, link);
            }
            }
        });
        
    }
$('.item-setter').click(function(e){
    console.log('click');
    var ec = e.target;
    var sid = ec.getAttribute('item-id');
    var itemArray = [];
    console.log(sid);cs
        $.ajax({
            type: 'GET', dataType: 'json', url: hurl+ '/wp-json/wc/v2/products/'+sid+'?consumer_key='+ck+'&consumer_secret='+cs,
            success: function(data){
                console.log(data);
                
                var descript = data.description;
                var $dec = $(descript);
                var name = data.name;
                var slug = data.slug;
                var content = data.short_description;
                var $img = $dec[0].innerHTML;
                var $image = $($img);
                $img = $image[0].getAttribute('src');
                itemArray.push(name, slug, content, $img);
                console.log(itemArray);
                sessionStorage.setItem('item-selected', JSON.stringify(itemArray));
                window.location.href = "item.html";
        }
        });
    });
}

function createProduct(id, img, name, price, description, linkToProduct ){
    $('.item-setter').append(
    
        "<div class='item-post' item-id='"+id+"'>"
        +"<div class = 'item-image-setter'>"
        +"<img id='item-image' src = '"+ img + "'></div>"
        +"<div class='item-title-setter'><p>" + name + "</p></div>"
        +"<div class='item-content-descript'>" + description + "</div></div>"
        );

}
