/*
The MIT License (MIT)

Copyright (c) 2014 Devin Rousso

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
(function($) {
	$.fn.typimate = function ( options ) {
		var settings = {
			animation: "fade",
			duration: 400,
			easing: "in",
			interval: 100,
			onComplete: $.noop,
			onLetter: $.noop,
			timeout: 0
		};
		if (options) $.extend(settings, options);
		var target = $(this);

		function splitTextIntoChars(e) {
			var element = $(e);
			var chars = element.text().split("");
			var spans = [];
			for(var i = 0; i < chars.length; i++) {
				spans.push("<span>" + chars[i] + "</span>");
			}
			element.html(spans);
		}
		function getChars(e) {
			var element = $(e);
			var children = element.children();
			setAnimation(children);
			return children;
		}
		function typeChar(e) {
			var element = $(e);
			animation(element);
		}
		function setAnimation(e) {
			if(settings.animation == "none") {
				settings.duration = 0;
			} else {
				settings.duration = 400;
			}
			if(settings.easing == "out") {
				e.css({"opacity":1});
				animation = outAnimation;
			} else if(settings.easing == "inOut") {
				e.css({"opacity":0});
				animation = inOutAnimation;
			} else {
				e.css({"opacity":0});
				animation = inAnimation;
			}
		}
		function animation(e) {}
		function inAnimation(e){
			e.animate({"opacity":1}, settings.duration);
		}
		function outAnimation(e){
			e.animate({"opacity":0}, settings.duration);
		}
		function inOutAnimation(e){
			inAnimation(e);
			setTimeout(function(){
				outAnimation(e);
			}, settings.timeout + settings.interval);
		}
		
		splitTextIntoChars(target);
		var spans = getChars(target);
		var index = 0;
		setTimeout(function() {
			var interval = setInterval(function(){
				typeChar(spans[index]);
				index++;
				settings.onLetter();
				if(index == spans.length) {
					clearInterval(interval);
					settings.onComplete();
				}
			}, settings.interval);
		}, settings.timeout);

		return this;
	};
})(jQuery);