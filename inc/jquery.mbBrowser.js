/*___________________________________________________________________________________________________________________________________________________
 _ jquery.mb.components                                                                                                                             _
 _                                                                                                                                                  _
 _ file: jquery.mbBrowser.js                                                                                                                        _
 _ last modified: 11/13/20 7:38 PM                                                                                                                  _
 _                                                                                                                                                  _
 _ Open Lab s.r.l., Florence - Italy                                                                                                                _
 _                                                                                                                                                  _
 _ email: matteo@open-lab.com                                                                                                                       _
 _ site: http://pupunzi.com                                                                                                                         _
 _       http://open-lab.com                                                                                                                        _
 _ blog: http://pupunzi.open-lab.com                                                                                                                _
 _ Q&A:  http://jquery.pupunzi.com                                                                                                                  _
 _                                                                                                                                                  _
 _ Licences: MIT, GPL                                                                                                                               _
 _    http://www.opensource.org/licenses/mit-license.php                                                                                            _
 _    http://www.gnu.org/licenses/gpl.html                                                                                                          _
 _                                                                                                                                                  _
 _ Copyright (c) 2001-2021. Matteo Bicocchi (Pupunzi);                                                                                              _
 ___________________________________________________________________________________________________________________________________________________*/

/*Browser detection patch*/

var nAgt = navigator.userAgent;
jQuery.mbBrowser = {};

jQuery.mbBrowser.mozilla = false;
jQuery.mbBrowser.webkit = false;
jQuery.mbBrowser.opera = false;
jQuery.mbBrowser.safari = false;
jQuery.mbBrowser.chrome = false;
jQuery.mbBrowser.androidStock = false;
jQuery.mbBrowser.msie = false;
jQuery.mbBrowser.edge = false;

jQuery.mbBrowser.ua = nAgt;

function isTouchSupported() {
	var msTouchEnabled = nAgt.msMaxTouchPoints;
	var generalTouchEnabled = "ontouchstart" in document.createElement("div");

	if (msTouchEnabled || generalTouchEnabled) {
		return true;
	}
	return false;
}

var getOS = function(){

	var os = {};
	os.version = "Unknown version";
	os.name = "Unknown OS";
	
	if (navigator.appVersion.indexOf("Win")!=-1)
		os.name="Windows";
	if (navigator.appVersion.indexOf("Mac")!=-1 && navigator.appVersion.indexOf("Mobile") < 0)
		os.name="Mac";
	if (navigator.appVersion.indexOf("Linux")!=-1)
		os.name="Linux";

	/**
	 * MAC
	 */
	if (/Mac OS X/.test(nAgt) && !/Mobile/.test(nAgt)) {
		os.version = /Mac OS X ([\.\_\d]+)/.exec(nAgt)[1];
		os.version = os.version.replace(/_/g, ".").substring(0,5);
	}

	/**
	 * WIN
	 */
	if (/Windows/.test(nAgt))
		os.version = "Unknown.Unknown";

	if (/Windows NT 5.1/.test(nAgt))
		os.version = "5.1"; // XP
	if (/Windows NT 6.0/.test(nAgt))
		os.version = "6.0"; // Vista
	if (/Windows NT 6.1/.test(nAgt))
		os.version = "6.1"; // 7
	if (/Windows NT 6.2/.test(nAgt))
		os.version = "6.2"; // 8
	if (/Windows NT 10.0/.test(nAgt))
		os.version = "10.0"; // 10

	/**
	 * LINUX
	 */
	// Mozilla/5.0 (X11; U; Linux x86_64; en-us) AppleWebKit/531.2+ (KHTML, like Gecko) Version/5.0 Safari/531.2+
	if (/Linux/.test(nAgt) && /Linux/.test(nAgt))
		os.version = "Unknown.Unknown";

	os.name = os.name.toLowerCase();

	os.major_version = "Unknown";
	os.minor_version = "Unknown";

	if(os.version != "Unknown.Unknown"){
		os.major_version = parseFloat(os.version.split(".")[0]);
		os.minor_version = parseFloat(os.version.split(".")[1]);
	}

	return os;
};

