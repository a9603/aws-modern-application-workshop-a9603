import * as cdk from "aws-cdk-lib";
import * as ecr from "aws-cdk-lib/aws-ecr";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as codecommit from "aws-cdk-lib/aws-codecommit";

interface CiCdStackProps extends cdk.StackProps {
  ecrRepository: ecr.Repository;
  ecsService: ecs.FargateService;
}

export class CiCdStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props: CiCdStackProps) {
    super(scope, id);

    const backendRepository = new codecommit.Repository(
      this,
      "BackendRepository",
      {
        repositoryName: "MythicalMysfits-BackendRepository",
      }
    );

    new cdk.CfnOutput(this, "BackendRepositoryCloneUrlHttp", {
      description: "Backend Repository CloneUrl HTTP",
      value: backendRepository.repositoryCloneUrlHttp,
    });

    new cdk.CfnOutput(this, "BackendRepositoryCloneUrlSsh", {
      description: "Backend Repository CloneUrl SSH",
      value: backendRepository.repositoryCloneUrlSsh,
    });
  }
}
