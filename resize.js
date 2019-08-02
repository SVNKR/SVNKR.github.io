function initialise(element) {
	dragElement(element);
	resizeElement(element);
}
function changeRotation(value) {
    var element = document.getElementById('parentDiv');
    var resizerElement = document.getElementById('resizer');
	element.classList.remove("rotate-90");
	element.classList.remove("rotate-180");
    element.classList.remove("rotate-270");
    resizerElement.classList.remove("resizer-bottom-right");
    resizerElement.classList.remove("resizer-top-right");
    resizerElement.classList.remove("resizer-top-left");
    resizerElement.classList.remove("resizer-bottom-left");
	switch(parseInt(value)) {
        case 0:
                resizerElement.classList.add('resizer-bottom-right');
                break;
        case 90: element.classList.add("rotate-90");
                resizerElement.classList.add('resizer-top-right');
				break;
        case 180: element.classList.add("rotate-180");
                resizerElement.classList.add('resizer-top-left');
				break;
        case 270: element.classList.add("rotate-270");
                resizerElement.classList.add('resizer-bottom-left');
				break;
	}
}

    function resizeElement(elmntSelector) {
        var startX = 0, startY = 0, diffX = 0, diffY = 0, original_width = 0, original_height = 0, parent_width = 0, parent_height = 0, max_width = 0, max_height = 0;
        var element = document.getElementById(elmntSelector);
        var parentElement = element.parentNode;
        /* var resizer = document.createElement('div');
        resizer.className = 'resizer';
        resizer.id = "resizerDiv";
        resizer.style.width = '10px';
        resizer.style.height = '10px';
        resizer.style.background = 'red';
        resizer.style.position = 'absolute';
        resizer.style.right = 0;
        resizer.style.bottom = 0;
        resizer.style.cursor = 'se-resize';
        element.appendChild(resizer); */
        document.getElementById('resizer').addEventListener('mousedown', initResize, false);
	
	function initResize(e) {
        e = e || window.event;
		e.preventDefault();	
        element.onmousedown = undefined;
        original_width = element.clientWidth;
        original_height = element.clientHeight;
        original_x = element.getBoundingClientRect().left;
        original_y = element.getBoundingClientRect().top;
        original_offsetleft = element.offsetLeft;
        original_offsettop = element.offsetTop;
        parent_width = parseFloat(getComputedStyle(parentElement, null).getPropertyValue('width').replace('px', ''));
        parent_height = parseFloat(getComputedStyle(parentElement, null).getPropertyValue('height').replace('px', ''));
        max_width = parent_width - original_offsetleft;
        max_height = parent_height - original_offsettop;
        startX = e.clientX;
        startY = e.clientY;
        var rotation = parseInt(document.getElementById('rotationSelect').value);
        switch(rotation) {
			case 0:
                window.addEventListener('mousemove', Resize0deg, false);
				break;
			case 90:
                window.addEventListener('mousemove', Resize90deg, false);
				break;
			case 180:
				window.addEventListener('mousemove', Resize180deg, false);
				break;
			case 270:
				window.addEventListener('mousemove', Resize270deg, false);
				break;
		}
        window.addEventListener('mouseup', stopResize, false);
	}
	
	function Resize0deg(e) {       
        const width = original_width + (e.clientX - startX);
        const height = original_height + (e.clientY - startY);
        if (width < max_width && width > 20) {
            element.style.width = width + 'px';
        }
        if (height < max_height && height > 20) {
            element.style.height = height + 'px';
        }
    }
    
    function Resize90deg(e) {
        const top = original_offsettop - (e.clientX - startX);
        const width = original_width + (e.clientY - startY);
        const height = original_height + (e.clientX - startX);
        if(top > 0 && width > 20 && height> 20) {   
            
            element.style.width = width + 'px';
            element.style.height = height + 'px';
            element.style.top = top + 'px';
        }     
        
    }
    
    function Resize180deg(e) {
        const width = original_width + (e.clientX - startX);
        const height = original_height + (e.clientY - startY);
        const top = original_offsettop - (e.clientY - startY);
        const left = original_offsetleft - (e.clientX - startX);
        if(top > 0 && left > 0  && width > 20 && height> 20) {
            element.style.width = width + 'px';
            element.style.left = left + 'px';
            element.style.height = height + 'px';
            element.style.top = top + 'px';
        }
    }
    
    function Resize270deg(e) {
        const left = original_offsetleft - (e.clientY - startY);
        const height = original_height + (e.clientX - startX);
        const width = original_width + (e.clientY - startY);
        if(left > 0 && (original_offsettop + height) < parent_height  && width > 20 && height> 20) {
            element.style.height = height + 'px';
            element.style.width = width + 'px';
            element.style.left = left + 'px';
        }
    }
    
	function stopResize(e) {
        e = e || window.event;
		e.preventDefault();	
        window.removeEventListener('mousemove', Resize0deg, false);
        window.removeEventListener('mousemove', Resize90deg, false);
        window.removeEventListener('mousemove', Resize180deg, false);
        window.removeEventListener('mousemove', Resize270deg, false);
        window.removeEventListener('mouseup', stopResize, false);

        element.style.top = element.offsetTop/element.parentNode.clientHeight * 100 + "%";
        element.style.left = element.offsetLeft/element.parentNode.clientWidth * 100 + "%";
        element.style.width = (element.clientWidth/element.parentNode.clientWidth) * 100 + "%";
        element.style.height = (element.clientHeight/element.parentNode.clientHeight) * 100 + "%";
		dragElement(elmntSelector);
		console.log("stopResize" + element.clientWidth);
	}
}