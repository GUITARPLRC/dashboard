import React, { Component } from 'react';

class Weather extends Component {
	constructor() {
		super();
		this.state = {
			lat: null,
			long: null,
			temp: null,
			conditions: null
		};
	}

	success = position => {
		let lat = position.coords.latitude;
		let long = position.coords.longitude;
		this.setState({ lat, long });

		let url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state
			.long}&APPID=0e61c9d5e0a1848bbb9d99132298b339`;

		fetch(url)
			.then(info => info.json())
			.then(items =>
				this.setState({
					temp: Math.round(items.main.temp * 9 / 5 - 459.67),
					conditions: items.weather[0].description
				})
			);
	};

	componentDidMount() {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(this.success, err => {
				console.log(err);
			});
		} else {
			console.log('No Geo right now!!');
		}
	}
	render() {
		return (
			<div className="weather">
				{this.state.temp && (
					<p>
						{this.state.temp}&deg;F {this.state.conditions}
					</p>
				)}
			</div>
		);
	}
}

export default Weather;
