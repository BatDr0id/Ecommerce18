var hurl = "https://ecommerce18.xyz";
var auth = false;
var ck = "ck_a88c9def695ef2c8accd8a04393f54d79b55890f";
var cs = "cs_1aa3c7676c58e4a54ecf58db18fa7f6fd3d0ab3d"
function getPostData(){
    $.ajax({
        type: "GET", dataType: "json", url: hurl + "/wp-json/wp/v2/posts?fields=pwapp_author,content,title",
        success: function (data){
            getPosts = data;
            //https://stackoverflow.com/questions/13782698/get-total-number-of-items-on-json-object
            for (i =0; i < Object.keys(getPosts).length; i++){
                var id = getPosts[i].id;
                var content = getPosts[i].content.rendered;
                var author = getPosts[i].pwapp_author.name;
                var title = getPosts[i].title.rendered;
                createPost(id, author, title, content);
}}});}

function createPost(id, author, title, content){
    $('.post-setter').append(
        "<div class='posts-item' id='"+id+"'>"
        +"<p id='post-title'>"+ title +"</p>"
        +"<p id='post-creator'>By: "+ author +"</p>"
        +"<div id='post-content'>"+ content +"</div></div>");
}

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
    
    
}

function createProduct(id, img, name, price, description, linkToProduct )
{
    $('.item-setter').append(
        "<a id='item-link' href='" + linkToProduct + "'>"
        +"<div class='item-post'>"
        +"<div class = 'item-image-setter'>"
        +"<img id='item-image' src = '"+ img + "'></div>"
        +"<div class='item-title-setter'><p>" + name + "</p></div>"
        +"<div class='item-content-descript'>" + description + "</div></div></a>"
        );
}

function createMenu(){

    $(".main").append(
    "<div class='navMenuContainer'>"+
    "<nav class='navMenu'>" +
    "<ul><li><a href='index.html'>Home</a></li>"+
    "<li><a href=''>Shop</a></li>"+
    "<li><a href=''>My Account</a></li>"+
    "</ul><div class='divider'></div>"+
    "<ul class='productMenu'><li><a href='products.html'>All Products</a></li></ul>"
    );
    if (localStorage.getItem("product_menu") !== 'undefined'){
        pmArray = JSON.parse(localStorage.getItem("product_menu"));
        for(i = 0; i < Object.keys(pmArray).length;i++){
            var name = pmArray[i][0];
            var slug = pmArray[i][1];
            var link = pmArray[i][2];
            console.log(name);
            createProductMenu(name, slug);
        }
    }
    else {
        getMenuItems();
    }
   $(".navMenuContainer").click(function(e){
        if(e.target.getAttribute("class") === "navMenuContainer")
        $(".navMenuContainer").empty().remove();
});
$('.menu-product-link').click(
        function(e){
            var product =  e.target;
            console.log(product);
            var slug = product.getAttribute('slug');
            var name = product.getAttribute('category');
            sessionStorage.setItem("slug", slug);
            sessionStorage.setItem("category", name);
    });
}

