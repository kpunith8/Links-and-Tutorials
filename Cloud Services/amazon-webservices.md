## AWS - Amazon Web Services - Cloud services provider

- Similar offerings, `Google Cloud`, `Microsoft Azure`, and many more

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

## AWS Certified Developer Associate - Udemy Course

### Links

- [Slides and code](https://courses.datacumulus.com/certified-developer-k92)

- Create a budget under  `My Billing Dashboard -> Budgets` -> Create Budgets -> Cost Budget to notify when
  budget crosses the limit specified so that you don't over spend

### IAM - Identity and Access Management

- Root account should never be used, create users with proper permissions

- IAM policies are written in JSON

- 1 IAM user per Person

- 1 IAM role per application

- Never write IAM creds in code

- Never use root IAM creds

### Create an IAM user

- Open `IAM service` and add user - first enable MFA - multi factor authentication with `google authenticator`
  need to download the app from play store and scan for QR code to set it up

- Create an user with auto generated password - assign permissions with `Attach existing policies directly -> Administration Access`
  checked

- Review the user and create and download the `credentials.csv` never share this anyone

- Add the user to group after creating a group with admin privileges

- Go to `Users` -> select the created user and `detach the AdminAccess` since they are inherited from
  admin group created

- Customise the user and login with new link provided in the `Dashboard`

- Use IAM user name provided with downloaded password to login and `change the password` per the password policy
  Ready to go


## EC2

- Rent Virtual machine (EC2)

- Storing data on virtual drives (EBS)

- Distributing load across machines (ELB)

- Scaling the services using auto-scaling group (ASG)

### Create and launch an EC2 instance

- `Choose AMI` - `Amazon Machine Image`, Select free tier eligible `Amazon Linux 2 AMI`

- `Choose Instance Type` - `t2.micro` type - free tier eligible

- Leave the `Configure Instance`, `Add Storage`, and `Add Tags` - as is

- `Configure Security Group` - create a new security group by renaming the name and description
  leave other options untouched,

- `Review and Launch` - create a new key pair to access the EC2 instance with `SSH` and download the file and keep it
  `.pem` extension file with the name provided in the popup

- Once the instance launched, go to `EC2 Dashboard` and see the `instances` running
  - Right click on the running instance and select `instance state` to control the state of the instance
    `stop`, `reboot`, or `terminate`

- When you `stop and start` the instance it will change the public IP which will result in `Connection refused` error
  when connecting with `SSH`

- Creating a new instance can make use of existing key/pair and the security group

#### Connect to the running instance with SSH in mac/linux

- SSH - Secure Shell - allows to control remote machine securely using the command line

- Copy the IPv4 Public IP from `running instance's Description tab`  

- - Make sure `.pem` file has least privileges so that no one can access it, by default it has `0644`
  ```
  $ chmod 0400 <file-name.pem>
  ```

- Use command line with download `.pem` file to access with `ec2-user@public-ip`
  ```
  $ ssh -i <file-name.pem> ec2-user@<public-ip>
  ```

- Once login successful, opens the instance, check the user `whoami` command

#### Connect to running instance in windows with putty

- Download and install the putty

- Open `PuttyGen` to convert the `.pem` to `.ppk` which will be understood by `Putty`

- File -> Load the private key -> Save the private key with/without passphrase

- Open the `Putty` and connect to `EC2-instance`
  - Host Name (or IP address): `ec2-user@<public-ip>`
  - Port: `22` - always defaults to 22
  - Load the `.ppk` file to the connection -> `Category (tree) -> Connection -> SSH -> Auth -> Browse`
    and select the saved `.ppk` file
  - Save the connection for future use
  - Click on `Open` button to connect

#### Connect with EC2 Instance Connect

- Click on `Connect` button next to the instance and select `EC2 Instance Connect` option
  and provide the user name and click connect, which opens the web based UI

### Security Groups

- They control how network traffic is allowed into or out of your EC2 machine

- `Network & Security -> Security Groups` - To control the inbound and outbound connection to the instance
  - Under `Inbound` tab edit and remove the rule added to port-22, then try to connect - which doesn't work
  - Create one with `Type: SSH, Protocol: TCP, Port range: 22, Source: Custom 0.0.0.0/0`

#### Create an Elastic IP

- If you need an `fixed IP`, it requires `Elastic IP` - public IPv4 IP, you own until you delete it
  can be attached to one instance at a time. Only 5 IPs, can be increased. Try avoid using `Elastic IP`

- `Network & Security -> Elastic Ips` -> Click on `Allocate new address` -> `Allocate`
  - Right click on created Elastic IP -> `Associate address` -> select the instance  -> `Associate`

- Associated Elastic IP will be assigned as public IPv4 address and won't be lost on stop and restarting an instance.


### Install Apache on EC2

- Login into ec2 instance run the following commands
  ```
  $ sudo su // to give the super user permissions

  $ yum update -y // to update the all the packages in the machine
  ```

- Install the `httpd`
  ```
  $ yum install -y httpd.x86_64
  ```

- Start the httpd service
  ```
  $ systemctl start httpd.service // use Amazon Linux 2 to get systemctl command
  ```

- Enable httpd.service on reboot
  ```
  $ systemctl enable httpd.service
  ```

- Access the `localhost:80` get the `html` file with `curl`
  ```
  $ curl localhost:80
  ```

- Access the webpage using the public IP in browser, make sure you have inbound rule added to `port:80`
  under `Security Group` Add one with `Type: HTTP`

- Edit the webpage under `/var/www/html/index.html`
  ```
  $ echo "Hello World from $(hostname -f)" > /var/www/html/index.html
  ```

### EC2 User Data - To bootstrap

- Bootstrap the EC2 instances using `EC2 User Data` script, then run with root user

- Select the instance `Actions -> Instance Settings -> View/Change the User Data`
  - Make sure instance is stopped to make the changes

- Example user data to install the updates, install httpd service and update the `index.html` under
  `/var/www/html/index.html`
  ```
  #!/bin/bash

  # Get admin privileges
  sudo su # By default EC2 runs with admin privileges, no need to copy this line

  # Install httpd (Linux 2 version)
  yum update -y
  yum install -y httpd.x86_64
  systemctl start httpd.service
  systemctl enable httpd.service
  echo "Hello World from $(hostname -f)" > /var/www/html/index.html
  ```

- Restart the instance and access the Public IP to see that apache server running

### EC2 Launch Types

- `On Demand Instances`: short workload, predictable pricing

- `Reserved Instances`: long workloads (>= 1 Year)

- `Convertible Reserved Instances`: long workloads with flexible instances

- `Scheduled Reserved Instances`: launch within time window you reserve (scheduled tasks)

- `Spot Instances`: short workload, cheap, can loose instances

- `Dedicated Instances`: No one can will share your hardware

- `Dedicated Hosts`: Book an entire physical server, control instance placement

### Load Balancing

- Servers that forward the internet traffic to multiple servers (EC2 instances) down streams

- Spread load across multiple down stream instances

- Expose a single point of access (DNS) to the application

- Seamlessly handle failures of down stream instances

- Do regular health check on instances

- Provide SSL termination (https) to your websites

- Enforce stickiness with cookies

- High availability across zones

- Separate private traffic from public traffic

#### ELB - EC2 Load Balancer

- Managed load balancer, AWS takes care of upgrades, maintenance, high availability,
  AWS guarantees that it is working, integrated with many AWS services/offerings

- Has `3 kinds` of load balancers
  - `Classic Load Balancer` (v1 - old generation) - 2009 - `Deprecated`
  - `Application Load Balancer` (v2 - new generation) - 2016
  - `Network Load Balancer` (v2 - new generation) - 2017

- Recommended to use v2 load balancers

- Can setup `private/internal` and `public/external` ELBs

- `Application Load Balancers` (Layer 7) (v2)
  - Load balancing to multiple HTTP applications across machines
  - Load balancing to multiple applications on the same machine
  - Load balancing based on route in URL
  - Load balancing based on hostname in URL
  - Good for micro services and container based applications (Docker, Amazon ECS)
  - Has a port mapping feature to redirect to dynamic port
  - Supports `HTTP/HTTPS` and `websockets` protocols
  - `Stickiness` can be enabled at the target group level
    - Same request goes to the same instance
    - It is directly generated by ALS
  - Application servers don't see the IP of the client directly
    - The `true IP` of the client is inserted in the header `X-Forwaded-For`
    - we can also get `Port` (X-Forwarded-Port) and `Proto` (X-Forwaded-Proto)

- `Network Load Balancers` (Layer 4) (v2)
  - Forward `TCP` traffic to instances
  - Handle millions of request per seconds
  - Support for static IP or Elastic IP
  - Less latency ~100ms (vs ~400ms for ALB)
  - Mostly used for extreme performance and should not be the default load balancer to choose
  - Directly see the client IP

- `Creating a Load Balancer`

  - `Load Balancing -> Load Balancers` -> Select `Application Load Balancer` -> `Create`
    - `Configure Load Balancer` -> `Name: web-app-alb, Scheme: internet-facing, IP address type: IPv4`,
      `Listeners: Load Balance protocol: HTTP, port: 80`, `Availability Zones: select all available`

    - `Configure Security Groups` -> Create a new security group -> Fill `name` and `description` ->
      `Type: Custom TCP, Protocol: TCP, Port: 80, Source: Custom, 0.0.0.0/0, ::/0`

    - `Configure Routing` -> Create new `Target Group` -> Name it -> `Target Group: Protocol: HTTP, Port: 80, Target Type: instance`
      `Health Check: Protocol: HTTP, Path: /`

    - `Register Target` -> Select the targeted instance from the list

    - `Review` -> `Create`

    -  Once load balancer is provisioned, grab link from `DNS Name` from `Description` and access the link

  - We can only allow the http requests on Port 80 for our app security group to use Load balancer's SG.
    - Go to `Security Groups` -> Select the Security group attached to the instance and `edit` the inbound rules
    - `HTTP -> Source: Custom, <use Load balancer's Security Group>` -> `type sg-` to auto complete, instead of `0.0.0.0/0`
    - It allows inbound connections only from a Load balancer
    - If you try to access the `public IP` to access the apache server, it never loads, it always loads only from
      `DNS Name` link under Load Balancer


#### ASG - Auto Scaling Group (Free)

- Adopts to the load on websites and applications

- Creates and get rid of servers

- Scale out (Add EC2 instances) to match the increased load

- Scale in (Remove EC2 instances) to match the decreased load

- Ensures we have a minimum and a maximum number of machines running

- Automatically register new instances to load balancer

- ASGs have the following `attributes`
  - A `launch configuration` and it consists of,
    - AMI + Instance Type
    - EC2 User Data
    - EBS Volumes
    - Security Groups
    - SSH Key Pair

  - Set Min/Max size/Initial Capacity
  - Define network + subnet information
  - Load balancer information
  - Define scaling policies

- `Auto Scaling Alarms`
  - Possible to scale ASG based on `CloudWatch Alarms`
  - An alarm monitors a metric (such as Average CPU)
  - Metrics are computed for the overall ASG instances
  - Based on the alarm create scale-out/scale-in policies

- `Auto Scaling new rules`
  - It is now possible to define a better auto scaling rules that are directly managed by EC2
    - Target average CPU usage
    - Number of requests on the ELB per instance
    - Average network in/out

- `Auto Scaling custom metric`
  - Based on custom metric eg: number of connected users
  - Send custom metric from application on EC2 to CloudWatch (PutMetric API)
  - Create CloudWatch alarm to react to low/high values
  - Use the CloudWatch alarm as the scaling policy for ASG

- `ASG Summary`
  - Scaling policies can be on CPU, Network and can be even on custom metrics or based on schedule
  - ASGs use launch configurations and update an ASG by providing a new launch configuration
  - IAM roles attached to to an ASG will get assigned to EC2 instances
  - `ASGs are free`, pay for the underlying resources being launched
  - Having instances under ASG will always restart if any of the instances terminated, extra safety
  - ASG can terminate instances marked as unhealthy by an LB(and hence replace them)

- `Create an ASG`
  - `Auto Scaling` -> Create Auto Scaling Group -> select -> Has 2 steps
    - `Create or Select a launch template` -> `Create launch configuration`
    - Select an `AMI` - Choose `Instance Type` - `Configure Details` (`Advanced` details - fill the `User Data`)
      Select `Storage`, `Security Group` (same as the one you are targeting) and create and launch the configuration
      with `existing key pair`

   - `Create Auto Scaling Group`
    - `Configure Auto Scaling Group details` -> `Group name: First-ASG, Group Size: Start with '1' instances, Network: default VPC,
       Subnet: select all available subnets`
       `Advanced details: Load balancing, check, Receive traffic from one or more balancers`
       `Target Group: Select the one created for Load Balancer`
       `Health check type: check, ELB`

    - `Configure scaling policies` -> select, Use scaling policies to adjust the capacity of this group
      - Scale between '1' and '3' instances. These will be ....
      - `Scale Group Size` -`Name: Scale-size-group, Metric type: Average CPU utilization, Target value: 60,
        Instance need: '60' seconds to warm up after scaling`

    - `Configure Notification` -> leave as it is -> `Tags` -> `Review` and `Create`

- Go to `Load Balancing -> Target Groups -> Targets` to see the all registered targets under the targeted group  

### EBS Volumes

- An `EBS (Elastic Block Store) Volume` is a network drive that can be attached to instances while they run, useful when
  - An EC2 instance looses its root volume when it is manually terminated
  - Unexpected terminations might happen from time to time
  - To store instance data

- It's a network drive - it can be detached from an instance and attached to another instance quickly

- It is locked to an `Availability Zone` (AZ) - to move a volume across, create a snapshot

- There are `4 types`
  - `GP2 (SSD)` - General purpose SSD volume that balances price and performance
  - `IO1 (SSD)` - Highest perfomance SSD volume for mission critical, low latency or high throughput workloads (Very expensive)
  - `ST1 (HDD)` - Low cost HDD volume designed for frequent access, throughput intensive workloads
  - `SC1 (HDD)` - Lowest cost HDD volume designed for less frequently accessed workloads

- EBS volumes are characterised by `size`, `throughput`, and `IOPS` - IO Operations/second

- `EBS Snapshots`
 - EBS volumes can be backed up using snapshots
 - Snapshots takes only the actual blocks on the volume
 - Snapshots can be used for `migration` - `resizing`, `changing the volume type`, and `encryption`

- `EBS Encryption`
  - Data at rest is encrypted inside the volume
  - All the data in the flight moving between instance and volume is encrypted
  - All snapshots are encrypted
  - It has minimal impact on latency
  - It leverages keys from `KMS (AES-256)`

- `Instance Store`
  - Some instances do not come with `Root EBS` Volume, instead they come with `Instance Store`
  - They are physically attached to the machine
  - Pros:  Better I/O performance
  - Cons: Instance store is `lost on termination`,
    `cannot resize volumes`, and `backups must be operated by the user`

## AWS Route 53 - Need to pay money to buy a domain

- It is a managed DNS (Domain Name System): Collection of rules and records which helps clients
  understand how to reach a server through URLs

- AWS has 4 types of records
  - `A` - URL to IPv4
  - `AAAA` - URL to IPv6
  - `CNAME` - URL to URL
  - `Alias` - URL to AWS resource

- They can use, public domain names you own or buy, private domain names that can be resolved by
  instances in VPCs

- It has advanced features such as
  - Load balancing (through DNS - called client load balancing)
  - Health checks
  - Routing policy: simple, failover, geolocation, geoproximity, latency, and weighted

- Use Alias records over CNAME for AWS resources

- `Configure Route53`
  - Search for `Route53` -> `DNS Management` -> `Create a hosted Zone` -> Needs a domain name
  - Go to -> `Domains` -> `Registered Domains` -> `Register Domain` -> Create your domain
  - Once the domain activated it is listed in `Hosted Zones` with 2 records for the domain created
  - `Hosted Zones` -> `Create a Record Set` to link to DNS created for EC2 instance -> `Name: domain-name,
    Type: A - IPv4 address, Alias: Yes, Alias Target: Instance created` -> `Create`
  - Access your domain once Record set created

## AWS RDS - Relational Database Service

- Managed DB service for DB, uses SQL as query language

- Allows to create database in the cloud and managed by AWS
  - `Postgres`, `Oracle`, `MySQL`, `MariaDB`, `Microsoft SQL Server`, and `Aurora` (AWS owned)

- `Benefits` of using managed DB
  - OS patching level
  - Continuous backup and restore to specific timestamp
  - Monitoring dashboards
  - Read replicas for improved read performance
  - Multi AZ setup for Disaster Recovery
  - Maintenance windows for upgrades
  - Scaling capability (Horizontal and vertical)

- Doesn't allow ssh to RDS instances

- `RDS Encryption`
  - Encryption with `rest` capability with `AWS KMS-AES-256` encryption
  - `SSL certificates` to encrypt data to RDS in `flight`
  - To `enforce SSL`
    - `PostegreSQL`- `rds.force_ssl=1` in the AWS RDS Console
    - `MySQL`- within the DB - `GRANT USAGE ON *.* TO 'mysqluser'@'%' REQUIRE SSL`
  - To `connect using SSL`
    - Provide the SSL trust certificate (Download from the AWS)
    - Provide SSL options while connecting to DB

- `RDS Security`
  - Databases are `deployed within a private subnet`
  - Works by leveraging the `Security Groups` - Controls who can communicate with RDS
  - `IAM Policies` help control who can manage RDS
  - Traditional `username` and `password` can be used to connect to the database

- `Create a RDS DB`
  - `Databases` -> `Create database` -> Select `MySQL` -> Template - Free tier
  - Name the db, create master username and password, and specify other params to create the DB
  - Use `sqlectron` tool to query and connect to the DB


## AWS ElasticCache

- To manage cache services such as, `Redis` or `Memcached` - in memory DBs with high
  performance and low latency,

- Helps reduce load off of DBs for read intensive workloads

- Makes application `stateless`

- Write scaling using `Sharding`,

- Read scaling using `Read Replicas`

- Multi AZ with `FailOver` capability

- AWS takes care of `OS maintenance/patching`, `optimizations`, `setup`, `configuration`,
  `monitoring`, `failure recovery`, and `backups`

- `Create an ElasticCache`
  - Search for ElasticCache service -> Create Redis cache with minimum setup

- `Patterns`
 - `Lazy Loading`: Load only when necessary, data is stale
 - `Write Through`: Add or Update whenever DB is updated

### AWS VPC - Virtual Private Cloud

- Within a region we can create a VPC

- Each VPV contains subnets

- Each subnet must be mapped to an AZ

- Public subnets usually contains, load balancers, static websites, files, public authentication layers

- Private subnets usually contains, web application servers, databases


## Amazon S3

- Allows to store `objects` (files) in `buckets` (directories)

- Buckets must have globally unique name

- Defined at the region level

- Naming conventions
  - `No uppercase`
  - `No underscore`
  - `3-63 chars long`
  - `Not an IP`
  - Must start with a `lowercase` char or a `number`

- Object(files) have a key. The key is full length
  - eg: `<my-bucket>/my_file.txt`

- There is no concept of `directories` in the bucket

- Object values are the content of the body
  - Max size is `5TB`
  - If the size is more than 5TB use `multi-part upload`
  - They can be `metadata` (list of text key/value pairs - system or user metadata)
  - It also can be `tags` (Unicode key/value pair - upto 10) - useful for security/life cycle
  - Can have a `version ID` (If versioning is enabled)

- `Create a S3`
  - Search for `S3` -> `Create a bucket` -> `Name: Give a unique name, Region: Mumbai` and leave the other sections
    as it is and create one
  - Once bucket provisioned, upload the files, leave it to default values and upload the file

  - `S3 Versioning` - Enabled at the bucket level, same key overwrite will increment the version: 1,2,3
    - It is a best practice to version the buckets
    - Protects against unintended deletes (Allows to restore a version)
    - Easily rollback to previous version

  - Select the created bucket -> `Properties` tab -> `Versioning` -> Enable the versioning

  - `S3 Encryption for Objects` - There are 4 methods
    - `SSE-S3` - Encrypts s3 objects using keys handled and managed by AWS
    - `SSE-KMS` - Leverages AWS Key Management Service to manage encrypt keys
    - `SSE-C` - Allows to manage your own keys
    - `Client Side Encryption`

    - `SS3-S3` -
