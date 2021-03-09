//Gloabl selectors and variables

const colorDivs = document.querySelectorAll('.color');
const generateBtn = document.querySelector('.generate');
const sliders = document.querySelectorAll('input[type="range"]');
const currentHexes = document.querySelectorAll('.color h2');
let initialColors;

//Functions

//Hex Color Generator with Chroma JS library
function getHex() {
    const hexColor = chroma.random();
    return hexColor;
}

//Color Generator for all Divs
function getRandomColors() {
    colorDivs.forEach((div,index) => {
        const hexText = div.children[0];
        const randomColor = getHex();

        //Add color to BG
        div.style.backgroundColor = randomColor;
        hexText.innerText = randomColor;
    });
}

getRandomColors()