function createAccountMenu() {
    var id, name, first, last, image, email, capabilitiesm, cookie;
    if(sessionStorage.getItem('cookie')){
        id = sessionStorage.getItem('id');
        name = sessionStorage.getItem('name');
        first = sessionStorage.getItem('first');
        last = sessionStorage.getItem('last');
        image = sessionStorage.getItem('image');
        email = sessionStorage.getItem('eamil');
        loginSuccess(id, name, first, last, image, email);
    }
    else {
		// Check if device supports fingerprint
/**
* @return {
*      isAvailable:boolean,
*      isHardwareDetected:boolean,
*      hasEnrolledFingerprints:boolean
*   }
*/
FingerprintAuth.isAvailable(function (result) {

    console.log("FingerprintAuth available: " + JSON.stringify(result));
    
    // If has fingerprint device and has fingerprints registered
    if (result.isAvailable == true && result.hasEnrolledFingerprints == true) {

        // Check the docs to know more about the encryptConfig object :)
        var encryptConfig = {
            clientId: "myAppName",
            username: "currentUser",
            password: "currentUserPassword",
            maxAttempts: 5,
            locale: "en_US",
            dialogTitle: "Hey dude, your finger",
            dialogMessage: "Put your finger on the device",
            dialogHint: "No one will steal your identity, promised"
        }; // See config object for required parameters

        // Set config and success callback
        FingerprintAuth.encrypt(encryptConfig, function(_fingerResult){
            console.log("successCallback(): " + JSON.stringify(_fingerResult));
            if (_fingerResult.withFingerprint) {
                console.log("Successfully encrypted credentials.");
                console.log("Encrypted credentials: " + result.token);  
            } else if (_fingerResult.withBackup) {
                console.log("Authenticated with backup password");
            }
        // Error callback
        }, function(err){
                if (err === "Cancelled") {
                console.log("FingerprintAuth Dialog Cancelled!");
            } else {
                console.log("FingerprintAuth Error: " + err);
            }
        });
    }

/**
* @return {
*      isAvailable:boolean,
*      isHardwareDetected:boolean,
*      hasEnrolledFingerprints:boolean
*   }
*/
}, function (message) {
    console.log("isAvailableError(): " + message);
});
        $(".main").append("<div class='navMenuContainer'><div class='navProfile'><p>My Account</p><div class='divider'></div><input type='text' placeholder='Username' id='username'><input id='password' type='password' placeholder='Password'><button class='login-button' type='button'>Login</button><div class='divider'></div><a href=''><div>Sign Up</div></a><a href=''><div>Forgot Password?</div></a><a href=''><div>Go to our website</div></a></div></div>");
        
        
    }
    $(".navMenuContainer").click(function(e){
        if(e.target.getAttribute("class") === "navMenuContainer")
        $(".navMenuContainer").empty().remove();
    });
    $(".login-button").click(function(e){
        var username = $("#username").val();
        var password = $('#password').val();
        $.ajax({
            type: "POST",
            dataType: "jsonp",
            url: "https://www.ecommerce18.xyz/api/auth/generate_auth_cookie/?username="+username+"&password="+password,
            success: function(data){
                console.log(data);
                auth = true;
                createAccountMenu();
                id = data.user.id;
                name = data.user.username;
                first = data.user.firstname;
                last = data.user.lastname;
                image = data.user.avatar;
                email = data.user.email;
                cookie = data.cookie;
                capabilities = data.user.capabilities;
                $(".navMenuContainer").empty().remove();
                loginSuccess(id, name, first, last, image, email);
                sessionStorage.setItem("id", id);
                sessionStorage.setItem('name', name);
                sessionStorage.setItem('first', first);
                sessionStorage.setItem('last', last);
                sessionStorage.setItem('image', image);
                sessionStorage.setItem('email', email);
                sessionStorage.setItem('capabilities', capabilities);
                sessionStorage.setItem('cookie', cookie);
            }
        });
            
    });
}

function loginSuccess(id, name, first, last, image, email){
    $(".main").append("<div class='navMenuContainer'><div class='navProfile' id='"+name+"' account-number='"+id+"'>"+
            "<p class='myProfileName' >"+first+ " "+last+"</p>"+
            "<div class='myProfileImage'><img src='"+image+"' alt=''></div>"+
            "<div class='myAccountName'>"+name+"</div><div class='divider'></div>"+
            "<div class='accountMenu'><div id='orders'><a href=''>Orders</a></div>"+
            "<div id='prof-info'><a href=''>Profile Info.</a></div><div id='downloads'>"+
            "<a href=''>Downloads</a></div><div id='bill-info'><a href=''>Billing Info.</a></div>"+
            "<div><a href=''>Logout</a></div></div></div></div>"
    );
     $(".navMenuContainer").click(function(e){
        if(e.target.getAttribute("class") === "navMenuContainer")
        $(".navMenuContainer").empty().remove();
    });
}
function getMenuItems(){
    var zero = 0;
    var pmArray = [];
     if (localStorage.getItem("product_menu") == null){
    $.ajax({
        type: "GET", dataType: "json",
        url: hurl + "/wp-json/wc/v2/products/categories?consumer_key="+ck+"&consumer_secret="+cs,
        success: function (data){
            menu = data;
            for(i = 0; i < Object.keys(menu).length;i++){
                var name = menu[i].name;
                var slug = menu[i].slug;
                var link = menu[i]._links.self[0].href;
                var tmp = [name, slug, link];
                pmArray.push(tmp);
            }//https://stackoverflow.com/questions/13782698/get-total-number-of-items-on-json-object
            localStorage.setItem("product_menu", JSON.stringify(pmArray));
        }
})}};

function createProductMenu(name, slug){
    $('.productMenu').append(
        "<li><a class='menu-product-link' href='products.html' slug='"+ slug +"' category='"+ name +"'>"+ name +"</a></li>");
}
