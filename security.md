# Security Implementations

## Measures
- **Input Sanitization**: PHP `filter_input` is used to sanitize user inputs (e.g., `fullName`, `email`) to prevent cross-site scripting (XSS).
- **SQL Injection Prevention**: MySQL prepared statements are implemented in `register.php` to protect against SQL injection.
- **File Upload Security**: Images are validated for type (image/*) and size (<2MB), stored in a dedicated `uploads/` folder with restricted access.
- **Client-Side Validation**: JavaScript in `script.js` validates inputs before submission, reducing server load and enhancing user experience.

## Recommendations
- Use HTTPS in production to encrypt data transmission.
- Implement CSRF tokens to protect against cross-site request forgery.
- Regularly update PHP, MySQL, and dependencies to patch vulnerabilities.