
const router = require('express').Router();

router.get('/profile/:id', async (req, res) => {
    const user = await req.storage.getUserByUsername(req.user.username);
    const hotelsId = [...user.bookedHotels];
    const hotelsNames = await req.storage.getAllBookedHotelsForUser(hotelsId);
    const haveBookedHotels = hotelsNames.length > 0;
    console.log(user.haveBookedHotels)
    const ctx = {
        haveBookedHotels,
        hotelsNames,
    };
    console.log(ctx)

    res.render('user/profile', ctx);
})

module.exports = router;