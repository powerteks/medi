
const  mediaQueryMxTablet = window.matchMedia('(max-width: 767px)');
const mediaQueryMxDesktop = window.matchMedia('(max-width: 1299px)');
const    mediaQueryTablet = window.matchMedia('(min-width: 768px)');

const   body = document.querySelector('body');
const header = document.querySelector('.header');
const   main = document.querySelector('.main');
const footer = document.querySelector('.footer');

if ( mediaQueryMxDesktop.matches ) {
	//   navigation
	if ( document.querySelectorAll('.nav__button-toggle') != 0 ) {
		const      nav = document.querySelector('.nav');
		const navItems = document.querySelectorAll('.nav__item:not(.nav__item__button)');

		document.querySelector('.nav__button-toggle').addEventListener( 'click', event => {console.log(12);
			if ( nav.classList.contains('nav_close') ) {
				nav.classList.add('nav_animate-open');
				nav.classList.remove('nav_close');
				setTimeout(() => { nav.classList.remove('nav_animate-open')  }, 700);
			} else {
				nav.classList.add('nav_animate-close');
				nav.classList.add('nav_close');
				setTimeout(() => { nav.classList.remove('nav_animate-close') }, 700);
			}
			
			event.target.blur();
		});

		[].forEach.call( navItems, element => {
			element.onclick = event => {
				nav.classList.add('nav_close');
				event.target.blur();
			}
		});
	}
	
	//   salon choice
	if ( document.querySelectorAll('.button-menu_salons') != 0 ) {
		const buttonSalons = document.querySelector('.button-menu_salons');
		const   listSalons = document.querySelector('.list-salons');

		document.addEventListener('DOMContentLoaded', () => {
			buttonSalons.addEventListener( 'click', event => {
				event.preventDefault();
				if ( listSalons.classList.contains('list-salons_show') ) {
					listSalons.classList.remove('list-salons_show');
				} else {
					listSalons.classList.add('list-salons_show');
				}
			});

			window.addEventListener( 'click', element => {
				const target = element.target;

				if ( !target.closest('.button-menu_salons') && !target.closest('.list-salons_show') ) {
					listSalons.classList.remove('list-salons_show');
				}
			});
		});
	}
}

//   enable tabulation on the selection menu
if ( document.querySelectorAll('.link-salons') != 0 ) {
	const listSalons = document.querySelector('.list-salons');

	[].forEach.call( document.querySelectorAll('.list-salons__link'), element => {
		element.addEventListener( 'focus', () => {
			listSalons.classList.add('list-salons_focus');
		});
		element.addEventListener( 'blur', () => {
			listSalons.classList.remove('list-salons_focus');
		});
	});
}

//   swiper slider
const slider = new Swiper('.slider', {
	direction    : 'horizontal',
	loop         : true,
	effect       : 'fade',
	simulateTouch: false,
	speed        : 500,
	wrapperClass : 'slider__list',
	slideClass   : 'slider__item',
	navigation   : {
		nextEl: '.button-arrow_slider-forward',
		prevEl: '.button-arrow_slider-back',
	},
	keyboard: {
		enabled       : true,
		onlyInViewport: true,
		pageUpDown    : true,
	},
	autoHeight: true,
	watchOverflow: true,
});

//   slider height setting
if ( mediaQueryMxTablet && document.querySelectorAll('.slider__item') != 0 ) {
	const items = document.querySelectorAll('.slider__item');

	Array.prototype.forEach.call( items, element => {
		setTimeout(() => {
			element.style.height = document.querySelector('.slider').offsetHeight + 'px';
		}, 500);
	});
}

if ( document.querySelectorAll('.advantages__item') != 0 ) {
	const advantagesItem = document.querySelectorAll('.advantages__item');

	[].forEach.call( advantagesItem, element => {
		element.onclick = () => {
			document.querySelector('.advantages__item_active').classList.remove('advantages__item_active');
			element.classList.add('advantages__item_active');
		}
	});
}

//   switching tabs in the news
if ( document.querySelectorAll('.news__button') != 0 ) {
	const buttonsNews = document.querySelectorAll('.news__button');
	const   itemsNews = document.querySelectorAll('.news__block');

	[].forEach.call( buttonsNews, element => {
		element.onclick = () => {
			document.querySelector('.news__button_active').classList.remove('news__button_active');
			document.querySelector('.news__block_active').classList.remove('news__block_active');
			element.classList.add('news__button_active');

			i = Array.prototype.indexOf.call(buttonsNews, element);
			itemsNews[i].classList.add('news__block_active');
			activeBlock = document.querySelector('.news__block_active');
		}
	});
}

