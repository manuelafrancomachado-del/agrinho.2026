// ============================================
// SCRIPT DO PROJETO AGRINHO 2026
// Funcionalidades: Quiz, Acessibilidade
// ============================================

// ===== DADOS DO QUIZ =====
// Perguntas sobre hábitos ambientais e uso de agrotóxicos
const perguntas = [
    {
        texto: "Você utiliza agrotóxicos na sua plantação?",
        alternativas: [
            "Sim, uso frequentemente sem controle",
            "Uso, mas sigo as recomendações técnicas",
            "Uso apenas quando necessário e em pouca quantidade",
            "Não uso agrotóxicos, prefiro métodos naturais"
        ],
        pontuacao: [0, 2, 3, 4]
    },
    {
        texto: "Como você lida com restos de colheita e mato?",
        alternativas: [
            "Faço queimadas para limpar o terreno",
            "Deixo acumular sem nenhum cuidado",
            "Faço compostagem ou uso como cobertura do solo",
            "Reutilizo como adubo orgânico"
        ],
        pontuacao: [0, 1, 3, 4]
    },
    {
        texto: "Você se preocupa com a conservação do solo?",
        alternativas: [
            "Não, solo é solo, não precisa de cuidado",
            "Pouco, mas sei que é importante",
            "Sim, faço rotação de culturas",
            "Sim, uso técnicas como plantio direto e terraceamento"
        ],
        pontuacao: [0, 1, 3, 4]
    },
    {
        texto: "Como você cuida da água na sua propriedade?",
        alternativas: [
            "Não me preocupo, água é infinita",
            "Uso água sem controle",
            "Reutilizo água da chuva e evito desperdício",
            "Protejo nascentes e faço captação sustentável"
        ],
        pontuacao: [0, 1, 3, 4]
    },
    {
        texto: "Você conhece técnicas de agricultura sustentável?",
        alternativas: [
            "Não conheço nenhuma",
            "Já ouvi falar mas não aplico",
            "Conheço e aplico algumas",
            "Conheço bem e ensino para outros agricultores"
        ],
        pontuacao: [0, 1, 3, 4]
    }
];

let perguntaAtual = 0;
let pontuacaoTotal = 0;
let pontuacaoMaxima = 0; // será calculada

// Calcula pontuação máxima possível
for (let i = 0; i < perguntas.length; i++) {
    pontuacaoMaxima += Math.max(...perguntas[i].pontuacao);
}

// ===== FUNÇÕES DO QUIZ =====
function carregarPergunta() {
    const pergunta = perguntas[perguntaAtual];
    document.getElementById("pergunta-texto").innerHTML = pergunta.texto;
    
    const alternativasContainer = document.getElementById("alternativas-container");
    alternativasContainer.innerHTML = "";
    
    for (let i = 0; i < pergunta.alternativas.length; i++) {
        const botao = document.createElement("button");
        botao.className = "alternativa";
        botao.innerHTML = pergunta.alternativas[i];
        botao.onclick = (function(indice) {
            return function() { responder(indice); };
        })(i);
        alternativasContainer.appendChild(botao);
    }
}

function responder(indiceAlternativa) {
    const pontos = perguntas[perguntaAtual].pontuacao[indiceAlternativa];
    pontuacaoTotal += pontos;
    
    perguntaAtual++;
    
    if (perguntaAtual < perguntas.length) {
        carregarPergunta();
    } else {
        mostrarResultado();
    }
}

