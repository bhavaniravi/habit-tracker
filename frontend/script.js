

const daysTag = document.querySelector(".day-grid"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll("#prev, #next");
habits = document.querySelectorAll(".habits > li");

let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();


const colors = ["#89cff0", "#99c5c4", "#bdb0d0", "#ffb7ce", "#bee7a5"]
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let currColor = 0

header = document.getElementById('header')
header.style = `background-color: ${colors[currColor]}`

var setMarked = function(e) {
    e.target.style.backgroundColor = colors[currColor]
};

// var pickRandom = function(arr) {
//     return arr[Math.floor(Math.random() * arr.length)];
// }

const renderCalendar = () => {
    lastDateofMonth = new Date(currYear, currMonth+1, 0).getDate(); // getting last date of month
    console.log(new Date(currYear, currMonth+1, 0))
    daysTag.innerHTML = '';
    for (let i = 0; i < lastDateofMonth; i++) { 
        let style = "";
        let date = new Date(currYear, currMonth, i+1)
        let isToday = i === date.getDate() && currMonth === date.getMonth() && currYear === date.getFullYear() ? "active" : "";
        
        if (i == 0) style= `grid-column-start: ${date.getDay() + 1}`;
        
        li = document.createElement("li")
        li.innerHTML = i + 1
        li.style = style
        li.className = `${isToday} dayTile`
        li.onclick = setMarked

        daysTag.appendChild(li)
    }
    document.getElementById("currentMonthYear").innerHTML = `${months[currMonth]} ${currYear}`;
}



prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1

        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
        if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function
    });
});

renderCalendar();

habits.forEach((item, index) => {
    item.style = `background-color: ${colors[index]}`
    item.onclick = () => {
        header = document.getElementById('header')
        header.style.backgroundColor = colors[index]
        currColor = index
        document.querySelectorAll(".dayTile").forEach((item) => {
            item.style.backgroundColor = ''
        })
    }
})
