<?php

$sql = "update `$table` set 
    title = '".addslashes($input['title'])."', 
    description  = '".addslashes($input['description'])."', 
    financial  = '".addslashes($input['financial'])."', 
    hours  = '".addslashes($input['hours'])."', 
    bu  = '".addslashes($input['bu'])."', 
    status  = '".addslashes($input['status'])."',  
    attachment  = '".addslashes($input['attachment'])."',  
    level  = '".addslashes($input['level'])."',  
    startDate  = '".addslashes($input['startDate'] ?? 'NULL')."',  
    endDate  = '".addslashes($input['endDate'] ?? 'NULL')."',  
    priority  = '".$priority."'
where id=$key";

// excecute SQL statement
$result = mysqli_query($link, $sql);

// // die if SQL statement failed
if (!$result) {
  
    header('HTTP/1.1 400 Bad Request', true, 400);
    echo mysqli_error($link);

} else {

    $result_delete_users = mysqli_query($link, "DELETE FROM demand_users WHERE demandId = '".$key."' ");
    $result_delete_skills = mysqli_query($link, "DELETE FROM skill_demand WHERE demand = '".$key."' ");

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

            $result_skill = mysqli_query($link, "INSERT INTO skill_demand (demand, skill) value ('".$key."', '".$id_tag."') ");
        } else {
            $result_skill = mysqli_query($link, "INSERT INTO skill_demand (demand, skill) value ('".$key."', '".$tag['value']."') ");
        }
        
    }

    foreach ($input['responsibles'] as $responsible) {

        $value = $responsible['value'];

        $result_resp = mysqli_query($link, "INSERT INTO demand_users (demandId, userId) value ('".$key."', '".$value."') ");
       
    }

    echo mysqli_affected_rows($link);

}

?>