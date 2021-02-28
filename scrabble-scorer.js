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


function scrabbleScore(word) {
  let scrabbleScore = 0;
  for (i = 0; i < word.length; i++) {
    scrabbleScore += Number(newPointStructure[word[i].toLowerCase()]);
  }
  return scrabbleScore;
}

let scrabbleScoreObject = {
  'name': 'scrabble',
  'description': 'The traditional scroring algorithm',
  'scorerFunction': function(word) { return scrabbleScorer(word); }

};

function simpleScorer(word) {
  return word.length;
}

let simpleScoreObject = {
  'name': 'simple score',
  'description': 'each letter worth 1 point',
  'scorerFunction': function(word) { return simpleScorer(word); }

};

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

let vowelBonusScoreObject = {
  'name': 'vowel BonusScore',
  'description': 'vowels are worth 3 points, and each consonant is     worth 1   point',
  'scorerFunction': function(word) { return vowelBonusScore(word); }

};
//let scrabbleScore = 0;

const scoringAlgorithms = [{
  name: "simple score",
  description: "each letter worth 1 point",
  scorerFunction: simpleScorer
},
{
  name: "Bonus vowel",
  description: "vowels are 3 points, consonents are 1 point.",
  scorerFunction: vowelBonusScore
},
{
  name: "scrabble",
  description: "the scroring scoringAlgorithms.",
  scorerFunction: scrabbleScore,
}
];

function scorerPrompt(word) {
  scoringType = input.keyInSelect(scoringAlgorithms, `Which scoring algorithm would you like to use?
   \n0 - Simple: One point per character 
   \n1 - Vowel Bonus: Vowels are worth 3 points
   \n2 - Scrabble: Uses scrabble point system`);

  console.log('Seleted algorithm is ', scoringAlgorithms[scoringType])
  if (scoringType === 0) {
    console.log("algorithm name: ", scoringAlgorithms[0].name);
    console.log("scorerFunction result: ", scoringAlgorithms[0].scorerFunction(inputWord));
  } else if (scoringType === 1) {
    console.log("algorithm name: ", scoringAlgorithms[1].name);
    console.log("scorerFunction result: ", scoringAlgorithms[1].scorerFunction(inputWord));
  } else if (scoringType === 2) {
    console.log("algorithm name: ", scoringAlgorithms[2].name);
    console.log("scorerFunction result: ", scoringAlgorithms[2].scorerFunction(inputWord));
  }
  return scoringAlgorithms[scoringType];
};

newPointStructure = function transform(oldPointStructure) {
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
  simpleScorer: simpleScorer,
  vowelBonusScore: vowelBonusScore,
  scrabbleScore: scrabbleScore,
  scoringAlgorithms: scoringAlgorithms,
  newPointStructure: newPointStructure,
  runProgram: runProgram,
  scorerPrompt: scorerPrompt
};

