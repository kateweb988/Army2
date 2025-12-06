document.addEventListener("DOMContentLoaded", () => {
  // Scroll
  $('.go_to').click(function () { // ловим клик по ссылке с классом go_to
    var scroll_el = $(this).attr('href'); // возьмем содержимое атрибута href, должен быть селектором, т.е. например начинаться с # или .
    if ($(scroll_el).length != 0) { // проверим существование элемента чтобы избежать ошибки
      $('html, body').animate({ scrollTop: $(scroll_el).offset().top - 50 }, 800); // анимируем скроолинг к элементу scroll_el
    }
    return false; // выключаем стандартное действие
  });
});
document.addEventListener("DOMContentLoaded", () => {
  $('.menu li .go_to').click(function (event) {
    $('.menu-btn').toggleClass('active');
    $('.menu').toggleClass('active');
    return false;
  });
});
window.addEventListener("DOMContentLoaded", function () {
  [].forEach.call(document.querySelectorAll('.tel'), function (input) {
    var keyCode;
    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) ___ ____",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        new_value = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a
        });
      i = new_value.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3);
        new_value = new_value.slice(0, i)
      }
      var reg = matrix.substr(0, this.value.length).replace(/_+/g,
        function (a) {
          return "\\d{1," + a.length + "}"
        }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
      if (event.type == "blur" && this.value.length < 5) this.value = ""
    }

    input.addEventListener("input", mask, false);
    input.addEventListener("focus", mask, false);
    input.addEventListener("blur", mask, false);
    input.addEventListener("keydown", mask, false)

  });

});
document.addEventListener("DOMContentLoaded", () => {
  var accordeonButtons = document.getElementsByClassName("accordeon__button");

  //пишем событие при клике на кнопки - вызов функции toggle
  for (var i = 0; i < accordeonButtons.length; i++) {
    var accordeonButton = accordeonButtons[i];

    accordeonButton.addEventListener("click", toggleItems, false);
  }

  //пишем функцию
  function toggleItems() {

    // переменная кнопки(актульная) с классом
    var itemClass = this.className;

    // добавляем всем кнопкам класс close
    for (var i = 0; i < accordeonButtons.length; i++) {
      accordeonButtons[i].className = "accordeon__button closed";
    }

    // закрываем все открытые панели с текстом
    var pannels = document.getElementsByClassName("accordeon__panel");
    for (var z = 0; z < pannels.length; z++) {
      pannels[z].style.maxHeight = 0;
    }

    // проверка. если кнопка имеет класс close при нажатии
    // к актуальной(нажатой) кнопке добававляем активный класс
    // а панели - которая находится рядом задаем высоту
    if (itemClass == "accordeon__button closed") {
      this.className = "accordeon__button active";
      var panel = this.nextElementSibling;
      panel.style.maxHeight = panel.scrollHeight + "px";
    }

  }
});
document.addEventListener("DOMContentLoaded", () => {
  $(document).ready(function () {
    $('[data-submit]').on('click', function (e) {
      e.preventDefault();
      $(this).parents('form').submit();
    })
    $.validator.addMethod(
      "regex",
      function (value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
      },
      "Please check your input."
    );
    function valEl(el) {

      el.validate({
        rules: {
          email: {
            required: true,
            email: true
          }
        },
        messages: {
          email: {
            required: 'Заполните поле',
            email: 'Неверный формат E-mail'
          }
        },
        submitHandler: function (form) {
          $('#loader').fadeIn();
          var $form = $(form);
          var $formId = $(form).attr('id');
          switch ($formId) {
            case 'popupResult':
              $.ajax({
                type: 'POST',
                url: $form.attr('action'),
                data: $form.serialize(),
              })
                .always(function (response) {
                  setTimeout(function () {
                    $('#loader').fadeOut();
                  }, 800);
                  window.location = "/thanks.html";

                });
              break;
          }
          return false;
        }
      })
    }

    $('.js-form').each(function () {
      valEl($(this));
    });
    $('[data-scroll]').on('click', function () {
      $('html, body').animate({
        scrollTop: $($.attr(this, 'data-scroll')).offset().top
      }, 2000);
      event.preventDefault();
    })
  });
});
document.addEventListener('DOMContentLoaded', function () {

  // ====================== SWIPER 1 ======================
  const swiper = new Swiper('.swiper1', {
    slidesPerView: 1,
    spaceBetween: 20,

    pagination: {
      el: ".swiper-pagination1",
      clickable: true,
    },

    on: {
      init() {
        updateSwiper1Counter(this);
        updateProgressBar(this);
      },
      slideChange() {
        updateSwiper1Counter(this);
        updateProgressBar(this);
      }
    }
  });

  function updateSwiper1Counter(swiper) {
    const current = document.querySelector('.swiper1-counter .current');
    const total = document.querySelector('.swiper1-counter .total');

    let cur = swiper.realIndex + 1;
    let tot = swiper.slides.length;

    current.textContent = cur < 10 ? `0${cur}` : cur;
    total.textContent = tot < 10 ? `0${tot}` : tot;
  }

  // === прогресс бар для swiper1 ===
  function updateProgressBar(swiper) {
    const bar = document.querySelector(".swiper1-progress-inner");
    const curMob = document.querySelector(".swiper1-progress-current");
    const totMob = document.querySelector(".swiper1-progress-total");

    if (!bar) return;

    let cur = swiper.realIndex + 1;
    let tot = swiper.slides.length;

    const progress = (cur / tot) * 100;
    bar.style.width = progress + "%";

    curMob.textContent = cur < 10 ? `0${cur}` : cur;
    totMob.textContent = tot < 10 ? `0${tot}` : tot;
  }



  // ====================== SWIPER 2 ======================
  const swiper2 = new Swiper('.swiper2', {
    slidesPerView: 3,
    spaceBetween: 43,

    pagination: {
      el: ".swiper-pagination3",
    },

    breakpoints: {
      320: {
        spaceBetween: 0,
        loop: true,
        slidesPerView: 1
      },
      767: {
        spaceBetween: 10,
        slidesPerView: 1
      },
      992: {
        spaceBetween: 20,
        slidesPerView: 1
      },
      1200: {
        spaceBetween: 20,
        slidesPerView: 1
      }
    }
  });



  // ====================== КАСТОМНАЯ ПАГИНАЦИЯ SWIPER 3 ======================
  function updateCustomPagination(swiper) {
    const currentEl = document.querySelector('.swiper-custom-pagination3 .current');
    const totalEl = document.querySelector('.swiper-custom-pagination3 .total');
    const barFill = document.querySelector('.swiper-custom-pagination3 .bar-fill');

    // получаем реальные слайды, исключая дубли
    const realSlides = swiper.wrapperEl.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate)');
    const total = realSlides.length;

    // корректный реальный индекс
    let realIndex = ((swiper.realIndex % total) + total) % total + 1;

    // форматируем 01/02/03
    currentEl.textContent = realIndex.toString().padStart(2, '0');
    totalEl.textContent = total.toString().padStart(2, '0');

    // прогрессбар
    const progress = realIndex / total * 100;
    barFill.style.width = progress + '%';
  }



  // ====================== SWIPER 3 ======================
  const swiper3 = new Swiper('.swiper3', {
    slidesPerView: 2,
    spaceBetween: 20,
    loop: true,

    navigation: {
      nextEl: '.swiper-button-next3',
      prevEl: '.swiper-button-prev3',
    },

    on: {
      init() {
        updateCustomPagination(this);
      },
      slideChange() {
        updateCustomPagination(this);
      }
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 0,
        navigation: false
      },
      767: {
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: false
      },
      992: {
        slidesPerView: 2,
        spaceBetween: 20,
        navigation: {
          nextEl: '.swiper-button-next3',
          prevEl: '.swiper-button-prev3',
        }
      },
      1200: {
        slidesPerView: 2,
        spaceBetween: 20,
        navigation: {
          nextEl: '.swiper-button-next3',
          prevEl: '.swiper-button-prev3',
        }
      }
    }
  });

});
document.addEventListener("DOMContentLoaded", () => {
  let menuBtn = document.querySelector('.menu-btn');
  let menu = document.querySelector('.menu');
  menuBtn.addEventListener('click', function () {
    menuBtn.classList.toggle('active');
    menu.classList.toggle('active');
  });
});
// svg
$(function () {
  jQuery('img.svg').each(function () {
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');

    jQuery.get(imgURL, function (data) {
      // Get the SVG tag, ignore the rest
      var $svg = jQuery(data).find('svg');

      // Add replaced image's ID to the new SVG
      if (typeof imgID !== 'undefined') {
        $svg = $svg.attr('id', imgID);
      }
      // Add replaced image's classes to the new SVG
      if (typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass + ' replaced-svg');
      }

      // Remove any invalid XML tags as per http://validator.w3.org
      $svg = $svg.removeAttr('xmlns:a');

      // Check if the viewport is set, else we gonna set it if we can.
      if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
        $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
      }

      // Replace image with new SVG
      $img.replaceWith($svg);

    }, 'xml');

  });
});
