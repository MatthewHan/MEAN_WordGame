app.filter('range', function(){
   return function(input,total){
      total = parseInt(total);
      for(var i = 1; i<total+1;i++)
         input.push(i);
      return input;
   }
});

app.provider("flipConfig", function() {

  var cssString =
    "<style> \
    .{{flip}} {float: left; overflow: hidden; width: {{width}}; height: {{height}}; }\
    .{{flip}}Panel { \
    position: absolute; \
    width: {{width}}; height: {{height}}; \
    -webkit-backface-visibility: hidden; \
    backface-visibility: hidden; \
    transition: -webkit-transform {{tempo}}; \
    transition: transform {{tempo}}; \
    -webkit-transform: perspective( 800px ) rotateY( 0deg ); \
    transform: perspective( 800px ) rotateY( 0deg ); \
    } \
    .{{flip}}HideBack { \
    -webkit-transform:  perspective(800px) rotateY( 180deg ); \
    transform:  perspective(800px) rotateY( 180deg ); \
    } \
    .{{flip}}HideFront { \
    -webkit-transform:  perspective(800px) rotateY( -180deg ); \
    transform:  perspective(800px) rotateY( -180deg ); \
    } \
    </style> \
    ";

  var _tempo = "0.5s";
  var _width = "100px";
  var _height = "100px";

  var _flipClassName = "flip";
  
  var _flipsOnClick = true;

  this.setTempo = function(tempo) {
    _tempo = tempo;
  };

  this.setDim = function(dim) {
    _width = dim.width;
    _height = dim.height;
  }

  this.setClassName = function(className) {
    _flipClassName = className;
  };
  
  this.flipsOnClick = function(bool){
    _flipsOnClick = bool;
  }

  this.$get = function($interpolate) {

    var interCss = $interpolate(cssString);
    var config = {
      width: _width,
      height: _height,
      tempo: _tempo,
      flip: _flipClassName
    };
  
    document.head.insertAdjacentHTML("beforeend", interCss(config));

    return {
      classNames: {
        base: _flipClassName,
        panel: _flipClassName + "Panel",
        hideFront: _flipClassName + "HideFront",
        hideBack: _flipClassName + "HideBack"
      },
      flipsOnClick : _flipsOnClick
    }
  };
});