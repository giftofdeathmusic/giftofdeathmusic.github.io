// HEADER TIME & DATE

setTime();
setDate();

function setTime() {
	const timeCurrent = new Date();
	let hours = timeCurrent.getHours();
	const minutes = timeCurrent.getMinutes();
	const ampm = hours >= 12 ? "PM" : "AM";

	hours = hours % 12;
	hours = hours ? hours : 12; // Convert 0 to 12

	const timeString = `${hours.toString()}:${minutes.toString().padStart(2, '0')} ${ampm}`;

	document.getElementById("time").textContent = timeString;
}

setInterval(setTime, 1000);

function setDate() {
	var yearCurrent = parseInt(moment().format('YYYY'));
	const yearString = yearCurrent + 20;
	const dateString = moment().format('MMM D') + ", " + yearString;

	document.getElementById("date").textContent = dateString;
}




// HEADER DROPDOWN
function openDropdownHeader() {
	document.getElementById("dropdown-header").classList.toggle("display-inline-block");
}




// Close the header dropdown if the user clicks outside of it
window.ontouchstart = function (event) {
	if (!event.target.matches('.dropdown-btn') && !event.target.matches('.dropdown-btn img') && !event.target.matches('.dropdown-content span')) {
		var dropdownHeader = document.getElementById("dropdown-header");
		if (dropdownHeader.classList.contains('display-inline-block')) {
			dropdownHeader.classList.remove('display-inline-block');
		}
	}
}

window.onclick = function (event) {
	if (!event.target.matches('.dropdown-btn') && !event.target.matches('.dropdown-btn img') && !event.target.matches('.dropdown-content span')) {
		var dropdownHeader = document.getElementById("dropdown-header");
		if (dropdownHeader.classList.contains('display-inline-block')) {
			dropdownHeader.classList.remove('display-inline-block');
		}
	}
}




// HEADER LINKS
function openWindowWallpapers() {
	let windowWallpapers = document.getElementById("window-wallpapers");
	if (!windowWallpapers.classList.contains('display-block')) {
		windowWallpapers.style.top = "45%";
		windowWallpapers.style.left = "50%";
		windowWallpapers.classList.toggle("display-block");
	}
	document.getElementById("dropdown-header").classList.toggle("display-inline-block");
	windowWallpapers.parentNode.appendChild(windowWallpapers);
}

function openWindowCheatCode() {
	let windowCheatCode = document.getElementById("window-cheat-code");
	if (!windowCheatCode.classList.contains('display-block')) {
		windowCheatCode.style.top = "45%";
		windowCheatCode.style.left = "50%";
		windowCheatCode.classList.toggle("display-block");
	}
	document.getElementById("dropdown-header").classList.toggle("display-inline-block");
	windowCheatCode.parentNode.appendChild(windowCheatCode);
}

function openWindowAbout() {
	let windowAbout = document.getElementById("window-about");
	if (!windowAbout.classList.contains('display-block')) {
		windowAbout.style.top = "45%";
		windowAbout.style.left = "50%";
		windowAbout.classList.toggle("display-block");
	}
	document.getElementById("dropdown-header").classList.toggle("display-inline-block");
	windowAbout.parentNode.appendChild(windowAbout);
}




// DESKTOP ICON ACTIONS
function selectIconWelcome() {
	let windowWelcome = document.getElementById("window-welcome");
	if (!windowWelcome.classList.contains('display-block')) {
		windowWelcome.style.top = "45%";
		windowWelcome.style.left = "50%";
		windowWelcome.classList.toggle("display-block");
	}
	windowWelcome.parentNode.appendChild(windowWelcome);
}

function selectIconMembers() {
	let windowMembers = document.getElementById("window-members");
	if (!windowMembers.classList.contains('display-block')) {
		windowMembers.style.top = "45%";
		windowMembers.style.left = "50%";
		windowMembers.classList.toggle("display-block");
	}
	windowMembers.parentNode.appendChild(windowMembers);
}

function selectIconGOD() {
	let windowGOD = document.getElementById("window-god");
	if (!windowGOD.classList.contains('display-block')) {
		windowGOD.style.top = "45%";
		windowGOD.style.left = "50%";
		windowGOD.classList.toggle("display-block");
	}
	windowGOD.parentNode.appendChild(windowGOD);
}




