/*Q1 - The query return all trees that belong to the user with the email address “adam@versett.com” */
Select tree_table.id, tree_table.friendly_name, tree_table.scientific_name,user_table.email 
	from tree_table
    join user_table
		On tree_table.owner_id = user_table.id
	where email ='adam@versett.com';
 /*Q2 - The query returns the following information for each tree: the ID, friendly name, scientific name, the owner’s name.*/   
Select tree_table.id, tree_table.friendly_name, tree_table.scientific_name, user_table.name 
	from tree_table
    join user_table
		On tree_table.owner_id = user_table.id;
  /*Q3 - The query also returns the total number of “likes” for each tree. */   
SELECT COUNT(likes_table.user_id), tree_table.friendly_name, tree_table.scientific_name
	FROM likes_table
    join tree_table
		On likes_table.tree_id = tree_table.id
GROUP BY likes_table.tree_id;
 