let numSquares = 6;
let colors = [];
let pickedColor;
let squares = document.getElementsByClassName("squares");
let colorDisplay = document.getElementById("colorDisplay");
let messeageDisplay = document.querySelector("#messeage");
let h1 = document.querySelector('h1');
let resetButton = document.querySelector(".new-color");
let modeButtons = document.getElementsByClassName('mode');


init();

function init(){
    setUpModeButtons();
    setUpSquares();
    reset();
}

function setUpModeButtons(){
    // იმის მიხედვით თუ რამდენი სირთულის ბუთთონია დამატებული
    // კოდში for Loop-ით ვამატებთ eventListener-ს 
    // რომლის დახმარებითაც ვშლით კლასს selected იმ შემთხვევაში თუ სხვა ბუთთონს ავირჩევთ
    // და იმ შემთხვევაში თუ ავირჩევთ Easy ბუთთონს 
    // ცვლადი numSquare გახდება 3 და შესაბამისად კოდი იმუშავებს
    // 3 კვადრატზე თუ Hard-ს ავირჩევთ numSquare = 6 
    // და კოდი მუშაობს უკვე 6 კვადრატზე 
    // ასევე მარტივად შეიძლება დავამატო სხვადასხვა დონე 
    for(let i=0; i<modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
            reset();
        });
    }
};

function setUpSquares(){
    for(let i=0; i<squares.length; i++){
        // კვადრატზე დაჭერის დროს მოხდება რაგაც
        squares[i].addEventListener("click", function(){
            // ავიღო დაჭერილი ოთხკუთხედის ფერი
            let clickedColor = this.style.backgroundColor;
            // შევადარო ეს ფერი გამოსაცნობ ფერს და თუ არ დაემთხვა გავაკეთო რაღაც
            if(clickedColor === pickedColor) {
                // ბუთთონებს შორის გამოჩნდება წარწერა Correct!
                messeageDisplay.textContent = "Correct!";
                // იძახებს ფუნქციას changeColors რომელიც ყველა კვადრატს 
                // უცვლის ფერს თუ აირჩევ სწორ კვადრატს
                changeColors(clickedColor);
                // h1 იღებს სწორი კვადრატის ფერს
                h1.style.background = clickedColor;
                resetButton.textContent = "Play Again?";
            }else {
                // კვადრატის ფერებს აყენებს უკანა ფონის ფერზე და მალავს ეკრანიდან
                this.style.backgroundColor = "#123";
                // ბუთთონებს შორის გამოჩნდება წარწერა Try Again!
                messeageDisplay.textContent = "Try Again!";
            }
        });
    }
};

function reset(){
     // აგენერირებს იმდენ ფერს რამდენიც მითითებულია numSquar-ში
     colors = generateRandomColors(numSquares);
     // იღებს რანდომ ფერს არაიდან
     pickedColor = pickColor();
     // სპანის ადგილას წერს იმ ფერს რომლის გამოცნობაც გვიწევს 
     colorDisplay.textContent = pickedColor;
    //  Correct და Try Again-ს შლის სპანიდან
     messeageDisplay.textContent = "";
    //  Play Again ბუთონს სახელს უცვლის და ხდის New Colors
     resetButton.textContent = "New Colors";
     // ცვლის კვადრატების ფერებს
     for(let i=0; i<squares.length; i++){
         if(colors[i]){
             squares[i].style.display = "inline-block";
            //  ამატებს რანდომ ფერებს კვადრატებზე
             squares[i].style.backgroundColor = colors[i];
         } else {
            //  თუ არჩეულია easy mode მაშინ ბოლო 3 კვადრატს აქრობს
             squares[i].style.display = "none";
         }
        //  squares[i].style.backgroundColor = colors[i];
     }
    //  h1-ის დივს backgroundze ურესეტებს ფერს
     h1.style.background = "steelblue";
}

resetButton.addEventListener("click", function(){
    // არაიში ამატებს იმდენ ფერს რამდენიც numSquare-ში არის მითითებული
    colors = generateRandomColors(numSquares);
    // pickedColor ცვლადს ანიჭებს რანდომ მნიშვნელობას
    pickedColor = pickColor();
    // h1-ის სპანში არჩეული ფერის რიცხვითი მნიშვნელობა გამოაქ rgb("1,1,1");
    colorDisplay.textContent = pickedColor;
    // button-ის სპანს არესეტებს
    messeageDisplay.textContent = "";
    // და Play Again სტრინგი ხდება New Color-ი
    this.textContent = "New Colors";
    // change colors of squares
    //როცა play again-ს ან new color-ს დავაჭერთ აგენერირებს ახალ ფერებს
    for(let i=0; i<squares.length; i++){
        squares[i].style.backgroundColor = colors[i];
    }
    // h1-ზე არესეტებს backgrounds
    h1.style.background = "steelblue";
});

colorDisplay.textContent = pickedColor;

function changeColors(color){
    // ვასრულებთ for Loops
    for(let i=0; i<squares.length; i++){
    // ვცვლით თითოეული კვადრატის ფერს სწორი კვადრატის ფერით
    squares[i].style.backgroundColor = color;
    }
}

// ეს ფუნქცია დააბრუნებს colors არაიში შემავალი 6 ფერიდან ერთ-ერთს
function pickColor(){
    let random = Math.floor(Math.random() * colors.length);
    return colors[random];
}


function generateRandomColors(num){
    // შევქმნა ცარიელი არაი
    let arr = [];
    // დაამატებს Push მეთოდით randomColor ფუნქციით მიღებულ სხვადასხვა ფერებს
    // იმდენჯერ დალუპავს რამდენიც მითითებული იქნება color ცვლადში 
    for(var i=0; i<num; i++){
        arr.push(randomColor());
    }
    // დააბრუნებს არაის
    return arr;
}

function randomColor(){
    // აირჩევს წითელ ფერს 0-255 რადიუსში
    let r = Math.floor(Math.random() * 256);
    // აირჩევს მწვანე ფერს 0-255 რადიუსში
    let g = Math.floor(Math.random() * 256);
    // აირჩევს ლურჯ ფერს 0-255 რადიუსში
    let b =  Math.floor(Math.random() * 256);

    // დააბრუნებს დიდ სტრინგს rgb("რანდომ რიცხვებით");
    return "rgb(" + r + ", " + g + ", " + b + ")";
}