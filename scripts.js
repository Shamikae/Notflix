var input = document.getElementById("search");
let container = document.getElementById('container');
let query = 'Holiday';
let url = `http://www.omdbapi.com/?s=${query}&apikey=ea3d4d43&`
let page = 1;

//Function to add more content upon scrolling to the bottom
window.addEventListener('scroll', () => {

    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 90){
        //scroll to bottom of content
        search();
    }
})

//Enter key for search
input.addEventListener ("keyup", function(event) {
    if (event.key === 13) {
     event.preventDefault();
     document.getElementById("myBtn").click();
    }
  });

//Search function
function search(newSearch){
    if(newSearch === true){
        container.innerHTML = '';
        page = 1;
    }
    container.innerHTML = newSearch?'': container.innerHTML
    query = document.getElementById('search').value || 'Holiday'; 
    url = `http://www.omdbapi.com/?s=${query}&page=${page}&apikey=ea3d4d43&`;

    page++;

    fetch(url)
        .then(res =>  res.json())
        .then(res => {
    
            for(let i = 0; i < res.Search.length; i++){    
                
               //Must use html element tag name to create element ex: div, img, p
                let card = document.createElement('div'); 
                let cardInner = document.createElement('div');
                let cardFront = document.createElement('div');
                let cardBack = document.createElement('div');
                let Poster = document.createElement('img');
                let Title = document.createElement('div');
                let Year = document.createElement('div');
                
                //Set Attributes ex: class, id & name attribute
                card.setAttribute('class', 'card');
                cardInner.setAttribute('class', 'card-inner');
                cardFront.setAttribute('class', 'card-front');
                cardBack.setAttribute('class', 'card-back');
                Title.setAttribute('id', 'title');
                Year.setAttribute('class', 'year');
                
                //Add content(src) to element (img, text, numbers, etc..)
                Poster.src = res.Search[i].Poster;
                Title.innerText = res.Search[i].Title;
                Year.innerHTML = res.Search[i].Year;                

                // Append data to the website (either directly to the body or to an element)
                cardBack.appendChild(Title);
                cardBack.appendChild(Year);
                cardInner.appendChild(cardBack);
                cardFront.appendChild(Poster);
                cardInner.appendChild(cardFront); 
                card.appendChild(cardInner);             
                container.appendChild(card);               
            }
            
        });
    
 console.log(query);   
}
window.onload = search;
