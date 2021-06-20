const Hotel = require('../models/Hotel');
const User = require('../models/User');

async function createHotel(hotelData) {
    const hotel = new Hotel(hotelData);
    await hotel.save();

    return hotel;
}

async function getAllHotels() {
    const hotels = await Hotel.find({}).lean();
    return hotels;
}

async function getHotelById(id) {
    const hotel = await Hotel.findById(id).lean();
    return hotel;
}

async function editHotel(id, hotel) {
    const currentHotel = await Hotel.findById(id);

    if (!currentHotel) {
        throw new Error('No such Hotel in DB');
    }
    Object.assign(currentHotel, hotel);
    return currentHotel.save();
}

async function bookHotel(hotelId, userId) {
    console.log('in service')
    const currentHotel = await Hotel.findById(hotelId);
    const user = await User.findById(userId);

    if(!currentHotel && !user){
        throw new Error('No such hotel or user in DB ');
    }

    console.log(currentHotel)
    currentHotel.bookedBy.push(userId);
    return currentHotel.save();
}



module.exports = {
    createHotel,
    getAllHotels,
    getHotelById,
    editHotel,
    bookHotel,
}