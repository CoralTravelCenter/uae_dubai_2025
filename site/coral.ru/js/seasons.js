import { getSeason } from 'season-detect'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import { hostReactAppReady } from '../../common/js/utils'

window._calendar_actions = [
	{
		month: 'Июнь',
		holidays: [
			{
				holiday_name: 'Курбан-байрам',
				period: '6-10',
				headline: '16 июня <br> Курбан-байрам',
				description: 'Один из значимых праздников<br> в исламе',
				action: {
					title: 'Выбрать тур',
					data_lookup_destination: 'ОАЭ',
				},
			},
		],
	},
]

function highlightRange(container, startValue, endValue, holidayName) {
	if (!container) return

	const days = [...container.querySelectorAll('.days div')]
	let startIndex = days.findIndex(
		day => day.textContent.trim() === startValue.toString()
	)
	let endIndex = days.findIndex(
		day => day.textContent.trim() === endValue.toString()
	)

	if (startIndex !== -1) {
		days[startIndex].classList.add('curved-left')
		days[startIndex].setAttribute('data-holiday', holidayName)
	}

	if (endIndex !== -1) {
		days[endIndex].classList.add('curved-right')
	}

	if (startIndex !== -1 && endIndex !== -1 && startIndex < endIndex) {
		for (let i = startIndex; i <= endIndex; i++) {
			days[i].classList.add('holiday')
		}
	}
}

function initializeSeasonsTabs() {
	const seasonsTabsButtons = document.querySelectorAll('[data-season]')
	const seasonsTabsContent = document.querySelectorAll('[data-season-content]')

	function autoSwitchTab() {
		const currentSeason = getSeason()
		const targetButton = document.querySelector(
			`[data-season="${currentSeason}"]`
		)
		const targetContent = document.querySelector(
			`[data-season-content="${currentSeason}"]`
		)

		if (targetButton && targetContent) {
			seasonsTabsButtons.forEach(button => button.classList.remove('js-active'))
			seasonsTabsContent.forEach(content =>
				content.classList.remove('js-active')
			)

			targetButton.classList.add('js-active')
			targetContent.classList.add('js-active')
		}
	}

	seasonsTabsButtons.forEach(button => {
		button.addEventListener('click', e => {
			seasonsTabsContent.forEach(season => season.classList.remove('js-active'))
			seasonsTabsButtons.forEach(btn => btn.classList.remove('js-active'))

			e.currentTarget.classList.add('js-active')
			const targetContent = document.querySelector(
				`[data-season-content="${e.currentTarget.getAttribute('data-season')}"]`
			)
			if (targetContent) targetContent.classList.add('js-active')
		})
	})

	autoSwitchTab()
}

function applyCalendarHighlights() {
	window._calendar_actions.forEach(action => {
		const calendar = document.querySelector(
			`.calendar[data-month="${action.month}"]`
		)
		if (!calendar) return

		action.holidays.forEach(holiday => {
			const [from, to] = holiday.period.split('-').map(Number)
			highlightRange(calendar, from, to, holiday.holiday_name)
		})
	})
}

function initializeTooltips() {
	window._calendar_actions.forEach(action => {
		action.holidays.forEach(holiday => {
			const target = document.querySelector(
				`[data-holiday="${holiday.holiday_name}"]`
			)
			if (!target) return

			tippy(target, {
				content: `
          <div class="content">
            <span class="name">${holiday.headline}</span>
            <span class="description">${holiday.description}</span>
            <div class="actions">
              <a href="#" data-lookup-destination="${holiday.action.data_lookup_destination}">
                ${holiday.action.title}
              </a>
            </div>
          </div>
        `,
				allowHTML: true,
				placement: 'top',
				theme: 'light',
				interactive: true,
				animation: 'fade',
			})
		})
	})
}

hostReactAppReady().then(() => {
	initializeSeasonsTabs()
	applyCalendarHighlights()
	initializeTooltips()
})
