<?php
$skills = array();
$query_sql = mysqli_query($link, "SELECT * from npl_skills where active is null");
while ($line = mysqli_fetch_assoc($query_sql)) {
  array_push($lsar_system, (object)[
      'value' => $line['id'],
      'ref' => $line['id'],
      'label' => $line['name']
  ]); 
}


$fields = (object) [
  'skills' => $skills
];
?>