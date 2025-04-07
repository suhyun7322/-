let doors = ["염소", "염소", "자동차"];
let userChoice = null;
let montyOpens = null;
let finalChoice = null;

// 통계 변수
let switchWins = 0;
let switchLosses = 0;
let stayWins = 0;
let stayLosses = 0;

function shuffleDoors() {
    doors.sort(() => Math.random() - 0.5);
}

function chooseDoor(choice) {
    if (userChoice === null) {
        userChoice = choice;
        document.getElementById("message").innerText = `🚪 ${choice + 1}번 문을 선택하셨습니다!`;

        let remainingDoors = [0, 1, 2].filter(i => i !== userChoice && doors[i] === "염소");
        montyOpens = remainingDoors[Math.floor(Math.random() * remainingDoors.length)];

        document.getElementById(`door${montyOpens}`).innerText = "🐐";
        document.getElementById(`door${montyOpens}`).disabled = true;

        document.getElementById("message").innerText += "\n남은 문 중 하나를 선택하거나, 원래 선택을 유지하세요!";
    } else if (choice !== montyOpens) {
        finalChoice = choice;
        showResult();
    }
}

function showResult() {
    let result = doors[finalChoice];

    document.getElementById(`door${finalChoice}`).innerText = result === "자동차" ? "🚗" : "🐐";

    document.getElementById("message").innerText = result === "자동차"
        ? "🎉 축하합니다! 자동차를 얻었습니다! 🎉"
        : "🐐 아쉽네요, 염소입니다!";

    // 통계 처리
    let switched = finalChoice !== userChoice;
    if (switched) {
        result === "자동차" ? switchWins++ : switchLosses++;
    } else {
        result === "자동차" ? stayWins++ : stayLosses++;
    }

    // 통계 업데이트
    document.getElementById("switchStats").innerText = `바꿨을 때: 성공 ${switchWins}번 / 실패 ${switchLosses}번`;
    document.getElementById("stayStats").innerText = `바꾸지 않았을 때: 성공 ${stayWins}번 / 실패 ${stayLosses}번`;

    for (let i = 0; i < 3; i++) {
        document.getElementById(`door${i}`).disabled = true;
    }

    document.getElementById("restartBtn").style.display = "inline";
}

function restartGame() {
    userChoice = null;
    montyOpens = null;
    finalChoice = null;
    shuffleDoors();

    document.getElementById("message").innerText = "문을 하나 선택하세요!";

    for (let i = 0; i < 3; i++) {
        document.getElementById(`door${i}`).innerText = "🚪";
        document.getElementById(`door${i}`).disabled = false;
    }

    document.getElementById("restartBtn").style.display = "none";
}

shuffleDoors();
