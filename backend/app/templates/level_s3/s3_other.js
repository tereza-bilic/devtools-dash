var secret_word;

// DECOY FUNCTIONS - First Letter Variants
function assignFirstSecretLetter() {
  var secret_word = "WRONG";
  secret_word = `${secret_word}X`;
  maybeAddSecondLetter();
}

function addFirstSecretLetter() {
  var secret_word;
  secret_word = `${secret_word}Z`;
  possiblyAttachSecondLetter();
}

function attachFirstSecretLetter() {
  var secret_word = "DECOY";
  secret_word = `${secret_word}Q`;
  perhapsAssignSecondLetter();
}

function setFirstSecretLetter() {
  var secret_word;
  secret_word = `${secret_word}W`;
  couldBeSecondLetter();
}

function orMaybeAssignThisFirstLetter() {
  var secret_word;
  secret_word = `${secret_word}{{ level_session.finish_secret[0] }}`;
  assignSecondSecretLetter();
}

function initFirstSecretLetter() {
  var secret_word = "FAKE";
  secret_word = `${secret_word}R`;
  mightBeSecondLetter();
}

// DECOY FUNCTIONS - Second Letter Variants
function maybeAddSecondLetter() {
  var secret_word = "WRONG";
  secret_word = `${secret_word}Y`;
  definitelyThirdLetter();
}

function possiblyAttachSecondLetter() {
  var secret_word;
  secret_word = `${secret_word}U`;
  probablyThirdLetter();
}

function perhapsAssignSecondLetter() {
  var secret_word = "DECOY";
  secret_word = `${secret_word}I`;
  maybeThirdLetter();
}

function couldBeSecondLetter() {
  var secret_word;
  secret_word = `${secret_word}O`;
  possiblyThirdLetter();
}

function mightBeSecondLetter() {
  var secret_word = "FAKE";
  secret_word = `${secret_word}P`;
  perhapsThirdLetter();
}

function addSecondSecretLetter() {
  var secret_word;
  secret_word = `${secret_word}A`;
  couldBeThirdLetter();
}

function assignSecondSecretLetter() {
  secret_word = `${secret_word}{{ level_session.finish_secret[1] }}`;
  attachThirdSecretLetter();
}

function attachSecondSecretLetter() {
  var secret_word = "WRONG";
  secret_word = `${secret_word}S`;
  mightBeThirdLetter();
}

// DECOY FUNCTIONS - Third Letter Variants
function attachThirdSecretLetter() {
  var secret_word;
  secret_word = `${secret_word}{{ level_session.finish_secret[2] }}`;
  addFourthSecretLetter();
}

function definitelyThirdLetter() {
  var secret_word = "WRONG";
  secret_word = `${secret_word}D`;
  absolutelyFourthLetter();
}

function probablyThirdLetter() {
  var secret_word;
  secret_word = `${secret_word}F`;
  surelyFourthLetter();
}

function maybeThirdLetter() {
  var secret_word = "DECOY";
  secret_word = `${secret_word}G`;
  definitelyFourthLetter();
}

function possiblyThirdLetter() {
  var secret_word;
  secret_word = `${secret_word}H`;
  probablyFourthLetter();
}

function perhapsThirdLetter() {
  var secret_word = "FAKE";
  secret_word = `${secret_word}J`;
  maybeRealFourthLetter();
}

function couldBeThirdLetter() {
  var secret_word;
  secret_word = `${secret_word}K`;
  possiblyRealFourthLetter();
}

function mightBeThirdLetter() {
  var secret_word = "WRONG";
  secret_word = `${secret_word}L`;
  perhapsRealFourthLetter();
}

function addThirdSecretLetter() {
  var secret_word;
  secret_word = `${secret_word}Z`;
  couldBeRealFourthLetter();
}

// DECOY FUNCTIONS - Fourth Letter Variants
function absolutelyFourthLetter() {
  var secret_word = "WRONG";
  secret_word = `${secret_word}X`;
  totallyFifthLetter();
}

function surelyFourthLetter() {
  var secret_word;
  secret_word = `${secret_word}C`;
  completelyFifthLetter();
}

function definitelyFourthLetter() {
  var secret_word = "DECOY";
  secret_word = `${secret_word}V`;
  absolutelyFifthLetter();
}

function probablyFourthLetter() {
  var secret_word;
  secret_word = `${secret_word}B`;
  surelyFifthLetter();
}

function maybeRealFourthLetter() {
  var secret_word = "FAKE";
  secret_word = `${secret_word}N`;
  definitelyRealFifthLetter();
}

function possiblyRealFourthLetter() {
  var secret_word;
  secret_word = `${secret_word}M`;
  probablyRealFifthLetter();
}

function perhapsRealFourthLetter() {
  var secret_word = "WRONG";
  secret_word = `${secret_word}Q`;
  maybeActualFifthLetter();
}

function couldBeRealFourthLetter() {
  var secret_word;
  secret_word = `${secret_word}W`;
  possiblyActualFifthLetter();
}

function attachFourthSecretLetter() {
  var secret_word = "DECOY";
  secret_word = `${secret_word}E`;
  perhapsActualFifthLetter();
}

function addFourthSecretLetter() {
  secret_word = `${secret_word}{{ level_session.finish_secret[3] }}`;
  addFifthSecretLetter();
}


// DECOY FUNCTIONS - Fifth Letter Variants
function totallyFifthLetter() {
  var secret_word = "WRONG";
  secret_word = `${secret_word}R`;
  ultimatelySixthLetter();
}

function completelyFifthLetter() {
  var secret_word;
  secret_word = `${secret_word}T`;
  finallySixthLetter();
}

