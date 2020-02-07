## AWS - Amazon Web Services -  Provider of cloud services

- [Service Health Dashboard](https://status.aws.amazon.com/)

### Core Services
- EC2 - Elastic Cloud Compute
  - Run Applications, Virtual desktop, 3rd Party software, and Computing

  - EBS - Elastic Block Storage, for EC2 instance only

- S3 - Simple Storage Service
  - Service that stores files, max size of file 5 TB, it can be any file

  - Can be accessed using URLs

  - Can be used host the static files for a website.

  - Using CloudFront service, content can be cached, across the regions.

- RDS - Relational Database Service

- Route53
  - for DNS needs - to convert URL to a IP address


## Setup Budget

- Under billing preferences

## Use Cloudwatch to set usage alrams

## Create admin user with IAM - Identity and Access Management

- Customise it to have a unique name

- Activate MFA - Virtual MFS Device

- Create access keys

- Create user and login to that user with admin privileges


### Security Services

- `CloudTrail` - kind of git blame, to know what user did, what has been messed up (Root account)
  - Create a trail

- `GuardDuty` - To track account intrusion or any malicious activity on accounts
  - create a guard duty
  - Should be for the same region
  - Add the accounts
  - Accept the invitation from the root account in IAM user account

- VPC - `Virtual Private Cloud` - Create a `flow-log` to track the IP addresses or traffic to
  the website, with the help of `log-group`

- `AWS Config`

- `AWS Security Hub` - use it during free-tier

## Best free-tier services

- `EC2` - web server - `t2.micro`
- `RDS` - Database (MySQL or Postgres) - `t2.db.micro`
- `ELB` - Elastic Load balancer
- `Amazon Cloud front` - CDN - Video data transfer allowed
- `Amazon Connect` - Toll Free number
- `Amazon Elastic Cache` - `cache.t3.micro` - redis
- `Amazon Elastic Search` - Text search
- `PinPoint` - Marketing/Campaign emails
- `SES` - sent by web app - 62,000 emails/month forever
- `AWS Code Pipeline` - CI/CD - 1 Pipeline free
- `AWS Code Build` - 100 build minutes/month forever

### Route53 - to register a domain name

### Cloud9 - Setting up a development environment

### S3 and CloudFront

- Upload files to S3 and select `host static website` option to host it and update bucket
  policy to make it available as public resource, use temporary link to access to open the hoisted
  website, it can be configured to change it to registered domain.

  - Don't make the buckets public which will expose the data outside.

- `Cloud Front` sits in front of S3 and distributes files globally and going to protect the S3 buckets

  - Before setting up `cloud front` it needs SSL certificate, use `ACM - Amazon certificate Manager`
    to create one - Select the region, and `Request a certificate`, provide the domain name

  - Create a distribution in `cloud front`

  - Create invalidations under `invalidations` to clear the cache for the files so that latest
    changes uploaded are updated to everyone using it

### Elastic Bean Stack - Deploy, monitor and scale the app

- 
