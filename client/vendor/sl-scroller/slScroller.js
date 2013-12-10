angular.module('sl.scroller', [])

  .directive('slScroller', function() {
    return {
      restrict: 'A',
      replace: false,
      scope: {
        slScrollerTopOffset: '=',
        slScrollerTopOffsetElId: '='
      },

      link: function($scope, $element, $attrs) {

        function _getTopOffset() {
          var $topOffsetEl,
              topOffset = 0;

          if($scope.slScrollerTopOffsetElId) {
            $topOffsetEl = $('#' + $scope.slScrollerTopOffsetElId);
            topOffset = $topOffsetEl.height();
          }
          else if($scope.slScrollerTopOffset) {
            topOffset = $scope.slScrollerTopOffset;
          }

          return topOffset;
        }

        function _scrollTo($target) {
          var slScrollerTopOffset = _getTopOffset(),
              offset = $target.offset(),
              topOffset;

          if(offset) {
            topOffset = offset.top - slScrollerTopOffset;
            $('body').animate({scrollTop: topOffset}, "slow");
          }
        }

        angular.element(window).bind('load', function() {
          var hash = this.location.hash;

          var $ref = $(hash);
          _scrollTo($ref);
        });

        $element.on('click', function(e) {

          e.stopPropagation();

          var $btn = $element,
              ref = $btn.attr('href'),
              $ref = $(ref);

          _scrollTo($ref); 
        });
      }
    }  
  });