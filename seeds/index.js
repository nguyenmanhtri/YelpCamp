const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

// getting mongoose started
mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .catch(err => console.log(err));

const db = mongoose.connection;
db.on('error', err => console.log(err));
db.once('open', () => {
    console.log('Database connected');
});

// pick a random element of an array
const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // Your user id
            author: '616118be6ca3c0aaa991cf15',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique nam, minima ipsa accusantium nisi harum deleniti cupiditate aliquam repellat vero sit dolorum cum neque adipisci, assumenda id. Velit, recusandae blanditiis?',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/frankscloud97/image/upload/v1634137432/YelpCamp/sdybbo4wuxrfce6tobwd.jpg',
                    filename: 'YelpCamp/sdybbo4wuxrfce6tobwd',
                },
                {
                    url: 'https://res.cloudinary.com/frankscloud97/image/upload/v1634137433/YelpCamp/dhdercjsi5pfierkg0op.jpg',
                    filename: 'YelpCamp/dhdercjsi5pfierkg0op',
                }
            ],
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})