<?php

$sql = "DELETE FROM `$table` WHERE id=$key";

// excecute SQL statement
$result = mysqli_query($link, $sql);

// // die if SQL statement failed
if (!$result) {
  
    echo mysqli_error($link);

} else {
  
    echo mysqli_affected_rows($link);

}

?>