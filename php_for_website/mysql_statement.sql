
//Gets products by categories
SELECT 
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
                and wp_terms.slug = ?