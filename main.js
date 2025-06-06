const btnEl = document.getElementById('scrapeBtn')
const outputEl = document.getElementById('output')
const urlInputEl = document.getElementById('urlInput')

btnEl.addEventListener('click', () => {
    outputEl.innerHTML =   `<p>Loading...</p>`

    setTimeout(async ()=>{
        try {
            const url = urlInputEl.value
            const response = await fetch('mock-product.json')
            const data = await response.json()
            console.log(data)
            const {title, price, currency,forecast} = data
            
            outputEl.innerHTML = `<h1>Title ${title}</h1>
                , Price: ${price}, 
                Currency: ${currency} 
                <a href="${url}" target="_blank">View Product</a>
                Predicted Forecast: ${forecast}`
    
        } catch (err) {
            console.log(err)
        }
    }, 1000)
    
})