let billPrice = 0;
let tipShare = 0;
let numberOfPeople = 0;
let tipSumPerPerson = 0;
let totalSumPerPerson = 0;

let billInput = document.getElementById('billInput');
let leftSpan = document.querySelector('.left-span');
let numberOfPeopleInput = document.getElementById('numberOfPeopleInput');
let percentageInputsDiv = document.querySelector('.percentage-inputs');
let customPercentageInput = document.getElementById('custom-percentage-input');
let resetButton = document.querySelector('.reset-btn');
let tipAmountDiv = document.getElementById('tipAmountDiv');
let totalAmountDiv = document.getElementById('totalAmountDiv');

function tipAmount() {
    if (billPrice == 0 || tipShare == 0 || numberOfPeople == 0) {
        tipAmountDiv.innerText = '$0.00';
        tipSumPerPerson = 0;
    } else {
        tipSumPerPerson = parseFloat((billPrice / numberOfPeople) * (tipShare / 100)).toFixed(2);
        tipAmountDiv.innerText = '$' + tipSumPerPerson;
        tipSumPerPerson = parseFloat(tipSumPerPerson);
    }
}

function totalAmount() {
    if (billPrice == 0 || numberOfPeople == 0) {
        totalAmountDiv.innerText = '$0.00';
    } else {
        totalSumPerPerson = parseFloat((billPrice / numberOfPeople) + tipSumPerPerson).toFixed(2);
        totalAmountDiv.innerText = '$' + totalSumPerPerson;
    }
}

function spanChecker() {
    if (numberOfPeople < 1) {
        leftSpan.style.display = 'block';
        numberOfPeopleInput.classList.add('orange-border');
    } else {
        leftSpan.style.display = 'none';
        numberOfPeopleInput.classList.remove('orange-border');
    }
}

function activeClassForReset() {
    if (!resetButton.classList.contains('active')) {
        resetButton.classList.add('active');
    }
}

numberOfPeopleInput.addEventListener('keyup', () => {
    if (numberOfPeopleInput.value == '' || numberOfPeopleInput.value < 1) {
        numberOfPeople = 0;
        numberOfPeopleInput.value = numberOfPeople;
    } else {
        numberOfPeople = parseInt(numberOfPeopleInput.value);
        numberOfPeopleInput.value = numberOfPeople;
    }
    tipAmount();
    totalAmount();
    spanChecker(numberOfPeople);
    activeClassForReset();
})

billInput.addEventListener('keyup', () => {
    spanChecker(numberOfPeople);
    activeClassForReset();
    if (billInput.value < 0.01) {
        billPrice = 0;
        billInput.value = billPrice;
    }
    else {
        billPrice = billInput.value;

    }
    tipAmount();
    totalAmount();
})

percentageInputsDiv.addEventListener('click', e => {
    if (e.target.classList == 'percentage-option' || e.target.classList == 'percentage-option active') {
        spanChecker(numberOfPeople);
        activeClassForReset();
        if (percentageInputsDiv.querySelectorAll('.active').length > 0) {
            if (e.target.classList.contains('active')) {
                e.target.classList.remove('active');
                tipShare = 0;
            } else if (percentageInputsDiv.querySelector('.custom-percentage-option.active')) {
                percentageInputsDiv.querySelector('.custom-percentage-option.active').value = 'CUSTOM';
                percentageInputsDiv.querySelector('.custom-percentage-option.active').classList.remove('active');
                e.target.classList.add('active');
                tipShare = parseFloat(e.target.value);
            } else {
                percentageInputsDiv.querySelector('.percentage-option.active').classList.remove('active');
                e.target.classList.add('active');
                tipShare = parseFloat(e.target.value);
            }
        } else {
            e.target.classList.add('active');
            tipShare = parseFloat(e.target.value);
        }
        tipAmount();
        totalAmount();
    }
})

customPercentageInput.addEventListener('change', () => {
    spanChecker(numberOfPeople);
    activeClassForReset();
    if (customPercentageInput.value < 0 || customPercentageInput.value < '') {
        customPercentageInput.value = 'CUSTOM';
        if (customPercentageInput.classList.contains('active')) {
            customPercentageInput.classList.remove('active');
            tipShare = 0;
        }
    } else {
        if (customPercentageInput.classList.contains('active')) {
            tipShare = parseFloat(customPercentageInput.value);
        } else if (percentageInputsDiv.querySelectorAll('.active').length > 0) {
            percentageInputsDiv.querySelector('.percentage-option.active').classList.remove('active');
            customPercentageInput.classList.add('active');
            tipShare = parseFloat(customPercentageInput.value);
        } else {
            customPercentageInput.classList.add('active');
            tipShare = parseFloat(customPercentageInput.value);
        }
    }
    tipAmount();
    totalAmount();
})

resetButton.addEventListener('click', () => {
    billPrice = 0;
    tipShare = 0;
    numberOfPeople = 0;
    billInput.value = billPrice;

    if (percentageInputsDiv.querySelectorAll('.active').length > 0) {
        if (customPercentageInput.classList.contains('active')) {
            customPercentageInput.value = 'CUSTOM';
        }
        percentageInputsDiv.querySelectorAll('.active')[0].classList.remove('active');
    }

    if (leftSpan.style.display == 'block') {
        leftSpan.style.display = 'none';
        numberOfPeopleInput.classList.remove('orange-border');
    }
    numberOfPeopleInput.value = numberOfPeople;
    tipAmount();
    totalAmount();
    if (resetButton.classList.contains('active')) {
        resetButton.classList.remove('active');
    }
})