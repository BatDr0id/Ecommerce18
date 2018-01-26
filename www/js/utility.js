var hurl = "https://ecommerce18.xyz";
function getPostData(){
    $.ajax({
        type: "GET", dataType: "json", url: hurl + "/wp-json/wp/v2/posts?fields=pwapp_author,content,title",
        success: function (data){
            getPosts = data;
            console.log(getPosts);
            //https://stackoverflow.com/questions/13782698/get-total-number-of-items-on-json-object
            for (i =0; i < Object.keys(getPosts).length; i++){
                var id = getPosts[i].id;
                var content = getPosts[i].content.rendered;
                var author = getPosts[i].pwapp_author.name;
                var title = getPosts[i].title.rendered;
                createPost(id, author, title, content);
            }
        }});
      };

function createPost(id, author, title, content){
    $('.post-setter').append(
        "<div class='posts-item' id='"+id+"'>"
        +"<p id='post-title'>"+ title +"</p>"
        +"<p id='post-creator'>By: "+ author +"</p>"
        +"<div id='post-content'>"+ content +"</div></div>");
};
function getProductMenu(){
    var zero = 0;
                $.ajax({
                    type: "GET", dataType: "json",
                    url: "https://ecommerce18.xyz/wp-json/wc/v2/products/categories?consumer_key=ck_a88c9def695ef2c8accd8a04393f54d79b55890f&consumer_secret=cs_1aa3c7676c58e4a54ecf58db18fa7f6fd3d0ab3d",
                    success: function (data){
                    menu = data;
                    console.log(menu);

                for(i = 0; i < Object.keys(menu).length;i++){
                    var name = menu[i].name;
                    var link = menu[i]._links.self[0].href;
                    console.log(link);
                }
            //https://stackoverflow.com/questions/13782698/get-total-number-of-items-on-json-object
       }});
};
