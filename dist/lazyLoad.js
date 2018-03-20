;(function definelazyLoad(global, factory) {
    var lazyLoad = {};
    lazyLoad = factory(global, lazyLoad);
    if (typeof exports === 'object' && exports && typeof exports.nodeName !== 'string') {
        global.lazyLoad = lazyLoad;
        module.exports = lazyLoad
    } else if (typeof define === 'function' && define.amd) {
        global.lazyLoad = lazyLoad;
        define(['exports'], lazyLoad)
    } else {
        global.lazyLoad = lazyLoad
    }
})(this, function (global, undefined) {
    'use strict';
    var imgList = [], delay, offset, time, scrollDom, lastTime, _selector;

    function _isShow(el) {
        var coords = el.getBoundingClientRect();
        return ((coords.top >= 0 && coords.left >= 0 && coords.top) <= (global.innerHeight || document.documentElement.clientHeight) + parseInt(offset))
    }

    function _loadImage() {
        for (var i = 0; i < imgList.length;) {
            var el = imgList[i];
            if (_isShow(el)) {
                el.src = el.getAttribute('data-src');
                el.className = el.className.replace(new RegExp("(\\s|^)" + _selector.substring(1, _selector.length) + "(\\s|$)"), " ");
                imgList.splice(i, 1)
            } else {
                i++
            }
        }
    }

    function _delay() {
        var nowTime = new Date().getTime();
        if ((nowTime - (lastTime || 0) > 100) && !delay) {
            lastTime = nowTime;
            clearTimeout(delay);
            delay = setTimeout(function () {
                _loadImage();
                clearTimeout(delay);
                delay = null
            }, time)
        }
    }

    function ImageLazyload(selector, options) {
        var defaults = {};
        _selector = '.jhlazyload';
        if (typeof selector == 'string') {
            _selector = selector || '.jhlazyload';
            defaults = options || {}
        } else if ("object" == typeof selector) {
            defaults = selector || {}
        }
        offset = defaults.offset || 0;
        time = defaults.time || 250;
        scrollDom = defaults.scrollDom || global;
        this.getNode();
        _delay();
        if (defaults.iScroll) {
            defaults.iScroll.on('scroll', _delay);
            defaults.iScroll.on('scrollEnd', _delay)
        } else {
            scrollDom.addEventListener('scroll', _delay, false)
        }
    }

    ImageLazyload.prototype.getNode = function () {
        imgList = [];
        var nodes = document.querySelectorAll(_selector);
        for (var i = 0, l = nodes.length; i < l; i++) {
            imgList.push(nodes[i])
        }
    };
    return ImageLazyload
});