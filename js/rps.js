
class WebPage{
  #matches = Array() //array of results

    constructor() {
        this.winPercent = document.getElementById("win-percent");
        this.resultArea = document.getElementById("result-area");
        this.aiMove = document.getElementById("ai-move");
        this.buttons = document.getElementsByClassName("button");
        this.winPercent.textContent = 'Win Percent';
        this.resultArea.textContent = 'Result Area.';
        this.aiMove.textContent = 'The AI\'s Move.';
    }

    addMatch(win) {
      this.#matches.push(win);
    }

    get matches() {
      const totalMatches = this.#matches.length;
      if (totalMatches === 0) {return '0.00%'}
      const wonMatches = this.#matches.filter(win => win === 'won').length;
      const percentage = wonMatches / totalMatches * 100;
      return percentage.toFixed(2) + '%';
    }

    updateDisplay(result, aiMove) {
      this.resultArea.textContent = `You ${result}!`;
      this.aiMove.textContent = `AI chose: ${aiMove}`;
      this.winPercent.textContent = this.matches;
  }
}

class MusicPlayer {
  #playIcon = document.getElementById("play-icon");
  #pauseIcon = document.getElementById("music-icon");
  #song;
  #isPlaying = false;

  constructor() {
    this.#song = new Audio('mp3/predestined-fate.mp3');
    this.#song.volume = 0.05;
    document.getElementById("music-button").addEventListener('click',
      () => this.togglePlayButton());
    this.#playIcon.style.visibility = 'visible';
    this.#pauseIcon.style.visibility = 'hidden';
  }

  togglePlayButton() {
    this.#isPlaying = !this.#isPlaying;

    if (this.#isPlaying) {
      this.#playIcon.style.visibility = 'hidden';
      this.#pauseIcon.style.visibility = 'visible';
      void this.play();
    } else {
      this.#playIcon.style.visibility = 'visible';
      this.#pauseIcon.style.visibility = 'hidden';
      this.pause();
    }
  }

  async play() {
    await this.#song.play();
  }

  pause() {
    this.#song.pause();
  }
}

const validMoves = ['rock', 'paper', 'scissors'];
const winningMovesMap = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper'
};

function beats (playerMove) {
    const aiMove = validMoves[Math.floor(Math.random() * validMoves.length)];

    if (winningMovesMap[playerMove] === aiMove) {return ['won', aiMove]}
    if (playerMove === aiMove) {return ['drew', aiMove]}
    return ['lost', aiMove];
}

function addViewer (page, obj) {
  obj.addEventListener('click', (event) => {
    const id = event.target.id;
    const [result, aiMove] = beats(id);
    page.addMatch(result);
    page.updateDisplay(result, aiMove);
  })
}

function startupMusic(musicPlayer) {
  document.addEventListener('click', function playMusicOnce() {
    musicPlayer.togglePlayButton();
    document.removeEventListener('click', playMusicOnce);
  }, { once: true });
}

function main() {
    const page = new WebPage()
  const player = new MusicPlayer()
  const buttons = [...page.buttons];
  buttons.forEach(button => {addViewer(page, button)});
  startupMusic(player);
}

main()
