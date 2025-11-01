// Seleção dos elementos do DOM
const songName = document.getElementById("song-name"); 
const bandName = document.getElementById("band-name"); 
const song = document.getElementById("audio"); 
const cover = document.getElementById("cover"); 
const play = document.getElementById("play"); 
const next = document.getElementById("next"); 
const previous = document.getElementById("previous");
const likeButton = document.getElementById("like");
const currentProgress = document.getElementById("current-progress");
const progressContainer = document.getElementById("progress-container");
const shuffleButton = document.getElementById("shuffle");
const repeatButton = document.getElementById("repeat");
const songTime = document.getElementById("song-time");
const totalTime = document.getElementById("total-time");

// Constantes de informações das músicas
const vambora = {
    songName: "Vambora",
    file: "adriana_calcanhoto_vambora",
    artist: "Adriana Calcanhoto",
    liked: false,
};

const tentaAcreditar = {
    songName: "Tenta Acreditar", 
    file: "ana_vitoria_tenta_acreditar",
    artist: "ANAVITÓRIA",
    liked: false,
};

const naoSeiDancar = {
    songName: "Não Sei Dançar", 
    file: "marina_lima_nao_sei_dancar",
    artist: "Marina Lima",
    liked: false,
};

const cincoMinutos = {
    songName: "Cinco Minutos", 
    file: "marisa_monte_cinco_minutos",
    artist: "Marisa Monte",
    liked: false,
};

const naoEfacil = {
    songName: "Não é Fácil", 
    file: "marisa_monte_nao_e_facil",
    artist: "Marisa Monte",
    liked: false,
};

const naoOlhePraTras = {
    songName: "Não Olhe Pra Trás", 
    file: "capital_inicial_nao_olhe_pra_tras",
    artist: "Capital Inicial",
    liked: false,
};

const lanternaDosAfogados = {
    songName: "Lanterna Dos Afogados", 
    file: "cassia_eller_lanterna_dos_afogados",
    artist: "Cássia Eller",
    liked: false,
};

const obrigadoPorTerSeMandado = {
    songName: "Obrigado Por Ter Se Mandado", 
    file: "cassia_eller_obrigado_por_ter_se_mandado",
    artist: "Cássia Eller",
    liked: false,
};

const comoEuQuero = {
    songName: "Como Eu Quero", 
    file: "kid_abelha_como_eu_quero",
    artist: "Kid Abelha",
    liked: false,
};

const ouvirEstrelas = {
    songName: "Ouvir Estrelas", 
    file: "kid_abelha_ouvir_estrelas",
    artist: "Kid Abelha",
    liked: false,
};

// Playlist e controle de estado
const originalPlaylist = [comoEuQuero, cincoMinutos, lanternaDosAfogados, naoEfacil, naoOlhePraTras, naoSeiDancar, obrigadoPorTerSeMandado, ouvirEstrelas, tentaAcreditar, vambora];
let sortedPlaylist = [...originalPlaylist];
let index = 0;
let isPlaying = false;
let isShuffled = false;
let repeatOn = false;

// Função para inicializar a música atual
function initializeSong() {
    cover.src = `./imagem/${sortedPlaylist[index].file}.jpg`;
    songName.innerText = sortedPlaylist[index].songName;
    bandName.innerText = sortedPlaylist[index].artist;
    song.src = `./songs/${sortedPlaylist[index].file}.mp3`;
    likeButtonRender();
    console.log("Música inicializada:", sortedPlaylist[index].songName);
}

// Função para tocar a música
function playSong() { 
    play.querySelector(".bi").classList.remove("bi-play-circle-fill");
    play.querySelector(".bi").classList.add("bi-pause-circle-fill");
    song.play(); 
    isPlaying = true;
}

// Função para pausar a música
function pauseSong() {
    play.querySelector(".bi").classList.add("bi-play-circle-fill"); 
    play.querySelector(".bi").classList.remove("bi-pause-circle-fill"); 
    song.pause(); 
    isPlaying = false;   
}

// Decide entre play ou pause
function playPauseDecider() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

// Função para ir para a música anterior
function previousSong() {
    if (index === 0) {
        index = sortedPlaylist.length - 1;
    } else {
        index -= 1;
    }
    initializeSong();
    playSong();
}

