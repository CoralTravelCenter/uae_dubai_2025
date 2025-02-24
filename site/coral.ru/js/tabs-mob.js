import { hostReactAppReady } from '../../common/js/utils'

hostReactAppReady().then(() => {
	const tabsBtns = document.querySelectorAll('.tabs-mobile .tab-link')
	const pannels = document.querySelectorAll('.tabs-mobile .panel')

	tabsBtns.forEach((btn, idx) => {
		btn.addEventListener('click', e => {
			tabsBtns.forEach(item => item.classList.remove('js-active'))
			pannels.forEach(item => item.classList.remove('js-active'))

			e.currentTarget.classList.add('js-active')
			pannels[idx].classList.add('js-active')
		})
	})
})
