import { Stack, StackProps, SecretValue } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {
  CodePipeline, CodePipelineSource, ShellStep,
} from 'aws-cdk-lib/pipelines';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'Pipeline', {
      pipelineName: 'MyPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('best-cloud/cdk-pipeline-ecs', 'main', {
          authentication: SecretValue.secretsManager('/my/github/token'),
        }),
        commands: ['npm ci', 'npm run build', 'npx cdk synth'],
      }),
    });
  }
}