function Game() {
    this.field = "<div id ='f!coords' class ='fields_cell .class'></div>";
    this.cheker = "<div id ='chek!coords' class = 'cheker .class' ></div>";
    this.on = false;
    this.dragObj = {};
    this.moveObj = {
        battle: {}
    };
    //this.localStorageData = [];
    this.currentColor = "white";
}

const init = () => {
    this.chekers = document.getElementsByClassName("cheker");
    this.desk = document.getElementById("desk");
    this.body = document.getElementById("body");
    this.move = document.getElementById("playerMove");
    this.deskArr = [0, 1, 0, 1, 0, 1, 0, 1,
        1, 0, 1, 0, 1, 0, 1, 0,
        0, 1, 0, 1, 0, 1, 0, 1,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        2, 0, 2, 0, 2, 0, 2, 0,
        0, 2, 0, 2, 0, 2, 0, 2,
        2, 0, 2, 0, 2, 0, 2, 0];
    this.game = new Game();

    if (localStorage.getItem("desk") !== null) {
        desk.innerHTML = localStorage.getItem("desk");
    } else {
        game.addFields();
        game.addCheker();
        game.addLocalStorage();
    }
    game.addListener();
};

Game.prototype.blackSquerAt = coord => (coord % 8 + Math.floor(coord / 8)) % 2;

Game.prototype.addFields = () => {
    for (let i = 0; i < 64; i++) {
        desk.innerHTML += game.field.replace("!coords", i).replace(".class", game.blackSquerAt(i) ? 'fields_cell-black' : "");
    }
};

Game.prototype.addCheker = () => {
    for (let i = 0; i < 64; i++) {
        const fld = document.getElementById(`f${i}`);

        if (deskArr[i] === 0) {
            continue;
        } else if (deskArr[i] === 1) {
            fld.innerHTML = game.cheker.replace("!coords", i).replace(".class", "cheker-red");
        } else {
            fld.innerHTML = game.cheker.replace("!coords", i).replace(".class", "cheker-white");
        }
    }
};

Game.prototype.addLocalStorage = () => {
    localStorage.setItem("desk", desk.innerHTML)
};

Game.prototype.addListener = () => {
    document.addEventListener("mousemove", game.onMove);
    this.move.addEventListener("click", game.toggleEnemy);

    for (let i = 0; i < chekers.length; i++) {
        chekers[i].addEventListener("mousedown", game.onDown);
        chekers[i].addEventListener("mouseup", game.onUp);
        chekers[i].addEventListener("mouseover", game.getMoveObj);
        chekers[i].addEventListener("mouseleave", () => game.moveObj = { battle: {} });
    }
};

Game.prototype.onDown = e => {
    if (game.currentColor !== e.target.getAttribute("class").slice(14)) {
        alert("Не твой ход!");
        return;
    }

    game.on = true;
    game.dragObj.elem = e.target;
    game.dragObj.oldDiv = e.target.parentNode;
    game.dragObj.color = e.target.getAttribute("class").slice(14);
    document.body.append(e.target);
    e.target.style.position = "absolute";
    game.dragObj.elem.style.left = `${e.pageX - 45}px`;
    game.dragObj.elem.style.top = `${e.pageY - 45}px`;
};

Game.prototype.onMove = e => {
    if (game.on) {
        game.dragObj.elem.style.left = `${e.pageX - 45}px`;
        game.dragObj.elem.style.top = `${e.pageY - 45}px`;
    }
};

Game.prototype.onUp = e => {
    game.on = false;
    e.target.setAttribute("display", "hide");

    let div = document.elementFromPoint(e.clientX, e.clientY);

    setTimeout(() => {
        e.target.removeAttribute("display");
    }, 1);

    game.moveCheker(div);
    game.getMoveObj(e);
    game.makeChekerQueen(game.dragObj.color);
};

Game.prototype.toggleEnemy = () => {
    if (game.currentColor === "white") {
        game.currentColor = "red";
    } else {
        game.currentColor = "white";
    }
};

const getElem = number => {
    if (number < 1 || number > 63) {
        return false;
    }

    return document.getElementById(`f${number}`);
};