//   following anchor links
const anchors = document.querySelectorAll('a[href*="#"]');

anchors.forEach( anchor => {
	anchor.addEventListener( 'click', event => {
		event.preventDefault();

		const blockID = anchor.getAttribute('href').substring(1);

		if (document.getElementById(blockID) != null) {
			document.getElementById(blockID).scrollIntoView({
				behavior: 'smooth',
					block: 'start'
			});
		}
	});
});

//   working custom select
if (document.querySelector('.form__select_js') != null) {
	const elSelectCustomNative = document.getElementsByClassName('form__select_native-js')[0];
	const       elSelectCustom = document.getElementsByClassName('form__select_js')[0];
	const    elSelectCustomBox = elSelectCustom.children[0];
	const   elSelectCustomOpts = elSelectCustom.children[1];
	const       customOptsList = Array.from(elSelectCustomOpts.children);
	const         optionsCount = customOptsList.length;

	let      optionChecked = '';
	let optionHoveredIndex = -1;

	if (document.querySelectorAll('form__select_native-js option:checked') != 0) {
		const selectList = document.querySelectorAll('form__select_native-js option:not(:disabled)');

		[].forEach.call(selectList, e => {
			if (e.selected) {
				const eOption = e.textContent;
				const index = Array.prototype.indexOf.call(selectList, e);

				document.querySelectorAll('.form__option')[index].classList.add('form__option_active');
				elSelectCustomBox.textContent = eOption;
			}
		});
	}

	elSelectCustomBox.addEventListener('click', (e) => {
		const isClosed = !elSelectCustom.classList.contains('form__option_active');

		(isClosed) ? openSelectCustom() : closeSelectCustom();
	});

	function openSelectCustom() {
		elSelectCustom.classList.add('form__option_active');
		elSelectCustom.setAttribute('aria-hidden', false);

		if (optionChecked) {
			const optionCheckedIndex = customOptsList.findIndex(
				(el) => el.getAttribute('data-value') === optionChecked
			);
			updateCustomSelectHovered(optionCheckedIndex);
		}

		document.addEventListener('click', watchClickOutside);
		document.addEventListener('keydown', supportKeyboardNavigation);
	}

	function closeSelectCustom() {
		elSelectCustom.classList.remove('form__option_active');

		elSelectCustom.setAttribute('aria-hidden', true);

		updateCustomSelectHovered(-1);

		document.removeEventListener('click', watchClickOutside);
		document.removeEventListener('keydown', supportKeyboardNavigation);
	}

	function updateCustomSelectHovered(newIndex) {
		const prevOption = elSelectCustomOpts.children[optionHoveredIndex];
		const     option = elSelectCustomOpts.children[newIndex];

		if (prevOption) {
			prevOption.classList.remove('form__option_hover');
		}
		if (option) {
			option.classList.add('form__option_hover');
		}

		optionHoveredIndex = newIndex;
	}

	function updateCustomSelectChecked(value, text) {
		const    prevValue = optionChecked;
		const elPrevOption = elSelectCustomOpts.querySelector(`[data-value='${prevValue}'`);
		const     elOption = elSelectCustomOpts.querySelector(`[data-value="${value}"`);

		if (elPrevOption) {
			elPrevOption.classList.remove('form__option_active');
		}

		if (elOption) {
			elOption.classList.add('form__option_active');
		}

		elSelectCustomBox.textContent = text;
		optionChecked = value;
	}

	function watchClickOutside(e) {
		const didClickedOutside = !elSelectCustom.contains(e.target);
		const didClickedOutside2 = !elSelectCustomNative.contains(e.target);
		
		if (didClickedOutside && didClickedOutside2) {
			closeSelectCustom();
		}
	}

	function supportKeyboardNavigation(event) {
		if (event.keyCode === 40 && optionHoveredIndex < optionsCount - 1) {
			let index = optionHoveredIndex;
			event.preventDefault();
			updateCustomSelectHovered(optionHoveredIndex + 1);
		}

		if (event.keyCode === 38 && optionHoveredIndex > 0) {
			event.preventDefault();
			updateCustomSelectHovered(optionHoveredIndex - 1);
		}

		if (event.keyCode === 13 || event.keyCode === 32) {
			event.preventDefault();

			const option = elSelectCustomOpts.children[optionHoveredIndex];
			const  value = option && option.getAttribute('data-value');

			if (value) {
				elSelectCustomNative.value = value;
				updateCustomSelectChecked(value, option.textContent);
			}
			closeSelectCustom();
		}

		if (event.keyCode === 27) {
			closeSelectCustom();
		}
	}

	elSelectCustomNative.addEventListener('change', e => {
		const                    value = e.target.value;
		const elRespectiveCustomOption = elSelectCustomOpts.querySelectorAll(`[data-value="${value}"]`)[0];

		updateCustomSelectChecked(value, elRespectiveCustomOption.textContent);
	});


	customOptsList.forEach(function (elOption, index) {
		elOption.addEventListener('click', e => {
			const value = e.target.getAttribute('data-value');

			elSelectCustomNative.value = value;
			updateCustomSelectChecked(value, e.target.textContent);
			closeSelectCustom();
		});

		elOption.addEventListener('mouseenter', e => {
			updateCustomSelectHovered(index);
		});
	});
}

