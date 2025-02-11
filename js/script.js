let stepCount = 0;
const stepsKm = 1316;
let lastAcceleration = { x: 0, y: 0, z: 0 };
let stepThreshold = 1.2; // Ajustável para melhor precisão

function updateCounters() {
    document.querySelector('.counter1').textContent = stepCount;
    document.querySelector('.counter2').textContent = (stepCount / stepsKm).toFixed(2);
}

// Função para processar dados do acelerômetro e detectar passos
function handleMotionEvent(event) {
    let acc = event.accelerationIncludingGravity;

    if (!acc) return;

    let deltaX = Math.abs(acc.x - lastAcceleration.x);
    let deltaY = Math.abs(acc.y - lastAcceleration.y);
    let deltaZ = Math.abs(acc.z - lastAcceleration.z);

    let accelerationMagnitude = deltaX + deltaY + deltaZ;

    if (accelerationMagnitude > stepThreshold) {
        stepCount++;
        updateCounters();
    }

    lastAcceleration = { x: acc.x, y: acc.y, z: acc.z };
}

// Verificar permissão no iOS
function requestPermission() {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    window.addEventListener("devicemotion", handleMotionEvent);
                } else {
                    alert("Permissão negada para acessar o acelerômetro.");
                }
            })
            .catch(console.error);
    } else {
        // Para Android e navegadores que não precisam de permissão
        window.addEventListener("devicemotion", handleMotionEvent);
    }
}

// Inicializar a detecção quando a página carregar
document.addEventListener("DOMContentLoaded", requestPermission);


function requestMotionPermission() {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        // Exibir um pop-up solicitando permissão ao usuário
        DeviceMotionEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    // Se permitido, iniciar o sensor
                    window.addEventListener("devicemotion", handleMotionEvent);
                } else {
                    alert("Permissão negada para acessar o acelerômetro.");
                }
            })
            .catch(error => {
                console.error("Erro ao solicitar permissão:", error);
                alert("Seu navegador não suporta ou bloqueou o acesso ao acelerômetro.");
            });
    } else {
        // Para Android e navegadores que não precisam de permissão
        window.addEventListener("devicemotion", handleMotionEvent);
    }
}

// Captura os dados do acelerômetro e detecta passos
function handleMotionEvent(event) {
    if (!event.accelerationIncludingGravity) return;

    let acc = event.accelerationIncludingGravity;
    console.log("Acelerômetro:", acc.x, acc.y, acc.z);

    // Aqui você pode adicionar lógica para detectar passos...
}

// Chamar a função ao clicar em um botão ou tocar na tela (necessário no iOS)
document.addEventListener("click", requestMotionPermission);