Game.prototype.getMoveObj = event => {
    const id = parseInt(event.target.parentNode.getAttribute("id").replace("f", ""));

    if (id === 56) {
        game.moveObj.rightTop = getElem(id - 7).firstChild ? getElem(id - 7).firstChild : getElem(id - 7);
        game.moveObj.battle.rightTopBattle = getElem(id - 14).firstChild ? getElem(id - 14).firstChild : getElem(id - 14);

    } else if (id === 58) {
        game.moveObj.rightTop = getElem(id - 7).firstChild ? getElem(id - 7).firstChild : getElem(id - 7);
        game.moveObj.battle.rightTopBattle = getElem(id - 14).firstChild ? getElem(id - 14).firstChild : getElem(id - 14);
        game.moveObj.leftTop = getElem(id - 9).firstChild ? getElem(id - 9).firstChild : getElem(id - 9);
        game.moveObj.battle.leftTopBattle = getElem(id - 18).firstChild ? getElem(id - 18).firstChild : getElem(id - 18);
    } else if (id === 60) {
        game.moveObj.leftTop = getElem(id - 9).firstChild ? getElem(id - 9).firstChild : getElem(id - 9);
        game.moveObj.battle.leftTopBattle = getElem(id - 18).firstChild ? getElem(id - 18).firstChild : getElem(id - 18);
        game.moveObj.rightTop = getElem(id - 7).firstChild ? getElem(id - 7).firstChild : getElem(id - 7);
    } else if (id === 8) {
        game.moveObj.rightTop = getElem(id - 7).firstChild ? getElem(id - 7).firstChild : getElem(id - 7);
        game.moveObj.rightBottom = getElem(id + 9).firstChild ? getElem(id + 9).firstChild : getElem(id + 9);
        game.moveObj.battle.rightBottomBattle = getElem(id + 18).firstChild ? getElem(id + 18).firstChild : getElem(id + 18);
    } else if (id === 1) {
        game.moveObj.rightBottom = getElem(id + 9).firstChild ? getElem(id + 9).firstChild : getElem(id + 9);
        game.moveObj.leftBottom = getElem(id + 7).firstChild ? getElem(id + 7).firstChild : getElem(id + 7);
        game.moveObj.battle.rightBottomBattle = getElem(id + 18).firstChild ? getElem(id + 18).firstChild : getElem(id + 18);
    } else if (id === 62) {
        game.moveObj.leftTop = getElem(id - 9).firstChild ? getElem(id - 9).firstChild : getElem(id - 9);
        game.moveObj.rightTop = getElem(id - 7).firstChild ? getElem(id - 7).firstChild : getElem(id - 7);
        game.moveObj.battle.leftTopBattle = getElem(id - 18).firstChild ? getElem(id - 18).firstChild : getElem(id - 18);
    } else if (id === 3 || id === 5) {
        game.moveObj.rightBottom = getElem(id + 9).firstChild ? getElem(id + 9).firstChild : getElem(id + 9);
        game.moveObj.leftBottom = getElem(id + 7).firstChild ? getElem(id + 7).firstChild : getElem(id + 7);
        game.moveObj.battle.leftBottomBattle = getElem(id + 14).firstChild ? getElem(id + 14).firstChild : getElem(id + 14);
        game.moveObj.battle.rightBottomBattle = getElem(id + 18).firstChild ? getElem(id + 18).firstChild : getElem(id + 18);
    } else if (id === 24 || id === 40) {
        game.moveObj.rightTop = getElem(id - 7).firstChild ? getElem(id - 7).firstChild : getElem(id - 7);
        game.moveObj.rightBottom = getElem(id + 9).firstChild ? getElem(id + 9).firstChild : getElem(id + 9);
        game.moveObj.battle.rightTopBattle = getElem(id - 14).firstChild ? getElem(id - 14).firstChild : getElem(id - 14);
        game.moveObj.battle.rightBottomBattle = getElem(id + 18).firstChild ? getElem(id + 18).firstChild : getElem(id + 18);
    } else if (id === 7) {
        game.moveObj.leftBottom = getElem(id + 7).firstChild ? getElem(id + 7).firstChild : getElem(id + 7);
        game.moveObj.battle.leftBottomBattle = getElem(id + 14).firstChild ? getElem(id + 14).firstChild : getElem(id + 14);
    } else if (id === 23 || id === 39 || id === 55) {
        game.moveObj.leftTop = getElem(id - 9).firstChild ? getElem(id - 9).firstChild : getElem(id - 9);
        game.moveObj.leftBottom = getElem(id + 7).firstChild ? getElem(id + 7).firstChild : getElem(id + 7);
        game.moveObj.battle.leftTopBattle = getElem(id - 18).firstChild ? getElem(id - 18).firstChild : getElem(id - 18);
        game.moveObj.battle.leftBottomBattle = getElem(id + 14).firstChild ? getElem(id + 14).firstChild : getElem(id + 14);
    } else if (id === 17 || id === 33 || id === 49) {
        game.moveObj.rightTop = getElem(id - 7).firstChild ? getElem(id - 7).firstChild : getElem(id - 7);
        game.moveObj.rightBottom = getElem(id + 9).firstChild ? getElem(id + 9).firstChild : getElem(id + 9);
        game.moveObj.battle.rightTopBattle = getElem(id - 14).firstChild ? getElem(id - 14).firstChild : getElem(id - 14);
        game.moveObj.battle.rightBottomBattle = getElem(id + 18).firstChild ? getElem(id + 18).firstChild : getElem(id + 18);
        game.moveObj.leftTop = getElem(id - 9).firstChild ? getElem(id - 9).firstChild : getElem(id - 9);
        game.moveObj.leftBottom = getElem(id + 7).firstChild ? getElem(id + 7).firstChild : getElem(id + 7);
    } else if (id === 14 || id === 30 || id === 46) {
        game.moveObj.rightTop = getElem(id - 7).firstChild ? getElem(id - 7).firstChild : getElem(id - 7);
        game.moveObj.rightBottom = getElem(id + 9).firstChild ? getElem(id + 9).firstChild : getElem(id + 9);
        game.moveObj.leftTop = getElem(id - 9).firstChild ? getElem(id - 9).firstChild : getElem(id - 9);
        game.moveObj.leftBottom = getElem(id + 7).firstChild ? getElem(id + 7).firstChild : getElem(id + 7);
        game.moveObj.battle.leftTopBattle = getElem(id - 18).firstChild ? getElem(id - 18).firstChild : getElem(id - 18);
        game.moveObj.battle.leftBottomBattle = getElem(id + 14).firstChild ? getElem(id + 14).firstChild : getElem(id + 14);
    } else {
        game.moveObj.rightTop = getElem(id - 7).firstChild ? getElem(id - 7).firstChild : getElem(id - 7);
        game.moveObj.rightBottom = getElem(id + 9).firstChild ? getElem(id + 9).firstChild : getElem(id + 9);
        game.moveObj.battle.rightTopBattle = getElem(id - 14).firstChild ? getElem(id - 14).firstChild : getElem(id - 14);
        game.moveObj.battle.rightBottomBattle = getElem(id + 18).firstChild ? getElem(id + 18).firstChild : getElem(id + 18);
        game.moveObj.leftTop = getElem(id - 9).firstChild ? getElem(id - 9).firstChild : getElem(id - 9);
        game.moveObj.leftBottom = getElem(id + 7).firstChild ? getElem(id + 7).firstChild : getElem(id + 7);
        game.moveObj.battle.leftTopBattle = getElem(id - 18).firstChild ? getElem(id - 18).firstChild : getElem(id - 18);
        game.moveObj.battle.leftBottomBattle = getElem(id + 14).firstChild ? getElem(id + 14).firstChild : getElem(id + 14);
    }

    game.addLocalStorage();

    if (game.getColor(event) === "white" && game.moveObj.leftBottom) {
        game.moveObj.leftBottom.setAttribute("noMove", "true");
    }
    if (game.getColor(event) === "white" && game.moveObj.leftTop) {
        game.moveObj.leftTop.setAttribute("noMove", "false");
    }
    if (game.getColor(event) === "white" && game.moveObj.rightTop) {
        game.moveObj.rightTop.setAttribute("noMove", "false")
    }
    if (game.getColor(event) === "white" && game.moveObj.rightBottom) {
        game.moveObj.rightBottom.setAttribute("noMove", "true");
    }
    if (game.getColor(event) === "red" && game.moveObj.rightTop) {
        game.moveObj.rightTop.setAttribute("noMove", "true");
    }
    if (game.getColor(event) === "red" && game.moveObj.rightBottom) {
        game.moveObj.rightBottom.setAttribute("noMove", "false");
    }
    if (game.getColor(event) === "red" && game.moveObj.leftBottom) {
        game.moveObj.leftBottom.setAttribute("noMove", "false");
    }
    if (game.getColor(event) === "red" && game.moveObj.leftTop) {
        game.moveObj.leftTop.setAttribute("noMove", "true");
    }
};

