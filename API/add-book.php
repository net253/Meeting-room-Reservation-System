<?php
require_once("./dbconfig.php");
$conn = new PDO("mysql:host=$hostname;dbname=$database", $username, $password);

$requestMethod = $_SERVER["REQUEST_METHOD"];
$dataJson = file_get_contents("php://input");
$data = json_decode($dataJson);

function msg_line_notify($datetime, $rooms, $conn)
{
    $dateUse = substr($datetime, 0, 10);
    $sqlLineNotify = "SELECT*FROM t_rooms WHERE rooms = '$rooms' 
                        AND (datetimeUse BETWEEN '$dateUse 00:00:00' AND '$dateUse 23:59:59') ORDER BY datetimeUse ASC;";

    $totalBooking = $conn->query($sqlLineNotify);

    $resultTotalBooking = array();
    while ($row = $totalBooking->fetchObject()) {
        $resultTotalBooking[] = $row;
    }
    $totalBooking->closeCursor();
    $msgLineNotify = "\n" . $rooms . "\n"  . "วันที่ " . (new DateTime($dateUse))->format('d/m/Y') . "\n\n" . "คิวจองห้องประชุม 📌" . "\n";
    $i = 0;
    while ($i < count($resultTotalBooking)) {
        $name = $resultTotalBooking[$i]->name;
        $timeStart = $resultTotalBooking[$i]->datetimeUse;
        $timeEnd = $resultTotalBooking[$i]->datetimeReturn;
        $msgLineNotify .= substr($timeStart, 11, 5) . " - " . substr($timeEnd, 11, 5) . " น." . " (" . explode(" ", $name)[0] . ")" .   "\n";
        $i++;
    }

    $msgLineNotify .= "\n" . "ต้องการจองห้องประชุม ⤵" . "\n" . webUrl;

    return $msgLineNotify;
}

function notify_message($message, $token)
{
    $queryData = array('message' => $message);
    $queryData = http_build_query($queryData, '', '&');
    $headerOptions = array(
        'http' => array(
            'method' => 'POST',
            'header' => "Content-Type: application/x-www-form-urlencoded\r\n"
                . "Authorization: Bearer " . $token . "\r\n"
                . "Content-Length: " . strlen($queryData) . "\r\n",
            'content' => $queryData
        ),
    );
    $context = stream_context_create($headerOptions);
    $result = file_get_contents(LINE_API, FALSE, $context);
    $res = json_decode($result);
    return $res;
}


function check_time($datetimeUse, $datetimeReturn, $code, $conn)
{
    $timeUseBook = date_create(substr($datetimeUse, 11, 5));
    $timeReturnBook = date_create(substr($datetimeReturn, 11, 5));
    $diffTimeBook = (date_diff($timeUseBook, $timeReturnBook)->h * 60) + (date_diff($timeUseBook, $timeReturnBook)->i);

    $date = substr($datetimeUse, 0, 10);
    $sql = "SELECT*FROM t_rooms WHERE code = '$code' AND ((datetimeUse BETWEEN '$date 00:00:00' AND '$date 23:59:59') OR (datetimeReturn BETWEEN '$date 00:00:00' AND '$date 23:59:59')) ;";
    $result = $conn->query($sql);
    $allTime = array();
    while ($row = $result->fetchObject()) {
        $allTime[] = $row;
    }

    $i = 0;
    $diffTimeDB = 0;
    while ($i < count($allTime)) {
        $timeUse = date_create(substr($allTime[$i]->datetimeUse, 11, 5));
        $timeRetur = date_create(substr($allTime[$i]->datetimeReturn, 11, 5));
        $diffTimeDB = $diffTimeDB + (date_diff($timeUse, $timeRetur)->h * 60) + (date_diff($timeUse, $timeRetur)->i);
        $i++;
    }

    $result->closeCursor();
    return $diffTimeBook + $diffTimeDB;
}

if ($requestMethod == "POST") {
    if (!empty($data)) {
        $rooms = $data->rooms;
        $name = $data->name;
        $code = $data->code;
        $agent = $data->agent;
        $tel = $data->tel;
        $datetime = (new DateTime())->format('Y-m-d H:i:s');
        $datetimeUse = $data->datetimeUse;
        $datetimeReturn = $data->datetimeReturn;
        $purpose = $data->purpose;
        $action = "booking";

        $sqlChk = "SELECT*FROM t_rooms 
                        WHERE (rooms = '$rooms' AND ((datetimeUse <= '$datetimeUse' AND datetimeReturn > '$datetimeUse') OR (datetimeUse < '$datetimeReturn' AND datetimeReturn >= '$datetimeReturn') OR (datetimeUse >= '$datetimeUse' AND datetimeReturn <= '$datetimeReturn')))
                        OR ((datetimeUse <= '$datetimeUse' AND datetimeReturn > '$datetimeUse' AND code = '$code') OR (datetimeUse < '$datetimeReturn' AND datetimeReturn >= '$datetimeReturn' AND code = '$code') OR (datetimeUse >= '$datetimeUse' AND datetimeReturn <= '$datetimeReturn' AND code = '$code'));";

        $sqlInsert = "INSERT INTO t_rooms (rooms,name,code,agent,tel,datetime,datetimeUse,datetimeReturn,purpose) 
                            VALUES ('$rooms','$name','$code','$agent','$tel','$datetime','$datetimeUse','$datetimeReturn','$purpose');
                            
                            INSERT INTO t_rooms_logger (rooms,name,code,agent,tel,datetime,datetimeUse,datetimeReturn,purpose,action) 
                            VALUES ('$rooms','$name','$code','$agent','$tel','$datetime','$datetimeUse','$datetimeReturn','$purpose','$action');";

        $checkBooking = $conn->query($sqlChk);


        $timeTotal = check_time($datetimeUse, $datetimeReturn, $code, $conn);
        if ($timeTotal <= 540) {
            if ($checkBooking->rowCount() == 0) {
                $checkBooking->closeCursor();
                $result = $conn->query($sqlInsert);
                if ($result->rowCount() > 0) {
                    $result->closeCursor();
                    $msg = msg_line_notify($datetimeUse, $rooms, $conn);
                    notify_message($msg, $token);
                    echo json_encode(['message' => 'Insert Data Complete', 'state' => true]);
                    // http_response_code(200);
                } else {
                    echo json_encode(['message' => 'Error', 'state' => false]);
                    // http_response_code(400);
                }
            } else {
                echo json_encode(['message' => 'Error', 'state' => false]);
                // http_response_code(400);
            }
        } else {
            echo json_encode(['message' => 'busy or over9h', 'state' => false]);
            // http_response_code(400);
        }
    } else {
        echo json_encode(['message' => 'Error', 'state' => false]);
        // http_response_code(400);
    }
}
