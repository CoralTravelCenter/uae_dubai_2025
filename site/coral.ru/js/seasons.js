import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import { hostReactAppReady } from '../../common/js/utils'
dayjs.extend(isSameOrAfter)

function getSeason() {
	const date = dayjs()
	const seasonChangeDays = [
		{ month: 1, day: 15, season: 'Весна' }, // Весна с 15 февраля
		{ month: 4, day: 15, season: 'Лето' }, // Лето с 15 мая
		{ month: 7, day: 15, season: 'Осень' }, // Осень с 15 августа
		{ month: 10, day: 15, season: 'Зима' }, // Зима с 15 ноября
	]

	for (let i = seasonChangeDays.length - 1; i >= 0; i--) {
		let changeDate = date
			.month(seasonChangeDays[i].month)
			.date(seasonChangeDays[i].day)
		if (date.isSameOrAfter(changeDate)) {
			return seasonChangeDays[i].season
		}
	}
}

function highlightRange(container, startValue, endValue, holidayName) {
	if (!container) return

	const days = Array.from(container.querySelectorAll('.days div')).filter(
		day => !day.classList.contains('disable')
	) // Исключаем disable-дни

	let startIndex = -1,
		endIndex = -1

	// Один проход по массиву для поиска индексов
	days.forEach((day, index) => {
		const dayText = day.textContent.trim()
		if (dayText === startValue.toString()) startIndex = index
		if (endValue !== undefined && dayText === endValue.toString())
			endIndex = index
	})

	// Если начальная дата не найдена — выходим
	if (startIndex === -1) return

	// Если конечная дата не найдена или равна начальной, выделяем один день
	if (endIndex === -1 || startIndex === endIndex) {
		days[startIndex].classList.add('curved', 'holiday')
		days[startIndex].setAttribute('data-holiday', holidayName)
		days[startIndex].setAttribute(
			'data-day',
			days[startIndex].textContent.trim()
		) // Добавляем число дня
		return
	}

	// Выделяем диапазон
	days[startIndex].classList.add('curved-left')
	days[startIndex].setAttribute('data-holiday', holidayName)
	days[startIndex].setAttribute('data-day', days[startIndex].textContent.trim())

	days[endIndex].classList.add('curved-right')
	days[endIndex].setAttribute('data-day', days[endIndex].textContent.trim())

	for (let i = startIndex; i <= endIndex; i++) {
		days[i].classList.add('holiday')
	}
}

function initializeSeasonsTabs() {
	const seasonsTabsButtons = document.querySelectorAll('[data-season]')
	const seasonsTabsContent = document.querySelectorAll('[data-season-content]')
	const posterImagesContainer = document.querySelector(
		'.seasons-tabs-wrapper .poster img'
	)
	const posterImages = [
		'//b2ccdn.coral.ru/content/landing-pages/uae_dubai_2025/dubai_summer.webp',
		'//b2ccdn.coral.ru/content/landing-pages/uae_dubai_2025/dubai_otum.webp',
		'//b2ccdn.coral.ru/content/landing-pages/uae_dubai_2025/dubai_winter.webp',
		'//b2ccdn.coral.ru/content/landing-pages/uae_dubai_2025/dubai_spring.webp',
	]

	function autoSwitchTab() {
		const currentSeason = getSeason()
		const targetButton = document.querySelector(
			`[data-season="${currentSeason}"]`
		)

		if (targetButton) {
			seasonsTabsButtons.forEach(button => button.classList.remove('js-active'))
			seasonsTabsContent.forEach(content =>
				content.classList.remove('js-active')
			)

			targetButton.click()
		}
	}

	seasonsTabsButtons.forEach((button, idx) => {
		button.addEventListener('click', e => {
			seasonsTabsContent.forEach(season => season.classList.remove('js-active'))
			seasonsTabsButtons.forEach(btn => btn.classList.remove('js-active'))
			posterImagesContainer.src = posterImages[idx]
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
			console.log(from, to)

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
