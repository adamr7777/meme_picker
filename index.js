import { catsData } from './data.js';

const emotionRadios = document.getElementById('emotion-radios');
const getImageBtn = document.getElementById('get-image-btn');
const gifsOnly = document.getElementById('gifs-only-option');
const memeModal = document.getElementById('meme-modal');
const memeModalInner = document.getElementById('meme-modal-inner');
const memeModalClose = document.getElementById('meme-modal-close-btn');

//functions
function getEmotionsArray(cats) {
  const emotionsArray = [];
  for (let obj of cats) {
    for (let emotion of obj.emotionTags) {
      if (!emotionsArray.includes(emotion)) {
        emotionsArray.push(emotion)
    }
    }
  }
  return emotionsArray;
}

function lightOptions(event) {
  const emotionId = event.target.id;
  const parentEl = document.getElementById(emotionId).parentElement;
  const array1 = document.getElementsByClassName('radio');
  for (let object of array1) {
    object.classList.remove('highlight');
  }
  parentEl.classList.add('highlight');
}

function renderRadios(cats) {
  const emotions = getEmotionsArray(cats);
  let radioHtml = ``
  for (let e of emotions) {
    radioHtml +=   `<div class='radio'>
                      <input type='radio'
                             id='${e}'
                             value='${e}'
                             name='emotions'
                      />
                      <label for='${e}'>${e}</label>
                    </div>`
  }
  emotionRadios.innerHTML = radioHtml;
}

function getClickedItem() {
  if (document.querySelector('input[type="radio"]:checked')) {
    const clickedItem = document.querySelector('input[type="radio"]:checked').value;
    const isGif = gifsOnly.checked;
    const selectedCats = catsData.filter(function(obj) {
        if (isGif) {
          return obj.isGif && obj.emotionTags.includes(clickedItem);
        }
        else {
          return obj.emotionTags.includes(clickedItem);
        }
    })
    return selectedCats;
  }
}

function narrowDown() {
  const catsArray = getClickedItem();
    if (catsArray.length === 1) {
      return catsArray[0];
    }
    else {
      const randNum = Math.floor(Math.random()*catsArray.length);
      return catsArray[randNum];
    }
}

function renderCat() {
  const catObj = narrowDown();
  memeModalInner.innerHTML =
      `<img
        class="cat-img"
        src="./images/${catObj.image}"
        alt="${catObj.alt}"
        >`
  memeModal.style.display = 'flex';
}

function closeModal() {
  memeModal.style.display = 'none';
}


//event listeners
emotionRadios.addEventListener('change', lightOptions);

getImageBtn.addEventListener('click', renderCat);

memeModalClose.addEventListener('click', closeModal);





renderRadios(catsData);
