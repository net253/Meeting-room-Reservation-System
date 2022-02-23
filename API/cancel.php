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

    $msgLineNotify .= "\n" . "ต้องการจองรถ ⤵" . "\n" . webUrl;

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
        $action = "Cancel";

        $sql = "DELETE FROM t_rooms WHERE code = '$code' AND datetimeUse = '$datetimeUse';
                    INSERT INTO t_rooms_logger (rooms,name,code,agent,tel,datetime,datetimeUse,datetimeReturn,purpose,action) 
                    VALUES ('$rooms','$name','$code','$agent','$tel','$datetime','$datetimeUse','$datetimeReturn','$purpose','$action');";

        $result = $conn->query($sql);

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
}
