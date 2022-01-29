const cards = document.getElementById("cards");
const lifePoint = document.getElementById("life-point");
const scorePoint = document.getElementById("score-point");
const playsTimes = document.getElementById("plays-times");
const playAgain = document.getElementById("play-again");

let lifes = 6;
let plays = 0;
let cardsFound = 0;
let cardsID = [];
let cardsSelected = [];

const cardsArray = [{
    name: "Estrellas Orientales",
    image: "./images/eo.jpg",
},
{
    name: "Tigres del Licey",
    image: "./images/licey.png",
},
{
    name: "Gigantes del Cibao",
    image: "./images/gigantes.png",
},
{
    name: "Toros del este",
    image: "./images/toros.png",
},
{
    name: "Aguilas Cibaenas",
    image: "./images/aguilas.png",
},
{
    name: "Leones del Escogido",
    image: "./images/escogido.png",
},
{
    name: "Mi Foto",
    image: "./images/photo.jpeg",
},
{
    name: "ITLA",
    image: "./images/itla.jpg",
},
{
    name: "Amadis",
    image: "./images/amadis.png",
}
];

cardsArray.push(...cardsArray);

/**
 * When receiving by parameter the array to iterate and the HTML Element
 * where the items of the array will be iterated.
 * 
 * @param {*} grid 
 * @param {*} array 
 */
const CreateBoard = ({
    grid,
    array
}) => {
    array.forEach((item, index) => {
        let divCard = document.createElement("div");
        divCard.setAttribute("class", "card");
        divCard.setAttribute("id", `${index}`);

        let divFront = document.createElement("div");
        divFront.setAttribute("class", "card__face");
        let imgBlank = document.createElement("img");
        imgBlank.setAttribute("src", "./images/blank.jpg");
        imgBlank.setAttribute("alt", "blank");
        divFront.appendChild(imgBlank);

        let divBack = document.createElement("div");
        divBack.setAttribute("class", "card__face card__face--back");
        let img = document.createElement("img");
        img.setAttribute("src", `${item?.image}`);
        img.setAttribute("alt", `${item?.name}`);
        divBack.appendChild(img);

        divCard.appendChild(divFront);
        divCard.appendChild(divBack);
        grid.appendChild(divCard);
    })
};

/**
 * It checks if the selected cards are the same,
 * it also calls the correspondingfunctions to check
 * if the player won or lost.
 * 
 */
const CheckMatchCard = () => {
    const allCards = document.getElementsByClassName("card");
    const firstCard = cardsID[0];
    const secondCard = cardsID[1];

    setTimeout(() => checkLose(), 500);

    if (cardsSelected[0] === cardsSelected[1] && firstCard !== secondCard) {
        cardsFound += 1;
        if (scorePoint) scorePoint.innerHTML = `${cardsFound}`;
        allCards.namedItem(`${firstCard}`)?.remove();
        allCards.namedItem(`${secondCard}`)?.remove();
        setTimeout(() => checkWon(), 500);
    } else {
        allCards.namedItem(`${firstCard}`)?.classList.remove("is-flipped");
        allCards.namedItem(`${secondCard}`)?.classList.remove("is-flipped");
        lifes -= 1;
        if (lifePoint) lifePoint.innerHTML = `${lifes}`;
    }

    cardsSelected = [];
    cardsID = [];
    plays += 1;
    if (playsTimes) playsTimes.innerHTML = `${plays}`;
};

/**
 * Check if the player has lost depending on the remaining lives.
 */
const checkLose = () => {
    if (lifes <= 0) {
        alert("You lose");
        setTimeout(() => RestartGame(), 100);
    }
};

/**
 * Check if the player has won if all the cards matched.
 */
const checkWon = () => {
    if (cardsFound === cardsArray.length / 2) {
        alert("You won");
        setTimeout(() => RestartGame(), 100);
    }
};

/**
 * Disrupt the cards.
 */
const DisruptCards = () => {
    cardsArray.sort(() => 0.5 - Math.random());
};

/**
 * Restart the game
 */
const RestartGame = () => {
    lifes = 6;
    plays = 0;
    cardsFound = 0;

    StartGame();
};

/**
 * Start the game
 */
const StartGame = () => {
    if (lifePoint) lifePoint.innerHTML = `${lifes}`;
    if (scorePoint) scorePoint.innerHTML = `${cardsFound}`;
    if (playsTimes) playsTimes.innerHTML = `${plays}`;
    if (cards) cards.innerHTML = "";

    try {
        DisruptCards();

        CreateBoard({
            grid: cards,
            array: cardsArray
        });

        const allCards = document.getElementsByClassName("card");
        Array.from(allCards).forEach((card) => card.addEventListener("click", () => {
            if (!card.className.includes("is-flipped") && cardsID.length < 2) {
                card?.classList.toggle("is-flipped");

                const selected = Number(card.id);
                const cardSelected = cardsArray[selected];

                cardsSelected.push(cardSelected.name);
                cardsID.push(selected);

                if (cardsID.length === 2) setTimeout(() => CheckMatchCard(), 500);
            }
        }));
    } catch (error) {
        console.error(error);
    }
}

document.addEventListener("DOMContentLoaded", StartGame);
playAgain?.addEventListener("click", RestartGame);