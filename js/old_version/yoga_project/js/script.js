window.addEventListener('DOMContentLoaded', function () {

	'use strict';

	let tab = document.querySelectorAll('.info-header-tab'),
		info = document.querySelector('.info-header'),
		tabContent = document.querySelectorAll('.info-tabcontent');

	function hideTabContent(a) {
		for (let i = a; i < tabContent.length; i++) {
			tabContent[i].classList.remove('show');
			tabContent[i].classList.add('hide');
		}
	}
	hideTabContent(1);

	function showTabContent(b) {
		if (tabContent[b].classList.contains('hide')) {
			tabContent[b].classList.remove('hide');
			tabContent[b].classList.add('show');
		}
	}

	info.addEventListener('click', function (event) {
		let target = event.target;

		if (target && target.classList.contains('info-header-tab')) {
			for (let i = 0; i < tab.length; i++) {
				if (target == tab[i]) {
					hideTabContent(0);
					showTabContent(i);
					break;
				}
			}
		}
	});

	// TIMER
	let deadline = '2020-05-14';

	function getTimeRemaining(endtime) {
		let t = Date.parse(endtime) - Date.parse(new Date()),
			seconds = Math.floor((t / 1000) % 60),
			minutes = Math.floor((t / 1000 / 60) % 60),
			hours = Math.floor((t / (1000 * 60 * 60)));

		return {
			'total': t,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
	}

	function setClock(id, endtime) {
		let timer = document.getElementById(id),
			hours = timer.querySelector('.hours'),
			minutes = timer.querySelector('.minutes'),
			seconds = timer.querySelector('.seconds'),
			timeInterval = setInterval(updateClock, 1000);

		function updateClock() {
			let t = getTimeRemaining(endtime);

			function addZiro(num) {
				if (num <= 9) {
					return '0' + num;
				} else {
					return num;
				}
			}

			hours.textContent = addZiro(t.hours);
			minutes.textContent = addZiro(t.minutes);
			seconds.textContent = addZiro(t.seconds);

			if (t.total <= 0) {
				clearInterval(timeInterval);
				hours.textContent = '00';
				minutes.textContent = '00';
				seconds.textContent = '00';
			}
		}
	}
	setClock('timer', deadline);

	//POP-UP
	let more = document.querySelector('.more'),
		more2 = document.querySelectorAll('.description-btn'),
		overlay = document.querySelector('.overlay'),
		close = document.querySelector('.popup-close');

	more.addEventListener('click', function () {
		overlay.style.display = 'block';
		this.classList.add('more-splash');
		document.body.style.overflow = 'hidden';
	});

	more2.forEach(function (elem) {
		elem.addEventListener('click', function () {
			overlay.style.display = 'block';
			this.classList.add('more-splash');
			document.body.style.overflow = 'hidden';
		});
	});

	close.addEventListener('click', function (elem) {
		overlay.style.display = 'none';
		more.classList.remove('more-splash');
		more2[0].classList.remove('more-splash');
		document.body.style.overflow = '';

		elem.forEach(function (elem) {
			elem.addEventListener('click', function () {
				more2.classList.remove('more-splash');
			});
		});
	});

	//FORMS
	let message = {
		loading: 'Загрузка...',
		success: 'Спасибо! Скоро мы с вами свяжемся!',
		failure: 'Что-то пошло не так...',
		clear: '',
	};

	let form = document.querySelector('.main-form'),
		input = form.getElementsByTagName('input'),
		statusMessage = document.createElement('div'),

		formFooter = document.querySelector('#form'),
		inputs = formFooter.getElementsByTagName('input'),
		btn = formFooter.querySelector('#btn'),
		statusMessageFooter = document.createElement('div');

	statusMessage.classList.add('status');

	statusMessageFooter.classList.add('status');
	statusMessageFooter.style.color = '#fff';
	statusMessageFooter.style.marginTop = '10px';

	function sendForm(elem) {
		elem.addEventListener('submit', function (e) {
			e.preventDefault();

			if (elem === form) {
				elem.appendChild(statusMessage);
			}

			btn.before(statusMessageFooter);

			let formData = new FormData(elem);

			function postData(data) {
				return new Promise(function (resolve, reject) {
					let request = new XMLHttpRequest();
					request.open('POST', 'server.php');
					request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

					request.addEventListener('readystatechange', function () {
						if (request.readyState < 4) {
							resolve();
						} else if (request.readyState === 4) {
							if (request.status < 300 && request.status == 200) {
								resolve();
							} else {
								reject();
							}
						}
					});
					request.send(data);
				});
			} //End postData

			function clearInput() {
				for (let i = 0; i < input.length; i++) {
					input[i].value = '';
				}
			}

			function clearInputFooter() {
				for (let i = 0; i < inputs.length; i++) {
					inputs[i].value = '';
				}
			}

			postData(formData)
				.then(() => statusMessage.innerHTML = message.loading)
				.then(() => statusMessage.innerHTML = message.success)
				.then(() => setTimeout(() => statusMessage.innerHTML = message.clear, 5000))
				.then(() => statusMessageFooter.innerHTML = message.loading)
				.then(() => statusMessageFooter.innerHTML = message.success)
				.then(() => setTimeout(() => statusMessageFooter.innerHTML = message.clear, 5000))
				.catch(() => statusMessage.innerHTML = message.failure)
				.catch(() => statusMessageFooter.innerHTML = message.failure)
				.then(clearInput)
				.then(clearInputFooter);
		});
	}
	sendForm(form);
	sendForm(formFooter);

	//SLIDER
	// let slideIndex = 1, //Тот слайд, который показывается в текущий момент
	// 	slides = document.querySelectorAll('.slider-item'),
	// 	prev = document.querySelector('.prev'),
	// 	next = document.querySelector('.next'),
	// 	dotsWrap = document.querySelector('.slider-dots'),
	// 	dots = document.querySelectorAll('.dot');

	// showSlides(slideIndex);

	// function showSlides(n) {
	// 	if (n > slides.length) {
	// 		slideIndex = 1;
	// 	}

	// 	if (n < 1) {
	// 		slideIndex = slides.length;
	// 	}

	// 	slides.forEach((item) => item.style.display = 'none');
	// 	// for (let i = 0; i < slides.length; i++) { 					//ТОЖЕ ЧТО И ВЫШЕ
	// 	// 	slides[i].style.display = 'none';
	// 	// }

	// 	dots.forEach((item) => item.classList.remove('dot-active'));

	// 	slides[slideIndex - 1].style.display = 'block';
	// 	dots[slideIndex - 1].classList.add('dot-active');
	// }

	// function plusSlides(n) {
	// 	showSlides(slideIndex += n);
	// }

	// function currentSlide(n) { //ОПРЕДЕЛЯЕТ ТЕКУЩИЙ СЛАЙД
	// 	showSlides(slideIndex = n); //И УСТАНАВЛИВАЕТ ЕГО
	// }

	// prev.addEventListener('click', function () {
	// 	plusSlides(-1);
	// });

	// next.addEventListener('click', function () {
	// 	plusSlides(1);
	// });

	// dotsWrap.addEventListener('click', function (event) {
	// 	for (let i = 0; i < dots.length + 1; i++) {
	// 		if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
	// 			currentSlide(i);
	// 		}
	// 	}
	// });

	let sliderIndex = 1,
		slides = document.querySelectorAll('.slider-item'),
		prev = document.querySelector('.prev'),
		next = document.querySelector('.next'),
		wrap = document.querySelector('.slider-dots'),
		dots = document.querySelectorAll('.dot');

	showSlides(sliderIndex);

	function showSlides(n) {
		if (n > slides.length) {
			sliderIndex = 1;
		}

		if (n < 1) {
			sliderIndex = slides.length;
		}

		slides.forEach((item) => item.style.display = 'none');
		dots.forEach((item) => item.classList.remove('dot-active'));

		slides[sliderIndex - 1].style.display = 'block';
		dots[sliderIndex - 1].classList.add('dot-active');
	}

	function plusSlide(n) {
		showSlides(sliderIndex += n); //!!!!!!!!!!!!!!!!!!
	}

	function currentSlide(n) {
		showSlides(sliderIndex = n);
	}

	prev.addEventListener('click', function () {
		plusSlide(-1);
	});

	next.addEventListener('click', function () {
		plusSlide(1);
	});

	wrap.addEventListener('click', function (event) {
		for (let i = 0; i <= dots.length; i++) {
			if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
				currentSlide(i);
			}
		}
	});

	//CALC
	let persons = document.querySelectorAll('.counter-block-input')[0],
		restDays = document.querySelectorAll('.counter-block-input')[1],
		place = document.getElementById('select'),
		totalValue = document.getElementById('total'),
		personsSum = 0,
		daysSum = 0,
		total = 0;

	persons.addEventListener('input', function () {
		personsSum = +this.value;
		total = (daysSum + personsSum) * 4000;

		if (restDays.value == '' || (daysSum + personsSum) * 4000 <= 4000) {
			totalValue.innerHTML = 0;
		} else {
			totalValue.innerHTML = total;
		}
	});

	restDays.addEventListener('input', function () {
		daysSum = +this.value;
		total = (daysSum + personsSum) * 4000;

		if (persons.value == '' || (daysSum + personsSum) * 4000 <= 4000) {
			totalValue.innerHTML = 0;
		} else {
			totalValue.innerHTML = total;
		}
	});

	place.addEventListener('change', function () {
		if (restDays.value == '' || persons.value == '') {
			totalValue.innerHTML = 0;
		} else {
			let a = total;
			totalValue.innerHTML = a * this.options[this.selectedIndex].value;
		}
	});

});