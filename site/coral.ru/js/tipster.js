import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import { hostReactAppReady } from '../../common/js/utils'

const holidays = [
	{
		date: '16 июня',
		name: 'Курбан-байрам',
		description: 'Один из значимых праздников<br> в исламе',
		action: {
			title: 'Выбрать тур',
			data_lookup_destination: 'ОАЭ',
		},
	},
]

hostReactAppReady().then(() => {
	const holidayElements = document.querySelectorAll('[data-holyday]')
	if (holidayElements.length !== holidays.length) {
		alert(
			'Ошибка: Количество элементов data-holiday не соответствует количеству объектов в holidays'
		)
	} else {
		holidayElements.forEach((element, index) => {
			const holiday = holidays[index]

			tippy(element, {
				content: `
					<div class="content">
	<span class="name">${holiday.name}<br>${holiday.date}</span>
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
	}
})
