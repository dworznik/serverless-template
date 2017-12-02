import * as AWS from 'aws-sdk';
import { Callback, Context } from 'aws-lambda';
import { setupLogging } from '../lib/log';


interface Event {}

export async function handler(event: Event, context: Context, callback: Callback) {
  setupLogging(console, context, event);

  const kms = new AWS.KMS({region: process.env.AWS_REGION});
  const foo = (await
    kms.decrypt({ CiphertextBlob: new Buffer(process.env.FOO!, 'base64') })
    .promise()).Plaintext!.toString();
  console.log('Hello world', {foo});
  callback();
}
