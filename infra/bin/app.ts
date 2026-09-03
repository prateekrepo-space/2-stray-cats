#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { StrayCatsStack } from '../lib/stray-cats-stack';

const app = new cdk.App();

new StrayCatsStack(app, 'StrayCatsStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: 'ap-south-1',
  },
  description: '2 Stray Cats — Next.js static site (S3 + CloudFront + CodePipeline)',
});
