angular.module('sl.carousel', ['ngSanitize'])
  
  .directive('slCarousel', function() {
    return {
      restrict: 'A',
      replace: false,
      controller: 'slCarouselCtrl',
      scope: {
        slCarouselItems: '=',
        slCarouselItemOffset: '='
      },

      template: 
        '<div class="sl-carousel-container clearfix">' +

          '<div class="viewport clearfix">' +

            '<div class="clearfix" ng-repeat="item in slCarouselItems"' +  
              ' sl-carousel-item' +
              ' sl-carousel-item-img-src="item.imgSrc"' +
              ' sl-carousel-item-title="item.title" ' +
              ' sl-carousel-item-description="item.description">' +
            '</div>' +

        '</div>',

      link: function($scope, $element, $attrs, slCarouselCtrl) {
        slCarouselCtrl.viewport($element);
        slCarouselCtrl.viewportWidth($element);
        slCarouselCtrl.$element = $element;
      }
    }  
  })

  .directive('slCarouselItem', function() {
    return {
      restrict: 'A',
      replace: true,
      require: '^slCarousel',
      scope: {
        imgSrc: '=slCarouselItemImgSrc',
        title: '=slCarouselItemTitle',
        description: '=slCarouselItemDescription' 
      },

      template: 
        '<div class="item-wrapper">' +

          /* img */
          '<div class="item-img-wrapper">' +
            '<img ng-src="{{imgSrc}}" />' +
          '</div>' +

          /* title */
          '<h3 class="item-title">{{title}}</h3>' +

          /* description */
          '<p class="item-description">{{description}}</p>' +
        '</div>',

      link: function($scope, $element, $attrs, slCarouselCtrl) {

        function _width($el) {
          var width = parseInt($el.width(), 10),
              paddingLeft = parseInt($el.css('padding-left'), 10),
              paddingRight = parseInt($el.css('padding-right'), 10),
              marginLeft = parseInt($el.css('margin-left'), 10),
              marginRight = parseInt($el.css('margin-right'), 10),
              borderLeft = parseInt($el.css('borderLeftWidth'), 10),
              borderRight = parseInt($el.css('borderRightWidth'), 10);

          width += paddingLeft + paddingRight;
          width += marginLeft + marginRight;
          width += borderLeft + borderRight;
          return width;
        }

        $scope.active = function(isActive) {
          var $el = this._$el;

          if(isActive === true) {
            $el.addClass('active');
          }
          else if(isActive === false) {
            $el.removeClass('active');
          }
        };

        $scope.extend = function(obj) {
          angular.extend(this, obj);
        };        

        $scope.addNextListener = function(){
          var $el = this._$el;
          $el.on('click.slcarousel', function() {
            slCarouselCtrl.next();
          });
          $el.addClass('control next');
        };

        $scope.removeNextListener = function() {
          var $el = this._$el;
          $el.off('click.slcarousel');
          $el.removeClass('control next');
        };

        $scope.addPreviousListener = function() {
          var $el = this._$el;
          $el.on('click.slcarousel', function() {
            slCarouselCtrl.previous();
          });
          $el.addClass('control previous');
        };

        $scope.removePreviousListener = function() {
          var $el = this._$el;
          $el.off('click.slcarousel');
          $el.removeClass('control previous');
        };

        $scope.reset = function() {
          this.active(false);
          this.removeNextListener();
          this.removePreviousListener();         
        };

        $scope.width = function() {
          return _width(this._$el); 
        }  

        $scope.extend({
          _$el: $element
        });

        slCarouselCtrl.addSlide($scope, $element); 
      }
    } 
  })

  .controller('slCarouselCtrl', function($scope, $window) {
    var self = this,
        slides = self.slides || [],
        currentIndex = 0,
        itemOffset = $scope.slCarouselItemOffset || 0,
        _$viewport,
        _oldViewportWidth,
        currentTimeout;

    self.currentSlide = null;

    

    function _attachNextPreviousListeners(slide, index) {

      // slide on the left
      if(index === currentIndex - 1) {
        slide.addPreviousListener();
      }

      // slide on the right
      if(index === currentIndex + 1) {
        slide.addNextListener()
      }
    }

    function _getLeft(slide) {
      var index = (typeof slide._index === 'number') ? slide._index : slides.length,
          slideWidth = slide.width(),
          centerSlideAxis = slideWidth/2,
          centerViewportAxis = self.viewportWidth()/2,
          oldLeft = slide._left,
          baseLeft = index*slideWidth + (centerViewportAxis - centerSlideAxis) + index*itemOffset,
          newLeft = baseLeft;

          return newLeft;
    }

    self.addSlide = function(slide, $el) {

      var newLeft = _getLeft(slide);
      slide.extend({
        _left: newLeft,
        _index: slides.length
      });

      $scope.min = true;

      if(slides.length == 0) {
        $scope.max = true;
        slide.active(true);
      }
      else if(slides.length == 1) {
        slide.addNextListener()
      }
      else {
        $scope.max = false;
      }

      $el.css({
        left: newLeft
      });

      slides.push(slide);
    };

    self.move = function(slide, direction) {
      var $el = slide._$el,
          slideWidth = slide.width(),
          oldLeft = slide._left,
          _index = slide._index;

      var newLeft;
      if(direction === 'left') {
        newLeft = oldLeft - slideWidth - itemOffset;
        _index -= 1;
      }
      else {
        newLeft = oldLeft + slideWidth + itemOffset;
        _index += 1;
      }

      $el.css({
        left: newLeft
      });

      angular.extend(slide, { 
        _left: newLeft, 
        _index: _index
      });
    };

    self.viewport = function($carouselElement) {

      if($carouselElement) {
        _$viewport = $carouselElement.find('.viewport');
      }

      return _$viewport;
    }

    self.viewportWidth = function() {
      var $viewport = self.viewport(),
          width;
      if(!$viewport || $viewport.length === 0) {
        return 0;
      }

      width = $viewport.width();
      if(typeof width === 'number') {
        return width;
      }
    };

    self.next = function() {
      var currentSlide = slides[currentIndex];

      if(currentSlide) {
        currentSlide.reset();
      }

      if(currentIndex == slides.length - 2) {
        $scope.max = true;
      }
      else if(currentIndex == slides.length - 1) {
        console.log('reached max');
        return;
      }
      currentIndex += 1;
      $scope.min = false;


      angular.forEach(slides, function(slide, index) {
        slide.reset();
        if(index === currentIndex) {
          slide.active(true);
        }
        _attachNextPreviousListeners(slide, index);
        self.move(slide, 'left');
      });


    };

    self.previous = function() {
      var currentSlide = slides[currentIndex];

      if(currentSlide) {
        currentSlide.reset();
      }

      if(currentIndex == 1) {
        $scope.min = true;
      }
      else if(currentIndex == 0) {
        console.log("reached min");
        return;
      }
      currentIndex -= 1;
      $scope.max = false;

      angular.forEach(slides, function(slide, index) {
        slide.reset();
        if(index === currentIndex) {
          slide.active(true);
        }
        _attachNextPreviousListeners(slide, index); 
        self.move(slide, 'right');
      })
    }

    angular.element($window).bind('resize', function() {

      angular.forEach(slides, function(slide, index) {
        var newLeft = _getLeft(slide),
            $el = slide._$el;

        slide.extend({
          _left: newLeft
        });

        $el.css({
          left: newLeft
        });
      });
    });

  });