export function popUpHandler() {
    let buttons = Array.from(document.getElementsByClassName("add-teacher-button"));
    let buttons2 = Array.from(document.getElementsByClassName("circle-person"));
    let closeButtons = Array.from(document.getElementsByClassName("pop-up__header__close-btn"));
    let bgClose = document.getElementById("pop-up__bg");
        
    buttons.forEach(element => {
        element.addEventListener("click", showAddTeacher);
    });

    buttons2.forEach(element => {
        element.addEventListener("click", showTeacherInfo);
    });

    closeButtons.forEach(element => {
        element.addEventListener("click", closePopUp);
    });

    if (bgClose) {
        bgClose.addEventListener("click", closePopUp);
    }
}

let container = document.getElementsByClassName("container")[0];
let bg = document.getElementById("pop-up__bg");

export function showAddTeacher() {
    container.style.filter = "blur(5px)";
    bg.style.display = "block";
    let target = document.getElementById("add-teacher-pop-up");

    target.style.display = "flex";
}

export function showTeacherInfo() {
    container.style.filter = "blur(5px)";
    bg.style.display = "block";
    let target = document.getElementById("teacher-info-pop-up");

    target.style.display = "flex";
}

export function closePopUp() {
    container.style.filter = "none";
    bg.style.display = "none";
    
    let popUps = document.querySelectorAll(".pop-up");
    popUps.forEach(popUp => {
        popUp.style.display = "none";
    });
}
