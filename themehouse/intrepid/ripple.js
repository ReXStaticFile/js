$(document).ready(function(){


  var targetItems = '.button, .u-ripple, .blockLink, .tabs-tab'; //CSS selector

  //Ripple function. Rippler? ripplemaker?
  var makeRipple = function(e){
    var _this = this;
    if (_this.className.indexOf('disabled') !== -1) return;

    var container = _this.querySelector('.ripple-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'ripple-container';
        _this.appendChild(container);
    }
    var containerRect = container.getBoundingClientRect();
    var rippleSize = containerRect.width;

    var newRipple = document.createElement('div');
    newRipple.className = "ripple";
    newRipple.style.width = rippleSize + 'px';
    newRipple.style.height = rippleSize + 'px';
    newRipple.style.top = (e.clientY - containerRect.top - (rippleSize / 2)) + 'px';
    newRipple.style.left = (e.clientX - containerRect.left - (rippleSize / 2)) + 'px';

    container.appendChild(newRipple);

    setTimeout(function(){
      container.removeChild(container.children[0]);
    }, 1000);

  };

  //Ripple on mousedown
  var buttons = document.querySelectorAll(targetItems);
  for (var i = 0; i < buttons.length; i++) {



    var _this = buttons[i];



    if (typeof(_this.className) !== 'undefined' && _this.className.indexOf('JsOnly') === -1 && _this.className.indexOf('DisableOnSubmit') === -1) {

	    if (_this.tagName === 'INPUT') {
		var btn = document.createElement('button');

		for(var x = 0, len = _this.attributes.length; x < len; ++x){
			var nodeName  = _this.attributes.item(x).nodeName;
			var nodeValue = _this.attributes.item(x).nodeValue;
			btn.setAttribute(nodeName, nodeValue);
		}

		btn.innerHTML = _this.innerHTML + _this.value;

		if (_this.parentNode) {
			_this.parentNode.replaceChild(btn, _this);
			_this= btn;
		}
	    }
	    _this.className += ' rippleButton';
	    _this.addEventListener('mousedown', makeRipple);

	    _this.addEventListener('click', function(e){

		    var href = _this.href;

		    if (href && _this.className.indexOf('OverlayTrigger') === -1) {
		      var mouseDownAt = new Date().getTime();
		      var clickHandler = function(e){
		        e.preventDefault();
		        var clickAt = new Date().getTime();
		        var difference = clickAt - mouseDownAt;
		        if (difference < 400) {
		          setTimeout(function(){ window.location.href = href; }, 400-difference)
		        } else {
		          window.location.href = href;
		        }
		        _this.removeEventListener('click', clickHandler);
		      }
		      _this.addEventListener('click', clickHandler);
		    }
	    });
	}
  }
});
