const API_KEY = 'CX3ugez2GSOZb3SuoRtEkzHPJIQKgUKBblSIuiR3FJQ7bzzYPh';
let button_div = document.getElementById('buttons')
let gallery_div = document.getElementById('gallery')
let score_span = document.getElementById('score')

let score = 0
let words = ['fish', 'house', 'boat', 'animal', 'transport', 'vegetable', 'cellphone']
let correct_answer = ''


console.log(correct_answer);

    words.forEach(function(word) {
    let new_button = document.createElement('button')
    new_button.innerHTML = word
    new_button.classList.add('btn', 'btn-primary', 'mx-2')
    new_button.onclick = function() {
        if(word == correct_answer)  {
            score++
            score_span.innerHTML = score
            generate()
        } else{
            score--
            score_span.innerHTML = score
            alert('OOOPSSS WRONG! TRY AGAIN')
        }
    }
    button_div.append(new_button) 
})

function generate() {
    gallery_div.innerHTML = null

    let random_number = Math.floor((Math.random() * words.length))
    correct_answer = words[random_number]

    fetch(`https://api.tumblr.com/v2/tagged?api_key=${API_KEY}&tag=${correct_answer}`)
    .then(function(response)    {
        return response.json()
    })
    .then(function(result)  {
        console.log(result.response)
        result.response.forEach(function(post)  {
            if(post.type == 'photo')    {
                console.log(post.photos[0].original_size.url)
                const pic = document.createElement('img')
                pic.src = post.photos[0].original_size.url
                pic.height = 200
                pic.width = 200
                gallery_div.appendChild(pic)
            }
        })
    })
}

generate()
