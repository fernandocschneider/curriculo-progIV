function alterarTema() {
	const body = document.body;
    body.classList.toggle('dark');
}

// Espera o HTML da página carregar completamente
document.addEventListener('DOMContentLoaded', function() {

    // --- CONFIGURAÇÃO DAS HABILIDADES ---
    // Adicione ou remova habilidades nesta lista.
    // O 'id' deve ser o mesmo do <canvas> no HTML.
    // O 'level' é a porcentagem (0 a 100).
    // A 'cor' é a cor da barra de progresso.
    const skills = [
        { id: 'skillHtml',   cor: '#1e88e5' },
        { id: 'skillJs',     cor: '#1e88e5' },
        { id: 'skillJava',   cor: '#1e88e5' },
        { id: 'skillPython', cor: '#1e88e5' },
        { id: 'skillBanco',  cor: '#1e88e5' },
        { id: 'skillIngles', cor: '#1e88e5' },
        { id: 'skillEquipe', cor: '#1e88e5' }
    ];

    // Para cada habilidade na lista, crie a barra de progresso
    skills.forEach(skillInfo => {
        const canvas = document.getElementById(skillInfo.id);
        if (canvas) {
            const level = canvas.dataset.level;
            createSkillBar(canvas, level, skillInfo.cor);
        }
    });

});


/**
 * Função principal que desenha e anima uma barra de progresso no canvas.
 * @param {HTMLCanvasElement} canvas - O elemento canvas onde vamos desenhar.
 * @param {number} level - A porcentagem final da barra (0-100).
 * @param {string} barColor - A cor da barra de progresso.
 */
function createSkillBar(canvas, level, barColor) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const finalWidth = (width * level) / 100;

    let currentWidth = 0; // Largura inicial para a animação
    const animationDuration = 1500; // Duração em milissegundos (1.5s)
    let startTime = null;

    // Função que desenha um único quadro
    function draw(currentWidthValue) {
        // 1. Limpa o canvas
        ctx.clearRect(0, 0, width, height);

        // 2. Desenha a barra de fundo (cinza)
        ctx.fillStyle = '#e0e0e0';
        ctx.beginPath();
        ctx.roundRect(0, 0, width, height, [height / 2]); // Usa roundRect para bordas arredondadas
        ctx.fill();
        
        // 3. Desenha a barra de progresso (colorida)
        if (currentWidthValue > 0) {
            ctx.fillStyle = barColor;
            ctx.beginPath();
            // Garante que a barra não ultrapasse o fundo ao desenhar
            ctx.roundRect(0, 0, Math.min(currentWidthValue, width), height, [height / 2]);
            ctx.fill();
        }

        // 4. Desenha o texto da porcentagem
        ctx.fillStyle = '#fff'; // Cor do texto
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        // Posiciona o texto um pouco antes do final da barra
        ctx.fillText(level + '%', finalWidth - 10, height / 2);
    }

    // Função de animação que roda em loop
    function animate(timestamp) {
        if (!startTime) {
            startTime = timestamp;
        }

        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / animationDuration, 1); // Progresso de 0 a 1

        // Easing function (ease-out): começa rápido e desacelera
        const easeOutProgress = 1 - Math.pow(1 - progress, 3);
        
        currentWidth = finalWidth * easeOutProgress;

        draw(currentWidth); // Desenha o quadro atual

        if (progress < 1) {
            requestAnimationFrame(animate); // Continua a animação
        }
    }

    // Inicia a animação
    requestAnimationFrame(animate);
}

// Espera o HTML da página carregar completamente
document.addEventListener('DOMContentLoaded', function() {

    // --- CÓDIGO DAS BARRAS DE HABILIDADE (JÁ EXISTENTE) ---
    // (O código do canvas que fizemos antes continua aqui...)


    // --- NOVO CÓDIGO PARA SALVAR MENSAGENS DO FORMULÁRIO ---

    // 1. Encontra o formulário pelo ID
    const formContato = document.getElementById('form-contato');

    // 2. Adiciona um "escutador" para o evento de 'submit' (envio)
    formContato.addEventListener('submit', function(event) {
        
        // 3. Impede o comportamento padrão do formulário (que é recarregar a página)
        event.preventDefault();

        // 4. Coleta os dados dos campos do formulário
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const mensagem = document.getElementById('mensagem').value;

        // 5. Cria um objeto para organizar a mensagem, incluindo data e hora
        const novaMensagem = {
            nome: nome,
            email: email,
            mensagem: mensagem,
            data: new Date().toLocaleString('pt-BR') // Adiciona a data e hora do envio
        };

        // 6. Salva a mensagem no localStorage
        // Primeiro, tentamos pegar mensagens que já existem
        const mensagensSalvas = JSON.parse(localStorage.getItem('mensagens')) || [];
        
        // Depois, adicionamos a nova mensagem à lista
        mensagensSalvas.push(novaMensagem);

        // Por fim, salvamos a lista atualizada de volta no localStorage
        // Usamos JSON.stringify para transformar a lista de objetos em texto
        localStorage.setItem('mensagens', JSON.stringify(mensagensSalvas));

        // 7. Dá um feedback para o usuário e limpa o formulário
        alert(`Olá, ${nome}! Sua mensagem foi enviada com sucesso!`);
        formContato.reset();
    });

});