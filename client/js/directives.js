app.directive('onEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.onEnter);
                });

                event.preventDefault();
            }
        });
    };
});


app.directive("flip", function(flipConfig) {

  function setDim(element, width, height) {
    if (width) {
      element.style.width = width;
    }
    if (height) {
      element.style.height = height;
    }
  }

  return {
    restrict: "E",
    controller: function($scope, $element, $attrs) {
      
      $attrs.$observe("flipShow", function(newValue){
        console.log(newValue);
        if(newValue === "front"){
          showFront();
        }
        else if(newValue === "back"){
          showBack();
        }
        else {
          console.warn("FLIP: Unknown side.");
        }
      });
      
      var self = this;
      self.front = null,
      self.back = null;


      function showFront() {
        self.front.removeClass(flipConfig.classNames.hideFront);
        self.back.addClass(flipConfig.classNames.hideBack);
      }

      function showBack() {
        self.back.removeClass(flipConfig.classNames.hideBack);
        self.front.addClass(flipConfig.classNames.hideFront);
      }

      self.init = function() {
        self.front.addClass(flipConfig.classNames.panel);
        self.back.addClass(flipConfig.classNames.panel);

        showFront();
        
        if(flipConfig.flipsOnClick){
          self.front.on("click", showBack);
          self.back.on("click", showFront);
        }
      }

    },

    link: function(scope, element, attrs, ctrl) {

      var width = attrs.flipWidth,
        height = attrs.flipHeight;

      element.addClass(flipConfig.classNames.base);

      if (ctrl.front && ctrl.back) {
        [element, ctrl.front, ctrl.back].forEach(function(el) {
          setDim(el[0], width, height);
        });
        ctrl.init();
      } else {
        console.error("FLIP: 2 panels required.");
      }
    }
  }

});

app.directive("flipPanel", function() {
  return {
    restrict: "E",
    require: "^flip",
    link: function(scope, element, attrs, flipCtr) {
      if (!flipCtr.front) {
        flipCtr.front = element;
      } else if (!flipCtr.back) {
        flipCtr.back = element;
      } else {
        console.error("FLIP: Too many panels.");
      }
    }
  }
});
