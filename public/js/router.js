//instantiate states when user requests the state

(function (window) {
	//namespacing App
	window.App = window.App || {};

	class Router {
		constructor(containerId) {
			this.container = document.getElementById(containerId);

		} 
		//takes in a 'route' and renders to the container
		navigate(route) {
			let state = null;
			switch (route) {
				case 'random':
					state = new App.states.Random();
					break;
				case 'places':
					state = new App.states.Places();
					break;
				case 'spaceships':
					state = new App.states.SpaceShips();
					break;
			}

			//wait for state to be rendered
			//then append the element to the view
			// state.rendered(
			// 	this.container.forEach((divContainer) => {
			// 		divContainer.firstChild()
			// 	})


				// this.container.innerHTML = '';
				// this.container.appendChild(element);
			
		}
	}
	


	window.App.Router = new Router('container');
}(window))