var init = 0;
function getCategoryItems(){
    var urlReq;
    var stringify;
    var selected = sessionStorage.getItem("selected");
    if(sessionStorage.getItem(selected)){
        var array = [];
        array = JSON.parse(sessionStorage.getItem(selected));
        //console.log(array);
        if (selected == 'all'){
            for(i = 0; i < Object.keys(array).length;i++){
                var name = array[i].name;
                var slug = array[i].slug;
                var description =array[i].short_description;
                var id = array[i].id;
                var link = array[i].permalink;
                var image = array[i].images[0].src;
                var price = array[i].price;
                createProduct(id, image, name, price, description, link);
            }
        }
        else{
            for(i = 0; i < Object.keys(array).length;i++){
                var name = array[i].title;
                var slug = array[i].slug;
                var description = "<p>"+ array[i].description + "</p>";
                var id = array[i].id;
                var link = array[i].guid;
                var image = array[i].image;
                var price = array[i].price;
                createProduct(id, image, name, price, description, link);
            }
        }
        
    }
    else {
        
        if( selected == "all"){
        urlReq = hurl + "/wp-json/wc/v2/products?per_page=50&"+authkey;
        $.ajax({
            type :"GET", dataType: "json" ,url:urlReq,
            success: function(data){
                console.log(data);
                stringify = JSON.stringify(data);
                sessionStorage.setItem(sessionStorage.getItem('selected'), stringify);
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
                data: {slug: sessionStorage.getItem("selected")},
                dataType: "json",
                success: function(data){
                    //console.log(data);
                    stringify = JSON.stringify(data);
                    sessionStorage.setItem(sessionStorage.getItem('selected'), stringify);
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
    }
    
}

function createProduct(id, img, name, price, description, linkToProduct ){
    
    $('.item-setter').append(
        "<div class='item-post' item-id='"+id+"'>"
        +"<div class = 'item-image-setter'>"
        +"<img id='item-image' src = '"+ img + "'></div>"
        +"<div class='item-title-setter'><p>" + name + "</p></div>"
        +"<div class='item-content-descript'>" + description + "</div></div>"
        );

    $('.item-post').click(function(e){
        //console.log('click');
        if(init < 1){
        //console.log(e);
        init++;

        var ec = e.currentTarget;
        var sid = ec.getAttribute('item-id');
        var itemArray = [];
        //console.log(sid);
        
           $.ajax({
                type: 'GET',
                dataType: 'json',
                url: hurl+ '/wp-json/wc/v2/products/'+sid+'?'+authkey,
                success: function(data){
                    //console.log(data);
                    var id = data.id;
                    var descript = data.description;
                    var $dec = $(descript);
                    var name = data.name;
                    var slug = data.slug;
                    var content = data.short_description;
                    var $img = $dec[0].innerHTML;
                    var $image = $($img);
                    $img = $image[0].getAttribute('src');
                    itemArray.push(id, name, slug, content, $img);
                    //console.log(itemArray);
                    sessionStorage.setItem('item-selected', JSON.stringify(itemArray));
                    window.location.href = "item.html";
            }
           
            });
        }
        
        });

}

