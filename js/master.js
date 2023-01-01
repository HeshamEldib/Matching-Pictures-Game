// start play
let items = document.querySelectorAll(".play .content .item");
let start = document.querySelector(".play .info .start");
let restart = document.querySelector(".play .info .restart");
let ending = document.querySelector(".play .info .ending");
let time = document.querySelectorAll(".play .info .time span");
let barrier = document.querySelector(".play .box .barrier");

let cont = 0;
let tim;
let t = 0;
let tm = 0;
let n = 0;
let retes = true;

start.addEventListener("click", (e) => {
    cont++;
    let tes = false;
    let tesTow = true;
    retes = false;
    if (cont % 2 != 0) {
        e.target.textContent = "Stop";
        barrier.style.display = "none";
        if (cont < 2) {
            mixing(items);
            items.forEach((e) => {
                e.children[0].classList.add("active");
                tesTow = false;
            });
            setTimeout(() => {
                items.forEach((e) => {
                    e.children[0].classList.remove("active");
                    tes = true;
                });
                if (tes) {
                    tim = setInterval(() => {
                        t++;
                        if (t < 60) {
                            time[1].textContent = t < 10 ? "0" + t : t;
                        } else {
                            t = 0;
                            tm++;
                            time[0].textContent = tm < 10 ? "0" + tm : tm;
                        }
                    }, 1000);
                }
            }, 3000);
        }
        if (tes || tesTow) {
            tim = setInterval(() => {
                t++;
                if (t < 60) {
                    time[1].textContent = t < 10 ? "0" + t : t;
                } else {
                    t = 0;
                    tm++;
                    time[0].textContent = tm < 10 ? "0" + tm : tm;
                }
            }, 1000);
        }
    }
    if (cont % 2 == 0) {
        e.target.textContent = "Start";
        clearInterval(tim);
        barrier.style.display = "block";
    }
    let allFinsh = document.querySelectorAll(".play .content .item .image.finsh");
    allFinsh.forEach((e) => {
        e.classList.remove("finsh");
    });
});
restart.addEventListener("click", (e) => {
    t = 0;
    cont = 1;
    barrier.style.display = "none";
    mixing(items);
    items.forEach((e) => {
        e.children[0].classList.add("active");
        tesTow = false;
    });
    setTimeout(() => {
        items.forEach((e) => {
            e.children[0].classList.remove("active");
            tes = true;
            start.textContent = "Stop";
        });
        if (retes) {
            tim = setInterval(() => {
                t++;
                if (t < 60) {
                    time[1].textContent = t < 10 ? "0" + t : t;
                } else {
                    t = 0;
                    tm++;
                    time[0].textContent = tm < 10 ? "0" + tm : tm;
                }
            }, 1000);
        }
    }, 3000);
    time[0].textContent = "00";
    time[1].textContent = "00";
    let allFinsh = document.querySelectorAll(".play .content .item .image.finsh");
    allFinsh.forEach((e) => {
        e.classList.remove("finsh");
    });
});
ending.addEventListener("click", (e) => {
    t = -1;
    cont = 0;
    setTimeout(() => {
        clearInterval(tim);
        start.textContent = "Start";
        time[0].textContent = "00";
        time[1].textContent = "00";
    }, 1000);
});

function mixing(items) {
    for (let i = 0; i < items.length; i++) {
        items[i].style.order = Math.trunc(items.length * Math.random());
    }
}

items.forEach((item) => {
    item.addEventListener("click", (e) => {
        e.target.parentElement.classList.toggle("active");
        let allActive = document.querySelectorAll(".play .content .item .image.active");
        e.stopPropagation();
        if (allActive.length >= 2) {
            if (allActive[0].dataset.number == allActive[1].dataset.number) {
                allActive[0].classList.add("finsh");
                allActive[1].classList.add("finsh");
                allActive[0].classList.remove("active");
                allActive[1].classList.remove("active");
                n++;
            } else {
                allActive.forEach((ee) => {
                    setTimeout(() => {
                        ee.classList.remove("active");
                    }, 1000);
                });
            }
        }
        setTimeout(() => {
            if (items.length == 2 * n) {
                clearInterval(tim);
                n = 0;
            }
        }, 1000);
    });
});

// end play