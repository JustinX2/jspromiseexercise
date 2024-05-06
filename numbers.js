const favNumber = 5;
const baseURL = "http://numbersapi.com";

//Fetching a single fact about fav number
fetch(`${baseURL}/${favNumber}?json`)
    .then(res => res.json())
    .then(data => console.log(data.text))
    .catch(err => console.log(err));

//Fetching facts about multiple fav numbers
const favNumbers = [5, 7, 11];
fetch(`${baseURL}/${favNumbers}?json`)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));

//Fetching 4 facts about fav number using Promise.all
const fetchPromises = Array.from({ length: 4 }, () => {
    return fetch(`${baseURL}/${favNumber}?json`)
        .then(res => res.json());
});

Promise.all(fetchPromises)
    .then(facts => {
        facts.forEach(data => {
            const factElement = document.createElement('p');
            factElement.innerText = data.text;
            document.getElementById('factsContainer').appendChild(factElement);
        });
    })
    .catch(err => console.log(err));
