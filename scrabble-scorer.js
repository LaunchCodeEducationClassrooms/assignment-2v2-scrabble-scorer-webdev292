// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

//let word = input.question("Enter your word here: ");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};
let inputWord = '';

function oldScrabbleScorer(word) {
  word = word.toUpperCase();
  let letterPoints = "";
  let totalScore = 0;
  for (let i = 0; i < word.length; i++) {
    for (const pointValue in oldPointStructure) {
      if (oldPointStructure[pointValue].includes(word[i])) {
        totalScore += Number(pointValue);
        letterPoints += `Points for '${word[i]}': ${pointValue}\n`
      }
    }
  }
  return { letterPoints: letterPoints, totalScore: totalScore };
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
  inputWord = input.question("Enter a word to score:");
};


function scrabbleScore(word, newPointStructure) {
  let scrabbleScore = 0;
  for (i = 0; i < word.length; i++) {
    scrabbleScore += newPointStructure[word[i].toLowerCase()];
  }
  return scrabbleScore;
}

function simpleScore(word) {
  return word.length;
}

newPointStructure = function() {
  let transformedObj = transform(oldPointStructure);
  return transformedObj;
}

function vowelBonusScore(word) {
  let vowels = ['A', 'E', 'I', 'O', 'U'];
  word = word.toUpperCase();
  let score = 0;
  for (i = 0; i < word.length; i++) {
    if (vowels.includes(word[i])) {
      score += 3;
    } else {
      score += 1;
    }
  }
  return score;
}


const scoringAlgorithms = [{
  name: "simple score",
  description: "each letter worth 1 point",
  scoringFunction: simpleScore
},
{
  name: "Bonus vowel",
  description: "vowels are 3 points, consonents are 1 point.",
  scoringFunction: vowelBonusScore
},
{
  name: "scrabbleScore",
  description: "the scroring scoringAlgorithms.",
  scoringFunction: scrabbleScore
}
];

function scorerPrompt(word) {
  scoringType = input.keyInSelect(scoringAlgorithms, `Which scoring algorithm would you like to use?
   \n1 - Simple: One point per character 
   \n2 - Vowel Bonus: Vowels are worth 3 points
   \n3 - Scrabble: Uses scrabble point system`, {cancel:false});
  
  console.log('Seleted algorithm is ', scoringAlgorithms[scoringType])
  if (scoringType === 0) {
    console.log("algorithm name: ", scoringAlgorithms[0].name);
    console.log("scorerFunction result: ", scoringAlgorithms[0].scoringFunction(inputWord));
    
  } else if (scoringType === 1) {
    console.log("algorithm name: ", scoringAlgorithms[1].name);
    console.log("scorerFunction result: ", scoringAlgorithms[1].scoringFunction(inputWord));

  } else if (scoringType === 2) {
    console.log("algorithm name: ", scoringAlgorithms[2].name);
    console.log("scorer Function result: ", scoringAlgorithms[2].scoringFunction(inputWord, newPointStructure()));
  }

  return scoringAlgorithms[scoringType];
};

function transform(oldPointStructure) {
  let newObj = {};
  for (const [key, value] of Object.entries(oldPointStructure)) {
    value.map(function(val) {
      var keyVal = { [val.toLowerCase()]: Number(key) };
      newObj = { ...newObj, ...keyVal };
    })
  }
  return newObj;
};



function runProgram() {
  transform(oldPointStructure);
  initialPrompt();
  scorerPrompt();
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
  initialPrompt: initialPrompt,
  transform: transform,
  oldPointStructure: oldPointStructure,
  simpleScore: simpleScore,
  vowelBonusScore: vowelBonusScore,
  scrabbleScore: scrabbleScore,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt
};

