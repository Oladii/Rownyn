let selection = figma.currentPage.selection;
let selecionLength = figma.currentPage.selection.length;
let clone: SceneNode[] = [];
let map: number[] = [];
let startX = 0;
let startY = 0;
let margin = 80;

main();

function main() {
    if (selecionLength == 0){
        figma.closePlugin("А что выравнивать то?");
    }
    else {
        createClone();
        sortArray();
        createMap();
        findStart();
        setPosition();
        figma.closePlugin("Теперь ровненько");
    }
}

function createClone() {
    let output = "";
    for (var i = 0; i < selecionLength; i++) {
        clone[i] = figma.currentPage.selection[i];
        output = output + clone[i].name + " "
    }
    console.log("original | " + output);
}

function sortArray() {
    clone.sort(function (a, b) {
        var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
        if (nameA < nameB) //сортируем строки по возрастанию
            return -1
        if (nameA > nameB)
            return 1
        return 0 // Никакой сортировки
    })
}

function createMap() {
    let output = "";
    for (var i = 0; i < selecionLength; i++) {
        for (var j = 0; j < selecionLength; j++) {
            if (selection[i].name == clone[j].name) {
                map[i] = j;
                output = output + map[i] + " "
            }
        }
    }
    console.log("mapping | " + output);
}

function findStart() {
    startX = selection[0].x;
    startY = selection[0].y;
    for (var i = 1; i < selecionLength; i++) {
        if (selection[i].x < startX) startX = selection[i].x;
        if (selection[i].y < startY) startY = selection[i].y;
    }
    console.log("x=" + startX + ", y=" + startY);
}

function setPosition() {
    let positionX = startX;
    let positionY = startY;
    for (var i = 0; i < selecionLength; i++) {
        selection[map[i]].x = positionX;
        selection[map[i]].y = positionY;
        positionX = positionX + selection[map[i]].width + margin;
    }

}


