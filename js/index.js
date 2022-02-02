window.addEventListener('DOMContentLoaded', function () {

  /* ============================================================================
    #SELECT
============================================================================ */

  // Функция для инициализации Choices
  const element = document.querySelector('#select');
  const choices = new Choices(element, {
    searchEnabled: false, //Выключить поиск по select-у
    itemSelectText: '' //Подпись, которая появляется при наведении мышкой на элемент в списке
  });





  /* ============================================================================
      #YANDEX MAPS
  ============================================================================ */

  // Функция ymaps.ready() будет вызвана, когда
  // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
  ymaps.ready(init);
  function init() {
    // Создание карты.
    var myMap = new ymaps.Map("map", {
      // Координаты центра карты.
      // Порядок по умолчанию: «широта, долгота».
      // Чтобы не определять координаты центра карты вручную,
      // воспользуйтесь инструментом Определение координат.
      center: [48.88, 2.35],
      // Уровень масштабирования. Допустимые значения:
      // от 0 (весь мир) до 19.
      zoom: 16,
      controls: []
    });

    //Добавление метки на карту со своей иконкой
    var myPlacemark = new ymaps.Placemark([48.88, 2.35], {}, {
      iconLayout: 'default#image',
      iconImageHref: 'img/map-icon.svg', //url иконки
      iconImageSize: [28, 40] //Размер иконки в px
    });

    //Инициализация метки
    myMap.geoObjects.add(myPlacemark);
  }




  /* ============================================================================
      #SCROLLBAR
  ============================================================================ */

  //Инициализация кастомного скроллбара SimpleBar
  new SimpleBar(document.getElementById('scrollbar'), {
    autoHide: false, //Автоматическое скрытик
    scrollbarMinSize: 80, //Минимальная длина скроллбара
    scrollbarMaxSize: 80 //Маскимальная длина скроллбара
  });





  /* ============================================================================
      #INPUTMASK
  ============================================================================ */

  //Маска на все input'ы с типом 'tel'
  var selector = document.querySelector("input[type='tel']");
  var im = new Inputmask("+7 (999) 999-99-99");
  im.mask(selector);





  /* ============================================================================
      #JustValidate
  ============================================================================ */

  //Инициализация валидатора на поле с id='form'
  const validation = new JustValidate('#form');

  //Правила валидатора
  validation
    //Для поля name
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Введите ваше имя',
      },
      {
        rule: 'minLength',
        value: 2,
        errorMessage: 'Имя может содержать минимум 2 символа',
      },
      {
        rule: 'maxLength',
        value: 10,
        errorMessage: 'Имя может содержать максимум 10 символов',
      },
    ])
    //Для поля tel
    .addField('#tel', [
      {
        rule: 'required',
        errorMessage: 'Введите телефон',
      },
      //Своя проверка формы
      {
        validator: (name, value) => {
          //использование  метода 'unmaskedvalue' для снятия маски
          const phone = selector.inputmask.unmaskedvalue()
          return Number(phone) && phone.length === 10
        },
        errorMessage: 'Неверный телефон',
      },
    ])
    //Для поля mail
    .addField('#mail', [
      {
        rule: 'required',
        errorMessage: 'Введите ваш E-mail',
      },
      {
        rule: 'email',
        errorMessage: 'Неверный E-mail',
      },
    ]);





  /* ============================================================================
  #TOOLTIP
  ============================================================================ */

  tippy('#tooltip', {
    content: 'Глава 2, страница 176',
    animation: 'perspective-extreme',
    theme: 'myTheme'
  });
})
