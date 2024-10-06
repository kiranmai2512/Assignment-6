document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    const registerForm = document.querySelector('#registerForm');
    const name = document.querySelector('#name');
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const confirmPassword = document.querySelector('#confirmPassword');
    const phone = document.querySelector('#phone');

    const loginForm = document.querySelector('#loginForm');
    const loginEmail = document.querySelector('#loginemail');
    const loginPassword = document.querySelector('#loginpassword');
    const successMessage = document.querySelector('#successMessage');

    if (registerForm) {
        console.log('Register form found');
        registerForm.addEventListener('submit', (event) => {
            let valid = true;
            let errorMessages = [];

            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

            if (!validateName(name.value)) {
                errorMessages.push('Name must contain only letters');
                valid = false;
            }

            if (!validateEmail(email.value)) {
                errorMessages.push('Invalid email address');
                valid = false;
            }

            if (!validatePassword(password.value)) {
                errorMessages.push('Password must be at least 8 characters long and include a mix of letters, numbers, and special characters');
                valid = false;
            }

            if (password.value !== confirmPassword.value) {
                errorMessages.push('Passwords do not match');
                valid = false;
            }

            if (!validatePhone(phone.value)) {
                errorMessages.push('Phone number must contain only numbers');
                valid = false;
            }

            if (!valid) {
                console.log('Validation failed:', errorMessages);
                window.alert('Please fix the following errors:\n\n' + errorMessages.join('\n'));
                event.preventDefault();
            }
            if(valid){
                window.alert('Registration completed !');
            }
        });
    }

    if (loginForm) {
        console.log('Login form found');
        loginForm.addEventListener('submit', (event) => {
            let valid = true;
            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

            if (!validateEmail(loginEmail.value)) {
                if (successMessage) {
                    successMessage.textContent = 'Incorrect email';
                    successMessage.style.color = 'red';
                }
                valid = false;
            }
            if (!validateLogin(loginEmail.value, loginPassword.value)) {
                if (successMessage) {
                    successMessage.textContent = 'Incorrect email or password';
                    successMessage.style.color = 'red';
                }
                valid = false;
            }

            if (valid) {
                if (successMessage) {
                    successMessage.textContent = 'Login successful!';
                    successMessage.style.color = 'green';
                }
                event.preventDefault();
            } else {
                event.preventDefault();
            }
        });
    }

    function validateName(name) {
        const re = /^[A-Za-z\s'-]+$/;
        return re.test(name);
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        return re.test(email);
    }

    function validatePassword(password) {
        const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return re.test(password);
    }

    function validatePhone(phone) {
        const re = /^\+?\d{1,4}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,9}$/;
        return re.test(phone);
    }

    function validateLogin(email, password) {
        const predefinedLogins = [
            { email: 'test@example.com', password: 'Password123!' },
            { email: 'user@example.com', password: 'SecurePass456$' }
        ];
        return predefinedLogins.some(login => login.email === email && login.password === password);
    }

    function adjustFontSize() {
        document.body.style.fontSize = window.innerWidth < 600 ? '14px' : '16px';
    }

    adjustFontSize();
    window.addEventListener('resize', adjustFontSize);
});