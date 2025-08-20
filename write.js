// celeact element

let start = document.querySelector(".starts");
let DivWord = document.querySelector(".the-world");
let input = document.querySelector(".input");
let Allwords = document.querySelector(".writing-word");
let spanTime = document.querySelector(".spanTime");
let spanScore = document.querySelector(".got");
let spantotal = document.querySelector(".totlal");
let spanLvl = document.querySelector(".lvl");
let spanSecound = document.querySelector(".secound");
let gameover = document.querySelector(".gameover");
let gameoverbtn = document.querySelector(".gameover button");
let progress = document.querySelector(".progress");
//
let win = document.querySelector(".win");
let winbtn = document.querySelector(".win button");
//
let levels = document.getElementsByName("level");
let divlvl = document.querySelector(".divLvl");

//
// on click start

start.onclick = function () {
  this.remove();
  divlvl.remove();
  input.focus();
  // get word array and add
  getword();
  spanScore.innerHTML = ` ${0} `;
};

// create words

let myWords = [
  "Variable",
  "Function",
  "Code",
  "Syntax",
  "Loop",
  "Array",
  "Object",
  "Script",
  "Browser",
  "Element",
  "Event",
  "Scope",
  "Context",
  "Expression",
  "Statement",
  "Operator",
  "Value",
  "Prototype",
  "Constructor",
  "Instance",
  "Condition",
  "Keyword",
  "Debug",
  "Source",
  "Promise",
  "Async",
  "Await",
  "Callback",
  "Fetch",
  "JSON",
  "Parse",
];


// create lvl

let mylvl = {
  Easy: "6",
  Medium: "4",
  Hard: "3",
};

// select lvl and add

let selectlvl = mylvl["Medium"];
selectedlvl();

function selectedlvl () {

  levels.forEach((e) => {
    if (e.value == localStorage.getItem("level")) {
      e.setAttribute("checked", "");
      let locLevel = window.localStorage.getItem("level");
      selectlvl = mylvl[`${locLevel}`];
      spanLvl.innerHTML = `${locLevel}`;
      spanSecound.innerHTML = selectlvl;
    }
  });

}



levels.forEach((e) => {

  e.addEventListener("click", () => {

    window.localStorage.setItem("level", e.value);

    function setlevel() {
      let locLevel = window.localStorage.getItem("level");
      selectlvl = mylvl[`${locLevel}`];
      spanLvl.innerHTML = `${locLevel}`;
      spanSecound.innerHTML = selectlvl;
    }
    setlevel();
  });
});

// get word
function getword() {
  let theWord = myWords[Math.trunc(Math.random() * myWords.length)];
  let indexword = myWords.indexOf(`${theWord}`);
  // remove word array
  myWords.splice(indexword, 1);
  // add
  DivWord.innerHTML = `${theWord}`;
  // add all words
  addallaraay();
  // intervail
  nextword(theWord);
  // add total
  spantotal.innerHTML = `30`;
  spanScore.innerHTML = ` ${30 - myWords.length}  `;
}

// add Array
function addallaraay() {
  for (let i = 0; i < myWords.length; i++) {
    let div = document.createElement("div");
    let text = document.createTextNode(`${myWords[i]}`);
    div.appendChild(text);
    div.className = "word";
    Allwords.appendChild(div);
    //
    Allwords.style.cssText = "padding : 20px";
  }

  spanSecound.innerHTML = selectlvl;
  spanTime.innerHTML = selectlvl;
}

// next Word
function nextword(word) {
  let increaseTime = setInterval(() => {
    spanTime.innerHTML--;
    // stop increase

    if (spanTime.innerHTML == "0") {
      clearInterval(increaseTime);

      if (word.toLowerCase() === input.value.toLowerCase()) {
        Allwords.innerHTML = "";
        input.value = "";
        getword();
        if (myWords.length === 0) {
          win.style.display = "flex";

          winbtn.onclick = function () {
            win.remove();
            window.location.reload();
            clearInterval(increaseTime);
          };
        }
      } else {
        gameover.style.display = "flex";
        progress.style.width = `${((30 - myWords.length) / 30) * 100}%`;
        //
        gameoverbtn.onclick = () => {
          gameover.remove();
          window.location.reload();
        };
        
      }
    }
  }, 1000);
}


