document.getElementById('matrixForm').addEventListener('submit', function(event) {
    event.preventDefault();
    let matrix1 = parseMatrix(document.getElementById('matrix1Input').value);
    let matrix2 = parseMatrix(document.getElementById('matrix2Input').value);
   
    const operation = document.querySelector('input[name="operation"]:checked').value;
  
    if (operation === 'addition') {
      if (validateMatrices(matrix1, matrix2)) {
        let result = addMatrices(matrix1, matrix2);
        displayResult(result);
      } else {
        alert("Matrices must have the same dimensions for addition.");
      }
    } else if (operation === 'subtraction') {
      if (validateMatrices(matrix1, matrix2)) {
        let result = subtractMatrices(matrix1, matrix2);
        displayResult(result);
      } else {
        alert("Matrices must have the same dimensions for subtraction.");
      }
    } else if (operation === 'multiplication') {
      if (validateMultiplication(matrix1, matrix2)) {
        let result = multiplyMatrices(matrix1, matrix2);
        displayResult(result);
      } else {
        alert("Number of columns in Matrix 1 must equal number of rows in Matrix 2 for multiplication.");
      }
    } else if (operation === 'division') {
      if (validateDivision(matrix2)) {
        let result = divideMatrices(matrix1, matrix2);
        displayResult(result);
      } else {
        alert("Cannot divide by zero or the number of columns in Matrix 1 must equal number of rows in Matrix 2 for division.");
      }
    }
  });
  
  function parseMatrix(input) {
    return input.trim().split('\n').map(row => row.trim().split(' ').map(Number));
  }
  
  function validateMatrices(matrix1, matrix2) {
    return matrix1.length === matrix2.length && matrix1[0].length === matrix2[0].length;
  }
  
  function validateMultiplication(matrix1, matrix2) {
    return matrix1[0].length === matrix2.length;
  }
  
  function validateDivision(matrix2) {
    return !matrix2.some(row => row.some(val => val === 0));
  }
  
  function addMatrices(matrix1, matrix2) {
    return matrix1.map((row, i) => row.map((val, j) => val + matrix2[i][j]));
  }
  
  function subtractMatrices(matrix1, matrix2) {
    return matrix1.map((row, i) => row.map((val, j) => val - matrix2[i][j]));
  }
  
  function multiplyMatrices(matrix1, matrix2) {
    let result = [];
    for (let i = 0; i < matrix1.length; i++) {
      result[i] = [];
      for (let j = 0; j < matrix2[0].length; j++) {
        let sum = 0;
        for (let k = 0; k < matrix1[0].length; k++) {
          sum += matrix1[i][k] * matrix2[k][j];
        }
        result[i][j] = sum;
      }
    }
    return result;
  }
  
  function divideMatrices(matrix1, matrix2) {
    return matrix1.map((row, i) => row.map((val, j) => val / matrix2[i][j]));
  }
  
  function displayResult(matrix) {
    let resultElement = document.getElementById('result');
    resultElement.innerHTML = ''; // Clear previous content
    matrix.forEach(row => {
      let rowElement = document.createElement('div');
      rowElement.textContent = row.join(' ');
      resultElement.appendChild(rowElement);
    });
  }