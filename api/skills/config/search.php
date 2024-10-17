<?php 
$search_line = '';

if($_GET['search'] ?? null != ''){
  $search = $_GET['search'];

  $search_line .= "WHERE name LIKE '%".$search."%' OR username LIKE '%".$search."%'";
}


?>