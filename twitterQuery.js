/*
// Twitter stream processing:
	-receive the JSON data from the user's form submission on input.html
	-form a call to T\twitter's steaming API from this data
	-return the data from twitter
	-process data for inferred mood of each tweet, at its geotagged location
	-return JSON object containing: { location: geotagged coordinates, color: mood-inferred color};
//
*/

var util = require('util');

this.makeQuery = function(data){

	console.log("The processing has successfully reached the twitterQuery.js function")
	console.log(data);







}