window.onload = () => {
  
  // jumlah nyawa pemain 
  const limit = 3;
  let heart = limit;
  
  const number1 = document.querySelector('.number1');
  const number2 = document.querySelector('.number2');
  const operator = document.querySelector('.operator');
  
  function loadResult() {
    // dapatkan angka acak 
    let num1 = Number(getRandomNumber(1, 10));
    let num2 = Number(getRandomNumber(1, 10));
    // jalankan fungsi set operator dan tentukan operator sesuai angka yang didapat
    let opr = setOperator(getRandomNumber(1, 4));
    // set value kedalam element
    number1.textContent = num1;
    number2.textContent = num2;
    operator.textContent = opr;
    // dapatkan total dari angka dan operator yang didapat
    return getResult(num1, num2, opr);
  }
  
  let result = loadResult();
  
  function getRandomNumber(min, max) {
    // guna untuk mendapatkan angka acak 
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  function setOperator(number) {
    switch (number) {
      // jika menghasilkan angka 1, set operator tambah
      case 1 : return '+';
      // jika menghasilkan angka 2, set operator kurang
      case 2 : return '-';
      // jika menghasilkan angka 3, set operator kali
      case 3 : return '×';
      // jika menghasilkan angka 4, set operator bagi
      case 4 : return '÷';
    }
  }
  
  function getResult(num1, num2, opr) {
    switch (opr) {
      // jika menghasilkan operator tambah, maka jumlahkan
      case '+' : return num1 + num2;
      // jika menghasilkan operator kurangi, maka pengurangan
      case '-' : return num1 - num2;
      // jika menghasilkan operator kali, maka jumlahkan
      case '×' : return num1 * num2;
      // jika menghasilkan operator bagi, maka pembagian
      case '÷' : return num1 / num2;
    }
  }
  
  const input = document.querySelector('.input');
  const submitButton = document.querySelector('.btn-submit');
  submitButton.addEventListener('click', () => {
    // value input
    const value = input.value.trim();
    // validasi
    if (validate(value) == true) {
      // bandingkan jawaban pemain dan jawaban aslinya
      const check = setGames(value, result);
      /*
        jika variabel check menghasilkan boolean true,
        tampilkan alert untuk memberi tahu jumlah nyawa yang tersisa
      */
      if (check == true) alert(`your heart : ${heart} times again!`);
      // jika nyawa sama dengan 0, berikan alert bahwa pemain sudah kalah
      if (heart == 0) {
        alert(`Game Over! the correct answer is ${result}`);
        // tanyakan, apakah ingin bermain lagi?
        playAgain();
      }
      // hilangkan value input
      input.value = '';
    }
  });
  
  function validate(value) {
    // jika input kosong
    if (!value) return alert('field is empty!');
    // jika input berisi huruf
    if (value.match(/[a-zA-Z]/gmi)) return alert('only number!');
    // jika berhasil melewati semua validasi
    return true;
  }
  
  function setGames(value, result) {
    // jika value sama dengan jawaban aslinya
    if (value == result) {
      // berikan pesan selamat
      alert(`Congratulation! the correct answer is ${value}`);
      // tanyakan, apakah mau bermain lagi
      playAgain();
    } else {
      // jika jawaban pemain tidak sama dengan jawaban aslinya
      alert('wrong answer! please try again!');
      // kurangi jumlah nyawa
      heart--;
      /*
        kembalikan nilai boolean true untuk mentrigger variabel check
        jika variabel check menghasilkan boolean true, otomatis jumlah nyawa pemain
        berkurang. disitulah kita bisa memberikan alert bahwa sisa nyawa pemain tersisa sekian.
      */
      return true;
    }
  }
  
  function playAgain() {
    // jika pemain menekan tombol ok atau yes, maka lanjutkan permainan dengan soal yang baru
    const ask = confirm('do you want to play again?');
    if (ask == true) {
      // tampilkan pesan
      alert('let\'s play again!');
      // set kembali jumlah nyawa seperti semula
      heart = limit;
      // load soal baru dan jawaban baru
      result = loadResult();
    } else {
      // jika pemain menekan tombol no, maka tampilkan pesan
      alert('thanks for playing with us :)');
      // disabled tombol supaya permainannya tidak bisa dilanjutkan lagi
      submitButton.setAttribute('disabled', true);
    }
  }
  
}