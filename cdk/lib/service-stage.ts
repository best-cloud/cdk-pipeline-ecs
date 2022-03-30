import { Stage, StageProps, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { VpcStack } from './vpc-stack';
import { EcsStack } from './ecs-stack';

export class ServiceStage extends Stage {
  public readonly loadBalancerAddress: CfnOutput;

  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    const vpcStack = new VpcStack(this, 'VpcStack');
    const ecsStack = new EcsStack(this, 'SimpleHttpServiceEcsStack', {
      vpc: vpcStack.vpc,
    });

    this.loadBalancerAddress = ecsStack.loadBalancerAddress;
  }
}
