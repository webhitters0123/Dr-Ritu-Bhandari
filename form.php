<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Base files
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

//require 'vendor/autoload.php'; // Ensure PHPMailer is installed via Composer

session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $recaptcha_secret = "6Lc0pNMqAAAAADI2fPCmnF3CyiZX4LXyOy8C5Ycd"; // Replace with your Google reCAPTCHA Secret Key
    $recaptcha_response = $_POST['g-recaptcha-response']; // Get response token from form

    // Verify Google reCAPTCHA
    $url = "https://www.google.com/recaptcha/api/siteverify";
    $data = [
        'secret' => $recaptcha_secret,
        'response' => $recaptcha_response
    ];

    $options = [
        'http' => [
            'header'  => "Content-Type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($data)
        ]
    ];
    $context  = stream_context_create($options);
    $verify = file_get_contents($url, false, $context);
    $captcha_success = json_decode($verify);

    if (!$captcha_success->success) {
        echo "Captcha verification failed!";
        exit;
    }

    // Sanitize Input Fields
    $name = htmlspecialchars($_POST['name']);
    $phone = htmlspecialchars($_POST['phone']);
    $email = htmlspecialchars($_POST['email']);

    $mail = new PHPMailer(true);


    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'https://drritubhandari.in/'; // Replace with your SMTP server
        $mail->SMTPAuth = true;
        $mail->Username = 'enquiry@drritubhandari.in'; // Replace with your email
        $mail->Password = 'OTy7}Y$%#-te'; // Replace with your email password
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->addAddress('enquiry@drritubhandari.in');

        // Content
        $mail->isHTML(false);
        $mail->Subject = 'New Appointment Request';
        $mail->Body = "<h3>Appointment Details</h3>
                      <p><strong>Name:</strong> $name</p>
                      <p><strong>Phone:</strong> $phone</p>
                      <p><strong>Email:</strong> $email</p>";

        //$mail->send();
        //echo 'Message has been sent successfully!';

	if ($mail->send()) {
            // Success message
            echo "<script>alert('Thanks for submitting your query - unicodesigns.co.in');</script>";
        } else {
            echo "<script>alert('There was an error sending your message. Please try again later.');</script>";
        }

    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
} else {
    echo "Invalid request!";
}
?>