import React, { Component } from 'react';
import './Todo.css';

const stitch = require('mongodb-stitch');

class Todo extends Component {
	constructor() {
		super();
		this.state = {
			input: '',
			list: []
		};
	}

	componentDidMount() {
		const client = new stitch.StitchClient('dashboard-pdynh');
		const db = client.service('mongodb', 'mongodb-atlas').db('dashboard');

		client
			.login()
			.then(() => db.collection('list').find({ owner_id: 'Chuck' }))
			.then(res => {
				this.setState({ list: res[0].list });
			})
			.catch(err => {
				console.error('Init Error', err);
			});
	}

	updateDB = () => {
		const list = this.state.list;

		const client = new stitch.StitchClient('dashboard-pdynh');
		const db = client.service('mongodb', 'mongodb-atlas').db('dashboard');
		const listCollection = db.collection('list');

		listCollection
			.updateOne({ owner_id: 'Chuck' }, { $set: { list: list } })
			.then(res => console.log('Updated'))
			.catch(err => console.log('Update Error', err));
	};

	handleInputChange = e => {
		this.setState({ input: e.target.value });
	};

	handleFormSubmit = e => {
		e.preventDefault();

		let list = this.state.list;

		list.push(this.state.input);
		this.setState({ list, input: '' });
		this.updateDB();
	};

	handleDelete = item => {
		let list = this.state.list;

		list.splice(item, 1);
		this.setState({ list });
		this.updateDB();
	};

	render() {
		return (
			<div className="Todo">
				<form
					onSubmit={e => {
						this.handleFormSubmit(e);
					}}
				>
					<input value={this.state.input} onChange={this.handleInputChange} placeholder="add TODO" />
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
