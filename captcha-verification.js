// Функция обратного вызова при успешном прохождении капчи
function onCaptchaSuccess(token) {
    // Проверяем токен с помощью hCaptcha API
    verifyCaptcha(token);
}

// Функция для проверки токена
async function verifyCaptcha(token) {
    try {
        // В реальном приложении здесь должен быть запрос к вашему серверу
        // Но так как требуется чисто клиентское решение, мы имитируем проверку
        
        // В клиентском режиме мы не можем безопасно проверить токен без сервера,
        // поэтому просто доверяем успешному ответу от hCaptcha
        // В реальном проекте НИКОГДА не проверяйте капчу на клиенте!
        
        // Сохраняем факт прохождения капчи в localStorage
        localStorage.setItem('captchaPassed', 'true');
        localStorage.setItem('captchaTimestamp', Date.now().toString());
        
        // Перенаправляем на главную страницу
        window.location.href = 'https://Normik-Chel.github.io/index.html';
    } catch (error) {
        console.error('Ошибка при проверке капчи:', error);
        document.getElementById('errorMsg').style.display = 'block';
        
        // Перезагружаем капчу
        hcaptcha.reset();
    }
}

// Проверяем, не проходил ли пользователь капчу recently
window.onload = function() {
    const captchaPassed = localStorage.getItem('captchaPassed');
    const captchaTimestamp = localStorage.getItem('captchaTimestamp');
    const twentyFourHours = 24 * 60 * 60 * 1000; // 24 часа в миллисекундах
    
    if (captchaPassed === 'true' && captchaTimestamp) {
        const currentTime = Date.now();
        const timePassed = currentTime - parseInt(captchaTimestamp);
        
        // Если прошло меньше 24 часов, перенаправляем сразу
        if (timePassed < twentyFourHours) {
            window.location.href = 'https://Normik-Chel.github.io/index.html';
        } else {
            // Удаляем устаревшие данные
            localStorage.removeItem('captchaPassed');
            localStorage.removeItem('captchaTimestamp');
        }
    }
};