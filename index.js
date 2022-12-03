import { catsData } from './data.js';

const emotionRadios = document.getElementById('emotion-radios');
const getImageBtn = document.getElementById('get-image-btn');
const gifsOnly = document.getElementById('gifs-only-option');

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
};

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
    const selectedCats = catsData.filter(function(obj) {
      return obj.emotionTags.includes(clickedItem);
      //add code1
    })
    console.log(selectedCats);
  }
  const isGif = gifsOnly.checked; //code1
  console.log(isGif);            //code1
}


//event listeners
emotionRadios.addEventListener('change', lightOptions);

getImageBtn.addEventListener('click', getClickedItem);






renderRadios(catsData);
