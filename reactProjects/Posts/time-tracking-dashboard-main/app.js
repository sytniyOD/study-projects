(() => {
	// async function allow us to get data from database.
	async function getDashboardData(url = '/data.json') {
		const response = await fetch(url);
		const data = await response.json();

		return data;
	}

	// Class to create cards.
	class DashboardItem {
		// Static object for views.
		static PERIODS = {
			daily: 'day',
			weekly: 'week',
			month: 'monthly'
		}

		// Constructor with data and container parametrs.
		// View will allow us to change view option(daily, weekly, monthly).
		constructor(data, container = '.dashboard__content', view = 'weekly') {
			this.data = data;
			this.container = document.querySelector(container);
			this.view = view;

			this._createMarkup()
		}

		// Method that is creating card mark up.
		_createMarkup() {
			// Object destructuring of the data from database
			const { title, timeframes } = this.data;

			// id of the card. Use it to give right class for card.
			const id = title.toLowerCase().replace(/ /g, '-');
			// time data from database
			const { current, previous } = timeframes[this.view.toLowerCase()];

			// Adjacment of marking in container.
			this.container.insertAdjacentHTML('beforeend', `
				<div class="dashboard__item dashboard__item--${id}">
				<article class="tracking-card">
				  <header class="tracking-card__header">
					<h4 class="tracking-card__title">
					  ${title}
					</h4>
					<img class="tracking-card__menu" src="images/icon-ellipsis.svg" alt="menu">
				  </header>
				  <div class="tracking-card__body">
					<div class="tracking-card__time">${current}hrs</div>
					<div class="tracking-card__prev-period">Last ${DashboardItem.PERIODS[this.view]} - ${previous}hrs</div>
				  </div>
				</article>
			  </div>
				`);

			// Create this.time and this.prev so we can change it further.
			this.time = this.container.querySelector(`.dashboard__item--${id} .tracking-card__time`);
			this.prev = this.container.querySelector(`.dashboard__	item--${id} .tracking-card__prev-period`)
		}

		// Method for changing view property.
		changeView(view) {
			this.view = view.toLowerCase();
			const { current, previous } = this.data.timeframes[this.view.toLowerCase()];

			this.time.innerText = `${current}hrs`
			this.prev.innerText = `Last ${DashboardItem.PERIODS[this.view]} - ${previous}hrs`;
		}
	}

	document.addEventListener('DOMContentLoaded', () => {
		getDashboardData()
			.then(data => {
				// creating cards with data from database
				const activities = data.map(activity => new DashboardItem(activity));

				const selectors = document.querySelectorAll('.view-selector__item');
				selectors.forEach(selector =>
					selector.addEventListener('click', () => {
						selectors.forEach(sel => sel.classList.remove('view-selector__item--active'));
						selector.classList.add('view-selector__item--active');

						const currentView = selector.innerText.trim().toLowerCase();
						activities.forEach(activitity => activitity.changeView(currentView))
					}))
			})
	})
})();