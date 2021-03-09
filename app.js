//Gloabl selectors and variables

const colorDivs = document.querySelectorAll('.color');
const generateBtn = document.querySelector('.generate');
const sliders = document.querySelectorAll('input[type="range"]');
const currentHexes = document.querySelectorAll('.color h2');
const generateButton = document.querySelector('.generate');
let initialColors;


//Event Listeners
sliders.forEach(slider => {
    slider.addEventListener("input", getHslControls);
});

colorDivs.forEach((slider,index) => {
    slider.addEventListener('change', ()=> {
        updateTextUi(index);
    });
});

generateBtn.addEventListener('click', getRandomColors);

//Functions

//Hex Color Generator with Chroma JS library
function getHex() {
    const hexColor = chroma.random();
    return hexColor;
}

//Color Generator for all Divs
function getRandomColors() {
    //Set Initial Array
    initialColors = [];
    colorDivs.forEach((div,index) => {
        const hexText = div.children[0];
        const randomColor = getHex();
        //Add to array
        initialColors.push(chroma(randomColor).hex());

        //Add color to BG
        div.style.backgroundColor = randomColor;
        hexText.innerText = randomColor;

        //Get Colorize Sliders
        const color = chroma(randomColor);
        const sliders = div.querySelectorAll('.sliders input');
        const hue = sliders[0];
        const brightness = sliders[1];
        const saturation = sliders[2];

        getColorSlider(color, hue, brightness, saturation);
    });
    //Rest Inputs
    restInputs();
}

function getColorSlider(color, hue, brightness, saturation) {
    //Scale saturation
    const noSat = color.set('hsl.s', 0);
    const fullSat = color.set('hsl.s', 1);
    const scaleSat = chroma.scale([noSat, color, fullSat]);

    //Scale Values
    const midBright = color.set("hsl.l", 0.5);
    const scaleBright = chroma.scale(['black', midBright, 'white']);

    //Update Input Slider Color
    saturation.style.backgroundImage = `linear-gradient(to right, ${scaleSat(0)}, ${scaleSat(1)})`;
    brightness.style.backgroundImage = `linear-gradient(to right, ${scaleBright(0)}, ${scaleBright(0.5)}, ${scaleBright(1)})`;
    hue.style.backgroundImage = `linear-gradient(to right, rgb(204,75,75), rgb(204,204,75), rgb(75,204,75), rgb(75,204,204), rgb(75,75,204), rgb(204,75,204), rgb(204,75,75))`;
}

function getHslControls(e) {
    const index = e.target.getAttribute('data-bright') || e.target.getAttribute('data-sat') || e.target.getAttribute('data-hue');

    let sliders = e.target.parentElement.querySelectorAll('input[type="range"]');
    const hue = sliders[0];
    const brightness = sliders[1];
    const saturation = sliders[2];

    const bgColor = initialColors[index];

    let color = chroma(bgColor).set('hsl.s', saturation.value).set('hsl.l', brightness.value).set('hsl.h', hue.value);

    colorDivs[index].style.backgroundColor = color;

    //Update Sliders Color
    getColorSlider(color, hue, brightness, saturation);
}

function updateTextUi(index) {
    const activeDiv = colorDivs[index];
    const color = chroma(activeDiv.style.backgroundColor);
    const textHex = activeDiv.querySelector('h2');
    const icons = activeDiv.querySelectorAll('.controls button');
    textHex.innerText = color.hex();
}

function restInputs() {
    const sliders = document.querySelectorAll(".sliders input");
    sliders.forEach( slider => {
        if(slider.name === "hue"){
            const hueColor = initialColors[slider.getAttribute("data-hue")];
            const hueValue = chroma(hueColor).hsl()[0];
            slider.value = Math.floor(hueValue * 100) / 100;
        }
        if(slider.name === "brightness"){
            const brightColor = initialColors[slider.getAttribute("data-bright")];
            const brightValue = chroma(brightColor).hsl()[2];
            slider.value = Math.floor(brightValue * 100) / 100;
        }
        if(slider.name === "saturation"){
            const satColor = initialColors[slider.getAttribute("data-sat")];
            const satValue = chroma(satColor).hsl()[1];
            slider.value = Math.floor(satValue * 100) / 100;
        }
    });
}


getRandomColors()