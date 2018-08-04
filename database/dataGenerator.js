const faker = require('faker');
const Photo = require('./index.js')

let fillPhotoUrls = () => {

  let photoUrls = [];
  
  let amazonUrl = [];
  
  for (let i = 0; i < 25; i++) {
    amazonUrl.push(`https://s3-us-west-1.amazonaws.com/fec5-restaurant-photos/food${i}.jpg`);
  }
  
  let numberOfPhotos = Math.floor(Math.random() * 100);
    
  for (let i = 0; i <= numberOfPhotos; i++) {
    photoUrls.push(amazonUrl[Math.floor(Math.random() * amazonUrl.length)]);
  }

  return photoUrls;
}

let generateData = () => {

  for (let i = 0; i < 100; i++) {
    let photoObj = {};
  
    photoObj.username = `${faker.name.firstName()} ${faker.name.lastName()}`;
    photoObj.restaurantId = i;
    photoObj.description = faker.commerce.productName();
    photoObj.createdAt = faker.date.past();
    photoObj.photoUrls = fillPhotoUrls();
  
    let newPhoto = new Photo(photoObj);
    newPhoto.save((err) => {
      if(err) {
        console.log('ERROR: could not save to database');
      } else {
        console.log('successfully posted');
      }
    })
  };
}

generateData();