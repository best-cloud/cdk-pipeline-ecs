import { Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { EcsStack } from './ecs-stack';

export class AppStage extends Stage {
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    const ecsStack = new EcsStack(this, 'EcsStack');
  }
}