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
			direction: "forward",
			duration: 400,
			easing: "in",
			interval: 100,
			leaveNoTrace: true,
			onComplete: $.noop,
			onLetter: $.noop,
			scramble: false,
			timeout: 0
		};
		if (options) $.extend(settings, options);
		var target = $(this);
		var html = target.html();
		var animation;
		var counter;
		if(settings.scramble) {
			var scrambleChars = "`1234567890-=qwertyuiop[]\asdfghjkl;'zxcvbnm,./~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:\"ZXCVBNM<>?";
		}

		function splitTextIntoChars(e) {
			var chars = e.text().split("");
			e.empty();
			for(var i = 0; i < chars.length; i++) {
				e.append("<span>" + chars[i] + "</span>");
			}
		}
		function getChars(e) {
			var children = e.children();
			animation = setAnimation(children);
			counter = setCounter(children);
			return children;
		}
		function setAnimation(e) {
			if(settings.animation === "none") {
				settings.duration = 0;
			}
			if(settings.easing === "out") {
				e.css({"opacity":1});
				return outAnimation;
			} else if(settings.easing === "inOut") {
				e.css({"opacity":0});
				return inOutAnimation;
			} else {
				e.css({"opacity":0});
				return inAnimation;
			}
		}
		function inAnimation(e, callback) {
			e.animate({"opacity":1}, settings.duration, callback);
		}
		function outAnimation(e, callback) {
			e.animate({"opacity":0}, settings.duration, callback);
		}
		function inOutAnimation(e, callback) {
			inAnimation(e, $.noop);
			setTimeout(function(){
				outAnimation(e, callback);
			}, settings.timeout + settings.interval);
		}
		function scramble(e) {
			var t = e.text();
			var count = 0;
			var interval = setInterval(function() {
				var rnum = Math.round(Math.random() * scrambleChars.length);
				e.text(scrambleChars[rnum]);
				if(count > 10) {
					e.text(t);
					clearInterval(interval);
				}
				count++;
			}, 50);
		}
		function setCounter(e) {
			if(settings.direction === "backward") {
				return {
					count: e.length - 1,
					end: e.length - 1,
					dir: -1,
					mirror: false
				};
			} else if (settings.direction === "ends") {
				return {
					count: 0,
					end: e.length / 2,
					dir: 1,
					mirror: true
				};
			} else if (settings.direction === "middle") {
				return {
					count: Math.floor(e.length / 2),
					end: e.length - 1,
					dir: -1,
					mirror: true
				};
			} else {
				return {
					count: 0,
					end: e.length - 1,
					dir: 1,
					mirror: false
				};
			}
		}
		
		splitTextIntoChars(target);
		var spans = getChars(target);
		var completed = 0;
		var first = counter.count;
		setTimeout(function() {
			var interval = setInterval(function() {
				var complete = function() {
					settings.onLetter();
					if(completed >= spans.length - 1) {
						clearInterval(interval);
						settings.onComplete();
						if(settings.leaveNoTrace) {
							if($(spans[first]).css("opacity") == 0) {
								target.css({"opacity":0});
							}
							target.html(html);
						}
					}
					completed ++;
				}
				if(counter.count <= counter.end) {
					var e = $(spans[counter.count]);
					animation(e, complete);
					if(settings.scramble) {
						scramble(e);
					}
					if(counter.mirror){
						var eMirror = $(spans[spans.length - 1 - counter.count])
						animation(eMirror, complete);
						if(settings.scramble) {
							scramble(eMirror);
						}
					}
				}
				counter.count += counter.dir;
			}, settings.interval);
		}, settings.timeout);

		return this;
	};
})(jQuery);