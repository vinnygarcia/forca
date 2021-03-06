// TODO Aceitar somente input de 1 letra por vez, ou então aceitar multiplas letras corretamente
// TODO Adicinar opção de iniciar com palavras armazenadas.
// TODO dicas

window.onload = () => {
    let word = 'palavraOriginal'
    let impressaoForca = ''
    let nTentativas = 5
    let gameBox = document.querySelector("#gameBox");
    let correctLetters = new Set()
    let wrongLetters = new Set()
    // Tela 1 - Pegar palavra.
    let showInitialHtml = () =>{
        //Mostra um menu para digitar a palavra e começar o jogo
        let initialHtml = `
        <p>Escreva uma palavra para jogar</p>
        <form wordForm>
            <input type="text" id="palavra" name="palavraName" placeholder="Escreva aqui...">
            <button id="playButton">Jogar!</button>
        </form>
        `.trim();
        gameBox.innerHTML = initialHtml;
    }
    showInitialHtml()

    function getWordOnClick(){
        const wordForm = document.querySelector("[wordForm]");
        wordForm.palavraName.focus() // Seleciona o input text chamado "palavra name" e o foca
        wordForm.onsubmit = (event) => {
            event.preventDefault()
            //Pega a palavra digitada
            let palavraInput = document.querySelector("#palavra");
            word = palavraInput.value.toLowerCase(); //definido no começo
            console.log(word);
            // Dividir a palavra em letras
            let wordLetters = word.split('');

            function imprimirForca () {
                impressaoForca = ''
                wordLetters.forEach(letter => {
                    console.log(letter);
                    if (correctLetters.has(letter)) {
                        impressaoForca += letter
                    } else {
                        impressaoForca += '_'
                    };
                });
            }
            imprimirForca();
            console.log(impressaoForca);

            // Iniciar tela da forca
            gameBox.innerHTML = `
            <p>A palavra tem ${word.length} letras.</p>
            <p p-nTentativas>Você tem ${nTentativas} tentativas.</p>
            <h2 wm-impressaoForca>${impressaoForca}</h2>
            <p>Chute uma letra:</p>
            <form letterForm>
            <input wm-letra type="text" placeholder="Digite 1 letra...">
            <button wm-letter-button>OK</button>
            </form>
            `.trim()
            //Focar o input
            document.querySelector('[wm-letra]').focus()
            // Pegar letra chutada
            letterButton = document.querySelector('[wm-letter-button]')
            let novaP = document.createElement('p') //Criar novo elemento para inserir letras acertadas e erradas.
            letterButton.after(novaP) // Insere o elemento novaP criado depois do botão
            let letterForm = document.querySelector('[letterForm]')
            letterForm.onsubmit = (event) => {
                event.preventDefault() // Previne que o browser atualize a página pra enviar o formulário.
                let letraChutada = document.querySelector('[wm-letra]').value.toLowerCase()
                if (word.includes(letraChutada)) {
                    correctLetters.add(letraChutada)
                    console.log('possui a letra')
                }
                else {
                    wrongLetters.add(letraChutada)
                    console.log("não possui a letra")
                    nTentativas -= 1
                }
                // Atualizar na tela as palavras acertadas e incorretas
                novaP.innerHTML = `
                <p>Letras acertadas: ${Array.from(correctLetters).join(', ')}</p>
                <p>Letras erradas: ${Array.from(wrongLetters).join(', ')}</p>`.trim()
                // Atualizar a forca
                imprimirForca()
                let impressaoForcaHtml = document.querySelector('[wm-impressaoForca]')
                impressaoForcaHtml.innerHTML = `${impressaoForca.toUpperCase()}`
                // Atualizar número de tentativas
                document.querySelector('[p-nTentativas]')
                .innerHTML= `Você tem ${nTentativas}`
                // Apagar o valor do input de texto.
                document.querySelector('[wm-letra]').value = ''
                //Focar o input
                document.querySelector('[wm-letra]').focus()
                // Checar perca ou ganho
                checkLoss(nTentativas)
                checkWin()
            }

        };

    }
    getWordOnClick();

    // Funções usadas ---------------------------------------------
    function checkLoss(nTentativas) { 
        if (nTentativas === 0) {
            alert(`Voce perdeu! :(\nA palavra correta era ${word.toUpperCase()}\nTente de novo!`)
            // Redirecionar para a página para reiniciar o jogo.
            const urlAtual = window.location.href
            window.location.href = urlAtual
        }
    }
    function checkWin() {
        const wordLetters = word.split('')
        const wordLettersSet = new Set(wordLetters) 
        if (wordLettersSet.size === correctLetters.size) {
            alert(`Você acertou!!! :)\nA palavra era ${word.toUpperCase()}\nContinue assim!`)
            // Redirecionar para a página para reiniciar o jogo.
            const urlAtual = window.location.href
            window.location.href = urlAtual
        }
        
    }

};

