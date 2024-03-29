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

- Use command line with downloaded `.pem` file to access with `ec2-user@public-ip-of-an-ec2-instance`
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

### ECS Clusters

Logical grouping of EC2 instances.
EC2 instances run the ECS agent (Docker container).
The ECS agents registers the instances to the ECS Cluster.
EC2 instances run a special `AMI`, made specifically for ECS
```
1) Search for ECS service

2) Clusters: create a cluster

3) Select EC2 Linux + Networking

a) Instance Configuration:
   Provisioning Model: On-demand instance
   EC2 instance type: t2.micro
   Number of instances: 1
   Key Pair: use the existing one

b) Networking:
   VPC: Choose if already created one or create one
   Subnets: Choose multiple subnets, create if doesn't exist
   Security Group: Create a new SG
   Inbound rules: 0.0.0.0/0

c) Container Instance IAM Role:
   Create a new IAM role

5) Create

6) Go to EC2 console -> Auto Scaling Groups
   It adds an ASG to the created cluster having the instance
   Click on the ASG -> Instances to access the EC2 instance attached to the ASG

7) Creates a Launch configuration as well

8) SSH into EC2 instance and take a look at /etc/ecs/ecs.config

   $ ssh ec2-user@<ip> -i <key>.pem

   $ cat /etc/ecs/ecs.config

   $ docker ps # To check the containers running in the container
```

### ECS Task Definitions

Task definition is a `metadata` in the form of `JSON` to tell ECS how to run a docker container.
It contains, `image name`, `Port binding` for container and host, `memory and cpu` required `environment variables`, `networking information` and etc.
```
1) Select the cluster created

2) Select task definitions -> Create a new task definition -> EC2
   Name it, task role and network mode leave as is

3) Assign Task memory: 300 and CPU: 250

4) Add a container
   Contaier name: httpd
   Image: httpd:2.4
   Memory Limits: 300
   Port Mapping: Host port: 8080; Container port: 80; Protocol: tcp
   Leave the other config options as is, for the simple use

5) Create
```

### ECS Service

Helps define how many tasks should run and how they should be run.
They ensure that the number of tasks desired is running across fleet of EC2 instances.
They can be linked to `ELB/NLB/ALB` if needed
```
1) Select the Cluster created -> Services tab

a) Create a service
   Launch type: EC2
   Cluster: Select the one created above
   Task definition: Created above
   Service Name: http-service
   Service Type: Replica
   Number of tasks: 1
   Minimum healthy percent: 0
   Maximum percent: 200

  i) Deployments
     Deployment type: Rolling update

  ii) Task placement: AZ Balanced Spread

b) Configure Network:
  Load balancing: None
  Disable service discovery integration

c) Don't setup ASG

d) Review and create
```

### Verify that it is running

Select the cluster created, go to `Tasks` tab and click on `Container Instance`
running and grab the public IP and access the `port 8080`

> Make sure security group inbound rule added to port: 8080 to access the port 8080,
add inbound rules for the security group attached to the instance if it has none.

Scale the number of instances running for the cluster,
Select the cluster created go to `ECS instances` tab and select `Scale ECS Instances`
change it to desired number


### ECS Services with load balancers

Application Load Balancers will dynamically do the post forwarding

1. Select `Task Definition` created and select `Create new revision`, name it
and use the same settings and in `Container Definitions` select the container
and remove the Remove the `Port Mapping` for `Host Port` from `8080` and `Create`

2. Update the `Service` with new revision created, select the created `Cluster`, select
the service and `Update` and in the `Task definition` select the `Revision 2` and
`Update` it.

3. Go to `Tasks` tab to verify that 4 tasks are listed and running

Adding load balancers to existing service is not possible it should be done at the
time of creation.

### Create ALB service

1. Go to `Clusters` `Services` tab and `create`

2. Select the `task definition` created already with a verison 2, and name it.
  keep the same same defaults as that of basic service.

3. Under `Load Balancing` section select `ALB`
  `Service IAM Role`:  `create a new role`
  Create a load balancer

