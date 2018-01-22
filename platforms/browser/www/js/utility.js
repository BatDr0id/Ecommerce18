function createPost(id, author, title, content){
    $('.post-setter').append(
        "<div class='posts-item' id='"+id+"'>"
        +"<p id='post-title'>"+ title +"</p>"
        +"<p id='post-creator'>By: "+ author +"</p>"
        +"<div id='post-content'>"+ content +"</div></div>");
}
