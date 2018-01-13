HTML, CSS, JQUERY -> freecodecamp.com

->	If an element has multiple classes, one class declared second the style sheet take precedence over first, for ex:
	<div class="a b"> </div>
	<style>
	.a {
		color: blue;
	}
	.b {
		color: green;
	}
	</style>
	-- Here class .b overrides class .a since it is placed next to a. Irrespective of the class order

->	If an element has an id as its attribute id in the style sheet takes precedence over class.

-> 	inline style in HTML Overrides all the CSS declarations in style element.

->	!important keyword will override all CSS declaration, it makes to consider only the .pink-text class all others are ignored

	.pink-text {
  color: pink !important;
}

------------
* Bootstrap:
------------

->	Bootstrap grid system - Grid of 12 columns

	<!-- A row containg two elements in a row with 8 and 4 columns respectivey -->

	<div class="row">
		<div class="col-xs-8"> <button> or any elementr </div>
		<div class="col-xs-4"> any html element </div>
	</div>

	col-md-* for medium resolution devices ex: Laptop, col-xs-* for small resolution devices ex: Mobiles, col-sm-* for small devices,
	and col-lg-* for high resolution screen devices.

->	'Font Awesome' is a convenient library of icons. These icons are vector graphics, stored in the '.svg' file format. These icons are treated
	just like fonts. You can specify their size using pixels, and they will assume the font size of their parent HTML elements.

	You can add Font Awesome to any app just by including it by adding the following code to the top of your HTML

	<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"/>

	Usage: <button class="btn btn-block btn-primary"><i class="fa fa-thumbs-up"></i> Like</button>

->	<div class="well"> gives visual effect to the class="row" element in a grid

----------
* jQuery:
----------

->	in jQuery, there are three ways of targeting elements: by type: $("button"), by class: $(".btn"), and by id $("#target1").

->	Add Class to an html element in JQuery as follows, $("button").addClass("btn-primary"); and can remove the class by $("button").
	removeClass("btn-primary");

->	Adding css to html elements using jQuery -- $("#target1").css("color", "blue"); -> css("attribute","value")

->	jQuery has a function called '.prop()' that allows you to adjust the properties of elements. ex: disable all buttons:

		ex: $("button").prop("disabled", true);

->	jQuery has a function called '.html()' that lets you add HTML tags and text within an element. Any content previously within the
	element will be completely replaced with the content you provide using this function.

		ex: $("h3").html("<em>jQuery Playground</em>");

	jQuery also has a similar function called '.text()' that only alters text without adding tags. In other words, this function will not
	evaluate any HTML tags passed to it, but will instead treat it as text you want to replace with.

	jQuery has a function called '.remove()' that will remove an HTML element entirely.

	jQuery has a function called 'appendTo()' that allows you to select HTML elements and append them to another element.

		ex: $("#target4").appendTo("#left-well");

	jQuery has a function called 'clone()' that makes a copy of an element.

		ex: $("#target2").clone().appendTo("#right-well");

		"Sticking multiple jQuery function as called as 'Function chaining'".

	jQuery has a function called 'parent()' that allows you to access the parent of whichever element you have selected.

		ex: $("#target1").parent().css("background-color", "red"); -- Changes the background-color of #target1's parent to red.

	jQuery has a function called 'children()' that allows you to access the children of whichever element you have selected.

		ex: $("#right-well").children().css("color", "orange"); -- Chages the color of #right-well's children to orange.

	jQuery uses CSS Selectors to target elements. target:nth-child(n) css selector allows you to select all the nth elements
	with the target class or element type.

		ex: $(".target:nth-child(3)").addClass("animated bounce");

	jQquery helps target even and odd numberd elements with :odd and :even selectors

		ex: $(".target:odd").addClass("animated shake");
	Note that jQuery is zero-indexed, meaning that, counter-intuitively, ':odd' selects the second element, fourth element, and so on


	-> target="_blank" -> opens the link specified in <a href="http://www.abc.com" target="_blank"> Link Description </a> tag in another tab.

-------------
* Javascript:
-------------

->	JavaScript provides seven different data types which are undefined, null, Boolean, string, symbol, number, and object.

->	In JavaScript all variables and function names are case sensitive. This means that capitalization matters.