jQuery.mbBrowser.os = getOS();
jQuery.mbBrowser.hasTouch = isTouchSupported();
jQuery.mbBrowser.name = navigator.appName;
jQuery.mbBrowser.fullVersion = '' + parseFloat(navigator.appVersion);
jQuery.mbBrowser.majorVersion = parseInt(navigator.appVersion, 10);
var nameOffset, verOffset, ix;

// In Opera, the true version is after "Opera" or after "Version"
if ((verOffset = nAgt.indexOf("Opera")) != -1) {
	jQuery.mbBrowser.opera = true;
	jQuery.mbBrowser.name = "Opera";
	jQuery.mbBrowser.fullVersion = nAgt.substring(verOffset + 6);
	if ((verOffset = nAgt.indexOf("Version")) != -1)
		jQuery.mbBrowser.fullVersion = nAgt.substring(verOffset + 8);
}

// In Opera > 20 the true version is after "OPR"
else if ((verOffset = nAgt.indexOf("OPR")) != -1) {
	jQuery.mbBrowser.opera = true;
	jQuery.mbBrowser.name = "Opera";
	jQuery.mbBrowser.fullVersion = nAgt.substring(verOffset + 4);
}

// In MSIE < 11, the true version is after "MSIE" in userAgent
else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
	jQuery.mbBrowser.msie = true;
	jQuery.mbBrowser.name = "Microsoft Internet Explorer";
	jQuery.mbBrowser.fullVersion = nAgt.substring(verOffset + 5);
}

// In TRIDENT (IE11) => 11, the true version is after "rv:" in userAgent
else if (nAgt.indexOf("Trident") != -1) {
	jQuery.mbBrowser.msie = true;
	jQuery.mbBrowser.name = "Microsoft Internet Explorer";
	var start = nAgt.indexOf("rv:") + 3;
	var end = start + 4;
	jQuery.mbBrowser.fullVersion = nAgt.substring(start, end);
}
else if ( (verOffset = nAgt.indexOf("Edge")) != -1) {
	jQuery.mbBrowser.edge = true;
	jQuery.mbBrowser.name = "Microsoft Edge";
	jQuery.mbBrowser.fullVersion = nAgt.substring(verOffset + 5);
}

// In Chrome, the true version is after "Chrome"
else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
	jQuery.mbBrowser.webkit = true;
	jQuery.mbBrowser.chrome = true;
	jQuery.mbBrowser.name = "Chrome";
	jQuery.mbBrowser.fullVersion = nAgt.substring(verOffset + 7);
}

// Android stock browser
else if (((nAgt.indexOf('mozilla/5.0') > -1 && nAgt.indexOf('android ') > -1 && nAgt.indexOf('applewebkit') > -1) && !(nAgt.indexOf('chrome') > -1))) {

	verOffset = nAgt.indexOf("Chrome");
	jQuery.mbBrowser.webkit = true;
	jQuery.mbBrowser.androidStock = true;
	jQuery.mbBrowser.name = "androidStock";
	jQuery.mbBrowser.fullVersion = nAgt.substring(verOffset + 7);
}

// In Safari, the true version is after "Safari" or after "Version"
else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
	jQuery.mbBrowser.webkit = true;
	jQuery.mbBrowser.safari = true;
	jQuery.mbBrowser.name = "Safari";
	jQuery.mbBrowser.fullVersion = nAgt.substring(verOffset + 7);
	if ((verOffset = nAgt.indexOf("Version")) != -1)
		jQuery.mbBrowser.fullVersion = nAgt.substring(verOffset + 8);
}

