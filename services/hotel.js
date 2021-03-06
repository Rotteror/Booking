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

    const currentHotel = await Hotel.findById(hotelId);
    const user = await User.findById(userId);

    if (!currentHotel && !user) {
        throw new Error('No such hotel or user in DB ');
    }
    if (currentHotel.bookedBy.includes(userId)) {
        throw new Error('You already booked this hotel')
    }

    //TO DO decrease rooms after booking if rooms become equal to 1 , no booking available !!! 
    currentHotel.rooms = currentHotel.rooms - 1;
    currentHotel.bookedBy.push(user);
    user.bookedHotels.push(currentHotel)
    return Promise.all([(currentHotel.save(), user.save())]);
}

async function deleteHotel(hotelId) {
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
        throw new Error('No such hotel in DB ');
    }
    return hotel.remove();
}

async function getAllBookedHotelsForUser(hotelsId) {
    let arrHotelName = [];
    while (hotelsId.length > 0) {
        const currentHotel = await Hotel.findById(hotelsId.shift())
        arrHotelName.push(currentHotel.name);
    }
    return arrHotelName;
}



module.exports = {
    createHotel,
    getAllHotels,
    getHotelById,
    editHotel,
    bookHotel,
    deleteHotel,
    getAllBookedHotelsForUser,
}