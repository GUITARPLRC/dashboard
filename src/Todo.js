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
		const stitchClient = new stitch.StitchClient('dashboard-qubgr');
		const mongoClient = stitchClient.service('mongodb', 'mongodb-atlas');
		const db = mongoClient.db('dashboard');
		const coll = db.collection('list');

		coll.find({ owner_id: '59f72a980584297950dc167f' }).then(res => {
			console.log(res[0].list);
			if (res[0].list) {
				this.setState({ list: res[0].list });
			} else {
				return;
			}
		});
	}

	updateDB = () => {
		let list = this.state.list;
		const stitchClient = new stitch.StitchClient('dashboard-qubgr');
		const mongoClient = stitchClient.service('mongodb', 'mongodb-atlas');
		const db = mongoClient.db('dashboard');
		const coll = db.collection('list');
		stitchClient
			.login()
			.then(() => {
				coll
					.updateOne({ owner_id: '59f72a980584297950dc167f' }, { owner_id: '59f72a980584297950dc167f', list })
					.then(res => console.log(res));
			})
			.then(() => console.log('success'))
			.catch(err => console.log(`Error`, err));
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
