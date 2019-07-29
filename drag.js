
//Make the DIV element draggagle:


function dragElement(elmnt) {
	elmnt = document.getElementById("mydiv");
  	var diffMX = 0, diffMY = 0, startX = 0, startY = 0, diffX = 0, diffY = 0, maxLeft = 0, maxRight = 0, maxTop = 0, maxBottom = 0;
  	elmnt.onmousedown = dragMouseDown;


  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
	var rotation = parseInt(document.getElementById('rotationSelect').value);
	if(rotation === 0 || rotation === 180) {
		startX = e.clientX;
		startY = e.clientY;
	}
	else {
		startX = e.clientX;
		startY = e.clientY;
		console.log("start:" + startX + " " + startY);
	}
    
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
	document.getElementById('test1').innerHTML= e.clientX + "," + e.clientY;
	//set the boundaries of draggability(all values are relative to parent container)
	maxLeft = 0;
	maxRight = elmnt.parentNode.clientWidth - elmnt.offsetWidth;
	maxTop = 0;
	maxBottom = elmnt.parentNode.clientHeight - elmnt.offsetHeight;
	
	var rotation = 0, rotationOffset = 1;
	rotation = parseInt(document.getElementById('rotationSelect').value);
	if(rotation === 0) {
		diffMX = (e.clientX - startX);
		diffMY = (e.clientY - startY);
		startX = e.clientX;
		startY = e.clientY;
	}
	else if(rotation === 90) {
		rotationOffset = -1;
		diffMX = (e.clientY - startY);
		diffMY = rotationOffset * (e.clientX - startX);
		console.log(diffMX + " " + diffMY);
		startX = e.clientX;
		startY = e.clientY;
	}	
	else if(rotation === 180) {
		rotationOffset = -1;
		diffMX = rotationOffset * (e.clientX - startX);
		diffMY = rotationOffset * (e.clientY - startY);
		startX = e.clientX;
		startY = e.clientY;
	}
	else if(rotation === 270) {
		rotationOffset = -1;
		diffMX = rotationOffset * (e.clientY - startY);
		diffMY = (e.clientX - startX);
		startX = e.clientX;
		startY = e.clientY;
	}
    // calculate the new cursor position:
    
	
	//check boundaries
	diffX = (elmnt.offsetLeft + diffMX);
	console.log(elmnt.offsetLeft + "+" + diffMX);
	diffY = (elmnt.offsetTop + diffMY);
	diffX = diffX < maxLeft ? maxLeft : diffX;
	diffX = diffX > maxRight ? maxRight : diffX;
	diffY = diffY < maxTop ? maxTop : diffY;
	diffY = diffY > maxBottom ? maxBottom : diffY;
	
    // set the element's new position:
    elmnt.style.top = diffY/elmnt.parentNode.clientHeight * 100 + "%";
    elmnt.style.left = diffX/elmnt.parentNode.clientWidth * 100 + "%";
	console.log(diffX); 
  }

  function closeDragElement(e) {
    /* stop moving when mouse button is released:*/
	//elementDrag(e);
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
