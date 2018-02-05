
//Gets products by categories
SELECT * FROM `wp_posts`, `wp_term_relationships`, wp_term_taxonomy,wp_terms where wp_posts.post_type = "product" and wp_posts.post_status = 'publish' and wp_posts.id = wp_term_relationships.object_id and wp_term_taxonomy.term_id = wp_terms.term_id and wp_term_relationships.term_taxonomy_id = wp_term_taxonomy.term_id and wp_terms.slug = '?'  