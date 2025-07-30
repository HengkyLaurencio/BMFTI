// Form validation and submission
const form = document.getElementById('registrationForm');
const successMessage = document.getElementById('successMessage');
const formContainer = form.parentElement;

form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Reset previous errors
    clearErrors();

    // Validate form
    let isValid = true;
    const formData = new FormData(form);

    // Validate nama lengkap
    const namaLengkap = formData.get('namaLengkap').trim();
    if (!namaLengkap || namaLengkap.length < 2) {
        showError('namaLengkap', 'Nama lengkap minimal 2 karakter');
        isValid = false;
    }

    // Validate email
    const email = formData.get('email').trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        showError('email', 'Format email tidak valid');
        isValid = false;
    }

    // Validate NIM
    const nim = formData.get('nim').trim();
    const nimRegex = /^[0-9]{9}$/;
    if (!nim || !nimRegex.test(nim)) {
        showError('nim', 'NIM harus 9 digit angka');
        isValid = false;
    }

    // Validate program studi
    const programStudi = formData.get('programStudi');
    if (!programStudi) {
        showError('programStudi', 'Program studi wajib dipilih');
        isValid = false;
    }

    if (isValid) {
        // Simulate form submission
        const submitBtn = form.querySelector('.form-submit');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Mengirim...';

        setTimeout(() => {
            // Hide form and show success message
            formContainer.style.display = 'none';
            successMessage.classList.add('show');

            // Reset button
            submitBtn.disabled = false;
            submitBtn.textContent = 'Daftar Sekarang';
        }, 1500);
    }
});

function showError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const formGroup = field.closest('.form-group');
    const errorDiv = formGroup.querySelector('.form-error');

    formGroup.classList.add('error');
    errorDiv.textContent = message;
}

function clearErrors() {
    const errorGroups = document.querySelectorAll('.form-group.error');
    errorGroups.forEach(group => {
        group.classList.remove('error');
    });
}

function resetForm() {
    form.reset();
    clearErrors();
    formContainer.style.display = 'block';
    successMessage.classList.remove('show');
}

// Real-time validation
const inputs = form.querySelectorAll('.form-input, .form-select');
inputs.forEach(input => {
    input.addEventListener('blur', function () {
        const formGroup = this.closest('.form-group');
        if (formGroup.classList.contains('error')) {
            // Re-validate on blur
            const event = new Event('submit', { cancelable: true });
            form.dispatchEvent(event);
        }
    });

    input.addEventListener('input', function () {
        const formGroup = this.closest('.form-group');
        if (formGroup.classList.contains('error')) {
            formGroup.classList.remove('error');
        }
    });
});

// NIM input restrictions
const nimInput = document.getElementById('nim');
nimInput.addEventListener('input', function (e) {
    // Only allow numbers
    this.value = this.value.replace(/\D/g, '');
    // Limit to 9 digits
    if (this.value.length > 9) {
        this.value = this.value.slice(0, 9);
    }
});