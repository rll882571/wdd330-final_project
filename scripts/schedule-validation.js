// scripts/schedule-validation.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("trial-lesson-form");

    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        let isFormValid = true;

        // 1. Validação do Nome
        const nameInput = document.getElementById("fullName");
        const nameError = document.getElementById("name-error");
        if (nameInput.value.trim() === "") {
            invalidateField(nameInput, nameError);
            isFormValid = false;
        } else {
            validateField(nameInput, nameError);
        }

        // 2. Validação do Email
        const emailInput = document.getElementById("email");
        const emailError = document.getElementById("email-error");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            invalidateField(emailInput, emailError);
            isFormValid = false;
        } else {
            validateField(emailInput, emailError);
        }

        // 3. Validação do Telefone
        const phoneInput = document.getElementById("phone");
        const phoneError = document.getElementById("phone-error");
        if (phoneInput.value.trim() === "") {
            invalidateField(phoneInput, phoneError);
            isFormValid = false;
        } else {
            validateField(phoneInput, phoneError);
        }

        // 4. Validação do Nível de Inglês
        const levelSelect = document.getElementById("englishLevel");
        const levelError = document.getElementById("level-error");
        if (levelSelect.value === "") {
            invalidateField(levelSelect, levelError);
            isFormValid = false;
        } else {
            validateField(levelSelect, levelError);
        }

        // 5. Validação do Horário de Estudo
        const timeSelect = document.getElementById("studyTime");
        const timeError = document.getElementById("time-error");
        if (timeSelect.value === "") {
            invalidateField(timeSelect, timeError);
            isFormValid = false;
        } else {
            validateField(timeSelect, timeError);
        }

        // 6. Validação do Objetivo
        const goalSelect = document.getElementById("goal");
        const goalError = document.getElementById("goal-error");
        if (goalSelect.value === "") {
            invalidateField(goalSelect, goalError);
            isFormValid = false;
        } else {
            validateField(goalSelect, goalError);
        }

        // SE O FORMULÁRIO ESTIVER VÁLIDO: Envia os dados para a API do EmailJS
        if (isFormValid) {
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;

            // Parâmetros correspondentes às chaves do seu template do EmailJS
            const templateParams = {
                from_name: nameInput.value.trim(),
                reply_to: emailInput.value.trim(),
                phone: phoneInput.value.trim(),
                level: levelSelect.options[levelSelect.selectedIndex].text,
                study_time: timeSelect.options[timeSelect.selectedIndex].text,
                goal: goalSelect.options[goalSelect.selectedIndex].text
            };

            // Dispara o envio real utilizando seus IDs validados
            emailjs.send('service_zb3fdm4', 'template_a5h8z9l', templateParams)
                .then(() => {
                    // Redireciona para a página de sucesso após a confirmação da API
                    window.location.href = "success.html";
                }, (error) => {
                    console.error("FAILED...", error);
                    alert("Oops! Something went wrong while sending your request. Please try again.");
                    submitBtn.textContent = "Confirm & Submit";
                    submitBtn.disabled = false;
                });
        }
    });

    function invalidateField(inputElement, errorElement) {
        inputElement.classList.add("input-invalid");
        errorElement.style.display = "block";
    }

    function validateField(inputElement, errorElement) {
        inputElement.classList.remove("input-invalid");
        errorElement.style.display = "none";
        inputElement.style.borderBottomColor = "var(--secondary-color)";
    }
});