/**
 * n = 3 일 때,
 * 0 1 2
 * 7 8 3
 * 6 5 4
 * 의 달팽이 배열이 나오고,
 * return 값은 [{ row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 }, { row: 1, col: 2 }, ... , { row: 2, col: 2 }]
 */
export function generateSnailPositionArray(
  n: number
): { row: number; col: number }[] {
  const snailPositionArray = Array(n ** 2).fill(null);
  const snailIndexArray = Array(n ** 2).fill(-1);

  let direction: 'left' | 'right' | 'up' | 'bottom' = 'right';
  let row = 0;
  let col = 0;

  for (let count = 0; count < snailIndexArray.length; count++) {
    snailPositionArray[count] = { row, col };

    snailIndexArray[row * n + col] = count;
    switch (direction) {
      case 'right':
        if (col + 1 < n && snailIndexArray[row * n + col + 1] === -1) {
          col += 1;
        } else {
          direction = 'bottom';
          row += 1;
        }
        break;
      case 'bottom':
        if (row + 1 < n && snailIndexArray[(row + 1) * n + col] === -1) {
          row += 1;
        } else {
          direction = 'left';
          col -= 1;
        }
        break;
      case 'left':
        if (col - 1 >= 0 && snailIndexArray[row * n + col - 1] === -1) {
          col -= 1;
        } else {
          direction = 'up';
          row -= 1;
        }
        break;
      case 'up':
        if (row - 1 >= 0 && snailIndexArray[(row - 1) * n + col] === -1) {
          row -= 1;
        } else {
          direction = 'right';
          col += 1;
        }
        break;
    }
  }

  return snailPositionArray;
}
