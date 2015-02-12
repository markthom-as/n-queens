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
  var board = new Board({n: n});
  var solution = [];
  var checkRow = function(rowIndex) {
    if (rowIndex>=n) {
      return;
    }
    var row = board.get(rowIndex);
    for (var i=0; i<row.length; i++) {
      board.togglePiece(rowIndex,i);
      if (!board.hasAnyRooksConflicts()) {
        solution.push(row);
        checkRow(rowIndex+1);
        return;
      }
      board.togglePiece(rowIndex,i);
    }
  };
  checkRow(0);
  console.log(solution);
  // debugger;

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // // solve using factorial
  function factorial(n) {
    if (n===0) {
      return 1;
    } else {
      return n*factorial(n-1);
    }
  }
  return factorial(n);

  // var solutionCount = 0;

  // var recurse = function(queenArr, rowI) {
  //   if (rowI === n) {
  //     if (queenArr.length === n) {
  //       solutionCount++;
  //     }
  //     return;
  //   }
  //   for (var colI=0; colI<n; colI++) {
  //     var board = new Board({n:n});
  //     // add old queens from array
  //     _.each(queenArr, function(queenLoc) {
  //       board.togglePiece(queenLoc[0],queenLoc[1]);
  //     });
  //     // add new queen
  //     board.togglePiece(rowI, colI);
  //     if (!board.hasAnyRooksConflicts()) {
  //       // if no conflict, add new queen to array and move to next row
  //       recurse(queenArr.concat([[rowI, colI]]), rowI+1);
  //     }
  //   }
  // };
  // recurse([], 0);

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  // return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  var solutionQueenArr = [];

  var recurse = function(queenArr, rowI) {
    if (solutionQueenArr.length>0) {
      return;
    }

    if (rowI === n) {
      if (queenArr.length === n) {
        solutionQueenArr = queenArr;
      }
      return;
    }
    for (var colI=0; colI<n; colI++) {
      var board = new Board({n:n});
      // add old queens from array
      _.each(queenArr, function(queenLoc) {
        board.togglePiece(queenLoc[0],queenLoc[1]);
      });
      // add new queen
      board.togglePiece(rowI, colI);
      if (!board.hasAnyQueenConflictsOn(rowI, colI)) {
        // if no conflict, add new queen to array and move to next row
        recurse(queenArr.concat([[rowI, colI]]), rowI+1);
      }
    }
  };
  recurse([], 0);

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

  var solution = makeEmptyMatrix(n);
  _.each(solutionQueenArr, function(queenPos) {
    solution[queenPos[0]][queenPos[1]] = 1;
  });

  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {

  var solutionCount = 0;

  var recurse = function(queenArr, rowI) {
    if (rowI === n) {
      if (queenArr.length === n) {
        solutionCount++;
      }
      return;
    }
    for (var colI=0; colI<n; colI++) {
      var board = new Board({n:n});
      // add old queens from array
      _.each(queenArr, function(queenLoc) {
        board.togglePiece(queenLoc[0],queenLoc[1]);
      });
      // add new queen
      board.togglePiece(rowI, colI);
      if (!board.hasAnyQueenConflictsOn(rowI, colI)) {
        // if no conflict, add new queen to array and move to next row
        recurse(queenArr.concat([[rowI, colI]]), rowI+1);
      }
    }
  };
  recurse([], 0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