->	Multi-dimensional array
	ex: var arr = [
		[1,2,3],
		[4,5,6],
		[7,8,9],
		[[10,11,12], 13, 14]
		];
		arr[0]; // equals [1,2,3]
		arr[1][2]; // equals 6
		arr[3][0][1]; // equals 11

	--	An easy way to append data to the end of an array is via the 'push()' function.

	--	'pop()' is used to "pop" a value off of the end of an array. We can store this "popped off" value by assigning it to a variable

	--	Use the '.shift()' function to remove the first item from an array.

	--	'.unshift()' works exactly like '.push()', but instead of adding the element at the end of the array, unshift() adds the element at the 	beginning of the array.

	--	var testObj = {
	  		"hat": "ballcap",
	  		"shirt": "jersey",
	  		"shoes": "cleats"
		};

		Creating objects: testObj.hat; // has is the property
		or testObj["hat"];

	--	Adding new property to Object ex: testObj as follows, testObj.trouser = "Slim";

	--	Changing the property of the object ex: testObj.hat = "New Ball Cap";

	--	Delete properties from objects like this:
			ex: delete objName.propertyName;

	--	Check if the property of a given object exists or not. We can use the '.hasOwnProperty(propname)' method of objects to determine if that 	 object has the given property name. .hasOwnProperty() returns true or false if the property is found or not.
		ex: myObj.hasOwnProperty(propName);

	--	Nested JSON Objects
		var ourStorage = {
			"desk": {
			"drawer": "stapler"
			},
			"cabinet": {
			"top drawer": {
			"folder1": "a file",
			"folder2": "secrets"
			},
			"bottom drawer": "soda"
			}
		}

		Accessing nested JSON object,

			ourStorage.cabinet["top drawer"].folder2; // "secrets"
			ourStorage.desk.drawer; // "stapler"

	-- 	Regular expressions are used to find certain words or patterns inside of strings.
		ex: testString.match(expression);

		For example, if we wanted to find the word the in the string 'The dog chased the cat', we could use the following regular expression: '/the/gi'

		Let's break this down a bit:

			'/' is the start of the regular expression.

			'the' is the pattern we want to match.

			'/' is the end of the regular expression.

			'g' means global, which causes the pattern to return all matches in the string, not just the first one.

			'i' means that we want to ignore the case (uppercase or lowercase) when searching for the pattern.

	--	We can use special selectors in Regular Expressions to select a particular type of value.

		One such selector is the 'digit selector \d' which is used to 'retrieve one digit' (e.g. numbers 0 to 9) in a string.

		In JavaScript, it is used like this: '/\d/g'.

		Appending a plus sign (+) after the selector, e.g. '/\d+/g', allows this regular expression to 'match one or more digits'.

		The trailing 'g' is short for 'global', which allows this regular expression to find all matches rather than stop at the first match.

	--	We can also use regular expression selectors like '\s' to find 'whitespace' in a string.

	--	'Invert' any match by using the 'uppercase version' of the regular expression selector. for ex: 'S' - Match anything that is not white 		space

	--	Constructors in JavaScript, 'this' variable refers to the new object being created by the consturctor.
			ex: var car = function() {
				this.wheels = 2;
				this.engines = 1;
				this.seats = 2;
			}

	--	The 'map' method will iterate through every element of the array, creating a new array with values that have been modified by the   		callback function, and return it. Note that it does not modify the original array.

		Usage:  var oldArray = [1,2,3,4,5];

				var newArray = oldArray.map(function(val) { // adds 3 to each element of the array
					return val + 3;
				});

	--	The array method 'reduce' is used to 'iterate through an array and condense it into one value'.
		To use 'reduce' you pass in a callback whose arguments are an accumulator (in this case, previousVal) and the current value (currentVal).
		'reduce' has an 'optional second argument' which can be used to set the initial value of the accumulator. If no initial value is specified it will be the first array element and currentVal will start with the second array element.

		Usage:	var singleVal = array.reduce(function(previousVal, currentVal) {
  					return previousVal - currentVal;
				}, 0);

	--	The 'filter' method is used to iterate through an array and filter out elements where a given condition is not true.
		'filter' is passed a callback function which takes the current value (we've called that val) as an argument.

		An example of using filter to remove array elements that are equal to five:

		Usage:	array = array.filter(function(val) {
  					return val !== 5;
				});

	--	Use the method 'sort' to easily sort the values in an array 'alphabetically' or 'numerically'.

		Usage: sort method and a callback methood to sort the elemets in ascending order

				var newArray = oldArray.sort(function(a,b){
					return a - b;
				});

	--	Use the method 'reverse' to reverse an array.

	--	'concat' can be used to merge the contents of two arrays into one.

	--	Use the 'split' method to split a 'string into an array'.

		Splitting an string with space, var newString = oldString.split(' ');

	--	Use the 'join' method to join each element of an array into a string separated by whatever delimiter you provide as an argument.

		ex: var joinMe = ["Split","me","into","an","array"];
			var joinedString = ' ';

			joinedString = joinMe.join(joinedString); // Joins the string with spaces

	**	Algorithms:

		 Palindrome: Remove all non-alphanumeric characters (punctuation, spaces and symbols) and turn everything lower case in order to check for palindromes.

		 function palindrome(str) {

		  var newStr = str.replace(/[^A-Za-z0-9]+/g,"").toLowerCase();
		  var len = newStr.length;
		    for ( var i = 0; i < Math.floor(len/2); i++ ) {
		        if (newStr[i] !== newStr[len - 1 - i]) {
		            return false;
		        }
		    }
		    return true;
		  }

	-- Find the longest word in a string

		function findLongestWord(str) {

		    var str1 = str.split(" ");
		    var longest = 0;
		    var word = null;

		    for (var i = 0; i < str1.length; i++) {
		        if (longest < str1[i].length) {
		            longest = str1[i].length;
		            word = str1[i];
		        }
		    }
		    return word.length;
		}

	-- Title case a sentence

		function titleCase(str) {

  			return str.replace(/\w\S*/g, function(txt) {
		      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		  });
		}

	--	JSON data access using jQuery

	$.getJSON("/json/cats.json", function(json) {
		$(".message").html(JSON.stringify(json));
	});

	-- use the .forEach() method to loop through the data

	var html = "";

	json.forEach(function(val) {

          html += "<div class = 'cat'>"

          html += "<img src = '" + val.imageLink + "'>"

          html += "</div>"

        });

    -- Code to access user location:

      if (navigator.geolocation) {
    	navigator.geolocation.getCurrentPosition(function(position) {
    	$("#data").html("latitude: " + position.coords.latitude +     "<br>longitude: " + position.coords.longitude);
  	});

--------------------------
Object Oriented Javascript
--------------------------

Scopes:

var hero = new aHero();

var fn = function(){
	var	foo = new Foo(); // If foo is assigned without var, by default it will create a global variable of type foo and it is not recommended

	log	(foo);
};

variables with in the function scope has local scope and if variables decalred under any if(){} or other conditionals loops have a global access

if(condition){
	var firstName = "Punith";
}

log(firstName); // firstName is still has a global scope

Lexical scope VS Execution context (in memory scopes)
