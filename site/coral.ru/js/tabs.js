import {hostReactAppReady} from "../../common/js/utils";

hostReactAppReady().then(() => {
	const tabsBtns = document.querySelectorAll('.tabs .tab-link');
	const posters = document.querySelectorAll('.tabs .poster img')
	const descriptions = document.querySelectorAll('.tabs .description')
	const advizor = document.querySelector('.advizor')

	tabsBtns.forEach((btn, idx) => {
		btn.addEventListener('click', (e) => {
			tabsBtns.forEach(item => item.classList.remove('js-active'))
			posters.forEach(item => item.classList.remove('js-active'))
			descriptions.forEach(item => item.classList.remove('js-active'))

			if (idx === 1) {
				advizor.classList.add('js-hidden')
			} else {
				advizor.classList.remove('js-hidden')
			}

			e.currentTarget.classList.add('js-active')
			posters[idx].classList.add('js-active')
			descriptions[idx].classList.add('js-active')
		})
	})
})