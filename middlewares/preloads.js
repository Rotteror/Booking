function preloadHotel() {
    return async (req, res, next) => {
        req.data = req.data || {};

        try {
            const hotel = await req.storage.getHotelById(req.params.id);
            if (hotel) {
                req.data.hotel = hotel;
            }
        } catch (err) {
            console.error('Database error: ', err.message);
        }
        next();
    }
}

module.exports = {
    preloadHotel
}