const num_rows = 12;
const num_seats_per_row = 7;
const seats = Array(num_rows)
  .fill()
  .map(() => Array(num_seats_per_row).fill("O"));

function renderSeats() {
  const seatsDiv = document.getElementById("seats");
  seatsDiv.innerHTML = "";
  for (let i = 0; i < num_rows; i++) {
    const rowDiv = document.createElement("div");
    for (let j = 0; j < num_seats_per_row; j++) {
      const seatDiv = document.createElement("div");
      seatDiv.className = "seat";
      seatDiv.dataset.row = i;
      seatDiv.dataset.seat = j;
      if (seats[i][j] === "X") {
        seatDiv.style.backgroundColor = "#aaa";
        seatDiv.disabled = true;
      } else {
        seatDiv.addEventListener("click", toggleSeatSelection);
      }
      rowDiv.appendChild(seatDiv);
    }
    seatsDiv.appendChild(rowDiv);
  }
}

function toggleSeatSelection(event) {
  const seatDiv = event.target;
  const row = seatDiv.dataset.row;
  const seat = seatDiv.dataset.seat;
  if (seatDiv.classList.contains("selected")) {
    seatDiv.classList.remove("selected");
    seats[row][seat] = "O";
  } else {
    seatDiv.classList.add("selected");
    seats[row][seat] = "X";
  }
}

function bookSeats() {
  const numSeatsToBook = parseInt(document.getElementById("numSeats").value);
  const selectedSeats = [];
  for (let i = 0; i < num_rows; i++) {
    let startSeat = null;
    let numAvailableSeats = 0;
    for (let j = 0; j < num_seats_per_row; j++) {
      if (seats[i][j] === "O") {
        if (startSeat === null) {
          startSeat = j;
        }
        numAvailableSeats++;
        if (numAvailableSeats === numSeatsToBook) {
          for (let k = startSeat; k < startSeat + numSeatsToBook; k++) {
            seats[i][k] = "X";
            const seatNumber = `${i + 1}${String.fromCharCode(k + 65)}`;
            selectedSeats.push(seatNumber);
          }
          renderSeats();
          alert(`Booked seats: ${selectedSeats.join(", ")}`);
          return;
        }
      } else {
        startSeat = null;
        numAvailableSeats = 0;
      }
    }
  }
  alert("Sorry, could not find available seats");
}

renderSeats();