4. Create a new `Security Group` for the ALB and assign that security group for
  all inbound traffic

5. `Container to load balance` create one
    Production listener port: `80:http`
    Target Group Name: `create new`
    Path Pattern: `/`, Evaluation Order: `1`
    Health check path: `/`

6. Disable service discovery

7. Next, Create leaving other configs default

8. Once the tasks are running, go to `Load Balancers` created and
  select it copy the `DNS Name` under description and test it

> Delete a service first by updating the service by setting number of tasks to 0
  once done, delete the service

## ECR - Private docker image repository

Access is controlled through `IAM Role`

Logginng into ECR using `AWS CLI v1`
```
$ $(aws ecr get-login --no --include-email --region eu-west-1)
```

Logginng into ECR using `AWS CLI v2`
```
$ aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin
123456789.dkr.ecr.eu-west-1.amazonaws.com
```

Docker `push` and `pull`
```
$ docker push 123456789.dkr.ecr.eu-west-1.amazonaws.com/demo:latest

$ docker pull 123456789.dkr.ecr.eu-west-1.amazonaws.com/demo:latest
```

Create a ECR
```
1. Create a docker image before push it to ECR,
  install docker to your computer and build an docker image

2. Amazon ECS -> Amazon ECR -> Select Repositories
  Create the repository - Name it create the repository

3. Follow the instructions to login and push the image to repository
```

Update the `ECS Task definition` with the image created
```
1. create the revision for task definition attached
  and for in the container section update the image name with URL of the image
  uploaded to ECR

2. Go to ALB service created and update the service with new revison created above
```

## FARGATE

It is `Serverless` and don't need to provision EC2 instances. Create task definitios
AWS will run our container for us, to scale, just increase the task numbers

Create a cluster for Fargate setup and service
```
1. Create a cluster -> Networking only
  Name it -> Create

2. Create a task definition for fargate
  Select Fargate, name it
  Set task memory and task CPU
  Add Container definition - from the image created

3. Create a service under the cluster created
  Launch type: Fargate
  Task Definition: Created above
  Number of Tasks: based on the need

  Configure network:
  Select a VPC
  Subnets
  Create a security group or make use of the existing one

  Container to load balance:
  Add the load balancer with same setup
  If the path pattern / was taken already for the ALB go and delete it from
  Load Balancer -> Listeners -> Edit the rules -> Delete the route mapping for /

  Next -> Create

4. Once successful verify that the tasks are running
```

### Elastic Beanstalk - Deploying applications

It is a Platform as a service (PaaS), is a developer centric view of deploying an
app on AWS. It uses all the components, EC2, ASG, ELB, RDS, etc.,

It's managed service, instance configuration/OS is handled by Beanstalk
Deployment strategy is configurable but is performed by Beanstalk.

It has `3 architecture` models

- Single instance deployment - For development purpose

- LB + ASG - Good for pre-production and production deployments

- ASG only - Great for non-web apps in production (workers etc.,)

It has `3 Components`

- Application

- Application version - Each deployment gets assigned a version

- Environment name - dev, test, prod (name can be configurable)

`Rollback` of a particular version is supported. Full control over the life cycle of environments.

Supports Go Lang, Java, .NET, JS, Python, Ruby, PHP, single container docker and can be configurable.

```
1. Create Application
  Application name
  Platform: Select
  Application code: Sample Application

```

# AWS Serverless 

## Lambda

> TODO: Update the notes
## Dynamo DB

- NoSQL serverless DB
- Fully managed, highly available with replication across 3 AZ
- Scales to massive workload, and distributed DB, scales horizontaly
- Fast and consistent performance (low latency on retrieval)
- Integrated with IAM for security, authorization and adminstration
- Enables event driven programming with `DynamoDB Streams`
- Low cost and has autoscaling capabilities

### Basics 

- Made of tables, each table has a `primary key`(must be decided on creation time)
- Each table can have infinte number of items and each item has attributes
- Maximum size of a row is `4000KB`
- Supports, Scalar types (String, Number, Boolean, Null, Binary), Document types (List and Map)
  and Set types (String Set, Number Set, and Binary Set)

