///
/// An independent model representing the application under a mutable state design.
///

import { observable } from 'mobx';

///
/// Model
///
/// The model represents all the data that we expect to change over time as the user interacts with our site.
/// In this case, the model is extremely simple, but it illustrates the point.  We "wrap" our model in the
/// mobx function "observable" so that mobx can watch it for mutation and alert React as necessary.  This is
/// a pretty easy way to get mutable state driving the DOM without mucking about with DOM elements directly!
///
export const Model = observable(
	
	{ UserName:"", Age:0 }

);

//
// PutToAwsBucket
// Put an object into a bucket.
//
Model.PutToAwsBucket = async function(Key) {

	try {

		// Endpoint on AWS.  Change "aws-bucket-app" to the name of your bucket on AWS.  Note that this url 
		// does NOT include "website-s3", which is a common source of confusion.
		const PutUrl = "https://aws-bucket-app.s3.us-east-2.amazonaws.com/" + Key;

		// Convert the payload to JSON.
		const ObjectToStoreInJSON = JSON.stringify(this);

		// Build out the request body.  The x-amz-* headers are required by AWS.
		let FetchData = { 
			method:'PUT',
			mode:'cors', 
			cache:'no-cache', 
			credentials:'omit',
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': ObjectToStoreInJSON.length,
				'x-amz-date': (new Date()).toUTCString(),
				'x-amz-acl': 'public-read'
			},
			body: ObjectToStoreInJSON
		};

		// Start the async call.
		console.log("[validation-page.js] Preparing to fetch/put, payload -->"); console.log(PutUrl); console.log(FetchData);
		let FetchReply = await fetch(PutUrl, FetchData);
		console.log("Heard back from fetch/put --> "); console.log(FetchReply);

		// Assess.
		return (FetchReply && FetchReply.status === 200);

	} catch(e) {

		console.log("[PutToAwsBucket] Exception! e -->"); console.log(e);

	}	

}

///
/// Reset
///
/// This method resets the model back to a known quiescent state.  It is often handy to have a reset 
/// function built-in to a model, since it relieves the view components from knowing what it means to
/// be reset -- instead, all they need to do is call this method.
/// 
Model.Reset = function() {

	this.UserName = "";
	this.Age = 0;

}

///
/// SetUserName
///
/// This method changes the user name in the model, without performing any validation or consistency checks.
/// In real life, this would be the place to write code that implements business rules designed to protect
/// the integrity of the model.  Maybe user names cannot contain numbers, or must be at least 8 characters long,
/// or some other condition.  These conditions are known as business rules because they are not up to the 
/// developer to decide, however the developer must implement code to satisfy them.
/// 
Model.SetUserName = function(newvalue) {
	this.UserName = newvalue;
}

///
/// SetUserAge
///
/// This method changes the user age in the model, without performing any validation or consistency checks.
/// See comment above for more information.
/// 
Model.SetUserAge = function(newvalue) {
	this.Age = newvalue;
}

