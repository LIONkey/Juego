document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DEL TEMA (MODO OSCURO/CLARO) ---
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;

    // Aplica el tema guardado al cargar la página
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        if (savedTheme === 'dark-mode') {
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
            localStorage.setItem('theme', 'light-mode');
        } else {
            body.classList.add('dark-mode');
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
            localStorage.setItem('theme', 'dark-mode');
        }
    });


    // --- CONSTANTES DEL JUEGO ---
    const SPACE_TYPES = {
        GO: 'go',
        PROPERTY: 'property',
        COMMUNITY_CHEST: 'community-chest',
        CHANCE: 'chance',
        BOOKSTORE: 'bookstore',
        LIBRARY: 'library',
        JAIL: 'jail',
        FREE_PARKING: 'free-parking',
        GO_TO_JAIL: 'go-to-jail',
    };

    // --- CONFIGURACIÓN DEL JUEGO ---
    const boardSpaces = [
        { name: 'GO', type: SPACE_TYPES.GO, icon: 'fa-solid fa-rocket' },
        { name: 'Ensayo Corto', type: SPACE_TYPES.PROPERTY, price: 60, color: 'brown', propIcon: 'fa-solid fa-feather-pointed' },
        { name: 'Arca Comunal', type: SPACE_TYPES.COMMUNITY_CHEST, icon: 'fa-solid fa-box-archive' },
        { name: 'Poema Lírico', type: SPACE_TYPES.PROPERTY, price: 60, color: 'brown', propIcon: 'fa-solid fa-pen-fancy' },
        { name: 'Tienda de Cómics', type: SPACE_TYPES.BOOKSTORE, price: 200, icon: 'fa-solid fa-store' },
        { name: 'Biblioteca C.Matto de Turner', type: SPACE_TYPES.LIBRARY, price: 150, propIcon: 'fa-solid fa-book-journal-whills' },
        { name: 'Artículo de Opinión', type: SPACE_TYPES.PROPERTY, price: 100, color: 'light-blue', propIcon: 'fa-solid fa-newspaper' },
        { name: 'Preguntas', type: SPACE_TYPES.CHANCE, icon: 'fa-solid fa-question' },
        { name: 'Crónica Periodística', type: SPACE_TYPES.PROPERTY, price: 100, color: 'light-blue', propIcon: 'fa-solid fa-camera-retro' },
        { name: 'Biografía', type: SPACE_TYPES.PROPERTY, price: 120, color: 'light-blue', propIcon: 'fa-solid fa-person' },
        { name: 'DETENCIÓN', type: SPACE_TYPES.JAIL, icon: 'fa-solid fa-hourglass-half' },
        { name: 'Cuentos', type: SPACE_TYPES.PROPERTY, price: 140, color: 'pink', propIcon: 'fa-solid fa-book-sparkles' },
        { name: 'Arca Comunal', type: SPACE_TYPES.COMMUNITY_CHEST, icon: 'fa-solid fa-box-archive' },
        { name: 'Fábula', type: SPACE_TYPES.PROPERTY, price: 140, color: 'pink', propIcon: 'fa-solid fa-dove' },
        { name: 'Mito', type: SPACE_TYPES.PROPERTY, price: 160, color: 'pink', propIcon: 'fa-solid fa-bolt' },
        { name: 'Biblioteca José M. Arguedas', type: SPACE_TYPES.LIBRARY, price: 150, propIcon: 'fa-solid fa-book-journal-whills' },
        { name: 'Novela Corta', type: SPACE_TYPES.PROPERTY, price: 180, color: 'orange', propIcon: 'fa-solid fa-book' },
        { name: 'Preguntas', type: SPACE_TYPES.CHANCE, icon: 'fa-solid fa-question' },
        { name: 'Guion Teatral', type: SPACE_TYPES.PROPERTY, price: 180, color: 'orange', propIcon: 'fa-solid fa-masks-theater' },
        { name: 'Discurso Político', type: SPACE_TYPES.PROPERTY, price: 200, color: 'orange', propIcon: 'fa-solid fa-landmark' },
        { name: 'Club de Lectura', type: SPACE_TYPES.FREE_PARKING, icon: 'fa-solid fa-mug-saucer' },
        { name: 'Texto Expositivo', type: SPACE_TYPES.PROPERTY, price: 220, color: 'red', propIcon: 'fa-solid fa-file-export' },
        { name: 'Arca Comunal', type: SPACE_TYPES.COMMUNITY_CHEST, icon: 'fa-solid fa-box-archive' },
        { name: 'Texto Argumentativo', type: SPACE_TYPES.PROPERTY, price: 220, color: 'red', propIcon: 'fa-solid fa-comments' },
        { name: 'Monografía', type: SPACE_TYPES.PROPERTY, price: 240, color: 'red', propIcon: 'fa-solid fa-file-signature' },
        { name: 'Biblioteca G. García Márquez', type: SPACE_TYPES.LIBRARY, price: 150, propIcon: 'fa-solid fa-book-journal-whills' },
        { name: 'Novela de Ficción', type: SPACE_TYPES.PROPERTY, price: 260, color: 'yellow', propIcon: 'fa-solid fa-book-open' },
        { name: 'Novela Histórica', type: SPACE_TYPES.PROPERTY, price: 260, color: 'yellow', propIcon: 'fa-solid fa-scroll' },
        { name: 'Librería Antigua', type: SPACE_TYPES.BOOKSTORE, price: 200, icon: 'fa-solid fa-store' },
        { name: 'SAGA Fantástica', type: SPACE_TYPES.PROPERTY, price: 280, color: 'yellow', propIcon: 'fa-solid fa-dragon' },
        { name: '¡A LA DETENCIÓN!', type: SPACE_TYPES.GO_TO_JAIL, icon: 'fa-solid fa-user-secret' },
        { name: 'Manifiesto Literario', type: SPACE_TYPES.PROPERTY, price: 300, color: 'green', propIcon: 'fa-solid fa-flag' },
        { name: 'Tratado Filosófico', type: SPACE_TYPES.PROPERTY, price: 300, color: 'green', propIcon: 'fa-solid fa-lightbulb' },
        { name: 'Preguntas', type: SPACE_TYPES.CHANCE, icon: 'fa-solid fa-question' },
        { name: 'Enciclopedia', type: SPACE_TYPES.PROPERTY, price: 320, color: 'green', propIcon: 'fa-solid fa-atlas' },
        { name: 'Biblioteca Carlos C.Sánchez', type: SPACE_TYPES.LIBRARY, price: 150, propIcon: 'fa-solid fa-book-journal-whills' },
        { name: 'Arca Comunal', type: SPACE_TYPES.COMMUNITY_CHEST, icon: 'fa-solid fa-box-archive' },
        { name: 'Tesis Doctoral', type: SPACE_TYPES.PROPERTY, price: 350, color: 'dark-blue', propIcon: 'fa-solid fa-graduation-cap' },
        { name: 'Feria del Libro', type: SPACE_TYPES.BOOKSTORE, price: 200, icon: 'fa-solid fa-store' },
        { name: 'Obra Maestra', type: SPACE_TYPES.PROPERTY, price: 400, color: 'dark-blue', propIcon: 'fa-solid fa-crown' },
    ];

    const communityChestCards = [
        { text: 'Ganas un concurso de poesía. Recibe $100.', action: 'addMoney', amount: 100 },
        { text: 'Error de imprenta a tu favor. Recibe $20.', action: 'addMoney', amount: 20 },
        { text: 'Paga la suscripción a la revista literaria. Paga $50.', action: 'payMoney', amount: 50 },
        { text: '¡Vendes los derechos de tu libro! Recibe $200.', action: 'addMoney', amount: 200 },
        { text: 'Ve a A LA DETENCION. Ve directamente, no pases por la Entrada.', action: 'goToJail' },
        { text: 'Avanza a la Entrada.', action: 'goTo', position: 0 },
        { text: 'El club de lectura te nombra miembro de honor. Recibe $25.', action: 'addMoney', amount: 25 },
        { text: 'Multa por devolver un libro tarde. Paga $15.', action: 'payMoney', amount: 15 },
        { text: 'Heredas una colección de primeras ediciones. Recibe $150.', action: 'addMoney', amount: 150 },
        { text: 'Paga por la restauración de un manuscrito antiguo. Paga $75.', action: 'payMoney', amount: 75 },
        { text: 'Tu blog literario se vuelve viral. Ganas $50.', action: 'addMoney', amount: 50 },
        { text: 'Sales libre de LA DETENCION. Guarda esta tarjeta.', action: 'getOutOfJailFree' },
        { text: 'Ve a la Biblioteca más cercana. Si no tiene dueño, puedes comprarla.', action: 'goToNearest', type: 'library' },
        { text: 'Donación a la biblioteca pública. Paga $40.', action: 'payMoney', amount: 40 },
        { text: 'Recibes regalías por tus obras pasadas. Cobra $100.', action: 'addMoney', amount: 100 },
        { text: 'Ganas una beca para escritores. Recibe $120.', action: 'addMoney', amount: 120 },
    ];

    const chanceCards = [
        { question: '¿Cuáles son las 3 partes principales de un texto expositivo?', answer: 'introducción, desarrollo, conclusión', options: ['Introducción, desarrollo, conclusión', 'Inicio, nudo, desenlace', 'Tesis, argumentos, refutación'] },
        { question: 'Menciona un sinónimo de la palabra "alegre".', answer: 'contento', options: ['Triste', 'Contento', 'Enojado'] },
        { question: '¿Qué tipo de palabra describe una acción?', answer: 'verbo', options: ['Sustantivo', 'Adjetivo', 'Verbo'] },
        { question: '¿Qué figura literaria es "Tus ojos son dos luceros"?', answer: 'metáfora', options: ['Símil', 'Metáfora', 'Hipérbole'] },
        { question: '¿Qué tipo de texto tiene como propósito principal convencer?', answer: 'argumentativo', options: ['Narrativo', 'Expositivo', 'Argumentativo'] },
        { question: '¿Cuál de estas palabras es un sustantivo abstracto?', answer: 'felicidad', options: ['Perro', 'Mesa', 'Felicidad'] },
        { question: 'En la oración "La casa es grande", ¿cuál es el adjetivo?', answer: 'grande', options: ['Casa', 'La', 'Grande'] },
        { question: '¿Cómo se llama el punto y seguido en una oración?', answer: 'signo de puntuación', options: ['Punto final', 'Signo de puntuación', 'Acento'] },
        { question: '¿Qué es un hiato?', answer: 'dos vocales juntas que se pronuncian en sílabas separadas', options: ['Dos vocales en una sílaba', 'Dos vocales juntas que se pronuncian en sílabas separadas', 'Una consonante y una vocal'] },
        { question: '¿Quién escribió "Cien años de soledad"?', answer: 'gabriel garcía márquez', options: ['Mario Vargas Llosa', 'Julio Cortázar', 'Gabriel García Márquez'] },
        { question: '¿Cuál es el antónimo de "rápidido"?', answer: 'lento', options: ['Veloz', 'Lento', 'Fugaz'] },
        { question: '¿Qué tipo de palabra es "rápidamente"?', answer: 'adverbio', options: ['Adjetivo', 'Adverbio', 'Verbo'] },
        { question: '¿"El Quijote" es una obra de qué autor?', answer: 'miguel de cervantes', options: ['Miguel de Cervantes', 'Lope de Vega', 'Francisco de Quevedo'] },
        { question: '¿Qué es una onomatopeya?', answer: 'una palabra que imita un sonido', options: ['Una comparación', 'Una exageración', 'Una palabra que imita un sonido'] },
        { question: '¿Cuál es el sujeto en: "El gato negro duerme en el sofá"?', answer: 'el gato negro', options: ['El gato negro', 'Duerme', 'En el sofá'] },
        { question: '¿Qué es un sinónimo?', answer: 'una palabra que significa lo mismo que otra', options: ['Una palabra con significado opuesto', 'Una palabra que suena igual', 'Una palabra que significa lo mismo que otra'] },
    ];
    
    // --- ESTADO DEL JUEGO ---
    let players = [
        { id: 1, name: 'Jugador 1', money: 1500, position: 0, properties: [], questionsAnswered: 0, inJail: false, jailTurns: 0, pieceElement: null, skippedNextTurn: false, getOutOfJailFreeCards: 0, pieceIcon: 'fa-user-astronaut' },
        { id: 2, name: 'Jugador 2', money: 1500, position: 0, properties: [], questionsAnswered: 0, inJail: false, jailTurns: 0, pieceElement: null, skippedNextTurn: false, getOutOfJailFreeCards: 0, pieceIcon: 'fa-book' }
    ];
    let currentPlayerIndex = 0;
    let communityChestDeck = [];
    let chanceDeck = [];

    // --- ELEMENTOS DEL DOM ---
    const boardElement = document.querySelector('.board');
    const rollDiceBtn = document.getElementById('roll-dice-btn');
    const die1Element = document.getElementById('die1');
    const die2Element = document.getElementById('die2');
    const messageLog = document.getElementById('message-log');
    
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const modalActions = document.getElementById('modal-actions');
    
    let communityChestPile, chancePile;

    // --- FUNCIONES DE INICIALIZACIÓN ---
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function createDecks() {
        communityChestDeck = shuffle([...communityChestCards]);
        chanceDeck = shuffle([...chanceCards]);
    }
    
    function setupBoard() {
        boardSpaces.forEach((space, i) => {
            const spaceEl = document.createElement('div');
            spaceEl.id = `space-${i}`;
            spaceEl.classList.add('space');
            let content = `<div class="name">${space.name}</div>`;
            
            if (space.type === SPACE_TYPES.PROPERTY || space.type === SPACE_TYPES.BOOKSTORE || space.type === SPACE_TYPES.LIBRARY) {
                if (space.color) { content = `<div class="color-bar ${space.color}"></div>` + content; }
                content += `<div class="price">$${space.price}</div>`;
            } else {
                spaceEl.classList.add('corner');
                let specialText = '';
                switch(space.type) {
                    case SPACE_TYPES.GO: specialText = 'Recibe $200'; break;
                    case SPACE_TYPES.JAIL: specialText = '(De visita)'; break;
                }
                content += `<i class="icon ${space.icon}"></i><div class="price">${specialText}</div>`;
            }
            spaceEl.innerHTML = content;
            boardElement.appendChild(spaceEl);
        });

        const centerDiv = document.createElement('div');
        centerDiv.className = 'center-board';
        centerDiv.innerHTML = `
            <div class="card-group">
                <h2>Arca Comunal</h2>
                <div id="community-chest-pile" class="card-pile"><i class="fa-solid fa-box-archive"></i></div>
            </div>
            <div class="card-group">
                <h2>Preguntas</h2>
                <div id="chance-pile" class="card-pile"><i class="fa-solid fa-question"></i></div>
            </div>
        `;
        boardElement.appendChild(centerDiv);
        communityChestPile = document.getElementById('community-chest-pile');
        chancePile = document.getElementById('chance-pile');
    }
    
    function setupEventListeners() {
        rollDiceBtn.addEventListener('click', rollDice);
        communityChestPile.addEventListener('click', () => {
            const currentPlayer = players[currentPlayerIndex];
            const currentSpace = boardSpaces[currentPlayer.position];
            if (communityChestPile.classList.contains('active') && currentSpace.type === SPACE_TYPES.COMMUNITY_CHEST) {
                communityChestPile.classList.remove('active');
                drawCommunityChestCard();
            }
        });
        chancePile.addEventListener('click', () => {
            const currentPlayer = players[currentPlayerIndex];
            const currentSpace = boardSpaces[currentPlayer.position];
            if (chancePile.classList.contains('active') && currentSpace.type === SPACE_TYPES.CHANCE) {
                chancePile.classList.remove('active');
                drawChanceCard();
            }
        });
    }

    function setupPlayers() {
        players.forEach(p => {
            const piece = document.createElement('div');
            piece.id = `player-${p.id}-piece`;
            piece.className = `player-piece player-${p.id}`; 
            piece.innerHTML = `<i class="fa-solid ${p.pieceIcon}"></i>`;
            
            p.pieceElement = piece;
            document.getElementById('space-0').appendChild(piece);

            if (p.id === 1) {
                p.pieceElement.style.transform = 'translate(-75%, -75%)';
            } else if (p.id === 2) {
                p.pieceElement.style.transform = 'translate(-25%, -25%)';
            }
        });
        updateAllPlayerPanels();
    }
    
    // --- LÓGICA DE UI Y VISUALIZACIÓN ---

    function addLogMessage(message) {
        const p = document.createElement('p');
        p.innerHTML = message;
        messageLog.prepend(p);
        messageLog.scrollTop = 0;
    }

    function showMoneyAnimation(player, amount) {
        const playerPanel = document.getElementById(`player${player.id}-panel`);
        if (!playerPanel) return;

        const moneyContainer = playerPanel.querySelector('.money-container');
        if (!moneyContainer) return;

        const animationEl = document.createElement('div');
        animationEl.className = 'money-change';
        if (amount > 0) {
            animationEl.textContent = `+$${amount}`;
            animationEl.classList.add('gain');
        } else {
            animationEl.textContent = `-$${Math.abs(amount)}`;
            animationEl.classList.add('loss');
        }

        moneyContainer.appendChild(animationEl);

        setTimeout(() => {
            animationEl.remove();
        }, 1500); // Duración de la animación en CSS
    }

    function updateAllPlayerPanels() {
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
            renderProperties(p);

            const playerTitleElement = document.querySelector(`.player-${p.id}-title`); 
            if (playerTitleElement) {
                playerTitleElement.innerHTML = `<i class="fa-solid ${p.pieceIcon}"></i> ${p.name}`;
            }
        });
    }
    
    function renderProperties(player) {
        const container = document.getElementById(`p${player.id}-properties`);
        container.innerHTML = '';
        player.properties.forEach(propName => {
            const propData = boardSpaces.find(s => s.name === propName);
            if (!propData) return;
            const card = document.createElement('div');
            card.className = 'property-card';
            card.innerHTML = `
                <div class="color-bar ${propData.color || ''}" style="background-color: ${propData.color}"></div>
                <i class="prop-icon ${propData.propIcon || 'fa-solid fa-file-lines'}"></i>
                <div class="name">${propData.name}</div>
                <div class="price">$${propData.price}</div>
            `;
            container.appendChild(card);
        });
    }

    // --- LÓGICA PRINCIPAL DEL JUEGO ---

    function switchPlayer() {
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        const currentPlayer = players[currentPlayerIndex];
        addLogMessage(`Es el turno de <strong>${currentPlayer.name}</strong>.`);
        
        updateAllPlayerPanels();
        
        if (currentPlayer.inJail) {
            handleJailTurn(currentPlayer);
        } else {
            rollDiceBtn.disabled = false;
        }
        checkWinCondition(currentPlayer);
        checkGameOver();
    }
    
    function rollDice() {
        const currentPlayer = players[currentPlayerIndex];

        if (currentPlayer.skippedNextTurn) {
            addLogMessage(`<strong>${currentPlayer.name}</strong> pierde su turno por una pregunta incorrecta.`);
            currentPlayer.skippedNextTurn = false;
            switchPlayer();
            return;
        }
        
        if (currentPlayer.inJail) {
            addLogMessage(`<strong>${currentPlayer.name}</strong> está en DETENCION. Usa las opciones del modal.`);
            return; 
        }

        rollDiceBtn.disabled = true;
        const die1 = Math.floor(Math.random() * 6) + 1;
        const die2 = Math.floor(Math.random() * 6) + 1;
        const total = die1 + die2;

        die1Element.style.transform = `rotate(${Math.random() * 720 - 360}deg)`;
        die2Element.style.transform = `rotate(${Math.random() * 720 - 360}deg)`;
        
        setTimeout(() => {
            die1Element.innerHTML = `<i class="fas fa-dice-${['one', 'two', 'three', 'four', 'five', 'six'][die1 - 1]}"></i>`;
            die2Element.innerHTML = `<i class="fas fa-dice-${['one', 'two', 'three', 'four', 'five', 'six'][die2 - 1]}"></i>`;
        }, 250);

        setTimeout(() => {
            addLogMessage(`<strong>${currentPlayer.name}</strong> sacó ${total}.`);
            movePlayer(total);
        }, 500);
    }

    function movePlayer(steps) {
        const currentPlayer = players[currentPlayerIndex];
        const oldPosition = currentPlayer.position;
        const newPosition = (oldPosition + steps) % boardSpaces.length;
        
        let passedGo = false;
        if (newPosition < oldPosition && steps > 0) {
             passedGo = true;
        }

        // Animación de movimiento casilla por casilla
        let currentPos = oldPosition;
        const interval = setInterval(() => {
            if (currentPlayer.pieceElement.parentNode) {
                currentPlayer.pieceElement.parentNode.removeChild(currentPlayer.pieceElement);
            }
            
            currentPos = (currentPos + 1) % boardSpaces.length;
            document.getElementById(`space-${currentPos}`).appendChild(currentPlayer.pieceElement);
            
            if (currentPos === newPosition) {
                clearInterval(interval);
                currentPlayer.position = newPosition;
                if (passedGo) {
                    addLogMessage(`<strong>${currentPlayer.name}</strong> pasó por GO y cobra $200.`);
                    currentPlayer.money += 200;
                    showMoneyAnimation(currentPlayer, 200);
                    updateAllPlayerPanels();
                }
                handleSpaceAction();
            }
        }, 150);
    }

    function handleSpaceAction() {
        const currentPlayer = players[currentPlayerIndex];
        const space = boardSpaces[currentPlayer.position];
        addLogMessage(`<strong>${currentPlayer.name}</strong> ha caído en <strong>${space.name}</strong>.`);
        
        switch(space.type) {
            case SPACE_TYPES.PROPERTY:
            case SPACE_TYPES.LIBRARY:
            case SPACE_TYPES.BOOKSTORE:
                handleProperty(currentPlayer, space);
                break;
            case SPACE_TYPES.COMMUNITY_CHEST:
                addLogMessage('Haz clicK en el mazo de <strong>Arca Comunal</strong> para sacar una tarjeta.');
                communityChestPile.classList.add('active');
                rollDiceBtn.disabled = true;
                break;
            case SPACE_TYPES.CHANCE:
                addLogMessage('Haz clicK en el mazo de <strong>Preguntas</strong> para sacar una tarjeta.');
                chancePile.classList.add('active');
                rollDiceBtn.disabled = true;
                break;
            case SPACE_TYPES.GO_TO_JAIL:
                goToJail(currentPlayer);
                setTimeout(switchPlayer, 1000);
                break;
            case SPACE_TYPES.GO:
            case SPACE_TYPES.JAIL:
            case SPACE_TYPES.FREE_PARKING:
            default:
                setTimeout(switchPlayer, 1000);
        }
    }

    function calculateRent(space, owner) {
        let baseRent = Math.floor(space.price * 0.1);
        
        if (space.type === SPACE_TYPES.LIBRARY || space.type === SPACE_TYPES.BOOKSTORE) {
            const ownedOfType = owner.properties.filter(propName => {
                const prop = boardSpaces.find(s => s.name === propName);
                return prop && (prop.type === SPACE_TYPES.LIBRARY || prop.type === SPACE_TYPES.BOOKSTORE);
            }).length;
            return baseRent * ownedOfType;
        }

        const propertiesInGroup = boardSpaces.filter(s => s.color === space.color);
        const ownedByPlayer = propertiesInGroup.filter(s => owner.properties.includes(s.name));
        
        if (propertiesInGroup.length === ownedByPlayer.length) {
            addLogMessage(`¡Monopolio! La renta para <strong>${space.name}</strong> se duplica.`);
            return baseRent * 2;
        }
        return baseRent;
    }

    function handleProperty(player, space) {
        const owner = players.find(p => p.properties.includes(space.name));
        if (!owner) {
            if (player.money >= space.price) {
                showModal(`Comprar ${space.name}`, `<p>¿Quieres comprar esta propiedad por <strong>$${space.price}</strong>?</p>`,
                    [
                        { text: 'Comprar', style: 'btn-confirm', handler: () => buyProperty(player, space) },
                        { text: 'Pasar', style: 'btn-danger', handler: () => { closeModal(); switchPlayer(); } }
                    ]
                );
            } else {
                addLogMessage(`No tienes suficiente dinero para comprar <strong>${space.name}</strong>.`);
                setTimeout(switchPlayer, 1000);
            }
        } else if (owner.id !== player.id) {
            const rent = calculateRent(space, owner);
            player.money -= rent;
            owner.money += rent;
            addLogMessage(`<strong>${player.name}</strong> paga $${rent} de renta a <strong>${owner.name}</strong>.`);
            showMoneyAnimation(player, -rent);
            showMoneyAnimation(owner, rent);
            updateAllPlayerPanels();
            checkGameOver();
            setTimeout(switchPlayer, 1000);
        } else {
            addLogMessage(`Ya eres dueño de esta propiedad.`);
            setTimeout(switchPlayer, 1000);
        }
    }

    function buyProperty(player, space) {
        player.money -= space.price;
        player.properties.push(space.name);
        showMoneyAnimation(player, -space.price);
        addLogMessage(`<strong>${player.name}</strong> ha comprado <strong>${space.name}</strong>.`);
        document.getElementById(`space-${boardSpaces.indexOf(space)}`).classList.add(`owner-p${player.id}`);
        updateAllPlayerPanels();
        checkWinCondition(player);
        closeModal();
        switchPlayer();
    }

    function drawCommunityChestCard() {
        if (communityChestDeck.length === 0) {
            addLogMessage("Se baraja de nuevo el mazo de Arca Comunal.");
            createDecks();
        }
        const card = communityChestDeck.pop();
        const currentPlayer = players[currentPlayerIndex];
        
        const cardHTML = `
            <div class="modal-card">
                <div class="card-icon"><i class="fa-solid fa-box-archive"></i></div>
                <p class="card-text">${card.text}</p>
            </div>
        `;
        
        showModal('Arca Comunal', cardHTML, [{ text: 'OK', style: 'btn-neutral', handler: () => {
            closeModal();
            executeCardAction(currentPlayer, card);
        }}]);
    }
    
    function executeCardAction(player, card) {
        let playerSwitchNeeded = true;
        addLogMessage(`<em>Arca Comunal: ${card.text}</em>`);
        switch(card.action) {
            case 'addMoney':
                player.money += card.amount;
                showMoneyAnimation(player, card.amount);
                break;
            case 'payMoney':
                player.money -= card.amount;
                showMoneyAnimation(player, -card.amount);
                break;
            case 'goToJail': 
                goToJail(player); 
                playerSwitchNeeded = false; 
                setTimeout(switchPlayer, 1000);
                break;
            case 'goTo': 
                let stepsToGo = (card.position - player.position + boardSpaces.length) % boardSpaces.length;
                movePlayer(stepsToGo);
                playerSwitchNeeded = false;
                break;
            case 'getOutOfJailFree': 
                player.getOutOfJailFreeCards++; 
                addLogMessage(`<strong>${player.name}</strong> ha obtenido una tarjeta para salir de A LA DETENCION.`);
                break;
            case 'goToNearest':
                let currentPos = player.position; 
                let nearestPos = -1;
                for(let i = 1; i < boardSpaces.length; i++) {
                    let checkPos = (currentPos + i) % boardSpaces.length;
                    if(boardSpaces[checkPos].type === card.type) { nearestPos = checkPos; break; }
                }
                if(nearestPos !== -1) {
                    let stepsToNearest = (nearestPos - player.position + boardSpaces.length) % boardSpaces.length;
                    movePlayer(stepsToNearest);
                    playerSwitchNeeded = false;
                }
                break;
        }
        updateAllPlayerPanels();
        checkGameOver();
        if (playerSwitchNeeded) { 
            switchPlayer(); 
        }
    }

    function drawChanceCard() {
        if (chanceDeck.length === 0) {
            addLogMessage("Se baraja de nuevo el mazo de Preguntas.");
            createDecks();
        }
        const card = chanceDeck.pop();
        
        const cardHTML = `
            <div class="modal-card">
                <div class="card-icon"><i class="fa-solid fa-question"></i></div>
                <p class="question-text">${card.question}</p>
            </div>
        `;
        
        let optionsHTML = '<div style="display: flex; flex-direction: column; gap: 0.5rem;">';
        card.options.forEach(option => {
            optionsHTML += `<button class="option-btn">${option}</button>`;
        });
        optionsHTML += '</div>';

        showModal('Preguntas', cardHTML + optionsHTML,
            [{ text: 'Saltar', style: 'btn-danger', handler: () => {
                const currentPlayer = players[currentPlayerIndex];
                currentPlayer.skippedNextTurn = true;
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
        const normalize = (str) => str.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (normalize(selectedOption) === normalize(correctAnswer)) {
            addLogMessage('<strong>¡Respuesta correcta!</strong> Ganas $50.');
            currentPlayer.money += 50;
            currentPlayer.questionsAnswered++;
            showMoneyAnimation(currentPlayer, 50);
        } else {
            addLogMessage('<strong>Respuesta incorrecta.</strong> Pierdes tu próximo turno.');
            currentPlayer.skippedNextTurn = true;
        }
        updateAllPlayerPanels();
        checkWinCondition(currentPlayer);
        closeModal();
        switchPlayer();
    }

    function goToJail(player) {
        player.inJail = true;
        player.jailTurns = 0;
        player.position = boardSpaces.findIndex(s => s.type === SPACE_TYPES.JAIL);
        document.getElementById(`space-${player.position}`).appendChild(player.pieceElement);
        addLogMessage(`<strong>${player.name}</strong> va a A LA DETENCION.`);
        updateAllPlayerPanels();
    }

    function handleJailTurn(player) {
        rollDiceBtn.disabled = true; 

        const actions = [];
        let modalMessage = `Estás en A LA DETENCION. Te quedan ${3 - player.jailTurns} intentos para sacar dobles. ¿Qué quieres hacer?`;

        if (player.getOutOfJailFreeCards > 0) {
            actions.push({ text: 'Usar Tarjeta', style: 'btn-neutral', handler: () => {
                player.getOutOfJailFreeCards--;
                player.inJail = false;
                addLogMessage(`<strong>${player.name}</strong> usó una tarjeta para salir.`);
                closeModal();
                rollDiceBtn.disabled = false;
                updateAllPlayerPanels();
            }});
        }

        if (player.money >= 50) {
            actions.push({ text: 'Pagar Fianza ($50)', style: 'btn-confirm', handler: () => {
                player.money -= 50;
                player.inJail = false;
                showMoneyAnimation(player, -50);
                addLogMessage(`<strong>${player.name}</strong> pagó $50 para salir de DETENCION.`);
                closeModal();
                rollDiceBtn.disabled = false;
                updateAllPlayerPanels();
                checkGameOver();
            }});
        }

        actions.push({ text: 'Tirar los Dados', style: 'btn-danger', handler: () => {
            closeModal();
            const die1 = Math.floor(Math.random() * 6) + 1;
            const die2 = Math.floor(Math.random() * 6) + 1;
            addLogMessage(`<strong>${player.name}</strong> tiró ${die1} y ${die2}.`);

            if (die1 === die2) {
                player.inJail = false;
                addLogMessage(`<strong>${player.name}</strong> sacó dobles y sale de A LA DETENCION.`);
                rollDiceBtn.disabled = false;
                movePlayer(die1 + die2);
            } else {
                player.jailTurns++;
                if (player.jailTurns >= 3) {
                    addLogMessage(`No sacó dobles. Debe pagar en el próximo turno.`);
                } else {
                    addLogMessage(`No sacó dobles. Le quedan ${3 - player.jailTurns} intentos.`);
                }
                switchPlayer();
            }
        }});
        
        if (player.jailTurns >= 3) {
             modalMessage = `Debes pagar $50 para salir de A LA DETENCION.`;
             actions.splice(0, actions.length); // Clear other options
             actions.push({ text: 'Pagar $50', style: 'btn-confirm', handler: () => {
                player.money -= 50;
                player.inJail = false;
                showMoneyAnimation(player, -50);
                addLogMessage(`<strong>${player.name}</strong> pagó $50 para salir.`);
                closeModal();
                rollDiceBtn.disabled = false;
                updateAllPlayerPanels();
                checkGameOver();
             }});
        }

        showModal('En A LA DETENCION', modalMessage, actions);
    }

    function checkWinCondition(player) {
        if (player.properties.length >= 10 && player.questionsAnswered >= 5) {
            showModal('¡Felicidades!', `<p style="font-size: 2.5rem; font-weight: bold; text-align: center; color: var(--c-success);">${player.name} ha ganado el juego!</p>`,
                [{ text: 'Jugar de Nuevo', style: 'btn-confirm', handler: () => location.reload() }]
            );
            rollDiceBtn.disabled = true;
        }
    }

    function checkGameOver() {
        players.forEach(p => {
            if (p.money < 0) {
                const winner = players.find(winner => winner.id !== p.id);
                 showModal('¡Juego Terminado!', `<p style="font-size: 1.5rem; font-weight: bold; text-align: center;">${p.name} se ha quedado sin dinero!</p>
                     <p style="font-size: 2.5rem; font-weight: bold; text-align: center; color: var(--c-success);">¡${winner.name} ha ganado el juego!</p>`,
                    [{ text: 'Jugar de Nuevo', style: 'btn-confirm', handler: () => location.reload() }]
                );
                rollDiceBtn.disabled = true;
            }
        });
    }
    
    function showModal(title, body, actions) {
        modalTitle.innerHTML = title;
        modalBody.innerHTML = body;
        modalActions.innerHTML = '';
        actions.forEach(action => {
            const button = document.createElement('button');
            button.textContent = action.text;
            button.className = `modal-btn ${action.style}`;
            button.onclick = action.handler;
            modalActions.appendChild(button);
        });
        modalBackdrop.classList.remove('hidden');
        modal.classList.remove('hidden');
    }

    function closeModal() {
        modalBackdrop.classList.add('hidden');
        modal.classList.add('hidden');
        if (!players[currentPlayerIndex].inJail) {
            rollDiceBtn.disabled = false;
        }
    }

    // --- INICIAR JUEGO ---
    createDecks();
    setupBoard();
    setupPlayers();
    setupEventListeners();
    addLogMessage(`<strong>¡Bienvenidos al Viaje del Lector!</strong> Tira los dados para empezar la aventura.`);
    updateAllPlayerPanels();
});
