<?php
  
// Checking valid form is submitted or not
if (isset($_POST['submit_btn'])) {
    
    // Storing name in $name variable
    $name = $_POST['name'];
  
    // Storing google recaptcha response
    // in $recaptcha variable
    $recaptcha = $_POST['g-recaptcha-response'];

    // Put secret key here, which we get
    // from google console
    $secret_key = '6LfUT9IqAAAAAMs75Sta0H115hxUYsw60DtX2ERa';

    // Hitting request to the URL, Google will
    // respond with success or error scenario
    $url = 'https://www.google.com/recaptcha/api/siteverify?secret='
          . $secret_key . '&response=' . $recaptcha;

    // Making request to verify captcha
    $response = file_get_contents($url);

}

?>
