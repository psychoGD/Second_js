

function main() {
    let mytable = document.getElementById("myTable");
    let content = "";
    let id = 1;
    let numbers = [];

    let counter = 0
    for (let i = 0; i < 4; i++) {
        content += "<tr>";
        for (let k = 0; k < 4; k++) {
            let buffer = getRandom(10);
            numbers.push(buffer);

            content += `
            <td id='${i + 1}${k + 1}' onclick='show(id)'>
                
            </td>
            `;
            ++id;
            ++counter;
        }
        content += "</tr>";
    }

    // alert(randomid)
    mytable.innerHTML = content;
    // FillCubes()
    FillCubes()
}
function getRandomNumberList() {
    let cons_list = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8]
    let randomIndexs = [];
    let randomList = [];
    for (let i = 0; i < cons_list.length; i++) {
        let random = getRandom(16);
        if (!randomIndexs.includes(random)) {
            randomIndexs[i] = random
        }
        else {
            i--;
        }

    }

    for (let i = 0; i < randomIndexs.length; i++) {
        randomList[i] = cons_list[randomIndexs[i]]
    }
    return randomList;
}
const flipcard = [
    { transform: "rotateY(0)" },
    { transform: "rotateY(180deg)" },
    { backgroundColor: 'red' }
];
const flipcardTiming = {

    duration: 1000,
    iterations: 1
};
function FlipCardFunc(element, time, deg = "180deg", bg = "red") {
    setTimeout(() => {

        element.animate(flipcard, flipcardTiming);
        element.style.transform = `rotateY(${deg})`
        element.style.backgroundColor = 'red'
        element.style.backfaceVisibility = 'visible';
        element.style.color = bg;
        element.style.transformStyle = '3d';
        let child = element.firstChild
        child.style.display = 'none'
    }, time);
}
function FillCubes() {
    let randomList = getRandomNumberList();
    let index = 0
    let imagesList = []
    for (let i = 0; i < 9; i++) {
        imagesList.push(`<img src='img/${i}.jpg'></img>`)
    }
    for (let i = 0; i < 4; i++) {

        for (let k = 0; k < 4; k++) {
            let element = document.getElementById(`${i + 1}${k + 1}`)
            element.style.objectFit = "scale-down"

            element.innerHTML = imagesList[randomList[index]]

            // element.innerHTML = randomList[index]
            index++;
        }
    }

    for (let i = 0; i < 4; i++) {

        for (let k = 0; k < 4; k++) {
            let element = document.getElementById(`${i + 1}${k + 1}`)
            FlipCardFunc(element, 4000);
        }
    }

}




function getRandom(max) {
    return Math.floor(Math.random() * max);
}

function IsEqualImgs(first, second) {
    let img1Id = String(first.innerHTML).split("/")[1]
    let img2Id = String(second.innerHTML).split("/")[1]
    console.log(img1Id)
    console.log(img2Id)
    if (img1Id[0] == img2Id[0]) {
        console.log("true")
        return true
    }


}
var current_num1;
var current_num2;
function handleClick(event) {
    console.log('Clicked:', event.target.textContent);
}
function show(id) {
    let element = document.getElementById(id);

    // let string_num = String(id)
    // let row = string_num[0]
    // let col = string_num[1]

    // element.innerHTML = `${row}${col}`
    // FillCubes()
    element.style.transform = 'rotateY(0)'
    element.style.backgroundColor = 'transparent'
    let child = element.firstChild
    child.style.display = 'inline'

    if (current_num2 != undefined) {
        current_num1 = undefined
        current_num2 = undefined
        current_num1 = element
    }
    else if (current_num1 == undefined) {
        console.log("Current num 1")
        current_num1 = element
    }
    else if (current_num1 != undefined) {

        if (IsEqualImgs(current_num1, element)) {
            element.onclick = "";
            current_num1.onclick = "";
            element.style.backgroundColor = "green"
            current_num1.style.backgroundColor = "green"
            
            current_num1 = undefined
            current_num2 = undefined
            return
        }
        else {
            setTimeout(() => {
                FlipCardFunc(current_num1, 1)
                FlipCardFunc(element, 1)
                console.log("wrong-------------")
                current_num1 = undefined
                current_num2 = undefined
                return
            }, 1000);


        }
    }

}

main()