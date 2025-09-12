// Конфигурация
const SITE_URL = "https://Normik-Chel.github.io";
const CAPTCHA_DURATION = 24 * 60 * 60 * 1000; // 24 часа в миллисекундах

// Функция обратного вызова при успешном прохождении капчи
function onCaptchaSuccess(token) {
    // Сохраняем факт прохождения капчи
    const captchaData = {
        passed: true,
        timestamp: Date.now(),
        token: token
    };
    
    localStorage.setItem('captchaVerification', JSON.stringify(captchaData));
    
    // Перенаправляем на главную страницу
    window.location.href = `${SITE_URL}/index.html`;
}

// Проверяем, не проходил ли пользователь капчу recently
document.addEventListener('DOMContentLoaded', function() {
    const captchaData = localStorage.getItem('captchaVerification');
    
    if (captchaData) {
        try {
            const data = JSON.parse(captchaData);
            const currentTime = Date.now();
            const timePassed = currentTime - data.timestamp;
            
            // Если прошло меньше установленного времени, перенаправляем сразу
            if (data.passed && timePassed < CAPTCHA_DURATION) {
                window.location.href = `${SITE_URL}/index.html`;
                return;
            }
        } catch (e) {
            console.error('Ошибка при чтении данных капчи:', e);
            localStorage.removeItem('captchaVerification');
        }
    }
    
    // Если капча не была пройдена или устарела, показываем страницу с капчей
    // Добавляем обработчик ошибок hCaptcha
    if (typeof hcaptcha !== 'undefined') {
        hcaptcha.render = function() {
            console.log('hCaptcha is ready');
        };
        
        // Обработка ошибок hCaptcha
        window.onload = function() {
            if (typeof hcaptcha === 'undefined') {
                showError('Ошибка загрузки hCaptcha. Пожалуйста, обновите страницу.');
            }
        };
    } else {
        showError('Ошибка загрузки hCaptcha. Пожалуйста, обновите страницу.');
    }
});

// Функция для отображения ошибок
function showError(message) {
    const errorElement = document.getElementById('errorMsg');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

// Для отладки в консоли
console.log('Captcha wall loaded');
