<?php
require_once 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullName = filter_input(INPUT_POST, 'fullName', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
    $address = filter_input(INPUT_POST, 'address', FILTER_SANITIZE_STRING);
    $imagePath = null;

    if (isset($_FILES['profileImage']) && $_FILES['profileImage']['error'] == UPLOAD_ERR_OK) {
        $uploadDir = 'uploads/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }
        $imagePath = $uploadDir . basename($_FILES['profileImage']['name']);
        move_uploaded_file($_FILES['profileImage']['tmp_name'], $imagePath);
    }

    $stmt = $conn->prepare("INSERT INTO applicants (full_name, email, phone, address, profile_image) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $fullName, $email, $phone, $address, $imagePath);
    
    if ($stmt->execute()) {
        $stmt->close();
        $conn->close();
        // Redirect with success message
        header("Location: register.html?success=1");
        exit();
    } else {
        $stmt->close();
        $conn->close();
        die("Error: " . $conn->error);
    }
} else {
    // Display message if redirected with success
    if (isset($_GET['success']) && $_GET['success'] == 1) {
        echo '<div class="alert alert-success mt-3" role="alert">Submission Successful!</div>';
    }
}
?>