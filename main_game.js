document.addEventListener("DOMContentLoaded", () => {
    const gameArea = document.getElementById("gameArea");
    const catcher = document.getElementById("catcher");
    const totalDisplay = document.getElementById("total");
    const scoreDisplay = document.getElementById("score");
    const gameAreaWidth = gameArea.clientWidth;
    const catcherWidth = catcher.clientWidth;
    let score = 0;
    let count = 0;
    let itemsCaught = 0;

    const CSE = ['pics/cse1.webp', 'pics/cse2.webp'];
    const EEE = ['pics/eee1.webp', 'pics/eee2.webp'];
    const ETE = ['pics/ete1.webp', 'pics/ete2.webp'];
    const ECE = ['pics/ece1.webp', 'pics/ece2.webp'];
    const CE = ['pics/ce1.webp', 'pics/ce2.webp'];
    const ME = ['pics/me1.webp', 'pics/me2.webp'];
    const MSE = ['pics/mse1.webp', 'pics/mse2.webp'];
    const MTE = ['pics/mte1.webp', 'pics/mte2.webp'];
    const IPE = ['pics/ipe1.webp', 'pics/ipe2.webp'];
    const URP = ['pics/urp1.webp', 'pics/urp2.webp'];
    const CFPE = ['pics/cfpe1.webp', 'pics/cfpe2.webp'];
    const GCE = ['pics/gce1.webp', 'pics/gce2.webp'];
    const BECM = ['pics/becm1.webp', 'pics/becm2.webp'];
    const ARCH = ['pics/arch1.webp', 'pics/arch2.webp'];
    let selected;

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }
    const dept = getQueryParam('dept');
    const name = getQueryParam('name');
    // const selected = new Array();
    let imgArray = CSE.concat(EEE, ETE, ECE, ME, CE, IPE, MSE, MTE, URP, BECM, ARCH, GCE, CFPE);
    
    if (dept == 'CSE'){
        selected = CSE;
    }
    else if(dept == 'EEE'){
        selected = EEE;
    }
    else if(dept == 'ETE'){
        selected = ETE;
    }
    else if(dept == 'ECE'){
        selected = ECE;
    }
    else if(dept == 'ME'){
        selected = ME;
    }
    else if(dept == 'CE'){
        selected = CE;
    }
    else if(dept == 'MTE'){
        selected = MTE;
    }
    else if(dept == 'IPE'){
        selected = IPE;
    }
    else if(dept == 'MSE'){
        selected = MSE;
    }
    else if(dept == 'GCE'){
        selected = GCE;
    }
    else if(dept == 'URP'){
        selected = URP;
    }
    else if(dept == 'BECM'){
        selected = BECM;
    }
    else if(dept == 'ARCH'){
        selected = ARCH;
    }
    else if(dept == 'CFPE'){
        selected = CFPE;
    }
    

    // Remove selected images from imgArray
    for (let i = 0; i < 2; i++) {
        if (imgArray.includes(selected[i])) {
            let index = imgArray.indexOf(selected[i]);
            imgArray.splice(index, 1);
        }
    }

    // Make randomArray
    let randomArray = [];
    
    for (let i = 0; i < 10; i++) {
        randomArray[i] = imgArray[Math.floor(Math.random() * imgArray.length)];
    }

    // make the final array with desired items and some random items
    let finalArray = selected.concat(randomArray);

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    function catchSound(url, playbackRate = 1.5) {
        var sound = new Audio();
        sound.src = url;
        sound.preload = 'auto';
        sound.playbackRate = playbackRate;
        sound.play();
        if (sound.paused) {
            sound.play();
        }
        return sound;
    }
    

    function createFallingItem() {
        if (itemsCaught >= 15 || count == 15 ) {
            console.log("Game over");
            window.location.href = `final_page.html?name=${name}&score=${score}&dept=${dept}`;
            clearInterval(gameInterval);
            return;
        }
        const item = document.createElement("div");
        item.classList.add("fallingItem");

        const itemImg = document.createElement("img");
        const finalItem = finalArray[Math.floor(Math.random() * finalArray.length)];
        itemImg.src = finalItem;

        if (selected.includes(finalItem)) {
            item.classList.add("goodItem");
        } else {
            item.classList.add("badItem");
        }

        item.appendChild(itemImg);
        item.style.left = `${Math.random() * (gameAreaWidth - 30)}px`;
        item.style.top = '0px';
        gameArea.appendChild(item);

        // console.log(`Item created at position: ${item.style.left}, ${item.style.top}`);

        let fallingInterval = setInterval(() => {
            const itemTop = item.offsetTop;
            const itemLeft = item.offsetLeft;
            if (itemTop >= gameArea.clientHeight) {
                clearInterval(fallingInterval);
                gameArea.removeChild(item);

                if (selected.includes(finalItem)) {
                    count++;
                }
            }
            if (itemLeft >= catcher.offsetLeft - 80 &&
                itemLeft <= catcher.offsetLeft + 25 && 
                itemTop >= catcher.offsetTop - 30){
                itemsCaught++;
                catchSound('catch.mp3');
                totalDisplay.innerText = `Total Courses Taken: ${itemsCaught}`;

                if (selected.includes(finalItem)) {
                    score += 1;
                    count++;
                    // console.log(`Score updated: ${score}`);
                    totalDisplay.innerText = `Total Courses Taken: ${itemsCaught}`;
                    scoreDisplay.innerText = `Relevent Courses Taken: ${score}`;
                }
                gameArea.removeChild(item);
                clearInterval(fallingInterval);
            }
            else {
                item.style.top = `${itemTop + 5}px`;
            }
        }, 50);
    }

    setInterval(createFallingItem, 1000);

    function moveCatcher(clientX) {
        if (clientX >= 50 && clientX <= gameAreaWidth + 50) {
            catcher.style.left = `${clientX - catcherWidth / 2}px`;
        }
    }

    document.addEventListener("mousemove", (e) => {
        moveCatcher(e.clientX);
    });

    document.addEventListener("touchmove", (e) => {
        const touch = e.touches[0];
        moveCatcher(touch.clientX);
    });
});
