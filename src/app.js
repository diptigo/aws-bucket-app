
import React, { Component } from 'react';
import { observer } from 'mobx-react';

///
/// App
///
/// We create and export a constant named "App" which is the return value of a mobx function called "observer".
/// This function, in turn, is wrapping around our class named "BasePage", which represents the outermost
/// container of our application.  We won't render BasePage directly, because we want the mobx wrapper
/// function so that our page can watch our model for changes.  All of this is done more easily with
/// @decorator syntax, but that is not presently working in VS Code and I don't have time to sort it out :(
/// You can use the approach below *or* decorator syntax if you can get it working.
///
export const App = observer(

	class BasePage extends Component {

		/// 
		OnSaveClick = (e) => {

			// Define a key for the data.  All objects in AWS S3 buckets have a key.
			const Key = "mydata.json";

			// Call the model's "save to AWS" method.
			this.props.model.PutToAwsBucket(Key);
		}

		///
		OnChangeUserName = (e) => {

			// Extract value from the event object.
			const NewValue = e.target.value;
			
			// Update the model *directly* using a model method.
			this.props.model.SetUserName(NewValue);

		}

		///
		OnChangeUserAge = (e) => {

			// Extract value from the event object.
			const NewValue = e.target.value;
			
			// Update the model *directly* using a model method.
			this.props.model.SetUserAge(NewValue);

		}

		///
		render() {

			// Sample the current state.
			const UserName = this.props.model.UserName;
			const UserAge = this.props.model.Age;

			// Render JSX to visualize sampled state.
			return (

				<main>

					<div className="x-centered-y-centered-column">

						<input type="text" name="UserName" onChange={this.OnChangeUserName} />
						<input type="text" name="UserAge" onChange={this.OnChangeUserAge} />

					</div>

					<div style={{ marginTop:3 + "rem" }}>

						User Name: {UserName}<br/>
						Age: {UserAge}<br/>

					</div>

					<div style={{ marginTop:3 + "rem" }}>
						<button className="rectangular" onClick={this.OnSaveClick} >Save</button>
					</div>

				</main>

			);

		}

	}

);
