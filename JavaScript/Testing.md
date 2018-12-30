## Testing strategies

- `Chai` can be used as assertion library
- `Mocha` can be used as test runner for running units
- Save the file name as `spec.js` or `test.js` to be recognised by mocha runner
- export a report to html using mocha as follows, 
	```
	$mocha --reporter doc > report.html
	```
- Code coverage using `istanbul` package 
- Run the following command on the project or add it as npm script to run the coverage
	`istanbul cover node_modules/mocha/bin/_mocha -- -R spec`
- Install `nyc` package to add reporter for mocha, add the test script to package.json as follows,
	`nyc mocha`