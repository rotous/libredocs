<?php

//$libreoffice = '/Applications/LibreOffice.app/Contents/MacOS/soffice';
$libreoffice = '/usr/bin/libreoffice';

/*
$start = strpos($_REQUEST['data'], 'base64,') + 7;
$start = 0;

$requestData = substr($_REQUEST['data'], $start);
$data = substr($_REQUEST['data'],0,$start) . base64_decode($requestData);
*/

$requestData = explode(',', $_REQUEST['data']);
$mimeType = explode(':', $requestData[0]);
$mimeType = explode(';', $mimeType[1]);
$mimeType = $mimeType[0];

// Be sure to replace space with + or the data will be corrupt
$data = base64_decode(str_replace(' ', '+', $requestData[1]));

$fp = fopen('../tmp/test.odt', 'w');
fwrite($fp, $data);
fclose($fp);

chdir('../tmp');
$retval = shell_exec($libreoffice . ' --convert-to html --headless test.odt');
//$retval = shell_exec('ls -la '+$libreoffice);
//system($libreoffice + ' --help', $retval);

//echo var_export($retval, true);

//file_put_contents('../tmp/test.odt', $data);

$html = file_get_contents('test.html');

echo json_encode(array(
	'mime' => $mimeType,
	'html' => $html
));

