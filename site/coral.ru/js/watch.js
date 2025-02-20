import {hostReactAppReady, mediaMatcher} from "../../common/js/utils";

hostReactAppReady().then(() => {
	const cards = document.querySelectorAll('section.info-cards .card');
	const dots = document.querySelector('section.info-cards .dots')

	mediaMatcher(768, isMobile => {
		if (isMobile) {
			for (let i = 0; i < cards.length; i++) {
				const dot = document.createElement('div')
				dot.classList.add('dot')
				dots.append(dot)
			}
		}
	})
})