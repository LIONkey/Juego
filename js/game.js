document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURACIÓN DEL JUEGO ---
    const boardSpaces = [
        { name: 'Entrada', type: 'go' },
        { name: 'Ensayo Corto', type: 'property', price: 60, color: 'brown' },
        { name: 'Arca Comunal', type: 'community-chest' },
        { name: 'Poema Lírico', type: 'property', price: 60, color: 'brown' },
        { name: 'Venta de Libros 1', type: 'bookstore', price: 200 },
        { name: 'Biblioteca Carlos Cuauhtémoc Sánchez', type: 'library', price: 150 },
        { name: 'Artículo de Opinión', type: 'property', price: 100, color: 'light-blue' },
        { name: 'Pregunta', type: 'chance' },
        { name: 'Crónica Periodística', type: 'property', price: 100, color: 'light-blue' },
        { name: 'Biografía', type: 'property', price: 120, color: 'light-blue' },
        { name: 'Cárcel / Visita', type: 'jail' },
        { name: 'Cuento de Hadas', type: 'property', price: 140, color: 'pink' },
        { name: 'Arca Comunal', type: 'community-chest' },
        { name: 'Fábula', type: 'property', price: 140, color: 'pink' },
        { name: 'Mito', type: 'property', price: 160, color: 'pink' },
        { name: 'Biblioteca  José María Arguedas', type: 'library', price: 150 },
        { name: 'Novela Corta', type: 'property', price: 180, color: 'orange' },
        { name: 'Pregunta', type: 'chance' },
        { name: 'Guion Teatral', type: 'property', price: 180, color: 'orange' },
        { name: 'Discurso Político', type: 'property', price: 200, color: 'orange' },
        { name: 'Rincón de Lectura', type: 'free-parking' },
        { name: 'Texto Expositivo', type: 'property', price: 220, color: 'red' },
        { name: 'Arca Comunal', type: 'community-chest' },
        { name: 'Texto Argumentativo', type: 'property', price: 220, color: 'red' },
        { name: 'Monografía', type: 'property', price: 240, color: 'red' },
        { name: 'Biblioteca Gabriel García Márquez', type: 'library', price: 150 },
        { name: 'Novela de Ficción', type: 'property', price: 260, color: 'yellow' },
        { name: 'Novela Histórica', type: 'property', price: 260, color: 'yellow' },
        { name: 'Venta de Libros 2', type: 'bookstore', price: 200 },
        { name: 'Saga Fantástica', type: 'property', price: 280, color: 'yellow' },
        { name: '¡A la Cárcel!', type: 'go-to-jail' },
        { name: 'Manifiesto Literario', type: 'property', price: 300, color: 'green' },
        { name: 'Tratado Filosófico', type: 'property', price: 300, color: 'green' },
        { name: 'Pregunta', type: 'chance' },
        { name: 'Enciclopedia', type: 'property', price: 320, color: 'green' },
        { name: 'Biblioteca Clorinda Matto de Turner', type: 'library', price: 150 },
        { name: 'Arca Comunal', type: 'community-chest' },
        { name: 'Tesis Doctoral', type: 'property', price: 350, color: 'dark-blue' },
        { name: 'Venta de Libros 3', type: 'bookstore', price: 200 },
        { name: 'Obra Maestra', type: 'property', price: 400, color: 'dark-blue' },
    ];

    const communityChestCards = [
        { text: 'Ganas un concurso de poesía. Recibe $100.', action: 'addMoney', amount: 100 },
        { text: 'Error de imprenta a tu favor. Recibe $20 de cada jugador.', action: 'collectFromPlayers', amount: 20 },
        { text: 'Paga la suscripción a la revista literaria. Paga $50.', action: 'payMoney', amount: 50 },
        { text: '¡Vendes los derechos de tu libro! Recibe $200.', action: 'addMoney', amount: 200 },
        { text: 'Ve a la Cárcel. Ve directamente, no pases por la Entrada.', action: 'goToJail' },
        { text: 'Avanza a la Entrada.', action: 'goTo', position: 0 },
        { text: 'El club de lectura te nombra miembro de honor. Recibe $25.', action: 'addMoney', amount: 25 },
        { text: 'Multa por devolver un libro tarde. Paga $15.', action: 'payMoney', amount: 15 },
    ];

    const chanceCards = [
        { 
            question: '¿Cuáles son las 3 partes principales de un texto expositivo?', 
            answer: 'introducción, desarrollo, conclusión',
            options: ['Introducción, desarrollo, conclusión', 'Inicio, nudo, desenlace', 'Tesis, argumentos, refutación']
        },
        { 
            question: 'Menciona un sinónimo de la palabra "alegre".', 
            answer: 'contento',
            options: ['Triste', 'Contento', 'Enojado']
        },
        { 
            question: '¿Qué tipo de palabra describe una acción?', 
            answer: 'verbo',
            options: ['Sustantivo', 'Adjetivo', 'Verbo']
        },
        { 
            question: 'La oración "El sol brilla" es:', 
            answer: 'bimembre',
            options: ['Unimembre', 'Bimembre', 'Compuesta']
        },
         { 
            question: '¿Qué figura literaria es "Tus ojos son dos luceros"?', 
            answer: 'metáfora', // CORREGIDO: Antes era 'verbo'
            options: ['verbo', 'Metáfora', 'Hipérbole']
        },

    { 
        question: '¿Qué función tiene la introducción en un texto expositivo?', 
        answer: 'presentar el tema que se va a desarrollar',
        options: ['Contar una historia', 'Presentar el tema que se va a desarrollar', 'Dar instrucciones al lector']
    },
    { 
        question: '¿Qué figura literaria se encuentra en la frase "Sus manos eran de hielo"?', 
        answer: 'metáfora',
        options: ['Símil', 'Hipérbole', 'Metáfora']
    },
    { 
        question: '¿Cuál de estas oraciones está escrita en modo imperativo?', 
        answer: 'Lava los platos, por favor.',
        options: ['Lava los platos, por favor.', 'Yo lavé los platos.', 'Los platos están sucios.']
    },
    { 
        question: '¿Qué tipo de texto tiene como propósito principal convencer?', 
        answer: 'argumentativo',
        options: ['Narrativo', 'Expositivo', 'Argumentativo']
    },
    { 
        question: '¿Qué tipo de palabra es "inteligentemente"?', 
        answer: 'adverbio',
        options: ['Adjetivo', 'Sustantivo', 'Adverbio']
    },
    { 
        question: '¿Cuál es la diferencia principal entre un texto narrativo y uno descriptivo?', 
        answer: 'El narrativo cuenta hechos; el descriptivo explica cómo es algo.',
        options: ['El descriptivo tiene personajes', 'El narrativo solo describe objetos', 'El narrativo cuenta hechos; el descriptivo explica cómo es algo.']
    },
    { 
        question: '¿Qué función cumple el sujeto en una oración?', 
        answer: 'Indica quién realiza la acción',
        options: ['Describe el objeto', 'Indica quién realiza la acción', 'Explica el lugar de la acción']
    },
    { 
        question: '¿Cuál de estas oraciones es una oración simple?', 
        answer: 'El perro duerme.',
        options: ['El perro duerme.', 'El perro duerme y el gato juega.', 'El perro duerme cuando hace frío.']
    },
    { 
        question: '¿Qué tipo de texto explica pasos para hacer algo?', 
        answer: 'instructivo',
        options: ['Descriptivo', 'Narrativo', 'Instructivo']
    },
    { 
        question: '¿Cuál de estas palabras es un sustantivo abstracto?', 
        answer: 'felicidad',
        options: ['Perro', 'Mesa', 'Felicidad']
    },
    { 
        question: '¿Qué significa la palabra "hipérbole" en una figura literaria?', 
        answer: 'Exageración de una idea o situación',
        options: ['Repetición de palabras', 'Comparación directa', 'Exageración de una idea o situación']
    }

    ];

    let players = [
        { id: 1, name: 'Jugador 1', money: 1500, position: 0, properties: [], questionsAnswered: 0, inJail: false, jailTurns: 0, pieceElement: null, hasStarted: false, skippedNextTurn: false }, // Añadida propiedad skippedNextTurn
        { id: 2, name: 'Jugador 2', money: 1500, position: 0, properties: [], questionsAnswered: 0, inJail: false, jailTurns: 0, pieceElement: null, hasStarted: false, skippedNextTurn: false } // Añadida propiedad skippedNextTurn
    ];
    let currentPlayerIndex = 0;
    // let questionBlocked = false; // Eliminada variable global questionBlocked

    // --- ELEMENTOS DEL DOM ---
    const boardElement = document.querySelector('.board');
    const rollDiceBtn = document.getElementById('roll-dice-btn');
    const die1Element = document.getElementById('die1');
    const die2Element = document.getElementById('die2');
    const messageLog = document.getElementById('message-log');
    
    // Modal elements
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalActions = document.getElementById('modal-actions');

    // --- FUNCIONES DEL JUEGO ---

    function setupBoard() {
        boardSpaces.forEach((space, i) => {
            const spaceEl = document.createElement('div');
            spaceEl.id = `space-${i}`;
            spaceEl.classList.add('space');

            let content = `<div class="name">${space.name}</div>`;
            if (space.type === 'property' || space.type === 'library' || space.type === 'bookstore') {
                if (space.color) {
                   content = `<div class="color-bar ${space.color}"></div>` + content;
                }
                content += `<div class="price">$${space.price}</div>`;
            } else {
                spaceEl.classList.add('corner');
                let iconClass = '';
                let specialText = '';
                switch(space.type) {
                    case 'go': iconClass = 'fa-solid fa-arrow-right'; specialText = 'Recibe $200'; break;
                    case 'jail': iconClass = 'fa-solid fa-gavel'; specialText = '(De visita)'; break;
                    case 'free-parking': iconClass = 'fa-solid fa-book-reader'; break;
                    case 'go-to-jail': iconClass = 'fa-solid fa-skull-crossbones'; break;
                    case 'community-chest': iconClass = 'fa-solid fa-box-archive'; break;
                    case 'chance': iconClass = 'fa-solid fa-question'; break;
                }
                content = `<div class="name">${space.name}</div><i class="icon ${iconClass}"></i><div class="price">${specialText}</div>`;
            }
            
            spaceEl.innerHTML = content;
            boardElement.appendChild(spaceEl);
        });

        const centerDiv = document.createElement('div');
        centerDiv.className = 'center-board';
        centerDiv.innerHTML = `
            <div>
                <h2>Arca Comunal</h2>
                <div class="card-pile"><i class="fa-solid fa-box-archive"></i></div>
            </div>
            <div>
                <h2>Preguntas</h2>
                <div class="card-pile"><i class="fa-solid fa-question"></i></div>
            </div>
        `;
        boardElement.appendChild(centerDiv);
    }

    function setupPlayers() {
        players.forEach(p => {
            const piece = document.createElement('div');
            piece.id = `player-${p.id}-piece`;
            piece.className = `player-piece player-${p.id}`;
            p.pieceElement = piece;
            document.getElementById('space-0').appendChild(piece);
        });
        updatePlayerPanels();
    }
    
    function addLogMessage(message) {
        const p = document.createElement('p');
        p.innerHTML = message;
        messageLog.prepend(p);
    }

    function updatePlayerPanels() {
        players.forEach(p => {
            document.getElementById(`p${p.id}-money`).textContent = p.money;
            document.getElementById(`p${p.id}-props`).textContent = p.properties.length;
            document.getElementById(`p${p.id}-questions`).textContent = p.questionsAnswered;
            
            const panel = document.getElementById(`player${p.id}-panel`);
            if (p.id === players[currentPlayerIndex].id) {
                panel.classList.add('active-player-panel');
            } else {
                panel.classList.remove('active-player-panel');
            }
        });
    }
    
    function switchPlayer() {
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        const currentPlayer = players[currentPlayerIndex];
        addLogMessage(`Es el turno del <strong>${currentPlayer.name}</strong>.`);
        rollDiceBtn.disabled = false;
        // Eliminado el chequeo de questionBlocked aquí, ahora se maneja en rollDice
        updatePlayerPanels();
    }
    
    function rollDice() {
        const currentPlayer = players[currentPlayerIndex];

        // Nueva lógica para el turno saltado por pregunta incorrecta/saltada
        if (currentPlayer.skippedNextTurn) {
            addLogMessage(`<strong>${currentPlayer.name}</strong> perdió su turno por no responder la pregunta correctamente o por saltársela.`);
            currentPlayer.skippedNextTurn = false; // Restablecer el indicador
            switchPlayer(); // Pasar al siguiente jugador
            return; // Salir de la función sin tirar dados ni mover
        }

        rollDiceBtn.disabled = true;
        const die1 = Math.floor(Math.random() * 6) + 1;
        const die2 = Math.floor(Math.random() * 6) + 1;
        const total = die1 + die2;

        die1Element.style.transform = `rotate(${Math.random() * 360}deg)`;
        die2Element.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        setTimeout(() => {
            die1Element.innerHTML = `<i class="fas fa-dice-${['one', 'two', 'three', 'four', 'five', 'six'][die1 - 1]}"></i>`;
            die2Element.innerHTML = `<i class="fas fa-dice-${['one', 'two', 'three', 'four', 'five', 'six'][die2 - 1]}"></i>`;
        }, 250);
        
        setTimeout(() => {
            if (!currentPlayer.hasStarted) {
                if (total >= 4) {
                    addLogMessage(`${currentPlayer.name} sacó ${total}. ¡Empieza a moverse!`);
                    currentPlayer.hasStarted = true;
                    movePlayer(total);
                } else {
                    addLogMessage(`${currentPlayer.name} sacó ${total}. Necesita 4 o más para empezar.`);
                    switchPlayer();
                }
            } else {
                 movePlayer(total);
            }
        }, 500);
    }

    function movePlayer(steps) {
        const currentPlayer = players[currentPlayerIndex];
        
        if (currentPlayer.inJail) {
            addLogMessage(`<strong>${currentPlayer.name}</strong> está en la cárcel.`);
            currentPlayer.jailTurns++;
            if (currentPlayer.jailTurns >= 2) {
                currentPlayer.inJail = false;
                currentPlayer.jailTurns = 0;
                addLogMessage(`<strong>${currentPlayer.name}</strong> ha salido de la cárcel.`);
            } else {
                addLogMessage(`Le quedan ${2 - currentPlayer.jailTurns} turnos en la cárcel.`);
            }
            switchPlayer();
            return;
        }

        const oldPosition = currentPlayer.position;
        
        addLogMessage(`<strong>${currentPlayer.name}</strong> se mueve ${steps} casillas.`);

        let currentPos = oldPosition;
        const interval = setInterval(() => {
            // Check for passing GO
            if (currentPos === boardSpaces.length - 1) {
                addLogMessage(`<strong>${currentPlayer.name}</strong> pasó por la Entrada y cobra $200.`);
                currentPlayer.money += 200;
                updatePlayerPanels();
            }
            
            currentPos = (currentPos + 1) % boardSpaces.length;
            document.getElementById(`space-${currentPos}`).appendChild(currentPlayer.pieceElement);
            
            if (steps === 1) {
                clearInterval(interval);
                currentPlayer.position = currentPos;
                handleSpaceAction();
            }
            steps--;

        }, 150);
    }

    function handleSpaceAction() {
        const currentPlayer = players[currentPlayerIndex];
        const space = boardSpaces[currentPlayer.position];
        addLogMessage(`<strong>${currentPlayer.name}</strong> ha caído en <strong>${space.name}</strong>.`);

        switch(space.type) {
            case 'property':
            case 'library':
            case 'bookstore':
                handleProperty(currentPlayer, space);
                break;
            case 'community-chest':
                drawCommunityChestCard();
                break;
            case 'chance':
                drawChanceCard();
                break;
            case 'go-to-jail':
                goToJail(currentPlayer);
                break;
            default:
                setTimeout(switchPlayer, 500);
        }
    }

    function handleProperty(player, space) {
        const owner = players.find(p => p.properties.includes(space.name));
        if (!owner) {
            showModal(
                `Comprar ${space.name}`,
                `<p>¿Quieres comprar esta propiedad por <strong>$${space.price}</strong>?</p>`,
                [
                    { text: 'Comprar', classes: 'bg-green-700', handler: () => buyProperty(player, space) },
                    { text: 'Pasar', classes: 'bg-gray-500', handler: () => { closeModal(); switchPlayer(); } }
                ]
            );
        } else if (owner.id !== player.id) {
            const rent = Math.floor(space.price * 0.1); // Simplified rent
            player.money -= rent;
            owner.money += rent;
            addLogMessage(`<strong>${player.name}</strong> paga $${rent} de renta a <strong>${owner.name}</strong>.`);
            updatePlayerPanels();
            switchPlayer();
        } else {
            addLogMessage(`<strong>${player.name}</strong> ya es dueño de esta propiedad.`);
            switchPlayer();
        }
    }

    function buyProperty(player, space) {
        if (player.money >= space.price) {
            player.money -= space.price;
            player.properties.push(space.name);
            addLogMessage(`<strong>${player.name}</strong> ha comprado <strong>${space.name}</strong>.`);
            
            document.getElementById(`space-${boardSpaces.indexOf(space)}`).classList.add(`owner-p${player.id}`);

            updatePlayerPanels();
            checkWinCondition(player);
        } else {
            addLogMessage(`<strong>${player.name}</strong> no tiene suficiente dinero para comprar <strong>${space.name}</strong>.`);
        }
        closeModal();
        switchPlayer();
    }

    function drawCommunityChestCard() {
        const card = communityChestCards[Math.floor(Math.random() * communityChestCards.length)];
        const currentPlayer = players[currentPlayerIndex];

        showModal('Arca Comunal', `<p class="text-xl text-center">${card.text}</p>`, [{ text: 'OK', classes: 'bg-amber-800', handler: () => {
            closeModal();
            executeCardAction(currentPlayer, card);
        }}]);
    }
    
    function executeCardAction(player, card) {
        let playerSwitch = true;
        addLogMessage(`<em>${card.text}</em>`);
        switch(card.action) {
            case 'addMoney': player.money += card.amount; break;
            case 'payMoney': player.money -= card.amount; break; // Corregido: antes era player.amount
            case 'collectFromPlayers':
                players.forEach(p => { if (p.id !== player.id) { p.money -= card.amount; player.money += card.amount; } });
                break;
            case 'goToJail': 
                goToJail(player); 
                playerSwitch = false; // goToJail ya cambia de jugador
                break;
            case 'goTo':
                let steps = (card.position - player.position + boardSpaces.length) % boardSpaces.length;
                movePlayer(steps);
                playerSwitch = false; // movePlayer ya cambia de jugador
                break;
        }
        updatePlayerPanels();
        if (playerSwitch) {
            switchPlayer();
        }
    }

    function drawChanceCard() {
        const card = chanceCards[Math.floor(Math.random() * chanceCards.length)];
        const currentPlayer = players[currentPlayerIndex];
        
        let optionsHTML = '<div class="space-y-3 mt-4">';
        card.options.forEach(option => {
            optionsHTML += `<button class="w-full p-3 bg-stone-200 hover:bg-amber-200 rounded-lg shadow-sm transition-colors option-btn">${option}</button>`;
        });
        optionsHTML += '</div>';

        showModal(
            'Pregunta',
            `<p class="font-bold">${card.question}</p>${optionsHTML}`,
            [{ text: 'Saltar Turno', classes: 'bg-red-700', handler: () => {
                currentPlayer.skippedNextTurn = true; // El jugador salta el turno y pierde el siguiente
                addLogMessage(`<strong>${currentPlayer.name}</strong> ha decidido saltar la pregunta. Perderá su próximo turno.`);
                closeModal();
                switchPlayer();
            }}]
        );

        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.onclick = () => checkAnswer(btn.textContent, card.answer);
        });
    }
    
    function checkAnswer(selectedOption, correctAnswer) {
        const currentPlayer = players[currentPlayerIndex];
        const normalizedSelection = selectedOption.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const normalizedAnswer = correctAnswer.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        if (normalizedSelection.includes(normalizedAnswer)) {
            addLogMessage('<strong>¡Respuesta correcta!</strong>');
            currentPlayer.questionsAnswered++;
            updatePlayerPanels();
            checkWinCondition(currentPlayer);
        } else {
            addLogMessage('<strong>Respuesta incorrecta.</strong> No podrás avanzar hasta responderla bien. Pierdes tu próximo turno.');
            currentPlayer.skippedNextTurn = true; // El jugador responde incorrectamente y pierde el siguiente turno
        }
        closeModal();
        switchPlayer();
    }

    function goToJail(player) {
        player.inJail = true;
        player.position = boardSpaces.findIndex(s => s.type === 'jail');
        document.getElementById(`space-${player.position}`).appendChild(player.pieceElement);
        addLogMessage(`<strong>${player.name}</strong> va a la cárcel.`);
        switchPlayer();
    }

    function checkWinCondition(player) {
        if (player.properties.length >= 8 && player.questionsAnswered >= 5) {
            showModal(
                '¡Felicidades!',
                `<p class="text-3xl font-bold text-center text-green-700">${player.name} ha ganado el juego!</p>`,
                [{ text: 'Jugar de Nuevo', classes: 'bg-green-600', handler: () => location.reload() }]
            );
            rollDiceBtn.disabled = true;
        }
    }
    
    function showModal(title, body, actions) {
        modalTitle.innerHTML = title;
        modalBody.innerHTML = body;
        modalActions.innerHTML = '';
        actions.forEach(action => {
            const button = document.createElement('button');
            button.textContent = action.text;
            button.className = `modal-button ${action.classes}`;
            // Asignar clases de color específicas
            // Preferiblemente, estas clases de color deberían estar definidas en el CSS
            // y ser parte de action.classes para una mejor separación de preocupaciones.
            if (action.text === 'Comprar') button.style.backgroundColor = '#2e7d32';
            if (action.text === 'Pasar') button.style.backgroundColor = '#616161';
            if (action.text === 'Saltar Turno') button.style.backgroundColor = '#c62828';
            if (action.text === 'OK') button.style.backgroundColor = '#6d4c41';
            if (action.text === 'Jugar de Nuevo') button.style.backgroundColor = '#2e7d32';
            
            button.onclick = action.handler;
            modalActions.appendChild(button);
        });
        modalBackdrop.classList.remove('hidden');
        modal.classList.remove('hidden');
    }

    function closeModal() {
        modalBackdrop.classList.add('hidden');
        modal.classList.add('hidden');
    }

    // --- INICIALIZACIÓN ---
    rollDiceBtn.addEventListener('click', rollDice); // Simplificado: la lógica de pregunta bloqueada se maneja dentro de rollDice

    setupBoard();
    setupPlayers();
});