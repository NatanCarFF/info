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

    // --- Nova funcionalidade: Feedback ao copiar informações de contato ---
    const contactInfo = document.querySelector('.contact-info');
    if (contactInfo) {
        contactInfo.querySelectorAll('p').forEach(pElement => {
            const iconElement = pElement.querySelector('.icon');
            // Evita adicionar listener ao link do LinkedIn
            if (iconElement && !pElement.querySelector('a')) {
                pElement.style.cursor = 'pointer'; // Indica que é clicável
                pElement.addEventListener('click', () => {
                    const textToCopy = pElement.textContent.replace(iconElement.textContent, '').trim(); // Remove o texto do ícone
                    navigator.clipboard.writeText(textToCopy)
                        .then(() => {
                            // Cria e exibe a mensagem de feedback
                            const feedbackMessage = document.createElement('span');
                            feedbackMessage.textContent = 'Copiado!';
                            feedbackMessage.style.cssText = `
                                position: absolute;
                                background-color: var(--accent-color);
                                color: white;
                                padding: 4px 8px;
                                border-radius: 4px;
                                font-size: 0.8em;
                                opacity: 0;
                                transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
                                transform: translateY(10px);
                                z-index: 10;
                                white-space: nowrap; /* Garante que o texto não quebre */
                                left: 50%;
                                transform: translateX(-50%) translateY(10px);
                                bottom: -25px; /* Posição abaixo do texto */
                            `;
                            pElement.style.position = 'relative'; // Garante posicionamento relativo para o feedback
                            pElement.appendChild(feedbackMessage);

                            // Animação de entrada
                            setTimeout(() => {
                                feedbackMessage.style.opacity = '1';
                                feedbackMessage.style.transform = 'translateX(-50%) translateY(0)';
                            }, 10); // Pequeno atraso para a transição

                            // Animação de saída e remoção da mensagem
                            setTimeout(() => {
                                feedbackMessage.style.opacity = '0';
                                feedbackMessage.style.transform = 'translateX(-50%) translateY(-10px)';
                                feedbackMessage.addEventListener('transitionend', () => {
                                    feedbackMessage.remove();
                                });
                            }, 1500); // Exibe por 1.5 segundos
                        })
                        .catch(err => {
                            console.error('Falha ao copiar:', err);
                        });
                });
            }
        });
    }
});