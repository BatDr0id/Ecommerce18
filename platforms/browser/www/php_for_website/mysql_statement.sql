
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
                        
//Get Order purchase Information
Select distinct
            order_key, user_id, order_status.id, order_status.post_status, payment_method, payment_method_title, first_name,last_name, address_1, address_2, city, state, postcode,
            country, shipping_first_name, shipping_last_name, shipping_address_1, shipping_address_2, shipping_city, shipping_state,
            shipping_postcode, shipping_country, order_total, order_item_id, order_item_name, product_id, variation_id, quantity, tax_class,subtotal, subtotal_tax, guid
            FROM 
                (SELECT 
                    wp_postmeta.post_id,
                    min(case when wp_postmeta.meta_key = "_order_key" then wp_postmeta.meta_value end) as order_key,
                    min(case when wp_postmeta.meta_key = "_customer_user" then wp_postmeta.meta_value end) as user_id,
                    min(case when wp_postmeta.meta_key = "_payment_method" then wp_postmeta.meta_value end) as payment_method,
                    min(case when wp_postmeta.meta_key = "_payment_method_title" then wp_postmeta.meta_value end) as payment_method_title,
                    min(case when wp_postmeta.meta_key = "_billing_first_name" then wp_postmeta.meta_value end) as first_name,
                    min(case when wp_postmeta.meta_key = "_billing_last_name" then wp_postmeta.meta_value end) as last_name,
                    min(case when wp_postmeta.meta_key = "_billing_address_1" then wp_postmeta.meta_value end) as address_1,
                    min(case when wp_postmeta.meta_key = "_billing_address_2" then wp_postmeta.meta_value end) as address_2,
                    min(case when wp_postmeta.meta_key = "_billing_city" then wp_postmeta.meta_value end) as city,
                    min(case when wp_postmeta.meta_key = "_billing_state" then wp_postmeta.meta_value end) as state,
                    min(case when wp_postmeta.meta_key = "_billing_postcode" then wp_postmeta.meta_value end) as postcode,
                    min(case when wp_postmeta.meta_key = "_billing_country" then wp_postmeta.meta_value end) as country,
                    min(case when wp_postmeta.meta_key = "_shipping_first_name" then wp_postmeta.meta_value end) as shipping_first_name,
                    min(case when wp_postmeta.meta_key = "_shipping_last_name" then wp_postmeta.meta_value end) as shipping_last_name,
                    min(case when wp_postmeta.meta_key = "_shipping_address_1" then wp_postmeta.meta_value end) as shipping_address_1,
                    min(case when wp_postmeta.meta_key = "_shipping_address_2" then wp_postmeta.meta_value end) as shipping_address_2,
                    min(case when wp_postmeta.meta_key = "_shipping_city" then wp_postmeta.meta_value end) as shipping_city,
                    min(case when wp_postmeta.meta_key = "_shipping_state" then wp_postmeta.meta_value end) as shipping_state,
                    min(case when wp_postmeta.meta_key = "_shipping_postcode" then wp_postmeta.meta_value end) as shipping_postcode,
                    min(case when wp_postmeta.meta_key = "_shipping_country" then wp_postmeta.meta_value end) as shipping_country,
                    min(case when wp_postmeta.meta_key = "_order_total" then wp_postmeta.meta_value end) as order_total,
                    min(case when wp_postmeta.meta_key = "_order_shipping" then wp_postmeta.meta_value end) as order_shipping 
                        from wp_postmeta group by wp_postmeta.post_id
                ) as order_table,
                (SELECT
                    wp_users.user_nicename,
                    wp_users.ID
                    FROM wp_users
                ) as wp_users,
                (SELECT 
                    wp_woocommerce_order_items.order_id,
                    wp_woocommerce_order_items.order_item_id, 
                    wp_woocommerce_order_items.order_item_name, 
                    min(case when wp_woocommerce_order_itemmeta.meta_key ="_product_id" then wp_woocommerce_order_itemmeta.meta_value end) 
                        as product_id,
                    min(case when wp_woocommerce_order_itemmeta.meta_key ="_variation_id" then wp_woocommerce_order_itemmeta.meta_value end) 
                        as variation_id,
                    min(case when wp_woocommerce_order_itemmeta.meta_key ="_qty" then wp_woocommerce_order_itemmeta.meta_value end) 
                        as quantity,
                    min(case when wp_woocommerce_order_itemmeta.meta_key ="_tax_class" then wp_woocommerce_order_itemmeta.meta_value end) 
                        as tax_class,
                    min(case when wp_woocommerce_order_itemmeta.meta_key ="_line_subtotal" then wp_woocommerce_order_itemmeta.meta_value end) 
                        as subtotal,
                    min(case when wp_woocommerce_order_itemmeta.meta_key ="_line_subtotal_tax" then wp_woocommerce_order_itemmeta.meta_value end) 
                        as subtotal_tax
                    FROM wp_woocommerce_order_items 
                        LEFT JOIN wp_woocommerce_order_itemmeta 
                        ON wp_woocommerce_order_items.order_item_id = wp_woocommerce_order_itemmeta.order_item_id 

                        GROUP BY wp_woocommerce_order_items.order_item_id, wp_woocommerce_order_items.order_item_name

                ) as order_info,
               
                (SELECT distinct
                    wp_posts.id,
                    wp_posts.post_status,
                    wp_woocommerce_order_items.order_id
                    from wp_posts, wp_woocommerce_order_items
                    where wp_posts.id = wp_woocommerce_order_items.order_id
                ) as order_status,
                (SELECT 
                    post.post_parent,
                 	post.ID,
                    image.post_parent as image_parent,
                    image.guid as guid
                 
                 from wp_posts as post left JOIN
                 wp_posts as image on image.post_parent = post.id 
                 where post.id = image.post_parent and image.post_type = 'attachment'
                ) as order_images
                where  wp_users.id = order_table.user_id 
                and order_table.post_id = order_info.order_id
                and order_status.id = order_info.order_id
                and order_images.image_parent = order_info.product_id
                and user_id =1
                ORDER BY order_item_id DESC
                
               