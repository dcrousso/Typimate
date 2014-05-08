#A jQuery Plugin for text animations
from the basic typewriter effect to fading drop-down letters

## Download
 Get the [raw](https://raw.github.com/dcrousso/jquery.typimate.js/master/jquery.typimate.js) script, download the complete [package](https://github.com/dcrousso/jquery.typimate.js/zipball/master) or fork it on [GitHub](https://github.com/dcrousso/jquery.typimate.js/).
 [Let me know](http://devinrousso.com/contact) if you used this plugin and had fun with it.


## Installation
Add the following script before your closing ```</body>``` tag:

```<script src="jquery.typimate.min.js"></script>```


## Options

Option | Type | Default | Description | Values
------ | ---- | ------- | ----------- | ------
animation | string | "fade" | Determines the type of animation effect | "fade", "none"
direction | string | "forward" | Direction that animation travels | "forward", "backward", "ends", "middle"
duration | int | 400 | How long each animation takes | Integer
easing | string | "in" | The direction in which the animation progresses | "in", "out", "inOut"
interval | int | 100 | Time between each letter animation | Integer
leaveNoTrace | boolean | true | Toggles whether element is set back to original form | true, false
onComplete | function | $.noop | Function that runs once the animation is complete | Function
onLetter | function | $.noop | Function that runs after each letter animation | Function
timeout | int | 0 | Timeout before starting the animation | Integer


## Initialization

Replace ```element``` with the ID/class of any object with text in it
```javascript
$(element).typimate({
	duration: 400,
	interval: 100,
	timeout: 0
});
```
__Make sure that ```element``` has no other child elements except for text__

## Dependencies

jQuery 1.8
```<script src="//code.jquery.com/jquery-1.8.0.min.js"></script>```


## License

The MIT License (MIT)

Copyright (c) 2014 Devin Rousso