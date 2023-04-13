let points = 0;
var highscore = localStorage.getItem("highscore");
var highscorename = localStorage.getItem("highscorename");



let playerYMove = Math.floor(Math.random() * 5);
let playerXMove = Math.floor(Math.random() * 5);
let zombieX = Math.floor(Math.random() * 5);
let zombieY = Math.floor(Math.random() * 5);
while (zombieX == playerXMove && zombieY == playerYMove) {
    zombieX = Math.floor(Math.random() * 5);
    zombieY = Math.floor(Math.random() * 5);
}
let background = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24]
];



let randomCat = Math.floor(Math.random() * 24);

// [];
// for (let i = 0, j = 5; i < j; i++) {
//     let randomNumber = Math.floor(Math.random() * 25);
//     if (!randomCat.includes(randomNumber)) {
//         randomCat.push(randomNumber);
//     }
// }
let randomZombieCat = background[zombieX][zombieY]

let death = false;


buttons()
movePlayer()
drawStatus()
drawHighscore()

// function choosenumber(max) {
//     choosenumbermax = max
//     document.getElementById("showtotal").innerHTML = choosenumbermax;
//     background.push(max)
//     drawMap()
// }

function clearHighestScore() {
    highscore.innerHTML = ""
    localStorage.clear();
    reload()
    drawHighscore();
}

function movePlayer(move) {
    let riskMoveZombie = Math.floor(Math.random() * 5);
    switch (move) {
        case 1: if (playerXMove != 0) {
            playerXMove--;
            if (riskMoveZombie < 2) {
                moveZombie();
            }
        }
            break;
        case 2: if (playerXMove != background.length - 1) {
            playerXMove++;
            if (riskMoveZombie < 2) {
                moveZombie();
            }
        }
            break;
        case 3: if (playerYMove != 0) {
            playerYMove--;
            if (riskMoveZombie < 2) {
                moveZombie();
            }
        }
            break;
        case 4: if (playerYMove != background.length - 1) {
            playerYMove++;
            if (riskMoveZombie < 2) {
                moveZombie();
            }
        }
            break;
    }
    drawMap()
}

function moveZombie() {
    if (Math.abs(zombieX - playerXMove) > Math.abs(zombieY - playerYMove)) {
        if (zombieX < playerXMove) {
            zombieX++;
        }
        else if (zombieX > playerXMove) {
            zombieX--;
        }
    }
    else {
        if (zombieY < playerYMove) {
            zombieY++;
        }
        else if (zombieY > playerYMove) {
            zombieY--;
        }
    }

}

document.getElementById("buttonleft").addEventListener("click", function () { movePlayer(1); });
document.getElementById("buttonright").addEventListener("click", function () { movePlayer(2); });
document.getElementById("buttonup").addEventListener("click", function () { movePlayer(3); });
document.getElementById("buttondown").addEventListener("click", function () { movePlayer(4); });
document.getElementById("clearbutton").addEventListener("click", function () { clearHighestScore(); });



function buttons() {
    let buttontop = document.getElementById("buttontop")
    let buttonmid = document.getElementById("buttonmid")
    let buttonbot = document.getElementById("buttonbot")
    let buttonclear = document.getElementById("clearbutton")



    let left = document.createElement("input")
    left.setAttribute("type", "button")
    left.setAttribute("value", "Left")
    left.setAttribute("id", "buttonleft")

    let right = document.createElement("input")
    right.setAttribute("type", "button")
    right.setAttribute("value", "Right")
    right.setAttribute("id", "buttonright")

    let up = document.createElement("input")
    up.setAttribute("type", "button")
    up.setAttribute("value", "Up")
    up.setAttribute("id", "buttonup")

    let down = document.createElement("input")
    down.setAttribute("type", "button")
    down.setAttribute("value", "Down")
    down.setAttribute("id", "buttondown")

    let clear = document.createElement("input")
    clear.setAttribute("type", "button")
    clear.setAttribute("value", "Clear Highscore")
    clear.setAttribute("id", "clearbutton")
    if (clear && clear.style) {
        clear.style.width = '150px';
    }


    buttontop.appendChild(up)
    buttonmid.appendChild(left)
    buttonmid.appendChild(right)
    buttonbot.appendChild(down)
    buttonclear.appendChild(clear)

}

function drawMap() {
    if (playerXMove == zombieX && playerYMove == zombieY) {
        showZombieCat()
        death = true
        drawStatus()
    }
    let map = document.getElementById("map")
    map.innerHTML = ""

    let table = document.createElement("table");

    for (let i = 0; i < background.length; i++) {

        let row = table.insertRow()

        for (let j = 0; j < background[i].length; j++) {
            let cell = row.insertCell()

            if (playerYMove == i && playerXMove == j) {
                cell.innerHTML = "🕵"
            }
            else if (zombieY == i && zombieX == j) {
                randomZombieCat = background[i][j]
                cell.innerHTML = "💀"
            }
            else {
                cell.innerHTML = "&nbsp"
            }
        }
    }

    let backgroundNr = background[playerYMove][playerXMove]
    showplace.innerHTML = ""
    showPicture(backgroundNr)
    map.appendChild(table)
}

function showPicture(number) {
    let img = document.createElement("img")
    img.src = "/images/background" + number + ".jpg"
    let src = document.getElementById("showplace")
    if (img && img.style) {
        img.style.position = 'relative'
    }

    src.appendChild(img)
    if (playerXMove == zombieX && playerYMove == zombieY) {
        showZombieCat()
        death = true
    }
    else if (number == randomCat) {
        showCat()
        points += 1
        randomCat = Math.floor(Math.random() * 24);
        drawStatus()
    }
}

