listenForEvent = function (element, event, callback) {
    //Regular style
		if (element.addEventListener) {
        element.addEventListener(event, callback, false);
    }else 
		//IE Style
		if (element.attachEvent) {
        element.attachEvent('on' + event, callback);
    } 
		//Legacy IE Style
		else {
        element['on' + event] = callback;
    }
};