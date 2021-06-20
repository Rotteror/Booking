const { isUser, isOwner } = require('../middlewares/guards');
const { preloadHotel } = require('../middlewares/preloads');

const router = require('express').Router();

router.get('/create', isUser(), (req, res) => {
    res.render('hotel/create')
})

router.post('/create', isUser(), async (req, res) => {
    const hotelData = {
        name: req.body.name,
        city: req.body.city,
        imageUrl: req.body.imageUrl,
        rooms: req.body.rooms,
        bookedBy: [],
        owner: req.user._id,
    };
    try {
        await req.storage.createHotel(hotelData);
        res.redirect('/');
    } catch (err) {
        let errors;
        if (err.errors) {
            errors = Object.values(err.errors).map(e => e.properties.message);
        } else {
            errors = [err.message];
        }
        const ctx = {
            errors,
            hotelData:
            {
                name: req.body.name,
                city: req.body.city,
                rooms: req.body.rooms,
                imageUrl: req.body.imageUrl,
            }
        }
        res.render('hotel/create', ctx)
    }
})

router.get('/details/:id', preloadHotel(), async (req, res) => {
    const hotel = req.data.hotel;
    if (hotel == undefined) {
        res.redirect('/404');
    } else {
        hotel.isOwner = req.user && (hotel.owner == req.user._id);
        hotel.isBooked = req.data.hotel.bookedBy.some(e => e.objectId == req.user_id);

        console.log(req.user._id)
        console.log(hotel)

        const ctx = {
            title: `Hotel ${hotel.name}`,
            hotel
        }
        res.render('hotel/details', ctx)
    }
});

router.get('/edit/:id', preloadHotel(), isOwner(), async (req, res) => {
    const hotel = req.data.hotel;
    if (!hotel) {
        res.redirect('/');
    } else {
        const ctx = {
            title: 'Edit Hotel',
            hotel,
        };
        res.render('hotel/edit', ctx);
    }
});


router.post('/edit/:id', preloadHotel(), isOwner(), async (req, res) => {
    const hotel = {
        name: req.body.name,
        city: req.body.city,
        rooms: Number(req.body.rooms),
        imageUrl: req.body.imageUrl,
    }
    try {
        await req.storage.editHotel(req.params.id, hotel);
        res.redirect('/');
    } catch (err) {
        res.redirect('/404');
    }
});

router.get('/book/:id', async (req, res) => {

    console.log('in controller')
    const hotelId = req.params.id;
    const userId = req.user._id;
    try {
        await req.storage.bookHotel(hotelId, userId);
        res.redirect(`/hotels/details/${hotelId}`);

    } catch (err) {
        console.log(err.message);
        res.redirect(`/hotels/details/${hotelId}`);
    }

})

router.get('/delete/:id', async (req, res) => {

    await req.storage.deleteHotel(req.params.id);
    res.redirect('/')
})

module.exports = router;