// Função para ir para a próxima música
function nextSong() { 
    if (index === sortedPlaylist.length - 1) { 
        index = 0; 
    } else { 
        index += 1; 
    }
    initializeSong(); 
    playSong(); 
}

// Função para embaralhar a playlist
function shuffleArray(preShuffleArray) {
    const size = preShuffleArray.length;
    let currentIndex = size - 1;
    while (currentIndex > 0) {
        const randomIndex = Math.floor(Math.random() * size);
        let aux = preShuffleArray[currentIndex];
        preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
        preShuffleArray[randomIndex] = aux;
        currentIndex -= 1;
    }
}

// Função para o botão de shuffle
function shuffleButtonClicked() {
    if (isShuffled === false) {
        isShuffled = true;
        shuffleArray(sortedPlaylist);
        shuffleButton.classList.add('button-active');
    } else {
        isShuffled = false;
        sortedPlaylist = [...originalPlaylist];
        shuffleButton.classList.remove('button-active');
    }
}

// Função para o botão de repeat
function repeatButtonClicked() {
    if (repeatOn === false) {
        repeatOn = true;
        repeatButton.classList.add('button-active');
    } else {
        repeatOn = false;
        repeatButton.classList.remove('button-active');
    }
}

// Função para decidir entre próxima música ou repetir
function nextOrRepeat() {
    if (repeatOn === false) {
        nextSong();
    } else {
        playSong();
    }
}

// Função para converter segundos em HH:MM:SS
function toHHMMSS(originalNumber) {
    let hours = Math.floor(originalNumber / 3600);
    let min = Math.floor((originalNumber - hours * 3600) / 60);
    let secs = Math.floor(originalNumber - hours * 3600 - min * 60);
    return `${hours.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Função para atualizar a barra de progresso e o tempo
function updateProgress() {
    const barWidth = (song.currentTime / song.duration) * 100;
    currentProgress.style.setProperty('--progress', `${barWidth}%`);
    songTime.innerText = toHHMMSS(song.currentTime);
}

// Função para atualizar o tempo total
function updateTotalTime() {
    totalTime.innerText = toHHMMSS(song.duration);
}

// Função para renderizar o botão de like
function likeButtonRender() {
    if (sortedPlaylist[index].liked === true) {
        likeButton.querySelector('.bi').classList.remove('bi-heart');
        likeButton.querySelector('.bi').classList.add('bi-heart-fill');
        likeButton.classList.add('button-active');
    } else {
        likeButton.querySelector('.bi').classList.add('bi-heart');
        likeButton.querySelector('.bi').classList.remove('bi-heart-fill');
        likeButton.classList.remove('button-active');
    }
}

// Função para o clique no botão de like
function likeButtonClicked() {
    if (sortedPlaylist[index].liked === false) {
        sortedPlaylist[index].liked = true;
    } else {
        sortedPlaylist[index].liked = false;
    }
    likeButtonRender();
    localStorage.setItem('playlist', JSON.stringify(originalPlaylist));
}

// Função que calcula o tempo correspondente ao clique e atualiza a música
function jumpTo(event) {
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition / width) * song.duration;
    song.currentTime = jumpToTime;
}

// Eventos de clique
play.addEventListener("click", playPauseDecider);
next.addEventListener("click", nextSong);
previous.addEventListener("click", previousSong);
shuffleButton.addEventListener("click", shuffleButtonClicked);
repeatButton.addEventListener("click", repeatButtonClicked);
likeButton.addEventListener("click", likeButtonClicked);

// Eventos da música
song.addEventListener('timeupdate', updateProgress);
song.addEventListener('ended', nextOrRepeat);
song.addEventListener('loadedmetadata', updateTotalTime);

// Adiciona o evento de clique para pular para um ponto da música
progressContainer.addEventListener("click", jumpTo);

// Tratamento de erro para carregamento de áudio
song.addEventListener('error', function(e) {
    console.error("Erro ao carregar a música:", e.target.error, "Arquivo:", song.src);
    alert("Erro ao carregar a música. Verifique se o arquivo existe e o caminho está correto.");
});

// Inicializa a primeira música ao carregar
const storedPlaylist = JSON.parse(localStorage.getItem('playlist')) ?? originalPlaylist;
originalPlaylist.splice(0, originalPlaylist.length, ...storedPlaylist);
sortedPlaylist = [...originalPlaylist];
initializeSong();

