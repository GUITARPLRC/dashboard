import React, { Component } from 'react';
import './Todo.css';

const stitch = require('mongodb-stitch');

// TODO configue mongo stitch to update collection

class Todo extends Component {
	constructor() {
		super();
		this.state = {
			input: '',
			list: []
		};
	}

	componentDidMount() {
		const client = new stitch.StitchClient('dashboard-befkv');
		const db = client.service('mongodb', 'mongodb-atlas').db('dashboard');
		client
			.login()
			.then(() =>
				db.collection('list').updateOne({ owner_id: client.authedId() }, { $set: { number: 42 } }, { upsert: true })
			)
			.then(() => db.collection('list').find({ owner_id: client.authedId() }))
			.then(docs => {
				console.log('Found docs', docs);
				console.log('[MongoDB Stitch] Connected to Stitch');
			})
			.catch(err => {
				console.error(err);
			});
	}

	updateDB = () => {
		const client = new stitch.StitchClient('dashboard-befkv');
		const db = client.service('mongodb', 'mongodb-atlas').db('dashboard');
		client
			.login()
			.then(() => db.collection('list').insertOne(this.state.list))
			.then(() => {
				console.log('saved');
			})
			.catch(err => {
				console.log(err);
			});
	};

	handleInputChange = e => {
		this.setState({ input: e.target.value });
	};

	handleFormSubmit = () => {
		let list = this.state.list;
		list.push(this.state.input);
		this.setState({ list, input: '' });
		this.updateDB();
	};

	handleDelete = item => {
		let list = this.state.list;
		list.splice(item, 1);
		this.setState({ list });
	};

	render() {
		return (
			<div className="Todo">
				<form
					onSubmit={e => {
						this.handleFormSubmit(e);
						e.preventDefault();
					}}
				>
					<input value={this.state.input} onChange={this.handleInputChange} />
				</form>
				{this.state.list && (
					<div className="list">
						<ul>
							{this.state.list.map((each, key) => (
								<li key={key} onDoubleClick={() => this.handleDelete(key)}>
									{each}
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		);
	}
}

export default Todo;
