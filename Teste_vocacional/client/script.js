let currentQuestion = 1;
let totalQuestions = 28;
let responses = [];

function nextQuestion() {
    // Obter a resposta da pergunta atual
    let select = document.getElementById(`q${currentQuestion}-select`);
    let answer = select.value;

    // Validar se a pergunta foi respondida
    if (answer === "") {
        alert('Por favor, selecione uma resposta.');
        return;
    }

    // Armazenar ou atualizar a resposta
    responses[currentQuestion - 1] = answer;

    // Atualizar o progresso
    let progressPercentage = (currentQuestion / totalQuestions) * 100;
    document.getElementById('progressBar').style.width = progressPercentage + "%";

    // Esconder a pergunta atual
    document.getElementById(`q${currentQuestion}`).style.display = 'none';

    // Avançar para a próxima pergunta
    currentQuestion++;
    if (currentQuestion <= totalQuestions) {
        document.getElementById(`q${currentQuestion}`).style.display = 'block';
    } else {
        // Se todas as perguntas foram respondidas, enviar o teste
        submitTest();
    }
}

async function submitTest() {
    try {
        const response = await fetch('/api/vocational-test', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ responses })
        });
        
        if (!response.ok) {
            throw new Error('Erro na comunicação com a API');
        }

        const result = await response.json();

        // Exibir o resultado dos cursos sugeridos
        document.getElementById('suggestedCourses').innerText = result.suggestedCourses.join(', ');
        document.getElementById('result').style.display = 'block';
    } catch (error) {
        console.error('Erro:', error);
        alert('Houve um erro ao processar suas respostas. Tente novamente mais tarde.');
    }
}

function resetTest() {
    currentQuestion = 1;
    responses = [];
    document.getElementById('progressBar').style.width = '0%';
    document.querySelectorAll('.question').forEach((q) => q.style.display = 'none');
    document.getElementById('q1').style.display = 'block';
    document.getElementById('result').style.display = 'none';
}