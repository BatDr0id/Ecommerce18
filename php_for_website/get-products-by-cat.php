<?php 
    require_once('../wp-config.php');
    $connection = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

    $category = $_POST['category'];
    //var $page_number = $_POST['page_number'];
    $response = array();

    $statement = mysqli_prepare($connection, " SELECT 
            post.id, 
            post.post_author, 
            post.post_date, 
            post.post_content, 
            post.post_title, 
            post.post_excerpt, 
            post.post_name, 
            post.guid, 
            image.guid as image_path, 
            wp_term_taxonomy.term_id, 
            name, 
            slug
            FROM `wp_posts` as post left JOIN 
                wp_posts as image on image.post_parent = post.id, 
                wp_term_taxonomy, wp_terms, wp_term_relationships 
                    where image.post_type = 'attachment' 
                        and post.post_status = 'publish' 
                        and post.id = wp_term_relationships.object_id 
                        and wp_term_taxonomy.term_id = wp_terms.term_id 
                        and wp_term_relationships.term_taxonomy_id = wp_term_taxonomy.term_id 
                        and wp_terms.slug = ?");
    mysqli_stmt_bind_param ($statement, 's', $category);
    mysqli_stmt_execute($statement);
    mysqli_stmt_store_result($statement);
    mysqli_stmt_bind_result($statement, $id, $author, $publish_date, $content, $title, $description, $post_name, $guid, $image, $term_id, $category, $slug);

        while(mysqli_stmt_fetch($statement)){  
            $package = array();
            $package["author"] = $author;
            $package["date"] = $publish_date;
            $package["content"] = $content;
            $package["title"] = $title;
            $package["description"] = $description;
            $package["post_name"] = $post_name;
            $package["guid"] = $guid;
            $package["image"] = $image;
            $package["term_id"] = $term_id;
            $package["category"] = $category;
            $package["slug"] = $slug;
            array_push($response, $package);
        }
    echo json_encode($response); 
?>