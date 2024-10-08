const battleshipGame = () => {
  const messages = {
    A: `🎉 Welcome to Battleship 🎉`,
    B: `Your ship sunk 💀`,
    B1: `Enemy ship sunk!💥`,
    C: `You missed 😰`,
    C1: `they missed 😅`,
    D1: `❌YOU LOST, GAME OVER! ❌`,
    E: `🥇 YOU WIN 🥇`,
  };

  // initialize counters to keep track of ships
  let totalComputerShips = 4;
  let sunkComputerShips = 0;
  let totalPlayerShips = 4;
  let sunkPlayerShips = 0;

  const shipSizes = [2, 1, 1];

  function resetGame() {
    computerGrid = createGrid();
    playerGrid = createGrid();
    totalComputerShips = 4;
    sunkComputerShips = 0;
    totalPlayerShips = 4;
    sunkPlayerShips = 0;
    placeComputerShip(computerGrid);
    gridDisplay(playerGrid);
  }
  // CREATING GRID 5 BY 5 FOR BATTLESHIP BOARD
  function createGrid() {
    // create array with 5 elements, fill with null values
    // create and fill each sub-array with 0, representing empty slot
    return Array(5)
      .fill(null)
      .map(() => Array(5).fill(0));
  }

  // CREATE PLAYER GRID AND COMPUTER GRID
  let computerGrid = createGrid();
  let playerGrid = createGrid();

  function canPlaceShip(grid, row, column, size, orientation) {
    // check if ship fits within grid horizontally (make sure it doesn't exceed grid's width)
    if (orientation === 'H') {
      if (column + size > 5) {
        return false;
      }
      // check if there is already a ship there
      // iterate through each slot where the ship would be depending on size
      for (let i = 0; i < size; i++) {
        // if grid[position][column] is not empty return false;
        if (grid[row][column + i] !== 0) {
          return false;
        }
      }
      // check if ship fits within grid vertically (make sure it doesn't exceed grid's height)
    } else if (orientation === 'V') {
      if (row + size > 5) {
        return false;
      }
      for (let i = 0; i < size; i++) {
        if (grid[row + i][column] !== 0) {
          return false;
        }
      }
    }
    return true;
  }

  // FUNCTION THAT PLACES COMPUTER SHIP
  // we need to ensure each ship is on a valid position
  // if it is NOT in a valid position it will continuously choose a position until all ships are placed validly
  function placeComputerShip(grid) {
    const arrHorV = ['H', 'V'];

    for (const size of shipSizes) {
      let placed = false;

      // while !placed (which evaluates to true), code will run
      // if ship placement is successful, placed = true
      // !placed now evaluates to false (!true = false)
      // loop will stop executing
      // therefore while !placed evaluates to true it will continue to run the loop
      while (!placed) {
        // generate random number from 0 to 4
        const row = Math.floor(Math.random() * 5);
        const column = Math.floor(Math.random() * 5);
        // randomly choose orientation (H or V)
        const orientation = arrHorV[Math.floor(Math.random() * 2)];

        // if ship can be created on chosen placements:
        if (canPlaceShip(grid, row, column, size, orientation)) {
          // if ship is horizontal:
          if (orientation === 'H') {
            // for each position starting from column to the end of the ship's size
            for (let i = 0; i < size; i++) {
              // place ship on the grid at current row & column position
              grid[row][column + i] = '🚢';
            }
          } else if (orientation === 'V') {
            for (let i = 0; i < size; i++) {
              grid[row + i][column] = '🚢';
            }
          }
          // placed reassigned to true
          placed = true;
        }
      }
    }
  }

  placeComputerShip(computerGrid);

  // FUNCTION TO HANDLE DISPLAY OF EACH SLOT IN GRID
  // if slot contains ship, and revealShips is false the function should return wave emoji
  // if the slot is empty when revealShips is false the function should return wave emoji
  function handleSlotDisplay(slot, revealShips) {
    // check if slot contains a ship and whether ships should be hidden
    // checks if revealShips is false (if we want ships hidden && slot contains a ship, we will return a wave)
    if (slot === '🚢' && !revealShips) {
      return '🌊';
    }
    // when this condition is false it will check if the slot is empty and return wave emoji, if not, it will return actual value of the slot
    return slot === 0 ? '🌊' : slot;
  }

  // CREATE FUNCTION TO FORMAT THE GRID FOR DISPLAY
  function formatGridWithAxis(grid, revealShips = false) {
    // create column label
    const columnLabel = '       1    2    3    4    5';
    const rowLabels = ['A', 'B', 'C', 'D', 'E'];
    // map each row to formatted string
    // this will iterate over each row of the grid array
    const formattedRows = grid.map((row, index) => {
      // assign rowLabel to index at rowLabels array
      const rowLabel = `${rowLabels[index]}  `;
      const formattedRow = row
        .map((slot) => handleSlotDisplay(slot, revealShips))
        .join(' ');

      // return rowLabel attached to formattedRow
      return `${rowLabel}${formattedRow}`;
    });
    // return final formatted string for entire grid
    return `${columnLabel}\n${formattedRows.join('\n')}`;
  }

  function formatGridForBrowser(grid) {
    return grid
      .map((row) => row.map((slot) => (slot === 0 ? '🌊' : slot)).join(' '))
      .join('\n');
  }

  function placePlayerShips(grid) {
    const rowObj = { A: 0, B: 1, C: 2, D: 3, E: 4 };
    const shipSizes = [2, 1, 1];
    // track whether it is the first ship being placed so that we only ask H or V for first ship
    let firstShip = true;
    // loop through each ship size
    for (const size of shipSizes) {
      // placed initially set to false to keep make sure while loop continues until the ship is correctly placed on the grid
      let placed = false;
      let orientation = 'H';

      while (!placed) {
        let row;
        let column;

        // ask player to choose orientation of ship (horizontal or vertical)
        if (firstShip) {
          while (true) {
            const orientationInput = prompt(
              `YOUR CURRENT BOARD:\n\n${formatGridWithAxis(
                grid,
                true
              )}\n\nDo you want to place the ship horizontally (H) or vertically (V)?`
            );

            orientation = orientationInput.toUpperCase();
            // make sure that orientation is either H or V, if it is we can exit to the next code block (asking player for )
            if (orientation === 'H' || orientation === 'V') break;
            alert(`Invalid letter. Enter 'H' (horizontal) or 'V' (vertical)`);
          }
          firstShip = false;
        }

        // ask player for row input
        // loop will continue running until user puts in valid input
        while (true) {
          const rowInput = prompt(
            `YOUR CURRENT BOARD:\n\n${formatGridWithAxis(
              grid,
              true
            )}\n\nEnter row letter (A-E) for (${size}X1) size ship:`
          );

          const rowLetter = rowInput.toUpperCase();
          // check if player's input exists as a key in the rowObj
          if (rowObj[rowLetter] !== undefined) {
            // row will be assigned to the value as it exists in object
            row = rowObj[rowLetter];
            // break to continue to next code block (asking for player's column input)
            break;
          }
          alert(`Invalid entry. Enter a letter between A and E.`);
        }

        // loop keeps running until player puts in valid column input number
        while (true) {
          const columnInput = prompt(
            `YOUR CURRENT BOARD:\n\n${formatGridWithAxis(
              grid,
              true
            )}\n\nEnter column number between 1 and 5 for (${size}X${size}) size ship:`
          );

          // converts player's input from string to a Number, subtract 1 to convert it to a 0 based index
          column = Number(columnInput) - 1;
          // check if column number is within 0 through 4 (inclusive)
          // 'break' if player's input is valid (proceed to showing the player's updated grid)
          if (column >= 0 && column < 5) break;
          alert(`Invalid entry. Enter a number between 1 and 5.`);
        }
        // determine whether the ship can be placed based on the player's inputs
        // if ship placement is valid then the ship is placed on the grid with updated ship emoji
        // if ship placement is not valid, player is alerted to try again
        if (canPlaceShip(grid, row, column, size, orientation)) {
          if (orientation === 'H') {
            for (let i = 0; i < size; i++) {
              grid[row][column + i] = '🚢';
            }
          } else if (orientation === 'V') {
            for (let i = 0; i < size; i++) {
              grid[row + i][column] = '🚢';
            }
          }
          placed = true;
        } else {
          alert(`There's already a ship there! Try again`);
        }
      }
    }
    gridDisplay(grid, true);

    // once ship is successfully placed, grid is updated and displayed to player
    alert(
      `Ship placed! Here's your final board:\n\n${formatGridWithAxis(
        grid,
        true
      )}`
    );
  }

  function fireAtComputer(row, column) {
    if (
      computerGrid[row][column] === '💣' ||
      computerGrid[row][column] === '💥'
    ) {
      alert("You've already attacked that location. Try again.");
      return false;
    }
    // Check if player hit or missed
    if (computerGrid[row][column] === '🚢') {
      // alert("Hit!"); // Player hit a ship
      computerGrid[row][column] = '💥'; // Mark the hit on the board
      sunkComputerShips++;
    } else {
      // alert("You missed!"); // Player missed
      computerGrid[row][column] = '💣'; // Mark the miss on the board
    }

    gridDisplay(computerGrid, false);
    return true;
  }

  function fireAtPlayer(row, column) {
    if (playerGrid[row][column] === '💥' || playerGrid[row][column] === '💣') {
      alert('test for bug here');
      return;
    }
    if (playerGrid[row][column] === '🚢') {
      alert(`You are now being attacked! \n\n...${messages.B}`);
      playerGrid[row][column] = '💥';
      sunkPlayerShips++;
    } else if (playerGrid[row][column] === '💣') {
      alert(`You are now being attacked! \n\n...${messages.C1}`);
    } else {
      alert(`You are now being attacked! \n\n...${messages.C1}`);
      playerGrid[row][column] = '💣';
    }
    gridDisplay(playerGrid, true);
  }

  // computer's turn with randomized attacks
  function computerTurn() {
    let row;
    let column;

    let validMove = false;
    while (!validMove) {
      row = Math.floor(Math.random() * 5);
      column = Math.floor(Math.random() * 5);
      // check if position hasn't been attacked;
      if (
        playerGrid[row][column] !== '💣' &&
        playerGrid[row][column] !== '💥'
      ) {
        validMove = true;
      }
    }
    fireAtPlayer(row, column);
  }

  function startGame() {
    resetGame();
    alert(messages.A);
    placePlayerShips(playerGrid);
    gridDisplay(playerGrid, true);

    // object to map player's input to indexes
    const rowObj = { A: 0, B: 1, C: 2, D: 3, E: 4 };

    function gameConditionCheck() {
      // keep track over gameOver condition
      let gameOver = false;
      // loop will run as long as !gameOver = true

      while (!gameOver) {
        let row;
        let column;

        // loop to get valid attack from the player
        while (true) {
          // ask player for row input
          const rowInput = prompt(
            `YOUR BOARD:\n\n${formatGridWithAxis(
              playerGrid,
              true
            )}\n\nCOMPUTER'S BOARD:\n\n${formatGridWithAxis(
              computerGrid
            )}\n\nEnter row letter (A-E) to attack:`
          ).toUpperCase();

          if (rowObj[rowInput] !== undefined) {
            row = rowObj[rowInput];
            break;
          }
          alert('Invalid entry. Enter a letter between A and E.');
        }

        while (true) {
          column =
            Number(
              prompt(
                `COMPUTER'S BOARD:\n\n${formatGridWithAxis(
                  computerGrid
                )}\n\nEnter column number between 1 and 5 to attack:`
              )
            ) - 1;
          if (column >= 0 && column < 5) {
            // if attack is valid it will go to next block of code (checking attack validity from fireAtComputer)
            break;
          }
          alert('Invalid entry. Enter a number between 1 and 5.');
        }
        // check attack validity based on return value of fireAtcomputer, if it is false it will skip to next iteration of the loop ('continue)
        // it will begin at the start of the while(!validattack) again and ask the player for inputs again
        if (!fireAtComputer(row, column)) {
          continue;
        }

        // if attack was valid, check if the ship was hit
        if (computerGrid[row][column] === '💥') {
          alert(messages.B1);
          if (sunkComputerShips === totalComputerShips) {
            alert(
              `${messages.E} \n\n Your Board: \n${formatGridWithAxis(
                playerGrid,
                true
              )}\n\nComputer's Board:\n${formatGridWithAxis(
                computerGrid,
                true
              )}`
            );
            gridDisplay(playerGrid, true);
            gameOver = true;
            break;
          }
        } else {
          alert(messages.C);
        }
        // check if all computer ships have been sunk and if so, inform player that they won with the final boards shown and revealed
        if (sunkComputerShips === totalComputerShips) {
          alert(
            `${messages.E} \n\n Your Board: \n${formatGridWithAxis(
              playerGrid,
              true
            )}\n\nComputer's Board:\n${formatGridWithAxis(computerGrid, true)}`
          );
          // display final state of player's board on browser
          gridDisplay(playerGrid, true);
          gameOver = true;
          // exit the while (!gameOver) loop, proceed to gameConditionCheck() where now the loop will stop executing b/c gameOver = true;
          break;
        }

        // COMPUTER TURN
        computerTurn();
        if (sunkPlayerShips === totalPlayerShips) {
          alert(
            `${messages.D1} \n\n Your Board: \n${formatGridWithAxis(
              playerGrid,
              true
            )}\n\nComputer's Board:\n${formatGridWithAxis(computerGrid, true)}`
          );
          gridDisplay(playerGrid, true);
          gameOver = true;
          break;
        }
      }
    }
    gameConditionCheck();
  }
  // set formatted string as text content of the DOM element
  function gridDisplay(grid, revealShips = false) {
    document.getElementById('grid').textContent = formatGridForBrowser(
      grid,
      revealShips
    );
  }

  gridDisplay(playerGrid);

  // return object methods to use outside of battleshipGame function
  return {
    startGame,
  };
};

const game = battleshipGame();
// make startGame function accessible from window object
window.startGame = game.startGame;
