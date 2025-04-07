let switchWins = 0;
let switchLosses = 0;
let stayWins = 0;
let stayLosses = 0;
let doors = ["염소", "염소", "자동차"]; // 3개의 문 (랜덤으로 섞임)
let userChoice = null;
let montyOpens = null;
let finalChoice = null;

function shuffleDoors() {
    doors.sort(() => Math.random() - 0.5); // 문을 랜덤으로 섞음
}

function chooseDoor(choice) {
    if (userChoice === null) {
        // 첫 번째 선택 (사회자가 염소 공개)
        userChoice = choice;
        document.getElementById("message").innerText = `🚪 ${choice + 1}번 문을 선택하셨습니다!`;

        // 사회자가 염소가 있는 문 하나를 열어줌
        let remainingDoors = [0, 1, 2].filter(i => i !== userChoice && doors[i] === "염소");
        montyOpens = remainingDoors[Math.floor(Math.random() * remainingDoors.length)];
        
        document.getElementById(`door${montyOpens}`).innerText = "🐐"; // 염소 공개
        document.getElementById(`door${montyOpens}`).disabled = true; // 선택 불가 처리

        document.getElementById("message").innerText += "\n남은 문 중 하나를 선택하거나, 원래 선택을 유지하세요!";
    } else if (choice !== montyOpens) {
        // 두 번째 선택 (원래 선택 유지 or 변경)
        finalChoice = choice;
        showResult();
    }
}

function showResult() {
    let result = doors[finalChoice]; // 자동차인지 염소인지 확인

    // 선택한 문을 열어서 결과 표시
    document.getElementById(`door${finalChoice}`).innerText = result === "자동차" ? "🚗" : "🐐";
    
    // 메시지 업데이트
    document.getElementById("message").innerText = result === "자동차" 
        ? "🎉 축하합니다! 자동차를 얻었습니다! 🎉" 
        : "🐐 아쉽네요, 염소입니다!";
    
    // 모든 문 클릭 불가
    for (let i = 0; i < 3; i++) {
        document.getElementById(`door${i}`).disabled = true;
    }

    // 다시 하기 버튼 표시
    document.getElementById("restartBtn").style.display = "inline";
}

function restartGame() {
    // 모든 변수 초기화
    userChoice = null;
    montyOpens = null;
    finalChoice = null;
    shuffleDoors(); // 문 재배치

    // UI 초기화
    document.getElementById("message").innerText = "문을 하나 선택하세요!";
    
    for (let i = 0; i < 3; i++) {
        document.getElementById(`door${i}`).innerText = "🚪";
        document.getElementById(`door${i}`).disabled = false;
    }

    document.getElementById("restartBtn").style.display = "none";
}

// 문을 섞고 시작
shuffleDoors();
