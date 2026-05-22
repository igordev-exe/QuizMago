// Dados do Quiz
const quizData = [
    {
        question: "Qual é seu maior interesse?",
        options: [
            { text: "Análise de dados e automação", language: "python" },
            { text: "Desenvolvimento empresarial", language: "java" },
            { text: "Controle de hardware e performance", language: "cpp" },
            { text: "Desenvolvimento web interativo", language: "javascript" }
        ]
    },
    {
        question: "Como você prefere resolver problemas?",
        options: [
            { text: "Com elegância e simplicidade", language: "python" },
            { text: "Com estruturas bem definidas", language: "java" },
            { text: "Com máxima eficiência", language: "cpp" },
            { text: "De forma criativa e dinâmica", language: "javascript" }
        ]
    },
    {
        question: "Qual é seu tempo ideal de aprendizado?",
        options: [
            { text: "Rápido - quero resultados logo", language: "python" },
            { text: "Moderado - com bom entendimento", language: "java" },
            { text: "Detalhado - aprender tudo profundamente", language: "cpp" },
            { text: "Prático - aprendendo fazendo", language: "javascript" }
        ]
    },
    {
        question: "O que mais te motiva?",
        options: [
            { text: "Criar soluções inteligentes", language: "python" },
            { text: "Construir sistemas robustos", language: "java" },
            { text: "Otimizar e melhorar performance", language: "cpp" },
            { text: "Ver resultados visuais imediatos", language: "javascript" }
        ]
    },
    {
        question: "Qual ambiente você mais gosta?",
        options: [
            { text: "Backend, dados e scripts", language: "python" },
            { text: "Grandes projetos corporativos", language: "java" },
            { text: "Sistemas de tempo real", language: "cpp" },
            { text: "Frontend e experiência do usuário", language: "javascript" }
        ]
    }
];

// Dados das linguagens
const languages = {
    python: {
        title: "Python",
        level: "LV. 42",
        color: "#3674ad",
        description: "Você é um mago dos dados e da automação! Python é a linguagem mágica que transforma dados complexos em soluções elegantes e inteligentes.",
        skills: [
            "Alquimia de Dados - Manipule dados com precisão",
            "Rituais de Automação - Crie scripts poderosos",
            "Feitiçaria de ML - Implemente inteligência artificial",
            "Transmutação de Código - Escreva de forma limpa e simples"
        ],
        recommendation: "Perfeito para análise de dados, machine learning, scripts de automação e prototipagem rápida. Você será capaz de transformar dados em conhecimento valioso!"
    },
    java: {
        title: "Java",
        level: "LV. 67",
        color: "#c72c28",
        description: "Você é um construtor de impérios digitais! Java é o tomo dos espíritos ancestrais, capaz de criar sistemas monumentais e confiáveis.",
        skills: [
            "Espíritos de Objetos - Domine a programação orientada a objetos",
            "Estruturas de Primeira - Construa sistemas robustos",
            "Sigilo do Design - Aprenda padrões consagrados",
            "Portabilidade Mágica - Escreva uma vez, rode em qualquer lugar"
        ],
        recommendation: "Ideal para desenvolvimento empresarial, aplicações backend escaláveis e sistemas distribuídos. Você construirá a espinha dorsal das maiores aplicações!"
    },
    cpp: {
        title: "C / C++",
        level: "LV. 99",
        color: "#00a651",
        description: "Você é um mestre da magia suprema! C/C++ é o grimório ancestral que comanda os espíritos da máquina com poder absoluto.",
        skills: [
            "Vinculação de Memória - Gerencie recursos com precisão",
            "Rituais de Ponteiros - Domine o tabuleiro mágico real",
            "Comunhão com o SO - Fale diretamente com o sistema operacional",
            "Performance Absoluta - Crie código que voa"
        ],
        recommendation: "Essencial para sistemas operacionais, game engines, software crítico e quando performance é tudo. Você dominará o nível mais profundo da máquina!"
    },
    javascript: {
        title: "JavaScript",
        level: "LV. 55",
        color: "#f7df1e",
        description: "Você é um mago do reino digital visual! JavaScript é a magia da Web Arcana, trazendo vida e interatividade aos reinos virtuais.",
        skills: [
            "Manipulação do DOM - Transforme a página em tempo real",
            "Feitiçaria Assíncrona - Controle o fluxo do tempo digital",
            "Conjuração Reactiva - Crie interfaces dinâmicas",
            "Stack Completo - Domine frontend e backend"
        ],
        recommendation: "Perfeito para desenvolvimento web, interfaces interativas, aplicações móveis e até backend com Node.js. Você criará experiências mágicas para os usuários!"
    }
};

// Estado do Quiz
let currentQuestion = 0;
let answers = [];
let scores = {
    python: 0,
    java: 0,
    cpp: 0,
    javascript: 0
};

// Inicializar Quiz
function startQuiz() {
    document.getElementById('welcome-screen').classList.remove('active');
    document.getElementById('quiz-screen').classList.add('active');
    currentQuestion = 0;
    answers = [];
    scores = { python: 0, java: 0, cpp: 0, javascript: 0 };
    loadQuestion();
}

