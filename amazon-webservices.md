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

- On Demand Instances: short workload, predictable pricing

- Reserved Instances: long workloads (>= 1 Year)

- Convertible Reserved Instances: long workloads with flexible instances

- Scheduled Reserved Instances: launch within time window you reserve (scheduled tasks)

- Spot Instances: short workload, cheap, can loose instances

- Dedicated Instances: No one can will share your hardware

- Dedicated Hosts: Book an entire physical server, control instance placement

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

- Has 3 kinds of load balancers
  - Classic load balancer (v1 - old generation) - 2009 - Deprecated
  - Application load balancer (v2 - new generation) - 2016
  - Network load balancer (v2 - new generation) - 2017

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
  - Stickiness can be enabled at the target group level
    - Same request goes to the same instance
    - It is directly generated by ALS
  - Application servers don't see the IP of the client directly
    - The true IP of the client is inserted in the header `X-Forwaded-For`
    - we can also get `Port` (X-Forwarded-Port) and `Proto` (X-Forwaded-Proto)

- `Network Load Balancers` (Layer 4) (v2)
  - Forward `TCP` traffic to instances
  - Handle millions of request per seconds
  - Support for static IP or Elastic IP
  - Less latency ~100ms (vs ~400ms for ALB)
  - Mostly used for extreme performance and should not be the default load balancer to choose
  - Directly see the client IP

- `Load Balancing -> Load Balancers` -> Select `Application Load Balancer` -> `Create`
  - `Configure Load Balancer` -> `Name: web-app-alb, Scheme: internet-facing, IP address type: IPv4`,
    `Listeners: Load Balance protocol: HTTP, port: 80`, `Availability Zones: select all available`

  - `Configure Security Groups` -> Create a new security group -> Fill `name` and `description` ->
    `Type: Custom TCP, Protocol: TCP, Port: 80, Source: Custom, 0.0.0.0/0, ::/0`

  - `Configure Routing` -> Create new target group -> Name it -> `Target Group: Protocol: HTTP, Port: 80, Target Type: instance`
    `Health Check: Protocol: HTTP, Path: /`

  - `Register Target` -> Select the targeted instance from the list

  - `Review` -> `Create`

  -  Once load balancer is provisioned, grab link from `DNS Name` from `Description` and access the link

- We can only allow the http request on Port 80 for our app security group to use, Load balancer
  `Security Groups` -> Select the Security group attached to the instance and edit the inbound rules
  `HTTP -> Source: Custom to use Load balancers Security Group` -> `type sg-` to auto complete, instead of `0.0.0.0/0`
  It allows inbound connections only from Load balancer
  If you try to access the public IP to access the apache server, it never loads, it always loads only from
  `DNS Name` link under Load Balancer


#### ASG - Auto Scaling Group
