'use strict';

window.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');

  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });

    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabcontent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabcontent();

  tabsParent.addEventListener('click', event => {
    const target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabcontent(i);
        }
      });
    }
  });

  // TIMER
  const deadline = '2021-05-14';

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 * 60) % 24)),
      minutes = Math.floor((t / 1000 / 60) % 60),
      seconds = Math.floor((t / 1000) % 60);

    return {
      'total': t,
      days,
      hours,
      minutes,
      seconds
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000, );

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.textContent = getZero(t.days);
      hours.textContent = getZero(t.hours);
      minutes.textContent = getZero(t.minutes);
      seconds.textContent = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock('.timer', deadline);

  // MODAL
  const modalTrigger = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal');

  function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
  }

  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  modalTrigger.forEach((item) => {
    item.addEventListener('click', openModal);
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });

  const modalTimerId = setTimeout(openModal, 50000);

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);

  // MENU
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.classes = classes;
      this.transfer = 27;
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement('div');

      if (this.classes.length === 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }

      element.innerHTML = `
        <img src="${this.src}" alt=${this.alt} class="menu__item-img">
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
      `;
      this.parent.append(element);
    }
  }

  // const getResource = async (url) => {
  //   const res = await fetch(url);

  //   if (!res.ok) {
  //     throw new Error(`Could not fatch ${url}, status: ${res.status}`);
  //   }

  //   return await res.json();
  // };

  // getResource('http://localhost:3000/menu')
  //   .then(data => {
  //     data.forEach(({img, altimg, title, descr, price}) => {
  //       new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
  //     });
  //   });

  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    "Меню \"Фитнес\"",
    "Меню \"Фитнес\" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
    9,
    '.menu .container',
    'menu__item'
  ).render();

  new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    "Меню \"Премиум\"",
    "В меню \"Премиум\" мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
    14,
    '.menu .container',
    'menu__item'
  ).render();

  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    "Меню \"Постное\"",
    "Меню \"Постное\" - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
    21,
    '.menu .container',
    'menu__item'
  ).render();

  //FORMS
  const forms = document.querySelectorAll('form');

  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };

  forms.forEach(item => {
    postData(item);
  });

  function postData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      form.insertAdjacentElement('afterend', statusMessage);

      //ЗАМЕНА НА FETCH
      // const request = new XMLHttpRequest();
      // request.open('POST', 'server.php');

      // FormData + XMLHttpRequest — не нужно писать заголовок, он создаётся автоматически
      //'multipart/form-data' — для FormData

      //для JSON нужен заголовок
      // request.setRequestHeader('Content-type', 'application/json');
      const formData = new FormData(form);

      //FOR JSON, BUT NOT FETCH
      const object = {};
      formData.forEach(function (value, key) {
        object[key] = value;
      });
      // const json = JSON.stringify(object); FOR FETCH

      //Для FormData
      // request.send(formData);

      //ЗАМЕНА НА FETCH 
      // request.send(json);

      fetch('server.php', {
          method: "POST",
          //НИЖЕ КОММЕНТАРИЙ ПОТОМУ ЧТО ЮЗАЕМ НЕ JSON
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(object)

          //FOR NOT JSON
          // body: formData
        })
        .then(data => {
          data.text();
        })
        .then(data => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });

      //ЗАМЕНА НА FETCH
      // request.addEventListener('load', () => {
      //   if (request.status === 200) {
      //     console.log(request.response);
      //     showThanksModal(message.success);
      //     form.reset();
      //     statusMessage.remove();
      //   } else {
      //     showThanksModal(message.failure);
      //   }
      // });

    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close>&times;</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal();
    }, 4000);
  }

  // SLIDER
  let slideNow = 1,
    currentSlideNum = document.querySelector('#current'),
    totalSlidesNum = document.querySelector('#total');

  const slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    slidesField = document.querySelector('.offer__slider-inner'),
    slider = document.querySelector('.offer__slider'),
    allSlides = document.querySelectorAll('.offer__slide'),
    prevSlideBtn = document.querySelector('.offer__slider-prev'),
    nextSlideBtn = document.querySelector('.offer__slider-next'),
    width = window.getComputedStyle(slidesWrapper).width;

  //SLIDER usual
  // showSlides(slideNow);

  if (allSlides.length < 10) {
    totalSlidesNum.textContent = `0${allSlides.length}`;
    currentSlideNum.textContent = `0${slideNow}`;
  } else {
    totalSlidesNum.textContent = allSlides.length;
    currentSlideNum.textContent = slideNow;
  }


  // function showSlides(n) {
  //   if (n > allSlides.length) {
  //     slideNow = 1;
  //   }

  //   if (n < 1) {
  //     slideNow = allSlides.length;
  //   }

  //   allSlides.forEach(slide => {
  //     slide.classList.add('hide');
  //     slide.classList.add('fade');
  //   });

  //   allSlides[slideNow - 1].classList.add('show');
  //   allSlides[slideNow - 1].classList.remove('hide');
  // }

  function changeCurrentSlideNum(slideNow) {
    if (slideNow < 10) {
      currentSlideNum.textContent = `0${slideNow}`;
    } else {
      currentSlideNum.textContent = slideNow;
    }
  }

  // function changeSlide(n) {
  //   showSlides(slideNow += n);
  //   changeCurrentSlideNum(slideNow);
  // }

  // prevSlideBtn.addEventListener('click', () => {
  //   changeSlide(-1);
  // });

  // nextSlideBtn.addEventListener('click', () => {
  //   changeSlide(1);
  // });

  // SLIDER carousel
  slidesField.style.width = 100 * allSlides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '.5s all';

  slidesWrapper.style.overflow = 'hidden';

  allSlides.forEach(slide => {
    slide.style.width = width;
  });

  //DOTS
  slider.style.position = 'relative';

  const indicators = document.createElement('ol'),
    dots = [];

  indicators.classList.add('carousel-indicators');
  indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
  `;

  slider.append(indicators);

  for (let i = 0; i < allSlides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin-right: 3px;
      margin-left: 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .5;
      transition: opacity .6s ease;
    `;

    if (i == 0) {
      dot.style.opacity = 1;
    }

    indicators.append(dot);
    dots.push(dot);
  }

  function dotsOpacity() {
    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideNow - 1].style.opacity = 1;
  }

  function deleteNotDigits(str) {
    return +str.replace(/\D/g, '');
  }

  let offset = 0;

  nextSlideBtn.addEventListener('click', () => {
    if (offset == deleteNotDigits(width) * (allSlides.length - 1)) {
      offset = 0;
    } else {
      offset += deleteNotDigits(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideNow == allSlides.length) {
      slideNow = 1;
    } else {
      slideNow++;
    }

    changeCurrentSlideNum(slideNow);
    dotsOpacity();
  });

  prevSlideBtn.addEventListener('click', () => {
    if (offset == 0) {
      offset = deleteNotDigits(width) * (allSlides.length - 1);
    } else {
      offset -= deleteNotDigits(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideNow == 1) {
      slideNow = allSlides.length;
    } else {
      slideNow--;
    }

    changeCurrentSlideNum(slideNow);
    dotsOpacity();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');

      slideNow = slideTo;
      offset = deleteNotDigits(width) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;

      changeCurrentSlideNum(slideNow);
      dotsOpacity();
    });
  });
});