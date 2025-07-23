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

    // Constantes numéricas para facilitar el mantenimiento
    const INITIAL_MONEY = 1500;
    const GO_MONEY = 200;
    const JAIL_BAIL = 50;
    const JAIL_MAX_TURNS = 3;
    const CORRECT_ANSWER_MONEY = 50;
    const WIN_PROPERTIES_COUNT = 10;
    const WIN_QUESTIONS_COUNT = 5;

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
        { name: '¡A LA DETENCION!', type: SPACE_TYPES.GO_TO_JAIL, icon: 'fa-solid fa-user-secret' },
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
        // Preguntas generales (manteniendo algunas para variedad)
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
        { question: '¿Cuál es el antónimo de "rápido"?', answer: 'lento', options: ['Veloz', 'Lento', 'Fugaz'] },
        { question: '¿Qué tipo de palabra es "rápidamente"?', answer: 'adverbio', options: ['Adjetivo', 'Adverbio', 'Verbo'] },
        { question: '¿"El Quijote" es una obra de qué autor?', answer: 'miguel de cervantes', options: ['Miguel de Cervantes', 'Lope de Vega', 'Francisco de Quevedo'] },
        { question: '¿Qué es una onomatopeya?', answer: 'una palabra que imita un sonido', options: ['Una comparación', 'Una exageración', 'Una palabra que imita un sonido'] },
        { question: '¿Cuál es el sujeto en: "El gato negro duerme en el sofá"?', answer: 'el gato negro', options: ['El gato negro', 'Duerme', 'En el sofá'] },
        { question: '¿Qué es un sinónimo?', answer: 'una palabra que significa lo mismo que otra', options: ['Una palabra con significado opuesto', 'Una palabra que suena igual', 'Una palabra que significa lo mismo que otra'] },

        // Nuevas preguntas temáticas relacionadas con los "espacios" del tablero
        { question: '¿En qué tipo de texto,se analiza y se reflexiona sobre un tema de manera concisa?', answer: 'ensayo', options: ['Novela', 'Poema', 'Ensayo'] },
        { question: '¿Cuál es la función principal de un "Artículo de Opinión" en un medio de comunicación?', answer: 'persuadir al lector sobre un punto de vista', options: ['Informar de manera neutral', 'Contar una historia de ficción', 'Persuadir al lector sobre un punto de vista'] },
        { question: 'La "Crónica Periodística" se distingue por combinar el rigor informativo con elementos de, ¿qué género literario?', answer: 'género narrativo', options: ['Género dramático', 'Género narrativo', 'Género lírico'] },
        { question: '¿Qué tipo de relato es una "Biografía" en el contexto de la literatura?', answer: 'narración de la vida de una persona real', options: ['Una historia de fantasía', 'Una narración de la vida de una persona real', 'Un texto argumentativo'] },
        { question: 'Los "Cuentos" son narraciones breves que suelen tener una estructura sencilla y, ¿qué tipo de desarrollo de personajes?', answer: 'pocos personajes y un desarrollo conciso', options: ['Muchos personajes y tramas complejas', 'Pocos personajes y un desarrollo conciso', 'Solo diálogos sin narrador'] },
        { question: '¿Qué característica define a una "Fábula", además de sus personajes animales o inanimados?', answer: 'siempre incluye una moraleja', options: ['Siempre es muy extensa', 'Siempre incluye una moraleja', 'No tiene un propósito claro'] },
        { question: 'Los "Mitos" son relatos tradicionales que explican el origen de fenómenos naturales o culturales, a menudo con la intervención de, ¿qué tipo de seres?', answer: 'seres sobrenaturales o divinos', options: ['Personajes históricos', 'Seres sobrenaturales o divinos', 'Animales parlantes'] },
        { question: 'Una "Novela Corta" se diferencia de una novela extensa por su menor longitud y, ¿qué más?', answer: 'mayor concentración de la trama', options: ['Menor calidad literaria', 'Mayor concentración de la trama', 'Necesidad de ser leída en un solo día'] },
        { question: 'El "Guion Teatral" es el texto que contiene los diálogos y las indicaciones para la puesta en escena de, ¿qué tipo de obra?', answer: 'una obra dramática', options: ['Una película', 'Una obra dramática', 'Un podcast'] },
        { question: '¿Cuál es el propósito principal del "Discurso Político"?', answer: 'convencer y movilizar a la audiencia', options: ['Entretener sin un mensaje', 'Convencer y movilizar a la audiencia', 'Informar sobre datos técnicos'] },
        { question: 'Un "Texto Expositivo" tiene como objetivo primordial, ¿qué?', answer: 'informar de forma clara y objetiva', options: ['Expresar emociones', 'Informar de forma clara y objetiva', 'Contar una historia personal'] },
        { question: '¿Qué se busca al escribir un "Texto Argumentativo"?', answer: 'defender una postura con argumentos y pruebas', options: ['Describir un paisaje', 'Defender una postura con argumentos y pruebas', 'Dar instrucciones para un juego'] },
        { question: 'La "Monografía" es un trabajo de investigación que se enfoca en el estudio profundo de, ¿cuántos temas?', answer: 'un único tema específico', options: ['Múltiples temas sin conexión', 'Un único tema específico', 'Solo temas de actualidad'] },
        { question: '¿Qué tipo de elementos predominan en una "Novela de Ficción"?', answer: 'elementos imaginarios y creativos', options: ['Hechos históricos verificables', 'Elementos imaginarios y creativos', 'Datos estadísticos'] },
        { question: 'La "Novela Histórica" se caracteriza por ambientarse en un periodo del pasado y entrelazar la ficción con, ¿qué?', answer: 'eventos y figuras históricas reales', options: ['Mundos de fantasía pura', 'Eventos y figuras históricas reales', 'Historias futuristas'] },
        { question: '¿Qué define a una "SAGA Fantástica"?', answer: 'una serie de relatos con elementos mágicos y sobrenaturales', options: ['Una colección de cuentos de terror', 'Una serie de relatos con elementos mágicos y sobrenaturales', 'Un conjunto de poemas cortos'] },
        { question: 'Un "Manifiesto Literario" es una declaración pública que expresa los principios y las intenciones de, ¿qué?', answer: 'un movimiento o grupo de escritores', options: ['Un contrato de compraventa', 'Un movimiento o grupo de escritores', 'Una biografía autorizada'] },
        { question: '¿Cuál es el objeto de estudio principal de un "Tratado Filosófico"?', answer: 'conceptos abstractos y fundamentales sobre la existencia', options: ['Recetas de cocina', 'Conceptos abstractos y fundamentales sobre la existencia', 'Noticias de entretenimiento'] },
        { question: 'Una "Enciclopedia" es una obra que compila y organiza, ¿qué tipo de información?', answer: 'conocimiento general o especializado de diversas áreas', options: ['Solo obras de teatro', 'Conocimiento general o especializado de diversas áreas', 'Cuentos populares'] },
        { question: '¿Qué es una "Tesis Doctoral" en el ámbito académico?', answer: 'una investigación original para obtener un grado de doctorado', options: ['Un resumen de un libro', 'Una investigación original para obtener un grado de doctorado', 'Un artículo de periódico'] },
        { question: 'Una "Obra Maestra" es reconocida por su excelencia y, ¿qué otro atributo importante?', answer: 'su valor artístico y cultural perdurable', options: ['Su bajo costo de producción', 'Su valor artístico y cultural perdurable', 'Su popularidad momentánea'] },
        // Pregunta sobre "Aves sin Nido"
        { question: '¿Quién es la autora de la novela "Aves sin Nido", una obra clave del realismo peruano?', answer: 'clorinda matto de turner', options: ['Ricardo Palma', 'Clorinda Matto de Turner', 'Abraham Valdelomar'] },
        // Pregunta sobre "El Caballero Carmelo"
        { question: '¿Quién es el autor del cuento "El Caballero Carmelo", una de las obras más representativas del modernismo peruano?', answer: 'abraham valdelomar', options: ['César Vallejo', 'Abraham Valdelomar', 'José María Arguedas'] },
        // Pregunta sobre "Paco Yunque"
        { question: '¿Quién es el autor del cuento "Paco Yunque", que aborda temas de injusticia social y abuso escolar?', answer: 'césar vallejo', options: ['Mario Vargas Llosa', 'César Vallejo', 'Julio Ramón Ribeyro'] },
        // Pregunta sobre "La Metamorfosis"
        { question: '¿Quién es el autor de la novela corta "La Metamorfosis", donde el protagonista se transforma en un insecto gigante?', answer: 'franz kafka', options: ['Albert Camus', 'Franz Kafka', 'Herman Melville'] },
        // Pregunta sobre "Los Ojos de mi Princesa"
        { question: '¿Quién es el autor de la novela "Los Ojos de mi Princesa", una obra popular de la literatura juvenil?', answer: 'carlos cuauhtémoc sánchez', options: ['Gabriel García Márquez', 'Carlos Cuauhtémoc Sánchez', 'Paulo Coelho'] },
        // Pregunta sobre "Moby Dick"
        { question: '¿Quién es el autor de la novela "Moby Dick", una obra maestra de la literatura estadounidense sobre la obsesión de un capitán con una ballena blanca?', answer: 'herman melville', options: ['Mark Twain', 'Edgar Allan Poe', 'Herman Melville'] },
        // Pregunta sobre "El Principito"
        { question: '¿Quién es el autor de "El Principito", la famosa novela corta y cuento poético ilustrado?', answer: 'antoine de saint-exupéry', options: ['Julio Verne', 'Antoine de Saint-Exupéry', 'Lewis Carroll'] },
        // Pregunta sobre "Agua"
        { question: '¿Quién es el autor del cuento "Agua", una obra que retrata la vida en los Andes peruanos y la lucha por la justicia?', answer: 'josé maría arguedas', options: ['Ciro Alegría', 'José María Arguedas', 'Manuel Scorza'] },
        // Pregunta sobre "Mi Planta de Naranja-Lima"
        { question: '¿Quién es el autor de la novela "Mi Planta de Naranja-Lima", que narra la infancia de Zezé en Brasil?', answer: 'josé mauro de vasconcelos', options: ['Jorge Amado', 'José Mauro de Vasconcelos', 'Clarice Lispector'] },
        // Pregunta sobre "El Vuelo de los Cóndores"
        { question: '¿Quién es el autor del cuento "El Vuelo de los Cóndores", que forma parte de la obra "Cuentos de la Universidad"?', answer: 'abraham valdelomar', options: ['Julio Ramón Ribeyro', 'Mario Vargas Llosa', 'Abraham Valdelomar'] },
        // Nueva pregunta sobre "La Fuerza de Sheccid"
        { question: '¿Quién es el autor de la novela "La Fuerza de Sheccid", una obra que aborda temas de superación personal y amor juvenil?', answer: 'carlos cuauhtémoc sánchez', options: ['Gabriel García Márquez', 'Carlos Cuauhtémoc Sánchez', 'Paulo Coelho'] },
    ];
    
    // --- ESTADO DEL JUEGO ---
    let players = [
        { id: 1, name: 'Jugador 1', money: INITIAL_MONEY, position: 0, properties: [], questionsAnswered: 0, inJail: false, jailTurns: 0, pieceElement: null, skippedNextTurn: false, getOutOfJailFreeCards: 0, pieceIcon: 'fa-user-astronaut' },
        { id: 2, name: 'Jugador 2', money: INITIAL_MONEY, position: 0, properties: [], questionsAnswered: 0, inJail: false, jailTurns: 0, pieceElement: null, skippedNextTurn: false, getOutOfJailFreeCards: 0, pieceIcon: 'fa-book' }
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
    
    let communityChestPile, chancePile; // Referencias a los montones de cartas en el centro del tablero

    // --- FUNCIONES DE INICIALIZACIÓN ---

    /**
     * Baraja un array en su lugar usando el algoritmo de Fisher-Yates.
     * @param {Array} array - El array a barajar.
     * @returns {Array} El array barajado.
     */
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    /**
     * Crea y baraja los mazos de Arca Comunal y Preguntas.
     */
    function createDecks() {
        communityChestDeck = shuffle([...communityChestCards]);
        chanceDeck = shuffle([...chanceCards]);
    }
    
    /**
     * Configura dinámicamente el tablero de juego, creando las casillas y los elementos centrales.
     */
    function setupBoard() {
        boardSpaces.forEach((space, i) => {
            const spaceEl = document.createElement('div');
            spaceEl.id = `space-${i}`;
            spaceEl.classList.add('space');
            let content = `<div class="name">${space.name}</div>`;
            
            // Añade barra de color y precio para propiedades y tiendas/bibliotecas
            if (space.type === SPACE_TYPES.PROPERTY || space.type === SPACE_TYPES.BOOKSTORE || space.type === SPACE_TYPES.LIBRARY) {
                if (space.color) { content = `<div class="color-bar ${space.color}" style="background-color: ${space.color}"></div>` + content; }
                content += `<div class="price">$${space.price}</div>`;
            } else {
                // Estilos y contenido para casillas especiales (esquinas)
                spaceEl.classList.add('corner');
                let specialText = '';
                switch(space.type) {
                    case SPACE_TYPES.GO: specialText = `Recibe $${GO_MONEY}`; break;
                    case SPACE_TYPES.JAIL: specialText = '(De visita)'; break;
                    case SPACE_TYPES.FREE_PARKING: specialText = 'Descanso'; break;
                }
                content += `<i class="icon ${space.icon}"></i><div class="price">${specialText}</div>`;
            }
            spaceEl.innerHTML = content;
            boardElement.appendChild(spaceEl);
        });

        // Crea el área central del tablero para los mazos de cartas
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
    
    /**
     * Configura todos los escuchadores de eventos del juego.
     */
    function setupEventListeners() {
        rollDiceBtn.addEventListener('click', rollDice);
        communityChestPile.addEventListener('click', () => {
            const currentPlayer = players[currentPlayerIndex];
            const currentSpace = boardSpaces[currentPlayer.position];
            // Solo permite sacar carta si el jugador está en una casilla de Arca Comunal y el mazo está activo
            if (communityChestPile.classList.contains('active') && currentSpace.type === SPACE_TYPES.COMMUNITY_CHEST) {
                communityChestPile.classList.remove('active');
                drawCommunityChestCard();
            }
        });
        chancePile.addEventListener('click', () => {
            const currentPlayer = players[currentPlayerIndex];
            const currentSpace = boardSpaces[currentPlayer.position];
            // Solo permite sacar carta si el jugador está en una casilla de Preguntas y el mazo está activo
            if (chancePile.classList.contains('active') && currentSpace.type === SPACE_TYPES.CHANCE) {
                chancePile.classList.remove('active');
                drawChanceCard();
            }
        });
    }

    /**
     * Inicializa las piezas de los jugadores en el tablero y actualiza sus paneles.
     */
    function setupPlayers() {
        players.forEach(p => {
            const piece = document.createElement('div');
            piece.id = `player-${p.id}-piece`;
            piece.className = `player-piece player-${p.id}`; 
            piece.innerHTML = `<i class="fa-solid ${p.pieceIcon}"></i>`;
            
            p.pieceElement = piece;
            document.getElementById('space-0').appendChild(piece);

            // Ajuste de posición inicial para evitar superposición de piezas
            if (p.id === 1) {
                p.pieceElement.style.transform = 'translate(-75%, -75%)'; // Arriba a la izquierda
            } else if (p.id === 2) {
                p.pieceElement.style.transform = 'translate(-25%, -25%)'; // Abajo a la derecha
            }
            // Si hubiera más jugadores, se necesitaría una lógica más dinámica aquí.
        });
        updateAllPlayerPanels();
    }
    
    // --- LÓGICA DE UI Y VISUALIZACIÓN ---

    /**
     * Añade un mensaje al registro de eventos del juego.
     * @param {string} message - El mensaje HTML a añadir.
     */
    function addLogMessage(message) {
        const p = document.createElement('p');
        p.innerHTML = message;
        messageLog.prepend(p); // Añade el mensaje al principio para que los más nuevos estén arriba
        messageLog.scrollTop = 0; // Asegura que el scroll esté arriba
    }

    /**
     * Muestra una animación de cambio de dinero para un jugador.
     * @param {Object} player - El objeto del jugador.
     * @param {number} amount - La cantidad de dinero que cambia (positivo para ganancia, negativo para pérdida).
     */
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

        // Elimina el elemento de animación después de su duración CSS
        setTimeout(() => {
            animationEl.remove();
        }, 1500); 
    }

    /**
     * Actualiza la información mostrada en los paneles de todos los jugadores.
     */
    function updateAllPlayerPanels() {
        players.forEach(p => {
            document.getElementById(`p${p.id}-money`).textContent = p.money;
            document.getElementById(`p${p.id}-props`).textContent = p.properties.length;
            document.getElementById(`p${p.id}-questions`).textContent = p.questionsAnswered;
            const panel = document.getElementById(`player${p.id}-panel`);
            
            // Marca el panel del jugador actual como activo
            if (p.id === players[currentPlayerIndex].id) {
                panel.classList.add('active-player-panel');
            } else {
                panel.classList.remove('active-player-panel');
            }
            renderProperties(p); // Vuelve a renderizar las propiedades adquiridas

            // Actualiza el icono del jugador en el título del panel
            const playerTitleElement = document.querySelector(`.player-${p.id}-title`); 
            if (playerTitleElement) {
                playerTitleElement.innerHTML = `<i class="fa-solid ${p.pieceIcon}"></i> ${p.name}`;
            }
        });
    }
    
    /**
     * Renderiza las tarjetas de propiedad adquiridas por un jugador.
     * @param {Object} player - El objeto del jugador.
     */
    function renderProperties(player) {
        const container = document.getElementById(`p${player.id}-properties`);
        container.innerHTML = ''; // Limpia la lista actual
        player.properties.forEach(propName => {
            const propData = boardSpaces.find(s => s.name === propName);
            if (!propData) return; // Si la propiedad no se encuentra, salta
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

    /**
     * Cambia al siguiente jugador en el turno.
     */
    function switchPlayer() {
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        const currentPlayer = players[currentPlayerIndex];
        addLogMessage(`Es el turno de <strong>${currentPlayer.name}</strong>.`);
        
        updateAllPlayerPanels(); // Actualiza los paneles para reflejar el cambio de turno
        
        if (currentPlayer.inJail) {
            handleJailTurn(currentPlayer); // Si el jugador está en la cárcel, maneja su turno en la cárcel
        } else {
            rollDiceBtn.disabled = false; // Habilita el botón de tirar dados
        }
        checkWinCondition(currentPlayer); // Comprueba si el jugador actual ha ganado
        checkGameOver(); // Comprueba si el juego ha terminado (alguien se ha quedado sin dinero)
    }
    
    /**
     * Simula la tirada de dados y mueve al jugador.
     */
    function rollDice() {
        const currentPlayer = players[currentPlayerIndex];

        // Si el jugador perdió su turno por una pregunta incorrecta
        if (currentPlayer.skippedNextTurn) {
            addLogMessage(`<strong>${currentPlayer.name}</strong> pierde su turno por una pregunta incorrecta.`);
            currentPlayer.skippedNextTurn = false; // Resetea el estado
            switchPlayer(); // Pasa al siguiente jugador
            return;
        }
        
        // Si el jugador está en la cárcel, no puede tirar dados directamente
        if (currentPlayer.inJail) {
            addLogMessage(`<strong>${currentPlayer.name}</strong> está en DETENCION. Usa las opciones del modal.`);
            return; 
        }

        rollDiceBtn.disabled = true; // Deshabilita el botón de tirar dados durante la animación
        const die1 = Math.floor(Math.random() * 6) + 1;
        const die2 = Math.floor(Math.random() * 6) + 1;
        const total = die1 + die2;

        // Animación visual de los dados
        die1Element.style.transform = `rotate(${Math.random() * 720 - 360}deg)`;
        die2Element.style.transform = `rotate(${Math.random() * 720 - 360}deg)`;
        
        // Actualiza los iconos de los dados después de un breve retraso
        setTimeout(() => {
            die1Element.innerHTML = `<i class="fas fa-dice-${['one', 'two', 'three', 'four', 'five', 'six'][die1 - 1]}"></i>`;
            die2Element.innerHTML = `<i class="fas fa-dice-${['one', 'two', 'three', 'four', 'five', 'six'][die2 - 1]}"></i>`;
        }, 250);

        // Mueve al jugador después de la animación de los dados
        setTimeout(() => {
            addLogMessage(`<strong>${currentPlayer.name}</strong> sacó ${total}.`);
            movePlayer(total);
        }, 500);
    }

    /**
     * Mueve la pieza del jugador un número determinado de pasos.
     * @param {number} steps - El número de casillas a mover.
     */
    function movePlayer(steps) {
        const currentPlayer = players[currentPlayerIndex];
        const oldPosition = currentPlayer.position;
        const newPosition = (oldPosition + steps) % boardSpaces.length;
        
        let passedGo = false;
        // Comprueba si el jugador pasó por la casilla de GO
        if (newPosition < oldPosition && steps > 0) {
             passedGo = true;
        }

        // Animación de movimiento casilla por casilla
        let currentPos = oldPosition;
        const interval = setInterval(() => {
            // Elimina la pieza de la casilla actual antes de moverla
            if (currentPlayer.pieceElement.parentNode) {
                currentPlayer.pieceElement.parentNode.removeChild(currentPlayer.pieceElement);
            }
            
            currentPos = (currentPos + 1) % boardSpaces.length;
            document.getElementById(`space-${currentPos}`).appendChild(currentPlayer.pieceElement);
            
            // Cuando la pieza llega a la nueva posición
            if (currentPos === newPosition) {
                clearInterval(interval); // Detiene la animación
                currentPlayer.position = newPosition; // Actualiza la posición del jugador
                if (passedGo) {
                    addLogMessage(`<strong>${currentPlayer.name}</strong> pasó por GO y cobra $${GO_MONEY}.`);
                    currentPlayer.money += GO_MONEY;
                    showMoneyAnimation(currentPlayer, GO_MONEY);
                    updateAllPlayerPanels();
                }
                handleSpaceAction(); // Ejecuta la acción de la casilla
            }
        }, 150); // Velocidad de la animación por casilla
    }

    /**
     * Maneja la acción correspondiente a la casilla en la que ha caído el jugador.
     */
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
                addLogMessage('Haz clic en el mazo de <strong>Arca Comunal</strong> para sacar una tarjeta.');
                communityChestPile.classList.add('active'); // Activa el mazo para que el usuario haga clic
                rollDiceBtn.disabled = true; // Deshabilita el botón de dados hasta que se maneje la carta
                break;
            case SPACE_TYPES.CHANCE:
                addLogMessage('Haz clic en el mazo de <strong>Preguntas</strong> para sacar una tarjeta.');
                chancePile.classList.add('active'); // Activa el mazo
                rollDiceBtn.disabled = true; // Deshabilita el botón de dados
                break;
            case SPACE_TYPES.GO_TO_JAIL:
                goToJail(currentPlayer);
                setTimeout(switchPlayer, 1000); // Pasa el turno después de ir a la cárcel
                break;
            case SPACE_TYPES.GO:
            case SPACE_TYPES.JAIL: // Si cae en "DETENCIÓN" de visita
            case SPACE_TYPES.FREE_PARKING:
            default:
                setTimeout(switchPlayer, 1000);
        }
    }

    /**
     * Calcula el monto de la renta para una propiedad.
     * @param {Object} space - El objeto de la casilla (propiedad).
     * @param {Object} owner - El objeto del jugador propietario.
     * @returns {number} El monto de la renta.
     */
    function calculateRent(space, owner) {
        let baseRent = Math.floor(space.price * 0.1); // Renta base del 10% del precio

        // Lógica especial para Bibliotecas y Tiendas de Cómics
        if (space.type === SPACE_TYPES.LIBRARY || space.type === SPACE_TYPES.BOOKSTORE) {
            const ownedOfType = owner.properties.filter(propName => {
                const prop = boardSpaces.find(s => s.name === propName);
                return prop && (prop.type === SPACE_TYPES.LIBRARY || prop.type === SPACE_TYPES.BOOKSTORE);
            }).length;
            return baseRent * ownedOfType; // La renta aumenta con cada propiedad del mismo tipo
        }

        // Lógica para monopolios (todas las propiedades de un color)
        const propertiesInGroup = boardSpaces.filter(s => s.color === space.color);
        const ownedByPlayer = propertiesInGroup.filter(s => owner.properties.includes(s.name));
        
        if (propertiesInGroup.length === ownedByPlayer.length) {
            addLogMessage(`¡Monopolio! La renta para <strong>${space.name}</strong> se duplica.`);
            return baseRent * 2;
        }
        return baseRent;
    }

    /**
     * Maneja la interacción con una casilla de propiedad (compra o pago de renta).
     * @param {Object} player - El jugador actual.
     * @param {Object} space - La casilla de propiedad.
     */
    function handleProperty(player, space) {
        const owner = players.find(p => p.properties.includes(space.name));
        if (!owner) {
            // Si no tiene dueño, ofrece comprarla
            if (player.money >= space.price) {
                // MODIFICACIÓN: El título del modal ahora es solo el nombre de la propiedad.
                showModal(`${space.name}`, `<p>¿Quieres comprar este espacio por <strong>$${space.price}</strong>?</p>`,
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
            // Si tiene dueño y no es el jugador actual, paga renta
            const rent = calculateRent(space, owner);
            player.money -= rent;
            owner.money += rent;
            addLogMessage(`<strong>${player.name}</strong> paga $${rent} de renta a <strong>${owner.name}</strong>.`);
            showMoneyAnimation(player, -rent);
            showMoneyAnimation(owner, rent);
            updateAllPlayerPanels();
            checkGameOver(); // Comprueba si el jugador se ha quedado sin dinero
            setTimeout(switchPlayer, 1000);
        } else {
            // Si ya es dueño, no pasa nada
            addLogMessage(`Ya eres dueño de este espacio.`);
            setTimeout(switchPlayer, 1000);
        }
    }

    /**
     * Procesa la compra de una propiedad por parte de un jugador.
     * @param {Object} player - El jugador que compra.
     * @param {Object} space - La propiedad a comprar.
     */
    function buyProperty(player, space) {
        player.money -= space.price;
        player.properties.push(space.name);
        showMoneyAnimation(player, -space.price);
        addLogMessage(`<strong>${player.name}</strong> ha comprado <strong>${space.name}</strong>.`);
        // Añade la clase de dueño a la casilla visualmente
        document.getElementById(`space-${boardSpaces.indexOf(space)}`).classList.add(`owner-p${player.id}`);
        updateAllPlayerPanels();
        checkWinCondition(player); // Comprueba si la compra le dio la victoria
        closeModal();
        switchPlayer();
    }

    /**
     * Saca y muestra una tarjeta de Arca Comunal.
     */
    function drawCommunityChestCard() {
        if (communityChestDeck.length === 0) {
            addLogMessage("Se baraja de nuevo el mazo de Arca Comunal.");
            createDecks(); // Vuelve a barajar si el mazo está vacío
        }
        const card = communityChestDeck.pop(); // Saca la última carta
        const currentPlayer = players[currentPlayerIndex];
        
        const cardHTML = `
            <div class="modal-card">
                <div class="card-icon"><i class="fa-solid fa-box-archive"></i></div>
                <p class="card-text">${card.text}</p>
            </div>
        `;
        
        showModal('Arca Comunal', cardHTML, [{ text: 'OK', style: 'btn-neutral', handler: () => {
            closeModal();
            executeCardAction(currentPlayer, card); // Ejecuta la acción de la carta
        }}]);
    }
    
    /**
     * Ejecuta la acción definida por una tarjeta de Arca Comunal.
     * @param {Object} player - El jugador afectado.
     * @param {Object} card - El objeto de la tarjeta.
     */
    function executeCardAction(player, card) {
        let playerSwitchNeeded = true; // Por defecto, se cambia de jugador después de la acción
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
                playerSwitchNeeded = false; // No se cambia de jugador inmediatamente, la cárcel lo hará
                setTimeout(switchPlayer, 1000);
                break;
            case 'goTo': 
                // Calcula los pasos necesarios para llegar a la posición
                let stepsToGo = (card.position - player.position + boardSpaces.length) % boardSpaces.length;
                movePlayer(stepsToGo);
                playerSwitchNeeded = false; // El movimiento ya manejará el siguiente turno
                break;
            case 'getOutOfJailFree': 
                player.getOutOfJailFreeCards++; 
                addLogMessage(`<strong>${player.name}</strong> ha obtenido una tarjeta para salir de A LA DETENCION.`);
                break;
            case 'goToNearest':
                let currentPos = player.position; 
                let nearestPos = -1;
                // Busca la casilla más cercana del tipo especificado
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

    /**
     * Saca y muestra una tarjeta de Preguntas (Chance).
     */
    function drawChanceCard() {
        if (chanceDeck.length === 0) {
            addLogMessage("Se baraja de nuevo el mazo de Preguntas.");
            createDecks(); // Vuelve a barajar si el mazo está vacío
        }
        const card = chanceDeck.pop(); // Saca la última carta
        
        const cardHTML = `
            <div class="modal-card">
                <div class="card-icon"><i class="fa-solid fa-question"></i></div>
                <p class="question-text">${card.question}</p>
            </div>
        `;
        
        // Crea botones para cada opción de respuesta
        let optionsHTML = '<div style="display: flex; flex-direction: column; gap: 0.5rem;">';
        card.options.forEach(option => {
            optionsHTML += `<button class="option-btn">${option}</button>`;
        });
        optionsHTML += '</div>';

        // Muestra el modal con la pregunta y las opciones
        showModal('Preguntas', cardHTML + optionsHTML,
            [{ text: 'Saltar', style: 'btn-danger', handler: () => {
                const currentPlayer = players[currentPlayerIndex];
                currentPlayer.skippedNextTurn = true; // El jugador pierde el próximo turno
                addLogMessage(`<strong>${currentPlayer.name}</strong> ha decidido saltar la pregunta. Perderá su próximo turno.`);
                closeModal();
                switchPlayer();
            }}]
        );
        
        // Asigna el evento de clic a cada botón de opción
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.onclick = () => checkAnswer(btn.textContent, card.answer);
        });
    }
    
    /**
     * Comprueba la respuesta seleccionada por el jugador para una tarjeta de Preguntas.
     * @param {string} selectedOption - La opción de respuesta seleccionada por el jugador.
     * @param {string} correctAnswer - La respuesta correcta.
     */
    function checkAnswer(selectedOption, correctAnswer) {
        const currentPlayer = players[currentPlayerIndex];
        // Normaliza las cadenas para una comparación sin distinción de mayúsculas/minúsculas ni acentos
        const normalize = (str) => str.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        
        if (normalize(selectedOption) === normalize(correctAnswer)) {
            addLogMessage(`<strong>¡Respuesta correcta!</strong> Ganas $${CORRECT_ANSWER_MONEY}.`);
            currentPlayer.money += CORRECT_ANSWER_MONEY;
            currentPlayer.questionsAnswered++;
            showMoneyAnimation(currentPlayer, CORRECT_ANSWER_MONEY);
        } else {
            addLogMessage('<strong>Respuesta incorrecta.</strong> Pierdes tu próximo turno.');
            currentPlayer.skippedNextTurn = true; // El jugador pierde el próximo turno
        }
        updateAllPlayerPanels();
        checkWinCondition(currentPlayer);
        closeModal();
        switchPlayer();
    }

    /**
     * Envía a un jugador a la cárcel.
     * @param {Object} player - El jugador a enviar a la cárcel.
     */
    function goToJail(player) {
        player.inJail = true;
        player.jailTurns = 0; // Resetea los turnos en la cárcel
        player.position = boardSpaces.findIndex(s => s.type === SPACE_TYPES.JAIL); // Mueve la pieza a la casilla de la cárcel
        document.getElementById(`space-${player.position}`).appendChild(player.pieceElement);
        addLogMessage(`<strong>${player.name}</strong> va a A LA DETENCION.`);
        updateAllPlayerPanels();
    }

    /**
     * Maneja el turno de un jugador que está en la cárcel.
     * @param {Object} player - El jugador en la cárcel.
     */
    function handleJailTurn(player) {
        rollDiceBtn.disabled = true; // El botón de dados se deshabilita mientras el modal está activo

        const actions = [];
        let modalMessage = `Estás en A LA DETENCION. Te quedan ${JAIL_MAX_TURNS - player.jailTurns} intentos para sacar dobles. ¿Qué quieres hacer?`;

        // Opción para usar tarjeta de "Salir de la Cárcel Gratis"
        if (player.getOutOfJailFreeCards > 0) {
            actions.push({ text: 'Usar Tarjeta', style: 'btn-neutral', handler: () => {
                player.getOutOfJailFreeCards--;
                player.inJail = false;
                addLogMessage(`<strong>${player.name}</strong> usó una tarjeta para salir.`);
                closeModal();
                rollDiceBtn.disabled = false;
                updateAllPlayerPanels();
                switchPlayer(); // Pasa el turno
            }});
        }

        // Opción para pagar fianza
        if (player.money >= JAIL_BAIL) {
            actions.push({ text: `Pagar Fianza ($${JAIL_BAIL})`, style: 'btn-confirm', handler: () => {
                player.money -= JAIL_BAIL;
                player.inJail = false;
                showMoneyAnimation(player, -JAIL_BAIL);
                addLogMessage(`<strong>${player.name}</strong> pagó $${JAIL_BAIL} para salir de DETENCION.`);
                closeModal();
                rollDiceBtn.disabled = false;
                updateAllPlayerPanels();
                checkGameOver();
                switchPlayer(); // Pasa el turno
            }});
        }

        // Opción para tirar los dados (siempre disponible)
        actions.push({ text: 'Tirar los Dados', style: 'btn-danger', handler: () => {
            closeModal();
            const die1 = Math.floor(Math.random() * 6) + 1;
            const die2 = Math.floor(Math.random() * 6) + 1;
            addLogMessage(`<strong>${player.name}</strong> tiró ${die1} y ${die2}.`);

            if (die1 === die2) {
                player.inJail = false;
                addLogMessage(`<strong>${player.name}</strong> sacó dobles y sale de A LA DETENCION.`);
                rollDiceBtn.disabled = false;
                movePlayer(die1 + die2); // Se mueve según la tirada
            } else {
                player.jailTurns++;
                if (player.jailTurns >= JAIL_MAX_TURNS) {
                    addLogMessage(`No sacó dobles. Debe pagar en el próximo turno.`);
                } else {
                    addLogMessage(`No sacó dobles. Le quedan ${JAIL_MAX_TURNS - player.jailTurns} intentos.`);
                }
                switchPlayer(); // Pasa el turno
            }
        }});
        
        // Si ha agotado los intentos, solo puede pagar fianza
        if (player.jailTurns >= JAIL_MAX_TURNS) {
             modalMessage = `Debes pagar $${JAIL_BAIL} para salir de A LA DETENCION.`;
             actions.splice(0, actions.length); // Limpia otras opciones
             actions.push({ text: `Pagar $${JAIL_BAIL}`, style: 'btn-confirm', handler: () => {
                player.money -= JAIL_BAIL;
                player.inJail = false;
                showMoneyAnimation(player, -JAIL_BAIL);
                addLogMessage(`<strong>${player.name}</strong> pagó $${JAIL_BAIL} para salir.`);
                closeModal();
                rollDiceBtn.disabled = false;
                updateAllPlayerPanels();
                checkGameOver();
                switchPlayer(); // Pasa el turno
             }});
        }

        showModal('En A LA DETENCION', modalMessage, actions);
    }

    /**
     * Comprueba la condición de victoria para un jugador.
     * @param {Object} player - El jugador a comprobar.
     */
    function checkWinCondition(player) {
        if (player.properties.length >= WIN_PROPERTIES_COUNT && player.questionsAnswered >= WIN_QUESTIONS_COUNT) {
            showModal('¡Felicidades!', `<p style="font-size: 2.5rem; font-weight: bold; text-align: center; color: var(--c-success);">${player.name} ha ganado el juego!</p>`,
                [{ text: 'Jugar de Nuevo', style: 'btn-confirm', handler: () => location.reload() }] // Recarga la página para reiniciar
            );
            rollDiceBtn.disabled = true; // Deshabilita los dados al final del juego
        }
    }

    /**
     * Comprueba si el juego ha terminado porque un jugador se ha quedado sin dinero.
     */
    function checkGameOver() {
        players.forEach(p => {
            if (p.money < 0) {
                const winner = players.find(winner => winner.id !== p.id); // Encuentra al otro jugador como ganador
                 showModal('¡Juego Terminado!', `<p style="font-size: 1.5rem; font-weight: bold; text-align: center;">${p.name} se ha quedado sin dinero!</p>
                     <p style="font-size: 2.5rem; font-weight: bold; text-align: center; color: var(--c-success);">¡${winner.name} ha ganado el juego!</p>`,
                    [{ text: 'Jugar de Nuevo', style: 'btn-confirm', handler: () => location.reload() }] // Recarga la página para reiniciar
                );
                rollDiceBtn.disabled = true; // Deshabilita los dados al final del juego
            }
        });
    }
    
    /**
     * Muestra un modal con un título, cuerpo y acciones personalizables.
     * @param {string} title - El título del modal.
     * @param {string} body - El contenido HTML del cuerpo del modal.
     * @param {Array<Object>} actions - Un array de objetos { text, style, handler } para los botones del modal.
     */
    function showModal(title, body, actions) {
        modalTitle.innerHTML = title;
        modalBody.innerHTML = body;
        modalActions.innerHTML = ''; // Limpia acciones anteriores
        actions.forEach(action => {
            const button = document.createElement('button');
            button.textContent = action.text;
            button.className = `modal-btn ${action.style}`;
            button.onclick = action.handler;
            modalActions.appendChild(button);
        });
        modalBackdrop.classList.remove('hidden'); // Muestra el fondo oscuro
        modal.classList.remove('hidden'); // Muestra el modal
    }

    /**
     * Oculta el modal y su fondo.
     */
    function closeModal() {
        modalBackdrop.classList.add('hidden');
        modal.classList.add('hidden');
        // Vuelve a habilitar el botón de dados si el jugador no está en la cárcel
        if (!players[currentPlayerIndex].inJail) {
            rollDiceBtn.disabled = false;
        }
    }

    // --- INICIAR JUEGO ---
    createDecks(); // Crea y baraja los mazos de cartas
    setupBoard(); // Configura el tablero visualmente
    setupPlayers(); // Inicializa los jugadores y sus piezas
    setupEventListeners(); // Configura los eventos del juego
    addLogMessage(`<strong>¡Bienvenidos al Viaje del Lector!</strong> Tira los dados para empezar la aventura.`);
    updateAllPlayerPanels(); // Actualiza los paneles de los jugadores al inicio
});

