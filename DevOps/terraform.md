## Automated Cloud Deployments using Terraform

- Download and install the terraform based on OS you have

- Install a `terraform plugin` from `HashiCorp` to `VS code` for syntax highlighting
  and `intellisense`

- Create a project with a `main.tf` - could be any name but make sure it has `.tf` extension

## Create A Resource: An AWS EC2 instance

- Refer documentation for other cloud providers, this example shows for `aws`
  ```py
  # main.tf

  provider "aws" {
    region     = "us-east-1" # Update based on your aws zone
    access_key = "" # Create one from the AWS console, don't specify it directly
    secret_ley = ""
  }

  # Create a resource in aws using terraform instead of creating one from AWS console
  resource "aws_instance" "my-first-server" {
    ami           = "ami-111" # Get it from AWS while creating an EC2 instance
    instance_type = "t2.micro"
  }
  ```

- Once done `initialize` the terraform and run the `plan` as a dry run before actually deploying it
  ```
  $ terraform init # Downloads the neccesary packages

  $ terraform plan # executes the plan mentioned in the main.tf as a dry run
  ```

- Once `terraform plan` successful, run `apply` to run the code
  ```
  $ terraform apply # supply --auto-approve option to avoid typing yes each time running the command
  ```

- Once the command successful head back to AWS to cross check whether it has created the instance or not

- Run `plan` again to see more info about the instance.

## Modify A Resource

- Running `apply` again will not create the new resource in aws, it just refreshes the state

- Make changes adding a tag to resource and run `terraform apply`, once done go to `aws console` and verify it

## Delete A Resource

- Run the following command to destroy the resource
  ```
  $ terraform destroy # it destroys the all resources listed in the main.tf
  ```

- Comment out the resource to be destroyed and run `apply` again to delete only specific
  resource, this is not the good way to do, we need to pass params to delete and can be controlled

## Reference Resource

- Use AWS vpc to create one
  ```py
  # main.tf

  resource "aws_vpc" "first-vpc" {
    cidr_block = "10.0.0.0/16"

    tags {
      Name = "first-vpc"
    }
  }

  # Create a subent to attach to vpc
  resource "aws_subnet" "subnet_1" {
    vpc_id     = aws_vpc.first_vpc.id
    cidr_block = "10.0.1.0/24"

    tags {
      Name = "first_subnet"
    }
  }
  ```

- Run `apply --auto-approve` to create a `subnet` and `vpc`

# Sample Project

- Create a `new key-pair` under AWS EC2 app, with `pem` option selected

- Deploy and a web server
  ```py
  # main.tf

  # 1. Create a VPC
  resource "aws_vpc" "prod_vpc" {
    cidr_block = "10.0.0.0/16"

    tags {
      Name = "production_vpc"
    }
  }

  # 2. Create a Internet Gateway
  resource "aws_internet_gateway" "prod_gateway" {
    vpc_id = aws_vpc.prod_vpc.id

    tags {
      Name = "prod_internet_gateway"
    }
  }

  # 3. Create a Custom Route Table
  resource "aws_route_table" "prod_route_table" {
    vpc_id = aws_vpc.prod_vpc.id

    route {
      cidr_block = "0.0.0.0/0" # All IPV4 traffic is sent with this route
      gateway_id = aws_internet_gateway.prod_gateway.id
    }

    route {
      ipv6_cidr_block        = "::/0"
      gateway_id = aws_internet_gateway.prod_gateway.id
    }

    tags {
      Name = "prod_custom_table"
    }
  }

  # 4. Create a subnet
  resource "aws_subnet" "prod_subnet_1" {
    vpc_id     = aws_vpc.prod_vpc.id
    cidr_block = "10.0.1.0/24"
    availability_zone = "us-east-1a"
    # Pass availability zone prop

    tags {
      Name = "production_subnet"
    }
  }

  # 5. Associate subnet with route table
  resource "route_table_association" "prod_route_table_assoc" {
    subnet_id      = aws_subnet.prod_subnet_1.id
     route_table_id = aws_route_table.prod_route_table.id
  }

  # 6. Create a Security Group to allow port 22, 80, 443
  resource "aws_security_group" "prod_allow_web" {
    name        = "allow_web"
    description = "Allow web inbound traffic"
    vpc_id      = aws_vpc.prod_vpc.id

    ingress {
      description = "HTTPS Traffic from VPC"
      from_port   = 443
      to_port     = 443
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
      description = "HTTP Traffic from VPC"
      from_port   = 80
      to_port     = 80
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }

    ingress {
      description = "SSH Traffic from VPC"
      from_port   = 22
      to_port     = 22
      protocol    = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }

    egress {
      from_port   = 0
      to_port     = 0
      protocol    = "-1" # Allows any protocol
      cidr_blocks = ["0.0.0.0/0"]
    }

    tags = {
      Name = "prod_allow_web"
    }
  }

  # 7. Create a network interface with an ip in the subnet that was created in step-4
  resource "aws_network_interface" "prod_network_interface" {
    subnet_id       = aws_subnet.prod_subnet_1.id
    private_ips     = ["10.0.1.50"] # Based on subnet address
    security_groups = [aws_security_group.prod_allow_web.id]
  }

  # 8. Assign an Elastic IP to the network interface created in step-7
  # Though the terraform can figure out which resource to execute first,
  # In this case we need to manually specify it
  # It requires internet gateway to be deployed first before elastic ip,
  # use depends_on property to specify it
  resource "aws_eip" "prod_eip" {
    vpc                       = true
    network_interface         = aws_network_interface.prod_network_interface.id
    associate_with_private_ip = "10.0.1.50"
    depends_on                = [aws_internet_gateway.prod_internet_gateway]
  }

  # 9. Create a ubuntu server and install and enable apache2
  resource "aws_instance" "web_server_instance" {
    ami               = "ami-111..." # Get it from AWS while creating an EC2 instance
    instance_type     = "t2.micro"
    availability_zone = "us-east-1a"
    key_name          = "main-key" # Key file name downloaded from EC-2 key-pair

    network_interface {
      device_index         = 0
      network_interface_id = aws_network_interface.prod_network_interface.id
    }

    # To run commands on instance
    user_data = <<-EOF
      #!/bin/bash
      sudo apt update -y
      sudo apt install apache2 -y
      sudo systemctl start apache2
      sudo bash -c 'echo first web server > /var/www/html/index.html'
      EOF

    tags {
      Name = "prod_web_server"
    }
  }
  ```

