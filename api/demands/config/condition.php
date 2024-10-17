<?php
if ($method == 'POST' OR $method == 'PUT') {
    if ($input['limit'] !== '') {
        if($input['created'] !== '') {
            $data_inicio_limit = new DateTime($input['created']);
        } else {
            $data_inicio_limit = new DateTime();
        }
        $data_fim_limit = new DateTime($input['limit']);

        // Resgata diferença entre as datas
        $dateInterval = $data_inicio_limit->diff($data_fim_limit);
        $metric = $dateInterval->days;

        if ($metric <= 7) {
            $fac1 = 10;
        } else if ($metric <= 14) {
            $fac1 = 8;
        } else if ($metric <= 30) {
            $fac1 = 6;
        } else if ($metric <= 90) {
            $fac1 = 4;
        } else if ($metric <= 180) {
            $fac1 = 2;
        } else {
            $fac1 = 0;
        }

    } else {
        $fac1 = 0; 
    }

    $fac2 = 0;

    if($input['level'] == 'Very Low') {
        $fac2 = 10;
    } else if ($input['level'] == 'Low') {
        $fac2 = 8;
    } else if ($input['level'] == 'Medium') {
        $fac2 = 5;
    } else if ($input['level'] == 'High') {
        $fac2 = 3;
    } else if ($input['level'] == 'Vey High') {
        $fac2 = 0;
    }

    $fac3 = 0;

    if($input['financial'] == '1000000') {
        $fac3 = 10;
    } else if ($input['financial'] == '100000') {
        $fac3 = 8;
    } else if ($input['financial'] == '10000') {
        $fac3 = 6;
    } else if ($input['financial'] == '1000') {
        $fac3 = 4;
    } else if ($input['financial'] == '100') {
        $fac3 = 2;
    }

    $fac4 = 0;

    if($input['hours'] == '18000') {
        $fac4 = 10;
    } else if ($input['hours'] == '1800') {
        $fac4 = 8;
    } else if ($input['hours'] == '180') {
        $fac4 = 6;
    } else if ($input['hours'] == '18') {
        $fac4 = 4;
    } else if ($input['hours'] == '2') {
        $fac4 = 2;
    }

    if ($input['startDate'] !== '' and $input['endtDate'] !== '') {
        $data_inicio_limit = new DateTime($input['startDate']);
        $data_fim_limit = new DateTime($input['endtDate']);

        // Resgata diferença entre as datas
        $dateInterval = $data_inicio_limit->diff($data_fim_limit);
        $metric = $dateInterval->days;

        if ($metric <= 7) {
            $fac5 = 10;
        } else if ($metric <= 14) {
            $fac5 = 8;
        } else if ($metric <= 30) {
            $fac5 = 6;
        } else if ($metric <= 90) {
            $fac5 = 4;
        } else if ($metric <= 180) {
            $fac5 = 2;
        } else {
            $fac5 = 0;
        }
    } else {
        $fac5 = 0;
    }

    if($fac5 == 0) {
        $priority = ($fac1 * 0.35) + ($fac2 * 0.35) + ($fac3 * 0.15) + ($fac4 * 0.15);
    } else {
        $priority = ($fac1 * 0.30) + ($fac2 * 0.30) + ($fac3 * 0.15) + ($fac4 * 0.15) + ($fac5 * 0.10);
    }
}
?>