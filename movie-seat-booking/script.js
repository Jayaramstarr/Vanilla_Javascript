
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

// Gets data from local strage and populates UI
const populateUI = () => {

    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    //check if storage is empty or not before populating the data


    //index of returns -1 if element is not in the array
    if( selectedSeats !== null && selectedSeats.length > 0 )//check if seats array is empty or not
        seats.forEach( (seat, index) => {
            if( selectedSeats.indexOf(index) > -1 )
                seat.classList.add('selected');
        } );

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if( selectedMovieIndex !== null )
    {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}




// save selected movie index and price 
const setMovieData = (movieIndex, moviePrice) =>{
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}


// Update selected count
const updateSelectedCount = ()=>{
    
    const selectedSeats = document.querySelectorAll('.row .seat.selected');


    // copy selected seats into Array
    // map through Array
    // return a new array indexes

    const seatsIndex = [...selectedSeats].map( seat => [...seats].indexOf(seat) ); //takes a selected seat and returns it's index in the array of all seats 

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));


    const selectedSeatsCount = selectedSeats.length;
    
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount*ticketPrice;

}


movieSelect.addEventListener('change',(e)=>{

    ticketPrice = +movieSelect.value;
    setMovieData(e.target.selectedIndex, e.target.value);
});


container.addEventListener('click',e=>{
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied'))
    {
        e.target.classList.toggle('selected');

        updateSelectedCount();
    }
});


// initial count and total set
populateUI();
updateSelectedCount();