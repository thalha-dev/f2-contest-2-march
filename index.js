let score;
function OpeningCeremony(callback) {
  console.log("EVENT: OPENNING CEREMONY");
  setTimeout(() => {
    console.log("Let the games begin");
    score = { red: 0, blue: 0, green: 0, yellow: 0 };
    console.log(JSON.stringify(score));
    callback(score);
  }, 1000);
}

function Race100M(score, callback) {
  console.log("EVENT: RACE100M");
  console.log("previous score :");
  console.log(JSON.stringify(score));
  setTimeout(() => {
    const setRandomTime = [
      { color: "red", timeGenerated: 0 },
      { color: "green", timeGenerated: 0 },
      { color: "yellow", timeGenerated: 0 },
      { color: "blue", timeGenerated: 0 },
    ];

    setRandomTime.map((o) => {
      o.timeGenerated = Math.floor(Math.random() * (15 - 10 + 1)) + 10;
      return o;
    });

    // sort by timeGenerated
    setRandomTime.sort((a, b) => a.timeGenerated - b.timeGenerated);

    let leastColor = setRandomTime[0].color;
    let secondLeastColor = setRandomTime[1].color;

    // update score
    for (const key in score) {
      if (score.hasOwnProperty(key)) {
        if (key === leastColor) {
          score[key] += 50;
        }
        if (key === secondLeastColor) {
          score[key] += 25;
        }
      }
    }

    console.log("updated new score :");
    console.log(JSON.stringify(score));
    callback(score);
  }, 3000);
}

function LongJump(score, callback) {
  console.log("EVENT: LONG JUMP");
  console.log("previous score :");
  console.log(JSON.stringify(score));
  setTimeout(() => {
    //random color select
    let colors = ["red", "blue", "green", "yellow"];
    let randomColorSelect = colors[Math.floor(Math.random() * 5)];

    // update score
    score[randomColorSelect] += 150;

    console.log("updated new score :");
    console.log(JSON.stringify(score));
    callback(score);
  }, 2000);
}
function HighJump(score, callback) {
  console.log("EVENT: HIGH JUMP");
  console.log("previous score :");
  console.log(JSON.stringify(score));
  let colorName = prompt("What color secured highest jump? ", "");
  if (
    (colorName && colorName === "red") ||
    colorName === "green" ||
    colorName === "blue" ||
    colorName === "yellow"
  ) {
    score[colorName] += 100;
    console.log("updated new score :");
    console.log(JSON.stringify(score));
  } else {
    console.log("Event was cancelled");
  }

  callback(score);
}
function AwardCeremony(score) {
  console.log("EVENT: AWARD CEREMONY");
  let result = [];
  for (const key in score) {
    if (score.hasOwnProperty(key)) {
      result.push({
        color: key,
        achieved: score[key],
      });
    }
  }

  console.log(JSON.stringify(score));
  result.sort((a, b) => a.achieved - b.achieved);
  console.log(
    `${result[3].color} came first with ${result[3].achieved} points`
  );
  console.log(
    `${result[2].color} came second with ${result[2].achieved} points`
  );
  console.log(
    `${result[1].color} came third with ${result[1].achieved} points`
  );
}

OpeningCeremony(() => {
  Race100M(score, (score) => {
    LongJump(score, (score) => {
      HighJump(score, (score) => {
        AwardCeremony(score);
      });
    });
  });
});
