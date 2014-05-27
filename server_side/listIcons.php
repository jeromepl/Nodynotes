<?php
    header('Content-Type: application/json');

    $files = scandir('../images/icons');
    $delCount = 0;

    foreach($files as $key => $file) {
        if($file == '.' || $file == '..') {
            array_splice($files, $key - $delCount, 1);
            $delCount++;
        }
    }

    echo json_encode($files);
