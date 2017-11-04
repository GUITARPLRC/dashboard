import React from 'react';
import Todo from './Todo';
import Github from './Github';
import Githubjobs from './Githubjobs';
import Weather from './Weather';
import Authjobs from './Authjobs';
import SO from './SO';
import Youtube from './Youtube';

import './App.css';

function App() {
	let today = new Date();
	let day = today.toLocaleDateString();

	return (
		<div className="App">
			<div className="top">
				<div className="top_left">
					<h1>Hello Chuck!</h1>
					<p>Today is {day}</p>
					<Weather />
				</div>
				<div className="top_right">
					<Youtube />
					<Github />
				</div>
			</div>
			<div className="components">
				<Todo />
				<Githubjobs />
				<Authjobs />
				<SO />
			</div>
		</div>
	);
}

export default App;