function mostrarResultado() {
    // Esconde container de perguntas e mostra resultado
    document.getElementById("pergunta-container").style.display = "none";
    document.getElementById("resultado-container").style.display = "block";
    
    // Calcula percentual
    const percentual = (pontuacaoTotal / pontuacaoMaxima) * 100;
    let mensagem = "";
    let dicas = [];
    
    if (percentual >= 80) {
        mensagem = "🌿 Excelente! Você tem práticas muito sustentáveis. Continue assim e inspire outros agricultores!";
        dicas = [
            "✓ Compartilhe seu conhecimento com a comunidade",
            "✓ Continue evitando agrotóxicos excessivos",
            "✓ Participe de cooperativas de agricultura sustentável"
        ];
    } else if (percentual >= 50) {
        mensagem = "🌱 Bom trabalho! Você já tem alguns cuidados, mas pode melhorar ainda mais.";
        dicas = [
            "✓ Reduza gradualmente o uso de agrotóxicos",
            "✓ Nunca use queimadas - prefira compostagem",
            "✓ Proteja nascentes e evite desperdício de água",
            "✓ Faça rotação de culturas para preservar o solo"
        ];
    } else if (percentual >= 25) {
        mensagem = "⚠️ Atenção! Suas práticas precisam de mudanças para proteger o meio ambiente.";
        dicas = [
            "✓ Substitua agrotóxicos por controle biológico",
            "✓ Pare imediatamente com queimadas",
            "✓ Comece uma composteira com restos orgânicos",
            "✓ Procure a EMATER local para orientação técnica"
        ];
    } else {
        mensagem = "🚨 Alerta! Suas práticas estão causando danos graves ao solo, água e meio ambiente. Mude agora!";
        dicas = [
            "✓ AGORA: Nunca mais use queimadas",
            "✓ AGORA: Reduza 50% do uso de agrotóxicos",
            "✓ AGORA: Plante árvores nativas",
            "✓ Procure ajuda técnica urgentemente"
        ];
    }
    
    document.getElementById("resultado-texto").innerHTML = mensagem + `<br><strong>Sua pontuação: ${pontuacaoTotal} de ${pontuacaoMaxima}</strong>`;
    
    // Exibe dicas personalizadas
    const dicasContainer = document.getElementById("dicas-container");
    dicasContainer.innerHTML = "<h4>📌 Dicas para melhorar suas práticas:</h4><ul>";
    for (let dica of dicas) {
        dicasContainer.innerHTML += `<li>${dica}</li>`;
    }
    dicasContainer.innerHTML += "</ul>";
}

function reiniciarQuiz() {
    perguntaAtual = 0;
    pontuacaoTotal = 0;
    
    document.getElementById("pergunta-container").style.display = "block";
    document.getElementById("resultado-container").style.display = "none";
    
    carregarPergunta();
}

// ===== ACESSIBILIDADE =====
function setupAcessibilidade() {
    const botaoAcessibilidade = document.getElementById("botaoAcessibilidade");
    const menuAcessibilidade = document.getElementById("menuAcessibilidade");
    let menuVisivel = false;
    
    // Abrir/fechar menu de acessibilidade
    botaoAcessibilidade.addEventListener("click", () => {
        menuVisivel = !menuVisivel;
        if (menuVisivel) {
            menuAcessibilidade.classList.add("mostrar");
        } else {
            menuAcessibilidade.classList.remove("mostrar");
        }
    });
    
    // Aumentar fonte
    document.getElementById("aumentarFonte").addEventListener("click", () => {
        let tamanhoAtual = parseFloat(getComputedStyle(document.body).fontSize);
        if (tamanhoAtual < 24) {
            document.body.style.fontSize = (tamanhoAtual + 2) + "px";
        }
    });
    
    // Diminuir fonte
    document.getElementById("diminuirFonte").addEventListener("click", () => {
        let tamanhoAtual = parseFloat(getComputedStyle(document.body).fontSize);
        if (tamanhoAtual > 12) {
            document.body.style.fontSize = (tamanhoAtual - 2) + "px";
        }
    });
    
    // Alto contraste
    let contrasteAtivo = false;
    document.getElementById("altoContraste").addEventListener("click", () => {
        if (!contrasteAtivo) {
            document.body.classList.add("alto-contraste");
            contrasteAtivo = true;
            document.getElementById("altoContraste").innerHTML = "🌓 Modo Normal";
        } else {
            document.body.classList.remove("alto-contraste");
            contrasteAtivo = false;
            document.getElementById("altoContraste").innerHTML = "🌓 Alto Contraste";
        }
    });
}

// ===== INICIALIZAÇÃO =====
document.addEventListener("DOMContentLoaded", () => {
    // Inicia o quiz
    carregarPergunta();
    
    // Configura botão de reiniciar quiz
    const botaoReiniciar = document.getElementById("reiniciar-quiz");
    if (botaoReiniciar) {
        botaoReiniciar.addEventListener("click", reiniciarQuiz);
    }
    
    // Configura acessibilidade
    setupAcessibilidade();
    
    // Fecha menu ao clicar fora (opcional)
    document.addEventListener("click", (event) => {
        const menu = document.getElementById("menuAcessibilidade");
        const botao = document.getElementById("botaoAcessibilidade");
        if (menuVisivel && !menu.contains(event.target) && event.target !== botao) {
            menu.classList.remove("mostrar");
            menuVisivel = false;
        }
    });
});

// Variável global para controlar visibilidade do menu
let menuVisivel = false;