Game.prototype.moveCheker = div => {
    console.log(game.dragObj.elem);
    if (game.dragObj.elem.hasAttribute("queen") && div.getAttribute("class") === "fields_cell fields_cell-black" && game.queenMove(div)) {
        game.dragObj.elem.style.position = "relative";
        game.dragObj.elem.style.left = `${0}px`;
        game.dragObj.elem.style.top = `${0}px`;
        div.append(game.dragObj.elem);
        
        return;
    }
    for (let key in game.moveObj) {

        if (game.moveObj[key] === div && div.getAttribute("class") === "fields_cell fields_cell-black" && game.moveObj[key].getAttribute("noMove") !== "true") {
            game.dragObj.elem.style.position = "relative";
            game.dragObj.elem.style.left = `${0}px`;
            game.dragObj.elem.style.top = `${0}px`;
            div.append(game.dragObj.elem);
            
            return;
        } else if (key !== "battle") {
            game.battleOn(game.moveObj[key], div);
        } else {
            game.dragObj.elem.style.position = "relative";
            game.dragObj.elem.style.left = `${0}px`;
            game.dragObj.elem.style.top = `${0}px`;
            game.dragObj.oldDiv.append(game.dragObj.elem);
        }
    }
};

Game.prototype.removeCheker = (cheker, newPos, color) => {
    if (color !== game.dragObj.color) {
        document.body.append(cheker);
        game.dragObj.elem.style.position = "relative";
        game.dragObj.elem.style.left = `${0}px`;
        game.dragObj.elem.style.top = `${0}px`;
        newPos.append(game.dragObj.elem);
    }
};

