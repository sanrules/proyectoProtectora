/* import * as AWS from 'aws-sdk/global'; */
/* import * as S3 from 'aws-sdk/clients/s3'; */



export class awsUploadService {

     public uploadFile(file) {
            /*
            const contentType = file.type;
            const bucket = new S3(
                {
                    accessKeyId: 'YOUR-ACCESS-KEY-ID',
                    secretAccessKey: 'YOUR-SECRET-ACCESS-KEY',
                    region: 'YOUR-REGION'
                }
            );
            const params = {
                Bucket: 'YOUR-BUCKET-NAME',
                Key: this.uploadFile + file.name,
                Body: file,
                ACL: 'public-read',
                ContentType: contentType
            };
            bucket.upload(params, function (err, data) {
                if (err) {
                    console.log('There was an error uploading your file: ', err);
                    return false;
                }
                console.log('Successfully uploaded file.', data);
                return true;
            });
          */
        }
        //for upload progress   
            /* Bucket.upload(params).on('httpUploadProgress', function (evt) {
                    console.log(evt.loaded + ' of ' + evt.total + ' Bytes');
                }).send(function (err, data) {
                    if (err) {
                        console.log('There was an error uploading your file: ', err);
                        return false;
                    }
                    console.log('Successfully uploaded file.', data);
                    return true;
                });
            } */
}
