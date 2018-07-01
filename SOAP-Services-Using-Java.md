# SOAP Web services: Simple Object Access Protocol

-	WSDL: Web service description/definition language
- UUDI: Universal Description Discovery and Integration - registry where new web services are registered
-	SEI: Service endpoint interface - data from XML is mapped to actual objects

-	If javaEE installed we can import WSDL in command line using, "wsimport" keyword
$wsimport <WSDL-URI> // which will keep only .class files in the generated folder, if you want both .java and .class use the option,
$wsimport -keep -s src <URI> ; where src is the folder name// sample URI: http://www.webservicex.net/geoipservice.asmx?WSDL

- Download and run the glashFish server to deply the services

-	Once downloaded extract and go to /bin and run, C:/bin>asadmin start-domain ; then access it using localhost:4848 port by default and		configure the same in eclipse; then create dynmic web project to get started

-	Annonate a class with @WebService and can be deployed as web service. Any public method in that class will be treated as Webmethod or can be 	 annotated with @WebMethod, use, exclude=true option to exclude the particular method from the webservice.

-	By default types of data used in the web service is imported from external link to WSDL under <types> tag, which can be avoided using the following annotation on class level, @SOAPBinding(style = Style.RPC), which will add <message> tag for both input and output response. By default style is Document.

- @WebResult(partName = "lookupOutput") specified on method -> to change <part> tag name for response, and @WebParam(partName = "lookupInput") specified before a parameters -> to change <part> tag name for request

-	Interface (Serivie end point interface) can be created and interface can have all the annotations needed to perform the webservice, once SEI is implemented add this @WebService(endpointInterface="fully qualified class name(package name ans interface class name)") to implemented class

-	JAXB - Java Architecture for XML Binding - used to map custom objects like Collections to XML
if any class specified with @XmlRootElement annotation it needs no arg public constructor, JAXB uses it to initialize the object