- Apply once done `apply --auto-approve`, before applying make sure you did the dry run with
  `plan --auto-approve`

## SSH into the EC instance in Windows using Putty

- Convert the `.pem` file downloaded to `.ppk` using `PuTTYGen`
  - Load the file from the downloaded location and select `Save Private Key`

  - Save the file with a name

- Open the `PuTTY` and specify the `ip address` as `ubuntu@1.2.1.1` (Refer AWS EC2) of the ec instance from AWS console
  use port number `22` as default port

  - Expand `Connection -> SSH -> Auth` and load the `.ppk` file created with `PuTTYGen`

- Open and you are good to access the ec-2 instance

- Check for the status of the apache2 running inside the instance
  ```
  $ systemctl status apache2
  ```

## Terraform Commands

```
$ terraform state list # Lists all the resource created

$ terraform state show <resource_name> # To know more about a resource created
```

## Terraform Output

- Place `output` step anywhere in the `main.tf` file to log the details we want.
  ```py
  output "server_public_ip" {
    value = aws_eip.prod_eip.public_ip # outputs the result once apply command is successful
  }
  ```

- Use `terraform refresh` without deploying again and again with `apply` each time you want
  to check the output or add any thing new which is not impacting the prod env

- `terraform output` command will print all the output result in the console

## Target Resources

- Destroy the specfic resource by specifying `-target` option to `destroy` command,
  so that we don't need to destroy every resource defined
  ```
  $ terraform destroy -target aws_instance.web_server_instance # Destroys only the EC2 insatnce
  ```

- Use the `-target` for `apply` command to target single resource to deploy
  ```
  $ terraform apply -target aws_instance.web_server_instance # Applies only the EC2 insatnce
  ```

## Terraform Variables

- Define a `variable` as follows
  ```py
  variable "subnet_prefix" {
    description = "cidr block for the subnet"
    # default     = "10.0.1.0/24" # If user didn't specify any var, it considers this value
    type        = string
  }

  # Access the vaariable with var as follows
  resource "aws_subnet" "prod_subnet_1" {
    vpc_id     = aws_vpc.prod_vpc.id
    cidr_block =  var.subnet_prefix # "10.0.1.0/24"
    availability_zone = "us-east-1a"

    tags {
      Name = "production_subnet"
    }
  }
  ```

- `apply` command prompts for the missing value in the `subnet_prefix` variable
  specify `10.0.1.0/24` which is passed to the subnet's `cidr_block`.

- It can be passed in as `commandline arguments` instead of passing on each prompt for all the variables
  declared in the file
  ```
  $ terraform apply -var "subnet_prefix = 10.0.1.0/24"
  ```

- Best way to pass variables is `creating a separate file` named `terraform.tfvars` for assigning variables, terraform looks for
 that file
  ```py
  # terraform.tfvars
  subnet_prefix = "10.0.1.0/24"

  # Can be accessed as, var.subnet_prefixes[0] and [1]
  subnet_prefixes = ["10.0.1.0/24", "10.0.1.0/25"]

  # Can be accessed as,  var.subnet_prefixes[0].cidr_block
  subnet_prefix_obj = [{cidr_block = "10.0.1.0/24", name = 'prod-subnet-1'}]
  ```

- If we happen to rename the `.tfvars` file to different name for eg: `example.tfvars`, we need
  to pass `-var-file` option to apply
  ```
  $ terraform apply -var-file example.tfvars
  ```
