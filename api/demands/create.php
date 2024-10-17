<?php

$sql = "insert into `$table` 
    (
    title, 
    description, 
    financial, 
    hours, 
    bu, 
    status, 
    created, 
    attachment,
    level,
    startDate,
    endDate,
    priority
    ) 
values
    (
    '".addslashes($input['title'])."',
    '".addslashes($input['description'])."',
    '".addslashes($input['financial'])."',
    '".addslashes($input['hours'])."',
    '".addslashes($input['bu'])."',
    '".addslashes($input['status'])."',
    NOW(),
    '".addslashes($input['attachment'])."',
    '".addslashes($input['level'])."',
    '".addslashes($input['startDate'] ?? 'NULL')."',
    '".addslashes($input['endDate']  ?? 'NULL')."',
    '".$priority."'
    )";

// excecute SQL statement
$result = mysqli_query($link, $sql);

// // die if SQL statement failed
if (!$result) {
  
    echo mysqli_error($link);

} else {
  
    $new = mysqli_insert_id($link);

    $result_ = mysqli_query($link, "DELETE FROM demand_users WHERE demandId = '".$new."' ");
    $result_ = mysqli_query($link, "DELETE FROM skill_demand WHERE demand = '".$new."' ");

    foreach ($input['tags'] as $tag) {

        if($tag['__isNew__'] == true){

            $str = strtolower(preg_replace('/( )+/', ' ', $tag['label']));  

            $skill_code_c = mysqli_query($link, "SELECT id
            FROM skills
            where skills.code = '".$str."'");
            $skill_number = mysqli_num_rows($skill_code_c);
            $skill_code = mysqli_fetch_array($skill_code_c);

            $id_tag = "";

            if ($skill_number > 0) {
                $id_tag = $skill_code['id'];
            } else {
                $create_tag = mysqli_query($link, "INSERT INTO skills (nome, code) value ('".$tag['label']."', '".$str."') ");                
                $id_tag = mysqli_insert_id($link);
            }

            $result_ = mysqli_query($link, "INSERT INTO skill_demand (demand, skill) value ('".$new."', '".$id_tag."') ");
        } else {
            $result_ = mysqli_query($link, "INSERT INTO skill_demand (demand, skill) value ('".$new."', '".$tag['value']."') ");
        }
        
    }

    foreach ($input['responsibles'] as $responsible) {

        if($tag['__isNew__'] == true){

            $value = $responsible['value'];

            $result_ = mysqli_query($link, "INSERT INTO demand_users (demandId, userId) value ('".$new."', '".$responsible['value']."') ");
        }
        
    }

    echo $new;

}

?>