import dayjs from 'dayjs'
import { hostReactAppReady } from '../../common/js/utils'

function updateSeasonTab() {
	const month = dayjs().format('MM')

	const seasons = {
		Лето: ['06', '07', '08'],
		Осень: ['09', '10', '11'],
		Зима: ['12', '01', '02'],
		Весна: ['03', '04', '05'],
	}

	let activeSeason = Object.keys(seasons).find(season => {
		return seasons[season].includes(month)
	})

	document.querySelectorAll('.navigation li').forEach(tab => {
		tab.classList.remove('js-active')
	})

	if (activeSeason) {
		document
			.querySelector(`[data-season="${activeSeason}"]`)
			.classList.add('js-active')
		document
			.querySelector(`[data-season-content="${activeSeason}"]`)
			.classList.add('js-active')
	}
}

hostReactAppReady().then(() => updateSeasonTab())
