## Relational DBMS

- Relational DB term was defined by `Edgar Codd` at `IBM Almaden Researc Centre` in `1970`

- DBMS ex: `Amazon DynamoDB`, `Amazon RDS`, `Oracle DB` etc

### Types of DB

- Centralized - Data stored in a single pace

- Distributed - Data stored in multiple places geographically, 
  - Homegeneous - Have the same underlying hardware, OS and application procedures 
  - Heterogeneous - Hardware, OS, and application procedures can be diffrent

- Personal - Stored in personal computers 

- End user - Shared DB and for a single app

- Commercial - Paid and huge DB, subject specific, maintenance is huge and hard

- NoSQL - unstrucutred data, large sets of distrubuted data, schema agnostic

- Operational - Information related to operation of an enterprise, ex: `marketing`, `employee relations`, `customer service` etc.,

- Relational - Categorized by set of tables with relations, data is stored in rows and columns and easy to extend, join and modify the applications.

- Cloud - Data stored in a cloud (private, public, or hybrid), is shared DB, pay for `usage on user basis`, `scalable on demand` with `high availability`. Helps to support businesses as `SaaS` (Software-as-a-Service)

- Object Oriented - Collection of OO programming and relational DB

- Graph - Collection of nodes and edges, `node` represents `entity` and `edge` represents `relationship between entities`. Type of NoSQL uses graph theory to store, map and query the relationships. Used to analyze connections

## Relational DB 

- `Schema` allows to data to be displayed as tables with rows and columns.

- Allows to read, create, update, and delete data by means of `SQL` statements

- Tables `associated with keys` used to identify specific rows and columns of a table.

- It uses number of `constraints` to ensure that the data constraiend in the table is reliable and accurate.

ex: `Oracle`, `MySQL`, `MS SQL Server`, `PostgreSQL`, `DB2`

### Advantages

- Well documented and mature technologies
- SQL standards are well defined
- Satisfies `ACID` requirements
    - `Atomicity` - Ensures success or failure of any data operation
    - `Consistency` - Preserve the consistency of the value of any data operation, before and after the data operation (bank balance after and before transaction)
    - `Isolation` - Isolates the data in a DB being accessed `concurrent users` at the same time
    - `Durable` - Ensures data operations committed remain `permanent`


## NoSQL DB

### Types

- Key value stores - `Redis` and `Amazon Dynamo DB`, well suited for `embedded DBs` where data is not complex and speed is a priority, designed for scalling well enough to manage patabytes of data across many servers and in distributed system

- Wide column stores - `Scylla` and `Cassandra` use an SQL variant called `Contextual Query Language`(CQL)

- Document stores - `MongoDB`, `Couch Base` (document and key value), no uniform structure, data can have nested different types of data, well suited to manage semi-structured data

### Advantages 

- Not required to maintain structured format and enables productivity
- Highly scalable
- Better option to manage and handle large sets
- Data cab be accessed quikly using key-value

## Cloud DB 

- Stored in cloud and used to offer solutions such as, `SaaS`, `PaaS`, and `IaaS`

- Can be public, private or hybrid cloud

ex: `AWS`, `Microsift Azure`, `Google Cloud` and etc,. SAP's SAP-HANA, in includes Sybase tool

### Advantages 

- Eliminates physical infrastructure - the cloud provider is responsible for data and infra
- Saves money by reducing dedicated staff to maintain, `electricity`, and `lower operating costs`
- `Instantaneous scalability`, `performance gurantees`, `failover support`, `declining prices` and `specialized expertise`

## Graph DB

- Used to store vast amout of data as graph like strucuture, used in app such as social 

- Show the data points between connections

- Used to analyze the data such as pattern of online buying

Applicatios of graphDB, machine learning, fraud detection, regulatory compliance, and identitu and access management

ex: `Neo4j`, `Dgraph` are most widely used ones

