var input = document.getElementById("search");
let container = document.getElementById('container');
let query = 'Holiday';
let url = `http://www.omdbapi.com/?s=${query}&apikey=ea3d4d43&`
let page = 1;

window.addEventListener('scroll', () => {

    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 90){
        //scroll to bottom of content
        search();
    }
})
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
     event.preventDefault();
     document.getElementById("myBtn").click();
    }
  });

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
       console.log(res)
            for(let i = 0; i < res.Search.length; i++){           
                
               //Must use html element tag name to create element ex: div, img, p
                let card = document.createElement('div') 
                // let header = document.createElement('h1')
                let Poster = document.createElement('img');
                let Title = document.createElement('p');
                
                card.setAttribute('class', 'card');
                Title.setAttribute('id', 'title')
                
                
                Poster.src = res.Search[i].Poster;
                Title.innerText = res.Search[i].Title;
                // header.innerHTML = res.Search[i].id;
                

                card.appendChild(Title); 
                card.appendChild(Poster);
                // card.appendChild(header);               
                container.appendChild(card);
                
            }
            
        });
    
 console.log(query);   
}
// search();
window.onload = search;
