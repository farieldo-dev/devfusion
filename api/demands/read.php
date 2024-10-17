<?php

// include('config/format.php');

include('config/search.php');

if ($_GET['count'] ?? null == 1) {

  $sql = "SELECT COUNT(*) FROM `$table` ".$search_line.$search_option."";

} else {

  if (!$key) {
    $page = $_GET['page'];
    $items_per_page =  $_GET['items_per_page'];
    $sort = $_GET['sort'][0]['id'] ?? null;
    $order = ($_GET['order'][0]['desc'] == true ? 'desc' : 'asc') ?? null;
    
    $total_pages_sql = "SELECT COUNT(*) FROM `$table` ".$search_line.$search_option."";
    $result = mysqli_query($link, $total_pages_sql);
    $total_rows = mysqli_fetch_array($result)[0];
    $total_pages = ceil($total_rows / $items_per_page);
    
    $offset = ($page-1) * $items_per_page;
  }

  
  $sql = "SELECT 
      demands.*,
      USER.id as userId,
      USER.name,
      USER.username,
      CASE
        WHEN demands.bu = 1 THEN 'Defense'
        WHEN demands.bu = 2 THEN 'Executive'
        WHEN demands.bu = 3 THEN 'Commercial'
        ELSE ''
      END as buName
    FROM demands
      LEFT JOIN users AS USER ON demands.userId = USER.id
      ".($key ?? null ? "" : $search_line.$search_option)."
      ".($key ?? null ? "" : "GROUP BY demands.id")."
      ".($sort ?? null != "" ? " order by demands.$sort $order" : "")."
      ".($key ?? null ? " where demands.id=$key" : " LIMIT $offset, $items_per_page")."    
  ";
}

// excecute SQL statement
$result = mysqli_query($link, $sql);

// // die if SQL statement failed
if (!$result) {
  
    header('HTTP/1.1 400 Bad Request', true, 400);
    echo mysqli_error($link);

} else {
  
  if ($_GET['count'] ?? null == 1) {

    $items_per_page =  5000;
    $total_rows = mysqli_fetch_array($result)[0];
    $total_pages = ceil($total_rows / $items_per_page);

    $payload = Array (
      "total" => $total_rows,
      "pages" => $total_pages 
    );
    
    $json = json_encode($payload);

    print_r($json);
    
    exit();

  } else {

      if (!$key) {

        $data = array();
        while($r = mysqli_fetch_assoc($result)) {
            $data[] = $r;
        }
        
        $payload = Array (
          "data" => $data,
          "meta" => Array (
            "totalRowCount" => $total_rows
          )
        );
        
        $json = json_encode($payload);

        print_r($json);
        
        exit();

      } else {

        $demand = mysqli_fetch_array($result);

        $responsibles = [];

        $user_c = mysqli_query($link, "SELECT 
          users.id,
          users.username, 
          users.name
        FROM demand_users
        inner join users on users.id = demand_users.userId
        where demand_users.demandId = '".$demand['id']."'
        order by demand_users.id desc");

        while($user = mysqli_fetch_array($user_c)){
          array_push($responsibles, (object)[
              'value' => $user['id'],
              'label' => $user['username']." - ".$user['name']
          ]); 
        }

        $skills = array();

        $skill_c = mysqli_query($link, 'SELECT 
              skills.*
            FROM skill_demand
                INNER JOIN skills ON skill_demand.skill = skills.id   
            WHERE skill_demand.demand = '.$demand['id'].'
            GROUP BY skills.id
        ');
        while($skill = mysqli_fetch_array($skill_c)){
          array_push($skills, (object)[
            'value' => $skill['id'],
            'label' => $skill['name']
          ]); 
        }

        $object = (object) [
            'id' => $demand['id'],
            'title' => $demand['title'],
            'description' => $demand['description'],
            'created' => $demand['created'],
            'limit' => $demand['limit'],
            'status' => $demand['status'],
            'financial' => $demand['financial'],
            'hours' => $demand['hours'],
            'attachment' => $demand['attachment'],
            'bu' => $demand['bu'],
            'userId' => $demand['userId'],
            'name' => $demand['name'],
            'userName' => $demand['username'],
            'tags' => $skills,
            'responsibles' => $responsibles
        ];

        $json = json_encode($object);

        print_r($json);

      }

  }

}

?>