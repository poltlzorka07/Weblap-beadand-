const form = document.getElementById('travel-form');

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const uticelInput = document.getElementById('destination');
const startdateInput = document.getElementById('start-date');
const enddateInput = document.getElementById('end-date');
const budgetInput = document.getElementById('budget');
const termsInput = document.getElementById('terms');

const errorName = document.getElementById('error-name');
const errorEmail = document.getElementById('error-email');
const errorDestination = document.getElementById('error-destination');
const errorStartDate = document.getElementById('error-start-date');
const errorEndDate = document.getElementById('error-end-date');
const errorBudget = document.getElementById('error-budget');
const errorTerms = document.getElementById('error-terms');

form.addEventListener('submit', function(event) {
    let isValid = true;

    // Töröljük az előző hibaüzeneteket
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(function(msg) {
        msg.textContent = '';
    });

    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(el => el.classList.remove('input-error'));

    // 1. Név ellenőrzése
    if (nameInput.value.trim() === "") {
        errorName.textContent = "A név megadása kötelező!";
        isValid = false;
        nameInput.classList.add('input-error'); 
    }

    // Email ellenőrzése (csak üresség)
    if (emailInput.value.trim() === "") {
        errorEmail.textContent = "Az email cím megadása kötelező!";
        emailInput.classList.add('input-error');
        isValid = false;
        }


    // 3. Úticél választása
    if (uticelInput.value === "") {
        errorDestination.textContent = "Az úticél megadása kötelező!";
        isValid = false;
        uticelInput.classList.add('input-error');
    }

    // 4. Indulás dátuma (az aznapi dátumnál nagyobb)
    const today = new Date().toISOString().split('T')[0]; // Az aktuális dátum YYYY-MM-DD formátumban
    if (startdateInput.value === "" || startdateInput.value <= today) {
        errorStartDate.textContent = "Az indulás dátuma nem lehet korábbi, mint a mai dátum!";
        isValid = false;
        startdateInput.classList.add('input-error');
    }

    // 5. Érkezési dátum (nagyobb, mint az indulási dátum)
    if (enddateInput.value === "" || enddateInput.value <= startdateInput.value) {
        errorEndDate.textContent = "Az érkezési dátumnak nagyobbnak kell lennie, mint az indulás dátuma!";
        isValid = false;
        enddateInput.classList.add('input-error');
    }

    // 6. Költségkeret (nagyobb mint nulla)
    if (budgetInput.value <= 0 || budgetInput.value === "") {
        errorBudget.textContent = "A költségkeretnek nagyobbnak kell lennie, mint nulla!";
        isValid = false;
        budgetInput.classList.add('input-error');
    }

    // 7. Checkbox (elfogadott-e a feltétel)
    if (!termsInput.checked) {
        errorTerms.textContent = "El kell fogadnod az adatvédelmi nyilatkozatot!";
        isValid = false;
        termsInput.classList.add('input-error');
    }

    // Ha valamilyen hiba történt, megállítjuk az űrlap beküldését
    if (!isValid) {
        event.preventDefault();
        console.log("Hiba az űrlapon!");
    } else {
        console.log("Minden adat rendben, küldés...");
    }
});
