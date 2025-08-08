document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const messageDiv = document.getElementById('formMessage');
    if (form) {
        // Check for success message on page load
        if (window.location.search.includes('success=1')) {
            messageDiv.innerHTML = '<div class="alert alert-success mt-3" role="alert">Submission Successful!</div>';
            window.history.replaceState({}, document.title, window.location.pathname);
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            messageDiv.innerHTML = '';

            const fullName = document.getElementById('fullName');
            if (fullName.value.trim().length < 2) {
                isValid = false;
                fullName.classList.add('is-invalid');
                messageDiv.innerHTML += '<div class="text-danger form-message">Full Name must be at least 2 characters.</div>';
            } else {
                fullName.classList.remove('is-invalid');
            }

            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value)) {
                isValid = false;
                email.classList.add('is-invalid');
                messageDiv.innerHTML += '<div class="text-danger form-message">Enter a valid email.</div>';
            } else {
                email.classList.remove('is-invalid');
            }

            const phone = document.getElementById('phone');
            const phoneRegex = /^\+?\d{10,15}$/;
            if (!phoneRegex.test(phone.value)) {
                isValid = false;
                phone.classList.add('is-invalid');
                messageDiv.innerHTML += '<div class="text-danger form-message">Enter a valid phone (10-15 digits).</div>';
            } else {
                phone.classList.remove('is-invalid');
            }

            const address = document.getElementById('address');
            if (address.value.trim().length < 5) {
                isValid = false;
                address.classList.add('is-invalid');
                messageDiv.innerHTML += '<div class="text-danger form-message">Address must be at least 5 characters.</div>';
            } else {
                address.classList.remove('is-invalid');
            }

            const profileImage = document.getElementById('profileImage');
            if (profileImage.files.length > 0) {
                const file = profileImage.files[0];
                const maxSize = 2 * 1024 * 1024;
                if (!file.type.startsWith('image/')) {
                    isValid = false;
                    profileImage.classList.add('is-invalid');
                    messageDiv.innerHTML += '<div class="text-danger form-message">Upload a valid image.</div>';
                } else if (file.size > maxSize) {
                    isValid = false;
                    profileImage.classList.add('is-invalid');
                    messageDiv.innerHTML += '<div class="text-danger form-message">Image must not exceed 2MB.</div>';
                } else {
                    profileImage.classList.remove('is-invalid');
                }
            }

            if (isValid) {
                form.submit();
            }
        });
    }

    // Add custom dropdown submenu toggle
    document.querySelectorAll('.dropdown-submenu .dropdown-toggle').forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            const submenu = item.nextElementSibling;
            submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
        });
    });
});