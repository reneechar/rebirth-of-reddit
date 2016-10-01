(function(window) {
	//namespace our app
	window.App = window.App || {};
	
	//each state will prepare the data to be rendered
	//then have a function that returns the new state dom tree

	class Random {
		//prepare data
		constructor() {
			//execute an xhr request to htt://swapi.co/api/people endpoint
			this.author = null;
			this.title = null;
			this.picture = null;
			this.ready = null;
			App.utils.Get('https://www.reddit.com/r/SurpriseAppearances/.json',(data) => {
				let i = 1
				console.log('clicky',JSON.parse(data).data);
				while(JSON.parse(data).data.children[i] !==undefined) {
					const parsedData = JSON.parse(data).data.children[i];
					this.author = parsedData.data.author;
					this.title = parsedData.data.title;
					if (parsedData.data.preview === undefined) {
						this.picture = 'http://www.freeiconspng.com/uploads/reddit-logo-icon-0.png';
					} else {
						this.picture = parsedData.data.preview.images[0].source.url;
					}
					console.log(this.picture);
					this.render(this.ready);
					i++;
				}

			});
		}
		//render our data when data is ready
		//send the fianl rendered dom element to callback
		//callback : function(element)
		rendered(callback) {
			this.ready = callback;
		}

		render(readyFunc) {
			const view = document.createElement('div');
			const list = document.createElement('ul');

			const items = this.people.map(person => {
				let item = document.createElement('li');
				item.innerHTML = person.name
				return item;
			});

			items.forEach(list.appendChild.bind(list));
			
			view.appendChild(list);
			readyFunc(view);
		}
	}

	class Places {
		//prepare data
		constructor() {
			this.planets = [];
			this.ready = null;
			App.utils.Get('http://swapi.co/api/planets/', (data) => {
				const parsedPlanets = JSON.parse(data);
				this.planets = parsedPlanets.results

				this.render(this.ready)
			});
		}
		rendered(callback) {
			this.ready = callback;
		}
		render(readyFunc) {
			const view = document.createElement('div');
			const list = document.createElement('ul');
			const items = this.planets.map(place => {
				let item = document.createElement('li');
				item.innerHTML = place.name
				return item;
			});

			items.forEach(list.appendChild.bind(list));
			
			view.appendChild(list);
			readyFunc(view);
		}
	}

	class SpaceShips {
		//prepare data
		constructor() {
			this.starShips = [];
			this.ready = null;
			App.utils.Get('http://swapi.co/api/starships/', (data) => {
				const parsedStarships = JSON.parse(data);
				this.starShips = parsedStarships.results;

				this.render(this.ready);
			})
		}
		rendered(callback) {
			this.ready = callback;
		}
		//return a single dom element to be added to the view
		render(readyFunc) {
			const view = document.createElement('div');
			const list = document.createElement('ul');
			const items = this.starShips.map(spaceShip => {
				let item = document.createElement('li');
				item.innerHTML = spaceShip.name
				return item;
			});

			items.forEach(list.appendChild.bind(list));
			
			view.appendChild(list);
			readyFunc(view);
		}
	}

	window.App.states = {
		Random
		// Places,
		// SpaceShips
	}


}(window));