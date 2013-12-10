angular.module('seraphlab', ['sl.carousel', 'sl.scroller'])

  .controller('SeraphLabCtrl', function($scope) {

    $scope.app = {
      name: 'Seraph Lab',
      
      carouselItemOffset: 50,
      bannerTopOffset: 86,
      bannerElId: 'banner'
    };
  })

  .controller('HomeCtrl', function($scope) {

    $scope.home = {
      /**
       * @var label
       * section label 
       */
      label: 'Home'

    };
  })

  /**
   * ProductsCtrl - Products Controller
   */
  .controller('ProductsCtrl', function($scope) {

    $scope.products = {

      /**
       * @var label
       * section label
       */
      label: 'Products',

      /**
       * @var offset
       * number of pixels to offset product items
       */
      offset: $scope.app.carouselItemOffset,

      /**
       * @var items
       * product item list
       */
      items: [{
        title: 'Test',
        imgSrc: 'test.png',
        description: 'This is a test'
      }, {
        title: 'Another Test',
        imgSrc: 'anothertest.png',
        description: 'One more time'
      }, {
        title: 'One More Test',
        imgSrc: 'onemoretest.png',
        description: 'Is this the last one?'
      }]

    };
  })

  /**
   * AppsCtrl - Apps Controller
   */
  .controller('AppsCtrl', function($scope) {

    $scope.apps = {

      /**
       * @var label
       * section label
       */
      label: 'Apps',

      /**
       * @var offset
       * number of pixels to offset product items
       */
      offset: $scope.app.carouselItemOffset,

      /**
       * @var items
       * product item list
       */
      items: [{
        title: 'Test',
        imgSrc: 'test.png',
        description: 'This is a test'
      }, {
        title: 'Another Test',
        imgSrc: 'anothertest.png',
        description: 'One more time'
      }, {
        title: 'One More Test',
        imgSrc: 'onemoretest.png',
        description: 'Is this the last one?'
      }]
    };
  })

  /**
   * TechniquesCtrl - Techniques Controller
   */
  .controller('TechniquesCtrl', function($scope) {

    $scope.techniques = {

      /**
       * @var label
       * section label
       */
      label: 'Techniques',

      /**
       * @var offset
       * number of pixels to offset product items
       */
      offset: $scope.app.carouselItemOffset,

      /**
       * @var items
       * product item list
       */
      items: [{
        title: 'Test',
        imgSrc: 'test.png',
        description: 'This is a test'
      }, {
        title: 'Another Test',
        imgSrc: 'anothertest.png',
        description: 'One more time'
      }, {
        title: 'One More Test',
        imgSrc: 'onemoretest.png',
        description: 'Is this the last one?'
      }] 
    };

  })

  .controller('ThisCtrl', function($scope) {

    $scope._this = {

      /**
       * @var label
       * section label
       */
      label: '{this}'

      
    }

  })



