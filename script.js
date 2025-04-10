let userScore = 0;
let compScore = 0;
const scoreLimit = 5;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const resetBtn = document.querySelector("#reset-btn");

const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

const drawGame = () => {
    msg.innerText = "Game was a Draw. Play again!!";
    msg.style.backgroundColor = "#081b31";
};

const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

const showWinner = (userWin, userChoice, compChoice) => {
    const userMove = capitalize(userChoice);
    const compMove = capitalize(compChoice);

    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You Win!! ${userMove} beats ${compMove}`;
        msg.style.backgroundColor = "green";
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `You Lose!! ${compMove} beats ${userMove}`;
        msg.style.backgroundColor = "red";
    }

    if (userScore === scoreLimit || compScore === scoreLimit) {
        if (userScore === scoreLimit) {
            msg.innerText = "🎉 Congratulations! You won the game!";
            msg.style.backgroundColor = "green";
        } else {
            msg.innerText = "😢 Oops! Computer won the game!";
            msg.style.backgroundColor = "red";
        }
        choices.forEach(choice => choice.style.pointerEvents = "none");
    }
};

const playGame = (userChoice) => {
    if (userScore === scoreLimit || compScore === scoreLimit) return;

    const compChoice = genCompChoice();

    if (userChoice === compChoice) {
        drawGame();
    } else {
        let userWin = false;

        if (
            (userChoice === "rock" && compChoice === "scissors") ||
            (userChoice === "paper" && compChoice === "rock") ||
            (userChoice === "scissors" && compChoice === "paper")
        ) {
            userWin = true;
        }

        showWinner(userWin, userChoice, compChoice);
    }
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

resetBtn.addEventListener("click", () => {
    userScore = 0;
    compScore = 0;
    userScorePara.innerText = userScore;
    compScorePara.innerText = compScore;
    msg.innerText = "Play your move";
    msg.style.backgroundColor = "#081b31";
    choices.forEach(choice => choice.style.pointerEvents = "auto");
});
