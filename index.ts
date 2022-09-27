// Import stylesheets
import './style.css';
import { Colours, ColoursHelper } from './models/colours.enum';
import { BodyParts, BodyPartsHelper } from './models/bodyParts.enum';
import { SpinRecord } from './models/spin';

// used to make the spinner spin
let spinnerCounter = 0;

// container for the spinner
let spinnerCycle;

// used to keep track of how many spins have been requested
let spinCount = 0;

// used to keep track of the results of the spin
let selectedColour: string;
let selectedBodyPart: string;

// use to store the results of spins
let spinHistoryArray: Array<SpinRecord> = [];
const colourSelector = document.getElementById('colourSelect');
const bodyPartSelector = document.getElementById('bodyPartSelect');
const colourDiv = document.getElementById('colourResult');

// sets up an array of strings to represent the colours from the enum
let coloursArray: Array<string> = [];
for (let colour in Colours) {
  if (isNaN(Number(colour))) {
    coloursArray.push(colour);
    colourSelector.innerHTML += `<option value="${colour}">${colour}</option>`;
  }
}
const bodyPartP = document.getElementById('bodyPartText');

// TODO see above and create an array of strings to store the bodypart strings from the enum
let bodyPartsArray: Array<string> = [];
for (let body in BodyParts) {
  if (isNaN(Number(body))) {
    bodyPartsArray.push(body);
    bodyPartSelector.innerHTML += `<option value="${body}">${body}</option>`;
  }
}

// TODO add eventlistners to buttons
const spinBtn = <HTMLButtonElement>document.getElementById('spin-btn');
spinBtn.addEventListener('click', () => spinBtnHandler(2000, 100));

const statBtn = <HTMLButtonElement>document.getElementById('statsBtn');
spinBtn.addEventListener('click', () => statsBtnHandler());

// TODO handles the spin button click
// time in ms, interval in ms
function spinBtnHandler(time: number, interval: number) {
  // start spinner rotating through colours
  spinnerCycle = setInterval(() => spinSpinners(), interval);

  // TODO randomly select colour from array //DONE
  let colourIndex: number = Math.floor(Math.random() * coloursArray.length);
  selectedColour = coloursArray[colourIndex];

  // TODO randomly select bodyPart from array //DONE
  let bodyPartIndex: number = Math.floor(Math.random() * bodyPartsArray.length);
  selectedBodyPart = bodyPartsArray[bodyPartIndex];

  spinBtn.disabled = true;

  // set timer to stop the spinners rotating
  setTimeout(() => stopSpinners(), time);
}
// rotates between the colours in Colours.enum. //DONE
function spinSpinners() {
  spinnerCounter++;

  colourDiv.style.backgroundColor =
    coloursArray[spinnerCounter % coloursArray.length];
  bodyPartP.innerHTML = bodyPartsArray[spinnerCounter % bodyPartsArray.length];
}

// stops spinner after time parameter, time in ms //DONE
function stopSpinners() {
  clearInterval(spinnerCycle);
  // TODO set colourDiv and bodyPartP to the randomly spun results
  colourDiv.style.backgroundColor = selectedColour;
  bodyPartP.innerHTML = selectedBodyPart;

  spinBtn.disabled = false;
  addToHistory();
}

// TODO add the newly spun result to the history table
function addToHistory() {
  spinHistoryArray.push(
    new SpinRecord(
      spinHistoryArray.length + 1,
      Colours[selectedColour],
      BodyParts[selectedBodyPart]
    )
  );
  const table = document.getElementById('historyTable');
  table.insertRow().innerHTML = `<td>${spinHistoryArray.length}</td><td>${selectedColour}</td><td>${selectedBodyPart}</td>`;
}

function statsBtnHandler() {
  // TODO set the statsResults div innerHTML to the amount and last spun number that the user has chosen
  // eg. Red LeftHand spun 10 times
  //     Red LeftHand last spun at num 23
  let colourToGet = colourSelector.value;
  let bodyPartToGet = bodyPartSelector.value;
  let resultDiv = document.getElementById('statsResults');
  resultDiv.innerHTML = `${colourToGet} ${bodyPartToGet} spun ${getAmount(
    colourToGet,
    bodyPartToGet
  )} times. <br> ${colourToGet} ${bodyPartToGet} last spun at num ${getLastSpun(
    colourToGet,
    bodyPartToGet
  )}`;
}

// TODO returns the amount of times the combination of selected of colour and body part have been spun
function getAmount(colour, bodyPart): number {
  let num = 0;
  for (let i = 0; i < spinHistoryArray.length; i++) {
    if (
      spinHistoryArray[i].colour === ColoursHelper.get(colour) &&
      spinHistoryArray[i].bodyPart === BodyPartsHelper.get(bodyPart)
    ) {
      num++;
    }
  }
  return 0;
}

// TODO return the last num which the combination of selected of colour and body part have been spun
function getLastSpun(colour, bodyPart): number {
  for (let i = spinHistoryArray.length - 1; i >= 0; i--) {
    if (
      ColoursHelper.get(colour) === spinHistoryArray[i].colour &&
      BodyPartsHelper.get(bodyPart) === spinHistoryArray[i].bodyPart
    ) {
      return i + 1;
    }
  }
  return NaN;
}