function drawHighscore() {
    let showhighscore = document.createElement("p")
    let src = document.getElementById("highscore")
    showhighscore.innerHTML = highscore == null ? "Highest score: 0" : "Highest score: " + highscore + " from " + highscorename

    src.appendChild(showhighscore)
}
function drawStatus() {
    let score = document.createElement("p")
    statustext.innerHTML = ""

    let buttontop = document.getElementById("buttontop")
    let buttonmid = document.getElementById("buttonmid")
    let buttonbot = document.getElementById("buttonbot")

    let src = document.getElementById("statustext")

    if (death == true || playerXMove == zombieX && playerYMove == zombieY) {
        score.innerHTML = "You are DEAD!"
        buttontop.setAttribute("style", "display: none")
        buttonmid.setAttribute("style", "display: none")
        buttonbot.setAttribute("style", "display: none")


        let revivebutton = document.getElementById("revivebutton")

        // let revive = document.createElement("input")
        // revive.setAttribute("type", "button")
        // revive.setAttribute("value", "Revive")
        // revive.setAttribute("id", "buttonrevive")


        // revivebutton.appendChild(revive)


        let inputnamebutton = document.getElementById("namebutton")

        if (points > highscore) {
            let labelname = document.createElement("input")
            labelname.setAttribute("id", "entername")

            let namebutton = document.createElement("input")

            let textWinner = document.createElement("P")
            textWinner.innerHTML = "You set a new highscore!"


            namebutton.setAttribute("type", "button")
            namebutton.setAttribute("value", "Enter name")
            namebutton.setAttribute("id", "buttonname")


            inputnamebutton.appendChild(textWinner)

            inputnamebutton.appendChild(labelname)
            inputnamebutton.appendChild(namebutton)

            
            if (highscore !== null) {
                if (points > highscore) {
                    localStorage.setItem("highscore", points);
                }
            }
            else {
                localStorage.setItem("highscore", points);
            }
            document.getElementById("buttonname").addEventListener("click", function () { saveName(); });
        }
        else {
            let revive = document.createElement("input")
            revive.setAttribute("type", "button")
            revive.setAttribute("value", "Revive")
            revive.setAttribute("id", "buttonrevive")
            
            
            revivebutton.appendChild(revive)
            document.getElementById("buttonrevive").addEventListener("click", function () { reload(); });
        }
        
        

    }
    else {
        // if (points == 5) {
        //     score.innerHTML = "You have rescued all cats!"

        //     button.setAttribute("style", "display: none")

        //     let revivebutton = document.getElementById("revivebutton")

        //     let revive = document.createElement("input")
        //     revive.setAttribute("type", "button")
        //     revive.setAttribute("value", "Rescue more!")
        //     revive.setAttribute("id", "buttonrevive")

        //     revivebutton.appendChild(revive)

        //     document.getElementById("buttonrevive").addEventListener("click", function () { reload(); });
        // }
        // else {
        score.innerHTML = "Cats rescued: " + points
        // }
    }


    src.appendChild(score)
}

function saveName() {
    highscorename = document.getElementById("entername").value
    localStorage.setItem("highscorename", highscorename);
    reload()
}

function reload() {
    location.reload();
}

function showCat() {
    let cat = document.createElement("img")
    cat.setAttribute("class", "cat")
    cat.src = "/images/cat.png"
    let src = document.getElementById("showplace")
    if (cat && cat.style) {
        cat.style.height = '50px';
        cat.style.width = '50px';
        cat.style.position = 'absolute';
        cat.style.backgroundColor = 'transparent'

    }
    src.appendChild(cat)
}

function showZombieCat() {
    let cat = document.createElement("img")
    cat.setAttribute("class", "zombiecat")
    cat.src = "/images/zombiecat.png"
    let src = document.getElementById("showplace")
    if (cat && cat.style) {
        cat.style.height = '100px';
        cat.style.width = '100px';
        cat.style.position = 'absolute';
        cat.style.backgroundColor = 'transparent'

    }
    src.appendChild(cat)
}


let cats = ["siamese", "abyssinian", "snowshoe", "persian", "laperm",
    "cornish", "bengal", "korat", "scottish", "ragdoll", "sphynx", "toyger"]

function getRandomItem(arr) {

    const randomIndex = Math.floor(Math.random() * arr.length);

    const item = arr[randomIndex];

    return item;
}
const randomCatName = getRandomItem(cats)
let options = {
    method: 'GET',
    headers: { 'X-Api-Key': 'IeRp+cr2j30nYjoGPtpTUQ==5Sts58T8bIGU2yux' }
}

let url = 'https://api.api-ninjas.com/v1/cats?name=' + randomCatName
const api = document.getElementById("api")
const api1 = document.getElementById("api1")


fetch(url, options)
    .then(res => res.json())
    .then(data => {
        console.log(data)

        let cats = data
        cats.map(function (cats) {
            let card = document.createElement("div")
            card.setAttribute("class", "card")

            let img = document.createElement("img")
            img.setAttribute("class", "catimg")
            img.src = cats.image_link

            card.appendChild(img)

            let card1 = document.createElement("div")
            card1.setAttribute("class", "card1")

            let name = document.createElement("h3")
            name.innerHTML = cats.name

            let origin = document.createElement("p")
            origin.innerHTML = "Origin: " + cats.origin

            let length = document.createElement("p")
            length.innerHTML = "Length: " + cats.length

            let age = document.createElement("p")
            age.innerHTML = "Age: up to " + cats.max_life_expectancy + " years."


            card1.appendChild(name)
            card1.appendChild(origin)
            card1.appendChild(length)
            card1.appendChild(age)

            api.appendChild(card)
            api1.appendChild(card1)

        })


    })
    .catch(err => {
        console.log(`error ${err}`)
    });
