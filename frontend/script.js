

const daysTag = document.querySelector(".day-grid"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll("#prev, #next");

let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();


const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var setMarked = function(e) {
    if (e.target.classList.contains("clicked")) 
        e.target.classList.remove("clicked");
    else (e.target.classList.add("clicked"));
};

const renderCalendar = () => {
    lastDateofMonth = new Date(currYear, currMonth+1, 0).getDate(); // getting last date of month
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