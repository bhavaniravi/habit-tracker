var elements = document.getElementsByClassName("dayTile");

var setMarked = function(e) {
    if (e.target.classList.contains("clicked")) 
        e.target.classList.remove("clicked");
    else (e.target.classList.add("clicked"));
};

for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', setMarked);
}