### Primary key

- `Partition key only(HASH)`
  - It should be unique for each item
  - It should be diverse so that data is distributed
  ex: users table with user_id as partition key

- `Partition Key + Sort Key`
  - It should be unique 
  - Data is grouped by partition key
  - sort key is called range key
  ex: user-games table with, user_id for partirion key and game_id for sort key

### Throughputs

- Read Capacity Units (RCU) - read throughput
- Write Capacity Units (WRU) - write throughput
- Throughput can be exceeded temporarily using `burst credit`
- If `burst credit` are empty, throws `ProvisionedThroughputException`
- It's advised to do an `exponential back-off retry`

- `WCU` 
  - 1 WCU = 1 write/second for an item up to `1KB`
  ex: 6 objects/second of 4.5KB each = 6 x 5 = 30 WCU (4.5 rounded to upper KB, i.e., 5)

- `RCU`
  - `Strongly Consistent Read` - Read after a write, get the proper data
  - `Eventually Consistent Read` - Read just after a write, may get unexpected response because of replication

  DynamoDB uses `Eventually Consistent Reads`, but GetItem, Query, and Scan can provide a `ConsistentRead` param set to true

  - 1 RCU = `1 strongly consistent read/second`, or `2 eventually consistent reads/second`, for an item up to `4KB`

### Partitions internal

- Data is divided into partitions
- Partition keys go through a hashing algorithm to know which partition they go to
- Compute the total number of partitions
  - By Capacity: (Total RCU / 3000) + (Total WCU / 1000)
  - By Size: Total size / 10 GB
  - By Partitions: Ceiling(Max(Capacity, Size))
- WCUs And RCUs are spread evenly between partitions

### Throttling

- Exceeding RCUs and WCUs throws, `ProvisionedThroughputExceededException`
  Reasons:
  - Hot keys: one partition key is being read too many times
  - Hot partitions
  - Very large items

- Solution for the above exception is `Exponentional back-off` or distribute the partition key, for an 
RCU issue use, `DynamoDB Accelerator(DAX)`

### Basic APIs

- Writing Data
  - `PutItem` - Write data (create or full replace)
  - `UpdateItem` - Partial updates to attributes

  - Conditional writes, helps with concurrent access to items and there is no performance impact


- Deleting Data
  - `DeleteItem` - Delete an individual item, conditional delete possible
  - `DeleteTable` - Deletes the whole table and its items

- Batching writes
  - `BatchWriteItem` - Upto 25 PutItem or DeleteItem in one call, upto `16MB`of data wriiten and upto `400KB/item`
  - Batching allows to save latency by reducing the number of API calls done against DynamoDB
  - Operations are done in parallel for better performance
  - Use `exponential back-off algorithm` to retry write the fialed items (Upto the user)

- Reading data
  - `GetItem` - Read based on PK, PK = HASH or HASH-RANGE
  - Eventually consistent reads by default
  - Option to choose Strongly consistent reads, takes more RCU and take loger time
  - `ProjectionExpression` can be specified to include only certain attributes

  - `BatchGetItem` - Upto 100 items, upto 16MB of data and are retrieved in parallel to minimize the latency

- Query
  - Returns data based on `PartitionKey` value (must be = operator)
  - `SortKey` value (=, <, >, <= , =>, Between, Begin) - optional
  - `FilterExpression` to further filter (client side filtering)
  - Returns upto `1MB`of data or number of items specified in `Limit`
  - Able to do `pagination` on the result
  - Can query a `table`, a `local secondary index`, or a `global secondary index`

- Scan
  - Scans the entire table and then filter out the data (inefficient)
  - Returns upto `1MB` - use pagination to keep reading
  - Consumes of a lot of RCU
  - Limit the impact using `Limit` or reduce the size of the result and pause
  - For faster performance, use `parallel scans`
    - Multiple instances scan multiple partitions at the same time
    - Increases the throughput and RCU Consumed
  - Use `ProjectionExpression` and `FilterExpression`, no change to RCU

