import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { Cluster, ContainerImage } from 'aws-cdk-lib/aws-ecs';
import { ApplicationLoadBalancedFargateService } from 'aws-cdk-lib/aws-ecs-patterns';
import { join } from 'path';

export class EcsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const vpc = new Vpc(this, 'MyVpc', {
      maxAzs: 3, // Default is all AZs in region
    });

    const cluster = new Cluster(this, 'MyCluster', {
      vpc,
    });

    // Create a load-balanced Fargate service and make it public
    new ApplicationLoadBalancedFargateService(this, 'MyFargateService', {
      cluster, // Required
      cpu: 512, // Default is 256
      desiredCount: 1, // Default is 1
      taskImageOptions: { image: ContainerImage.fromAsset(join(__dirname, '../../', 'service')) },
      memoryLimitMiB: 2048, // Default is 512
      publicLoadBalancer: true, // Default is false
    });
  }
}
