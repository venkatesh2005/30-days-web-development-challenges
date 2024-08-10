document.addEventListener('DOMContentLoaded', () => {
    const seatPrices = {
        'U1': 893, 'U2': 1172, 'U3': 926, 'U4': 684, 'U5': 1052, 'U6': 783,
        'U7': 743, 'U8': 678, 'U9': 697, 'U10': 1024, 'U11': 1164, 'U12': 1102,
        'U13': 661, 'U14': 972, 'U15': 1042, 'U16': 927, 'U17': 683, 'U18': 1150,
        'L1': 1155, 'L2': 1193, 'L3': 1145, 'L4': 868, 'L5': 647, 'L6': 946,
        'L7': 751, 'L8': 870, 'L9': 708, 'L10': 674, 'L11': 1131, 'L12': 1041,
        'L13': 776, 'L14': 781, 'L15': 715, 'L16': 1118, 'L17': 1187, 'L18': 690
    };

    let selectedSeats = new Set();
    let isConfirmed = false;

    const seatElements = document.querySelectorAll('.rectangle.available');
    const selectedSeatCount = document.getElementById('selected-seat-count');
    const totalPriceElement = document.getElementById('total-price');
    const availableSeatCount = document.getElementById('available-seat-count');

    function updateSummary() {
        selectedSeatCount.textContent = selectedSeats.size;
        const totalPrice = Array.from(selectedSeats).reduce((total, seat) => {
            return total + (seatPrices[seat] || 0);
        }, 0);
        totalPriceElement.textContent = totalPrice;
        availableSeatCount.textContent = seatElements.length - selectedSeats.size;
    }

    function handleSeatClick(event) {
        if (isConfirmed) return;

        const seat = event.currentTarget;
        const seatId = seat.dataset.seat;

        if (selectedSeats.has(seatId)) {
            selectedSeats.delete(seatId);
            seat.classList.remove('selected');
        } else {
            selectedSeats.add(seatId);
            seat.classList.add('selected');
        }

        updateSummary();
    }

    function handleConfirm() {
        if (selectedSeats.size === 0) {
            alert("No seats selected.");
            return;
        }

        isConfirmed = true;
        seatElements.forEach(seat => {
            const seatId = seat.dataset.seat;
            if (selectedSeats.has(seatId)) {
                seat.classList.add('unavailable');
                seat.classList.remove('selected');
            }
            seat.removeEventListener('click', handleSeatClick); 
        });
        updateSummary();
    }

    function handleClear() {
        if (isConfirmed) {
           
            isConfirmed = false;
            selectedSeats.clear();
            seatElements.forEach(seat => {
                seat.classList.remove('unavailable', 'selected');
                seat.addEventListener('click', handleSeatClick);
            });
        } else {
          
            selectedSeats.clear();
            seatElements.forEach(seat => {
                seat.classList.remove('selected');
            });
        }
        updateSummary();
    }

    seatElements.forEach(seat => {
        seat.addEventListener('click', handleSeatClick);
    });

    document.getElementById('confirm-button').addEventListener('click', handleConfirm);
    document.getElementById('clear-button').addEventListener('click', handleClear);

    updateSummary();
});