// In Safari, the true version is after "Safari" or after "Version"
else if ((verOffset = nAgt.indexOf("AppleWebkit")) != -1) {
	jQuery.mbBrowser.webkit = true;
	jQuery.mbBrowser.safari = true;
	jQuery.mbBrowser.name = "Safari";
	jQuery.mbBrowser.fullVersion = nAgt.substring(verOffset + 7);
	if ((verOffset = nAgt.indexOf("Version")) != -1)
		jQuery.mbBrowser.fullVersion = nAgt.substring(verOffset + 8);
}

// In Firefox, the true version is after "Firefox"
else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
	jQuery.mbBrowser.mozilla = true;
	jQuery.mbBrowser.name = "Firefox";
	jQuery.mbBrowser.fullVersion = nAgt.substring(verOffset + 8);
}

// In most other browsers, "name/version" is at the end of userAgent
else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
	jQuery.mbBrowser.name = nAgt.substring(nameOffset, verOffset);
	jQuery.mbBrowser.fullVersion = nAgt.substring(verOffset + 1);
	if (jQuery.mbBrowser.name.toLowerCase() == jQuery.mbBrowser.name.toUpperCase()) {
		jQuery.mbBrowser.name = navigator.appName;
	}
}

// trim the fullVersion string at semicolon/space if present
if ((ix = jQuery.mbBrowser.fullVersion.indexOf(";")) != -1)
	jQuery.mbBrowser.fullVersion = jQuery.mbBrowser.fullVersion.substring(0, ix);
if ((ix = jQuery.mbBrowser.fullVersion.indexOf(" ")) != -1)
	jQuery.mbBrowser.fullVersion = jQuery.mbBrowser.fullVersion.substring(0, ix);

jQuery.mbBrowser.majorVersion = parseInt('' + jQuery.mbBrowser.fullVersion, 10);
if (isNaN(jQuery.mbBrowser.majorVersion)) {
	jQuery.mbBrowser.fullVersion = '' + parseFloat(navigator.appVersion);
	jQuery.mbBrowser.majorVersion = parseInt(navigator.appVersion, 10);
}
jQuery.mbBrowser.version = jQuery.mbBrowser.majorVersion;


/*Check all mobile environments*/
jQuery.mbBrowser.android = (/Android/i).test(nAgt);
jQuery.mbBrowser.blackberry = (/BlackBerry|BB|PlayBook/i).test(nAgt);
jQuery.mbBrowser.ios = (/iPhone|iPad|iPod|webOS/i).test(nAgt);
jQuery.mbBrowser.operaMobile = (/Opera Mini/i).test(nAgt);
jQuery.mbBrowser.windowsMobile = (/IEMobile|Windows Phone/i).test(nAgt);
jQuery.mbBrowser.kindle = (/Kindle|Silk/i).test(nAgt);

jQuery.mbBrowser.mobile = jQuery.mbBrowser.android || jQuery.mbBrowser.blackberry || jQuery.mbBrowser.ios || jQuery.mbBrowser.windowsMobile || jQuery.mbBrowser.operaMobile || jQuery.mbBrowser.kindle;

jQuery.isMobile = jQuery.mbBrowser.mobile;
jQuery.isTablet = jQuery.mbBrowser.mobile && jQuery(window).width() > 765;

jQuery.isAndroidDefault = jQuery.mbBrowser.android && !(/chrome/i).test(nAgt);

jQuery.mbBrowser = jQuery.mbBrowser;

jQuery.mbBrowser.versionCompare = function(left, right) {

	if (typeof left + typeof right != 'stringstring')
		return false;

	var a = left.split('.')
			,   b = right.split('.')
			,   i = 0, len = Math.max(a.length, b.length);

	for (; i < len; i++) {
		if ((a[i] && !b[i] && parseInt(a[i]) > 0) || (parseInt(a[i]) > parseInt(b[i]))) {
			return 1;
		} else if ((b[i] && !a[i] && parseInt(b[i]) > 0) || (parseInt(a[i]) < parseInt(b[i]))) {
			return -1;
		}
	}

	return 0;
};
