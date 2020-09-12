var Minio = require('minio')

var config = require('./config');

var minioClient = new Minio.Client({
    endPoint: config.minio.endPoint,
    port: config.minio.port,
    useSSL: config.minio.useSSL,
    accessKey: config.minio.access_key,
    secretKey: config.minio.secret_key
});


if (require.main == module) {

    minioClient.makeBucket('files', function (err) {

        if (err) {
            if (err.code == 'BucketAlreadyOwnedByYou') {
                console.log(err.bucketname + " already exists");
                process.exit(1);
            }
            else {
                console.log(err);
                process.exit(1);
            }
        }

        console.log('files Bucket created successfully. 🤘')
        process.exit(0);

    });

}

module.exports = {
    minioClient
}