// DECLARE DRAGGABLE WINDOWS
makeDraggable(document.getElementById("window-welcome"));
makeDraggable(document.getElementById("window-members"));
makeDraggable(document.getElementById("window-god"));
makeDraggable(document.getElementById("window-wallpapers"));
makeDraggable(document.getElementById("window-cheat-code"));
makeDraggable(document.getElementById("window-about"));




// DRAG AND CLOSE WINDOWS
function makeDraggable(windowElement) {
	let pos1 = 0,
		pos2 = 0,
		pos3 = 0,
		pos4 = 0;

	let windowDragArea = windowElement.getElementsByClassName("window-drag-area")[0];
	let windowClose = windowElement.getElementsByClassName("window-close")[0];

	//Hide Window if [X] clicked/tapped
	windowClose.onmousedown = function () { hideWindow(windowClose) };
	windowClose.ontouchstart = function () { hideWindow(windowClose) };
	function hideWindow() {
		console.log("close touched");
		windowClose.parentElement.parentElement.classList.toggle("display-block");
	}
	windowClose.ontouchstart = function () { hideWindow(windowClose) };
	function hideWindow() {
		console.log("close touched");
		windowClose.parentElement.parentElement.classList.toggle("display-block");
	}

	//Bring window to front
	windowElement.onmousedown = function () { bringWindowToFront(windowElement) };
	function bringWindowToFront() {
		windowElement.parentNode.appendChild(windowElement);
	}
	windowElement.ontouchstart = function () { bringWindowToFront(windowElement) };
	function bringWindowToFront() {
		windowElement.parentNode.appendChild(windowElement);
	}

	//Window Drag Area
	if (windowDragArea !== undefined) {
		// if there is header, the header is where you move the DIV from
		windowDragArea.onmousedown = dragMouseDown;
		windowDragArea.addEventListener("touchstart", dragMouseDown, false); //added touch event
	} else {
		// otherwise, move the DIV from anywhere inside the DIV
		windowElement.onmousedown = dragMouseDown;
		windowElement.addEventListener("touchstart", dragMouseDown, false); //added touch event
	}

	function dragMouseDown(e) {
		//Bring window to front
		if (!e.target.matches('.window-close')) {
			windowElement.parentNode.appendChild(windowElement);
		}


		console.log("dragMouseDown called by event: ", e.type);
		let x;
		let y;

		//Get touch or click position
		//https://stackoverflow.com/a/41993300/5078983
		if (
			e.type === "touchstart" ||
			e.type === "touchmove" ||
			e.type === "touchend" ||
			e.type === "touchcancel"
		)
		{
			let evt = typeof e.originalEvent === "undefined" ? e : e.originalEvent;
			let touch = evt.touches[0] || evt.changedTouches[0];
			x = touch.pageX;
			y = touch.pageY;
		} else if (
			e.type === "mousedown" ||
			e.type === "mouseup" ||
			e.type === "mousemove" ||
			e.type === "mouseover" ||
			e.type === "mouseout" ||
			e.type === "mouseenter" ||
			e.type === "mouseleave"
		) {
			x = e.clientX;
			y = e.clientY;
		}

		console.log("drag start x: " + x + " y:" + y);

		// get the mouse cursor position at startup:
		pos3 = x;
		pos4 = y;
		document.onmouseup = closeDragElement;
		// document.ontouchend = closeDragElement;
		document.addEventListener("touchend", closeDragElement, false);
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
		// document.ontouchmove = elementDrag;
		document.addEventListener("touchmove", elementDrag, false);
	}

	function elementDrag(e) {
		let x;
		let y;

		//Get touch or click position
		//https://stackoverflow.com/a/41993300/5078983
		if (
			e.type === "touchstart" ||
			e.type === "touchmove" ||
			e.type === "touchend" ||
			e.type === "touchcancel"
		) {
			let evt = typeof e.originalEvent === "undefined" ? e : e.originalEvent;
			let touch = evt.touches[0] || evt.changedTouches[0];
			x = touch.pageX;
			y = touch.pageY;
		} else if (
			e.type === "mousedown" ||
			e.type === "mouseup" ||
			e.type === "mousemove" ||
			e.type === "mouseover" ||
			e.type === "mouseout" ||
			e.type === "mouseenter" ||
			e.type === "mouseleave"
		) {
			x = e.clientX;
			y = e.clientY;
		}

		// calculate the new cursor position:
		pos1 = pos3 - x;
		pos2 = pos4 - y;
		pos3 = x;
		pos4 = y;

		// Restrict movable area
		let container = document.getElementById("main");

		var windowInfo = windowElement.getBoundingClientRect();
		var windowWidth = windowInfo.width;
		var windowHeight = windowInfo.height;

		var containerInfo = container.getBoundingClientRect();
		var containerWidth = containerInfo.width;
		var containerHeight = containerInfo.height;

		newPosTop = windowElement.offsetTop - pos2;
		newPosLeft = windowElement.offsetLeft - pos1;

		if (newPosTop < windowHeight / 2) {
			newPosTop = windowHeight / 2;
		}
		if (newPosTop > containerHeight - (windowHeight / 2)) {
			newPosTop = containerHeight - (windowHeight / 2);
		}
		if (newPosLeft < windowWidth / 2) {
			newPosLeft = windowWidth / 2;
		}
		if (newPosLeft > containerWidth - (windowWidth / 2)) {
			newPosLeft = containerWidth - (windowWidth / 2);
		}

		// set the element's new position:
		windowElement.style.top = newPosTop + "px";
		windowElement.style.left = newPosLeft + "px";
	}

	function closeDragElement() {
		console.log("drag end x: " + pos3 + " y:" + pos4);
		// stop moving when mouse button is released:
		document.onmouseup = null;
		document.ontouchcancel = null; //added touch event
		document.onmousemove = null;
		// document.ontouchend = null; //added touch event
		document.removeEventListener("touchend", closeDragElement, false);
		document.removeEventListener("touchmove", elementDrag, false);
		// document.ontouchmove = null; //added touch event
	}
}