// Carregar Pergunta
function loadQuestion() {
    const question = quizData[currentQuestion];
    document.getElementById('question-text').textContent = question.question;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option.text;
        button.onclick = () => selectOption(option.language, button);
        optionsContainer.appendChild(button);
    });
    
    // Atualizar progresso
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    document.getElementById('progress').style.width = progress + '%';
    document.getElementById('question-counter').textContent = `Pergunta ${currentQuestion + 1} de ${quizData.length}`;
    
    // Atualizar botões
    document.getElementById('prev-btn').style.display = currentQuestion > 0 ? 'block' : 'none';
    document.getElementById('next-btn').textContent = currentQuestion === quizData.length - 1 ? 'REVELAR RESULTADO' : 'PRÓXIMA →';
}

// Selecionar Opção
function selectOption(language, button) {
    // Remover seleção anterior
    const allOptions = document.querySelectorAll('.option-btn');
    allOptions.forEach(opt => opt.classList.remove('selected'));
    
    // Adicionar seleção nova
    button.classList.add('selected');
    answers[currentQuestion] = language;
    scores[language]++;
}

// Próxima Pergunta
function nextQuestion() {
    if (answers[currentQuestion] === undefined) {
        alert('Por favor, selecione uma opção!');
        return;
    }
    
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        showResult();
    }
}

// Pergunta Anterior
function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
        
        // Restaurar seleção anterior
        const allOptions = document.querySelectorAll('.option-btn');
        const selectedLanguage = answers[currentQuestion];
        const question = quizData[currentQuestion];
        
        question.options.forEach((option, index) => {
            if (option.language === selectedLanguage) {
                allOptions[index].classList.add('selected');
            }
        });
    }
}

// Mostrar Resultado
function showResult() {
    document.getElementById('quiz-screen').classList.remove('active');
    document.getElementById('result-screen').classList.add('active');
    
    // Encontrar linguagem com maior pontuação
    let winningLanguage = 'python';
    let maxScore = 0;
    
    for (const [lang, score] of Object.entries(scores)) {
        if (score > maxScore) {
            maxScore = score;
            winningLanguage = lang;
        }
    }
    
    // Mostrar resultado
    const result = languages[winningLanguage];
    document.getElementById('language-title').textContent = result.title;
    document.getElementById('language-level').textContent = result.level;
    document.getElementById('result-description').textContent = result.description;
    document.getElementById('recommendation').textContent = result.recommendation;
    
    const skillsList = document.getElementById('skills-list');
    skillsList.innerHTML = '';
    result.skills.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        skillsList.appendChild(li);
    });
    
    // Mudar cor do livro baseado na linguagem
    const bookCover = document.querySelector('.book-cover');
    if (winningLanguage === 'python') {
        bookCover.style.borderColor = result.color;
        bookCover.style.boxShadow = `0 20px 60px rgba(0, 0, 0, 0.8), inset 0 0 20px rgba(54, 116, 173, 0.2), 0 0 30px rgba(54, 116, 173, 0.3)`;
    } else if (winningLanguage === 'java') {
        bookCover.style.borderColor = result.color;
        bookCover.style.boxShadow = `0 20px 60px rgba(0, 0, 0, 0.8), inset 0 0 20px rgba(199, 44, 40, 0.2), 0 0 30px rgba(199, 44, 40, 0.3)`;
    } else if (winningLanguage === 'cpp') {
        bookCover.style.borderColor = result.color;
        bookCover.style.boxShadow = `0 20px 60px rgba(0, 0, 0, 0.8), inset 0 0 20px rgba(0, 166, 81, 0.2), 0 0 30px rgba(0, 166, 81, 0.3)`;
    } else {
        bookCover.style.borderColor = result.color;
        bookCover.style.boxShadow = `0 20px 60px rgba(0, 0, 0, 0.8), inset 0 0 20px rgba(247, 223, 30, 0.2), 0 0 30px rgba(247, 223, 30, 0.3)`;
    }
}

// Reiniciar Quiz
function restartQuiz() {
    document.getElementById('result-screen').classList.remove('active');
    document.getElementById('welcome-screen').classList.add('active');
    currentQuestion = 0;
    answers = [];
    scores = { python: 0, java: 0, cpp: 0, javascript: 0 };
}

// Compartilhar Resultado
function shareResult() {
    // Encontrar linguagem com maior pontuação
    let winningLanguage = 'python';
    let maxScore = 0;
    
    for (const [lang, score] of Object.entries(scores)) {
        if (score > maxScore) {
            maxScore = score;
            winningLanguage = lang;
        }
    }
    
    const result = languages[winningLanguage];
    const text = `🧙 Descobri meu Tomo Mágico no QuizMago! Sou um mago de ${result.title}! 📚✨\n\n${result.description}\n\nVocê também quer descobrir sua linguagem mágica?`;
    
    // Copiar para clipboard
    navigator.clipboard.writeText(text).then(() => {
        alert('Resultado copiado para compartilhar!');
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    console.log('QuizMago carregado e pronto para a magia!');
});
