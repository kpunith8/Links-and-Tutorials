## Windows CLI tricks:

- Change the color of CLI

	`$color <code>` - to see the available colors type `$help color`

- Hide the folder completely

	`$Attrib +h +s +r <folder_name>` 
	
- Un hide the folder using, 
	
	`$Attrib -h -s -r <folder_name>`
	
- Create the wifi hot spot

	`$netsh wlan set hostednetwork mode-allow ssid=<SSID> key=password`
	
	start it using,
	`$netsh wlan start hostednetwork` and stop by using `stop` command
	
- Copy the text in command line to clip board,

	pipe the result of the command line to clip command, for ex:
	
	`$ipconfig | clip`

- Get the list of softwares installed

	`$wmic product get name`
	
- Un-install the software

	`$wmic product where "name like ITumes" call uninstall /nointeractive`
	
- List the commands used in the session hit `F7`

## Batch Files:

- `@ECHO off` - will not show the user directory info in the CL
- `PAUSE` - Will pause for user input
- `START` - starts the program specified, for ex: START https://www.google.command

## Window tips
- Use `steps recorder` to record the action you perform on any tool - save it in html format to share with some one
- Use Quick assist app to share and control someones desktop

##
