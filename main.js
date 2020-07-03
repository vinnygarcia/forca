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
        <p>Escreva uma letra para começar o jogo</p>
        <input type="text" id="palavra" placeholder="Escreva aqui...">
        <button type="button" id="playButton">Jogar!</button>
        `.trim();
        gameBox.innerHTML = initialHtml;
    }
    showInitialHtml()

    function getWordOnClick(){
        const playButton = document.querySelector("#playButton");
        playButton.onclick = () => {
            //Pega a palavra digitada
            let palavraInput = document.querySelector("#palavra");
            word = palavraInput.value; //definido no começo
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
            <p>Você tem ${nTentativas} tentativas.</p>
            <h2 wm-impressaoForca>${impressaoForca}</h2>
            <p>Chute uma letra:</p>
            <form name="letterForm">
            <input wm-letra type="text" placeholder="Digite 1 letra...">
            <button wm-letter-button>OK</button>
            </form>
            `.trim()
            // Pegar letra chutada
            letterButton = document.querySelector('[wm-letter-button]')
            let novaP = document.createElement('p') //Criar novo elemento para inserir letras acertadas e erradas.
            letterButton.after(novaP) // Insere o elemento novaP criado depois do botão
            letterButton.onclick = (event) => {
                event.preventDefault() // Previne que o browser atualize a página pra enviar o formulário.
                let letraChutada = document.querySelector('[wm-letra]').value
                if (word.includes(letraChutada)) {
                    correctLetters.add(letraChutada)
                    console.log('possui a letra')
                }
                else {
                    wrongLetters.add(letraChutada)
                    console.log("não possui a letra")
                }
                // Atualizar na tela as palavras acertadas e incorretas
                novaP.innerHTML = `
                <p>Letras acertadas: ${Array.from(correctLetters).join(', ')}</p>
                <p>Letras erradas: ${Array.from(wrongLetters).join(', ')}</p>`.trim()
                // Atualizar a forca
                imprimirForca()
                let impressaoForcaHtml = document.querySelector('[wm-impressaoForca]')
                impressaoForcaHtml.innerHTML = `${impressaoForca.toUpperCase()}`
                // Apagar o valor do input de texto.
                document.querySelector('[wm-letra]').value = ''

            }

        };

    }
    getWordOnClick();

    // Tela 2 - Começar o jogo (deve ser ativado só depois de pegar a palavra).
    function startGame() {
        // Separa as letras
        console.log('hey')

    }

};

