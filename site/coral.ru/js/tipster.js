import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import { hostReactAppReady } from '../../common/js/utils'

const holidays = window._calendar_actions

hostReactAppReady().then(() => {
	const currentMonth = document.querySelector(
		'.seasons-tabs-wrapper .content.js-active'
	)

	window._calendar_actions.forEach(action => {
		const calendar = document.querySelector(
			`.calendar[data-month="${action.month}"]`
		)

		action.holydays.forEach(holiday => {
			const target = document.querySelector(
				`[data-holyday="${holiday.holiday_name}"]`
			)
			console.log(target)

			tippy(target, {
				content: `
						<div class="content">
							<span class="name">${holiday.headline}</span>
							<span class="description">${holiday.description}</span>
							<div class="actions">
								<a
									href="#"
									data-lookup-destination="${holiday.action.data_lookup_destination}"
								>
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
})
