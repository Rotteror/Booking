const { Schema, model } = require('mongoose');

const schema = new Schema({
    name: { type: String, required: [true, 'All Fields are required'], minLength: [4, 'Name must be at least 4 charachters long'] },
    city: { type: String, required: [true, 'All Fields are required'] , minLength: [3, 'City must be at least 3 charachters long']},
    imageUrl: { type: String, required: [true, 'All Fields are required'], match: [/^https?/, 'Image must be valid URL'] },
    rooms: { type: Number, required: [true, 'All Fields are required'], min: [1, 'Rooms must be in range 1-100'], max: [100, 'Rooms must be in range 1-100'] },
    bookedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});


module.exports = model('Hotel', schema);