Game.prototype.battleOn = (cheker, newPos) => {
    let color = cheker.getAttribute("class").slice(14);

    if (color !== game.dragObj.color && (color === "red" || color === "white")) {
        if (game.moveObj.battle.leftBottomBattle && game.moveObj.leftBottom && game.moveObj.leftBottom === cheker && game.moveObj.battle.leftBottomBattle.getAttribute("class") === "fields_cell fields_cell-black") {
            if (game.moveObj.battle.leftBottomBattle === newPos) {
                game.removeCheker(game.moveObj.leftBottom, game.moveObj.battle.leftBottomBattle, color);
            }
        } else if (game.moveObj.battle.rightBottomBattle && game.moveObj.rightBottom && game.moveObj.rightBottom === cheker && game.moveObj.battle.rightBottomBattle.getAttribute("class") === "fields_cell fields_cell-black") {
            if (game.moveObj.battle.rightBottomBattle === newPos) {
                game.removeCheker(game.moveObj.rightBottom, game.moveObj.battle.rightBottomBattle, color)
            }
        } else if (game.moveObj.battle.rightTopBattle && game.moveObj.rightTop && game.moveObj.rightTop === cheker && game.moveObj.battle.rightTopBattle.getAttribute("class") === "fields_cell fields_cell-black") {
            if (game.moveObj.battle.rightTopBattle === newPos) {
                game.removeCheker(game.moveObj.rightTop, game.moveObj.battle.rightTopBattle, color)
            }
        } else if (game.moveObj.battle.leftTopBattle && game.moveObj.leftTop && game.moveObj.leftTop === cheker && game.moveObj.battle.leftTopBattle.getAttribute("class") === "fields_cell fields_cell-black") {
            if (game.moveObj.battle.leftTopBattle === newPos) {
                game.removeCheker(game.moveObj.leftTop, game.moveObj.battle.leftTopBattle, color)
            }
        }
    }
};

Game.prototype.queenMove = div => {
    const id = parseInt(div.getAttribute("id").replace("f", ""));
    let oldPosition = parseInt(game.dragObj.oldDiv.getAttribute("id").replace("f", ""));
    let count = 0;
    let vector = 0;
    let i = 0;
    let elem;
    let delEl;

    if (!game.isFloat((oldPosition - id) / 7) && (oldPosition - id) / 7 > 0) {  
        i = (oldPosition - id) / 7;
        vector = -7;
    }
    if (!game.isFloat((oldPosition - id) / 7) && (oldPosition - id) / 7 < 0) { 
        i = (oldPosition - id) / 7;
        vector = 7;
    }
    if (!game.isFloat((oldPosition - id) / 9) && (oldPosition - id) / 9 > 0) { 
        i = (oldPosition - id) / 9;
        vector = -9;
    }
    if (!game.isFloat((oldPosition - id) / 9) && (oldPosition - id) / 9 < 0) { 
        i = (oldPosition - id) / 9;
        vector = 9;
    }
    if (i < 0) {
        i = i * (-1);
    }

    for (let j = 0; j < i; j++) {
        elem = document.getElementById(`f${oldPosition + vector}`);

        if (elem.firstChild) {
            count++;
            
            delEl = elem.firstChild;
            oldPosition = oldPosition + vector;
        } else if (!elem.firstChild) {
            oldPosition = oldPosition + vector;
        }
    }

    if (count < 2) {
        document.body.append(delEl);
        return true;
    } else if (count > 2) {
        return;
    }
};

Game.prototype.makeChekerQueen = ChekerColor => {
    if (ChekerColor === "white" && (game.dragObj.elem.parentNode.id === "f1" || game.dragObj.elem.parentNode.id === "f3" || game.dragObj.elem.parentNode.id === "f5" || game.dragObj.elem.parentNode.id === "f7")) {
        game.dragObj.elem.setAttribute("queen", "on");
    } else if (ChekerColor === "red" && (game.dragObj.elem.parentNode.id === "f56" || game.dragObj.elem.parentNode.id === "f58" || game.dragObj.elem.parentNode.id === "f60" || game.dragObj.elem.parentNode.id === "f62")) {
        game.dragObj.elem.setAttribute("queen", "on");
    }
};

Game.prototype.getColor = event => {
    return event.target.getAttribute("class").slice(14);
};

Game.prototype.isFloat = number => {
    return parseInt(number) !== parseFloat(number);
};

init();