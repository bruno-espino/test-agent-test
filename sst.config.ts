/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "test-insight",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          region: "us-east-2",
        },
        cloudflare: true
      }
    };
  },
  async run() {
    const vpc = new sst.aws.Vpc("VPC", { nat: "ec2" });
    const db = new sst.aws.Postgres("DB", {
      dev: {
        username: "postgres",
        password: "password",
        database: "local",
        host: "localhost",
        port: 5432,
      },
      vpc
    });

    new sst.aws.SvelteKit("Site", {
      link: [db],
      vpc
    });

    const migrations = new sst.aws.Function("Migrations", {
      handler: "./api/migrations/migrations.main",
      link: [db],
      vpc,
      url: true
    });

    const myapi = new sst.aws.Function("OrgAPI", {
      handler: "./api/org.main",
      link: [db],
      vpc,
      url: true
    });

    // const db = new sst.cloudflare.D1("TestReportDB");

  },
});