### Indexes

- LSI - `Local Secondary Index`
  - Its an alternate range key for the table, local to the hash key
  - Upto 5 LSI/table
  - the sort key consists of exactly `one scalar attribute`
  - The attribute choosen must be a scalar Number, Binary or String
  - Must be defined at the `table creation time`

- GSI - `Global Secondart Index`
  - Use to speed up queries on non-key attributes
  - GSI = partition key + optional sort key
  - The index is a `new table` and attributes can be projected on it
    - The partition key and sort key of the original table are always protected (KEYS_ONLY)
    - Can specify extra attributes to project (INCLUDE)
    - Can use all the attributes from the main table (ALL)
  - Must define RCU/WCU for the index
  - It's possible to add/modify GSI (not LSI)

### Indexes and Throttling

- `GSI`
  - If the writes are throttled on the GSI, then the main table will be throttled
  - Even if the WCU on the main tables are fine
  - Choose the right partition key for GSI
  - Assign WCU carefully

- `LSI`
  - Uses the same WCU/LCU of the main table
  - No special throttling considerations

### Concurrency

- Conditioal update or delete makes sure an item hasn't changed before altering it, that makes DynamoDB
an `optimistic locking/concurrency` DB.

### DAX - DynamoDB Accelerator

- `Seamless cache` for DynamoDB, no application re-write
- Writes go through DAX to DynamoDB
- There is a micro second latency for cached reads and queries
- Solves the `Hot Key Problem` (too many reads)
- `5 minutes` TTL for cache by default
- Upto 10 nodes in the cluster, must be provisioned in advance
- Multi AZ (3 nodes minimum recommended for production)
- Can be secured (Encryption at rest with KMS, VPC, IAM, CloudTrail etc)
- Improves the performance of the DB

### DAX vs Elastic Cache

- DAX will be ideal for individual objects cache query / scan cache
- Elastic cache to store aggregation results performed on the DB

### Streams

- Changes in DB (create, update, delete) can end up in a DynamoDB stream
- The stream can be `read by AWS Lambda or EC2 instances`, then we can,
  - React to changes in real time (eg: welcome email to new users)
  - Perform some analytics
  - Create derivative tables/views
  - Insert into ElasticSearch
- Can be used to implement the `cross region replication`
- Steams have only `24 hours of data retention`
- Choose the information that will be written to the stream whenever the data in the stream is modified:
  - `KEYS_ONLY` - Only the key attributes of the modified item
  - `NEW_IMAGE` - The entire item, as it appears after it was modified  
  - `OLD_IMAGE` - The entire item, as it appears before it was modified
  - `NEW_AND_OLD_IMAGES` - Both old and new images of the item
- They are made of `Shards`, just like `Kinesis Data Streams`, 
  user don't provision shards, it's automated by AWS
- Records are not retroactively populated in a stream after enabling it, previous records won't
  be populated.

### DynamoDB and Lambda

- Define an `Event Source Mapping` to read from a DynamoDB Streams, Lambda with event souce mapping will poll the DB
Streams and returned batch streams are invoked  by event batch by lambda function.
- Ensure that the Lambda function has appropriate permissions
- Lambda function is invoked `synchronously`

eg: Select the `Table` - `Overview` tab and `Stream details` - `Manage Stream` and select any of the information
once done, go to `Triggers tab` for the table - `Create trigger` - `N`ew function` and create a lambda function
filling the necessary details - Enable the triggerc- Make the chages to the table data and go to lambda function 
created and check the `CloudWatch` logs

### TTL - Time To Live

- Automatically delete an item after an expiry date/time
- TTL is provided at no extra cost, deletion don't use `WCU/RCU`
- Is a background task operated by DynamoDB itself, done in the background periodically
- Helps to reduce the storage and manage the table size over time
- TTL is enabled per item, add TTL column with a date
- DynamoDB deletes expired items within 48 hours of expiration
- Deleted items due to TTL are also deleted from LSI/GSI
- DynamoDB Streams can help recover the expired items if needed

eg: Add an number attribute with any name having `epoc` value using the online EPOC converter to any item
and under the `Overview` tab select `manage TTL` to add the created value as TTL attribute to look for.

### CLI

- `--projection-expression` - attributes to retrive
- `--filter-expression` - to filter the results
- General CLI pagination options including DynamoDB/S3
  - Optimization: `--page-size` - full dataset retrieved but each API call will request less data 
  (helps to avoid timeouts)
  - Pagination: `--max-items` - maximum items returned by CLI, returns `NextToken`, 
  `--starting-token` - specify the last received NextToken to keep on reading

- Examples
```
$ aws dynamodb scan --table-name users --projection-expression "user_id, content" --region us-east-1

