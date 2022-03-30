import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';

import { ServiceStage } from './service-stage';

export class PipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, 'SimpleHttpServicePipeline', {
      pipelineName: 'SimpleHttpServicePipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.connection('best-cloud/cdk-pipeline-ecs', 'main', {
          connectionArn: 'arn:aws:codestar-connections:us-west-2:376200971131:connection/47cdad52-d210-4d6b-9cee-8e172bdb1b32',
        }),
        commands: ['cd cdk', 'npm ci', 'npm run build', 'npx cdk synth'],
        primaryOutputDirectory: 'cdk/cdk.out',
      }),
    });

    pipeline.addStage(new ServiceStage(this, 'Alpha', props));
  }
}
