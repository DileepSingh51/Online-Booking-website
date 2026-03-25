const bookingForm = document.getElementById('bookingForm');
const bookingList = document.getElementById('bookingList');
const successMessage = document.getElementById('successMessage');

// FORM SUBMIT
bookingForm?.addEventListener('submit', function(e){
    e.preventDefault();

    const formData = {
        name: bookingForm.name.value,
        email: bookingForm.email.value,
        service: bookingForm.service.value,
        date: bookingForm.date.value,
        time: bookingForm.time.value
    };

    let bookings = JSON.parse(localStorage.getItem('bookings') || "[]");
    bookings.push(formData);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    successMessage.textContent = "Appointment booked successfully!";
    bookingForm.reset();

    displayBookings();
});

// DISPLAY BOOKINGS
function displayBookings() {
    if(!bookingList) return;

    let bookings = JSON.parse(localStorage.getItem('bookings') || "[]");
    bookingList.innerHTML = "";

    bookings.forEach((b,i)=>{
        const li = document.createElement('li');

        li.innerHTML = `
        ${b.name} - ${b.service} on ${b.date} at ${b.time}
        <button onclick="deleteBooking(${i})">Delete</button>
        `;

        bookingList.appendChild(li);
    });

    const total = document.getElementById("totalBookings");
    if(total){
        total.textContent = "Total Bookings: " + bookings.length;
    }
}

// DELETE
function deleteBooking(index) {
    let bookings = JSON.parse(localStorage.getItem('bookings') || "[]");
    bookings.splice(index,1);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    displayBookings();
}

// LOAD DATA
displayBookings();