
let stepCount = 0;
const stepsKm = 1493;


function updateCounters() {

    const stepCounter = document.querySelector('.counter1');
    stepCounter.textContent = stepCount;

    
    const kmCounter = document.querySelector('.counter2');
    const kms = (stepCount / stepsKm).toFixed(0);
    kmCounter.textContent = kms;
}


function incrementSteps() {
    stepCount++;
    updateCounters();
}
