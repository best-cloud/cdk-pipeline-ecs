import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { Cluster, ContainerImage } from 'aws-cdk-lib/aws-ecs';
import { ApplicationLoadBalancedFargateService } from 'aws-cdk-lib/aws-ecs-patterns';
import { join } from 'path';

export class EcsStack extends Stack {
  public readonly loadBalancerAddress: CfnOutput;

  constructor(scope: Construct, id: string, vpc: Vpc, props?: StackProps) {
    super(scope, id, props);

    const cluster = new Cluster(this, 'SimpleHttpServiceCluster', {
      vpc,
    });

    // Create a load-balanced Fargate service and make it public
    const fargate = new ApplicationLoadBalancedFargateService(this, 'SimpleHttpFargateService', {
      cluster, // Required
      cpu: 256, // Default is 256
      desiredCount: 1, // Default is 1
      taskImageOptions: {
        image: ContainerImage.fromAsset(join(__dirname, '../../', 'service')),
        containerPort: 8080,
      },
      memoryLimitMiB: 512, // Default is 512
      publicLoadBalancer: true, // Default is false
    });

    this.loadBalancerAddress = new CfnOutput(this, 'SimpleHttpFargateServiceEndpoint', {
      value: fargate.loadBalancer.loadBalancerDnsName,
    });
  }
}
