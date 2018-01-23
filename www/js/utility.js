function getPostData(){
    $.ajax({
        type: "GET", dataType: "json", url: "http://ecommerce18.xyz/wp-json/wp/v2/posts",
        success: function (data){
            getPosts = data;
            console.log(data);
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
}
