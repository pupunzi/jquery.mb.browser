jquery.mb.browser
=================

jquery.mb.browser replaces the jQuery $.browser method removed from v. 1.9.
It's hardly recommended to use feature detection instead, but if you need to know what browser and what version this reintroduce the $.browser object that returns all the browser properties:

Ex:

            var txt = ''
                    +'jQuery.browser.ua  = '+jQuery.browser.ua+'<br>'
                    +'jQuery.browser.name  = '+jQuery.browser.name+'<br>'
                    +'jQuery.browser.fullVersion  = '+jQuery.browser.fullVersion+'<br>'
                    +'jQuery.browser.version = '+jQuery.browser.version+'<br><br><br>'
                    +'jQuery.browser.msie = '+jQuery.browser.msie+'<br>'
                    +'jQuery.browser.mozilla = '+jQuery.browser.mozilla+'<br>'
                    +'jQuery.browser.opera = '+jQuery.browser.opera+'<br>'
                    +'jQuery.browser.webkit = '+jQuery.browser.webkit+'<br>';
            $("#result").html(txt);
