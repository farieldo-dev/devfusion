<?php 
$search_line = '';
$search_line_select = '';

if ($_GET['filter_status'] ?? null != '') { 
  $search_line_select .= $table."."."status = '".$_GET['filter_status']."' AND ";
}

if ($_GET['filter_bu'] ?? null != '') { 
  $search_line_select .= $table."."."bu = '".$_GET['filter_bu']."' AND ";
}

if($_GET['globalFilter'] ?? null != ''){
  $search = $_GET['globalFilter'];

  $search_line = "WHERE ";

  $column_search = mysqli_query($link, "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '$table'");

  while($column = mysqli_fetch_array($column_search)){
    // if($column['COLUMN_NAME'] != 'id') {
      $search_line .= $table.".".$column['COLUMN_NAME']." LIKE '%".$search."%' OR ";
    // }
  }

  $search_line = substr($search_line, 0, -3);
}

if ($search_line_select != '') {
  $search_line_select = substr($search_line_select, 0, -4);

  if ($search_line != '') {
    $search_line .= " AND (".$search_line_select.")";
  } else {
    $search_line = " WHERE (".$search_line_select.")";
  }
}
?>