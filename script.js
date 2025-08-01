document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('checkbox');
    const body = document.body;
    const themeText = document.querySelector('.theme-text'); // Seleciona o span do texto do tema

    // Função para aplicar o tema
    const applyTheme = (isDark) => {
        if (isDark) {
            body.classList.add('dark-theme');
            themeText.textContent = 'Tema Claro';
        } else {
            body.classList.remove('dark-theme');
            themeText.textContent = 'Tema Escuro';
        }
    };

    // Verifica a preferência do usuário no localStorage
    // 'null' significa que não há preferência salva, então checa a preferência do sistema
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
        // Se houver tema salvo, aplica-o
        const isDark = savedTheme === 'dark';
        themeToggle.checked = isDark;
        applyTheme(isDark);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Se não houver tema salvo, mas o sistema prefere escuro, aplica o tema escuro
        themeToggle.checked = true;
        applyTheme(true);
    } else {
        // Padrão para tema claro se nenhuma preferência for encontrada ou for explícitamente clara
        themeToggle.checked = false;
        applyTheme(false);
    }

    // Event Listener para alternar o tema
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            applyTheme(true);
            localStorage.setItem('theme', 'dark');
        } else {
            applyTheme(false);
            localStorage.setItem('theme', 'light');
        }
    });
});