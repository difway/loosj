String.prototype.hasString = function(a) {
    if (typeof a == "object") {
        for (var b = 0, c = a.length; b < c; b++) if (!this.hasString(a[b])) return false;
        return true
    } else if (this.indexOf(a) != -1) return true
};
window.DBUI || (DBUI = {
    ajax: function() {},
    get: function(a, b, c) {
        if (window.ActiveXObject) var d = new ActiveXObject("Microsoft.XMLHTTP");
        else if (window.XMLHttpRequest) d = new XMLHttpRequest;
        d.onreadystatechange = function() {
            if (d.readyState == 4) c(d.responseText);
            else return false
        };
        if (b != undefined) a += "?" + b;
        d.open("GET", a, true);
        d.send(null)
    },
    getScript: function(a, b) {
        var c = DBUI.DC("script");
        if (b) if (DBUI.B.ie) c.onreadystatechange = function() {
            if (c.readyState == "loaded" || c.readyState == "complete") b()
        };
        else c.onload = b;
        DBUI.A(c, "type", 
        "text/javascript");
        DBUI.A(c, "src", a);
        DBUI.GT(document, "head")[0].appendChild(c)
    },
    parseUrl: function(a) {
        var b = document.location.href,
        c = {};
        a = a || "?";
        if (!b.hasString(a)) return c;
        a = b.split(a)[1].split("&");
        for (b = 0; b < a.length; b++) {
            var d = a[b].split("=");
            c[d[0]] = DBUI.B.ie ? d[1] : d[1]
        }
        return c
    },
    cookie: function(a, b, c) {
        if (b == undefined) {
            a = a + "=";
            b = document.cookie.split(";");
            for (c = 0; c < b.length; c++) {
                for (var d = b[c]; d.charAt(0) == " ";) d = d.substring(1, d.length);
                if (d.indexOf(a) == 0) return decodeURIComponent(d.substring(a.length, 
                d.length))
            }
            return null
        } else {
            d = "";
            if (c) {
                d = new Date;
                d.setTime(d.getTime() + c * 24 * 60 * 60 * 1E3);
                d = "; expires=" + d.toGMTString()
            }
            document.cookie = a + "=" + b + d + "; path=/"
        }
    },
    animate: function(a, b, c, d, e) {
        e = e || 0.4;
        var f = b.hasString("scroll"),
        h,
        j = setInterval(function() {
            var g = f ? a[b] : DBUI.C(a, b),
            i;
            if (b == "opacity") {
                g *= 100;
                c *= 100;
                if (c > 100) c = 100
            } else f || (g = g == "auto" ? 0: Number(g.slice(0, -2)));
            if (Math.abs(c - g) < 3 || f && h == g) {
                g = c;
                clearInterval(j)
            }
            i = h = g + (c - g) * e;
            if (f) a[b] = parseInt(i);
            else DBUI.C(a, b, b != "opacity" ? i + "px": i / 100 + "");
            if (g == 
            c) if (DBUI.isString(d)) eval(d);
            else d && d()
        },
        40);
        return j
    },
    getX: function(a) {
        return a.offsetParent ? a.offsetLeft + DBUI.getX(a.offsetParent) : a.offsetLeft
    },
    getY: function(a) {
        return a.offsetParent ? a.offsetTop + DBUI.getY(a.offsetParent) : a.offsetTop
    },
    within: function(a, b) {
        var c = DBUI.getX(b) - DBUI.scrollX(),
        d = DBUI.width(b) + c,
        e = DBUI.getY(b) - DBUI.scrollY();
        b = DBUI.height(b) + e;
        var f = {};
        if (a[0] > c && a[0] < d && a[1] > e && a[1] < b) {
            if (a[0] - c < (d - c) / 2) f.left = true;
            if (a[1] - e < (b - e) / 2) f.top = true;
            return f
        }
    },
    frameX: function(a) {
        return a.frameElement ? DBUI.getX(a.frameElement) + 
        DBUI.frameX(a.parent) : 0
    },
    frameY: function(a) {
        return a.frameElement ? DBUI.getY(a.frameElement) + DBUI.frameY(a.parent) : 0
    },
    width: function(a) {
        return parseInt(a.offsetWidth)
    },
    height: function(a) {
        return parseInt(a.offsetHeight)
    },
    pageWidth: function() {
        return document.body.scrollWidth || document.documentElement.scrollWidth
    },
    pageHeight: function() {
        return document.body.scrollHeight || document.documentElement.scrollHeight
    },
    windowWidth: function() {
        var a = document.documentElement;
        return self.innerWidth || a && a.clientWidth || document.body.clientWidth
    },
    windowHeight: function() {
        var a = document.documentElement;
        return self.innerHeight || a && a.clientHeight || document.body.clientHeight
    },
    scrollX: function(a) {
        var b = document.documentElement;
        if (a) {
            var c = a.parentNode,
            d = a.scrollLeft || 0;
            if (a == b) d = DBUI.scrollX();
            return c ? d + DBUI.scrollX(c) : d
        }
        return self.pageXOffset || b && b.scrollLeft || document.body.scrollLeft
    },
    scrollY: function(a) {
        var b = document.documentElement;
        if (a) {
            var c = a.parentNode,
            d = a.scrollTop || 0;
            if (a == b) d = DBUI.scrollY();
            return c ? d + DBUI.scrollY(c) : d
        }
        return self.pageYOffset || 
        b && b.scrollTop || document.body.scrollTop
    },
    scrollTo: function(a, b, c) {
        if (a == document.documentElement || a == document.body) return window.scrollTo(b, c)
    },
    hide: function(a) {
        if (!a) return false;
        if (DBUI.isString(a)) a = this.G(a);
        var b = this.C(a, "display");
        if (b != "none") a.__curDisplay = b;
        a.style.display = "none"
    },
    show: function(a) {
        if (!a) return false;
        if (DBUI.isString(a)) a = this.G(a);
        a.style.display = a.__curDisplay || ""
    },
    toggle: function(a) {
        if (DBUI.isString(a)) a = this.G(a);
        this.C(a, "display") == "none" ? this.show(a) : this.hide(a)
    },
    hasClass: function(a, 
    b) {
        if (!a.className) return false;
        return a.className != a.className.replace(new RegExp("\\b" + b + "\\b"), "")
    },
    addClass: function(a, b) {
        if (a.className) if (this.hasClass(a, b)) return false;
        else a.className += " " + b;
        else a.className = b
    },
    removeClass: function(a, b) {
        a.className = a.className.replace(new RegExp("\\b" + b + "\\b"), "")
    },
    toggleClass: function(a, b) {
        this.hasClass(a, b) ? this.removeClass(a, b) : this.addClass(a, b)
    },
    next: function(a) {
        a = a.nextSibling;
        if (a == null) return false;
        return DBUI.isElement(a) ? a: this.next(a)
    },
    prev: function(a) {
        a = 
        a.previousSibling;
        if (a == null) return false;
        return DBUI.isElement(a) ? a: this.prev(a)
    },
    remove: function(a) {
        a && a.parentNode && a.parentNode.removeChild(a)
    },
    append: function(a, b) {
        b.appendChild(a)
    },
    prepend: function(a, b) {
        var c = b.firstChild;
        c ? DBUI.before(a, c) : DBUI.append(a, b)
    },
    after: function(a, b) {
        var c = b.parentNode;
        c.lastChild == a ? c.appendChild(a) : c.insertBefore(a, b.nextSibling)
    },
    before: function(a, b) {
        b.parentNode.insertBefore(a, b)
    },
    replace: function(a, b) {
        b.parentNode.replaceChild(a, b)
    },
    swap: function() {},
    wrap: function(a, 
    b) {
        if (DBUI.isString(a)) {
            a.match(/(<[^\/][^<]*>)/g);
            var c = RegExp.lastMatch;
            a = a.replace(c, c + '<pre class="wrapObject___"></pre>');
            a = DBUI.html(a)[0];
            DBUI.before(a, b);
            DBUI.replace(b, DBUI.GC(a, "pre.wrapObject___")[0])
        } else {
            DBUI.before(a, b);
            b.appendChild(b)
        }
    },
    tmpl: function() {
        var a = {};
        return function b(c, d) {
            c = !/\W/.test(c) ? (a[c] = a[c] || b(DBUI.G(c).innerHTML)) : DBUI.tmplString(c);
            return d ? c(d) : c
        }
    } (),
    tmplString: function(a) {
        return new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + a.replace(/[\r\t\n]/g, 
        " ").split("<%").join("\t").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("\t").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');")
    },
    html: function(a) {
        var b = DBUI.DC("div"),
        c = [];
        b.innerHTML = a;
        DBUI.each(b.childNodes, 
        function(d) {
            c.push(d)
        });
        return c
    },
    parent: function(a, b) {
        if (DBUI.isArray(a)) {
            var c = [];
            DBUI.each(a, 
            function(d) {
                if (b && DBUI.hasClass(d.parentNode, b) || !b) c.push(d.parentNode)
            });
            return c
        }
        return a.parentNode
    },
    parents: function(a, b) {
        if (b) {
            var c = 
            [];
            a = DBUI.parents(a);
            DBUI.each(a, 
            function(d) {
                DBUI.hasClass(d, b) && c.push(d)
            });
            return c
        }
        a = a.parentNode;
        return a.nodeName == "HTML" ? [a] : [a].concat(DBUI.parents(a))
    },
    children: function(a, b) {
        var c = [];
        if (b) b = b.split("|");
        DBUI.each(a.childNodes, 
        function(d) {
            var e = false;
            if (b) for (var f = 0, h = b.length; f < h; f++) if (DBUI.hasClass(d, b[f])) {
                e = true;
                break
            }
            if (DBUI.isElement(d) && (!b || e)) c.push(d)
        });
        return c
    },
    A: function(a, b, c) {
        if (c == undefined) return a.getAttribute(b);
        else c == "" ? a.removeAttribute(b) : a.setAttribute(b, c)
    },
    C: function(a, b, c) {
        if (c == 
        undefined) if (a.currentStyle) {
            if (b == "opacity") return a.style.filter.indexOf("opacity=") >= 0 ? parseFloat(a.style.filter.match(/opacity=([^)]*)/)[1]) / 100: "1";
            return a.currentStyle[b]
        } else {
            if (window.getComputedStyle) {
                b = b.replace(/([A-Z])/g, "-$1");
                b = b.toLowerCase();
                return window.getComputedStyle(a, null).getPropertyValue(b)
            }
        } else if (b == "opacity" && DBUI.B.ie) a.style.filter = (a.filter || "").replace(/alpha\([^)]*\)/, "") + "alpha(opacity=" + c * 100 + ")";
        else a.style[b] = c
    },
    DC: function(a) {
        return document.createElement(a)
    },
    E: function(a) {
        if (a && a.clone) return a;
        a = window.event || a;
        return {
            clone: true,
            stop: function() {
                if (a && a.stopPropagation) a.stopPropagation();
                else a.cancelBubble = true
            },
            prevent: function() {
                if (a && a.preventDefault) a.preventDefault();
                else a.returnValue = false
            },
            target: a.target || a.srcElement,
            x: a.clientX || a.pageX,
            y: a.clientY || a.pageY,
            button: a.button,
            key: a.keyCode,
            shift: a.shiftKey,
            alt: a.altKey,
            ctrl: a.ctrlKey,
            type: a.type,
            wheel: a.wheelDelta / 120 || -a.detail / 3
        }
    },
    EA: function(a, b, c, d) {
        if (DBUI.isString(a)) {
            var e = c;
            c = function() {
                eval(e)
            }
        }
        if (a.addEventListener) {
            if (b == 
            "mousewheel") b = "DOMMouseScroll";
            a.addEventListener(b, c, d);
            return true
        } else return a.attachEvent ? a.attachEvent("on" + b, c) : false
    },
    ER: function(a, b, c) {
        if (a.removeEventListener) {
            a.removeEventListener(b, c, false);
            return true
        } else return a.detachEvent ? a.detachEvent("on" + b, c) : false
    },
    G: function(a) {
        return document.getElementById(a)
    },
    GT: function(a, b) {
        return a.getElementsByTagName(b)
    },
    GC: function(a, b) {
        var c,
        d,
        e = [];
        if (arguments.length == 1) {
            c = a.split(".");
            a = document
        } else c = b.split(".");
        d = c[0] == "" ? "*": c[0];
        c.shift();
        d = this.GT(a, d);
        for (var f = 0 in c) c[f] = "&" + c[f] + "&";
        f = 0;
        for (b = d.length; f < b; f++)("&" + d[f].className.replace(/ /g, "& &") + "&").hasString(c) && e.push(d[f]);
        return e.length > 0 ? e: false
    },
    isObject: function(a) {
        return typeof a == "object"
    },
    isElement: function(a) {
        return a && a.nodeType == 1
    },
    isUndefined: function(a) {
        return typeof a == "undefined"
    },
    isFunction: function(a) {
        return this.getType(a) == "Function"
    },
    isNumber: function(a) {
        return this.getType(a) == "Number"
    },
    isString: function(a) {
        return this.getType(a) == "String"
    },
    isArray: function(a) {
        return this.getType(a) == 
        "Array"
    },
    getType: function(a) {
        return Object.prototype.toString.call(a).slice(8, -1)
    },
    has: function(a, b) {
        for (var c = 0, d = a.length; c < d; c++) if (a[c] == b) return true;
        return false
    },
    each: function(a, b) {
        if (DBUI.isUndefined(a[0])) for (var c in a) DBUI.isFunction(a[c]) || b(c, a[c]);
        else {
            c = 0;
            for (var d = a.length; c < d; c++) DBUI.isFunction(a[c]) || b(a[c], c)
        }
    },
    map: function(a, b) {
        if (DBUI.isString(b)) b = eval("(function(a,i) { return " + b + "})");
        var c = [];
        DBUI.each(a, 
        function(d, e) {
            d = b(d, e);
            if (DBUI.isArray(d)) c = c.concat(d);
            else c.push(d)
        });
        return c
    },
    grep: function(a, b) {
        if (DBUI.isString(b)) b = eval("(function(a,i) { return " + b + "})");
        var c = [];
        DBUI.each(a, 
        function(d, e) {
            b(d, e) && c.push(d)
        });
        return c
    },
    merge: function(a, b) {
        var c = [];
        if (b) {
            DBUI.each(b, 
            function(d) {
                DBUI.has(a, d) || c.push(d)
            });
            return a.concat(c)
        } else {
            DBUI.each(a, 
            function(d) {
                DBUI.has(c, d) || c.push(d)
            });
            return c
        }
    },
    apart: function(a, b) {
        var c = [];
        DBUI.each(a, 
        function(d) {
            DBUI.has(b, d) || c.push(d)
        });
        return c
    },
    sort: {
        number: function(a, b) {
            return a - b
        },
        numberDesc: function(a, b) {
            return b - a
        },
        string: function(a, b) {
            return a.localeCompare(b)
        },
        stringDesc: function(a, b) {
            return b.localeCompare(a)
        }
    },
    ready: function(a) {
        if (DBUI.ready.done) return a();
        if (DBUI.ready.timer) DBUI.ready.ready.push(a);
        else {
            DBUI.ready.ready = [a];
            DBUI.ready.timer = setInterval(DBUI.isReady, 13)
        }
    },
    isReady: function() {
        if (DBUI.ready.done) return false;
        if (document && document.getElementsByTagName && document.getElementById && document.body) {
            clearInterval(DBUI.ready.timer);
            DBUI.ready.timer = null;
            for (var a = 0; a < DBUI.ready.ready.length; a++) DBUI.ready.ready[a]();
            DBUI.ready.ready = null;
            DBUI.ready.done = true
        }
    },
    B: function() {
        var a = 
        {},
        b = navigator.userAgent;
        a.ie6 = b.hasString("MSIE 6") && !b.hasString("MSIE 7") && !b.hasString("MSIE 8");
        a.ie = b.hasString("MSIE");
        return a
    } ()
});
DBUI.B.ie && document.execCommand("BackgroundImageCache", false, true);
DBUI.ImageDetail = {
    _title: DBUI.G("imgTitle"),
    _current: DBUI.G("imgCurrent"),
    _currentCache: DBUI.DC("div"),
    _currentCover: DBUI.G("imgCover"),
    _prev: DBUI.G("imgPrev"),
    _next: DBUI.G("imgNext"),
    _prevBtn: DBUI.G("imgPrevBtn"),
    _nextBtn: DBUI.G("imgNextBtn"),
    _prevPage: DBUI.G("imgPrevPage"),
    _nextPage: DBUI.G("imgNextPage"),
    _imgFull: DBUI.G("imgFull"),
    _imgAll: DBUI.G("imgAll"),
    _location: DBUI.G("imgLocation"),
    _numTotal: DBUI.G("imgNumTotal"),
    _numTotal2: DBUI.G("imgNumTotal2"),
    _numCurrent: DBUI.G("imgNumCurrent"),
    _list: DBUI.G("imgList"),
    _listAll: DBUI.G("imgListAll"),
    _box: DBUI.G("imgBox"),
    _class: {
        p: "prev_disable",
        n: "next_disable"
    },
    config: {
        numPerPage: 5,
        heightPerPage: 655,
        heightPerImg: 131,
        bigImg: {
            width: 798,
            height: 589
        },
        smallImg: {
            width: 110,
            height: 110
        },
        tmpl: '<% for ( var i = 0; i < list.length; i++ ) { %><li><a href="javascript:void(0)" onfocus="this.blur()" onclick="DBUI.ImageDetail.show(<%=i%>,this);return false;"><img rel="<%=list[i][2]%>" onload="DBUI.ImageDetail.positoin(this,1)" title="<%=list[i][1]%>" /></a></li><% } %>',
        tmplList: '<% for ( var i = 0; i < list.length; i++ ) { %><li><a href="javascript:void(0)" onfocus="this.blur()" onclick="DBUI.ImageDetail.showBox(<%=i%>,this);return false;" class="box" style="background-image:url(<%=list[i][2].replace(/3\\./gi,"2.")%>)"></a><a href="javascript:void(0)" onclick="DBUI.ImageDetail.showBox(<%=i%>,this);return false;" class="txt"><%=list[i][1]%></a></li><% } %>',
        tmplCache: '<% for ( var i = 0; i < list.length; i++ ) { %><img rel="<%=(DBUI.ImageDetail.urlRule ? DBUI.ImageDetail.urlRule(list[i][2]) : list[i][3])%>" onload="this.loaded = true"/><% } %>'
    },
    delay: {},
    init: function(a) {
        function b() {
            var d = c.data;
            c._location.innerHTML = d[0];
            c.list = d[1];
            if (!c.list.length) return false;
            c.numTotal = c.list.length;
            if (a.current) {
                DBUI.hide(c._listAll.parentNode);
                c.listImg = DBUI.GT(c._list, "img");
                c.current = a.current == 0 ? d[1][0][0] : a.current;
                c.pageTotal = Math.ceil(c.numTotal / c.config.numPerPage);
                c.getIndex();
                c.buildList(0);
                c._list.builded = true;
                c.numTotal == 1 && DBUI.hide(c._imgAll)
            } else {
                DBUI.hide(c._imgAll);
                DBUI.hide(c._box);
                c.buildList(1);
                c._listAll.builded = true
            }
            c._currentCache.innerHTML = (new DBUI.tmplString(c.config.tmplCache))({
                list: d[1]
            });
            c.show(c.index);
            setTimeout(function() {
                DBUI.scrollTo(document.body, 0, DBUI.getY(c._numTotal))
            },
            0)
        }
        var c = this;
        this._prev.onclick = this._prevBtn.onclick = function() {
            c.prev();
            this.blur();
            return false
        };
        this._next.onclick = this._nextBtn.onclick = function() {
            c.next();
            this.blur();
            return false
        };
        this._prevPage.onclick = function() {
            c.prevPage();
            return false
        };
        this._nextPage.onclick = function() {
            c.nextPage();
            return false
        };
        this._prev.onfocus = this._next.onfocus = this._prevBtn.onfocus = this._nextBtn.onfocus = this._prevPage.onfocus = this._nextPage.onfocus = function() {
            this.blur()
        };
        this._current.onload = function() {
            this.style.margin = "-9999px";
            DBUI.ImageDetail.positoin(this)
        };
        this._imgAll.onclick = function() {
            c.showList()
        };
        DBUI.EA(this._list, "mousewheel", 
        function(d) {
            var e = DBUI.E(d);
            clearTimeout(c.delay.wheel);
            c.delay.wheel = setTimeout(function() {
                e.wheel == 1 ? c.prevPage() : c.nextPage()
            },
            100);
            e.prevent()
        });
        this.animate = a.animate;
        this.loop = a.loop;
        this.urlRule = a.urlRule;
        this.urlRuleBig = a.urlRuleBig;
        this.call = a.call;
        this.index = null;
        this.title = document.title;
        if (DBUI.windowHeight() < 725) {
            this.config.numPerPage = 4;
            this.config.bigImg.height -= this.config.heightPerImg;
            DBUI.addClass(this._box, "photo_box_small")
        }
        a.json ? DBUI.getScript(a.json, b) : b()
    },
    build: function() {
        var a = this.index,
        b = this._class.n,
        c = this._class.p;
        if (!this.list || 
        isNaN(a)) return false;
        var d = this._currentCover;
        DBUI.C(d, "opacity", "1");
        this._title.style.cssText = "display:none;top:50%;";
        this._numTotal.innerHTML = this._numTotal2.innerHTML = this.numTotal;
        this._numCurrent.innerHTML = this.numCurrent = a + 1;
        if (a == null) return false;
        this._title.innerHTML = this.list[a][1];
        this._current.src = this.urlRule ? this.urlRule(this.list[a][2]) : this.list[a][3];
        this._imgFull.href = this.urlRuleBig ? this.urlRuleBig(this.list[a][2]) : this.list[a][3];
        document.title = (this.list[a][1] ? this.list[a][1] + 
        "_": "") + this.title;
        var e = this._currentCache.childNodes;
        this.preload(e[a]);
        this.preload(e[a + 1]);
        a > 0 && this.preload(e[a - 1]);
        e[a].loaded || DBUI.addClass(d, "loading");
        if (!this.loop && a == 0) {
            DBUI.addClass(this._prevBtn, c);
            DBUI.addClass(this._prev, c);
            this._prev.title = ""
        } else {
            DBUI.removeClass(this._prevBtn, c);
            DBUI.removeClass(this._prev, c);
            this._prev.title = DBUI.A(this._prev, "rel")
        }
        if (!this.loop && a == this.numTotal - 1) {
            DBUI.addClass(this._nextBtn, b);
            DBUI.addClass(this._next, b);
            this._next.title = ""
        } else {
            DBUI.removeClass(this._nextBtn, 
            b);
            DBUI.removeClass(this._next, b);
            this._next.title = DBUI.A(this._next, "rel")
        }
        e = this._list.childNodes; (b = e[this.indexTmp]) && DBUI.removeClass(b, "cur");
        DBUI.addClass(e[a], "cur");
        this.indexTmp = a;
        e = document.location.hash.split("=");
        if (e.length) {
            e[e.length - 1] = this.list[a][0];
            document.location.hash = e.join("=")
        }
        e = Math.ceil(this.config.numPerPage / 2) - 1;
        this.indexScroll = a >= e ? a - e: 0;
        this.showPage(this.indexScroll);
        clearInterval(this.delay.page);
        this.delay.page = DBUI.animate(this._list, "scrollTop", this.config.heightPerImg * 
        (a > e ? a - e: 0));
        this.call && this.call()
    },
    buildList: function(a) {
        switch (a) {
        case 0:
            this._list.innerHTML = (new DBUI.tmplString(this.config.tmpl))({
                list: this.data[1]
            });
            break;
        case 1:
            this._listAll.innerHTML = (new DBUI.tmplString(this.config.tmplList))({
                list: this.data[1]
            });
            break
        }
    },
    prev: function() {
        if (this.index > 0) {
            this.index--;
            this.build()
        } else if (this.loop) {
            this.index = this.numTotal - 1;
            this.build()
        }
    },
    next: function() {
        if (this.index < this.numTotal - 1) {
            this.index++;
            this.build()
        } else if (this.loop) {
            this.index = 0;
            this.build()
        }
    },
    prevPage: function() {
        if (this.indexScroll >= 0) {
            var a = this.config.numPerPage,
            b = this.indexScroll - a;
            if (b <= 0) b = this.loop && b == -a ? this.numTotal - a: 0;
            this.showPage(b)
        }
    },
    nextPage: function() {
        if (this.indexScroll < this.numTotal - 1) {
            var a = this.indexScroll + this.config.numPerPage;
            if (a >= this.numTotal) a = this.loop ? 0: this.indexScroll;
            this.showPage(a)
        }
    },
    show: function(a) {
        this.index = a;
        this.build()
    },
    showPage: function(a) {
        var b = this._class.n,
        c = this._class.p,
        d = this.config.numPerPage;
        clearInterval(this.delay.page);
        this.delay.page = 
        DBUI.animate(this._list, "scrollTop", a * this.config.heightPerImg);
        this.indexScroll = a; ! this.loop && this.indexScroll == 0 ? DBUI.addClass(this._prevPage, c) : DBUI.removeClass(this._prevPage, c); ! this.loop && this.numTotal - this.indexScroll <= d ? DBUI.addClass(this._nextPage, b) : DBUI.removeClass(this._nextPage, b);
        a = this.indexScroll - d;
        for (d = this.indexScroll + d; a < d; a++) a >= 0 && this._list.childNodes[a] && this.preload(this.listImg[a])
    },
    showList: function() {
        DBUI.hide(this._box);
        DBUI.show(this._listAll.parentNode);
        DBUI.hide(this._imgAll);
        document.title = 
        this.title;
        if (!this._listAll.builded) {
            this.buildList(1);
            this._listAll.builded = true
        }
        DBUI.addClass(this._listAll.childNodes[this.index], "on")
    },
    showBox: function(a, b) {
        DBUI.show(this._box);
        DBUI.hide(this._listAll.parentNode);
        this.numTotal != 1 && DBUI.show(this._imgAll);
        if (!this._list.builded) {
            this.buildList(0);
            this.listImg = DBUI.GT(this._list, "img");
            this._list.builded = true
        }
        this.index && DBUI.removeClass(this._listAll.childNodes[this.index], "on");
        this.show(a, b)
    },
    getIndex: function(a) {
        for (var b = 0; b < this.numTotal; b++) if (this.list[b][0] == 
        (a || this.current)) return this.index = b
    },
    preload: function(a) {
        if (a) {
            var b = DBUI.A(a, "rel");
            if (b) {
                a.src = b;
                DBUI.A(a, "rel", "")
            }
        }
    },
    positoin: function(a, b) {
        if (!b) {
            DBUI.A(a, "width", "");
            DBUI.A(a, "height", "");
            var c = this._currentCover;
            DBUI.removeClass(c, "loading")
        }
        var d = b ? this.config.smallImg: this.config.bigImg;
        if (a.height > d.height) {
            a.width = a.width * d.height / a.height;
            a.height = d.height
        }
        if (a.width > d.width) {
            a.height = a.height * d.width / a.width;
            a.width = d.width
        }
        a.style.margin = "-" + a.height / 2 + "px 0 0 -" + a.width / 2 + "px";
        if (!b) {
            DBUI.ImageDetail._title.style.cssText += 
            ";display:block;margin-top:" + DBUI.height(a) / 2 + "px;";
            this.animate ? DBUI.animate(c, "opacity", 0, null, 0.6) : DBUI.C(c, "opacity", "0")
        }
    }
};

/*  |xGv00|149503016114cf5576b7d1a75cc44159 */