// CHANGE WALLPAPER PREVIEW
let wallpaperPreviewImg = document.getElementById("wallpaper-preview-img");
let wallpaperVideo = document.getElementById("wallpaper-video");
let wallpaperCount = 1;

let headerLi = document.getElementById("header-li");
let headerBlank = document.getElementById("header-blank");
let headerAside = document.getElementById("header-aside");
let desktopIconText = document.getElementsByClassName("desktop-icon-text")

function changeWallpaperPreviewStreet() {
    wallpaperPreviewImg.src = '/images/wallpaper-preview/street.jpg';
	wallpaperCount = 1;
}

function changeWallpaperPreviewAmbient() {
    wallpaperPreviewImg.src = '/images/wallpaper-preview/ambient.jpg';
	wallpaperCount = 2;
}

function changeWallpaperPreviewJellyfish() {
    wallpaperPreviewImg.src = '/images/wallpaper-preview/jellyfish.jpg';
	wallpaperCount = 3;
}

function changeWallpaperPreviewBokeh() {
    wallpaperPreviewImg.src = '/images/wallpaper-preview/bokeh.jpg';
	wallpaperCount = 4;
}

function changeWallpaperPreviewBody() {
    wallpaperPreviewImg.src = '/images/wallpaper-preview/body.jpg';
	wallpaperCount = 5;
}

function changeWallpaperPreviewLovers() {
    wallpaperPreviewImg.src = '/images/wallpaper-preview/lovers.jpg';
	wallpaperCount = 6;
}

