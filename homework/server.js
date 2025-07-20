const express =  require('express')
const app = express()

// Greeting route
app.get('/greetings/:username', (req, res) => {
    const username = req.params.username
    res.send(`Hello there, ${username}!`)
})


// Dice rolling route
app.get('/roll/:number', (req, res) => {
    const number = parseInt(req.params.number)

    if (isNaN(number)) {
        return res.send("You must specify a number.")
    }
    
    const randomNum = Math.floor(Math.random() * (number + 1))
    res.send(`You rolled a ${randomNum}.`)
})


// Collectibles route
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
]

app.get('/collectibles/:i', (req, res) => {
    const i = parseInt(req.params.i)
    
    if (isNaN(i)) {
        return res.send("This item is not yet in stock. Check back soon!")
    }
    
    if (i < 0 || i >= collectibles.length) {
        return res.send("This item is not yet in stock. Check back soon!")
    }
    
    const item = collectibles[i]
    res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`)
})


// Shoes filtering route
const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
]

app.get('/shoes', (req, res) => {
    let filterShoes = [...shoes]
    
    if (req.query['min-price']) {
        const minPrice = parseFloat(req.query['min-price'])
        filterShoes = filterShoes.filter(shoe => shoe.price >= minPrice)
    }
    
    if (req.query['max-price']) {
        const maxPrice = parseFloat(req.query['max-price'])
        filterShoes = filterShoes.filter(shoe => shoe.price <= maxPrice)
    }
    
    if (req.query.type) {
        const type = req.query.type.toLowerCase()
        filterShoes = filterShoes.filter(shoe => 
            shoe.type.toLowerCase() === type
        )
    }
    
    res.send(filterShoes)
})

app.listen(3000, () => {
    console.log(`Running!`)
})