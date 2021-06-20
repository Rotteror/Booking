const router = require('express').Router();


router.get('/', async (req, res) => {
    let hotels = await req.storage.getAllHotels();
    hotels.sort((a, b) => b.rooms - a.rooms);
    
    res.render('home/home', { hotels })
})


module.exports = router;
