import { Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { VpcStack } from './vpc-stack';
import { EcsStack } from './ecs-stack';

export class ServiceStage extends Stage {
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    const vpcStack = new VpcStack(this, 'VpcStack');
    const ecsStack = new EcsStack(this, 'SimpleHttpServiceEcsStack', vpcStack.vpc);
  }
}