$ aws dynamodb scan --table-name users --filter-expression "user_id = :u" --expression-attribute-values 
'{ ":u": {"S": "1234"}}' --region us-east-1

$ aws dynamodb scan --table-name users --region us-east-1 --page-size 1

$ aws dynamodb scan --table-name users --region us-east-1 --max-items 1 -starting-token ryrhd6
```

### Transactions

- Ability to create, delete, or update multiple rows in multiple tables at the same time
- It's an `all or nothing` type of operation
- Write Modes: `Standard` and `Transactional`
- Read Modes: `Eventual Consistency`, `Strong Consistency`, and `Transactional`
- Consumes 2X of WCU/RCU

- Can be used as `Session State Cache`

### Write types 

- `Concurrent Writes`
- `Conditional Writes`
- `Atomic Writes`
- `Batch Writes`

### DynamoDB with S3

- `Large objects pattern` - Upload files larger than 400KB to S3 and update DB with `small metadata` and 
  get the details based on metadata in the table

- `Indexing S3 objects metadata` - Write to S3 should trigger Lambda function to create index in the DB

### Copying a table

- Use `DataPipeline` (Uses EMR) - Data pipeline launches an `EMR cluster`, EMR reads from the DynamoDB and 
writes to S3 bucket and reverses the steps to getback or copy

### Security 

- VPC endpoints available to access DynamoDB without internet
- Access is fully controlled by IAM
- Encryption at rest using KMS
- Encryption at transit using SSL/TLS

- Use `Amazon DMS - Data Migration Service` to migrate to DynamoDB from Mongo, Oracle, MySQL, S3, etc.,
- Local instance of DynamoDB can be launched during development

## API Gateway

- Support for the WebSocket Protocol
- AWS Lambda + API Gateway: No Infra to manage
- Handles API provisioning
- Handles security (Authentication and Authorization)
- Create API keys, handle request throttling
- Swagger / Open API import to define APIs quickly
- Transform and validate requests and responses
- Generate SDK and API specifications
- Cache API responses

### API Gateway Deployments - End-point Types 

- `Edge-Optimized` 
  - Default - For Global clients 
  - Requests are routed through the CF edge locations (Improves latency)
  - API gateway still lives in a one region
- `Regional`
  - For clients within the same region 
  - More control over caching control
- `Private`
 - Can only be accessed from VPC using an interface VPC endpoint (ENI)
 - Use a resource policy to define access

#### Example - Create a simple API Gateway

- Select API Gateway
- Build a REST API
  - Create a new REST API - Name it - Choose End-Point Type (Regional)
- Actions 
  - Create Method - GET 
    - Choose Integration Type (Lambda function)
    - Check Lambda Proxy Integration
    - Choose Lambda Function - Create one before hand - Choose Python or NodeJS
    - Save
- Test 
- Create another resource
  - `/users` - Enable API Gateway CORS 
  - Create a method - GET - Lambda Function
  - Save 
- Deploy the API 
   - Actions - Deploy - Create a new stage - name it (dev)
- Copy the `invoke URL` once deployed


#### Example - API Gateways with stages 

- Update the lambda function and deploy it (updated lambda can be used for test and dev stages)
- Create `lambda aliases` for `dev`, `test`, and `prod`, `prod` alias pointing to the older version and
   `dev` and `test` aliases pointing to the latest version.
  - Select the lambda function - Actions -> Create Alias -> Create a alias and select specific version to each alias.
- Create a resource `/stagevars` under the existing API Gateway
  - Add a `GET` method
  - Lambda Function - having the name of the lambda followed by, `:${stageVariables.lambdaAlias}`
    > NOTE: We need to set the `lambdaAlias` when creating stages for `dev`, `test`, and `prod`
  - Save 
  - Lambda function created as `stage variables`, need appropriate `Function policy` on all the functions.
    `Run the command` shown in the modal (popup) in the `AWS-CLI` - which will add the resouce based policies
    to each lambda function referenced by API Gateway stages.
  - Make sure to replace the `${stageVariables.lambdaAlias}` with the appropriate alias in the command line, pass `--region eu-west-2`
- Save - Test it - Pass `lambdaAlias Stage Variable` with a value, for eg., `dev`
- Action - Deploy the API changes to the existing deployment stage, `dev` - Set the Stage Variable `lambdaAlias` to `dev` under 
  `Stage Variables` tab under `Stages -> dev`
- Repeat the same step for `prod`
- Copy the invoke URL and test it.

### Canary Deployments

- Enable Canary Deployments for any stage (usually prod)
- Choose the % of traffic the canary channel recieves
- This is blue/green deployment with AWS lambda and API gateway

#### Example 

- Make sure to update the lambda function to point to `Lambda function version-1`(update under, Integration Request), for eg., `Lambda Function: lambda-function-name:1`
- Deploy the API to prod stage 
  - Actions - Deploy API - Prod stage - Deploy
- Open the `Stages -> Prod Stage -> Canary Tab` 
  - Update the `Percentage of requests directed to Canary` to `50%`(typically 5% for Prod) under `Stage's Request Distribution` section
