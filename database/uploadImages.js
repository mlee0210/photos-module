const AWS = require('aws-sdk');

const request = require('request');

AWS.config.loadFromPath('./AwsConfig.json');

const s3 = new AWS.S3({
  endpoint: 'http://fec5-restaurant-photos.s3.amazonaws.com',
  s3BucketEndpoint: true,
});

const uploadImages = (url, name) => {
  request({ url, encoding: null }, (err, res, body) => {
    if (err) {
      console.log('ERROR', err);
    } else {
      const params = {
        Bucket: 'fec5-restaurant-photos',
        Key: name,
        Body: body,
      };
      s3.putObject(params, (error) => {
        if (error) {
          console.log('ERROR saving image into S3', err);
        } else {
          console.log('Uploaded data to S3');
        }
      });
    }
  });
};



