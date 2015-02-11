/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  console.log('findNRooksSolution: ' + n)
  var solution = new Board({n: n}); //fixme

  var insertRooks = function(){
    debugger;
    var counter = 0;
    var randRowIndex = Math.floor(Math.random() * n);
    var randColIndex = Math.floor(Math.random() * n);
    if(n = 1){
      randRowIndex = 0;
      randColIndex = 0;
    }
    console.log(randRowIndex, randColIndex);
    if(solution.get(randRowIndex)[randColIndex] !== 1 && !solution.hasRowConflictAt(randRowIndex) && !solution.hasColConflictAt(randColIndex)){
      counter++;
      solution.togglePiece(randRowIndex, randColIndex);
    }

    if(counter < n){
      console.log('recurse');
      insertRooks();
    }
  };


  //for(var i=0; i<n; i++){
    insertRooks();
  //}
  var temp = solution.attributes;
  solution = [];
  for (var key in temp){
    if(key !== 'n'){
      solution.push(temp[key]);
      console.log(solution);
    }
    
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
