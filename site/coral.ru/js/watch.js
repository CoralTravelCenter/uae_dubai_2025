import { hostReactAppReady, mediaMatcher } from '../../common/js/utils'

hostReactAppReady().then(() => {
	const cards = document.querySelectorAll('section.info-cards .card')
	const dots = document.querySelector('section.info-cards .dots')

	mediaMatcher(768, isMobile => {
		if (isMobile) {
			for (let i = 0; i < cards.length; i++) {
				const dot = document.createElement('div')
				dot.classList.add('dot')
				dots.append(dot)
			}
		}

		const slider = document.querySelector('.info-cards-wrapper')
		const slides = document.querySelectorAll('.info-cards-wrapper .card')

		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						const index = [...slides].indexOf(entry.target)
						const activeDot = document.querySelectorAll('.dot')
						activeDot.forEach(dot => dot.classList.remove('js-active'))
						activeDot[index].classList.add('js-active')
					}
				})
			},
			{
				root: slider, // Контейнер, в котором происходит скролл
				threshold: 0.5, // Когда карточка видна наполовину
			}
		)

		slides.forEach(slide => observer.observe(slide))
	})
})
