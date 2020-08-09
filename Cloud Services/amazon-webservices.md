# AWS - Amazon Web Services - Cloud Service Provider

- Similar offerings, `Google Cloud`, `Microsoft Azure`, and many more

- [Service Health Dashboard](https://status.aws.amazon.com/)

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

- Never use root IAM credentials

### Create an IAM user

- Open `IAM service` and add user - `Enable MFA` - multi factor authentication with `google authenticator`
  need to download the app from play store and scan for QR code to set it up

- Create an user with auto generated password - assign permissions with `Attach existing policies directly -> Administration Access`
  checked

- Review the user and create and download the `credentials.csv` never share this with anyone

- Add the user to `group` after creating a group with admin privileges

- Go to `Users` -> select the created user and `detach the AdminAccess` since they are inherited from
  admin group created

- Customise the user and login with new link provided in the `Dashboard`

- Use IAM user name provided with downloaded password to login and `change the password` per the password policy
  Ready to go


## EC2 Instances

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

- Creating a new instance can make use of existing `key/pair` and the `security group`

#### Connect to the running instance with SSH in mac/linux

- `SSH` - Secure Shell - allows to control remote machine securely using the command line

- Copy the IPv4 Public IP from `running instance's Description tab`  

- Download `.pem` file by clicking on `Connect` button on an `EC2` running instance.

- Make sure `.pem` file has least privileges so that no one can access it, by default it has `0644`
  ```
  $ chmod 0400 <file-name.pem>
  ```

- Use command line with download `.pem` file to access with `ec2-user@public-ip-of-an-ec2-instance`
  you should be in the same folder where the `.pem` file exists to ssh into it or
  you have to pass the path of the `.pem` file.
  ```
  $ ssh -i <file-name.pem> ec2-user@public-ip-of-an-ec2-instance
  ```

- Once login successful, it opens the instance

#### Connect to running instance in Windows with puTTY

- Download and install the putty

- Open `puTTYGen` to convert the `.pem` to `.ppk` which will be understood by `puTTY`

- File -> Load the Private key -> Save the private key with/without passphrase

- Open the `puTTY` and connect to `EC2-instance`

- Host Name (or IP address): `ec2-user@public-ip-of-an-ec2-instance`

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

- Under `Inbound` tab edit and remove the rule added to `port: 22`, then try to connect - which doesn't work

- Create one with inbound rule to access the EC2 on `port: 22` through SSH, as follows
  ```
  Type: SSH, Protocol: TCP, Port range: 22, Source: Custom 0.0.0.0/0`
  ```

- Add another inbound rule for HTTP,  
  ```
  HTTP, TCP, Port: 80 for 0.0.0.0/0` to access the http port of the ec2 instance
  ```

- Add an outbound rule, by default it is added while creating an SG

### Create an Elastic IP

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

### EC2 User Data - To bootstrap the EC2 startup

- Bootstrap the EC2 instances using `EC2 User Data` script, then run with root user

- Select the instance `Actions -> Instance Settings -> View/Change the User Data`.
  Make sure instance is stopped to make the changes

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

- `Restart` the instance and access the Public IP to see that apache server running

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

- Separate `private` traffic from `public` traffic

### ELB - EC2 Load Balancer

- Managed load balancer, AWS takes care of upgrades, maintenance, high availability,
  AWS guarantees that it is working, integrated with many AWS services/offerings

- Has `3 kinds` of load balancers

  - `Classic Load Balancer` (v1 - old generation) - 2009 - `Deprecated`

  - `Application Load Balancer` (v2 - new generation) - 2016

  - `Network Load Balancer` (v2 - new generation) - 2017

- Recommended to use v2 load balancers

- Can setup `private/internal` and `public/external` ELBs

#### Application Load Balancers (Layer 7) (v2)

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

#### Network Load Balancers (Layer 4) (v2)

- Forward `TCP` traffic to instances

- Handle millions of request per seconds

- Support for static IP or Elastic IP

- Less latency ~100ms (vs ~400ms for ALB)

- Mostly used for extreme performance and should not be the default load balancer to choose

- Directly see the client IP

### Create a Load Balancer

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

- We can only allow the http requests on `Port 80` for our app security group to use Load balancer's SG.

  - Go to `Security Groups` -> Select the Security group attached to the instance and `edit` the inbound rules

  - `HTTP -> Source: Custom, <use Load balancer's Security Group>` -> `type sg-` to auto complete, instead of `0.0.0.0/0`

  - It allows inbound connections only from a Load balancer

  - If you try to access the `public IP` to access the apache server, it never loads, it always loads only from
    `DNS Name` link under Load Balancer

## ASG - Auto Scaling Group (Free)

- Adopts to the load on websites and applications

- Creates and get rid of servers

- Scale out (Add EC2 instances) to match the increased load

- Scale in (Remove EC2 instances) to match the decreased load

- Ensures we have a minimum and a maximum number of machines running

- Automatically register new instances to load balancer

- ASGs have the following `attributes`, a `launch configuration` and it consists of,
  - AMI + Instance Type

  - EC2 User Data

  - EBS Volumes

  - Security Groups

  - SSH Key Pair

  - Set Min/Max size/Initial Capacity

  - Define network + subnet information

  - Load balancer information

  - Define scaling policies

### Auto Scaling Alarms

- Possible to scale ASG based on `CloudWatch Alarms`

- An alarm monitors a metric (such as Average CPU)

- Metrics are computed for the overall ASG instances

- Based on the alarm create scale-out/scale-in policies

### Auto Scaling new rules

- It is now possible to define a better auto scaling rules that are directly managed by EC2

  - Target average CPU usage

  - Number of requests on the ELB per instance

  - Average network in/out

### Auto Scaling custom metric

- Based on custom metric eg: number of connected users

- Send custom metric from application on EC2 to CloudWatch (PutMetric API)

- Create CloudWatch alarm to react to low/high values

- Use the CloudWatch alarm as the scaling policy for ASG

### ASG Summary

- Scaling policies can be on CPU, Network and can be even on custom metrics or based on schedule

- ASGs use launch configurations and update an ASG by providing a new launch configuration

- IAM roles attached to to an ASG will get assigned to EC2 instances

- `ASGs are free`, pay for the underlying resources being launched

- Having instances under ASG will always restart if any of the instances terminated, extra safety

- ASG can terminate instances marked as unhealthy by an LB(and hence replace them)

### Create an ASG

- `Auto Scaling` -> Create Auto Scaling Group -> select -> Has 2 steps

- `Create or Select a launch template` -> `Create launch configuration`

- Select an `AMI` - Choose `Instance Type` - `Configure Details` (`Advanced` details - fill the `User Data`)
  Select `Storage`, `Security Group` (same as the one you are targeting) and create and launch the configuration
  with `existing key pair`

### Create an Auto Scaling Group

- `Configure Auto Scaling Group details`
  `Group name: First-ASG, Group Size: Start with '1' instances, Network: default VPC, Subnet: select all available subnets`
  `Advanced details: Load balancing, check, Receive traffic from one or more balancers`
  `Target Group: Select the one created for Load Balancer`
  `Health check type: check, ELB`

- `Configure scaling policies` -> select, Use scaling policies to adjust the capacity of this group

- Scale between '1' and '3' instances. These will be ....

- `Scale Group Size` -`Name: Scale-size-group, Metric type: Average CPU utilization, Target value: 60,
  Instance need: '60' seconds to warm up after scaling`

- `Configure Notification` -> leave as it is -> `Tags` -> `Review` and `Create`

- Go to `Load Balancing -> Target Groups -> Targets` to see the all registered targets under the targeted group  

## EBS Volumes

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

### EBS Snapshots

- EBS volumes can be backed up using snapshots

- Snapshots takes only the actual blocks on the volume

- Snapshots can be used for `migration` - `resizing`, `changing the volume type`, and `encryption`

### EBS Encryption

- Data at rest is encrypted inside the volume

- All the data in the flight moving between instance and volume is encrypted

- All snapshots are encrypted

- It has minimal impact on latency

- It leverages keys from `KMS (AES-256)`

### Instance Store

- Some instances do not come with `Root EBS` Volume, instead they come with `Instance Store`

- They are physically attached to the machine

- Pros:  Better I/O performance

- Cons: Instance store is `lost on termination`,
  `cannot resize volumes`, and `backups must be operated by the user`

## Route53

- It is a `managed DNS` (Domain Name System): Collection of rules and records which helps clients
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

- Use Alias records over `CNAME` for `AWS` resources

### Configure Route53

- Search for `Route53` -> `DNS Management` -> `Create a hosted Zone` -> Needs a domain name

- Go to -> `Domains` -> `Registered Domains` -> `Register Domain` -> Create your domain

- Once the domain activated it is listed in `Hosted Zones` with 2 records for the domain created

- `Hosted Zones` -> `Create a Record Set` to link to DNS created for EC2 instance -> `Name: domain-name,
  Type: A - IPv4 address, Alias: Yes, Alias Target: Instance created` -> `Create`

- Access your domain once Record set created

## AWS RDS - Relational Database Service

- Managed DB service for DB, uses SQL as query language

- Allows to create database in the cloud and managed by AWS,
  `Postgres`, `Oracle`, `MySQL`, `MariaDB`, `Microsoft SQL Server`, and `Aurora` (AWS owned)

### Benefits of using managed DB

- OS patching level

- Continuous backup and restore to specific timestamp

- Monitoring dashboards

- Read replicas for improved read performance

- Multi AZ setup for Disaster Recovery

- Maintenance windows for upgrades

- Scaling capability (Horizontal and vertical)

- Doesn't allow `ssh` to `RDS` instances

### RDS Encryption

- Encryption with `rest` capability with `AWS KMS-AES-256` encryption

- `SSL certificates` to encrypt data to RDS in `flight`

- To `enforce SSL`

  - `PostegreSQL`- `rds.force_ssl=1` in the AWS RDS Console

  - `MySQL`- within the DB - `GRANT USAGE ON *.* TO 'mysqluser'@'%' REQUIRE SSL`

- To `connect using SSL`

  - Provide the SSL trust certificate (Download from the AWS)

  - Provide SSL options while connecting to DB

### RDS Security

- Databases are `deployed within a private subnet`

- Works by leveraging the `Security Groups` - Controls who can communicate with RDS

- `IAM Policies` help control who can manage RDS

- Traditional `username` and `password` can be used to connect to the database

### Create a RDS DB

- `Databases` -> `Create database` -> Select `MySQL` -> Template - Free tier

- Name the db, create master `username` and `password`, and specify other params to create the DB

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

### Create an ElasticCache

- Search for `ElasticCache` service -> `Create Redis cache` with minimum setup

- Patterns
  - `Lazy Loading`: Load only when necessary, data is stale
  - `Write Through`: Add or Update whenever DB is updated

### AWS VPC - Virtual Private Cloud

- Within a region we can create a VPC

- Each VPC contains subnets

- Each subnet must be mapped to an AZ

- Public subnets usually contain, `load balancers`, `static websites`, `files`, `public authentication layers`

- Private subnets usually contains, `web application servers`, `databases`

## Amazon S3

- Allows to store `objects` (files) in `buckets` (directories)

- Buckets must have globally unique name

- Defined at the region level

- `Naming conventions`

  - `No uppercase`

  - `No underscore`

  - `3-63 chars long`

  - `Not an IP`

  - Must start with a `lowercase` char or a `number`

- Object(files) have a key. The key is full length, eg: `<my-bucket>/my_file.txt`

- There is no concept of `directories` in the bucket

- Object values are the content of the body

  - Max size is `5TB`

  - If the size is more than 5TB use `multi-part upload`

  - They can be `metadata` (list of text key/value pairs - system or user metadata)

  - It also can be `tags` (Unicode key/value pair - upto 10) - useful for security/life cycle

  - Can have a `version ID` (If versioning is enabled)

### Create a S3

- Search for `S3` -> `Create a bucket` -> `Name: Give a unique name, Region: Mumbai` and leave the other sections
  as it is and create one

- Once bucket provisioned, upload the files, leave it to default values and upload the file.

- `Properties` -> tab provides us to specify the encryption method for the file being uploaded.

### S3 Versioning

- Enabled at the bucket level, same key overwrite will increment the version: 1,2,3

- It is a best practice to version the buckets

- Protects against unintended deletes (Allows to restore a version)

- Easily rollback to previous version

- Select the created bucket -> `Properties` tab -> `Versioning` -> Enable the versioning

### S3 Encryption for Objects

- There are 4 methods of encryptions

  - `SSE-S3` - Encrypts s3 objects using keys handled and managed by AWS

  - `SSE-KMS` - Leverages AWS Key Management Service to manage encrypt keys

  - `SSE-C` - Allows to manage your own keys

  - `Client Side Encryption`

#### SS3-S3

- Object is `encrypted` at `server side`

- Type: `AES-256`

- Must set the header: `"x-amz-server-side-encryption":"AES256"`

#### SSE-KMS

- Gives user control and audit trail

- Object is encrypted at server side

- Must set the header: `"x-amz-server-side-encryption":"aws:kms"`

#### SSE-C

- S3 doesn't store the encryption key provided

- `HTTPS` must be `mandatory`

- Key must provided in HTTP headers, for every request made

#### Client Side Encryption

- Can be done with client library such as `Amazon S3 Encryption Client` SDK

- Client must `encrypt` the data before sending it to S3

- Should `decrypt` the encrypted data received from the S3

### Encryption in Transit (SSL/TLS)

- AWS S3 exposes HTTP endpoint, non encrypted

- And exposes HTTPS endpoint in flight

### S3 Security

- `User Based`: IAM Policies - Allow specific API calls for an IAM Role

- `Resource Based`: There are 3 types

  - `Bucket Policies`: Bucket wide rules from the S3 console - allows cross account access.
    JSON based policies

  - `Object Access Control List (ASL)` - Finer grain control

  - `Bucket Access Control List (ASL)` - Less common

> An IAM Principal can access an S3 object if, the user IAM permissions allow or
  the resource policy allows it and there is no explicit deny

## Create Policy for S3 Bucket

- `S3` -> `Properties` -> `S3 Bucket Bucket Policy`

- Open `AWS Policy Generator`
  ```
  1) Policy Type: S3 Bucket Policy

  2) Add Statement(s)

     Effect: Deny
     Principal: * # On everthing
     AWS Service: AWS S3
     Actions: PutObject
     ARN: arn..../* # Copy it from Properties -> S3 Bucket Bucket Policy section
     Add Conditions:
      Condition: null
      Key: s3:x-amz-server-side-encryption
      value: true
  # Add the statement, multiple statements can be added
  # Add another statement with same as above with changes to conditions as follows
    Condition: StringNotEquals
    Key: s3:x-amz-server-side-encryption
    value: AES256

  3) Generate the policy

  # Copy the JSON object and paste it in Bucket Policy tab
  ```

### S3 Websites

- S3 can host websites and have them accessible on the www

- The URL would look like, `<bucket-name>.s3-website-<AWS-region>.amazonaws.com`

- Upload the html files and go to `Properties -> Static Website hosting`
  and specify the html file names and copy the URL `http://pk-web-bucket.s3-website.ap-south-1.amazonaws.com`

- Make sure the bucket should be made public go to `Permissions -> Block Public Access` and uncheck the rule selected
  And Add a bucket policy under  `Permissions -> Bucket Policy`, select `Policy Generator` to create the policy
  ```
  {
    "Id": "Policy1596008821834",
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "Stmt1596008813648",
        "Action": [
          "s3:GetObject"
        ],
        "Effect": "Allow",
        "Resource": "arn:aws:s3:::pk-web-bucket/*",
        "Principal": "*"
      }
    ]
  }
  ```

#### CORS with S3 buckets

- Header used, `Access-Control-Allow-Origin`

- Need to enable CORS headers in the bucket, allow specific origin or all `*`

- Make a `fetch` request from `index.html` to another html `extra-page.html`
  ```html
  <div class="fetch-sample"></div>
  <script>
    let fetchSample = document.querySelector(".fetch-sample");

    fetch("extra-page.html")
      .then((response) => response.text())
      .then((html) => (fetchSample.innerHTML = html));
  </script>
  ```

- Upload the files to bucket and request the file as,
  `http://pk-web-bucket.s3-website.ap-south-1.amazonaws.com/extra-page.html`

- It should work because it is in the same origin as that of bucket

- To enable CORS, keep `extra-page.html` in another bucket
  and enable `static website hosting` and set `public access`, the `bucket policy` and upload the file.

- Open the link, `http://pk-cross-origin-bucket.s3-website.ap-south-1.amazonaws.com/extra-page.html`
  to access the html file int the browser.

- To enable CORS so that first bucket can access it,
  go to `Permissions -> CORS Configuration` and update it with
  ```xml
  <CORSConfiguration>
    <CORSRule>
      <AllowedOrigin>bucket-url-or-*</AllowedOrigin>
      <AllowedMethod>GET</AllowedMethod>
      <AllowedMethod>PUT</AllowedMethod>
      <MaxAgeSeconds>3000</MaxAgeSeconds>
      <AllowedHeader>*</AllowedHeader>
    </CORSRule>
  </CORSConfiguration>
  ```

- Update the fetch url with `http://pk-cross-origin-bucket.s3-website.ap-south-1.amazonaws.com/extra-page.html`
  to access the file from another bucket.

## AWS CLI

- Install the CLI based on your OS

### Configuration on Local Computer

- Create an `IAM user`

- Go to `Users` -> Select the user -> `Create access key` -> Generate the key and store it safely
  never share it with anyone

- Open the CLI and configure `aws` as follows
  ```
  $ aws configure
  ```

- Enter `Access Key ID` and `Secret Access Key` when prompted

- Specify `default region name` and default output format as is

### CLI on EC2

- Best way is to use `IAM Roles`

- `IAM Roles` can be attached to the EC2 instances

- `IAM Roles` can come withe a policy authorizing exactly what the EC2 instance should be able to do

- SSH into the EC2 instance created and it should have aws cli installed already
  ```
  $ aws configure
  ```
  > Don't specify the access ID and keys here, just enter the region name. That's it

- Create an `IAM Role` from `IAM console` and attach it to running EC2 instance
  ```
  1) Create a Role: AWS Service -> EC2 option

  2) Permissions -> search for s3 -> select -> S3 Readonly Access

  3) Specify an Unique name and Create Role
  ```

- Go to EC2 running instance -> right click -> `Instance Settings` -> `Attach or Replace IAM Role`

- Go to EC2 console, to list all the S3 buckets created
  ```
  $ aws s3 ls

  # List the files in the bucket
  $ aws s3 ls s3://<bucket-name>
  ```
  > Without the access the IAM Role it wont let access s3 from AWS CLI

- Try creating a bucket, it fails because of s3 readonly policy of the `IAM Role` attached to the EC2 instance
  ```
  $ aws s3 mb s3://another-bucket
  ```

- Use `IAM Policy Simulator` to check whether service has policies for a specific users or a group

- Use `--dry-run` option to simulate dry run before actually running them
  ```
  $ aws ec2 run-instances --dry-run --image-id <get-it-from-running-instance> --instance-type t2.micro
  ```

### STS - Decode Erros

- The error message running the `CLI commands` can be decoded using the `STS` command line
  ```
  $ aws sts decode-authorization-messge --encoded-message <cryptic-msg>
  ```

- deconde-authorization-message can be granted to decode the error message in `CLI` through an
  `IAM Policy` by creating a `Custom Policy` and attaching the custom policy to a IAM Role
  ```
  1) Edit Policy

  2) Service: STS

  3) Access Level: Write: DecodeAuthorizationMessage
  ```

- Then run the command again
  ```
  $ aws sts decode-authorization-messge --encoded-message <cryptic-msg>

  $ echo <msg> # Copy to VS code editor and format to see the error message properly
  ```

### EC2 Instance Metadata

- The URL to access the metadata is, `http://169.254.169.254/latest/metadata`

- Above URL works only `within` the `EC2 instance`

- Allows to retrieve the `IAM Role Name` from metadata but not the `IAM Policy`

- Run this inside an EC2 instance
  ```
  $ curl http://169.254.169.254/latest/metadata

  # To access IAM Role credentials created by AWS CLI to access the AWS services
  # It is temporary and comes with a expiration
  $ curl http://169.254.169.254/latest/metadata/iam/security-credentials/<Role-Name>
  ```

### AWS CLI Profiles

- In macOS the `config` and `credentials` files are stored under `~/.aws` folder

- Access multiple AWS accounts: create a profile as follows
  ```
  $ aws configure --profile personal-aws
  ```

- Enter `Access Key ID` and `Secret Access Key` when prompted

- Specify `default region name` and leave `Default output format` as is

- While running specific commands on CLI provide `--profile` option as follows,
  ```
  $ aws s3 ls --profile personal-aws
  ```

### MFA with CLI

- Must create a temporary session, must run `STS GetSessionToken` API, to get the temporary token

- Go to `IAM Console`, Select the user go to,
  ```
  1) Select an IAM user

  2) Security Credentials: Assigned MFA device: Manage: Virtual MFA Device

  3) Install the google authenticator and Scan the QR code and register it

  4) Grab the 'arn:aws:iam::...' to use it in command line
  ```

- Run the following in command
  ```
  $ aws sts get-session-token --serial-number <arn-from-the-console> --token-code <code-from-authenticator>
  ```

- It returns temporary session creds, store it somewhere so that we can add to profile and access it.
  ```
  $ aws configure --profile mfa # Provide the details copied from the above command
  ```

- And add the session token to `~/.aws/credentials` file as follows,
  ```
  aws_session_token=.....
  ```

## AWS SDK

- Perform actions on AWS directly from your applications code

- Official SDKs are, `Java, NodeJS, Pyton, .Net, Ruby, C++, etc.`

- Use the SDK when coding against AWS services such as `DynamoDB`

## AWS Limits (Quotas)

### API Rate Limits

- `DescribeInstances` API for EC2 has a limit of `100 calls/sec`

- `GetObject` on S3 has a limit `5500 GET/sec`

- For intermittent errors: Implement `Exponential Backoff` - Retry mechanism included in SDK API calls

- For consistent errors: Request an `API throttling limit increase`

### Service Quotas

- Running on-demand standard instances: `1152 vCPU`

- Request for service quote increase by using the `Service Quotas API`

## CLI Credential Provider Chain

- CLI will look for credentials in this order

1. `Commandline Options`: `--region`, `--output`, and `--profile`

2. `Environment Variables`: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and `AWS_SESSION_TOKEN`

3. `CLI Credentials file`: `~/.aws/credentials`

4. `CLI configuration file`: `~/.aws/config`

5. `Container credentials`: For ECS tasks

6. `Instance Profile Credentials`: For EC2 Instance Profiles

## Signing AWS API Requests

- While making call to AWS HTTP API, request must be signed so that the AWS
  can indetify the user, using AWS credentials.

> Some requests to AWS don't need signing

- Using `SDK` or `CLI` will automatically sign all the HTTP requests.

- Otherwise, need to be signed using, `Signature v4(SigV4)`

## Advanced S3 and Athena

### S3 MFA-Delete

- MFA forces users to generate code on a device before performing any operations on S3

- To use `MFA-Delete`, enable versioning on the S3 bucket.

- MFA needed to `permanently delete an object version` and `suspend versioning on the bucket`.

- MFA not needed for `enabling the versioning` and `listing deleted versions`

- Only the bucket owner can enable/disable MFA-Delete.

- It can only be enabled using CLI
  ```
  1) Create an bucket with versioning enabled.

  2) Go to root account select MFA, make sure MFA has been enabled

  3) Create an access key for the root account

  4) Create a profile in the CLI and add the access id and key with the profile

    $ aws configure --profile root-mfa-delete

  5) Use the profile and list all the buckets

    $ aws s3 ls --profile root-mfa-delete
  ```

- Enable the MFA delete as follows, copy the `arn` from MFA console and Code from registered device
  ```
  $ aws s3api put-bucket-versioning --bucket <bucket-name> --versioning-configuration
    Status=Enabled,MFADelete=Enabled --mfa "<arn> <mfa-code>" --profile root-mfa-delete
  ```

- Go to the bucket and try deleting an file marker or try to disable the versioning,
  It throws an error.

- It can be disabled again by changing `--versioning-configuration Status=Enabled,MFADelete=Disabled`

### S3 Access logs

- Used to access the logs for audit purposes

- Do not set logging bucket to be monitoring bucket, which will create a `logging loop`
  and bucket will grow in size exponentially.
  ```
  1) Create a bucket to put all the logs for the bucket to be monitored

  2) Go to App bucket to add the access logs -> Properties -> Enable, Server Access Logging
     And choose a target bucket and do some action like adding file and deleting
     Everything gets logged to targeted bucket
  ```

### S3 Replication (Cross and Same region)

- Must enable versioning in both source and destination

- Copying is asynchronous

- Must give proper IAM permissions to S3

- CRR good for compliance, lower latency and replication across accounts

- SRR good for log aggregation, live replication between test and prod accounts

- There is no chaining of replication any changes to A will only replicate in B but
  not in C, if C was referring to B

- Create two S3 buckets in 2 different regions and make sure to `enable the versioning` on both
  of the S3 buckets
  ```
  1) Create and enable versioning for both the buckets

  2) Enable Replication for the target bucket -> Management -> Replication
     Add a Rule -> Entire Bucket -> Choose the destination bucket
     Create a new IAM Role -> name it -> Review and Save it
  ```

- Delete markers or any delete action are not replicated

### S3 pre-signed URLs

- To give access to files for a while

- Valid for a default of 3600 secs (1 Hour), can be changed with `--expires-in` option

- Need to use `CLI for downloads` and `SDK for uploads` to sign the URL to give access to.
  ```
  1) Click on the file to be pre-signed and grab the URL from it

  2) Set the signature

     $ aws configure set default.s3.signature_version s3v4

  3) Sign the url using CLI

     $ aws s3 presign s3://<bucket-name>/<filename.ext> --expires-in 300 --region=ea-east-1

  4) Generated URL can be used upto 5 mins
  ```

### S3 Storage Classes - 6 Types

- Storage class can be selected while uploading an file to the bucket
  under `properties` section

#### Amazon S3 Standard

- `High durability` across multiple AZ (`99.99999999999%`)

- Sustain 2 concurrent facility failures

- Use cases: `Big data analytics`, `mobile and gaming apps`, `content   distribution`

#### Amazon S3 Standard-Infrequent Access (IA)

- Required for data that is less frequently accessed - requires rapid access when needed

- `Highly durability` across multiple AZ

- `Low cost` compared to s3 standard

- Sustain 2 concurrent facility failures

- Use cases: `Disaster recovery`, `backups`

#### Amazon S3 one zone-Infrequent Access

- Same as IA, but data is stored in `single AZ`, 99.5% durability

- High durability, `data is lost when AZ is destroyed`

- Low latency and high throughput performance

- Low cost compared to IA

- Use cases: `Storing secondary backup copies` of on-premise data, data that can be recreated

- Minimum storage duration `30 days`

#### Amazon S3 Intelligent Tiering

- Same durability as of standard S3

- Low latency and high throughput performance

- `Monthly monitoring` and `auto-tiering fees`

- Resilient against events that impact an entire AZ

- Minimum storage duration `30 days`

#### Amazon Glacier

- `Low cost` meant for `archiving` and `backup`

- Data retained for `long duration` (10s of years)

- Alternative to `on-premise magnetic tape strorage`

- High durability

- `Cost per GB is very low` `$0.004/GB/Month` + `retrieval cost`

- Each item called as an `Archive` `(upto 40 TB)`

- They are stored in `Valuts`

- Minimum storage duration `90 days`

- There are `3 Retrieval Options`

  - `Expedited` (1 to 5 mins)

  - `Standard` (3 to 5 hours)

  - `Bulk` (5 to 12 hours)

#### Amazon Deep Glacier

- For `long term storage`, `cheaper`

- Minimum storage duration is `180 days`

- There are 2 `Retrieval Options`
  - `Standard` (12 hours)

  - `Bulk` (48 hours)

### S3 Lifecycle Rules - Move between storage classes

- Rules can be created for specific prefix ex: `s3://my-bucket/mp3/*`

- Rules can be created for certain object tags
  ```
  1) Go to bucket, Management

  2) Add a Lifecycle rule

  3) Specify Transition actions and expiration actions
  ```

#### Transition Actions

- Defines when objects are Transitioned to another storage class

- Move objects to Standard IA class 60 days after the creation

- Move to Glacier after 6 months

#### Expiration Actions

- Configure objects to expire after some time

- Access log files can be set to be deleted after 365 days

- Delete older versions of the files (If versioning was enabled)

- Cleanup incomplete multi part uploads

### S3 Event Notifications

- There are 3 types

  - `SNS`: Simple Notifications Service - Send notification in emails

  - `SQS`: Simple Queue Service - To add messages in to the queue

  - `Lambda functions` - To generate some custom code

- To make sure every single event notification is delivered, you need to enable versioning on your bucket.
  ```
  1) Go to bucket, enable versioning and goto Properties -> Events -> Choose SQS -> create one

  2) SQS needs SQS ARN, go to SQS service and create one SQS queue
     Add a permission to allow everyone with send message action
  ```

### Athena

- `Serverless` service to perform `analytics` directly against S3 files

- Uses `SQL` language to query the files

- Has a `ODBC/JDBC` driver

- Charged per query and amount of data scanned

- Supports many file formats `.csv`, `.json`, `.orc`, `.avro`, and `.parquet` (built on Presto)

- Use cases: `Business Intelligence`, `analytics`, `reporting`, analyse and query
  VPC flow logs, `ELB Logs`, `CLoudTrails` etc

- Create athena
  ```
  1) Search for Athena service

  2) Query Editor -> Choose query result location from the settings

  3) Create a new database and follow the AWS documentation
  ```

### S3 Objects Lock and Glacier Vault Lock

- S3 Objects adopts to `WORM` (Write Once Read Many) model, block an object version
  deletion for specified amount of time.

- Glacier Vault adopts to `WORM` (Write Once Read Many) model, Lock the policy
  for future edits (can no longer be changed)

## CloudFront -  CDN - Content Delivery Network

- Content distribution, improves read performance, content is cached at the edge

- Provides `DDoS protection`, integration with `shield`, AWS web application `firewall`

- Can expose external `HTTPS` and can talk to internal HTTPS `backends`

- We can restrict who can access the distribution, `blacklist` or `whitelist` the
  countries so that the content can be given least access

### CloudFront Origins

### S3 Bucket

- For distributing and caching at the edge

- Enhanced security with CloudFront `Origin Access Identity (OAI)`

- CloudFront can be used as an `ingress` (to upload files to S3)

### Custom Origin (HTTP)

- `Application Load Balancer`

- `EC2 Instance`

- `S3 Website`

- Any HTTP Backend you want

- Example
  ```
  1) Create a bucket or use the existing one

  2) Select CloudFront Service,

  3) Create a distribution -> Select Web option, fill the details

  a) Origin Settings:
     Origin Name: bucket name
     Origin Path: <empty>
     ID: <as-is>
     Origin Access Identity: Create new one
     Grant Read Permissions: Yes

  b) Default Cache Behaviour Settings: <as-is>

  4) Create distribution

  5) Go back to bucket and check the Bucket Policy added under Permissions

  6) Grab the link from CloudFront -> Domain Name and access it,
     May take couple of hours to access because of DNS Propogation
     To access the files make the files in S3 public by individually giving
     permission to each file
  ```

### Caching and Caching Invalidations

- Caching can be based on `Headers`, `Session Cookies`, and `Query String Parameters`

- All the caching lives at each CloudFront edge location

- Maximize the cache hit rate to minimize the requests on the origin
  by separating `static` (no `headers/session` caching rules required, S3 buckets can be used) and
  `dynamic` distributions (Cache based on `correct headers` and `cookie`, dynamic content -
  `REST`, `HTTP Server` using `ALB + EC2`)

- Control the `TTL` (0 Seconds to 1 year), can be set by the origin
  using the `Cache-Control Header`, `Expires Header`

- Part of the cache can be invalidated using `CreateInvalidation API`
  ```
  1) Go to CloudFront select the distribution created

  2) Select Invalidations -> Create Invalidation -> Provide Object Path
     as * to invalidate everything, can be configured to match different rule
  ```

### CloudFront Signed URL / Cookies

- Attach a policy with `URL expiration`, `IP ranges to access the data from`, `trusted signers`

- URL can be valid for short time to long period based on the content

- `Signed URL`: access to individual files (one signed URL per file)

- `Signed Cookies`: access to multiple files (one signed cookie for many files)

## AWS ECS, ECR & Fargate - Docker in AWS

- 
