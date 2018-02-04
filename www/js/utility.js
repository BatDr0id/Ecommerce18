var hurl = "https://ecommerce18.xyz";
var auth = false;
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
    $.ajax({
        type :"GET", dataType: "json", per_page: "50" ,url:"https://ecommerce18.xyz/wp-json/wc/v2/products/?slug=books&per_page=100&consumer_key=ck_a88c9def695ef2c8accd8a04393f54d79b55890f&consumer_secret=cs_1aa3c7676c58e4a54ecf58db18fa7f6fd3d0ab3d",
        success: function(data){
            console.log(data);
    }
    })
}

/*function createProduct(id, img, name, price, description, linkToProduct )
{
    $('.post-setter').append(
        "<div class='posts-item' id='"+id+"'>"
        +"<img src =" + img + ">"
        +"<p id='post-title'> <a href=" + linkToProduct + ">" name + "</a></p>"
        +"<p id='post-creator'>Price: "+ price +"</p>"
        +"<div id='post-content'>"+ description +"</div></div>");
}*/
function createMenu(){
    $(".main").append(
    "<div class='navMenuContainer'>"+
    "<nav class='navMenu'>" +
    "<ul><li><a href=''>Home</a></li>"+
    "<li><a href=''>Shop</a></li>"+
    "<li><a href=''>My Account</a></li>"+
    "</ul><div class='divider'></div>"+
    "<ul class='productMenu'></ul>"
    );
    if (localStorage.getItem("product_menu") !== 'undefined'){
        pmArray = JSON.parse(localStorage.getItem("product_menu"));
        for(i = 0; i < Object.keys(pmArray).length;i++){
            var name = pmArray[i][0];
            var slug = pmArray[i][1];
            var link = pmArray[i][2];
            createProductMenu(name, slug);
        }
    }
    else {
        getProductMenu();
    }
   $(".navMenuContainer").click(function(e){
        if(e.target.getAttribute("class") === "navMenuContainer")
        $(".navMenuContainer").empty().remove();
});}

function createAccountMenu() {
    if(auth){
    $(".main").append("<div class='navMenuContainer'><div class='navProfile'>"+
            "<div class='myProfileImage'><img src='/res/dev/DSCN1671-copy1.png' alt=''></div>"+
            "<div class='myAccountName'>Testy Tester</div><div class='divider'></div>"+
            "<div class='accountMenu'><div id='orders'><a href=''>Orders</a></div>"+
            "<div id='prof-info'><a href=''>Profile Info.</a></div><div id='downloads'>"+
            "<a href=''>Downloads</a></div><div id='bill-info'><a href=''>Billing Info.</a></div></div></div</div>"
    );}
    else {
        $(".main").append("<div class='navMenuContainer'><div class='navProfile'><p>My Account</p><div class='divider'></div><input type='text' placeholder='Username' id='username'><input id='password' type='password' placeholder='Password'><button type='button'>Login</button><div class='divider'></div><a href=''><div>Sign Up</div></a><a href=''><div>Forgot Password?</div></a><a href=''><div>Go to our website</div></a></div></div>");
    }
    $(".navMenuContainer").click(function(e){
        if(e.target.getAttribute("class") === "navMenuContainer")
        $(".navMenuContainer").empty().remove();
});
}

function getProductMenu(){
    var zero = 0;
    var pmArray = [];
     if (localStorage.getItem("product_menu") == null){
    $.ajax({
        type: "GET", dataType: "json",
        url: "https://ecommerce18.xyz/wp-json/wc/v2/products/categories?consumer_key=ck_a88c9def695ef2c8accd8a04393f54d79b55890f&consumer_secret=cs_1aa3c7676c58e4a54ecf58db18fa7f6fd3d0ab3d",
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
        "<li><a href='' slug='"+ slug +"'>"+ name +"</a></li>");
}
