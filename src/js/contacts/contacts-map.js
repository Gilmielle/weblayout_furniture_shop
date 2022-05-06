document.addEventListener('DOMContentLoaded', function() {
  ymaps.ready(init);
  function init(){
    var myMap = new ymaps.Map('contacts-map', {
      center: [55.75460297038668,37.63583578564453],
      zoom: 15,
    });

    const icon = 'images/map-icon.png';
    const iconWidth = 32;
    const iconHeight = 22;

    var MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
      '<div class="custom-balloon">' +
      '<button class="custom-balloon__close">' +
      '<svg class="custom-balloon__close-icon">' + 
      '<use xlink:href="images/sprite.svg#close"></use></svg></button>' +
      '<div class="custom-balloon__tail"></div>' +
      '<div class="custom-balloon-content custom-balloon__content">' +
      '$[[options.contentLayout]]</div></div>', 
      {
        /**
         * Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
         * @function
         * @name build
         */
        build: function () {
            this.constructor.superclass.build.call(this);
            this._$element = $('.custom-balloon', this.getParentElement());
            this.applyElementOffset();
            this._$element.find('.custom-balloon__close')
                .on('click', $.proxy(this.onCloseClick, this));
        },

        /**
         * Удаляет содержимое макета из DOM.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#clear
         * @function
         * @name clear
         */
        clear: function () {
            this._$element.find('.custom-balloon__close')
                .off('click');
            this.constructor.superclass.clear.call(this);
        },

        /**
         * Метод будет вызван системой шаблонов АПИ при изменении размеров вложенного макета.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
         * @function
         * @name onSublayoutSizeChange
         */
        onSublayoutSizeChange: function () {
            MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);
            if(!this._isElement(this._$element)) {
                return;
            }
            this.applyElementOffset();
            this.events.fire('shapechange');
        },

        /**
         * Сдвигаем балун, чтобы "хвостик" указывал на точку привязки.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
         * @function
         * @name applyElementOffset
         */
        applyElementOffset: function () {
            this._$element.css({
                left: -(this._$element[0].offsetWidth / 2),
                top: -(this._$element[0].offsetHeight + this._$element.find('.custom-balloon__tail')[0].offsetHeight)
            });
        },

        /**
         * Закрывает балун при клике на крестик, кидая событие "userclose" на макете.
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
         * @function
         * @name onCloseClick
         */
        onCloseClick: function (e) {
            e.preventDefault();
            this.events.fire('userclose');
        },

        /**
         * Используется для автопозиционирования (balloonAutoPan).
         * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ILayout.xml#getClientBounds
         * @function
         * @name getClientBounds
         * @returns {Number[][]} Координаты левого верхнего и правого нижнего углов шаблона относительно точки привязки.
         */
        getShape: function () {
            if(!this._isElement(this._$element)) {
                return MyBalloonLayout.superclass.getShape.call(this);
            }
            var position = this._$element.position();
            return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
                [position.left, position.top], [
                    position.left + this._$element[0].offsetWidth,
                    position.top + this._$element[0].offsetHeight + this._$element.find('.custom-balloon__tail')[0].offsetHeight
                ]
            ]));
        },

        /**
         * Проверяем наличие элемента (в ИЕ и Опере его еще может не быть).
         * @function
         * @private
         * @name _isElement
         * @param {jQuery} [element] Элемент.
         * @returns {Boolean} Флаг наличия.
         */
        _isElement: function (element) {
            return element && element[0] && element.find('.custom-balloon__tail')[0];
        }
      }
    );

    // Создание вложенного макета содержимого балуна.
    var MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass("$[properties.balloonContentBody]");

    var myGeoObjectCollection = new ymaps.GeoObjectCollection(null, {});

    var myGeoObjects = [
      {
        coords: [55.750615568993275,37.64180899999995],
        name: 'Москва, SitDownPls на Солянке',
        address: 'м. Китай-город, ул. Солянка, д.24',
        htmlContent: 
        '<h2 class="custom-balloon-content__title">SitDownPls на Солянке</h2>' + 
        '<address class="custom-balloon-content__address">м. Китай-город, ул. Солянка, д.24</address>' +
        '<a class="custom-balloon-content__phone" href="tel:+74958854547">' +
        '<svg class="custom-balloon-content__phone-icon">' +
        '<use xlink:href="images/sprite.svg#phone"></use></svg>' +
        '<span>+7 (495) 885-45-47</span></a>' +
        '<div class="custom-balloon-content__info-item custom-balloon-content__opening-hours">' +
        '<span class="custom-balloon-content__info-item-title">Часы работы: </span>с 10:00 до 21:00</div>' +
        '<div class="custom-balloon-content__info-item">' +
        '<span class="custom-balloon-content__info-item-title">Что здесь: </span>' + 
        'шоурум, пункт отгрузки, пункт выдачи, пункт обмена-возврата, сервисный центр</div>'
      },
      {
        coords: [55.759086068985255,37.6451055],
        name: 'Москва, SitDownPls на Покровке',
        address: 'м. Курская, ул. Покровка, д.14',
        htmlContent: 
        '<h2 class="custom-balloon-content__title">SitDownPls на Покровке</h2>' + 
        '<address class="custom-balloon-content__address">м. Курская, ул. Покровка, д.14</address>' +
        '<a class="custom-balloon-content__phone" href="tel:+74958854545">' +
        '<svg class="custom-balloon-content__phone-icon">' +
        '<use xlink:href="images/sprite.svg#phone"></use></svg>' +
        '<span>+7 (495) 885-45-45</span></a>' +
        '<div class="custom-balloon-content__info-item custom-balloon-content__opening-hours">' +
        '<span class="custom-balloon-content__info-item-title">Часы работы: </span>с 9:00 до 20:00</div>' +
        '<div class="custom-balloon-content__info-item">' +
        '<span class="custom-balloon-content__info-item-title">Что здесь: </span>' + 
        'шоурум, пункт выдачи, пункт обмена-возврата</div>'
      },
    ];

    for (var i = 0, l = myGeoObjects.length; i < l; i++) {
      var placemark = myGeoObjects[i];
      myGeoObjectCollection.add(new ymaps.Placemark(
        placemark.coords,
        {
          hintContent: placemark.name,
          balloonContentBody: placemark.htmlContent,
        },
        {
          iconLayout: 'default#image',
          iconImageHref: icon,
          iconImageSize: [iconWidth, iconHeight],
          // balloonLayout: MyBalloonLayout,
          balloonContentLayout: MyBalloonContentLayout,
          hideIconOnBalloonOpen: false,
          balloonPanelMaxMapArea: 0,
          balloonOffset: [3, -40],
        }
      )
    )};

    var serachHint = [];
    myGeoObjects.forEach((obj) => {
      // serachHint.push({
      //   name: obj.name,
      //   address: obj.address,
      // })
      serachHint.push(obj.name)
    });

    find = function (serachHint, find) {
      return serachHint.filter(function (value) {
          return (value + "").toLowerCase().indexOf(find.toLowerCase()) != -1;
      });
    };
    var provider = {
      suggest: function (request, options) {
          var res = find(serachHint, request),
              arrayResult = [],
              results = Math.min(options.results, res.length);
          for (var i = 0; i < results; i++) {
              arrayResult.push({displayName: res[i], value: res[i]})
          }
          return ymaps.vow.resolve(arrayResult);
      }
    };

    var suggestView = new ymaps.SuggestView('suggest', {provider: provider, results: 3, offset: [0, 3]});

    const searchInput = document.getElementById('suggest');
    const suggestForm = document.getElementById('suggest-form');
    const notFound = document.getElementById('not-found');

    suggestForm.addEventListener('submit', function(evt) {
      evt.preventDefault();
      let shouldExit = false;
      myGeoObjectCollection.each((obj) => {
        if ((obj.properties._data.hintContent === searchInput.value) && (!shouldExit)) {
          obj.balloon.open();
          notFound.classList.remove('not-found_active');
          shouldExit = true;
        } else if(!shouldExit) {
          notFound.classList.add('not-found_active');
        }
      })
    })

    myMap.geoObjects.add(myGeoObjectCollection);
    myMap.behaviors.disable('scrollZoom');
  }
});

