/* import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3'; */
import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
  })
export class AwsUploadService {

     public uploadFile(file) {

       /*  const contentType = file.type;
        const bucket = new S3(
            {
                accessKeyId: 'AKIA34PGUYKSP2ZQJT7W',
                secretAccessKey: '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',
                region: 'UE(París)'
            }
        );
        const params = {
            Bucket: 'animalimg',
            Key:  file.name,
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
        }); */
       
    
    //for upload progress   
        /* bucket.upload(params).on('httpUploadProgress', function (evt) {
                console.log(evt.loaded + ' of ' + evt.total + ' Bytes');
            }).send(function (err, data) {
                if (err) {
                    console.log('There was an error uploading your file: ', err);
                    return false;
                }
                console.log('Successfully uploaded file.', data);
                return true;
            }); */
    }
}