//   modal
const       overlay = document.querySelector('.overlay');
const  makingButton = document.querySelector('.nav__button');
const   makingModal = document.querySelector('.modal_making');
const    closeModal = document.querySelector('.modal__button-close');
const  submitButton = document.querySelector('.modal__button-close');
const responseModal = document.querySelector('.modal_response');

if (document.querySelectorAll('.modal') != 0) {

	const modalToggle = (modal, check = 0) => {
		if (check) {
			modal.classList.add('modal_active');
			overlay.classList.add('overlay_active');
		} else {
			overlay.classList.remove('overlay_active');
			modal.classList.add('modal_no-show');
			modal.classList.remove('modal_active');
			setTimeout(() => {
				modal.classList.remove('modal_no-show');
			}, 700);
		}

		if (document.documentElement.clientHeight > modal.offsetHeight) {
			if (check) {
				body.classList.add('lock');
			} else {
				body.classList.remove('lock');
			}
		} else {
			if (check) {
				header.classList.add('lock');
				main.classList.add('lock');
				footer.classList.add('lock');
				main.style.height = modal.offsetHeight - header.offsetHeight + 'px';
				footer.style.height = '0';
			} else {
				header.classList.remove('lock');
				main.classList.remove('lock');
				footer.classList.remove('lock');
				main.style.height = null;
				footer.style.height = null;
			}
		}
	}

	if ( makingButton != null ) {
		makingButton.addEventListener('click', event => {
			event.preventDefault();
			modalToggle(makingModal, 1);
		});
	}

	if (submitButton != null ) {
		submitButton.addEventListener('click', event => {
			event.preventDefault();
			modalToggle(makingModal);
		});
	}

	if ( overlay != null ) {
		overlay.addEventListener('click', () => {
			if (overlay.classList.contains('overlay_active')) {
				modalToggle(makingModal);
			}
		});
	}

	window.addEventListener('keydown', event => {
		if (event.keyCode === 27 && popupModal.classList.contains('modal_active')) {
			modalToggle(makingModal);
		}
	});

	if (closeModal != null) {
		closeModal.addEventListener('click', event => {
			event.preventDefault();
			modalToggle(makingModal);
		});
	}
}

//   scrollup
window.addEventListener( 'scroll', () => {
	scrollUp = document.querySelector('.scrollup');

	if ( window.pageYOffset > 500 ) {
		scrollUp.classList.contains('scrollup_show') ? false : scrollUp.classList.add('scrollup_show') ;
	} else {
		scrollUp.classList.contains('scrollup_show') ? scrollUp.classList.remove('scrollup_show') : false ;
	}
});

document.querySelector('.scrollup').addEventListener( 'click', event => {
	event.preventDefault();

	if ( Math.max(document.body.scrollTop, document.documentElement.scrollTop) > 0 ) {
		document.querySelector('.header').scrollIntoView({
			behavior: 'smooth',
				 block: 'end'
		});
	}

	event.target.blur();
});

window.addEventListener( 'scroll', () => {
	scrollUp = document.querySelector('.scrollup');

	if ( window.pageYOffset > 500 ) {
		scrollUp.classList.contains('scrollup_show') ? false : scrollUp.classList.add('scrollup_show') ;
	} else {
		scrollUp.classList.contains('scrollup_show') ? scrollUp.classList.remove('scrollup_show') : false ;
	}
});

document.querySelector('.scrollup').addEventListener( 'click', event => {
	event.preventDefault();

	if ( Math.max(document.body.scrollTop, document.documentElement.scrollTop) > 0 ) {
		document.querySelector('.header').scrollIntoView({
			behavior: 'smooth',
				 block: 'end'
		});
	}

	event.target.blur();
});