- Go back to the resources, for `/` resource, update the `Integration Request` to point to `Lambda function version-2`
- Deploy the API to prod stage 
  - Actions - Deploy API - Select the stage - Prod (Canary Enabled) - Deploy
- Test it using `Invoke URL` whether the canary deployment is working or not. Check the logs before promoting to next version.
- `Promote Canary` once tested, so that the `lambda-function-version-2` is used for the next deployment.


### Integration Types 

- `Mock` 
  - API Gateway returns a response without sending the request to the backend
- `HTTP/AWS(Lambda & AWS Services)`  
  - Setup data mapping using `mapping templates` for request and response
- `AWS_PROXY (Lambda Proxy)`
  - Incoming request from the client is input to the Lambda
  - Lambda function is responsible for the logic of request/response
  - No mapping templates, headers, query string params, are passed as arguments
- `HTTP_PROXY`
  - No mapping templates 
  - The HTTP request is passed to the backend 
  - The HTTP response from the backend is forwarded by the API Gateway

### Mapping Templated (AWS and HTTP Integration)

- Mapping templated can be used to modify request/responses
- Rename/modify query string parameters
- Modify the body content, add headers 
- Uses `Velocity Template Language(VTL)`: `for` loop, `if` etc
- Filter the output results (remove unnecessary data)


#### Example 

- Create a Lambda function, returning basic JSON response.
- Create a resource `mapping` 
 - Create a GET method 
 - Assign the Lambda function created
 - Uncheck, `Use Lambda Proxy Integration` option 
 - Save
- Update the `Integration Response` under `GET` method 
  - Expand, `Mapping Templates` section 
  - Click on `application/json`
  - Generate template -> `Empty` - Update the VTL template as 
    ```js
    #set($inputRoot = $input.path('$'))
    {
      "renamedExample": $inputRoot.example,
      "anotherKey": "anotherValue"
    }
    ```
  - Save
  - Test the API and it returns the JSON modifed in the mapped template

### Swagger / Open API

- Import the existing API definition from Swagger / Open API
- Export the existing API as swagger / open API
- Can be done while creating an API

### Caching Responses

- Caching reduces the number of calls made to the backend.
- Default `TTL is 300 seconds` (min: 0s, max: 3600s)
- Caches are defined per stage
- Possible to override cache settings per method
- Cache encryption is supported
- Cache size between `0.5GB to 237GB`
- Is expensive, makes sense only in Production

