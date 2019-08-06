console.log('Client side javascript file is loaded!');


// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data)=>{
//         console.log(data.puzzle);
//     })
// })




const weatherForm = document.querySelector('form');
const search = document.querySelector('#weather');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = 'Loading...';
messageTwo.textContent = ''
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const location = search.value;

    console.log(location);
    fetchData(location);
    search.value = '';
})

const fetchData = (location)=>{

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
            messageOne.textContent=data.error;
        }
        else
        {
            
            messageOne.textContent = data.temperature;
            messageTwo.textContent = data.address;
            console.log(data.address)
            console.log(data.temperature)
        }
    })
})
}

