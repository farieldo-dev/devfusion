<?php
include('../connect.php');
include('../header.php');


$sql = "SELECT
 COUNT(case when status = 'New' then 1 end) as new,
 COUNT(case when status = 'In Progress' then 1 end) as inProgress,
 COUNT(case when status = 'Cancelled' then 1 end) as cancelled,
 COUNT(case when status = 'Concluded' then 1 end) as concluded
FROM demands 
";
$result = mysqli_query($link, $sql);

// // die if SQL statement failed
if (!$result) {
  
    header('HTTP/1.1 400 Bad Request', true, 400);
    echo mysqli_error($link);

} else {

    $data = array();
    while($r = mysqli_fetch_assoc($result)) {
        $data = $r;
    }
    
    $json = json_encode($data);

    print_r($json);
    
    exit();

}

?>