function absolutelyFifthLetter() {
  var secret_word = "DECOY";
  secret_word = `${secret_word}Y`;
  totallySixthLetter();
}

function surelyFifthLetter() {
  var secret_word;
  secret_word = `${secret_word}U`;
  completelySixthLetter();
}

function definitelyRealFifthLetter() {
  var secret_word = "FAKE";
  secret_word = `${secret_word}I`;
  absolutelyRealSixthLetter();
}

function probablyRealFifthLetter() {
  var secret_word;
  secret_word = `${secret_word}O`;
  surelyRealSixthLetter();
}

function maybeActualFifthLetter() {
  var secret_word = "WRONG";
  secret_word = `${secret_word}P`;
  definitelyActualSixthLetter();
}

function addFifthSecretLetter() {
  var secret_word;
  secret_word = `${secret_word}{{ level_session.finish_secret[4] }}`;
  assignSixthSecretLetter();
}

function possiblyActualFifthLetter() {
  var secret_word;
  secret_word = `${secret_word}A`;
  probablyActualSixthLetter();
}

function perhapsActualFifthLetter() {
  var secret_word = "DECOY";
  secret_word = `${secret_word}S`;
  maybeCorrectSixthLetter();
}

function attachFifthSecretLetter() {
  var secret_word;
  secret_word = `${secret_word}D`;
  possiblyCorrectSixthLetter();
}

// DECOY FUNCTIONS - Sixth Letter Variants
function ultimatelySixthLetter() {
  var secret_word = "WRONG";
  secret_word = `${secret_word}F`;
  finallySeventhLetter();
}

function finallySixthLetter() {
  var secret_word;
  secret_word = `${secret_word}G`;
  attachSeventhSecretLetter();
}

function totallySixthLetter() {
  var secret_word = "DECOY";
  secret_word = `${secret_word}H`;
  attachSeventhSecretLetter();
}

function completelySixthLetter() {
  var secret_word;
  secret_word = `${secret_word}J`;
  completelySeventhLetter();
}

function absolutelyRealSixthLetter() {
  var secret_word = "FAKE";
  secret_word = `${secret_word}K`;
  absolutelyFinalSeventhLetter();
}

function assignSixthSecretLetter() {
  secret_word = `${secret_word}{{ level_session.finish_secret[5] }}`;
  attachSeventhSecretLetter();
}

function surelyRealSixthLetter() {
  var secret_word;
  secret_word = `${secret_word}L`;
  surelyFinalSeventhLetter();
}

function definitelyActualSixthLetter() {
  var secret_word = "WRONG";
  secret_word = `${secret_word}Z`;
  definitelyFinalSeventhLetter();
}

function probablyActualSixthLetter() {
  var secret_word;
  secret_word = `${secret_word}X`;
  probablyFinalSeventhLetter();
}

function maybeCorrectSixthLetter() {
  var secret_word = "DECOY";
  secret_word = `${secret_word}C`;
  maybeActualSeventhLetter();
}

function possiblyCorrectSixthLetter() {
  var secret_word;
  secret_word = `${secret_word}V`;
  possiblyActualSeventhLetter();
}

function addSixthSecretLetter() {
  var secret_word = "WRONG";
  secret_word = `${secret_word}B`;
  perhapsActualSeventhLetter();
}

// DECOY FUNCTIONS - Seventh Letter Variants (Dead Ends)
function finallySeventhLetter() {
  var secret_word = "WRONG";
  secret_word = `${secret_word}N`;
  console.log("WRONG PATH: " + secret_word);
}

function ultimatelySeventhLetter() {
  var secret_word;
  secret_word = `${secret_word}M`;
  console.log("DECOY PATH: " + secret_word);
}

function totallySeventhLetter() {
  var secret_word = "DECOY";
  secret_word = `${secret_word}Q`;
  console.log("FAKE PATH: " + secret_word);
}

function completelySeventhLetter() {
  var secret_word;
  secret_word = `${secret_word}W`;
  console.log("INCORRECT PATH: " + secret_word);
}

function absolutelyFinalSeventhLetter() {
  var secret_word = "FAKE";
  secret_word = `${secret_word}E`;
  console.log("MISLEADING PATH: " + secret_word);
}

function surelyFinalSeventhLetter() {
  var secret_word;
  secret_word = `${secret_word}R`;
  console.log("FALSE PATH: " + secret_word);
}

function definitelyFinalSeventhLetter() {
  var secret_word = "WRONG";
  secret_word = `${secret_word}T`;
  console.log("TRAP PATH: " + secret_word);
}

function probablyFinalSeventhLetter() {
  var secret_word;
  secret_word = `${secret_word}Y`;
  console.log("DUMMY PATH: " + secret_word);
}

function maybeActualSeventhLetter() {
  var secret_word = "DECOY";
  secret_word = `${secret_word}U`;
  console.log("BAIT PATH: " + secret_word);
}

function possiblyActualSeventhLetter() {
  var secret_word;
  secret_word = `${secret_word}I`;
  console.log("DISTRACTION PATH: " + secret_word);
}

function perhapsActualSeventhLetter() {
  var secret_word = "WRONG";
  secret_word = `${secret_word}O`;
  console.log("RED HERRING PATH: " + secret_word);
}

function attachSeventhSecretLetter() {
  /*TODO pause here, as we didn't yet create secrets going so far, just print the secret here*/
  /*This function been called by function that added sixth letter to the word and now wants me to add seventh*/
  /*Each function should have added one letter to the secret word but some are missing. You may need to retrace my steps*/
  console.log(secret_word);
  debugger;
}

function addSeventhSecretLetter() {
  var secret_word;
  secret_word = `${secret_word}P`;
  console.log("MISDIRECTION PATH: " + secret_word);
}
