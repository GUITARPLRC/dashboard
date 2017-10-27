import React, { Component } from 'react';

import './Todo.css';

class Todo extends Component {
	constructor() {
		super();
		this.state = {
			input: '',
			list: []
		};
	}

	handleInputChange = e => {
		this.setState({ input: e.target.value });
	};

	handleFormSubmit = () => {
		let list = this.state.list;
		list.push(this.state.input);
		this.setState({ list, input: '' });
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
					<button type="submit">Add</button>
				</form>
				{this.state.list && (
					<div className="list">
						<ul>
							{this.state.list.map((each, key) => (
								<li key={key} onDoubleClick={() => this.handleDelete(key)}>
									{each} <span>&times;</span>
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
