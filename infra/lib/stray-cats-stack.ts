import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as amplify from '@aws-cdk/aws-amplify-alpha';
import * as codepipeline from 'aws-cdk-lib/aws-codepipeline';
import * as codepipeline_actions from 'aws-cdk-lib/aws-codepipeline-actions';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as s3 from 'aws-cdk-lib/aws-s3';

export class StrayCatsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // ── AWS Amplify App (replaces S3 + CloudFront — no account verification needed) ──
    const amplifyApp = new amplify.App(this, 'StrayCatsApp', {
      appName: '2-stray-cats',
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: 'prateekrepo-space',
        repository: '2-stray-cats',
        // GitHub Personal Access Token stored in Secrets Manager
        // One-time setup: aws secretsmanager create-secret \
        //   --name github-oauth-token \
        //   --secret-string "ghp_YOUR_TOKEN" \
        //   --region ap-south-1
        oauthToken: cdk.SecretValue.secretsManager('github-oauth-token'),
      }),
      environmentVariables: {
        NEXT_PUBLIC_ENV: 'production',
      },
      // Use the amplify.yml already in the repo
      autoBranchCreation: undefined,
    });

    // main branch — auto-deploys on every push
    const mainBranch = amplifyApp.addBranch('main', {
      autoBuild: true,
      branchName: 'main',
    });

    // ── Outputs ───────────────────────────────────────────────────────────────
    new cdk.CfnOutput(this, 'AmplifyAppId', {
      value: amplifyApp.appId,
      description: 'Amplify App ID',
    });
    new cdk.CfnOutput(this, 'SiteUrl', {
      value: `https://main.${amplifyApp.appId}.amplifyapp.com`,
      description: '2 Stray Cats — Live URL',
    });
    new cdk.CfnOutput(this, 'AmplifyConsoleUrl', {
      value: `https://ap-south-1.console.aws.amazon.com/amplify/apps/${amplifyApp.appId}`,
      description: 'Amplify Console URL',
    });
  }
}