#### API Cache Invalidation

- Able to flush the entire cache from the UI
- Clients can invalidate the cache with header, `Cache-Control: max-age=0`(with proper IAM authorization)
  - IAM Policy that allows to client to invalidate the cache on a specific resource 
  ```json
  {
    "Version": "2012-10-17",
    "Statement" : {
      "Effect": "Allow",
      "Action": [
        "execute-api:InvalidateCache"
      ],
      "Resource": [
        "arn:aws:execute-api:eu-west-2:123456789012:api-id/stage-name/GET/resource-path-specifier"
      ]
    }
  }
  ```
- If we don't impose an invalidation cache policy then any client can invalidate the API cache (not recommended)

- Can be enables under each stage or under each method
  - Under `Settings` -> `Enable API Cache` -> Set `Cache capacity` and `Cache TTL` and check `Require authorization` - Save changes

### Usage Plans and API Keys 

- Enable an API available as an offering to customers
- Who, how much, and how fast they can access them
- Use API keys to identify API clients and meter access
- Configure `throttling limits` and  `quota limits` that are enforced on individual clients

### Correct order for API keys

- Create one or more APIs, configure the methods to require API key, and deploy the APIs to stages
- Generate or import keys to distribute to application devs who will be using the APIs
- Create a usage plan with the desired quota limits and throttling limits.
- Associate API stages and API keys with the usage plan

> Callers of the API must supply an assigned API key in the `X-API-KEY` header in requests to the API

#### Example 

- Create a resouce and a GET method, can be applied to any resource
  - Click on `Method Request` -> Settings -> set `API key required` to `true`
- Define a usage plan
  - API Gateway -> Usage plans
  - Create a usage plan with `Throttling limits` and `Quota limits`
  - Add a usage plan to the API stage
  - Create and add API key to the usage plan
  - Once key created, can be seen under `Usage plans` -> `API keys`
  - We can also configure the method throttling too
- Deploy the API

### API Gateway throttling 

- API gateway throttles requests at 10000 requests per second across all APIs
- Soft limit can be increased upon the request
- In case of throttling error, `429 error code` - too many requests is thrown
- Set the stage limit and method limits to increase the performance

### API Gateway CORS 

- The `OPTIONS` preflight request must contain the following headers,
  - `Access-Control-Allow-Headers`
  - `Access-Control-Allow-Methods`
  - `Access-Control-Allow-Origin`

- If the method we are accessing is a `Lambda Proxy` we need to send this header in the respose
  `Access-Control-Allow-Origin: '*'`

- Enabling the CORS for any resouce that is not using the `Lamda Proxy` integration work without any issues

### API Gateway Security

- IAM Permissions
  - Create an IAM policy authorization and attach it to User/Role
  - `Authentication` - `IAM` and `Authorization` - `IAM policy`
  - Leverages `signature v4`

- Congnito User Pools 
  - Cognito fully manages user lifecycle, token expires automatically
  - API gateway verifies idenitity automatically from Congnito
  - `Authentication` - `Cognito User pools` and `Authorization` - `API Gateway methods`

- Lambda Authorizer 
  - Token based authorizer (bearer token) - eg., JWT or OAuth
  - A request can be parameter based 
  - Lamda will return an IAM policy for the user, result policy is cached
  - `Authentication` - `External` and `Authorization` - `Lambda function` 

- Example 
  - Select the Request Method option on the method and select the Authorization type as `IAM policy`
  it can be used with `Resouce Policy` option on the API - select and update the examples provided
  - API Gateway -> Authorizers -> Select Lambda or Cognito based on the authorization type 

- API Gateway can be used to create Websocket APIs

## Links, issues and fixes 

- Install `aws-cli` using `Homebrew`

- [Install `aws-sam` on Apple M1](https://arkeetect.medium.com/aws-installing-aws-sam-clion-macos-m1-f2e7995a61de)

```
$ xcode-select --install

$ brew install aws-sam-cli
```