function applyWallpaperChange() {
	if (wallpaperCount == 1) {
		wallpaperVideo.src = '/videos/street.mp4';

		Array.from(desktopIconText).forEach(
			function(element, index, array) {
				element.style.color = '#fff';
			}
		);

		if (headerLi.classList.contains('mix-blend-mode-normal')) {
			headerLi.classList.remove('mix-blend-mode-normal');
			headerLi.classList.add('mix-blend-mode-difference');
		}

		if (headerBlank.classList.contains('mix-blend-mode-normal')) {
			headerBlank.classList.remove('mix-blend-mode-normal');
			headerBlank.classList.add('mix-blend-mode-difference');
		}

		if (headerAside.classList.contains('mix-blend-mode-normal')) {
			headerAside.classList.remove('mix-blend-mode-normal');
			headerAside.classList.add('mix-blend-mode-difference');
		}
	}

	if (wallpaperCount == 2) {
		wallpaperVideo.src = '/videos/ambient.mp4';

		Array.from(desktopIconText).forEach(
			function(element, index, array) {
				element.style.color = '#fff';
			}
		);

		if (headerLi.classList.contains('mix-blend-mode-normal')) {
			headerLi.classList.remove('mix-blend-mode-normal');
			headerLi.classList.add('mix-blend-mode-difference');
		}

		if (headerBlank.classList.contains('mix-blend-mode-normal')) {
			headerBlank.classList.remove('mix-blend-mode-normal');
			headerBlank.classList.add('mix-blend-mode-difference');
		}

		if (headerAside.classList.contains('mix-blend-mode-normal')) {
			headerAside.classList.remove('mix-blend-mode-normal');
			headerAside.classList.add('mix-blend-mode-difference');
		}
	}

	if (wallpaperCount == 3) {
		wallpaperVideo.src = '/videos/jellyfish.mp4';

		Array.from(desktopIconText).forEach(
			function(element, index, array) {
				element.style.color = '#fff';
			}
		);

		if (headerLi.classList.contains('mix-blend-mode-difference')) {
			headerLi.classList.remove('mix-blend-mode-difference');
			headerLi.classList.add('mix-blend-mode-normal');
		}

		if (headerBlank.classList.contains('mix-blend-mode-difference')) {
			headerBlank.classList.remove('mix-blend-mode-difference');
			headerBlank.classList.add('mix-blend-mode-normal');
		}

		if (headerAside.classList.contains('mix-blend-mode-difference')) {
			headerAside.classList.remove('mix-blend-mode-difference');
			headerAside.classList.add('mix-blend-mode-normal');
		}
	}

	if (wallpaperCount == 4) {
		wallpaperVideo.src = '/videos/bokeh.mp4';

		Array.from(desktopIconText).forEach(
			function(element, index, array) {
				element.style.color = '#fff';
			}
		);

		if (headerLi.classList.contains('mix-blend-mode-difference')) {
			headerLi.classList.remove('mix-blend-mode-difference');
			headerLi.classList.add('mix-blend-mode-normal');
		}

		if (headerBlank.classList.contains('mix-blend-mode-difference')) {
			headerBlank.classList.remove('mix-blend-mode-difference');
			headerBlank.classList.add('mix-blend-mode-normal');
		}

		if (headerAside.classList.contains('mix-blend-mode-difference')) {
			headerAside.classList.remove('mix-blend-mode-difference');
			headerAside.classList.add('mix-blend-mode-normal');
		}
	}

	if (wallpaperCount == 5) {
		wallpaperVideo.src = '/videos/body.mp4';

		Array.from(desktopIconText).forEach(
			function(element, index, array) {
				element.style.color = '#000';
			}
		);

		if (headerLi.classList.contains('mix-blend-mode-normal')) {
			headerLi.classList.remove('mix-blend-mode-normal');
			headerLi.classList.add('mix-blend-mode-difference');
		}

		if (headerBlank.classList.contains('mix-blend-mode-normal')) {
			headerBlank.classList.remove('mix-blend-mode-normal');
			headerBlank.classList.add('mix-blend-mode-difference');
		}

		if (headerAside.classList.contains('mix-blend-mode-normal')) {
			headerAside.classList.remove('mix-blend-mode-normal');
			headerAside.classList.add('mix-blend-mode-difference');
		}
	}

	if (wallpaperCount == 6) {
		wallpaperVideo.src = '/videos/lovers.mp4';

		Array.from(desktopIconText).forEach(
			function(element, index, array) {
				element.style.color = '#fff';
			}
		);

		if (headerLi.classList.contains('mix-blend-mode-difference')) {
			headerLi.classList.remove('mix-blend-mode-difference');
			headerLi.classList.add('mix-blend-mode-normal');
		}

		if (headerBlank.classList.contains('mix-blend-mode-difference')) {
			headerBlank.classList.remove('mix-blend-mode-difference');
			headerBlank.classList.add('mix-blend-mode-normal');
		}

		if (headerAside.classList.contains('mix-blend-mode-difference')) {
			headerAside.classList.remove('mix-blend-mode-difference');
			headerAside.classList.add('mix-blend-mode-normal');
		}
	}
}

function godOpenAppleMusic() {
	window.open("https://music.apple.com/us/album/g-o-d/1752718743");
}

function godOpenSpotify() {
	window.open("https://open.spotify.com/album/5kYm9gX83VyWzOnNwic9Ju?si=eSb6f3qwS2WiGHI0tWOJ8Q");
}

function godOpenAmazonMusic() {
	window.open("https://amazon.com/music/player/albums/B0D79HXT2V?marketplaceId=ATVPDKIKX0DER&musicTerritory=US");
}