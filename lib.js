/* Theme by mobantu.com */
// Infinite Ajax Scroll, a jQuery plugin 1.0.2
(function(e) {
	"use strict";
	Date.now = Date.now || function() {
		return +(new Date)
	}, e.ias = function(t) {
		function u() {
			var t;
			i.onChangePage(function(e, t, r) {
				s && s.setPage(e, r), n.onPageChange.call(this, e, r, t)
			});
			if (n.triggerPageThreshold > 0) a();
			else if (e(n.next).attr("href")) {
				var u = r.getCurrentScrollOffset(n.scrollContainer);
				E(function() {
					p(u)
				})
			}
			return s && s.havePage() && (l(), t = s.getPage(), r.forceScrollTop(function() {
				var n;
				t > 1 ? (v(t), n = h(!0), e("html, body").scrollTop(n)) : a()
			})), o
		}

		function a() {
			c(), n.scrollContainer.scroll(f)
		}

		function f() {
			var e, t;
			e = r.getCurrentScrollOffset(n.scrollContainer), t = h(), e >= t && (m() >= n.triggerPageThreshold ?
				(l(), E(function() {
					p(e)
				})) : p(e))
		}

		function l() {
			n.scrollContainer.unbind("scroll", f)
		}

		function c() {
			e(n.pagination).hide()
		}

		function h(t) {
			var r, i;
			return r = e(n.container).find(n.item).last(), r.size() === 0 ? 0 : (i = r.offset().top + r
			.height(), t || (i += n.thresholdMargin), i)
		}

		function p(t, r) {
			var s;
			s = e(n.next).attr("href");
			if (!s) return n.noneleft && e(n.container).find(n.item).last().after(n.noneleft), l();
			if (n.beforePageChange && e.isFunction(n.beforePageChange) && n.beforePageChange(t, s) === !1)
				return;
			i.pushPages(t, s), l(), y(), d(s, function(t, i) {
				var o = n.onLoadItems.call(this, i),
					u;
				o !== !1 && (e(i).hide(), u = e(n.container).find(n.item).last(), u.after(i), e(i)
						.fadeIn()), s = e(n.next, t).attr("href"), e(n.pagination).replaceWith(e(n
						.pagination, t)), b(), c(), s ? a() : l(), n.onRenderComplete.call(this, i),
					r && r.call(this)
			})
		}

		function d(t, r, i) {
			var s = [],
				o, u = Date.now(),
				a, f;
			i = i || n.loaderDelay, e.get(t, null, function(t) {
				o = e(n.container, t).eq(0), 0 === o.length && (o = e(t).filter(n.container).eq(0)),
					o && o.find(n.item).each(function() {
						s.push(this)
					}), r && (f = this, a = Date.now() - u, a < i ? setTimeout(function() {
						r.call(f, t, s)
					}, i - a) : r.call(f, t, s))
			}, "html")
		}

		function v(t) {
			var n = h(!0);
			n > 0 && p(n, function() {
				l(), i.getCurPageNum(n) + 1 < t ? (v(t), e("html,body").animate({
					scrollTop: n
				}, 400, "swing")) : (e("html,body").animate({
					scrollTop: n
				}, 1e3, "swing"), a())
			})
		}

		function m() {
			var e = r.getCurrentScrollOffset(n.scrollContainer);
			return i.getCurPageNum(e)
		}

		function g() {
			var t = e(".pagination-loading");
			return t.size() === 0 && (t = e('<div class="pagination-loading">' + n.loader + "</div>"), t
			.hide()), t
		}

		function y() {
			var t = g(),
				r;
			n.customLoaderProc !== !1 ? n.customLoaderProc(t) : (r = e(n.container).find(n.item).last(), r
				.parent().after(t), t.fadeIn())
		}

		function b() {
			var e = g();
			e.remove()
		}

		function w(t) {
			var r = e(".pagination-trigger");
			return r.size() === 0 && (r = e('<div class="pagination-trigger"><a href="javascript:;">' + n
				.trigger + "</a></div>"), r.hide()), e("a", r).unbind("click").bind("click", function() {
				return S(), t.call(), !1
			}), r
		}

		function E(t) {
			var r = w(t),
				i;
			n.customTriggerProc !== !1 ? n.customTriggerProc(r) : (i = e(n.container).find(n.item).last(), i
				.parent().after(r), r.fadeIn())
		}

		function S() {
			var e = w();
			e.remove()
		}
		var n = e.extend({}, e.ias.defaults, t),
			r = new e.ias.util,
			i = new e.ias.paging(n.scrollContainer),
			s = n.history ? new e.ias.history : !1,
			o = this;
		u()
	}, e.ias.defaults = {
		container: "#container",
		scrollContainer: e(window),
		item: ".item",
		pagination: "#pagination",
		next: ".next",
		noneleft: !1,
		loader: '<img src="../img/loader.gif"/>',
		loaderDelay: 600,
		triggerPageThreshold: 3,
		trigger: "Load more items",
		thresholdMargin: 0,
		history: !0,
		onPageChange: function() {},
		beforePageChange: function() {},
		onLoadItems: function() {},
		onRenderComplete: function() {},
		customLoaderProc: !1,
		customTriggerProc: !1
	}, e.ias.util = function() {
		function i() {
			e(window).load(function() {
				t = !0
			})
		}
		var t = !1,
			n = !1,
			r = this;
		i(), this.forceScrollTop = function(i) {
			e("html,body").scrollTop(0), n || (t ? (i.call(), n = !0) : setTimeout(function() {
				r.forceScrollTop(i)
			}, 1))
		}, this.getCurrentScrollOffset = function(e) {
			var t, n;
			return e.get(0) === window ? t = e.scrollTop() : t = e.offset().top, n = e.height(), t + n
		}
	}, e.ias.paging = function() {
		function s() {
			e(window).scroll(o)
		}

		function o() {
			var t, s, o, f, l;
			t = i.getCurrentScrollOffset(e(window)), s = u(t), o = a(t), r !== s && (f = o[0], l = o[1], n
		.call({}, s, f, l)), r = s
		}

		function u(e) {
			for (var n = t.length - 1; n > 0; n--)
				if (e > t[n][0]) return n + 1;
			return 1
		}

		function a(e) {
			for (var n = t.length - 1; n >= 0; n--)
				if (e > t[n][0]) return t[n];
			return null
		}
		var t = [
				[0, document.location.toString()]
			],
			n = function() {},
			r = 1,
			i = new e.ias.util;
		s(), this.getCurPageNum = function(t) {
			return t = t || i.getCurrentScrollOffset(e(window)), u(t)
		}, this.onChangePage = function(e) {
			n = e
		}, this.pushPages = function(e, n) {
			t.push([e, n])
		}
	}, e.ias.history = function() {
		function n() {
			t = !!(window.history && history.pushState && history.replaceState), t = !1
		}
		var e = !1,
			t = !1;
		n(), this.setPage = function(e, t) {
			this.updateState({
				page: e
			}, "", t)
		}, this.havePage = function() {
			return this.getState() !== !1
		}, this.getPage = function() {
			var e;
			return this.havePage() ? (e = this.getState(), e.page) : 1
		}, this.getState = function() {
			var e, n, r;
			if (t) {
				n = history.state;
				if (n && n.ias) return n.ias
			} else {
				e = window.location.hash.substring(0, 7) === "#/page/";
				if (e) return r = parseInt(window.location.hash.replace("#/page/", ""), 10), {
					page: r
				}
			}
			return !1
		}, this.updateState = function(t, n, r) {
			e ? this.replaceState(t, n, r) : this.pushState(t, n, r)
		}, this.pushState = function(n, r, i) {
			var s;
			t ? history.pushState({
				ias: n
			}, r, i) : (s = n.page > 0 ? "#/page/" + n.page : "", window.location.hash = s), e = !0
		}, this.replaceState = function(e, n, r) {
			t ? history.replaceState({
				ias: e
			}, n, r) : this.pushState(e, n, r)
		}
	}
})(jQuery);

/**
 * jQuery serializeObject
 * @copyright 2014, macek <paulmacek@gmail.com>
 * @link https://github.com/macek/jquery-serialize-object
 * @license BSD
 * @version 2.3.4
 */
! function(e, r) {
	if ("function" == typeof define && define.amd) define(["exports", "jquery"], function(e, i) {
		return r(e, i)
	});
	else if ("undefined" != typeof exports) {
		var i = require("jquery");
		r(exports, i)
	} else r(e, e.jQuery || e.Zepto || e.ender || e.$)
}(this, function(e, r) {
	function i(e) {
		function r(e, r, i) {
			return e[r] = i, e
		}

		function i(e, i) {
			for (var a, s = e.match(t.key); void 0 !== (a = s.pop());)
				if (t.push.test(a)) {
					var o = n(e.replace(/\[\]$/, ""));
					i = r([], o, i)
				} else t.fixed.test(a) ? i = r([], a, i) : t.named.test(a) && (i = r({}, a, i));
			return i
		}

		function n(e) {
			return void 0 === d[e] && (d[e] = 0), d[e]++
		}

		function a(r) {
			if (!t.validate.test(r.name)) return this;
			var n = i(r.name, r.value);
			return u = e.extend(!0, u, n), this
		}

		function s(r) {
			if (!e.isArray(r)) throw new Error("formSerializer.addPairs expects an Array");
			for (var i = 0, t = r.length; t > i; i++) this.addPair(r[i]);
			return this
		}

		function o() {
			return u
		}

		function f() {
			return JSON.stringify(o())
		}
		var u = {},
			d = {};
		this.addPair = a, this.addPairs = s, this.serialize = o, this.serializeJSON = f
	}
	var t = {
		validate: /^[a-z_][a-z0-9_]*(?:\[(?:\d*|[a-z0-9_]+)\])*$/i,
		key: /[a-z0-9_]+|(?=\[\])/gi,
		push: /^$/,
		fixed: /^\d+$/,
		named: /^[a-z0-9_]+$/i
	};
	return i.patterns = t, i.serializeObject = function() {
		return this.length > 1 ? new Error("jquery-serialize-object can only serialize one form at a time") :
			new i(r).addPairs(this.serializeArray()).serialize()
	}, i.serializeJSON = function() {
		return this.length > 1 ? new Error("jquery-serialize-object can only serialize one form at a time") :
			new i(r).addPairs(this.serializeArray()).serializeJSON()
	}, "undefined" != typeof r.fn && (r.fn.serializeObject = i.serializeObject, r.fn.serializeJSON = i
		.serializeJSON), e.FormSerializer = i, i
});

/*!
 * jQuery Cookie Plugin v1.4.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory)
	} else if (typeof exports === 'object') {
		factory(require('jquery'))
	} else {
		factory(jQuery)
	}
}(function($) {
	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s)
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s)
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value))
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\')
		}
		try {
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s
		} catch (e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value
	}
	var config = $.cookie = function(key, value, options) {
		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);
			if (typeof options.expires === 'number') {
				var days = options.expires,
					t = options.expires = new Date();
				t.setTime(+t + days * 864e+5)
			}
			return (document.cookie = [encode(key), '=', stringifyCookieValue(value), options.expires ?
				'; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' +
				options.path : '', options.domain ? '; domain=' + options.domain : '', options
				.secure ? '; secure' : ''
			].join(''))
		}
		var result = key ? undefined : {};
		var cookies = document.cookie ? document.cookie.split('; ') : [];
		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');
			if (key && key === name) {
				result = read(cookie, value);
				break
			}
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie
			}
		}
		return result
	};
	config.defaults = {};
	$.removeCookie = function(key, options) {
		if ($.cookie(key) === undefined) {
			return false
		}
		$.cookie(key, '', $.extend({}, options, {
			expires: -1
		}));
		return !$.cookie(key)
	}
}));


/* 
 * Lazy Load - jQuery plugin for lazy loading images Version: 1.9.0
 * ====================================================
 */
! function(a, b, c, d) {
	var e = a(b);
	a.fn.lazyload = function(f) {
		function g() {
			var b = 0;
			i.each(function() {
				var c = a(this);
				if (!j.skip_invisible || c.is(":visible"))
					if (a.abovethetop(this, j) || a.leftofbegin(this, j));
					else if (a.belowthefold(this, j) || a.rightoffold(this, j)) {
					if (++b > j.failure_limit) return !1
				} else c.trigger("appear"), b = 0
			})
		}
		var h, i = this,
			j = {
				threshold: 0,
				failure_limit: 0,
				event: "scroll",
				effect: "show",
				container: b,
				data_attribute: "original",
				skip_invisible: !0,
				appear: null,
				load: null,
				placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
			};
		return f && (d !== f.failurelimit && (f.failure_limit = f.failurelimit, delete f.failurelimit), d !== f
				.effectspeed && (f.effect_speed = f.effectspeed, delete f.effectspeed), a.extend(j, f)), h = j
			.container === d || j.container === b ? e : a(j.container), 0 === j.event.indexOf("scroll") && h.bind(j
				.event,
				function() {
					return g()
				}), this.each(function() {
				var b = this,
					c = a(b);
				b.loaded = !1, (c.attr("src") === d || c.attr("src") === !1) && c.attr("src", j.placeholder), c
					.one("appear", function() {
						if (!this.loaded) {
							if (j.appear) {
								var d = i.length;
								j.appear.call(b, d, j)
							}
							a("<img />").bind("load", function() {
								var d = c.data(j.data_attribute);
								c.hide(), c.is("img") ? c.attr("src", d) : c.css("background-image",
										"url('" + d + "')"), c[j.effect](j.effect_speed), b
									.loaded = !0;
								var e = a.grep(i, function(a) {
									return !a.loaded
								});
								if (i = a(e), j.load) {
									var f = i.length;
									j.load.call(b, f, j)
								}
							}).attr("src", c.data(j.data_attribute))
						}
					}), 0 !== j.event.indexOf("scroll") && c.bind(j.event, function() {
						b.loaded || c.trigger("appear")
					})
			}), e.bind("resize", function() {
				g()
			}), /iphone|ipod|ipad.*os 5/gi.test(navigator.appVersion) && e.bind("pageshow", function(b) {
				b.originalEvent && b.originalEvent.persisted && i.each(function() {
					a(this).trigger("appear")
				})
			}), a(c).ready(function() {
				g()
			}), this
	}, a.belowthefold = function(c, f) {
		var g;
		return g = f.container === d || f.container === b ? (b.innerHeight ? b.innerHeight : e.height()) + e
			.scrollTop() : a(f.container).offset().top + a(f.container).height(), g <= a(c).offset().top - f
			.threshold
	}, a.rightoffold = function(c, f) {
		var g;
		return g = f.container === d || f.container === b ? e.width() + e.scrollLeft() : a(f.container).offset()
			.left + a(f.container).width(), g <= a(c).offset().left - f.threshold
	}, a.abovethetop = function(c, f) {
		var g;
		return g = f.container === d || f.container === b ? e.scrollTop() : a(f.container).offset().top, g >= a(c)
			.offset().top + f.threshold + a(c).height()
	}, a.leftofbegin = function(c, f) {
		var g;
		return g = f.container === d || f.container === b ? e.scrollLeft() : a(f.container).offset().left, g >= a(c)
			.offset().left + f.threshold + a(c).width()
	}, a.inviewport = function(b, c) {
		return !(a.rightoffold(b, c) || a.leftofbegin(b, c) || a.belowthefold(b, c) || a.abovethetop(b, c))
	}, a.extend(a.expr[":"], {
		"below-the-fold": function(b) {
			return a.belowthefold(b, {
				threshold: 0
			})
		},
		"above-the-top": function(b) {
			return !a.belowthefold(b, {
				threshold: 0
			})
		},
		"right-of-screen": function(b) {
			return a.rightoffold(b, {
				threshold: 0
			})
		},
		"left-of-screen": function(b) {
			return !a.rightoffold(b, {
				threshold: 0
			})
		},
		"in-viewport": function(b) {
			return a.inviewport(b, {
				threshold: 0
			})
		},
		"above-the-fold": function(b) {
			return !a.belowthefold(b, {
				threshold: 0
			})
		},
		"right-of-fold": function(b) {
			return a.rightoffold(b, {
				threshold: 0
			})
		},
		"left-of-fold": function(b) {
			return !a.rightoffold(b, {
				threshold: 0
			})
		}
	})
}(jQuery, window, document);



(function(r) {
	r.fn.qrcode = function(h) {
		var s;

		function u(a) {
			this.mode = s;
			this.data = a
		}

		function o(a, c) {
			this.typeNumber = a;
			this.errorCorrectLevel = c;
			this.modules = null;
			this.moduleCount = 0;
			this.dataCache = null;
			this.dataList = []
		}

		function q(a, c) {
			if (void 0 == a.length) throw Error(a.length + "/" + c);
			for (var d = 0; d < a.length && 0 == a[d];) d++;
			this.num = Array(a.length - d + c);
			for (var b = 0; b < a.length - d; b++) this.num[b] = a[b + d]
		}

		function p(a, c) {
			this.totalCount = a;
			this.dataCount = c
		}

		function t() {
			this.buffer = [];
			this.length = 0
		}
		u.prototype = {
			getLength: function() {
				return this.data.length
			},
			write: function(a) {
				for (var c = 0; c < this.data.length; c++) a.put(this.data.charCodeAt(c), 8)
			}
		};
		o.prototype = {
			addData: function(a) {
				this.dataList.push(new u(a));
				this.dataCache = null
			},
			isDark: function(a, c) {
				if (0 > a || this.moduleCount <= a || 0 > c || this.moduleCount <= c) throw Error(a +
					"," + c);
				return this.modules[a][c]
			},
			getModuleCount: function() {
				return this.moduleCount
			},
			make: function() {
				if (1 > this.typeNumber) {
					for (var a = 1, a = 1; 40 > a; a++) {
						for (var c = p.getRSBlocks(a, this.errorCorrectLevel), d = new t, b = 0, e =
							0; e < c.length; e++) b += c[e].dataCount;
						for (e = 0; e < this.dataList.length; e++) c = this.dataList[e], d.put(c.mode,
							4), d.put(c.getLength(), j.getLengthInBits(c.mode, a)), c.write(d);
						if (d.getLengthInBits() <= 8 * b) break
					}
					this.typeNumber = a
				}
				this.makeImpl(!1, this.getBestMaskPattern())
			},
			makeImpl: function(a, c) {
				this.moduleCount = 4 * this.typeNumber + 17;
				this.modules = Array(this.moduleCount);
				for (var d = 0; d < this.moduleCount; d++) {
					this.modules[d] = Array(this.moduleCount);
					for (var b = 0; b < this.moduleCount; b++) this.modules[d][b] = null
				}
				this.setupPositionProbePattern(0, 0);
				this.setupPositionProbePattern(this.moduleCount -
					7, 0);
				this.setupPositionProbePattern(0, this.moduleCount - 7);
				this.setupPositionAdjustPattern();
				this.setupTimingPattern();
				this.setupTypeInfo(a, c);
				7 <= this.typeNumber && this.setupTypeNumber(a);
				null == this.dataCache && (this.dataCache = o.createData(this.typeNumber, this
					.errorCorrectLevel, this.dataList));
				this.mapData(this.dataCache, c)
			},
			setupPositionProbePattern: function(a, c) {
				for (var d = -1; 7 >= d; d++)
					if (!(-1 >= a + d || this.moduleCount <= a + d))
						for (var b = -1; 7 >= b; b++) - 1 >= c + b || this.moduleCount <= c + b || (this
							.modules[a + d][c + b] =
							0 <= d && 6 >= d && (0 == b || 6 == b) || 0 <= b && 6 >= b && (0 == d ||
								6 == d) || 2 <= d && 4 >= d && 2 <= b && 4 >= b ? !0 : !1)
			},
			getBestMaskPattern: function() {
				for (var a = 0, c = 0, d = 0; 8 > d; d++) {
					this.makeImpl(!0, d);
					var b = j.getLostPoint(this);
					if (0 == d || a > b) a = b, c = d
				}
				return c
			},
			createMovieClip: function(a, c, d) {
				a = a.createEmptyMovieClip(c, d);
				this.make();
				for (c = 0; c < this.modules.length; c++)
					for (var d = 1 * c, b = 0; b < this.modules[c].length; b++) {
						var e = 1 * b;
						this.modules[c][b] && (a.beginFill(0, 100), a.moveTo(e, d), a.lineTo(e + 1, d),
							a.lineTo(e + 1, d + 1), a.lineTo(e, d + 1), a.endFill())
					}
				return a
			},
			setupTimingPattern: function() {
				for (var a = 8; a < this.moduleCount - 8; a++) null == this.modules[a][6] && (this
					.modules[a][6] = 0 == a % 2);
				for (a = 8; a < this.moduleCount - 8; a++) null == this.modules[6][a] && (this.modules[
					6][a] = 0 == a % 2)
			},
			setupPositionAdjustPattern: function() {
				for (var a = j.getPatternPosition(this.typeNumber), c = 0; c < a.length; c++)
					for (var d = 0; d < a.length; d++) {
						var b = a[c],
							e = a[d];
						if (null == this.modules[b][e])
							for (var f = -2; 2 >= f; f++)
								for (var i = -2; 2 >= i; i++) this.modules[b + f][e + i] = -2 == f ||
									2 == f || -2 == i || 2 == i || 0 == f && 0 == i ? !0 : !1
					}
			},
			setupTypeNumber: function(a) {
				for (var c =
						j.getBCHTypeNumber(this.typeNumber), d = 0; 18 > d; d++) {
					var b = !a && 1 == (c >> d & 1);
					this.modules[Math.floor(d / 3)][d % 3 + this.moduleCount - 8 - 3] = b
				}
				for (d = 0; 18 > d; d++) b = !a && 1 == (c >> d & 1), this.modules[d % 3 + this
					.moduleCount - 8 - 3][Math.floor(d / 3)] = b
			},
			setupTypeInfo: function(a, c) {
				for (var d = j.getBCHTypeInfo(this.errorCorrectLevel << 3 | c), b = 0; 15 > b; b++) {
					var e = !a && 1 == (d >> b & 1);
					6 > b ? this.modules[b][8] = e : 8 > b ? this.modules[b + 1][8] = e : this.modules[
						this.moduleCount - 15 + b][8] = e
				}
				for (b = 0; 15 > b; b++) e = !a && 1 == (d >> b & 1), 8 > b ? this.modules[8][this
						.moduleCount -
						b - 1
					] = e : 9 > b ? this.modules[8][15 - b - 1 + 1] = e : this.modules[8][15 - b - 1] =
					e;
				this.modules[this.moduleCount - 8][8] = !a
			},
			mapData: function(a, c) {
				for (var d = -1, b = this.moduleCount - 1, e = 7, f = 0, i = this.moduleCount - 1; 0 <
					i; i -= 2)
					for (6 == i && i--;;) {
						for (var g = 0; 2 > g; g++)
							if (null == this.modules[b][i - g]) {
								var n = !1;
								f < a.length && (n = 1 == (a[f] >>> e & 1));
								j.getMask(c, b, i - g) && (n = !n);
								this.modules[b][i - g] = n;
								e--; - 1 == e && (f++, e = 7)
							} b += d;
						if (0 > b || this.moduleCount <= b) {
							b -= d;
							d = -d;
							break
						}
					}
			}
		};
		o.PAD0 = 236;
		o.PAD1 = 17;
		o.createData = function(a, c, d) {
			for (var c = p.getRSBlocks(a,
					c), b = new t, e = 0; e < d.length; e++) {
				var f = d[e];
				b.put(f.mode, 4);
				b.put(f.getLength(), j.getLengthInBits(f.mode, a));
				f.write(b)
			}
			for (e = a = 0; e < c.length; e++) a += c[e].dataCount;
			if (b.getLengthInBits() > 8 * a) throw Error("code length overflow. (" + b.getLengthInBits() +
				">" + 8 * a + ")");
			for (b.getLengthInBits() + 4 <= 8 * a && b.put(0, 4); 0 != b.getLengthInBits() % 8;) b.putBit(!
				1);
			for (; !(b.getLengthInBits() >= 8 * a);) {
				b.put(o.PAD0, 8);
				if (b.getLengthInBits() >= 8 * a) break;
				b.put(o.PAD1, 8)
			}
			return o.createBytes(b, c)
		};
		o.createBytes = function(a, c) {
			for (var d =
					0, b = 0, e = 0, f = Array(c.length), i = Array(c.length), g = 0; g < c.length; g++) {
				var n = c[g].dataCount,
					h = c[g].totalCount - n,
					b = Math.max(b, n),
					e = Math.max(e, h);
				f[g] = Array(n);
				for (var k = 0; k < f[g].length; k++) f[g][k] = 255 & a.buffer[k + d];
				d += n;
				k = j.getErrorCorrectPolynomial(h);
				n = (new q(f[g], k.getLength() - 1)).mod(k);
				i[g] = Array(k.getLength() - 1);
				for (k = 0; k < i[g].length; k++) h = k + n.getLength() - i[g].length, i[g][k] = 0 <= h ? n
					.get(h) : 0
			}
			for (k = g = 0; k < c.length; k++) g += c[k].totalCount;
			d = Array(g);
			for (k = n = 0; k < b; k++)
				for (g = 0; g < c.length; g++) k < f[g].length &&
					(d[n++] = f[g][k]);
			for (k = 0; k < e; k++)
				for (g = 0; g < c.length; g++) k < i[g].length && (d[n++] = i[g][k]);
			return d
		};
		s = 4;
		for (var j = {
				PATTERN_POSITION_TABLE: [
					[],
					[6, 18],
					[6, 22],
					[6, 26],
					[6, 30],
					[6, 34],
					[6, 22, 38],
					[6, 24, 42],
					[6, 26, 46],
					[6, 28, 50],
					[6, 30, 54],
					[6, 32, 58],
					[6, 34, 62],
					[6, 26, 46, 66],
					[6, 26, 48, 70],
					[6, 26, 50, 74],
					[6, 30, 54, 78],
					[6, 30, 56, 82],
					[6, 30, 58, 86],
					[6, 34, 62, 90],
					[6, 28, 50, 72, 94],
					[6, 26, 50, 74, 98],
					[6, 30, 54, 78, 102],
					[6, 28, 54, 80, 106],
					[6, 32, 58, 84, 110],
					[6, 30, 58, 86, 114],
					[6, 34, 62, 90, 118],
					[6, 26, 50, 74, 98, 122],
					[6, 30, 54, 78, 102, 126],
					[6, 26, 52,
						78, 104, 130
					],
					[6, 30, 56, 82, 108, 134],
					[6, 34, 60, 86, 112, 138],
					[6, 30, 58, 86, 114, 142],
					[6, 34, 62, 90, 118, 146],
					[6, 30, 54, 78, 102, 126, 150],
					[6, 24, 50, 76, 102, 128, 154],
					[6, 28, 54, 80, 106, 132, 158],
					[6, 32, 58, 84, 110, 136, 162],
					[6, 26, 54, 82, 110, 138, 166],
					[6, 30, 58, 86, 114, 142, 170]
				],
				G15: 1335,
				G18: 7973,
				G15_MASK: 21522,
				getBCHTypeInfo: function(a) {
					for (var c = a << 10; 0 <= j.getBCHDigit(c) - j.getBCHDigit(j.G15);) c ^= j.G15 << j
						.getBCHDigit(c) - j.getBCHDigit(j.G15);
					return (a << 10 | c) ^ j.G15_MASK
				},
				getBCHTypeNumber: function(a) {
					for (var c = a << 12; 0 <= j.getBCHDigit(c) -
						j.getBCHDigit(j.G18);) c ^= j.G18 << j.getBCHDigit(c) - j.getBCHDigit(j.G18);
					return a << 12 | c
				},
				getBCHDigit: function(a) {
					for (var c = 0; 0 != a;) c++, a >>>= 1;
					return c
				},
				getPatternPosition: function(a) {
					return j.PATTERN_POSITION_TABLE[a - 1]
				},
				getMask: function(a, c, d) {
					switch (a) {
						case 0:
							return 0 == (c + d) % 2;
						case 1:
							return 0 == c % 2;
						case 2:
							return 0 == d % 3;
						case 3:
							return 0 == (c + d) % 3;
						case 4:
							return 0 == (Math.floor(c / 2) + Math.floor(d / 3)) % 2;
						case 5:
							return 0 == c * d % 2 + c * d % 3;
						case 6:
							return 0 == (c * d % 2 + c * d % 3) % 2;
						case 7:
							return 0 == (c * d % 3 + (c + d) % 2) % 2;
						default:
							throw Error("bad maskPattern:" +
								a);
					}
				},
				getErrorCorrectPolynomial: function(a) {
					for (var c = new q([1], 0), d = 0; d < a; d++) c = c.multiply(new q([1, l.gexp(d)],
						0));
					return c
				},
				getLengthInBits: function(a, c) {
					if (1 <= c && 10 > c) switch (a) {
						case 1:
							return 10;
						case 2:
							return 9;
						case s:
							return 8;
						case 8:
							return 8;
						default:
							throw Error("mode:" + a);
					} else if (27 > c) switch (a) {
						case 1:
							return 12;
						case 2:
							return 11;
						case s:
							return 16;
						case 8:
							return 10;
						default:
							throw Error("mode:" + a);
					} else if (41 > c) switch (a) {
						case 1:
							return 14;
						case 2:
							return 13;
						case s:
							return 16;
						case 8:
							return 12;
						default:
							throw Error("mode:" +
								a);
					} else throw Error("type:" + c);
				},
				getLostPoint: function(a) {
					for (var c = a.getModuleCount(), d = 0, b = 0; b < c; b++)
						for (var e = 0; e < c; e++) {
							for (var f = 0, i = a.isDark(b, e), g = -1; 1 >= g; g++)
								if (!(0 > b + g || c <= b + g))
									for (var h = -1; 1 >= h; h++) 0 > e + h || c <= e + h || 0 == g &&
										0 == h || i == a.isDark(b + g, e + h) && f++;
							5 < f && (d += 3 + f - 5)
						}
					for (b = 0; b < c - 1; b++)
						for (e = 0; e < c - 1; e++)
							if (f = 0, a.isDark(b, e) && f++, a.isDark(b + 1, e) && f++, a.isDark(b, e +
									1) && f++, a.isDark(b + 1, e + 1) && f++, 0 == f || 4 == f) d += 3;
					for (b = 0; b < c; b++)
						for (e = 0; e < c - 6; e++) a.isDark(b, e) && !a.isDark(b, e + 1) && a.isDark(b,
								e +
								2) && a.isDark(b, e + 3) && a.isDark(b, e + 4) && !a.isDark(b, e + 5) &&
							a.isDark(b, e + 6) && (d += 40);
					for (e = 0; e < c; e++)
						for (b = 0; b < c - 6; b++) a.isDark(b, e) && !a.isDark(b + 1, e) && a.isDark(
							b + 2, e) && a.isDark(b + 3, e) && a.isDark(b + 4, e) && !a.isDark(b +
							5, e) && a.isDark(b + 6, e) && (d += 40);
					for (e = f = 0; e < c; e++)
						for (b = 0; b < c; b++) a.isDark(b, e) && f++;
					a = Math.abs(100 * f / c / c - 50) / 5;
					return d + 10 * a
				}
			}, l = {
				glog: function(a) {
					if (1 > a) throw Error("glog(" + a + ")");
					return l.LOG_TABLE[a]
				},
				gexp: function(a) {
					for (; 0 > a;) a += 255;
					for (; 256 <= a;) a -= 255;
					return l.EXP_TABLE[a]
				},
				EXP_TABLE: Array(256),
				LOG_TABLE: Array(256)
			}, m = 0; 8 > m; m++) l.EXP_TABLE[m] = 1 << m;
		for (m = 8; 256 > m; m++) l.EXP_TABLE[m] = l.EXP_TABLE[m - 4] ^ l.EXP_TABLE[m - 5] ^ l.EXP_TABLE[m -
			6] ^ l.EXP_TABLE[m - 8];
		for (m = 0; 255 > m; m++) l.LOG_TABLE[l.EXP_TABLE[m]] = m;
		q.prototype = {
			get: function(a) {
				return this.num[a]
			},
			getLength: function() {
				return this.num.length
			},
			multiply: function(a) {
				for (var c = Array(this.getLength() + a.getLength() - 1), d = 0; d < this
				.getLength(); d++)
					for (var b = 0; b < a.getLength(); b++) c[d + b] ^= l.gexp(l.glog(this.get(d)) + l
						.glog(a.get(b)));
				return new q(c, 0)
			},
			mod: function(a) {
				if (0 >
					this.getLength() - a.getLength()) return this;
				for (var c = l.glog(this.get(0)) - l.glog(a.get(0)), d = Array(this.getLength()), b =
					0; b < this.getLength(); b++) d[b] = this.get(b);
				for (b = 0; b < a.getLength(); b++) d[b] ^= l.gexp(l.glog(a.get(b)) + c);
				return (new q(d, 0)).mod(a)
			}
		};
		p.RS_BLOCK_TABLE = [
			[1, 26, 19],
			[1, 26, 16],
			[1, 26, 13],
			[1, 26, 9],
			[1, 44, 34],
			[1, 44, 28],
			[1, 44, 22],
			[1, 44, 16],
			[1, 70, 55],
			[1, 70, 44],
			[2, 35, 17],
			[2, 35, 13],
			[1, 100, 80],
			[2, 50, 32],
			[2, 50, 24],
			[4, 25, 9],
			[1, 134, 108],
			[2, 67, 43],
			[2, 33, 15, 2, 34, 16],
			[2, 33, 11, 2, 34, 12],
			[2, 86, 68],
			[4, 43, 27],
			[4, 43, 19],
			[4, 43, 15],
			[2, 98, 78],
			[4, 49, 31],
			[2, 32, 14, 4, 33, 15],
			[4, 39, 13, 1, 40, 14],
			[2, 121, 97],
			[2, 60, 38, 2, 61, 39],
			[4, 40, 18, 2, 41, 19],
			[4, 40, 14, 2, 41, 15],
			[2, 146, 116],
			[3, 58, 36, 2, 59, 37],
			[4, 36, 16, 4, 37, 17],
			[4, 36, 12, 4, 37, 13],
			[2, 86, 68, 2, 87, 69],
			[4, 69, 43, 1, 70, 44],
			[6, 43, 19, 2, 44, 20],
			[6, 43, 15, 2, 44, 16],
			[4, 101, 81],
			[1, 80, 50, 4, 81, 51],
			[4, 50, 22, 4, 51, 23],
			[3, 36, 12, 8, 37, 13],
			[2, 116, 92, 2, 117, 93],
			[6, 58, 36, 2, 59, 37],
			[4, 46, 20, 6, 47, 21],
			[7, 42, 14, 4, 43, 15],
			[4, 133, 107],
			[8, 59, 37, 1, 60, 38],
			[8, 44, 20, 4, 45, 21],
			[12, 33, 11, 4, 34, 12],
			[3, 145, 115, 1, 146,
				116
			],
			[4, 64, 40, 5, 65, 41],
			[11, 36, 16, 5, 37, 17],
			[11, 36, 12, 5, 37, 13],
			[5, 109, 87, 1, 110, 88],
			[5, 65, 41, 5, 66, 42],
			[5, 54, 24, 7, 55, 25],
			[11, 36, 12],
			[5, 122, 98, 1, 123, 99],
			[7, 73, 45, 3, 74, 46],
			[15, 43, 19, 2, 44, 20],
			[3, 45, 15, 13, 46, 16],
			[1, 135, 107, 5, 136, 108],
			[10, 74, 46, 1, 75, 47],
			[1, 50, 22, 15, 51, 23],
			[2, 42, 14, 17, 43, 15],
			[5, 150, 120, 1, 151, 121],
			[9, 69, 43, 4, 70, 44],
			[17, 50, 22, 1, 51, 23],
			[2, 42, 14, 19, 43, 15],
			[3, 141, 113, 4, 142, 114],
			[3, 70, 44, 11, 71, 45],
			[17, 47, 21, 4, 48, 22],
			[9, 39, 13, 16, 40, 14],
			[3, 135, 107, 5, 136, 108],
			[3, 67, 41, 13, 68, 42],
			[15, 54, 24, 5, 55, 25],
			[15,
				43, 15, 10, 44, 16
			],
			[4, 144, 116, 4, 145, 117],
			[17, 68, 42],
			[17, 50, 22, 6, 51, 23],
			[19, 46, 16, 6, 47, 17],
			[2, 139, 111, 7, 140, 112],
			[17, 74, 46],
			[7, 54, 24, 16, 55, 25],
			[34, 37, 13],
			[4, 151, 121, 5, 152, 122],
			[4, 75, 47, 14, 76, 48],
			[11, 54, 24, 14, 55, 25],
			[16, 45, 15, 14, 46, 16],
			[6, 147, 117, 4, 148, 118],
			[6, 73, 45, 14, 74, 46],
			[11, 54, 24, 16, 55, 25],
			[30, 46, 16, 2, 47, 17],
			[8, 132, 106, 4, 133, 107],
			[8, 75, 47, 13, 76, 48],
			[7, 54, 24, 22, 55, 25],
			[22, 45, 15, 13, 46, 16],
			[10, 142, 114, 2, 143, 115],
			[19, 74, 46, 4, 75, 47],
			[28, 50, 22, 6, 51, 23],
			[33, 46, 16, 4, 47, 17],
			[8, 152, 122, 4, 153, 123],
			[22, 73, 45,
				3, 74, 46
			],
			[8, 53, 23, 26, 54, 24],
			[12, 45, 15, 28, 46, 16],
			[3, 147, 117, 10, 148, 118],
			[3, 73, 45, 23, 74, 46],
			[4, 54, 24, 31, 55, 25],
			[11, 45, 15, 31, 46, 16],
			[7, 146, 116, 7, 147, 117],
			[21, 73, 45, 7, 74, 46],
			[1, 53, 23, 37, 54, 24],
			[19, 45, 15, 26, 46, 16],
			[5, 145, 115, 10, 146, 116],
			[19, 75, 47, 10, 76, 48],
			[15, 54, 24, 25, 55, 25],
			[23, 45, 15, 25, 46, 16],
			[13, 145, 115, 3, 146, 116],
			[2, 74, 46, 29, 75, 47],
			[42, 54, 24, 1, 55, 25],
			[23, 45, 15, 28, 46, 16],
			[17, 145, 115],
			[10, 74, 46, 23, 75, 47],
			[10, 54, 24, 35, 55, 25],
			[19, 45, 15, 35, 46, 16],
			[17, 145, 115, 1, 146, 116],
			[14, 74, 46, 21, 75, 47],
			[29, 54, 24, 19,
				55, 25
			],
			[11, 45, 15, 46, 46, 16],
			[13, 145, 115, 6, 146, 116],
			[14, 74, 46, 23, 75, 47],
			[44, 54, 24, 7, 55, 25],
			[59, 46, 16, 1, 47, 17],
			[12, 151, 121, 7, 152, 122],
			[12, 75, 47, 26, 76, 48],
			[39, 54, 24, 14, 55, 25],
			[22, 45, 15, 41, 46, 16],
			[6, 151, 121, 14, 152, 122],
			[6, 75, 47, 34, 76, 48],
			[46, 54, 24, 10, 55, 25],
			[2, 45, 15, 64, 46, 16],
			[17, 152, 122, 4, 153, 123],
			[29, 74, 46, 14, 75, 47],
			[49, 54, 24, 10, 55, 25],
			[24, 45, 15, 46, 46, 16],
			[4, 152, 122, 18, 153, 123],
			[13, 74, 46, 32, 75, 47],
			[48, 54, 24, 14, 55, 25],
			[42, 45, 15, 32, 46, 16],
			[20, 147, 117, 4, 148, 118],
			[40, 75, 47, 7, 76, 48],
			[43, 54, 24, 22, 55, 25],
			[10,
				45, 15, 67, 46, 16
			],
			[19, 148, 118, 6, 149, 119],
			[18, 75, 47, 31, 76, 48],
			[34, 54, 24, 34, 55, 25],
			[20, 45, 15, 61, 46, 16]
		];
		p.getRSBlocks = function(a, c) {
			var d = p.getRsBlockTable(a, c);
			if (void 0 == d) throw Error("bad rs block @ typeNumber:" + a + "/errorCorrectLevel:" + c);
			for (var b = d.length / 3, e = [], f = 0; f < b; f++)
				for (var h = d[3 * f + 0], g = d[3 * f + 1], j = d[3 * f + 2], l = 0; l < h; l++) e.push(
					new p(g, j));
			return e
		};
		p.getRsBlockTable = function(a, c) {
			switch (c) {
				case 1:
					return p.RS_BLOCK_TABLE[4 * (a - 1) + 0];
				case 0:
					return p.RS_BLOCK_TABLE[4 * (a - 1) + 1];
				case 3:
					return p.RS_BLOCK_TABLE[4 *
						(a - 1) + 2];
				case 2:
					return p.RS_BLOCK_TABLE[4 * (a - 1) + 3]
			}
		};
		t.prototype = {
			get: function(a) {
				return 1 == (this.buffer[Math.floor(a / 8)] >>> 7 - a % 8 & 1)
			},
			put: function(a, c) {
				for (var d = 0; d < c; d++) this.putBit(1 == (a >>> c - d - 1 & 1))
			},
			getLengthInBits: function() {
				return this.length
			},
			putBit: function(a) {
				var c = Math.floor(this.length / 8);
				this.buffer.length <= c && this.buffer.push(0);
				a && (this.buffer[c] |= 128 >>> this.length % 8);
				this.length++
			}
		};
		"string" === typeof h && (h = {
			text: h
		});
		h = r.extend({}, {
			render: "canvas",
			width: 256,
			height: 256,
			typeNumber: -1,
			correctLevel: 2,
			background: "#ffffff",
			foreground: "#000000"
		}, h);
		return this.each(function() {
			var a;
			if ("canvas" == h.render) {
				a = new o(h.typeNumber, h.correctLevel);
				a.addData(h.text);
				a.make();
				var c = document.createElement("canvas");
				c.width = h.width;
				c.height = h.height;
				for (var d = c.getContext("2d"), b = h.width / a.getModuleCount(), e = h.height / a
						.getModuleCount(), f = 0; f < a.getModuleCount(); f++)
					for (var i = 0; i < a.getModuleCount(); i++) {
						d.fillStyle = a.isDark(f, i) ? h.foreground : h.background;
						var g = Math.ceil((i + 1) * b) - Math.floor(i * b),
							j = Math.ceil((f + 1) * b) - Math.floor(f * b);
						d.fillRect(Math.round(i * b), Math.round(f * e), g, j)
					}
			} else {
				a = new o(h.typeNumber, h.correctLevel);
				a.addData(h.text);
				a.make();
				c = r("<table></table>").css("width", h.width + "px").css("height", h.height + "px")
					.css("border", "0px").css("border-collapse", "collapse").css("background-color", h
						.background);
				d = h.width / a.getModuleCount();
				b = h.height / a.getModuleCount();
				for (e = 0; e < a.getModuleCount(); e++) {
					f = r("<tr></tr>").css("height", b + "px").appendTo(c);
					for (i = 0; i < a.getModuleCount(); i++) r("<td></td>").css("width",
						d + "px").css("background-color", a.isDark(e, i) ? h.foreground : h
						.background).appendTo(f)
				}
			}
			a = c;
			jQuery(a).appendTo(this)
		})
	}
})(jQuery);


/*
 * jQuery One Page Nav Plugin
 * http://github.com/davist11/jQuery-One-Page-Nav
 */
(function($, window, document, undefined) {
	var OnePageNav = function(elem, options) {
		this.elem = elem;
		this.$elem = $(elem);
		this.options = options;
		this.metadata = this.$elem.data('plugin-options');
		this.$win = $(window);
		this.sections = {};
		this.didScroll = false;
		this.$doc = $(document);
		this.docHeight = this.$doc.height()
	};
	OnePageNav.prototype = {
		defaults: {
			navItems: 'a',
			currentClass: 'current',
			changeHash: false,
			easing: 'swing',
			filter: '',
			scrollSpeed: 750,
			scrollThreshold: 0.5,
			begin: false,
			end: false,
			scrollChange: false
		},
		init: function() {
			this.config = $.extend({}, this.defaults, this.options, this.metadata);
			this.$nav = this.$elem.find(this.config.navItems);
			if (this.config.filter !== '') {
				this.$nav = this.$nav.filter(this.config.filter)
			}
			this.$nav.on('click.onePageNav', $.proxy(this.handleClick, this));
			this.getPositions();
			this.bindInterval();
			this.$win.on('resize.onePageNav', $.proxy(this.getPositions, this));
			return this
		},
		adjustNav: function(self, $parent) {
			self.$elem.find('.' + self.config.currentClass).removeClass(self.config.currentClass);
			$parent.addClass(self.config.currentClass)
		},
		bindInterval: function() {
			var self = this;
			var docHeight;
			self.$win.on('scroll.onePageNav', function() {
				self.didScroll = true
			});
			self.t = setInterval(function() {
				docHeight = self.$doc.height();
				if (self.didScroll) {
					self.didScroll = false;
					self.scrollChange()
				}
				if (docHeight !== self.docHeight) {
					self.docHeight = docHeight;
					self.getPositions()
				}
			}, 250)
		},
		getHash: function($link) {
			return $link.attr('href').split('#')[1]
		},
		getPositions: function() {
			var self = this;
			var linkHref;
			var topPos;
			var $target;
			self.$nav.each(function() {
				linkHref = self.getHash($(this));
				$target = $('#' + linkHref);
				if ($target.length) {
					topPos = $target.offset().top;
					self.sections[linkHref] = Math.round(topPos)
				}
			})
		},
		getSection: function(windowPos) {
			var returnValue = null;
			var windowHeight = Math.round(this.$win.height() * this.config.scrollThreshold);
			for (var section in this.sections) {
				if ((this.sections[section] - windowHeight) < windowPos) {
					returnValue = section
				}
			}
			return returnValue
		},
		handleClick: function(e) {
			var self = this;
			var $link = $(e.currentTarget);
			var $parent = $link.parent();
			var newLoc = '#' + self.getHash($link);
			if (!$parent.hasClass(self.config.currentClass)) {
				if (self.config.begin) {
					self.config.begin()
				}
				self.adjustNav(self, $parent);
				self.unbindInterval();
				self.scrollTo(newLoc, function() {
					if (self.config.changeHash) {
						window.location.hash = newLoc
					}
					self.bindInterval();
					if (self.config.end) {
						self.config.end()
					}
				})
			}
			e.preventDefault()
		},
		scrollChange: function() {
			var windowTop = this.$win.scrollTop();
			var position = this.getSection(windowTop);
			var $parent;
			if (position !== null) {
				$parent = this.$elem.find('a[href$="#' + position + '"]').parent();
				if (!$parent.hasClass(this.config.currentClass)) {
					this.adjustNav(this, $parent);
					if (this.config.scrollChange) {
						this.config.scrollChange($parent)
					}
				}
			}
		},
		scrollTo: function(target, callback) {
			var offset = $(target).offset().top;
			$('html, body').animate({
				scrollTop: offset - 70
			}, this.config.scrollSpeed, this.config.easing, callback)
		},
		unbindInterval: function() {
			clearInterval(this.t);
			this.$win.unbind('scroll.onePageNav')
		}
	};
	OnePageNav.defaults = OnePageNav.prototype.defaults;
	$.fn.onePageNav = function(options) {
		return this.each(function() {
			new OnePageNav(this, options).init()
		})
	}
})(jQuery, window, document);



/*!
 * Masonry PACKAGED v3.1.5
 * Cascading grid layout library
 * http://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */

! function(a) {
	function b() {}

	function c(a) {
		function c(b) {
			b.prototype.option || (b.prototype.option = function(b) {
				a.isPlainObject(b) && (this.options = a.extend(!0, this.options, b))
			})
		}

		function e(b, c) {
			a.fn[b] = function(e) {
				if ("string" == typeof e) {
					for (var g = d.call(arguments, 1), h = 0, i = this.length; i > h; h++) {
						var j = this[h],
							k = a.data(j, b);
						if (k)
							if (a.isFunction(k[e]) && "_" !== e.charAt(0)) {
								var l = k[e].apply(k, g);
								if (void 0 !== l) return l
							} else f("no such method '" + e + "' for " + b + " instance");
						else f("cannot call methods on " + b + " prior to initialization; attempted to call '" + e +
							"'")
					}
					return this
				}
				return this.each(function() {
					var d = a.data(this, b);
					d ? (d.option(e), d._init()) : (d = new c(this, e), a.data(this, b, d))
				})
			}
		}
		if (a) {
			var f = "undefined" == typeof console ? b : function(a) {
				console.error(a)
			};
			return a.bridget = function(a, b) {
				c(b), e(a, b)
			}, a.bridget
		}
	}
	var d = Array.prototype.slice;
	"function" == typeof define && define.amd ? define("jquery-bridget/jquery.bridget", ["jquery"], c) : c(a.jQuery)
}(window),
function(a) {
	function b(b) {
		var c = a.event;
		return c.target = c.target || c.srcElement || b, c
	}
	var c = document.documentElement,
		d = function() {};
	c.addEventListener ? d = function(a, b, c) {
		a.addEventListener(b, c, !1)
	} : c.attachEvent && (d = function(a, c, d) {
		a[c + d] = d.handleEvent ? function() {
			var c = b(a);
			d.handleEvent.call(d, c)
		} : function() {
			var c = b(a);
			d.call(a, c)
		}, a.attachEvent("on" + c, a[c + d])
	});
	var e = function() {};
	c.removeEventListener ? e = function(a, b, c) {
		a.removeEventListener(b, c, !1)
	} : c.detachEvent && (e = function(a, b, c) {
		a.detachEvent("on" + b, a[b + c]);
		try {
			delete a[b + c]
		} catch (d) {
			a[b + c] = void 0
		}
	});
	var f = {
		bind: d,
		unbind: e
	};
	"function" == typeof define && define.amd ? define("eventie/eventie", f) : "object" == typeof exports ? module
		.exports = f : a.eventie = f
}(this),
function(a) {
	function b(a) {
		"function" == typeof a && (b.isReady ? a() : f.push(a))
	}

	function c(a) {
		var c = "readystatechange" === a.type && "complete" !== e.readyState;
		if (!b.isReady && !c) {
			b.isReady = !0;
			for (var d = 0, g = f.length; g > d; d++) {
				var h = f[d];
				h()
			}
		}
	}

	function d(d) {
		return d.bind(e, "DOMContentLoaded", c), d.bind(e, "readystatechange", c), d.bind(a, "load", c), b
	}
	var e = a.document,
		f = [];
	b.isReady = !1, "function" == typeof define && define.amd ? (b.isReady = "function" == typeof requirejs, define(
		"doc-ready/doc-ready", ["eventie/eventie"], d)) : a.docReady = d(a.eventie)
}(this),
function() {
	function a() {}

	function b(a, b) {
		for (var c = a.length; c--;)
			if (a[c].listener === b) return c;
		return -1
	}

	function c(a) {
		return function() {
			return this[a].apply(this, arguments)
		}
	}
	var d = a.prototype,
		e = this,
		f = e.EventEmitter;
	d.getListeners = function(a) {
		var b, c, d = this._getEvents();
		if (a instanceof RegExp) {
			b = {};
			for (c in d) d.hasOwnProperty(c) && a.test(c) && (b[c] = d[c])
		} else b = d[a] || (d[a] = []);
		return b
	}, d.flattenListeners = function(a) {
		var b, c = [];
		for (b = 0; b < a.length; b += 1) c.push(a[b].listener);
		return c
	}, d.getListenersAsObject = function(a) {
		var b, c = this.getListeners(a);
		return c instanceof Array && (b = {}, b[a] = c), b || c
	}, d.addListener = function(a, c) {
		var d, e = this.getListenersAsObject(a),
			f = "object" == typeof c;
		for (d in e) e.hasOwnProperty(d) && -1 === b(e[d], c) && e[d].push(f ? c : {
			listener: c,
			once: !1
		});
		return this
	}, d.on = c("addListener"), d.addOnceListener = function(a, b) {
		return this.addListener(a, {
			listener: b,
			once: !0
		})
	}, d.once = c("addOnceListener"), d.defineEvent = function(a) {
		return this.getListeners(a), this
	}, d.defineEvents = function(a) {
		for (var b = 0; b < a.length; b += 1) this.defineEvent(a[b]);
		return this
	}, d.removeListener = function(a, c) {
		var d, e, f = this.getListenersAsObject(a);
		for (e in f) f.hasOwnProperty(e) && (d = b(f[e], c), -1 !== d && f[e].splice(d, 1));
		return this
	}, d.off = c("removeListener"), d.addListeners = function(a, b) {
		return this.manipulateListeners(!1, a, b)
	}, d.removeListeners = function(a, b) {
		return this.manipulateListeners(!0, a, b)
	}, d.manipulateListeners = function(a, b, c) {
		var d, e, f = a ? this.removeListener : this.addListener,
			g = a ? this.removeListeners : this.addListeners;
		if ("object" != typeof b || b instanceof RegExp)
			for (d = c.length; d--;) f.call(this, b, c[d]);
		else
			for (d in b) b.hasOwnProperty(d) && (e = b[d]) && ("function" == typeof e ? f.call(this, d, e) : g.call(
				this, d, e));
		return this
	}, d.removeEvent = function(a) {
		var b, c = typeof a,
			d = this._getEvents();
		if ("string" === c) delete d[a];
		else if (a instanceof RegExp)
			for (b in d) d.hasOwnProperty(b) && a.test(b) && delete d[b];
		else delete this._events;
		return this
	}, d.removeAllListeners = c("removeEvent"), d.emitEvent = function(a, b) {
		var c, d, e, f, g = this.getListenersAsObject(a);
		for (e in g)
			if (g.hasOwnProperty(e))
				for (d = g[e].length; d--;) c = g[e][d], c.once === !0 && this.removeListener(a, c.listener), f = c
					.listener.apply(this, b || []), f === this._getOnceReturnValue() && this.removeListener(a, c
						.listener);
		return this
	}, d.trigger = c("emitEvent"), d.emit = function(a) {
		var b = Array.prototype.slice.call(arguments, 1);
		return this.emitEvent(a, b)
	}, d.setOnceReturnValue = function(a) {
		return this._onceReturnValue = a, this
	}, d._getOnceReturnValue = function() {
		return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
	}, d._getEvents = function() {
		return this._events || (this._events = {})
	}, a.noConflict = function() {
		return e.EventEmitter = f, a
	}, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() {
		return a
	}) : "object" == typeof module && module.exports ? module.exports = a : this.EventEmitter = a
}.call(this),
	function(a) {
		function b(a) {
			if (a) {
				if ("string" == typeof d[a]) return a;
				a = a.charAt(0).toUpperCase() + a.slice(1);
				for (var b, e = 0, f = c.length; f > e; e++)
					if (b = c[e] + a, "string" == typeof d[b]) return b
			}
		}
		var c = "Webkit Moz ms Ms O".split(" "),
			d = document.documentElement.style;
		"function" == typeof define && define.amd ? define("get-style-property/get-style-property", [], function() {
			return b
		}) : "object" == typeof exports ? module.exports = b : a.getStyleProperty = b
	}(window),
	function(a) {
		function b(a) {
			var b = parseFloat(a),
				c = -1 === a.indexOf("%") && !isNaN(b);
			return c && b
		}

		function c() {
			for (var a = {
					width: 0,
					height: 0,
					innerWidth: 0,
					innerHeight: 0,
					outerWidth: 0,
					outerHeight: 0
				}, b = 0, c = g.length; c > b; b++) {
				var d = g[b];
				a[d] = 0
			}
			return a
		}

		function d(a) {
			function d(a) {
				if ("string" == typeof a && (a = document.querySelector(a)), a && "object" == typeof a && a.nodeType) {
					var d = f(a);
					if ("none" === d.display) return c();
					var e = {};
					e.width = a.offsetWidth, e.height = a.offsetHeight;
					for (var k = e.isBorderBox = !(!j || !d[j] || "border-box" !== d[j]), l = 0, m = g.length; m >
						l; l++) {
						var n = g[l],
							o = d[n];
						o = h(a, o);
						var p = parseFloat(o);
						e[n] = isNaN(p) ? 0 : p
					}
					var q = e.paddingLeft + e.paddingRight,
						r = e.paddingTop + e.paddingBottom,
						s = e.marginLeft + e.marginRight,
						t = e.marginTop + e.marginBottom,
						u = e.borderLeftWidth + e.borderRightWidth,
						v = e.borderTopWidth + e.borderBottomWidth,
						w = k && i,
						x = b(d.width);
					x !== !1 && (e.width = x + (w ? 0 : q + u));
					var y = b(d.height);
					return y !== !1 && (e.height = y + (w ? 0 : r + v)), e.innerWidth = e.width - (q + u), e
						.innerHeight = e.height - (r + v), e.outerWidth = e.width + s, e.outerHeight = e.height + t, e
				}
			}

			function h(a, b) {
				if (e || -1 === b.indexOf("%")) return b;
				var c = a.style,
					d = c.left,
					f = a.runtimeStyle,
					g = f && f.left;
				return g && (f.left = a.currentStyle.left), c.left = b, b = c.pixelLeft, c.left = d, g && (f.left = g),
					b
			}
			var i, j = a("boxSizing");
			return function() {
				if (j) {
					var a = document.createElement("div");
					a.style.width = "200px", a.style.padding = "1px 2px 3px 4px", a.style.borderStyle = "solid", a
						.style.borderWidth = "1px 2px 3px 4px", a.style[j] = "border-box";
					var c = document.body || document.documentElement;
					c.appendChild(a);
					var d = f(a);
					i = 200 === b(d.width), c.removeChild(a)
				}
			}(), d
		}
		var e = a.getComputedStyle,
			f = e ? function(a) {
				return e(a, null)
			} : function(a) {
				return a.currentStyle
			},
			g = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop",
				"marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"
			];
		"function" == typeof define && define.amd ? define("get-size/get-size", [
			"get-style-property/get-style-property"], d) : "object" == typeof exports ? module.exports = d(require(
			"get-style-property")) : a.getSize = d(a.getStyleProperty)
	}(window),
	function(a, b) {
		function c(a, b) {
			return a[h](b)
		}

		function d(a) {
			if (!a.parentNode) {
				var b = document.createDocumentFragment();
				b.appendChild(a)
			}
		}

		function e(a, b) {
			d(a);
			for (var c = a.parentNode.querySelectorAll(b), e = 0, f = c.length; f > e; e++)
				if (c[e] === a) return !0;
			return !1
		}

		function f(a, b) {
			return d(a), c(a, b)
		}
		var g, h = function() {
			if (b.matchesSelector) return "matchesSelector";
			for (var a = ["webkit", "moz", "ms", "o"], c = 0, d = a.length; d > c; c++) {
				var e = a[c],
					f = e + "MatchesSelector";
				if (b[f]) return f
			}
		}();
		if (h) {
			var i = document.createElement("div"),
				j = c(i, "div");
			g = j ? c : f
		} else g = e;
		"function" == typeof define && define.amd ? define("matches-selector/matches-selector", [], function() {
			return g
		}) : window.matchesSelector = g
	}(this, Element.prototype),
	function(a) {
		function b(a, b) {
			for (var c in b) a[c] = b[c];
			return a
		}

		function c(a) {
			for (var b in a) return !1;
			return b = null, !0
		}

		function d(a) {
			return a.replace(/([A-Z])/g, function(a) {
				return "-" + a.toLowerCase()
			})
		}

		function e(a, e, f) {
			function h(a, b) {
				a && (this.element = a, this.layout = b, this.position = {
					x: 0,
					y: 0
				}, this._create())
			}
			var i = f("transition"),
				j = f("transform"),
				k = i && j,
				l = !!f("perspective"),
				m = {
					WebkitTransition: "webkitTransitionEnd",
					MozTransition: "transitionend",
					OTransition: "otransitionend",
					transition: "transitionend"
				} [i],
				n = ["transform", "transition", "transitionDuration", "transitionProperty"],
				o = function() {
					for (var a = {}, b = 0, c = n.length; c > b; b++) {
						var d = n[b],
							e = f(d);
						e && e !== d && (a[d] = e)
					}
					return a
				}();
			b(h.prototype, a.prototype), h.prototype._create = function() {
				this._transn = {
					ingProperties: {},
					clean: {},
					onEnd: {}
				}, this.css({
					position: "absolute"
				})
			}, h.prototype.handleEvent = function(a) {
				var b = "on" + a.type;
				this[b] && this[b](a)
			}, h.prototype.getSize = function() {
				this.size = e(this.element)
			}, h.prototype.css = function(a) {
				var b = this.element.style;
				for (var c in a) {
					var d = o[c] || c;
					b[d] = a[c]
				}
			}, h.prototype.getPosition = function() {
				var a = g(this.element),
					b = this.layout.options,
					c = b.isOriginLeft,
					d = b.isOriginTop,
					e = parseInt(a[c ? "left" : "right"], 10),
					f = parseInt(a[d ? "top" : "bottom"], 10);
				e = isNaN(e) ? 0 : e, f = isNaN(f) ? 0 : f;
				var h = this.layout.size;
				e -= c ? h.paddingLeft : h.paddingRight, f -= d ? h.paddingTop : h.paddingBottom, this.position.x =
					e, this.position.y = f
			}, h.prototype.layoutPosition = function() {
				var a = this.layout.size,
					b = this.layout.options,
					c = {};
				b.isOriginLeft ? (c.left = this.position.x + a.paddingLeft + "px", c.right = "") : (c.right = this
					.position.x + a.paddingRight + "px", c.left = ""), b.isOriginTop ? (c.top = this.position
					.y + a.paddingTop + "px", c.bottom = "") : (c.bottom = this.position.y + a.paddingBottom +
					"px", c.top = ""), this.css(c), this.emitEvent("layout", [this])
			};
			var p = l ? function(a, b) {
				return "translate3d(" + a + "px, " + b + "px, 0)"
			} : function(a, b) {
				return "translate(" + a + "px, " + b + "px)"
			};
			h.prototype._transitionTo = function(a, b) {
					this.getPosition();
					var c = this.position.x,
						d = this.position.y,
						e = parseInt(a, 10),
						f = parseInt(b, 10),
						g = e === this.position.x && f === this.position.y;
					if (this.setPosition(a, b), g && !this.isTransitioning) return void this.layoutPosition();
					var h = a - c,
						i = b - d,
						j = {},
						k = this.layout.options;
					h = k.isOriginLeft ? h : -h, i = k.isOriginTop ? i : -i, j.transform = p(h, i), this.transition({
						to: j,
						onTransitionEnd: {
							transform: this.layoutPosition
						},
						isCleaning: !0
					})
				}, h.prototype.goTo = function(a, b) {
					this.setPosition(a, b), this.layoutPosition()
				}, h.prototype.moveTo = k ? h.prototype._transitionTo : h.prototype.goTo, h.prototype.setPosition =
				function(a, b) {
					this.position.x = parseInt(a, 10), this.position.y = parseInt(b, 10)
				}, h.prototype._nonTransition = function(a) {
					this.css(a.to), a.isCleaning && this._removeStyles(a.to);
					for (var b in a.onTransitionEnd) a.onTransitionEnd[b].call(this)
				}, h.prototype._transition = function(a) {
					if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(a);
					var b = this._transn;
					for (var c in a.onTransitionEnd) b.onEnd[c] = a.onTransitionEnd[c];
					for (c in a.to) b.ingProperties[c] = !0, a.isCleaning && (b.clean[c] = !0);
					if (a.from) {
						this.css(a.from);
						var d = this.element.offsetHeight;
						d = null
					}
					this.enableTransition(a.to), this.css(a.to), this.isTransitioning = !0
				};
			var q = j && d(j) + ",opacity";
			h.prototype.enableTransition = function() {
					this.isTransitioning || (this.css({
						transitionProperty: q,
						transitionDuration: this.layout.options.transitionDuration
					}), this.element.addEventListener(m, this, !1))
				}, h.prototype.transition = h.prototype[i ? "_transition" : "_nonTransition"], h.prototype
				.onwebkitTransitionEnd = function(a) {
					this.ontransitionend(a)
				}, h.prototype.onotransitionend = function(a) {
					this.ontransitionend(a)
				};
			var r = {
				"-webkit-transform": "transform",
				"-moz-transform": "transform",
				"-o-transform": "transform"
			};
			h.prototype.ontransitionend = function(a) {
				if (a.target === this.element) {
					var b = this._transn,
						d = r[a.propertyName] || a.propertyName;
					if (delete b.ingProperties[d], c(b.ingProperties) && this.disableTransition(), d in b.clean && (
							this.element.style[a.propertyName] = "", delete b.clean[d]), d in b.onEnd) {
						var e = b.onEnd[d];
						e.call(this), delete b.onEnd[d]
					}
					this.emitEvent("transitionEnd", [this])
				}
			}, h.prototype.disableTransition = function() {
				this.removeTransitionStyles(), this.element.removeEventListener(m, this, !1), this
					.isTransitioning = !1
			}, h.prototype._removeStyles = function(a) {
				var b = {};
				for (var c in a) b[c] = "";
				this.css(b)
			};
			var s = {
				transitionProperty: "",
				transitionDuration: ""
			};
			return h.prototype.removeTransitionStyles = function() {
				this.css(s)
			}, h.prototype.removeElem = function() {
				this.element.parentNode.removeChild(this.element), this.emitEvent("remove", [this])
			}, h.prototype.remove = function() {
				if (!i || !parseFloat(this.layout.options.transitionDuration)) return void this.removeElem();
				var a = this;
				this.on("transitionEnd", function() {
					return a.removeElem(), !0
				}), this.hide()
			}, h.prototype.reveal = function() {
				delete this.isHidden, this.css({
					display: ""
				});
				var a = this.layout.options;
				this.transition({
					from: a.hiddenStyle,
					to: a.visibleStyle,
					isCleaning: !0
				})
			}, h.prototype.hide = function() {
				this.isHidden = !0, this.css({
					display: ""
				});
				var a = this.layout.options;
				this.transition({
					from: a.visibleStyle,
					to: a.hiddenStyle,
					isCleaning: !0,
					onTransitionEnd: {
						opacity: function() {
							this.isHidden && this.css({
								display: "none"
							})
						}
					}
				})
			}, h.prototype.destroy = function() {
				this.css({
					position: "",
					left: "",
					right: "",
					top: "",
					bottom: "",
					transition: "",
					transform: ""
				})
			}, h
		}
		var f = a.getComputedStyle,
			g = f ? function(a) {
				return f(a, null)
			} : function(a) {
				return a.currentStyle
			};
		"function" == typeof define && define.amd ? define("outlayer/item", ["eventEmitter/EventEmitter",
			"get-size/get-size", "get-style-property/get-style-property"
		], e) : (a.Outlayer = {}, a.Outlayer.Item = e(a.EventEmitter, a.getSize, a.getStyleProperty))
	}(window),
	function(a) {
		function b(a, b) {
			for (var c in b) a[c] = b[c];
			return a
		}

		function c(a) {
			return "[object Array]" === l.call(a)
		}

		function d(a) {
			var b = [];
			if (c(a)) b = a;
			else if (a && "number" == typeof a.length)
				for (var d = 0, e = a.length; e > d; d++) b.push(a[d]);
			else b.push(a);
			return b
		}

		function e(a, b) {
			var c = n(b, a); - 1 !== c && b.splice(c, 1)
		}

		function f(a) {
			return a.replace(/(.)([A-Z])/g, function(a, b, c) {
				return b + "-" + c
			}).toLowerCase()
		}

		function g(c, g, l, n, o, p) {
			function q(a, c) {
				if ("string" == typeof a && (a = h.querySelector(a)), !a || !m(a)) return void(i && i.error("Bad " +
					this.constructor.namespace + " element: " + a));
				this.element = a, this.options = b({}, this.constructor.defaults), this.option(c);
				var d = ++r;
				this.element.outlayerGUID = d, s[d] = this, this._create(), this.options.isInitLayout && this.layout()
			}
			var r = 0,
				s = {};
			return q.namespace = "outlayer", q.Item = p, q.defaults = {
				containerStyle: {
					position: "relative"
				},
				isInitLayout: !0,
				isOriginLeft: !0,
				isOriginTop: !0,
				isResizeBound: !0,
				isResizingContainer: !0,
				transitionDuration: "0.4s",
				hiddenStyle: {
					opacity: 0,
					transform: "scale(0.001)"
				},
				visibleStyle: {
					opacity: 1,
					transform: "scale(1)"
				}
			}, b(q.prototype, l.prototype), q.prototype.option = function(a) {
				b(this.options, a)
			}, q.prototype._create = function() {
				this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), b(this.element.style, this
					.options.containerStyle), this.options.isResizeBound && this.bindResize()
			}, q.prototype.reloadItems = function() {
				this.items = this._itemize(this.element.children)
			}, q.prototype._itemize = function(a) {
				for (var b = this._filterFindItemElements(a), c = this.constructor.Item, d = [], e = 0, f = b
					.length; f > e; e++) {
					var g = b[e],
						h = new c(g, this);
					d.push(h)
				}
				return d
			}, q.prototype._filterFindItemElements = function(a) {
				a = d(a);
				for (var b = this.options.itemSelector, c = [], e = 0, f = a.length; f > e; e++) {
					var g = a[e];
					if (m(g))
						if (b) {
							o(g, b) && c.push(g);
							for (var h = g.querySelectorAll(b), i = 0, j = h.length; j > i; i++) c.push(h[i])
						} else c.push(g)
				}
				return c
			}, q.prototype.getItemElements = function() {
				for (var a = [], b = 0, c = this.items.length; c > b; b++) a.push(this.items[b].element);
				return a
			}, q.prototype.layout = function() {
				this._resetLayout(), this._manageStamps();
				var a = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this
					._isLayoutInited;
				this.layoutItems(this.items, a), this._isLayoutInited = !0
			}, q.prototype._init = q.prototype.layout, q.prototype._resetLayout = function() {
				this.getSize()
			}, q.prototype.getSize = function() {
				this.size = n(this.element)
			}, q.prototype._getMeasurement = function(a, b) {
				var c, d = this.options[a];
				d ? ("string" == typeof d ? c = this.element.querySelector(d) : m(d) && (c = d), this[a] = c ? n(c)[
					b] : d) : this[a] = 0
			}, q.prototype.layoutItems = function(a, b) {
				a = this._getItemsForLayout(a), this._layoutItems(a, b), this._postLayout()
			}, q.prototype._getItemsForLayout = function(a) {
				for (var b = [], c = 0, d = a.length; d > c; c++) {
					var e = a[c];
					e.isIgnored || b.push(e)
				}
				return b
			}, q.prototype._layoutItems = function(a, b) {
				function c() {
					d.emitEvent("layoutComplete", [d, a])
				}
				var d = this;
				if (!a || !a.length) return void c();
				this._itemsOn(a, "layout", c);
				for (var e = [], f = 0, g = a.length; g > f; f++) {
					var h = a[f],
						i = this._getItemLayoutPosition(h);
					i.item = h, i.isInstant = b || h.isLayoutInstant, e.push(i)
				}
				this._processLayoutQueue(e)
			}, q.prototype._getItemLayoutPosition = function() {
				return {
					x: 0,
					y: 0
				}
			}, q.prototype._processLayoutQueue = function(a) {
				for (var b = 0, c = a.length; c > b; b++) {
					var d = a[b];
					this._positionItem(d.item, d.x, d.y, d.isInstant)
				}
			}, q.prototype._positionItem = function(a, b, c, d) {
				d ? a.goTo(b, c) : a.moveTo(b, c)
			}, q.prototype._postLayout = function() {
				this.resizeContainer()
			}, q.prototype.resizeContainer = function() {
				if (this.options.isResizingContainer) {
					var a = this._getContainerSize();
					a && (this._setContainerMeasure(a.width, !0), this._setContainerMeasure(a.height, !1))
				}
			}, q.prototype._getContainerSize = k, q.prototype._setContainerMeasure = function(a, b) {
				if (void 0 !== a) {
					var c = this.size;
					c.isBorderBox && (a += b ? c.paddingLeft + c.paddingRight + c.borderLeftWidth + c
							.borderRightWidth : c.paddingBottom + c.paddingTop + c.borderTopWidth + c
							.borderBottomWidth), a = Math.max(a, 0), this.element.style[b ? "width" : "height"] =
						a + "px"
				}
			}, q.prototype._itemsOn = function(a, b, c) {
				function d() {
					return e++, e === f && c.call(g), !0
				}
				for (var e = 0, f = a.length, g = this, h = 0, i = a.length; i > h; h++) {
					var j = a[h];
					j.on(b, d)
				}
			}, q.prototype.ignore = function(a) {
				var b = this.getItem(a);
				b && (b.isIgnored = !0)
			}, q.prototype.unignore = function(a) {
				var b = this.getItem(a);
				b && delete b.isIgnored
			}, q.prototype.stamp = function(a) {
				if (a = this._find(a)) {
					this.stamps = this.stamps.concat(a);
					for (var b = 0, c = a.length; c > b; b++) {
						var d = a[b];
						this.ignore(d)
					}
				}
			}, q.prototype.unstamp = function(a) {
				if (a = this._find(a))
					for (var b = 0, c = a.length; c > b; b++) {
						var d = a[b];
						e(d, this.stamps), this.unignore(d)
					}
			}, q.prototype._find = function(a) {
				return a ? ("string" == typeof a && (a = this.element.querySelectorAll(a)), a = d(a)) : void 0
			}, q.prototype._manageStamps = function() {
				if (this.stamps && this.stamps.length) {
					this._getBoundingRect();
					for (var a = 0, b = this.stamps.length; b > a; a++) {
						var c = this.stamps[a];
						this._manageStamp(c)
					}
				}
			}, q.prototype._getBoundingRect = function() {
				var a = this.element.getBoundingClientRect(),
					b = this.size;
				this._boundingRect = {
					left: a.left + b.paddingLeft + b.borderLeftWidth,
					top: a.top + b.paddingTop + b.borderTopWidth,
					right: a.right - (b.paddingRight + b.borderRightWidth),
					bottom: a.bottom - (b.paddingBottom + b.borderBottomWidth)
				}
			}, q.prototype._manageStamp = k, q.prototype._getElementOffset = function(a) {
				var b = a.getBoundingClientRect(),
					c = this._boundingRect,
					d = n(a),
					e = {
						left: b.left - c.left - d.marginLeft,
						top: b.top - c.top - d.marginTop,
						right: c.right - b.right - d.marginRight,
						bottom: c.bottom - b.bottom - d.marginBottom
					};
				return e
			}, q.prototype.handleEvent = function(a) {
				var b = "on" + a.type;
				this[b] && this[b](a)
			}, q.prototype.bindResize = function() {
				this.isResizeBound || (c.bind(a, "resize", this), this.isResizeBound = !0)
			}, q.prototype.unbindResize = function() {
				this.isResizeBound && c.unbind(a, "resize", this), this.isResizeBound = !1
			}, q.prototype.onresize = function() {
				function a() {
					b.resize(), delete b.resizeTimeout
				}
				this.resizeTimeout && clearTimeout(this.resizeTimeout);
				var b = this;
				this.resizeTimeout = setTimeout(a, 100)
			}, q.prototype.resize = function() {
				this.isResizeBound && this.needsResizeLayout() && this.layout()
			}, q.prototype.needsResizeLayout = function() {
				var a = n(this.element),
					b = this.size && a;
				return b && a.innerWidth !== this.size.innerWidth
			}, q.prototype.addItems = function(a) {
				var b = this._itemize(a);
				return b.length && (this.items = this.items.concat(b)), b
			}, q.prototype.appended = function(a) {
				var b = this.addItems(a);
				b.length && (this.layoutItems(b, !0), this.reveal(b))
			}, q.prototype.prepended = function(a) {
				var b = this._itemize(a);
				if (b.length) {
					var c = this.items.slice(0);
					this.items = b.concat(c), this._resetLayout(), this._manageStamps(), this.layoutItems(b, !0),
						this.reveal(b), this.layoutItems(c)
				}
			}, q.prototype.reveal = function(a) {
				var b = a && a.length;
				if (b)
					for (var c = 0; b > c; c++) {
						var d = a[c];
						d.reveal()
					}
			}, q.prototype.hide = function(a) {
				var b = a && a.length;
				if (b)
					for (var c = 0; b > c; c++) {
						var d = a[c];
						d.hide()
					}
			}, q.prototype.getItem = function(a) {
				for (var b = 0, c = this.items.length; c > b; b++) {
					var d = this.items[b];
					if (d.element === a) return d
				}
			}, q.prototype.getItems = function(a) {
				if (a && a.length) {
					for (var b = [], c = 0, d = a.length; d > c; c++) {
						var e = a[c],
							f = this.getItem(e);
						f && b.push(f)
					}
					return b
				}
			}, q.prototype.remove = function(a) {
				a = d(a);
				var b = this.getItems(a);
				if (b && b.length) {
					this._itemsOn(b, "remove", function() {
						this.emitEvent("removeComplete", [this, b])
					});
					for (var c = 0, f = b.length; f > c; c++) {
						var g = b[c];
						g.remove(), e(g, this.items)
					}
				}
			}, q.prototype.destroy = function() {
				var a = this.element.style;
				a.height = "", a.position = "", a.width = "";
				for (var b = 0, c = this.items.length; c > b; b++) {
					var d = this.items[b];
					d.destroy()
				}
				this.unbindResize(), delete this.element.outlayerGUID, j && j.removeData(this.element, this
					.constructor.namespace)
			}, q.data = function(a) {
				var b = a && a.outlayerGUID;
				return b && s[b]
			}, q.create = function(a, c) {
				function d() {
					q.apply(this, arguments)
				}
				return Object.create ? d.prototype = Object.create(q.prototype) : b(d.prototype, q.prototype), d
					.prototype.constructor = d, d.defaults = b({}, q.defaults), b(d.defaults, c), d.prototype
					.settings = {}, d.namespace = a, d.data = q.data, d.Item = function() {
						p.apply(this, arguments)
					}, d.Item.prototype = new p, g(function() {
						for (var b = f(a), c = h.querySelectorAll(".js-" + b), e = "data-" + b + "-options", g =
								0, k = c.length; k > g; g++) {
							var l, m = c[g],
								n = m.getAttribute(e);
							try {
								l = n && JSON.parse(n)
							} catch (o) {
								i && i.error("Error parsing " + e + " on " + m.nodeName.toLowerCase() + (m.id ?
									"#" + m.id : "") + ": " + o);
								continue
							}
							var p = new d(m, l);
							j && j.data(m, a, p)
						}
					}), j && j.bridget && j.bridget(a, d), d
			}, q.Item = p, q
		}
		var h = a.document,
			i = a.console,
			j = a.jQuery,
			k = function() {},
			l = Object.prototype.toString,
			m = "object" == typeof HTMLElement ? function(a) {
				return a instanceof HTMLElement
			} : function(a) {
				return a && "object" == typeof a && 1 === a.nodeType && "string" == typeof a.nodeName
			},
			n = Array.prototype.indexOf ? function(a, b) {
				return a.indexOf(b)
			} : function(a, b) {
				for (var c = 0, d = a.length; d > c; c++)
					if (a[c] === b) return c;
				return -1
			};
		"function" == typeof define && define.amd ? define("outlayer/outlayer", ["eventie/eventie",
			"doc-ready/doc-ready", "eventEmitter/EventEmitter", "get-size/get-size",
			"matches-selector/matches-selector", "./item"
		], g) : a.Outlayer = g(a.eventie, a.docReady, a.EventEmitter, a.getSize, a.matchesSelector, a.Outlayer.Item)
	}(window),
	function(a) {
		function b(a, b) {
			var d = a.create("masonry");
			return d.prototype._resetLayout = function() {
				this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter",
					"outerWidth"), this.measureColumns();
				var a = this.cols;
				for (this.colYs = []; a--;) this.colYs.push(0);
				this.maxY = 0
			}, d.prototype.measureColumns = function() {
				if (this.getContainerWidth(), !this.columnWidth) {
					var a = this.items[0],
						c = a && a.element;
					this.columnWidth = c && b(c).outerWidth || this.containerWidth
				}
				this.columnWidth += this.gutter, this.cols = Math.floor((this.containerWidth + this.gutter) / this
					.columnWidth), this.cols = Math.max(this.cols, 1)
			}, d.prototype.getContainerWidth = function() {
				var a = this.options.isFitWidth ? this.element.parentNode : this.element,
					c = b(a);
				this.containerWidth = c && c.innerWidth
			}, d.prototype._getItemLayoutPosition = function(a) {
				a.getSize();
				var b = a.size.outerWidth % this.columnWidth,
					d = b && 1 > b ? "round" : "ceil",
					e = Math[d](a.size.outerWidth / this.columnWidth);
				e = Math.min(e, this.cols);
				for (var f = this._getColGroup(e), g = Math.min.apply(Math, f), h = c(f, g), i = {
						x: this.columnWidth * h,
						y: g
					}, j = g + a.size.outerHeight, k = this.cols + 1 - f.length, l = 0; k > l; l++) this.colYs[h +
					l] = j;
				return i
			}, d.prototype._getColGroup = function(a) {
				if (2 > a) return this.colYs;
				for (var b = [], c = this.cols + 1 - a, d = 0; c > d; d++) {
					var e = this.colYs.slice(d, d + a);
					b[d] = Math.max.apply(Math, e)
				}
				return b
			}, d.prototype._manageStamp = function(a) {
				var c = b(a),
					d = this._getElementOffset(a),
					e = this.options.isOriginLeft ? d.left : d.right,
					f = e + c.outerWidth,
					g = Math.floor(e / this.columnWidth);
				g = Math.max(0, g);
				var h = Math.floor(f / this.columnWidth);
				h -= f % this.columnWidth ? 0 : 1, h = Math.min(this.cols - 1, h);
				for (var i = (this.options.isOriginTop ? d.top : d.bottom) + c.outerHeight, j = g; h >= j; j++) this
					.colYs[j] = Math.max(i, this.colYs[j])
			}, d.prototype._getContainerSize = function() {
				this.maxY = Math.max.apply(Math, this.colYs);
				var a = {
					height: this.maxY
				};
				return this.options.isFitWidth && (a.width = this._getContainerFitWidth()), a
			}, d.prototype._getContainerFitWidth = function() {
				for (var a = 0, b = this.cols; --b && 0 === this.colYs[b];) a++;
				return (this.cols - a) * this.columnWidth - this.gutter
			}, d.prototype.needsResizeLayout = function() {
				var a = this.containerWidth;
				return this.getContainerWidth(), a !== this.containerWidth
			}, d
		}
		var c = Array.prototype.indexOf ? function(a, b) {
			return a.indexOf(b)
		} : function(a, b) {
			for (var c = 0, d = a.length; d > c; c++) {
				var e = a[c];
				if (e === b) return c
			}
			return -1
		};
		"function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size"], b) : a.Masonry =
			b(a.Outlayer, a.getSize)
	}(window);


/*!
 * imagesLoaded PACKAGED v4.1.0
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

! function(t, e) {
	"function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module
		.exports ? module.exports = e() : t.EvEmitter = e()
}(this, function() {
	function t() {}
	var e = t.prototype;
	return e.on = function(t, e) {
		if (t && e) {
			var i = this._events = this._events || {},
				n = i[t] = i[t] || [];
			return -1 == n.indexOf(e) && n.push(e), this
		}
	}, e.once = function(t, e) {
		if (t && e) {
			this.on(t, e);
			var i = this._onceEvents = this._onceEvents || {},
				n = i[t] = i[t] || [];
			return n[e] = !0, this
		}
	}, e.off = function(t, e) {
		var i = this._events && this._events[t];
		if (i && i.length) {
			var n = i.indexOf(e);
			return -1 != n && i.splice(n, 1), this
		}
	}, e.emitEvent = function(t, e) {
		var i = this._events && this._events[t];
		if (i && i.length) {
			var n = 0,
				o = i[n];
			e = e || [];
			for (var r = this._onceEvents && this._onceEvents[t]; o;) {
				var s = r && r[o];
				s && (this.off(t, o), delete r[o]), o.apply(this, e), n += s ? 0 : 1, o = i[n]
			}
			return this
		}
	}, t
}),
function(t, e) {
	"use strict";
	"function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function(i) {
			return e(t, i)
		}) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter")) : t
		.imagesLoaded = e(t, t.EvEmitter)
}(window, function(t, e) {
	function i(t, e) {
		for (var i in e) t[i] = e[i];
		return t
	}

	function n(t) {
		var e = [];
		if (Array.isArray(t)) e = t;
		else if ("number" == typeof t.length)
			for (var i = 0; i < t.length; i++) e.push(t[i]);
		else e.push(t);
		return e
	}

	function o(t, e, r) {
		return this instanceof o ? ("string" == typeof t && (t = document.querySelectorAll(t)), this.elements = n(
			t), this.options = i({}, this.options), "function" == typeof e ? r = e : i(this.options, e), r &&
			this.on("always", r), this.getImages(), h && (this.jqDeferred = new h.Deferred), void setTimeout(
				function() {
					this.check()
				}.bind(this))) : new o(t, e, r)
	}

	function r(t) {
		this.img = t
	}

	function s(t, e) {
		this.url = t, this.element = e, this.img = new Image
	}
	var h = t.jQuery,
		a = t.console;
	o.prototype = Object.create(e.prototype), o.prototype.options = {}, o.prototype.getImages = function() {
		this.images = [], this.elements.forEach(this.addElementImages, this)
	}, o.prototype.addElementImages = function(t) {
		"IMG" == t.nodeName && this.addImage(t), this.options.background === !0 && this
			.addElementBackgroundImages(t);
		var e = t.nodeType;
		if (e && d[e]) {
			for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
				var o = i[n];
				this.addImage(o)
			}
			if ("string" == typeof this.options.background) {
				var r = t.querySelectorAll(this.options.background);
				for (n = 0; n < r.length; n++) {
					var s = r[n];
					this.addElementBackgroundImages(s)
				}
			}
		}
	};
	var d = {
		1: !0,
		9: !0,
		11: !0
	};
	return o.prototype.addElementBackgroundImages = function(t) {
		var e = getComputedStyle(t);
		if (e)
			for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage); null !== n;) {
				var o = n && n[2];
				o && this.addBackground(o, t), n = i.exec(e.backgroundImage)
			}
	}, o.prototype.addImage = function(t) {
		var e = new r(t);
		this.images.push(e)
	}, o.prototype.addBackground = function(t, e) {
		var i = new s(t, e);
		this.images.push(i)
	}, o.prototype.check = function() {
		function t(t, i, n) {
			setTimeout(function() {
				e.progress(t, i, n)
			})
		}
		var e = this;
		return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(
			function(e) {
				e.once("progress", t), e.check()
			}) : void this.complete()
	}, o.prototype.progress = function(t, e, i) {
		this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emitEvent("progress",
				[this, t, e]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t),
			this.progressedCount == this.images.length && this.complete(), this.options.debug && a && a.log(
				"progress: " + i, t, e)
	}, o.prototype.complete = function() {
		var t = this.hasAnyBroken ? "fail" : "done";
		if (this.isComplete = !0, this.emitEvent(t, [this]), this.emitEvent("always", [this]), this
			.jqDeferred) {
			var e = this.hasAnyBroken ? "reject" : "resolve";
			this.jqDeferred[e](this)
		}
	}, r.prototype = Object.create(e.prototype), r.prototype.check = function() {
		var t = this.getIsImageComplete();
		return t ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage =
			new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener(
				"error", this), this.img.addEventListener("load", this), this.img.addEventListener("error",
				this), void(this.proxyImage.src = this.img.src))
	}, r.prototype.getIsImageComplete = function() {
		return this.img.complete && void 0 !== this.img.naturalWidth
	}, r.prototype.confirm = function(t, e) {
		this.isLoaded = t, this.emitEvent("progress", [this, this.img, e])
	}, r.prototype.handleEvent = function(t) {
		var e = "on" + t.type;
		this[e] && this[e](t)
	}, r.prototype.onload = function() {
		this.confirm(!0, "onload"), this.unbindEvents()
	}, r.prototype.onerror = function() {
		this.confirm(!1, "onerror"), this.unbindEvents()
	}, r.prototype.unbindEvents = function() {
		this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this),
			this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
	}, s.prototype = Object.create(r.prototype), s.prototype.check = function() {
		this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this
			.url;
		var t = this.getIsImageComplete();
		t && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
	}, s.prototype.unbindEvents = function() {
		this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
	}, s.prototype.confirm = function(t, e) {
		this.isLoaded = t, this.emitEvent("progress", [this, this.element, e])
	}, o.makeJQueryPlugin = function(e) {
		e = e || t.jQuery, e && (h = e, h.fn.imagesLoaded = function(t, e) {
			var i = new o(this, t, e);
			return i.jqDeferred.promise(h(this))
		})
	}, o.makeJQueryPlugin(), o
});


! function(t) {
	"use strict";
	t.fn.countUp = function(e) {
		var a = t.extend({
			time: 2e3,
			delay: 10
		}, e);
		return this.each(function() {
			var e = t(this),
				n = a,
				u = function() {
					e.data("counterupTo") || e.data("counterupTo", e.text());
					var t = parseInt(e.data("counter-time")) > 0 ? parseInt(e.data("counter-time")) : n
						.time,
						a = parseInt(e.data("counter-delay")) > 0 ? parseInt(e.data("counter-delay")) : n
						.delay,
						u = t / a,
						r = e.data("counterupTo"),
						o = [r],
						c = /[0-9]+,[0-9]+/.test(r);
					r = r.replace(/,/g, "");
					for (var d = (/^[0-9]+$/.test(r), /^[0-9]+\.[0-9]+$/.test(r)), s = d ? (r.split(".")[
							1] || []).length : 0, i = u; i >= 1; i--) {
						var p = parseInt(Math.round(r / u * i));
						if (d && (p = parseFloat(r / u * i).toFixed(s)), c)
							for (;
								/(\d+)(\d{3})/.test(p.toString());) p = p.toString().replace(/(\d+)(\d{3})/,
								"$1,$2");
						o.unshift(p)
					}
					e.data("counterup-nums", o), e.text("0");
					var f = function() {
						e.text(e.data("counterup-nums").shift()), e.data("counterup-nums").length ?
							setTimeout(e.data("counterup-func"), a) : (delete e.data("counterup-nums"),
								e.data("counterup-nums", null), e.data("counterup-func", null))
					};
					e.data("counterup-func", f), setTimeout(e.data("counterup-func"), a)
				};
			e.waypoint(u, {
				offset: "100%",
				triggerOnce: !0
			})
		})
	}
}(jQuery);


! function(i) {
	i.fn.theiaStickySidebar = function(t) {
		function e(t, e) {
			var a = o(t, e);
			a || (console.log("TSS: Body width smaller than options.minWidth. Init is delayed."), i(document).on(
				"scroll." + t.namespace,
				function(t, e) {
					return function(a) {
						var n = o(t, e);
						n && i(this).unbind(a)
					}
				}(t, e)), i(window).on("resize." + t.namespace, function(t, e) {
				return function(a) {
					var n = o(t, e);
					n && i(this).unbind(a)
				}
			}(t, e)))
		}

		function o(t, e) {
			return t.initialized === !0 || !(i("body").width() < t.minWidth) && (a(t, e), !0)
		}

		function a(t, e) {
			t.initialized = !0;
			var o = i("#theia-sticky-sidebar-stylesheet-" + t.namespace);
			0 === o.length && i("head").append(i('<style id="theia-sticky-sidebar-stylesheet-' + t.namespace +
				'">.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>')), e.each(
				function() {
					function e() {
						a.fixedScrollTop = 0, a.sidebar.css({
							"min-height": "1px"
						}), a.stickySidebar.css({
							position: "static",
							width: "",
							transform: "none"
						})
					}

					function o(t) {
						var e = t.height();
						return t.children().each(function() {
							e = Math.max(e, i(this).height())
						}), e
					}
					var a = {};
					if (a.sidebar = i(this), a.options = t || {}, a.container = i(a.options.containerSelector),
						0 == a.container.length && (a.container = a.sidebar.parent()), a.sidebar.parents().css(
							"-webkit-transform", "none"), a.sidebar.css({
							position: a.options.defaultPosition,
							overflow: "visible",
							"-webkit-box-sizing": "border-box",
							"-moz-box-sizing": "border-box",
							"box-sizing": "border-box"
						}), a.stickySidebar = a.sidebar.find(".theiaStickySidebar"), 0 == a.stickySidebar.length
						) {
						var s = /(?:text|application)\/(?:x-)?(?:javascript|ecmascript)/i;
						a.sidebar.find("script").filter(function(i, t) {
							return 0 === t.type.length || t.type.match(s)
						}).remove(), a.stickySidebar = i("<div>").addClass("theiaStickySidebar").append(a
							.sidebar.children()), a.sidebar.append(a.stickySidebar)
					}
					a.marginBottom = parseInt(a.sidebar.css("margin-bottom")), a.paddingTop = parseInt(a.sidebar
						.css("padding-top")), a.paddingBottom = parseInt(a.sidebar.css("padding-bottom"));
					var r = a.stickySidebar.offset().top,
						d = a.stickySidebar.outerHeight();
					a.stickySidebar.css("padding-top", 1), a.stickySidebar.css("padding-bottom", 1), r -= a
						.stickySidebar.offset().top, d = a.stickySidebar.outerHeight() - d - r, 0 == r ? (a
							.stickySidebar.css("padding-top", 0), a.stickySidebarPaddingTop = 0) : a
						.stickySidebarPaddingTop = 1, 0 == d ? (a.stickySidebar.css("padding-bottom", 0), a
							.stickySidebarPaddingBottom = 0) : a.stickySidebarPaddingBottom = 1, a
						.previousScrollTop = null, a.fixedScrollTop = 0, e(), a.onScroll = function(a) {
							if (a.stickySidebar.is(":visible")) {
								if (i("body").width() < a.options.minWidth) return void e();
								if (a.options.disableOnResponsiveLayouts) {
									var s = a.sidebar.outerWidth("none" == a.sidebar.css("float"));
									if (s + 50 > a.container.width()) return void e()
								}
								var r = i(document).scrollTop(),
									d = "static";
								if (r >= a.sidebar.offset().top + (a.paddingTop - a.options
									.additionalMarginTop)) {
									var c, p = a.paddingTop + t.additionalMarginTop,
										b = a.paddingBottom + a.marginBottom + t.additionalMarginBottom,
										l = a.sidebar.offset().top,
										f = a.sidebar.offset().top + o(a.container),
										h = 0 + t.additionalMarginTop,
										g = a.stickySidebar.outerHeight() + p + b < i(window).height();
									c = g ? h + a.stickySidebar.outerHeight() : i(window).height() - a
										.marginBottom - a.paddingBottom - t.additionalMarginBottom;
									var u = l - r + a.paddingTop,
										S = f - r - a.paddingBottom - a.marginBottom,
										y = a.stickySidebar.offset().top - r,
										m = a.previousScrollTop - r;
									"fixed" == a.stickySidebar.css("position") && "modern" == a.options
										.sidebarBehavior && (y += m), "stick-to-top" == a.options
										.sidebarBehavior && (y = t.additionalMarginTop), "stick-to-bottom" == a
										.options.sidebarBehavior && (y = c - a.stickySidebar.outerHeight()), y =
										m > 0 ? Math.min(y, h) : Math.max(y, c - a.stickySidebar.outerHeight()),
										y = Math.max(y, u), y = Math.min(y, S - a.stickySidebar.outerHeight());
									var k = a.container.height() == a.stickySidebar.outerHeight();
									d = (k || y != h) && (k || y != c - a.stickySidebar.outerHeight()) ? r + y -
										a.sidebar.offset().top - a.paddingTop <= t.additionalMarginTop ?
										"static" : "absolute" : "fixed"
								}
								if ("fixed" == d) {
									var v = i(document).scrollLeft();
									a.stickySidebar.css({
										position: "fixed",
										width: n(a.stickySidebar) + "px",
										transform: "translateY(" + y + "px)",
										left: a.sidebar.offset().left + parseInt(a.sidebar.css(
											"padding-left")) - v + "px",
										top: "0px"
									})
								} else if ("absolute" == d) {
									var x = {};
									"absolute" != a.stickySidebar.css("position") && (x.position = "absolute", x
											.transform = "translateY(" + (r + y - a.sidebar.offset().top - a
												.stickySidebarPaddingTop - a.stickySidebarPaddingBottom) +
											"px)", x.top = "0px"), x.width = n(a.stickySidebar) + "px", x.left =
										"", a.stickySidebar.css(x)
								} else "static" == d && e();
								"static" != d && 1 == a.options.updateSidebarHeight && a.sidebar.css({
									"min-height": a.stickySidebar.outerHeight() + a.stickySidebar
										.offset().top - a.sidebar.offset().top + a.paddingBottom
								}), a.previousScrollTop = r
							}
						}, a.onScroll(a), i(document).on("scroll." + a.options.namespace, function(i) {
							return function() {
								i.onScroll(i)
							}
						}(a)), i(window).on("resize." + a.options.namespace, function(i) {
							return function() {
								i.stickySidebar.css({
									position: "static"
								}), i.onScroll(i)
							}
						}(a)), "undefined" != typeof ResizeSensor && new ResizeSensor(a.stickySidebar[0],
							function(i) {
								return function() {
									i.onScroll(i)
								}
							}(a))
				})
		}

		function n(i) {
			var t;
			try {
				t = i[0].getBoundingClientRect().width
			} catch (i) {}
			return "undefined" == typeof t && (t = i.width()), t
		}
		var s = {
			containerSelector: "",
			additionalMarginTop: 0,
			additionalMarginBottom: 0,
			updateSidebarHeight: !0,
			minWidth: 0,
			disableOnResponsiveLayouts: !0,
			sidebarBehavior: "modern",
			defaultPosition: "relative",
			namespace: "TSS"
		};
		return t = i.extend(s, t), t.additionalMarginTop = parseInt(t.additionalMarginTop) || 0, t
			.additionalMarginBottom = parseInt(t.additionalMarginBottom) || 0, e(t, this), this
	}
}(jQuery);




;
(function($) {
	"use strict";
	var feature = {};
	feature.fileapi = $("<input type='file'/>").get(0).files !== undefined;
	feature.formdata = window.FormData !== undefined;
	$.fn.ajaxSubmit = function(options) {
		if (!this.length) {
			log('ajaxSubmit: skipping submit process - no element selected');
			return this
		}
		var method, action, url, $form = this;
		if (typeof options == 'function') {
			options = {
				success: options
			}
		}
		method = this.attr('method');
		action = this.attr('action');
		url = (typeof action === 'string') ? $.trim(action) : '';
		url = url || window.location.href || '';
		if (url) {
			url = (url.match(/^([^#]+)/) || [])[1]
		}
		options = $.extend(true, {
			url: url,
			success: $.ajaxSettings.success,
			type: method || 'GET',
			iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank'
		}, options);
		var veto = {};
		this.trigger('form-pre-serialize', [this, options, veto]);
		if (veto.veto) {
			log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
			return this
		}
		if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
			log('ajaxSubmit: submit aborted via beforeSerialize callback');
			return this
		}
		var traditional = options.traditional;
		if (traditional === undefined) {
			traditional = $.ajaxSettings.traditional
		}
		var elements = [];
		var qx, a = this.formToArray(options.semantic, elements);
		if (options.data) {
			options.extraData = options.data;
			qx = $.param(options.data, traditional)
		}
		if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
			log('ajaxSubmit: submit aborted via beforeSubmit callback');
			return this
		}
		this.trigger('form-submit-validate', [a, this, options, veto]);
		if (veto.veto) {
			log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
			return this
		}
		var q = $.param(a, traditional);
		if (qx) {
			q = (q ? (q + '&' + qx) : qx)
		}
		if (options.type.toUpperCase() == 'GET') {
			options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
			options.data = null
		} else {
			options.data = q
		}
		var callbacks = [];
		if (options.resetForm) {
			callbacks.push(function() {
				$form.resetForm()
			})
		}
		if (options.clearForm) {
			callbacks.push(function() {
				$form.clearForm(options.includeHidden)
			})
		}
		if (!options.dataType && options.target) {
			var oldSuccess = options.success || function() {};
			callbacks.push(function(data) {
				var fn = options.replaceTarget ? 'replaceWith' : 'html';
				$(options.target)[fn](data).each(oldSuccess, arguments)
			})
		} else if (options.success) {
			callbacks.push(options.success)
		}
		options.success = function(data, status, xhr) {
			var context = options.context || this;
			for (var i = 0, max = callbacks.length; i < max; i++) {
				callbacks[i].apply(context, [data, status, xhr || $form, $form])
			}
		};
		var fileInputs = $('input:file:enabled[value]', this);
		var hasFileInputs = fileInputs.length > 0;
		var mp = 'multipart/form-data';
		var multipart = ($form.attr('enctype') == mp || $form.attr('encoding') == mp);
		var fileAPI = feature.fileapi && feature.formdata;
		log("fileAPI :" + fileAPI);
		var shouldUseFrame = (hasFileInputs || multipart) && !fileAPI;
		if (options.iframe !== false && (options.iframe || shouldUseFrame)) {
			if (options.closeKeepAlive) {
				$.get(options.closeKeepAlive, function() {
					fileUploadIframe(a)
				})
			} else {
				fileUploadIframe(a)
			}
		} else if ((hasFileInputs || multipart) && fileAPI) {
			fileUploadXhr(a)
		} else {
			$.ajax(options)
		}
		for (var k = 0; k < elements.length; k++) elements[k] = null;
		this.trigger('form-submit-notify', [this, options]);
		return this;

		function deepSerialize(extraData) {
			var serialized = $.param(extraData).split('&');
			var len = serialized.length;
			var result = {};
			var i, part;
			for (i = 0; i < len; i++) {
				part = serialized[i].split('=');
				result[decodeURIComponent(part[0])] = decodeURIComponent(part[1])
			}
			return result
		}

		function fileUploadXhr(a) {
			var formdata = new FormData();
			for (var i = 0; i < a.length; i++) {
				formdata.append(a[i].name, a[i].value)
			}
			if (options.extraData) {
				var serializedData = deepSerialize(options.extraData);
				for (var p in serializedData)
					if (serializedData.hasOwnProperty(p)) formdata.append(p, serializedData[p])
			}
			options.data = null;
			var s = $.extend(true, {}, $.ajaxSettings, options, {
				contentType: false,
				processData: false,
				cache: false,
				type: 'POST'
			});
			if (options.uploadProgress) {
				s.xhr = function() {
					var xhr = jQuery.ajaxSettings.xhr();
					if (xhr.upload) {
						xhr.upload.onprogress = function(event) {
							var percent = 0;
							var position = event.loaded || event.position;
							var total = event.total;
							if (event.lengthComputable) {
								percent = Math.ceil(position / total * 100)
							}
							options.uploadProgress(event, position, total, percent)
						}
					}
					return xhr
				}
			}
			s.data = null;
			var beforeSend = s.beforeSend;
			s.beforeSend = function(xhr, o) {
				o.data = formdata;
				if (beforeSend) beforeSend.call(this, xhr, o)
			};
			$.ajax(s)
		}

		function fileUploadIframe(a) {
			var form = $form[0],
				el, i, s, g, id, $io, io, xhr, sub, n, timedOut, timeoutHandle;
			var useProp = !!$.fn.prop;
			if ($(':input[name=submit],:input[id=submit]', form).length) {
				alert('Error: Form elements must not have name or id of "submit".');
				return
			}
			if (a) {
				for (i = 0; i < elements.length; i++) {
					el = $(elements[i]);
					if (useProp) el.prop('disabled', false);
					else el.removeAttr('disabled')
				}
			}
			s = $.extend(true, {}, $.ajaxSettings, options);
			s.context = s.context || s;
			id = 'jqFormIO' + (new Date().getTime());
			if (s.iframeTarget) {
				$io = $(s.iframeTarget);
				n = $io.attr('name');
				if (!n) $io.attr('name', id);
				else id = n
			} else {
				$io = $('<iframe name="' + id + '" src="' + s.iframeSrc + '" />');
				$io.css({
					position: 'absolute',
					top: '-1000px',
					left: '-1000px'
				})
			}
			io = $io[0];
			xhr = {
				aborted: 0,
				responseText: null,
				responseXML: null,
				status: 0,
				statusText: 'n/a',
				getAllResponseHeaders: function() {},
				getResponseHeader: function() {},
				setRequestHeader: function() {},
				abort: function(status) {
					var e = (status === 'timeout' ? 'timeout' : 'aborted');
					log('aborting upload... ' + e);
					this.aborted = 1;
					if (io.contentWindow.document.execCommand) {
						try {
							io.contentWindow.document.execCommand('Stop')
						} catch (ignore) {}
					}
					$io.attr('src', s.iframeSrc);
					xhr.error = e;
					if (s.error) s.error.call(s.context, xhr, e, status);
					if (g) $.event.trigger("ajaxError", [xhr, s, e]);
					if (s.complete) s.complete.call(s.context, xhr, e)
				}
			};
			g = s.global;
			if (g && 0 === $.active++) {
				$.event.trigger("ajaxStart")
			}
			if (g) {
				$.event.trigger("ajaxSend", [xhr, s])
			}
			if (s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false) {
				if (s.global) {
					$.active--
				}
				return
			}
			if (xhr.aborted) {
				return
			}
			sub = form.clk;
			if (sub) {
				n = sub.name;
				if (n && !sub.disabled) {
					s.extraData = s.extraData || {};
					s.extraData[n] = sub.value;
					if (sub.type == "image") {
						s.extraData[n + '.x'] = form.clk_x;
						s.extraData[n + '.y'] = form.clk_y
					}
				}
			}
			var CLIENT_TIMEOUT_ABORT = 1;
			var SERVER_ABORT = 2;

			function getDoc(frame) {
				var doc = frame.contentWindow ? frame.contentWindow.document : frame.contentDocument ? frame
					.contentDocument : frame.document;
				return doc
			}
			var csrf_token = $('meta[name=csrf-token]').attr('content');
			var csrf_param = $('meta[name=csrf-param]').attr('content');
			if (csrf_param && csrf_token) {
				s.extraData = s.extraData || {};
				s.extraData[csrf_param] = csrf_token
			}

			function doSubmit() {
				var t = $form.attr('target'),
					a = $form.attr('action');
				form.setAttribute('target', id);
				if (!method) {
					form.setAttribute('method', 'POST')
				}
				if (a != s.url) {
					form.setAttribute('action', s.url)
				}
				if (!s.skipEncodingOverride && (!method || /post/i.test(method))) {
					$form.attr({
						encoding: 'multipart/form-data',
						enctype: 'multipart/form-data'
					})
				}
				if (s.timeout) {
					timeoutHandle = setTimeout(function() {
						timedOut = true;
						cb(CLIENT_TIMEOUT_ABORT)
					}, s.timeout)
				}

				function checkState() {
					try {
						var state = getDoc(io).readyState;
						log('state = ' + state);
						if (state && state.toLowerCase() == 'uninitialized') setTimeout(checkState, 50)
					} catch (e) {
						log('Server abort: ', e, ' (', e.name, ')');
						cb(SERVER_ABORT);
						if (timeoutHandle) clearTimeout(timeoutHandle);
						timeoutHandle = undefined
					}
				}
				var extraInputs = [];
				try {
					if (s.extraData) {
						for (var n in s.extraData) {
							if (s.extraData.hasOwnProperty(n)) {
								if ($.isPlainObject(s.extraData[n]) && s.extraData[n].hasOwnProperty('name') &&
									s.extraData[n].hasOwnProperty('value')) {
									extraInputs.push($('<input type="hidden" name="' + s.extraData[n].name +
										'">').attr('value', s.extraData[n].value).appendTo(form)[0])
								} else {
									extraInputs.push($('<input type="hidden" name="' + n + '">').attr('value', s
										.extraData[n]).appendTo(form)[0])
								}
							}
						}
					}
					if (!s.iframeTarget) {
						$io.appendTo('body');
						if (io.attachEvent) io.attachEvent('onload', cb);
						else io.addEventListener('load', cb, false)
					}
					setTimeout(checkState, 15);
					form.submit()
				} finally {
					form.setAttribute('action', a);
					if (t) {
						form.setAttribute('target', t)
					} else {
						$form.removeAttr('target')
					}
					$(extraInputs).remove()
				}
			}
			if (s.forceSync) {
				doSubmit()
			} else {
				setTimeout(doSubmit, 10)
			}
			var data, doc, domCheckCount = 50,
				callbackProcessed;

			function cb(e) {
				if (xhr.aborted || callbackProcessed) {
					return
				}
				try {
					doc = getDoc(io)
				} catch (ex) {
					log('cannot access response document: ', ex);
					e = SERVER_ABORT
				}
				if (e === CLIENT_TIMEOUT_ABORT && xhr) {
					xhr.abort('timeout');
					return
				} else if (e == SERVER_ABORT && xhr) {
					xhr.abort('server abort');
					return
				}
				if (!doc || doc.location.href == s.iframeSrc) {
					if (!timedOut) return
				}
				if (io.detachEvent) io.detachEvent('onload', cb);
				else io.removeEventListener('load', cb, false);
				var status = 'success',
					errMsg;
				try {
					if (timedOut) {
						throw 'timeout';
					}
					var isXml = s.dataType == 'xml' || doc.XMLDocument || $.isXMLDoc(doc);
					log('isXml=' + isXml);
					if (!isXml && window.opera && (doc.body === null || !doc.body.innerHTML)) {
						if (--domCheckCount) {
							log('requeing onLoad callback, DOM not available');
							setTimeout(cb, 250);
							return
						}
					}
					var docRoot = doc.body ? doc.body : doc.documentElement;
					xhr.responseText = docRoot ? docRoot.innerHTML : null;
					xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
					if (isXml) s.dataType = 'xml';
					xhr.getResponseHeader = function(header) {
						var headers = {
							'content-type': s.dataType
						};
						return headers[header]
					};
					if (docRoot) {
						xhr.status = Number(docRoot.getAttribute('status')) || xhr.status;
						xhr.statusText = docRoot.getAttribute('statusText') || xhr.statusText
					}
					var dt = (s.dataType || '').toLowerCase();
					var scr = /(json|script|text)/.test(dt);
					if (scr || s.textarea) {
						var ta = doc.getElementsByTagName('textarea')[0];
						if (ta) {
							xhr.responseText = ta.value;
							xhr.status = Number(ta.getAttribute('status')) || xhr.status;
							xhr.statusText = ta.getAttribute('statusText') || xhr.statusText
						} else if (scr) {
							var pre = doc.getElementsByTagName('pre')[0];
							var b = doc.getElementsByTagName('body')[0];
							if (pre) {
								xhr.responseText = pre.textContent ? pre.textContent : pre.innerText
							} else if (b) {
								xhr.responseText = b.textContent ? b.textContent : b.innerText
							}
						}
					} else if (dt == 'xml' && !xhr.responseXML && xhr.responseText) {
						xhr.responseXML = toXml(xhr.responseText)
					}
					try {
						data = httpData(xhr, dt, s)
					} catch (e) {
						status = 'parsererror';
						xhr.error = errMsg = (e || status)
					}
				} catch (e) {
					log('error caught: ', e);
					status = 'error';
					xhr.error = errMsg = (e || status)
				}
				if (xhr.aborted) {
					log('upload aborted');
					status = null
				}
				if (xhr.status) {
					status = (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) ? 'success' : 'error'
				}
				if (status === 'success') {
					if (s.success) s.success.call(s.context, data, 'success', xhr);
					if (g) $.event.trigger("ajaxSuccess", [xhr, s])
				} else if (status) {
					if (errMsg === undefined) errMsg = xhr.statusText;
					if (s.error) s.error.call(s.context, xhr, status, errMsg);
					if (g) $.event.trigger("ajaxError", [xhr, s, errMsg])
				}
				if (g) $.event.trigger("ajaxComplete", [xhr, s]);
				if (g && !--$.active) {
					$.event.trigger("ajaxStop")
				}
				if (s.complete) s.complete.call(s.context, xhr, status);
				callbackProcessed = true;
				if (s.timeout) clearTimeout(timeoutHandle);
				setTimeout(function() {
					if (!s.iframeTarget) $io.remove();
					xhr.responseXML = null
				}, 100)
			}
			var toXml = $.parseXML || function(s, doc) {
				if (window.ActiveXObject) {
					doc = new ActiveXObject('Microsoft.XMLDOM');
					doc.async = 'false';
					doc.loadXML(s)
				} else {
					doc = (new DOMParser()).parseFromString(s, 'text/xml')
				}
				return (doc && doc.documentElement && doc.documentElement.nodeName != 'parsererror') ? doc :
					null
			};
			var parseJSON = $.parseJSON || function(s) {
				return window['eval']('(' + s + ')')
			};
			var httpData = function(xhr, type, s) {
				var ct = xhr.getResponseHeader('content-type') || '',
					xml = type === 'xml' || !type && ct.indexOf('xml') >= 0,
					data = xml ? xhr.responseXML : xhr.responseText;
				if (xml && data.documentElement.nodeName === 'parsererror') {
					if ($.error) $.error('parsererror')
				}
				if (s && s.dataFilter) {
					data = s.dataFilter(data, type)
				}
				if (typeof data === 'string') {
					if (type === 'json' || !type && ct.indexOf('json') >= 0) {
						data = parseJSON(data)
					} else if (type === "script" || !type && ct.indexOf("javascript") >= 0) {
						$.globalEval(data)
					}
				}
				return data
			}
		}
	};
	$.fn.ajaxForm = function(options) {
		options = options || {};
		options.delegation = options.delegation && $.isFunction($.fn.on);
		if (!options.delegation && this.length === 0) {
			var o = {
				s: this.selector,
				c: this.context
			};
			if (!$.isReady && o.s) {
				log('DOM not ready, queuing ajaxForm');
				$(function() {
					$(o.s, o.c).ajaxForm(options)
				});
				return this
			}
			log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
			return this
		}
		if (options.delegation) {
			$(document).off('submit.form-plugin', this.selector, doAjaxSubmit).off('click.form-plugin', this
				.selector, captureSubmittingElement).on('submit.form-plugin', this.selector, options,
				doAjaxSubmit).on('click.form-plugin', this.selector, options, captureSubmittingElement);
			return this
		}
		return this.ajaxFormUnbind().bind('submit.form-plugin', options, doAjaxSubmit).bind('click.form-plugin',
			options, captureSubmittingElement)
	};

	function doAjaxSubmit(e) {
		var options = e.data;
		if (!e.isDefaultPrevented()) {
			e.preventDefault();
			$(this).ajaxSubmit(options)
		}
	}

	function captureSubmittingElement(e) {
		var target = e.target;
		var $el = $(target);
		if (!($el.is(":submit,input:image"))) {
			var t = $el.closest(':submit');
			if (t.length === 0) {
				return
			}
			target = t[0]
		}
		var form = this;
		form.clk = target;
		if (target.type == 'image') {
			if (e.offsetX !== undefined) {
				form.clk_x = e.offsetX;
				form.clk_y = e.offsetY
			} else if (typeof $.fn.offset == 'function') {
				var offset = $el.offset();
				form.clk_x = e.pageX - offset.left;
				form.clk_y = e.pageY - offset.top
			} else {
				form.clk_x = e.pageX - target.offsetLeft;
				form.clk_y = e.pageY - target.offsetTop
			}
		}
		setTimeout(function() {
			form.clk = form.clk_x = form.clk_y = null
		}, 100)
	}
	$.fn.ajaxFormUnbind = function() {
		return this.unbind('submit.form-plugin click.form-plugin')
	};
	$.fn.formToArray = function(semantic, elements) {
		var a = [];
		if (this.length === 0) {
			return a
		}
		var form = this[0];
		var els = semantic ? form.getElementsByTagName('*') : form.elements;
		if (!els) {
			return a
		}
		var i, j, n, v, el, max, jmax;
		for (i = 0, max = els.length; i < max; i++) {
			el = els[i];
			n = el.name;
			if (!n) {
				continue
			}
			if (semantic && form.clk && el.type == "image") {
				if (!el.disabled && form.clk == el) {
					a.push({
						name: n,
						value: $(el).val(),
						type: el.type
					});
					a.push({
						name: n + '.x',
						value: form.clk_x
					}, {
						name: n + '.y',
						value: form.clk_y
					})
				}
				continue
			}
			v = $.fieldValue(el, true);
			if (v && v.constructor == Array) {
				if (elements) elements.push(el);
				for (j = 0, jmax = v.length; j < jmax; j++) {
					a.push({
						name: n,
						value: v[j]
					})
				}
			} else if (feature.fileapi && el.type == 'file' && !el.disabled) {
				if (elements) elements.push(el);
				var files = el.files;
				if (files.length) {
					for (j = 0; j < files.length; j++) {
						a.push({
							name: n,
							value: files[j],
							type: el.type
						})
					}
				} else {
					a.push({
						name: n,
						value: '',
						type: el.type
					})
				}
			} else if (v !== null && typeof v != 'undefined') {
				if (elements) elements.push(el);
				a.push({
					name: n,
					value: v,
					type: el.type,
					required: el.required
				})
			}
		}
		if (!semantic && form.clk) {
			var $input = $(form.clk),
				input = $input[0];
			n = input.name;
			if (n && !input.disabled && input.type == 'image') {
				a.push({
					name: n,
					value: $input.val()
				});
				a.push({
					name: n + '.x',
					value: form.clk_x
				}, {
					name: n + '.y',
					value: form.clk_y
				})
			}
		}
		return a
	};
	$.fn.formSerialize = function(semantic) {
		return $.param(this.formToArray(semantic))
	};
	$.fn.fieldSerialize = function(successful) {
		var a = [];
		this.each(function() {
			var n = this.name;
			if (!n) {
				return
			}
			var v = $.fieldValue(this, successful);
			if (v && v.constructor == Array) {
				for (var i = 0, max = v.length; i < max; i++) {
					a.push({
						name: n,
						value: v[i]
					})
				}
			} else if (v !== null && typeof v != 'undefined') {
				a.push({
					name: this.name,
					value: v
				})
			}
		});
		return $.param(a)
	};
	$.fn.fieldValue = function(successful) {
		for (var val = [], i = 0, max = this.length; i < max; i++) {
			var el = this[i];
			var v = $.fieldValue(el, successful);
			if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length)) {
				continue
			}
			if (v.constructor == Array) $.merge(val, v);
			else val.push(v)
		}
		return val
	};
	$.fieldValue = function(el, successful) {
		var n = el.name,
			t = el.type,
			tag = el.tagName.toLowerCase();
		if (successful === undefined) {
			successful = true
		}
		if (successful && (!n || el.disabled || t == 'reset' || t == 'button' || (t == 'checkbox' || t ==
					'radio') && !el.checked || (t == 'submit' || t == 'image') && el.form && el.form.clk !=
				el || tag == 'select' && el.selectedIndex == -1)) {
			return null
		}
		if (tag == 'select') {
			var index = el.selectedIndex;
			if (index < 0) {
				return null
			}
			var a = [],
				ops = el.options;
			var one = (t == 'select-one');
			var max = (one ? index + 1 : ops.length);
			for (var i = (one ? index : 0); i < max; i++) {
				var op = ops[i];
				if (op.selected) {
					var v = op.value;
					if (!v) {
						v = (op.attributes && op.attributes['value'] && !(op.attributes['value'].specified)) ?
							op.text : op.value
					}
					if (one) {
						return v
					}
					a.push(v)
				}
			}
			return a
		}
		return $(el).val()
	};
	$.fn.clearForm = function(includeHidden) {
		return this.each(function() {
			$('input,select,textarea', this).clearFields(includeHidden)
		})
	};
	$.fn.clearFields = $.fn.clearInputs = function(includeHidden) {
		var re = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
		return this.each(function() {
			var t = this.type,
				tag = this.tagName.toLowerCase();
			if (re.test(t) || tag == 'textarea') {
				this.value = ''
			} else if (t == 'checkbox' || t == 'radio') {
				this.checked = false
			} else if (tag == 'select') {
				this.selectedIndex = -1
			} else if (includeHidden) {
				if ((includeHidden === true && /hidden/.test(t)) || (typeof includeHidden == 'string' &&
						$(this).is(includeHidden))) this.value = ''
			}
		})
	};
	$.fn.resetForm = function() {
		return this.each(function() {
			if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset
					.nodeType)) {
				this.reset()
			}
		})
	};
	$.fn.enable = function(b) {
		if (b === undefined) {
			b = true
		}
		return this.each(function() {
			this.disabled = !b
		})
	};
	$.fn.selected = function(select) {
		if (select === undefined) {
			select = true
		}
		return this.each(function() {
			var t = this.type;
			if (t == 'checkbox' || t == 'radio') {
				this.checked = select
			} else if (this.tagName.toLowerCase() == 'option') {
				var $sel = $(this).parent('select');
				if (select && $sel[0] && $sel[0].type == 'select-one') {
					$sel.find('option').selected(false)
				}
				this.selected = select
			}
		})
	};
	$.fn.ajaxSubmit.debug = false;

	function log() {
		if (!$.fn.ajaxSubmit.debug) return;
		var msg = '[jquery.form] ' + Array.prototype.join.call(arguments, '');
		if (window.console && window.console.log) {
			window.console.log(msg)
		} else if (window.opera && window.opera.postError) {
			window.opera.postError(msg)
		}
	}
})(jQuery);


// ==================================================
// fancyBox v3.3.5
//
// Licensed GPLv3 for open source use
// or fancyBox Commercial License for commercial use
//
// http://fancyapps.com/fancybox/
// Copyright 2018 fancyApps
//
// ==================================================
! function(t, e, n, o) {
	"use strict";

	function i(t, e) {
		var o, i, a = [],
			s = 0;
		t && t.isDefaultPrevented() || (t.preventDefault(), e = t && t.data ? t.data.options : e || {}, o = e.$target ||
			n(t.currentTarget), i = o.attr("data-fancybox") || "", i ? (a = e.selector ? n(e.selector) : t.data ? t
				.data.items : [], a = a.length ? a.filter('[data-fancybox="' + i + '"]') : n('[data-fancybox="' +
					i + '"]'), s = a.index(o), s < 0 && (s = 0)) : a = [o], n.fancybox.open(a, e, s))
	}
	if (t.console = t.console || {
			info: function(t) {}
		}, n) {
		if (n.fn.fancybox) return void console.info("fancyBox already initialized");
		var a = {
				loop: !1,
				gutter: 50,
				keyboard: !0,
				arrows: !0,
				infobar: !0,
				smallBtn: "auto",
				toolbar: "auto",
				buttons: ["zoom", "thumbs", "close"],
				idleTime: 3,
				protect: !1,
				modal: !1,
				image: {
					preload: !1
				},
				ajax: {
					settings: {
						data: {
							fancybox: !0
						}
					}
				},
				iframe: {
					tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen allowtransparency="true" src=""></iframe>',
					preload: !0,
					css: {},
					attr: {
						scrolling: "auto"
					}
				},
				defaultType: "image",
				animationEffect: "zoom",
				animationDuration: 366,
				zoomOpacity: "auto",
				transitionEffect: "fade",
				transitionDuration: 366,
				slideClass: "",
				baseClass: "",
				baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="fancybox-toolbar">{{buttons}}</div><div class="fancybox-navigation">{{arrows}}</div><div class="fancybox-stage"></div><div class="fancybox-caption"></div></div></div>',
				spinnerTpl: '<div class="fancybox-loading"></div>',
				errorTpl: '<div class="fancybox-error"><p>{{ERROR}}</p></div>',
				btnTpl: {
					download: '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;"><svg viewBox="0 0 40 40"><path d="M13,16 L20,23 L27,16 M20,7 L20,23 M10,24 L10,28 L30,28 L30,24" /></svg></a>',
					zoom: '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}"><svg viewBox="0 0 40 40"><path d="M18,17 m-8,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0 M24,22 L31,29" /></svg></button>',
					close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg viewBox="0 0 40 40"><path d="M10,10 L30,30 M30,10 L10,30" /></svg></button>',
					smallBtn: '<button data-fancybox-close class="fancybox-close-small" title="{{CLOSE}}"><svg viewBox="0 0 32 32"><path d="M10,10 L22,22 M22,10 L10,22"></path></svg></button>',
					arrowLeft: '<a data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}" href="javascript:;"><svg viewBox="0 0 40 40"><path d="M18,12 L10,20 L18,28 M10,20 L30,20"></path></svg></a>',
					arrowRight: '<a data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}" href="javascript:;"><svg viewBox="0 0 40 40"><path d="M10,20 L30,20 M22,12 L30,20 L22,28"></path></svg></a>'
				},
				parentEl: "body",
				autoFocus: !1,
				backFocus: !0,
				trapFocus: !0,
				fullScreen: {
					autoStart: !1
				},
				touch: {
					vertical: !0,
					momentum: !0
				},
				hash: null,
				media: {},
				slideShow: {
					autoStart: !1,
					speed: 4e3
				},
				thumbs: {
					autoStart: !1,
					hideOnClose: !0,
					parentEl: ".fancybox-container",
					axis: "y"
				},
				wheel: "auto",
				onInit: n.noop,
				beforeLoad: n.noop,
				afterLoad: n.noop,
				beforeShow: n.noop,
				afterShow: n.noop,
				beforeClose: n.noop,
				afterClose: n.noop,
				onActivate: n.noop,
				onDeactivate: n.noop,
				clickContent: function(t, e) {
					return "image" === t.type && "zoom"
				},
				clickSlide: "close",
				clickOutside: "close",
				dblclickContent: !1,
				dblclickSlide: !1,
				dblclickOutside: !1,
				mobile: {
					idleTime: !1,
					clickContent: function(t, e) {
						return "image" === t.type && "toggleControls"
					},
					clickSlide: function(t, e) {
						return "image" === t.type ? "toggleControls" : "close"
					},
					dblclickContent: function(t, e) {
						return "image" === t.type && "zoom"
					},
					dblclickSlide: function(t, e) {
						return "image" === t.type && "zoom"
					}
				},
				lang: "en",
				i18n: {
					en: {
						CLOSE: "Close",
						NEXT: "Next",
						PREV: "Previous",
						ERROR: "The requested content cannot be loaded. <br/> Please try again later.",
						PLAY_START: "Start slideshow",
						PLAY_STOP: "Pause slideshow",
						FULL_SCREEN: "Full screen",
						THUMBS: "Thumbnails",
						DOWNLOAD: "Download",
						SHARE: "Share",
						ZOOM: "Zoom"
					},
					de: {
						CLOSE: "Schliessen",
						NEXT: "Weiter",
						PREV: "Zurück",
						ERROR: "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es später nochmal.",
						PLAY_START: "Diaschau starten",
						PLAY_STOP: "Diaschau beenden",
						FULL_SCREEN: "Vollbild",
						THUMBS: "Vorschaubilder",
						DOWNLOAD: "Herunterladen",
						SHARE: "Teilen",
						ZOOM: "Maßstab"
					}
				}
			},
			s = n(t),
			r = n(e),
			c = 0,
			l = function(t) {
				return t && t.hasOwnProperty && t instanceof n
			},
			d = function() {
				return t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t
					.oRequestAnimationFrame || function(e) {
						return t.setTimeout(e, 1e3 / 60)
					}
			}(),
			u = function() {
				var t, n = e.createElement("fakeelement"),
					i = {
						transition: "transitionend",
						OTransition: "oTransitionEnd",
						MozTransition: "transitionend",
						WebkitTransition: "webkitTransitionEnd"
					};
				for (t in i)
					if (n.style[t] !== o) return i[t];
				return "transitionend"
			}(),
			f = function(t) {
				return t && t.length && t[0].offsetHeight
			},
			p = function(t, e) {
				var o = n.extend(!0, {}, t, e);
				return n.each(e, function(t, e) {
					n.isArray(e) && (o[t] = e)
				}), o
			},
			h = function(t, o, i) {
				var a = this;
				a.opts = p({
						index: i
					}, n.fancybox.defaults), n.isPlainObject(o) && (a.opts = p(a.opts, o)), n.fancybox.isMobile && (a
						.opts = p(a.opts, a.opts.mobile)), a.id = a.opts.id || ++c, a.currIndex = parseInt(a.opts.index,
						10) || 0, a.prevIndex = null, a.prevPos = null, a.currPos = 0, a.firstRun = !0, a.group = [], a
					.slides = {}, a.addContent(t), a.group.length && (a.$lastFocus = n(e.activeElement).trigger("blur"),
						a.init())
			};
		n.extend(h.prototype, {
			init: function() {
				var i, a, s, r = this,
					c = r.group[r.currIndex],
					l = c.opts,
					d = n.fancybox.scrollbarWidth;
				n.fancybox.getInstance() || l.hideScrollbar === !1 || (n("body").addClass(
						"fancybox-active"), !n.fancybox.isMobile && e.body.scrollHeight > t.innerHeight && (
							d === o && (i = n('<div style="width:100px;height:100px;overflow:scroll;" />')
								.appendTo("body"), d = n.fancybox.scrollbarWidth = i[0].offsetWidth - i[0]
								.clientWidth, i.remove()), n("head").append(
								'<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar { margin-right: ' +
								d + "px; }</style>"), n("body").addClass("compensate-for-scrollbar"))), s =
					"", n.each(l.buttons, function(t, e) {
						s += l.btnTpl[e] || ""
					}), a = n(r.translate(r, l.baseTpl.replace("{{buttons}}", s).replace("{{arrows}}", l
						.btnTpl.arrowLeft + l.btnTpl.arrowRight))).attr("id", "fancybox-container-" + r.id)
					.addClass("fancybox-is-hidden").addClass(l.baseClass).data("FancyBox", r).appendTo(l
						.parentEl), r.$refs = {
						container: a
					}, ["bg", "inner", "infobar", "toolbar", "stage", "caption", "navigation"].forEach(
						function(t) {
							r.$refs[t] = a.find(".fancybox-" + t)
						}), r.trigger("onInit"), r.activate(), r.jumpTo(r.currIndex)
			},
			translate: function(t, e) {
				var n = t.opts.i18n[t.opts.lang];
				return e.replace(/\{\{(\w+)\}\}/g, function(t, e) {
					var i = n[e];
					return i === o ? t : i
				})
			},
			addContent: function(t) {
				var e, i = this,
					a = n.makeArray(t);
				n.each(a, function(t, e) {
					var a, s, r, c, l, d = {},
						u = {};
					n.isPlainObject(e) ? (d = e, u = e.opts || e) : "object" === n.type(e) && n(e)
						.length ? (a = n(e), u = a.data() || {}, u = n.extend(!0, {}, u, u.options),
							u.$orig = a, d.src = i.opts.src || u.src || a.attr("href"), d.type || d
							.src || (d.type = "inline", d.src = e)) : d = {
							type: "html",
							src: e + ""
						}, d.opts = n.extend(!0, {}, i.opts, u), n.isArray(u.buttons) && (d.opts
							.buttons = u.buttons), s = d.type || d.opts.type, c = d.src || "", !s &&
						c && ((r = c.match(/\.(mp4|mov|ogv)((\?|#).*)?$/i)) ? (s = "video", d.opts
								.videoFormat || (d.opts.videoFormat = "video/" + ("ogv" === r[1] ?
									"ogg" : r[1]))) : c.match(
								/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i
								) ? s = "image" : c.match(/\.(pdf)((\?|#).*)?$/i) ? s = "iframe" :
							"#" === c.charAt(0) && (s = "inline")), s ? d.type = s : i.trigger(
							"objectNeedsType", d), d.contentType || (d.contentType = n.inArray(d
							.type, ["html", "inline", "ajax"]) > -1 ? "html" : d.type), d.index = i
						.group.length, "auto" == d.opts.smallBtn && (d.opts.smallBtn = n.inArray(d
							.type, ["html", "inline", "ajax"]) > -1), "auto" === d.opts.toolbar && (
							d.opts.toolbar = !d.opts.smallBtn), d.opts.$trigger && d.index === i
						.opts.index && (d.opts.$thumb = d.opts.$trigger.find("img:first")), d.opts
						.$thumb && d.opts.$thumb.length || !d.opts.$orig || (d.opts.$thumb = d.opts
							.$orig.find("img:first")), "function" === n.type(d.opts.caption) && (d
							.opts.caption = d.opts.caption.apply(e, [i, d])), "function" === n.type(
							i.opts.caption) && (d.opts.caption = i.opts.caption.apply(e, [i, d])), d
						.opts.caption instanceof n || (d.opts.caption = d.opts.caption === o ? "" :
							d.opts.caption + ""), "ajax" === d.type && (l = c.split(/\s+/, 2), l
							.length > 1 && (d.src = l.shift(), d.opts.filter = l.shift())), d.opts
						.modal && (d.opts = n.extend(!0, d.opts, {
							infobar: 0,
							toolbar: 0,
							smallBtn: 0,
							keyboard: 0,
							slideShow: 0,
							fullScreen: 0,
							thumbs: 0,
							touch: 0,
							clickContent: !1,
							clickSlide: !1,
							clickOutside: !1,
							dblclickContent: !1,
							dblclickSlide: !1,
							dblclickOutside: !1
						})), i.group.push(d)
				}), Object.keys(i.slides).length && (i.updateControls(), e = i.Thumbs, e && e
					.isActive && (e.create(), e.focus()))
			},
			addEvents: function() {
				var o = this;
				o.removeEvents(), o.$refs.container.on("click.fb-close", "[data-fancybox-close]", function(
					t) {
					t.stopPropagation(), t.preventDefault(), o.close(t)
				}).on("touchstart.fb-prev click.fb-prev", "[data-fancybox-prev]", function(t) {
					t.stopPropagation(), t.preventDefault(), o.previous()
				}).on("touchstart.fb-next click.fb-next", "[data-fancybox-next]", function(t) {
					t.stopPropagation(), t.preventDefault(), o.next()
				}).on("click.fb", "[data-fancybox-zoom]", function(t) {
					o[o.isScaledDown() ? "scaleToActual" : "scaleToFit"]()
				}), s.on("orientationchange.fb resize.fb", function(t) {
					t && t.originalEvent && "resize" === t.originalEvent.type ? d(function() {
						o.update()
					}) : (o.$refs.stage.hide(), setTimeout(function() {
						o.$refs.stage.show(), o.update()
					}, n.fancybox.isMobile ? 600 : 250))
				}), r.on("focusin.fb", function(t) {
					var o = n.fancybox ? n.fancybox.getInstance() : null;
					o.isClosing || !o.current || !o.current.opts.trapFocus || n(t.target).hasClass(
						"fancybox-container") || n(t.target).is(e) || o && "fixed" !== n(t
						.target).css("position") && !o.$refs.container.has(t.target).length && (
						t.stopPropagation(), o.focus())
				}), r.on("keydown.fb", function(t) {
					var e = o.current,
						i = t.keyCode || t.which;
					if (e && e.opts.keyboard && !(t.ctrlKey || t.altKey || t.shiftKey || n(t.target)
							.is("input") || n(t.target).is("textarea"))) return 8 === i || 27 ===
						i ? (t.preventDefault(), void o.close(t)) : 37 === i || 38 === i ? (t
							.preventDefault(), void o.previous()) : 39 === i || 40 === i ? (t
							.preventDefault(), void o.next()) : void o.trigger("afterKeydown",
							t, i)
				}), o.group[o.currIndex].opts.idleTime && (o.idleSecondsCounter = 0, r.on(
					"mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle",
					function(t) {
						o.idleSecondsCounter = 0, o.isIdle && o.showControls(), o.isIdle = !1
					}), o.idleInterval = t.setInterval(function() {
					o.idleSecondsCounter++, o.idleSecondsCounter >= o.group[o.currIndex].opts
						.idleTime && !o.isDragging && (o.isIdle = !0, o.idleSecondsCounter = 0,
							o.hideControls())
				}, 1e3))
			},
			removeEvents: function() {
				var e = this;
				s.off("orientationchange.fb resize.fb"), r.off("focusin.fb keydown.fb .fb-idle"), this.$refs
					.container.off(".fb-close .fb-prev .fb-next"), e.idleInterval && (t.clearInterval(e
						.idleInterval), e.idleInterval = null)
			},
			previous: function(t) {
				return this.jumpTo(this.currPos - 1, t)
			},
			next: function(t) {
				return this.jumpTo(this.currPos + 1, t)
			},
			jumpTo: function(t, e) {
				var i, a, s, r, c, l, d, u = this,
					p = u.group.length;
				if (!(u.isDragging || u.isClosing || u.isAnimating && u.firstRun)) {
					if (t = parseInt(t, 10), a = u.current ? u.current.opts.loop : u.opts.loop, !a && (t <
							0 || t >= p)) return !1;
					if (i = u.firstRun = !Object.keys(u.slides).length, !(p < 2 && !i && u.isDragging)) {
						if (r = u.current, u.prevIndex = u.currIndex, u.prevPos = u.currPos, s = u
							.createSlide(t), p > 1 && ((a || s.index > 0) && u.createSlide(t - 1), (a || s
								.index < p - 1) && u.createSlide(t + 1)), u.current = s, u.currIndex = s
							.index, u.currPos = s.pos, u.trigger("beforeShow", i), u.updateControls(), l = n
							.fancybox.getTranslate(s.$slide), s.isMoved = (0 !== l.left || 0 !== l.top) && !
							s.$slide.hasClass("fancybox-animated"), s.forcedDuration = o, n.isNumeric(e) ? s
							.forcedDuration = e : e = s.opts[i ? "animationDuration" :
							"transitionDuration"], e = parseInt(e, 10), i) return s.opts.animationEffect &&
							e && u.$refs.container.css("transition-duration", e + "ms"), u.$refs
							.container.removeClass("fancybox-is-hidden"), f(u.$refs.container), u.$refs
							.container.addClass("fancybox-is-open"), f(u.$refs.container), s.$slide
							.addClass("fancybox-slide--previous"), u.loadSlide(s), s.$slide.removeClass(
								"fancybox-slide--previous").addClass("fancybox-slide--current"), void u
							.preload("image");
						n.each(u.slides, function(t, e) {
								n.fancybox.stop(e.$slide)
							}), s.$slide.removeClass("fancybox-slide--next fancybox-slide--previous")
							.addClass("fancybox-slide--current"), s.isMoved ? (c = Math.round(s.$slide
								.width()), n.each(u.slides, function(t, o) {
								var i = o.pos - s.pos;
								n.fancybox.animate(o.$slide, {
									top: 0,
									left: i * c + i * o.opts.gutter
								}, e, function() {
									o.$slide.removeAttr("style").removeClass(
											"fancybox-slide--next fancybox-slide--previous"
											), o.pos === u.currPos && (s.isMoved = !1, u
											.complete())
								})
							})) : u.$refs.stage.children().removeAttr("style"), s.isLoaded ? u
							.revealContent(s) : u.loadSlide(s), u.preload("image"), r.pos !== s.pos && (d =
								"fancybox-slide--" + (r.pos > s.pos ? "next" : "previous"), r.$slide
								.removeClass(
									"fancybox-slide--complete fancybox-slide--current fancybox-slide--next fancybox-slide--previous"
									), r.isComplete = !1, e && (s.isMoved || s.opts.transitionEffect) && (s
									.isMoved ? r.$slide.addClass(d) : (d = "fancybox-animated " + d +
										" fancybox-fx-" + s.opts.transitionEffect, n.fancybox.animate(r
											.$slide, d, e,
											function() {
												r.$slide.removeClass(d).removeAttr("style")
											}))))
					}
				}
			},
			createSlide: function(t) {
				var e, o, i = this;
				return o = t % i.group.length, o = o < 0 ? i.group.length + o : o, !i.slides[t] && i.group[
					o] && (e = n('<div class="fancybox-slide"></div>').appendTo(i.$refs.stage), i
					.slides[t] = n.extend(!0, {}, i.group[o], {
						pos: t,
						$slide: e,
						isLoaded: !1
					}), i.updateSlide(i.slides[t])), i.slides[t]
			},
			scaleToActual: function(t, e, i) {
				var a, s, r, c, l, d = this,
					u = d.current,
					f = u.$content,
					p = n.fancybox.getTranslate(u.$slide).width,
					h = n.fancybox.getTranslate(u.$slide).height,
					g = u.width,
					b = u.height;
				!d.isAnimating && f && "image" == u.type && u.isLoaded && !u.hasError && (n.fancybox.stop(
					f), d.isAnimating = !0, t = t === o ? .5 * p : t, e = e === o ? .5 * h : e, a = n
					.fancybox.getTranslate(f), a.top -= n.fancybox.getTranslate(u.$slide).top, a.left -=
					n.fancybox.getTranslate(u.$slide).left, c = g / a.width, l = b / a.height, s = .5 *
					p - .5 * g, r = .5 * h - .5 * b, g > p && (s = a.left * c - (t * c - t), s > 0 && (
						s = 0), s < p - g && (s = p - g)), b > h && (r = a.top * l - (e * l - e), r >
						0 && (r = 0), r < h - b && (r = h - b)), d.updateCursor(g, b), n.fancybox
					.animate(f, {
						top: r,
						left: s,
						scaleX: c,
						scaleY: l
					}, i || 330, function() {
						d.isAnimating = !1
					}), d.SlideShow && d.SlideShow.isActive && d.SlideShow.stop())
			},
			scaleToFit: function(t) {
				var e, o = this,
					i = o.current,
					a = i.$content;
				!o.isAnimating && a && "image" == i.type && i.isLoaded && !i.hasError && (n.fancybox.stop(
					a), o.isAnimating = !0, e = o.getFitPos(i), o.updateCursor(e.width, e.height), n
					.fancybox.animate(a, {
						top: e.top,
						left: e.left,
						scaleX: e.width / a.width(),
						scaleY: e.height / a.height()
					}, t || 330, function() {
						o.isAnimating = !1
					}))
			},
			getFitPos: function(t) {
				var e, n, o, i, a, s = this,
					r = t.$content,
					c = t.width || t.opts.width,
					l = t.height || t.opts.height,
					d = {};
				return !!(t.isLoaded && r && r.length) && (i = {
						top: parseInt(t.$slide.css("paddingTop"), 10),
						right: parseInt(t.$slide.css("paddingRight"), 10),
						bottom: parseInt(t.$slide.css("paddingBottom"), 10),
						left: parseInt(t.$slide.css("paddingLeft"), 10)
					}, e = parseInt(s.$refs.stage.width(), 10) - (i.left + i.right), n = parseInt(s
						.$refs.stage.height(), 10) - (i.top + i.bottom), c && l || (c = e, l = n), o =
					Math.min(1, e / c, n / l), c = Math.floor(o * c), l = Math.floor(o * l), "image" ===
					t.type ? (d.top = Math.floor(.5 * (n - l)) + i.top, d.left = Math.floor(.5 * (e -
						c)) + i.left) : "video" === t.contentType && (a = t.opts.width && t.opts
						.height ? c / l : t.opts.ratio || 16 / 9, l > c / a ? l = c / a : c > l * a && (
							c = l * a)), d.width = c, d.height = l, d)
			},
			update: function() {
				var t = this;
				n.each(t.slides, function(e, n) {
					t.updateSlide(n)
				})
			},
			updateSlide: function(t, e) {
				var o = this,
					i = t && t.$content,
					a = t.width || t.opts.width,
					s = t.height || t.opts.height;
				i && (a || s || "video" === t.contentType) && !t.hasError && (n.fancybox.stop(i), n.fancybox
					.setTranslate(i, o.getFitPos(t)), t.pos === o.currPos && (o.isAnimating = !1, o
						.updateCursor())), t.$slide.trigger("refresh"), o.$refs.toolbar.toggleClass(
					"compensate-for-scrollbar", t.$slide.get(0).scrollHeight > t.$slide.get(0)
					.clientHeight), o.trigger("onUpdate", t)
			},
			centerSlide: function(t, e) {
				var i, a, s = this;
				s.current && (i = Math.round(t.$slide.width()), a = t.pos - s.current.pos, n.fancybox
					.animate(t.$slide, {
						top: 0,
						left: a * i + a * t.opts.gutter,
						opacity: 1
					}, e === o ? 0 : e, null, !1))
			},
			updateCursor: function(t, e) {
				var o, i = this,
					a = i.current,
					s = i.$refs.container.removeClass(
						"fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-drag fancybox-can-zoomOut");
				a && !i.isClosing && (o = i.isZoomable(), s.toggleClass("fancybox-is-zoomable", o), n(
						"[data-fancybox-zoom]").prop("disabled", !o), o && ("zoom" === a.opts
						.clickContent || n.isFunction(a.opts.clickContent) && "zoom" === a.opts
						.clickContent(a)) ? i.isScaledDown(t, e) ? s.addClass("fancybox-can-zoomIn") : a
					.opts.touch ? s.addClass("fancybox-can-drag") : s.addClass("fancybox-can-zoomOut") :
					a.opts.touch && "video" !== a.contentType && s.addClass("fancybox-can-drag"))
			},
			isZoomable: function() {
				var t, e = this,
					n = e.current;
				if (n && !e.isClosing && "image" === n.type && !n.hasError) {
					if (!n.isLoaded) return !0;
					if (t = e.getFitPos(n), n.width > t.width || n.height > t.height) return !0
				}
				return !1
			},
			isScaledDown: function(t, e) {
				var i = this,
					a = !1,
					s = i.current,
					r = s.$content;
				return t !== o && e !== o ? a = t < s.width && e < s.height : r && (a = n.fancybox
					.getTranslate(r), a = a.width < s.width && a.height < s.height), a
			},
			canPan: function() {
				var t, e = this,
					n = !1,
					o = e.current;
				return "image" === o.type && (t = o.$content) && !o.hasError && (n = e.getFitPos(o), n =
					Math.abs(t.width() - n.width) > 1 || Math.abs(t.height() - n.height) > 1), n
			},
			loadSlide: function(t) {
				var e, o, i, a = this;
				if (!t.isLoading && !t.isLoaded) {
					switch (t.isLoading = !0, a.trigger("beforeLoad", t), e = t.type, o = t.$slide, o.off(
						"refresh").trigger("onReset").addClass(t.opts.slideClass), e) {
						case "image":
							a.setImage(t);
							break;
						case "iframe":
							a.setIframe(t);
							break;
						case "html":
							a.setContent(t, t.src || t.content);
							break;
						case "video":
							a.setContent(t,
								'<video class="fancybox-video" controls controlsList="nodownload"><source src="' +
								t.src + '" type="' + t.opts.videoFormat +
								"\">Your browser doesn't support HTML5 video</video");
							break;
						case "inline":
							n(t.src).length ? a.setContent(t, n(t.src)) : a.setError(t);
							break;
						case "ajax":
							a.showLoading(t), i = n.ajax(n.extend({}, t.opts.ajax.settings, {
								url: t.src,
								success: function(e, n) {
									"success" === n && a.setContent(t, e)
								},
								error: function(e, n) {
									e && "abort" !== n && a.setError(t)
								}
							})), o.one("onReset", function() {
								i.abort()
							});
							break;
						default:
							a.setError(t)
					}
					return !0
				}
			},
			setImage: function(e) {
				var o, i, a, s, r, c = this,
					l = e.opts.srcset || e.opts.image.srcset;
				if (e.timouts = setTimeout(function() {
						var t = e.$image;
						!e.isLoading || t && t[0].complete || e.hasError || c.showLoading(e)
					}, 350), l) {
					s = t.devicePixelRatio || 1, r = t.innerWidth * s, a = l.split(",").map(function(t) {
						var e = {};
						return t.trim().split(/\s+/).forEach(function(t, n) {
							var o = parseInt(t.substring(0, t.length - 1), 10);
							return 0 === n ? e.url = t : void(o && (e.value = o, e.postfix =
								t[t.length - 1]))
						}), e
					}), a.sort(function(t, e) {
						return t.value - e.value
					});
					for (var d = 0; d < a.length; d++) {
						var u = a[d];
						if ("w" === u.postfix && u.value >= r || "x" === u.postfix && u.value >= s) {
							i = u;
							break
						}
					}!i && a.length && (i = a[a.length - 1]), i && (e.src = i.url, e.width && e.height &&
						"w" == i.postfix && (e.height = e.width / e.height * i.value, e.width = i
						.value), e.opts.srcset = l)
				}
				e.$content = n('<div class="fancybox-content"></div>').addClass("fancybox-is-hidden")
					.appendTo(e.$slide.addClass("fancybox-slide--image")), o = e.opts.thumb || !(!e.opts
						.$thumb || !e.opts.$thumb.length) && e.opts.$thumb.attr("src"), e.opts.preload !== !
					1 && e.opts.width && e.opts.height && o && (e.width = e.opts.width, e.height = e.opts
						.height, e.$ghost = n("<img />").one("error", function() {
							n(this).remove(), e.$ghost = null
						}).one("load", function() {
							c.afterLoad(e)
						}).addClass("fancybox-image").appendTo(e.$content).attr("src", o)), c.setBigImage(e)
			},
			setBigImage: function(t) {
				var e = this,
					o = n("<img />");
				t.$image = o.one("error", function() {
						e.setError(t)
					}).one("load", function() {
						var n;
						t.$ghost || (e.resolveImageSlideSize(t, this.naturalWidth, this.naturalHeight),
							e.afterLoad(t)), t.timouts && (clearTimeout(t.timouts), t.timouts =
							null), e.isClosing || (t.opts.srcset && (n = t.opts.sizes, n &&
								"auto" !== n || (n = (t.width / t.height > 1 && s.width() / s
									.height() > 1 ? "100" : Math.round(t.width / t.height * 100)
									) + "vw"), o.attr("sizes", n).attr("srcset", t.opts.srcset)), t
							.$ghost && setTimeout(function() {
								t.$ghost && !e.isClosing && t.$ghost.hide()
							}, Math.min(300, Math.max(1e3, t.height / 1600))), e.hideLoading(t))
					}).addClass("fancybox-image").attr("src", t.src).appendTo(t.$content), (o[0].complete ||
						"complete" == o[0].readyState) && o[0].naturalWidth && o[0].naturalHeight ? o
					.trigger("load") : o[0].error && o.trigger("error")
			},
			resolveImageSlideSize: function(t, e, n) {
				var o = parseInt(t.opts.width, 10),
					i = parseInt(t.opts.height, 10);
				t.width = e, t.height = n, o > 0 && (t.width = o, t.height = Math.floor(o * n / e)), i >
					0 && (t.width = Math.floor(i * e / n), t.height = i)
			},
			setIframe: function(t) {
				var e, i = this,
					a = t.opts.iframe,
					s = t.$slide;
				t.$content = n('<div class="fancybox-content' + (a.preload ? " fancybox-is-hidden" : "") +
						'"></div>').css(a.css).appendTo(s), s.addClass("fancybox-slide--" + t.contentType),
					t.$iframe = e = n(a.tpl.replace(/\{rnd\}/g, (new Date).getTime())).attr(a.attr)
					.appendTo(t.$content), a.preload ? (i.showLoading(t), e.on("load.fb error.fb", function(
						e) {
						this.isReady = 1, t.$slide.trigger("refresh"), i.afterLoad(t)
					}), s.on("refresh.fb", function() {
						var n, i, s = t.$content,
							r = a.css.width,
							c = a.css.height;
						if (1 === e[0].isReady) {
							try {
								n = e.contents(), i = n.find("body")
							} catch (t) {}
							i && i.length && i.children().length && (s.css({
									width: "",
									height: ""
								}), r === o && (r = Math.ceil(Math.max(i[0].clientWidth, i
									.outerWidth(!0)))), r && s.width(r), c === o && (c = Math
									.ceil(Math.max(i[0].clientHeight, i.outerHeight(!0)))), c &&
								s.height(c)), s.removeClass("fancybox-is-hidden")
						}
					})) : this.afterLoad(t), e.attr("src", t.src), s.one("onReset", function() {
						try {
							n(this).find("iframe").hide().unbind().attr("src", "//about:blank")
						} catch (t) {}
						n(this).off("refresh.fb").empty(), t.isLoaded = !1
					})
			},
			setContent: function(t, e) {
				var o = this;
				o.isClosing || (o.hideLoading(t), t.$content && n.fancybox.stop(t.$content), t.$slide
					.empty(), l(e) && e.parent().length ? (e.parent().parent(".fancybox-slide--inline")
						.trigger("onReset"), t.$placeholder = n("<div>").hide().insertAfter(e), e.css(
							"display", "inline-block")) : t.hasError || ("string" === n.type(e) && (e =
						n("<div>").append(n.trim(e)).contents(), 3 === e[0].nodeType && (e = n(
							"<div>").html(e))), t.opts.filter && (e = n("<div>").html(e).find(t.opts
						.filter))), t.$slide.one("onReset", function() {
						n(this).find("video,audio").trigger("pause"), t.$placeholder && (t
								.$placeholder.after(e.hide()).remove(), t.$placeholder = null), t
							.$smallBtn && (t.$smallBtn.remove(), t.$smallBtn = null), t.hasError ||
							(n(this).empty(), t.isLoaded = !1)
					}), n(e).appendTo(t.$slide), n(e).is("video,audio") && (n(e).addClass(
							"fancybox-video"), n(e).wrap("<div></div>"), t.contentType = "video", t.opts
						.width = t.opts.width || n(e).attr("width"), t.opts.height = t.opts.height || n(
							e).attr("height")), t.$content = t.$slide.children().filter(
						"div,form,main,video,audio").first().addClass("fancybox-content"), t.$slide
					.addClass("fancybox-slide--" + t.contentType), this.afterLoad(t))
			},
			setError: function(t) {
				t.hasError = !0, t.$slide.trigger("onReset").removeClass("fancybox-slide--" + t.contentType)
					.addClass("fancybox-slide--error"), t.contentType = "html", this.setContent(t, this
						.translate(t, t.opts.errorTpl)), t.pos === this.currPos && (this.isAnimating = !1)
			},
			showLoading: function(t) {
				var e = this;
				t = t || e.current, t && !t.$spinner && (t.$spinner = n(e.translate(e, e.opts.spinnerTpl))
					.appendTo(t.$slide))
			},
			hideLoading: function(t) {
				var e = this;
				t = t || e.current, t && t.$spinner && (t.$spinner.remove(), delete t.$spinner)
			},
			afterLoad: function(t) {
				var e = this;
				e.isClosing || (t.isLoading = !1, t.isLoaded = !0, e.trigger("afterLoad", t), e.hideLoading(
						t), t.pos === e.currPos && e.updateCursor(), !t.opts.smallBtn || t.$smallBtn &&
					t.$smallBtn.length || (t.$smallBtn = n(e.translate(t, t.opts.btnTpl.smallBtn))
						.prependTo(t.$content)), t.opts.protect && t.$content && !t.hasError && (t
						.$content.on("contextmenu.fb", function(t) {
							return 2 == t.button && t.preventDefault(), !0
						}), "image" === t.type && n('<div class="fancybox-spaceball"></div>').appendTo(t
							.$content)), e.revealContent(t))
			},
			revealContent: function(t) {
				var e, i, a, s, r = this,
					c = t.$slide,
					l = !1,
					d = !1;
				return e = t.opts[r.firstRun ? "animationEffect" : "transitionEffect"], a = t.opts[r
						.firstRun ? "animationDuration" : "transitionDuration"], a = parseInt(t
						.forcedDuration === o ? a : t.forcedDuration, 10), t.pos === r.currPos && (t
						.isComplete ? e = !1 : r.isAnimating = !0), !t.isMoved && t.pos === r.currPos &&
					a || (e = !1), "zoom" === e && (t.pos === r.currPos && a && "image" === t.type && !t
						.hasError && (d = r.getThumbPos(t)) ? l = r.getFitPos(t) : e = "fade"), "zoom" ===
					e ? (l.scaleX = l.width / d.width, l.scaleY = l.height / d.height, s = t.opts
						.zoomOpacity, "auto" == s && (s = Math.abs(t.width / t.height - d.width / d
							.height) > .1), s && (d.opacity = .1, l.opacity = 1), n.fancybox.setTranslate(t
							.$content.removeClass("fancybox-is-hidden"), d), f(t.$content), void n.fancybox
						.animate(t.$content, l, a, function() {
							r.isAnimating = !1, r.complete()
						})) : (r.updateSlide(t), e ? (n.fancybox.stop(c), i =
						"fancybox-animated fancybox-slide--" + (t.pos >= r.prevPos ? "next" :
							"previous") + " fancybox-fx-" + e, c.removeAttr("style").removeClass(
							"fancybox-slide--current fancybox-slide--next fancybox-slide--previous")
						.addClass(i), t.$content.removeClass("fancybox-is-hidden"), f(c), void n
						.fancybox.animate(c, "fancybox-slide--current", a, function(e) {
							c.removeClass(i).removeAttr("style"), t.pos === r.currPos && r
							.complete()
						}, !0)) : (f(c), t.$content.removeClass("fancybox-is-hidden"), void(t.pos === r
						.currPos && r.complete())))
			},
			getThumbPos: function(o) {
				var i, a = this,
					s = !1,
					r = o.opts.$thumb,
					c = r && r.length && r[0].ownerDocument === e ? r.offset() : 0,
					l = function(e) {
						for (var o, i = e[0], a = i.getBoundingClientRect(), s = []; null !== i
							.parentElement;) "hidden" !== n(i.parentElement).css("overflow") && "auto" !==
							n(i.parentElement).css("overflow") || s.push(i.parentElement
								.getBoundingClientRect()), i = i.parentElement;
						return o = s.every(function(t) {
								var e = Math.min(a.right, t.right) - Math.max(a.left, t.left),
									n = Math.min(a.bottom, t.bottom) - Math.max(a.top, t.top);
								return e > 0 && n > 0
							}), o && a.bottom > 0 && a.right > 0 && a.left < n(t).width() && a.top < n(t)
							.height()
					};
				return c && l(r) && (i = a.$refs.stage.offset(), s = {
					top: c.top - i.top + parseFloat(r.css("border-top-width") || 0),
					left: c.left - i.left + parseFloat(r.css("border-left-width") || 0),
					width: r.width(),
					height: r.height(),
					scaleX: 1,
					scaleY: 1
				}), s
			},
			complete: function() {
				var t = this,
					o = t.current,
					i = {};
				!o.isMoved && o.isLoaded && (o.isComplete || (o.isComplete = !0, o.$slide.siblings()
						.trigger("onReset"), t.preload("inline"), f(o.$slide), o.$slide.addClass(
							"fancybox-slide--complete"), n.each(t.slides, function(e, o) {
							o.pos >= t.currPos - 1 && o.pos <= t.currPos + 1 ? i[o.pos] = o : o && (
								n.fancybox.stop(o.$slide), o.$slide.off().remove())
						}), t.slides = i), t.isAnimating = !1, t.updateCursor(), t.trigger("afterShow"),
					o.$slide.find("video,audio").filter(":visible:first").trigger("play"), (n(e
							.activeElement).is("[disabled]") || o.opts.autoFocus && "image" != o.type &&
						"iframe" !== o.type) && t.focus())
			},
			preload: function(t) {
				var e = this,
					n = e.slides[e.currPos + 1],
					o = e.slides[e.currPos - 1];
				n && n.type === t && e.loadSlide(n), o && o.type === t && e.loadSlide(o)
			},
			focus: function() {
				var t, e = this.current;
				this.isClosing || e && e.isComplete && e.$content && (t = e.$content.find(
						"input[autofocus]:enabled:visible:first"), t.length || (t = e.$content.find(
						"button,:input,[tabindex],a").filter(":enabled:visible:first")), t = t && t
					.length ? t : e.$content, t.trigger("focus"))
			},
			activate: function() {
				var t = this;
				n(".fancybox-container").each(function() {
						var e = n(this).data("FancyBox");
						e && e.id !== t.id && !e.isClosing && (e.trigger("onDeactivate"), e
							.removeEvents(), e.isVisible = !1)
					}), t.isVisible = !0, (t.current || t.isIdle) && (t.update(), t.updateControls()), t
					.trigger("onActivate"), t.addEvents()
			},
			close: function(t, e) {
				var o, i, a, s, r, c, l, p = this,
					h = p.current,
					g = function() {
						p.cleanUp(t)
					};
				return !p.isClosing && (p.isClosing = !0, p.trigger("beforeClose", t) === !1 ? (p
					.isClosing = !1, d(function() {
						p.update()
					}), !1) : (p.removeEvents(), h.timouts && clearTimeout(h.timouts), a = h
					.$content, o = h.opts.animationEffect, i = n.isNumeric(e) ? e : o ? h.opts
					.animationDuration : 0, h.$slide.off(u).removeClass(
						"fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"
						), h.$slide.siblings().trigger("onReset").remove(), i && p.$refs.container
					.removeClass("fancybox-is-open").addClass("fancybox-is-closing"), p.hideLoading(
						h), p.hideControls(), p.updateCursor(), "zoom" !== o || t !== !0 && a &&
					i && "image" === h.type && !h.hasError && (l = p.getThumbPos(h)) || (o =
					"fade"), "zoom" === o ? (n.fancybox.stop(a), s = n.fancybox.getTranslate(a),
						c = {
							top: s.top,
							left: s.left,
							scaleX: s.width / l.width,
							scaleY: s.height / l.height,
							width: l.width,
							height: l.height
						}, r = h.opts.zoomOpacity, "auto" == r && (r = Math.abs(h.width / h.height -
							l.width / l.height) > .1), r && (l.opacity = 0), n.fancybox
						.setTranslate(a, c), f(a), n.fancybox.animate(a, l, i, g), !0) : (o && i ?
						t === !0 ? setTimeout(g, i) : n.fancybox.animate(h.$slide.removeClass(
								"fancybox-slide--current"),
							"fancybox-animated fancybox-slide--previous fancybox-fx-" + o, i, g) :
						g(), !0)))
			},
			cleanUp: function(t) {
				var e, o = this,
					i = n("body");
				o.current.$slide.trigger("onReset"), o.$refs.container.empty().remove(), o.trigger(
					"afterClose", t), o.$lastFocus && o.current.opts.backFocus && o.$lastFocus.trigger(
					"focus"), o.current = null, e = n.fancybox.getInstance(), e ? e.activate() : (i
					.removeClass("fancybox-active compensate-for-scrollbar"), n(
						"#fancybox-style-noscroll").remove())
			},
			trigger: function(t, e) {
				var o, i = Array.prototype.slice.call(arguments, 1),
					a = this,
					s = e && e.opts ? e : a.current;
				return s ? i.unshift(s) : s = a, i.unshift(a), n.isFunction(s.opts[t]) && (o = s.opts[t]
					.apply(s, i)), o === !1 ? o : void("afterClose" !== t && a.$refs ? a.$refs.container
					.trigger(t + ".fb", i) : r.trigger(t + ".fb", i))
			},
			updateControls: function(t) {
				var e = this,
					n = e.current,
					o = n.index,
					i = n.opts.caption,
					a = e.$refs.container,
					s = e.$refs.caption;
				n.$slide.trigger("refresh"), e.$caption = i && i.length ? s.html(i) : null, e
					.isHiddenControls || e.isIdle || e.showControls(), a.find("[data-fancybox-count]").html(
						e.group.length), a.find("[data-fancybox-index]").html(o + 1), a.find(
						"[data-fancybox-prev]").toggleClass("disabled", !n.opts.loop && o <= 0), a.find(
						"[data-fancybox-next]").toggleClass("disabled", !n.opts.loop && o >= e.group
						.length - 1), "image" === n.type ? a.find("[data-fancybox-zoom]").show().end().find(
						"[data-fancybox-download]").attr("href", n.opts.image.src || n.src).show() : n.opts
					.toolbar && a.find("[data-fancybox-download],[data-fancybox-zoom]").hide()
			},
			hideControls: function() {
				this.isHiddenControls = !0, this.$refs.container.removeClass(
					"fancybox-show-infobar fancybox-show-toolbar fancybox-show-caption fancybox-show-nav"
					)
			},
			showControls: function() {
				var t = this,
					e = t.current ? t.current.opts : t.opts,
					n = t.$refs.container;
				t.isHiddenControls = !1, t.idleSecondsCounter = 0, n.toggleClass("fancybox-show-toolbar", !(
					!e.toolbar || !e.buttons)).toggleClass("fancybox-show-infobar", !!(e.infobar && t
					.group.length > 1)).toggleClass("fancybox-show-nav", !!(e.arrows && t.group.length >
					1)).toggleClass("fancybox-is-modal", !!e.modal), t.$caption ? n.addClass(
					"fancybox-show-caption ") : n.removeClass("fancybox-show-caption")
			},
			toggleControls: function() {
				this.isHiddenControls ? this.showControls() : this.hideControls()
			}
		}), n.fancybox = {
			version: "3.3.5",
			defaults: a,
			getInstance: function(t) {
				var e = n('.fancybox-container:not(".fancybox-is-closing"):last').data("FancyBox"),
					o = Array.prototype.slice.call(arguments, 1);
				return e instanceof h && ("string" === n.type(t) ? e[t].apply(e, o) : "function" === n.type(
					t) && t.apply(e, o), e)
			},
			open: function(t, e, n) {
				return new h(t, e, n)
			},
			close: function(t) {
				var e = this.getInstance();
				e && (e.close(), t === !0 && this.close())
			},
			destroy: function() {
				this.close(!0), r.add("body").off("click.fb-start", "**")
			},
			isMobile: e.createTouch !== o && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				navigator.userAgent),
			use3d: function() {
				var n = e.createElement("div");
				return t.getComputedStyle && t.getComputedStyle(n) && t.getComputedStyle(n).getPropertyValue(
					"transform") && !(e.documentMode && e.documentMode < 11)
			}(),
			getTranslate: function(t) {
				var e;
				return !(!t || !t.length) && (e = t[0].getBoundingClientRect(), {
					top: e.top || 0,
					left: e.left || 0,
					width: e.width,
					height: e.height,
					opacity: parseFloat(t.css("opacity"))
				})
			},
			setTranslate: function(t, e) {
				var n = "",
					i = {};
				if (t && e) return e.left === o && e.top === o || (n = (e.left === o ? t.position().left : e
							.left) + "px, " + (e.top === o ? t.position().top : e.top) + "px", n = this
						.use3d ? "translate3d(" + n + ", 0px)" : "translate(" + n + ")"), e.scaleX !== o &&
					e.scaleY !== o && (n = (n.length ? n + " " : "") + "scale(" + e.scaleX + ", " + e
						.scaleY + ")"), n.length && (i.transform = n), e.opacity !== o && (i.opacity = e
						.opacity), e.width !== o && (i.width = e.width), e.height !== o && (i.height = e
						.height), t.css(i)
			},
			animate: function(t, e, i, a, s) {
				var r = !1;
				n.isFunction(i) && (a = i, i = null), n.isPlainObject(e) || t.removeAttr("style"), n.fancybox
					.stop(t), t.on(u, function(o) {
						(!o || !o.originalEvent || t.is(o.originalEvent.target) && "z-index" != o
							.originalEvent.propertyName) && (n.fancybox.stop(t), r && n.fancybox
							.setTranslate(t, r),
							n.isPlainObject(e) ? s === !1 && t.removeAttr("style") : s !== !0 && t
							.removeClass(e), n.isFunction(a) && a(o))
					}), n.isNumeric(i) && t.css("transition-duration", i + "ms"), n.isPlainObject(e) ? (e
						.scaleX !== o && e.scaleY !== o && (r = n.extend({}, e, {
								width: t.width() * e.scaleX,
								height: t.height() * e.scaleY,
								scaleX: 1,
								scaleY: 1
							}), delete e.width, delete e.height, t.parent().hasClass("fancybox-slide--image") &&
							t.parent().addClass("fancybox-is-scaling")), n.fancybox.setTranslate(t, e)) : t
					.addClass(e), t.data("timer", setTimeout(function() {
						t.trigger("transitionend")
					}, i + 16))
			},
			stop: function(t) {
				t && t.length && (clearTimeout(t.data("timer")), t.off("transitionend").css(
					"transition-duration", ""), t.parent().removeClass("fancybox-is-scaling"))
			}
		}, n.fn.fancybox = function(t) {
			var e;
			return t = t || {}, e = t.selector || !1, e ? n("body").off("click.fb-start", e).on("click.fb-start",
			e, {
				options: t
			}, i) : this.off("click.fb-start").on("click.fb-start", {
				items: this,
				options: t
			}, i), this
		}, r.on("click.fb-start", "[data-fancybox]", i), r.on("click.fb-start", "[data-trigger]", function(t) {
			i(t, {
				$target: n('[data-fancybox="' + n(t.currentTarget).attr("data-trigger") + '"]').eq(n(t
					.currentTarget).attr("data-index") || 0),
				$trigger: n(this)
			})
		})
	}
}(window, document, window.jQuery || jQuery),
function(t) {
	"use strict";
	var e = function(e, n, o) {
			if (e) return o = o || "", "object" === t.type(o) && (o = t.param(o, !0)), t.each(n, function(t, n) {
				e = e.replace("$" + t, n || "")
			}), o.length && (e += (e.indexOf("?") > 0 ? "&" : "?") + o), e
		},
		n = {
			youtube: {
				matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
				params: {
					autoplay: 1,
					autohide: 1,
					fs: 1,
					rel: 0,
					hd: 1,
					wmode: "transparent",
					enablejsapi: 1,
					html5: 1
				},
				paramPlace: 8,
				type: "iframe",
				url: "//www.youtube.com/embed/$4",
				thumb: "//img.youtube.com/vi/$4/hqdefault.jpg"
			},
			vimeo: {
				matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
				params: {
					autoplay: 1,
					hd: 1,
					show_title: 1,
					show_byline: 1,
					show_portrait: 0,
					fullscreen: 1,
					api: 1
				},
				paramPlace: 3,
				type: "iframe",
				url: "//player.vimeo.com/video/$2"
			},
			instagram: {
				matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
				type: "image",
				url: "//$1/p/$2/media/?size=l"
			},
			gmap_place: {
				matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
				type: "iframe",
				url: function(t) {
					return "//maps.google." + t[2] + "/?ll=" + (t[9] ? t[9] + "&z=" + Math.floor(t[10]) + (t[12] ?
						t[12].replace(/^\//, "&") : "") : t[12] + "").replace(/\?/, "&") + "&output=" + (t[
						12] && t[12].indexOf("layer=c") > 0 ? "svembed" : "embed")
				}
			},
			gmap_search: {
				matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
				type: "iframe",
				url: function(t) {
					return "//maps.google." + t[2] + "/maps?q=" + t[5].replace("query=", "q=").replace("api=1",
						"") + "&output=embed"
				}
			}
		};
	t(document).on("objectNeedsType.fb", function(o, i, a) {
		var s, r, c, l, d, u, f, p = a.src || "",
			h = !1;
		s = t.extend(!0, {}, n, a.opts.media), t.each(s, function(n, o) {
			if (c = p.match(o.matcher)) {
				if (h = o.type, f = n, u = {}, o.paramPlace && c[o.paramPlace]) {
					d = c[o.paramPlace], "?" == d[0] && (d = d.substring(1)), d = d.split("&");
					for (var i = 0; i < d.length; ++i) {
						var s = d[i].split("=", 2);
						2 == s.length && (u[s[0]] = decodeURIComponent(s[1].replace(/\+/g, " ")))
					}
				}
				return l = t.extend(!0, {}, o.params, a.opts[n], u), p = "function" === t.type(o.url) ?
					o.url.call(this, c, l, a) : e(o.url, c, l), r = "function" === t.type(o.thumb) ? o
					.thumb.call(this, c, l, a) : e(o.thumb, c), "youtube" === n ? p = p.replace(
						/&t=((\d+)m)?(\d+)s/,
						function(t, e, n, o) {
							return "&start=" + ((n ? 60 * parseInt(n, 10) : 0) + parseInt(o, 10))
						}) : "vimeo" === n && (p = p.replace("&%23", "#")), !1
			}
		}), h ? (a.opts.thumb || a.opts.$thumb && a.opts.$thumb.length || (a.opts.thumb = r), "iframe" ===
			h && (a.opts = t.extend(!0, a.opts, {
				iframe: {
					preload: !1,
					attr: {
						scrolling: "no"
					}
				}
			})), t.extend(a, {
				type: h,
				src: p,
				origSrc: a.src,
				contentSource: f,
				contentType: "image" === h ? "image" : "gmap_place" == f || "gmap_search" == f ? "map" :
					"video"
			})) : p && (a.type = a.opts.defaultType)
	})
}(window.jQuery || jQuery),
function(t, e, n) {
	"use strict";
	var o = function() {
			return t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t
				.oRequestAnimationFrame || function(e) {
					return t.setTimeout(e, 1e3 / 60)
				}
		}(),
		i = function() {
			return t.cancelAnimationFrame || t.webkitCancelAnimationFrame || t.mozCancelAnimationFrame || t
				.oCancelAnimationFrame || function(e) {
					t.clearTimeout(e)
				}
		}(),
		a = function(e) {
			var n = [];
			e = e.originalEvent || e || t.e, e = e.touches && e.touches.length ? e.touches : e.changedTouches && e
				.changedTouches.length ? e.changedTouches : [e];
			for (var o in e) e[o].pageX ? n.push({
				x: e[o].pageX,
				y: e[o].pageY
			}) : e[o].clientX && n.push({
				x: e[o].clientX,
				y: e[o].clientY
			});
			return n
		},
		s = function(t, e, n) {
			return e && t ? "x" === n ? t.x - e.x : "y" === n ? t.y - e.y : Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(
				t.y - e.y, 2)) : 0
		},
		r = function(t) {
			if (t.is('a,area,button,[role="button"],input,label,select,summary,textarea,video,audio') || n.isFunction(t
					.get(0).onclick) || t.data("selectable")) return !0;
			for (var e = 0, o = t[0].attributes, i = o.length; e < i; e++)
				if ("data-fancybox-" === o[e].nodeName.substr(0, 14)) return !0;
			return !1
		},
		c = function(e) {
			var n = t.getComputedStyle(e)["overflow-y"],
				o = t.getComputedStyle(e)["overflow-x"],
				i = ("scroll" === n || "auto" === n) && e.scrollHeight > e.clientHeight,
				a = ("scroll" === o || "auto" === o) && e.scrollWidth > e.clientWidth;
			return i || a
		},
		l = function(t) {
			for (var e = !1;;) {
				if (e = c(t.get(0))) break;
				if (t = t.parent(), !t.length || t.hasClass("fancybox-stage") || t.is("body")) break
			}
			return e
		},
		d = function(t) {
			var e = this;
			e.instance = t, e.$bg = t.$refs.bg, e.$stage = t.$refs.stage, e.$container = t.$refs.container, e.destroy(),
				e.$container.on("touchstart.fb.touch mousedown.fb.touch", n.proxy(e, "ontouchstart"))
		};
	d.prototype.destroy = function() {
		this.$container.off(".fb.touch")
	}, d.prototype.ontouchstart = function(o) {
		var i = this,
			c = n(o.target),
			d = i.instance,
			u = d.current,
			f = u.$content,
			p = "touchstart" == o.type;
		if (p && i.$container.off("mousedown.fb.touch"), (!o.originalEvent || 2 != o.originalEvent.button) && c
			.length && !r(c) && !r(c.parent()) && (c.is("img") || !(o.originalEvent.clientX > c[0].clientWidth + c
				.offset().left))) {
			if (!u || d.isAnimating || d.isClosing) return o.stopPropagation(), void o.preventDefault();
			if (i.realPoints = i.startPoints = a(o), i.startPoints.length) {
				if (o.stopPropagation(), i.startEvent = o, i.canTap = !0, i.$target = c, i.$content = f, i.opts = u
					.opts.touch, i.isPanning = !1, i.isSwiping = !1, i.isZooming = !1, i.isScrolling = !1, i
					.startTime = (new Date).getTime(), i.distanceX = i.distanceY = i.distance = 0, i.canvasWidth =
					Math.round(u.$slide[0].clientWidth), i.canvasHeight = Math.round(u.$slide[0].clientHeight), i
					.contentLastPos = null, i.contentStartPos = n.fancybox.getTranslate(i.$content) || {
						top: 0,
						left: 0
					}, i.sliderStartPos = i.sliderLastPos || n.fancybox.getTranslate(u.$slide), i.stagePos = n
					.fancybox.getTranslate(d.$refs.stage), i.sliderStartPos.top -= i.stagePos.top, i.sliderStartPos
					.left -= i.stagePos.left, i.contentStartPos.top -= i.stagePos.top, i.contentStartPos.left -= i
					.stagePos.left, n(e).off(".fb.touch").on(p ? "touchend.fb.touch touchcancel.fb.touch" :
						"mouseup.fb.touch mouseleave.fb.touch", n.proxy(i, "ontouchend")).on(p ?
						"touchmove.fb.touch" : "mousemove.fb.touch", n.proxy(i, "ontouchmove")), n.fancybox
					.isMobile && e.addEventListener("scroll", i.onscroll, !0), !i.opts && !d.canPan() || !c.is(i
						.$stage) && !i.$stage.find(c).length) return void(c.is(".fancybox-image") && o
					.preventDefault());
				n.fancybox.isMobile && (l(c) || l(c.parent())) || o.preventDefault(), (1 === i.startPoints.length ||
					u.hasError) && (i.instance.canPan() ? (n.fancybox.stop(i.$content), i.$content.css(
					"transition-duration", ""), i.isPanning = !0) : i.isSwiping = !0, i.$container.addClass(
					"fancybox-controls--isGrabbing")), 2 === i.startPoints.length && "image" === u.type && (u
					.isLoaded || u.$ghost) && (i.canTap = !1, i.isSwiping = !1, i.isPanning = !1, i
					.isZooming = !0, n.fancybox.stop(i.$content), i.$content.css("transition-duration", ""), i
					.centerPointStartX = .5 * (i.startPoints[0].x + i.startPoints[1].x) - n(t).scrollLeft(), i
					.centerPointStartY = .5 * (i.startPoints[0].y + i.startPoints[1].y) - n(t).scrollTop(), i
					.percentageOfImageAtPinchPointX = (i.centerPointStartX - i.contentStartPos.left) / i
					.contentStartPos.width, i.percentageOfImageAtPinchPointY = (i.centerPointStartY - i
						.contentStartPos.top) / i.contentStartPos.height, i.startDistanceBetweenFingers = s(i
						.startPoints[0], i.startPoints[1]))
			}
		}
	}, d.prototype.onscroll = function(t) {
		var n = this;
		n.isScrolling = !0, e.removeEventListener("scroll", n.onscroll, !0)
	}, d.prototype.ontouchmove = function(t) {
		var e = this,
			o = n(t.target);
		return void 0 !== t.originalEvent.buttons && 0 === t.originalEvent.buttons ? void e.ontouchend(t) : e
			.isScrolling || !o.is(e.$stage) && !e.$stage.find(o).length ? void(e.canTap = !1) : (e.newPoints = a(t),
				void((e.opts || e.instance.canPan()) && e.newPoints.length && e.newPoints.length && (e.isSwiping &&
					e.isSwiping === !0 || t.preventDefault(), e.distanceX = s(e.newPoints[0], e.startPoints[0],
						"x"), e.distanceY = s(e.newPoints[0], e.startPoints[0], "y"), e.distance = s(e
						.newPoints[0], e.startPoints[0]), e.distance > 0 && (e.isSwiping ? e.onSwipe(t) : e
						.isPanning ? e.onPan() : e.isZooming && e.onZoom()))))
	}, d.prototype.onSwipe = function(e) {
		var a, s = this,
			r = s.isSwiping,
			c = s.sliderStartPos.left || 0;
		if (r !== !0) "x" == r && (s.distanceX > 0 && (s.instance.group.length < 2 || 0 === s.instance.current
				.index && !s.instance.current.opts.loop) ? c += Math.pow(s.distanceX, .8) : s.distanceX < 0 && (
				s.instance.group.length < 2 || s.instance.current.index === s.instance.group.length - 1 && !s
				.instance.current.opts.loop) ? c -= Math.pow(-s.distanceX, .8) : c += s.distanceX), s
			.sliderLastPos = {
				top: "x" == r ? 0 : s.sliderStartPos.top + s.distanceY,
				left: c
			}, s.requestId && (i(s.requestId), s.requestId = null), s.requestId = o(function() {
				s.sliderLastPos && (n.each(s.instance.slides, function(t, e) {
					var o = e.pos - s.instance.currPos;
					n.fancybox.setTranslate(e.$slide, {
						top: s.sliderLastPos.top,
						left: s.sliderLastPos.left + o * s.canvasWidth + o * e.opts.gutter
					})
				}), s.$container.addClass("fancybox-is-sliding"))
			});
		else if (Math.abs(s.distance) > 10) {
			if (s.canTap = !1, s.instance.group.length < 2 && s.opts.vertical ? s.isSwiping = "y" : s.instance
				.isDragging || s.opts.vertical === !1 || "auto" === s.opts.vertical && n(t).width() > 800 ? s
				.isSwiping = "x" : (a = Math.abs(180 * Math.atan2(s.distanceY, s.distanceX) / Math.PI), s
					.isSwiping = a > 45 && a < 135 ? "y" : "x"), s.canTap = !1, "y" === s.isSwiping && n.fancybox
				.isMobile && (l(s.$target) || l(s.$target.parent()))) return void(s.isScrolling = !0);
			s.instance.isDragging = s.isSwiping, s.startPoints = s.newPoints, n.each(s.instance.slides, function(t,
				e) {
				n.fancybox.stop(e.$slide), e.$slide.css("transition-duration", ""), e.inTransition = !1, e
					.pos === s.instance.current.pos && (s.sliderStartPos.left = n.fancybox.getTranslate(e
						.$slide).left - n.fancybox.getTranslate(s.instance.$refs.stage).left)
			}), s.instance.SlideShow && s.instance.SlideShow.isActive && s.instance.SlideShow.stop()
		}
	}, d.prototype.onPan = function() {
		var t = this;
		return s(t.newPoints[0], t.realPoints[0]) < (n.fancybox.isMobile ? 10 : 5) ? void(t.startPoints = t
			.newPoints) : (t.canTap = !1, t.contentLastPos = t.limitMovement(), t.requestId && (i(t.requestId),
			t.requestId = null), void(t.requestId = o(function() {
			n.fancybox.setTranslate(t.$content, t.contentLastPos)
		})))
	}, d.prototype.limitMovement = function() {
		var t, e, n, o, i, a, s = this,
			r = s.canvasWidth,
			c = s.canvasHeight,
			l = s.distanceX,
			d = s.distanceY,
			u = s.contentStartPos,
			f = u.left,
			p = u.top,
			h = u.width,
			g = u.height;
		return i = h > r ? f + l : f, a = p + d, t = Math.max(0, .5 * r - .5 * h), e = Math.max(0, .5 * c - .5 * g),
			n = Math.min(r - h, .5 * r - .5 * h), o = Math.min(c - g, .5 * c - .5 * g), l > 0 && i > t && (i = t -
				1 + Math.pow(-t + f + l, .8) || 0), l < 0 && i < n && (i = n + 1 - Math.pow(n - f - l, .8) || 0),
			d > 0 && a > e && (a = e - 1 + Math.pow(-e + p + d, .8) || 0), d < 0 && a < o && (a = o + 1 - Math.pow(
				o - p - d, .8) || 0), {
				top: a,
				left: i
			}
	}, d.prototype.limitPosition = function(t, e, n, o) {
		var i = this,
			a = i.canvasWidth,
			s = i.canvasHeight;
		return n > a ? (t = t > 0 ? 0 : t, t = t < a - n ? a - n : t) : t = Math.max(0, a / 2 - n / 2), o > s ? (e =
			e > 0 ? 0 : e, e = e < s - o ? s - o : e) : e = Math.max(0, s / 2 - o / 2), {
			top: e,
			left: t
		}
	}, d.prototype.onZoom = function() {
		var e = this,
			a = e.contentStartPos,
			r = a.width,
			c = a.height,
			l = a.left,
			d = a.top,
			u = s(e.newPoints[0], e.newPoints[1]),
			f = u / e.startDistanceBetweenFingers,
			p = Math.floor(r * f),
			h = Math.floor(c * f),
			g = (r - p) * e.percentageOfImageAtPinchPointX,
			b = (c - h) * e.percentageOfImageAtPinchPointY,
			m = (e.newPoints[0].x + e.newPoints[1].x) / 2 - n(t).scrollLeft(),
			y = (e.newPoints[0].y + e.newPoints[1].y) / 2 - n(t).scrollTop(),
			v = m - e.centerPointStartX,
			x = y - e.centerPointStartY,
			w = l + (g + v),
			$ = d + (b + x),
			S = {
				top: $,
				left: w,
				scaleX: f,
				scaleY: f
			};
		e.canTap = !1, e.newWidth = p, e.newHeight = h, e.contentLastPos = S, e.requestId && (i(e.requestId), e
			.requestId = null), e.requestId = o(function() {
			n.fancybox.setTranslate(e.$content, e.contentLastPos)
		})
	}, d.prototype.ontouchend = function(t) {
		var o = this,
			s = Math.max((new Date).getTime() - o.startTime, 1),
			r = o.isSwiping,
			c = o.isPanning,
			l = o.isZooming,
			d = o.isScrolling;
		return o.endPoints = a(t), o.$container.removeClass("fancybox-controls--isGrabbing"), n(e).off(".fb.touch"),
			e.removeEventListener("scroll", o.onscroll, !0), o.requestId && (i(o.requestId), o.requestId = null), o
			.isSwiping = !1, o.isPanning = !1, o.isZooming = !1, o.isScrolling = !1, o.instance.isDragging = !1, o
			.canTap ? o.onTap(t) : (o.speed = 366, o.velocityX = o.distanceX / s * .5, o.velocityY = o.distanceY /
				s * .5, o.speedX = Math.max(.5 * o.speed, Math.min(1.5 * o.speed, 1 / Math.abs(o.velocityX) * o
					.speed)), void(c ? o.endPanning() : l ? o.endZooming() : o.endSwiping(r, d)))
	}, d.prototype.endSwiping = function(t, e) {
		var o = this,
			i = !1,
			a = o.instance.group.length;
		o.sliderLastPos = null, "y" == t && !e && Math.abs(o.distanceY) > 50 ? (n.fancybox.animate(o.instance
				.current.$slide, {
					top: o.sliderStartPos.top + o.distanceY + 150 * o.velocityY,
					opacity: 0
				}, 200), i = o.instance.close(!0, 200)) : "x" == t && o.distanceX > 50 && a > 1 ? i = o.instance
			.previous(o.speedX) : "x" == t && o.distanceX < -50 && a > 1 && (i = o.instance.next(o.speedX)), i !== !
			1 || "x" != t && "y" != t || (e || a < 2 ? o.instance.centerSlide(o.instance.current, 150) : o.instance
				.jumpTo(o.instance.current.index)), o.$container.removeClass("fancybox-is-sliding")
	}, d.prototype.endPanning = function() {
		var t, e, o, i = this;
		i.contentLastPos && (i.opts.momentum === !1 ? (t = i.contentLastPos.left, e = i.contentLastPos.top) : (t = i
				.contentLastPos.left + i.velocityX * i.speed, e = i.contentLastPos.top + i.velocityY * i.speed),
			o = i.limitPosition(t, e, i.contentStartPos.width, i.contentStartPos.height), o.width = i
			.contentStartPos.width, o.height = i.contentStartPos.height, n.fancybox.animate(i.$content, o, 330))
	}, d.prototype.endZooming = function() {
		var t, e, o, i, a = this,
			s = a.instance.current,
			r = a.newWidth,
			c = a.newHeight;
		a.contentLastPos && (t = a.contentLastPos.left, e = a.contentLastPos.top, i = {
				top: e,
				left: t,
				width: r,
				height: c,
				scaleX: 1,
				scaleY: 1
			}, n.fancybox.setTranslate(a.$content, i), r < a.canvasWidth && c < a.canvasHeight ? a.instance
			.scaleToFit(150) : r > s.width || c > s.height ? a.instance.scaleToActual(a.centerPointStartX, a
				.centerPointStartY, 150) : (o = a.limitPosition(t, e, r, c), n.fancybox.setTranslate(a.$content,
				n.fancybox.getTranslate(a.$content)), n.fancybox.animate(a.$content, o, 150)))
	}, d.prototype.onTap = function(e) {
		var o, i = this,
			s = n(e.target),
			r = i.instance,
			c = r.current,
			l = e && a(e) || i.startPoints,
			d = l[0] ? l[0].x - n(t).scrollLeft() - i.stagePos.left : 0,
			u = l[0] ? l[0].y - n(t).scrollTop() - i.stagePos.top : 0,
			f = function(t) {
				var o = c.opts[t];
				if (n.isFunction(o) && (o = o.apply(r, [c, e])), o) switch (o) {
					case "close":
						r.close(i.startEvent);
						break;
					case "toggleControls":
						r.toggleControls(!0);
						break;
					case "next":
						r.next();
						break;
					case "nextOrClose":
						r.group.length > 1 ? r.next() : r.close(i.startEvent);
						break;
					case "zoom":
						"image" == c.type && (c.isLoaded || c.$ghost) && (r.canPan() ? r.scaleToFit() : r
							.isScaledDown() ? r.scaleToActual(d, u) : r.group.length < 2 && r.close(i
								.startEvent))
				}
			};
		if ((!e.originalEvent || 2 != e.originalEvent.button) && (s.is("img") || !(d > s[0].clientWidth + s.offset()
				.left))) {
			if (s.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container")) o = "Outside";
			else if (s.is(".fancybox-slide")) o = "Slide";
			else {
				if (!r.current.$content || !r.current.$content.find(s).addBack().filter(s).length) return;
				o = "Content"
			}
			if (i.tapped) {
				if (clearTimeout(i.tapped), i.tapped = null, Math.abs(d - i.tapX) > 50 || Math.abs(u - i.tapY) > 50)
					return this;
				f("dblclick" + o)
			} else i.tapX = d, i.tapY = u, c.opts["dblclick" + o] && c.opts["dblclick" + o] !== c.opts["click" +
				o] ? i.tapped = setTimeout(function() {
					i.tapped = null, f("click" + o)
				}, 500) : f("click" + o);
			return this
		}
	}, n(e).on("onActivate.fb", function(t, e) {
		e && !e.Guestures && (e.Guestures = new d(e))
	})
}(window, document, window.jQuery || jQuery),
function(t, e) {
	"use strict";
	e.extend(!0, e.fancybox.defaults, {
		btnTpl: {
			slideShow: '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"><svg viewBox="0 0 40 40"><path d="M13,12 L27,20 L13,27 Z" /><path d="M15,10 v19 M23,10 v19" /></svg></button>'
		},
		slideShow: {
			autoStart: !1,
			speed: 3e3
		}
	});
	var n = function(t) {
		this.instance = t, this.init()
	};
	e.extend(n.prototype, {
		timer: null,
		isActive: !1,
		$button: null,
		init: function() {
			var t = this;
			t.$button = t.instance.$refs.toolbar.find("[data-fancybox-play]").on("click", function() {
					t.toggle()
				}), (t.instance.group.length < 2 || !t.instance.group[t.instance.currIndex].opts
				.slideShow) && t.$button.hide()
		},
		set: function(t) {
			var e = this;
			e.instance && e.instance.current && (t === !0 || e.instance.current.opts.loop || e.instance
				.currIndex < e.instance.group.length - 1) ? e.timer = setTimeout(function() {
				e.isActive && e.instance.jumpTo((e.instance.currIndex + 1) % e.instance.group
					.length)
			}, e.instance.current.opts.slideShow.speed) : (e.stop(), e.instance.idleSecondsCounter = 0,
				e.instance.showControls())
		},
		clear: function() {
			var t = this;
			clearTimeout(t.timer), t.timer = null
		},
		start: function() {
			var t = this,
				e = t.instance.current;
			e && (t.isActive = !0, t.$button.attr("title", e.opts.i18n[e.opts.lang].PLAY_STOP).removeClass(
				"fancybox-button--play").addClass("fancybox-button--pause"), t.set(!0))
		},
		stop: function() {
			var t = this,
				e = t.instance.current;
			t.clear(), t.$button.attr("title", e.opts.i18n[e.opts.lang].PLAY_START).removeClass(
				"fancybox-button--pause").addClass("fancybox-button--play"), t.isActive = !1
		},
		toggle: function() {
			var t = this;
			t.isActive ? t.stop() : t.start()
		}
	}), e(t).on({
		"onInit.fb": function(t, e) {
			e && !e.SlideShow && (e.SlideShow = new n(e))
		},
		"beforeShow.fb": function(t, e, n, o) {
			var i = e && e.SlideShow;
			o ? i && n.opts.slideShow.autoStart && i.start() : i && i.isActive && i.clear()
		},
		"afterShow.fb": function(t, e, n) {
			var o = e && e.SlideShow;
			o && o.isActive && o.set()
		},
		"afterKeydown.fb": function(n, o, i, a, s) {
			var r = o && o.SlideShow;
			!r || !i.opts.slideShow || 80 !== s && 32 !== s || e(t.activeElement).is("button,a,input") || (a
				.preventDefault(), r.toggle())
		},
		"beforeClose.fb onDeactivate.fb": function(t, e) {
			var n = e && e.SlideShow;
			n && n.stop()
		}
	}), e(t).on("visibilitychange", function() {
		var n = e.fancybox.getInstance(),
			o = n && n.SlideShow;
		o && o.isActive && (t.hidden ? o.clear() : o.set())
	})
}(document, window.jQuery || jQuery),
function(t, e) {
	"use strict";
	var n = function() {
		for (var e = [
				["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled",
					"fullscreenchange", "fullscreenerror"
				],
				["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement",
					"webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"
				],
				["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement",
					"webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"
				],
				["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled",
					"mozfullscreenchange", "mozfullscreenerror"
				],
				["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled",
					"MSFullscreenChange", "MSFullscreenError"
				]
			], n = {}, o = 0; o < e.length; o++) {
			var i = e[o];
			if (i && i[1] in t) {
				for (var a = 0; a < i.length; a++) n[e[0][a]] = i[a];
				return n
			}
		}
		return !1
	}();
	if (!n) return void(e && e.fancybox && (e.fancybox.defaults.btnTpl.fullScreen = !1));
	var o = {
		request: function(e) {
			e = e || t.documentElement, e[n.requestFullscreen](e.ALLOW_KEYBOARD_INPUT)
		},
		exit: function() {
			t[n.exitFullscreen]()
		},
		toggle: function(e) {
			e = e || t.documentElement, this.isFullscreen() ? this.exit() : this.request(e)
		},
		isFullscreen: function() {
			return Boolean(t[n.fullscreenElement])
		},
		enabled: function() {
			return Boolean(t[n.fullscreenEnabled])
		}
	};
	e.extend(!0, e.fancybox.defaults, {
		btnTpl: {
			fullScreen: '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fullscreen" title="{{FULL_SCREEN}}"><svg viewBox="0 0 40 40"><path d="M9,12 v16 h22 v-16 h-22 v8" /></svg></button>'
		},
		fullScreen: {
			autoStart: !1
		}
	}), e(t).on({
		"onInit.fb": function(t, e) {
			var n;
			e && e.group[e.currIndex].opts.fullScreen ? (n = e.$refs.container, n.on("click.fb-fullscreen",
					"[data-fancybox-fullscreen]",
					function(t) {
						t.stopPropagation(), t.preventDefault(), o.toggle()
					}), e.opts.fullScreen && e.opts.fullScreen.autoStart === !0 && o.request(), e
				.FullScreen = o) : e && e.$refs.toolbar.find("[data-fancybox-fullscreen]").hide()
		},
		"afterKeydown.fb": function(t, e, n, o, i) {
			e && e.FullScreen && 70 === i && (o.preventDefault(), e.FullScreen.toggle())
		},
		"beforeClose.fb": function(t, e) {
			e && e.FullScreen && e.$refs.container.hasClass("fancybox-is-fullscreen") && o.exit()
		}
	}), e(t).on(n.fullscreenchange, function() {
		var t = o.isFullscreen(),
			n = e.fancybox.getInstance();
		n && (n.current && "image" === n.current.type && n.isAnimating && (n.current.$content.css("transition",
				"none"), n.isAnimating = !1, n.update(!0, !0, 0)), n.trigger("onFullscreenChange", t), n
			.$refs.container.toggleClass("fancybox-is-fullscreen", t))
	})
}(document, window.jQuery || jQuery),
function(t, e) {
	"use strict";
	var n = "fancybox-thumbs",
		o = n + "-active",
		i = n + "-loading";
	e.fancybox.defaults = e.extend(!0, {
		btnTpl: {
			thumbs: '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"><svg viewBox="0 0 120 120"><path d="M30,30 h14 v14 h-14 Z M50,30 h14 v14 h-14 Z M70,30 h14 v14 h-14 Z M30,50 h14 v14 h-14 Z M50,50 h14 v14 h-14 Z M70,50 h14 v14 h-14 Z M30,70 h14 v14 h-14 Z M50,70 h14 v14 h-14 Z M70,70 h14 v14 h-14 Z" /></svg></button>'
		},
		thumbs: {
			autoStart: !1,
			hideOnClose: !0,
			parentEl: ".fancybox-container",
			axis: "y"
		}
	}, e.fancybox.defaults);
	var a = function(t) {
		this.init(t)
	};
	e.extend(a.prototype, {
		$button: null,
		$grid: null,
		$list: null,
		isVisible: !1,
		isActive: !1,
		init: function(t) {
			var e, n, o = this;
			o.instance = t, t.Thumbs = o, o.opts = t.group[t.currIndex].opts.thumbs, e = t.group[0], e = e
				.opts.thumb || !(!e.opts.$thumb || !e.opts.$thumb.length) && e.opts.$thumb.attr("src"), t
				.group.length > 1 && (n = t.group[1], n = n.opts.thumb || !(!n.opts.$thumb || !n.opts.$thumb
					.length) && n.opts.$thumb.attr("src")), o.$button = t.$refs.toolbar.find(
					"[data-fancybox-thumbs]"), o.opts && e && n && e && n ? (o.$button.show().on("click",
					function() {
						o.toggle()
					}), o.isActive = !0) : o.$button.hide()
		},
		create: function() {
			var t, o = this,
				a = o.instance,
				s = o.opts.parentEl,
				r = [];
			o.$grid || (o.$grid = e('<div class="' + n + " " + n + "-" + o.opts.axis + '"></div>').appendTo(
				a.$refs.container.find(s).addBack().filter(s)), o.$grid.on("click", "li",
		function() {
				a.jumpTo(e(this).attr("data-index"))
			})), o.$list || (o.$list = e("<ul>").appendTo(o.$grid)), e.each(a.group, function(e, n) {
				t = n.opts.thumb || (n.opts.$thumb ? n.opts.$thumb.attr("src") : null), t ||
					"image" !== n.type || (t = n.src), r.push('<li data-index="' + e +
						'" tabindex="0" class="' + i + '"' + (t && t.length ?
							' style="background-image:url(' + t + ')" />' : "") + "></li>")
			}), o.$list[0].innerHTML = r.join(""), "x" === o.opts.axis && o.$list.width(parseInt(o.$grid
				.css("padding-right"), 10) + a.group.length * o.$list.children().eq(0).outerWidth(!
				0))
		},
		focus: function(t) {
			var e, n, i = this,
				a = i.$list,
				s = i.$grid;
			i.instance.current && (e = a.children().removeClass(o).filter('[data-index="' + i.instance
				.current.index + '"]').addClass(o), n = e.position(), "y" === i.opts.axis && (n
				.top < 0 || n.top > a.height() - e.outerHeight()) ? a.stop().animate({
				scrollTop: a.scrollTop() + n.top
			}, t) : "x" === i.opts.axis && (n.left < s.scrollLeft() || n.left > s.scrollLeft() + (s
				.width() - e.outerWidth())) && a.parent().stop().animate({
				scrollLeft: n.left
			}, t))
		},
		update: function() {
			var t = this;
			t.instance.$refs.container.toggleClass("fancybox-show-thumbs", this.isVisible), t.isVisible ? (t
					.$grid || t.create(), t.instance.trigger("onThumbsShow"), t.focus(0)) : t.$grid && t
				.instance.trigger("onThumbsHide"), t.instance.update()
		},
		hide: function() {
			this.isVisible = !1, this.update()
		},
		show: function() {
			this.isVisible = !0, this.update()
		},
		toggle: function() {
			this.isVisible = !this.isVisible, this.update()
		}
	}), e(t).on({
		"onInit.fb": function(t, e) {
			var n;
			e && !e.Thumbs && (n = new a(e), n.isActive && n.opts.autoStart === !0 && n.show())
		},
		"beforeShow.fb": function(t, e, n, o) {
			var i = e && e.Thumbs;
			i && i.isVisible && i.focus(o ? 0 : 250)
		},
		"afterKeydown.fb": function(t, e, n, o, i) {
			var a = e && e.Thumbs;
			a && a.isActive && 71 === i && (o.preventDefault(), a.toggle())
		},
		"beforeClose.fb": function(t, e) {
			var n = e && e.Thumbs;
			n && n.isVisible && n.opts.hideOnClose !== !1 && n.$grid.hide()
		}
	})
}(document, window.jQuery || jQuery),
function(t, e) {
	"use strict";

	function n(t) {
		var e = {
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			'"': "&quot;",
			"'": "&#39;",
			"/": "&#x2F;",
			"`": "&#x60;",
			"=": "&#x3D;"
		};
		return String(t).replace(/[&<>"'`=\/]/g, function(t) {
			return e[t]
		})
	}
	e.extend(!0, e.fancybox.defaults, {
		btnTpl: {
			share: '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}"><svg viewBox="0 0 40 40"><path d="M6,30 C8,18 19,16 23,16 L23,16 L23,10 L33,20 L23,29 L23,24 C19,24 8,27 6,30 Z"></svg></button>'
		},
		share: {
			url: function(t, e) {
				return !t.currentHash && "inline" !== e.type && "html" !== e.type && (e.origSrc || e.src) ||
					window.location
			},
			tpl: '<div class="fancybox-share"><h1>{{SHARE}}</h1><p><a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg><span>Facebook</span></a><a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg><span>Twitter</span></a><a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg><span>Pinterest</span></a></p><p><input class="fancybox-share__input" type="text" value="{{url_raw}}" /></p></div>'
		}
	}), e(t).on("click", "[data-fancybox-share]", function() {
		var t, o, i = e.fancybox.getInstance(),
			a = i.current || null;
		a && ("function" === e.type(a.opts.share.url) && (t = a.opts.share.url.apply(a, [i, a])), o = a.opts
			.share.tpl.replace(/\{\{media\}\}/g, "image" === a.type ? encodeURIComponent(a.src) : "")
			.replace(/\{\{url\}\}/g, encodeURIComponent(t)).replace(/\{\{url_raw\}\}/g, n(t)).replace(
				/\{\{descr\}\}/g, i.$caption ? encodeURIComponent(i.$caption.text()) : ""), e.fancybox
		.open({
				src: i.translate(i, o),
				type: "html",
				opts: {
					animationEffect: !1,
					afterLoad: function(t, e) {
						i.$refs.container.one("beforeClose.fb", function() {
							t.close(null, 0)
						}), e.$content.find(".fancybox-share__links a").click(function() {
							return window.open(this.href, "Share", "width=550, height=450"),
								!1
						})
					}
				}
			}))
	})
}(document, window.jQuery || jQuery),
function(t, e, n) {
	"use strict";

	function o() {
		var t = e.location.hash.substr(1),
			n = t.split("-"),
			o = n.length > 1 && /^\+?\d+$/.test(n[n.length - 1]) ? parseInt(n.pop(-1), 10) || 1 : 1,
			i = n.join("-");
		return {
			hash: t,
			index: o < 1 ? 1 : o,
			gallery: i
		}
	}

	function i(t) {
		var e;
		"" !== t.gallery && (e = n("[data-fancybox='" + n.escapeSelector(t.gallery) + "']").eq(t.index - 1).trigger(
			"click.fb-start"))
	}

	function a(t) {
		var e, n;
		return !!t && (e = t.current ? t.current.opts : t.opts, n = e.hash || (e.$orig ? e.$orig.data("fancybox") : ""),
			"" !== n && n)
	}
	n.escapeSelector || (n.escapeSelector = function(t) {
		var e = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,
			n = function(t, e) {
				return e ? "\0" === t ? "�" : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) +
					" " : "\\" + t
			};
		return (t + "").replace(e, n)
	}), n(function() {
		n.fancybox.defaults.hash !== !1 && (n(t).on({
			"onInit.fb": function(t, e) {
				var n, i;
				e.group[e.currIndex].opts.hash !== !1 && (n = o(), i = a(e), i && n.gallery &&
					i == n.gallery && (e.currIndex = n.index - 1))
			},
			"beforeShow.fb": function(n, o, i, s) {
				var r;
				i && i.opts.hash !== !1 && (r = a(o), r && (o.currentHash = r + (o.group
						.length > 1 ? "-" + (i.index + 1) : ""), e.location.hash !==
					"#" + o.currentHash && (o.origHash || (o.origHash = e.location
						.hash), o.hashTimer && clearTimeout(o.hashTimer), o.hashTimer =
						setTimeout(function() {
							"replaceState" in e.history ? (e.history[s ?
									"pushState" : "replaceState"]({}, t.title, e
									.location.pathname + e.location.search +
									"#" + o.currentHash), s && (o
									.hasCreatedHistory = !0)) : e.location.hash = o
								.currentHash, o.hashTimer = null
						}, 300))))
			},
			"beforeClose.fb": function(n, o, i) {
				var s;
				i.opts.hash !== !1 && (s = a(o), o.currentHash && o.hasCreatedHistory ? e
					.history.back() : o.currentHash && ("replaceState" in e.history ? e
						.history.replaceState({}, t.title, e.location.pathname + e.location
							.search + (o.origHash || "")) : e.location.hash = o.origHash), o
					.currentHash = null, clearTimeout(o.hashTimer))
			}
		}), n(e).on("hashchange.fb", function() {
			var t, e = o();
			n.each(n(".fancybox-container").get().reverse(), function(e, o) {
					var i = n(o).data("FancyBox");
					if (i.currentHash) return t = i, !1
				}), t ? !t.currentHash || t.currentHash === e.gallery + "-" + e.index || 1 === e
				.index && t.currentHash == e.gallery || (t.currentHash = null, t.close()) : "" !== e
				.gallery && i(e)
		}), setTimeout(function() {
			n.fancybox.getInstance() || i(o())
		}, 50))
	})
}(document, window, window.jQuery || jQuery),
function(t, e) {
	"use strict";
	var n = (new Date).getTime();
	e(t).on({
		"onInit.fb": function(t, e, o) {
			e.$refs.stage.on("mousewheel DOMMouseScroll wheel MozMousePixelScroll", function(t) {
				var o = e.current,
					i = (new Date).getTime();
				e.group.length < 2 || o.opts.wheel === !1 || "auto" === o.opts.wheel && "image" !==
					o.type || (t.preventDefault(), t.stopPropagation(), o.$slide.hasClass(
						"fancybox-animated") || (t = t.originalEvent || t, i - n < 250 || (n =
						i, e[(-t.deltaY || -t.deltaX || t.wheelDelta || -t.detail) < 0 ?
							"next" : "previous"]())))
			})
		}
	})
}(document, window.jQuery || jQuery);


/*!
 * clipboard.js v1.6.1
 * https://zenorocha.github.io/clipboard.js
 *
 * Licensed MIT © Zeno Rocha
 */
! function(e) {
	if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
	else if ("function" == typeof define && define.amd) define([], e);
	else {
		var t;
		t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ?
			self : this, t.Clipboard = e()
	}
}(function() {
	var e, t, n;
	return function e(t, n, o) {
		function i(a, c) {
			if (!n[a]) {
				if (!t[a]) {
					var l = "function" == typeof require && require;
					if (!c && l) return l(a, !0);
					if (r) return r(a, !0);
					var u = new Error("Cannot find module '" + a + "'");
					throw u.code = "MODULE_NOT_FOUND", u
				}
				var s = n[a] = {
					exports: {}
				};
				t[a][0].call(s.exports, function(e) {
					var n = t[a][1][e];
					return i(n ? n : e)
				}, s, s.exports, e, t, n, o)
			}
			return n[a].exports
		}
		for (var r = "function" == typeof require && require, a = 0; a < o.length; a++) i(o[a]);
		return i
	}({
		1: [function(e, t, n) {
			function o(e, t) {
				for (; e && e.nodeType !== i;) {
					if (e.matches(t)) return e;
					e = e.parentNode
				}
			}
			var i = 9;
			if ("undefined" != typeof Element && !Element.prototype.matches) {
				var r = Element.prototype;
				r.matches = r.matchesSelector || r.mozMatchesSelector || r.msMatchesSelector || r
					.oMatchesSelector || r.webkitMatchesSelector
			}
			t.exports = o
		}, {}],
		2: [function(e, t, n) {
			function o(e, t, n, o, r) {
				var a = i.apply(this, arguments);
				return e.addEventListener(n, a, r), {
					destroy: function() {
						e.removeEventListener(n, a, r)
					}
				}
			}

			function i(e, t, n, o) {
				return function(n) {
					n.delegateTarget = r(n.target, t), n.delegateTarget && o.call(e, n)
				}
			}
			var r = e("./closest");
			t.exports = o
		}, {
			"./closest": 1
		}],
		3: [function(e, t, n) {
			n.node = function(e) {
				return void 0 !== e && e instanceof HTMLElement && 1 === e.nodeType
			}, n.nodeList = function(e) {
				var t = Object.prototype.toString.call(e);
				return void 0 !== e && ("[object NodeList]" === t ||
					"[object HTMLCollection]" === t) && "length" in e && (0 === e.length ||
					n.node(e[0]))
			}, n.string = function(e) {
				return "string" == typeof e || e instanceof String
			}, n.fn = function(e) {
				var t = Object.prototype.toString.call(e);
				return "[object Function]" === t
			}
		}, {}],
		4: [function(e, t, n) {
			function o(e, t, n) {
				if (!e && !t && !n) throw new Error("Missing required arguments");
				if (!c.string(t)) throw new TypeError("Second argument must be a String");
				if (!c.fn(n)) throw new TypeError("Third argument must be a Function");
				if (c.node(e)) return i(e, t, n);
				if (c.nodeList(e)) return r(e, t, n);
				if (c.string(e)) return a(e, t, n);
				throw new TypeError(
					"First argument must be a String, HTMLElement, HTMLCollection, or NodeList")
			}

			function i(e, t, n) {
				return e.addEventListener(t, n), {
					destroy: function() {
						e.removeEventListener(t, n)
					}
				}
			}

			function r(e, t, n) {
				return Array.prototype.forEach.call(e, function(e) {
					e.addEventListener(t, n)
				}), {
					destroy: function() {
						Array.prototype.forEach.call(e, function(e) {
							e.removeEventListener(t, n)
						})
					}
				}
			}

			function a(e, t, n) {
				return l(document.body, e, t, n)
			}
			var c = e("./is"),
				l = e("delegate");
			t.exports = o
		}, {
			"./is": 3,
			delegate: 2
		}],
		5: [function(e, t, n) {
			function o(e) {
				var t;
				if ("SELECT" === e.nodeName) e.focus(), t = e.value;
				else if ("INPUT" === e.nodeName || "TEXTAREA" === e.nodeName) {
					var n = e.hasAttribute("readonly");
					n || e.setAttribute("readonly", ""), e.select(), e.setSelectionRange(0, e.value
						.length), n || e.removeAttribute("readonly"), t = e.value
				} else {
					e.hasAttribute("contenteditable") && e.focus();
					var o = window.getSelection(),
						i = document.createRange();
					i.selectNodeContents(e), o.removeAllRanges(), o.addRange(i), t = o.toString()
				}
				return t
			}
			t.exports = o
		}, {}],
		6: [function(e, t, n) {
			function o() {}
			o.prototype = {
				on: function(e, t, n) {
					var o = this.e || (this.e = {});
					return (o[e] || (o[e] = [])).push({
						fn: t,
						ctx: n
					}), this
				},
				once: function(e, t, n) {
					function o() {
						i.off(e, o), t.apply(n, arguments)
					}
					var i = this;
					return o._ = t, this.on(e, o, n)
				},
				emit: function(e) {
					var t = [].slice.call(arguments, 1),
						n = ((this.e || (this.e = {}))[e] || []).slice(),
						o = 0,
						i = n.length;
					for (o; o < i; o++) n[o].fn.apply(n[o].ctx, t);
					return this
				},
				off: function(e, t) {
					var n = this.e || (this.e = {}),
						o = n[e],
						i = [];
					if (o && t)
						for (var r = 0, a = o.length; r < a; r++) o[r].fn !== t && o[r].fn
							._ !== t && i.push(o[r]);
					return i.length ? n[e] = i : delete n[e], this
				}
			}, t.exports = o
		}, {}],
		7: [function(t, n, o) {
			! function(i, r) {
				if ("function" == typeof e && e.amd) e(["module", "select"], r);
				else if ("undefined" != typeof o) r(n, t("select"));
				else {
					var a = {
						exports: {}
					};
					r(a, i.select), i.clipboardAction = a.exports
				}
			}(this, function(e, t) {
				"use strict";

				function n(e) {
					return e && e.__esModule ? e : {
						default: e
					}
				}

				function o(e, t) {
					if (!(e instanceof t)) throw new TypeError(
						"Cannot call a class as a function")
				}
				var i = n(t),
					r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
					function(e) {
						return typeof e
					} : function(e) {
						return e && "function" == typeof Symbol && e.constructor === Symbol &&
							e !== Symbol.prototype ? "symbol" : typeof e
					},
					a = function() {
						function e(e, t) {
							for (var n = 0; n < t.length; n++) {
								var o = t[n];
								o.enumerable = o.enumerable || !1, o.configurable = !0,
									"value" in o && (o.writable = !0), Object.defineProperty(e,
										o.key, o)
							}
						}
						return function(t, n, o) {
							return n && e(t.prototype, n), o && e(t, o), t
						}
					}(),
					c = function() {
						function e(t) {
							o(this, e), this.resolveOptions(t), this.initSelection()
						}
						return a(e, [{
							key: "resolveOptions",
							value: function e() {
								var t = arguments.length > 0 && void 0 !==
									arguments[0] ? arguments[0] : {};
								this.action = t.action, this.emitter = t
									.emitter, this.target = t.target, this
									.text = t.text, this.trigger = t.trigger,
									this.selectedText = ""
							}
						}, {
							key: "initSelection",
							value: function e() {
								this.text ? this.selectFake() : this.target &&
									this.selectTarget()
							}
						}, {
							key: "selectFake",
							value: function e() {
								var t = this,
									n = "rtl" == document.documentElement
									.getAttribute("dir");
								this.removeFake(), this.fakeHandlerCallback =
									function() {
										return t.removeFake()
									}, this.fakeHandler = document.body
									.addEventListener("click", this
										.fakeHandlerCallback) || !0, this
									.fakeElem = document.createElement(
										"textarea"), this.fakeElem.style
									.fontSize = "12pt", this.fakeElem.style
									.border = "0", this.fakeElem.style.padding =
									"0", this.fakeElem.style.margin = "0", this
									.fakeElem.style.position = "absolute", this
									.fakeElem.style[n ? "right" : "left"] =
									"-9999px";
								var o = window.pageYOffset || document
									.documentElement.scrollTop;
								this.fakeElem.style.top = o + "px", this
									.fakeElem.setAttribute("readonly", ""), this
									.fakeElem.value = this.text, document.body
									.appendChild(this.fakeElem), this
									.selectedText = (0, i.default)(this
										.fakeElem), this.copyText()
							}
						}, {
							key: "removeFake",
							value: function e() {
								this.fakeHandler && (document.body
										.removeEventListener("click", this
											.fakeHandlerCallback), this
										.fakeHandler = null, this
										.fakeHandlerCallback = null), this
									.fakeElem && (document.body.removeChild(this
										.fakeElem), this.fakeElem = null)
							}
						}, {
							key: "selectTarget",
							value: function e() {
								this.selectedText = (0, i.default)(this.target),
									this.copyText()
							}
						}, {
							key: "copyText",
							value: function e() {
								var t = void 0;
								try {
									t = document.execCommand(this.action)
								} catch (e) {
									t = !1
								}
								this.handleResult(t)
							}
						}, {
							key: "handleResult",
							value: function e(t) {
								this.emitter.emit(t ? "success" : "error", {
									action: this.action,
									text: this.selectedText,
									trigger: this.trigger,
									clearSelection: this.clearSelection
										.bind(this)
								})
							}
						}, {
							key: "clearSelection",
							value: function e() {
								this.target && this.target.blur(), window
									.getSelection().removeAllRanges()
							}
						}, {
							key: "destroy",
							value: function e() {
								this.removeFake()
							}
						}, {
							key: "action",
							set: function e() {
								var t = arguments.length > 0 && void 0 !==
									arguments[0] ? arguments[0] : "copy";
								if (this._action = t, "copy" !== this._action &&
									"cut" !== this._action) throw new Error(
									'Invalid "action" value, use either "copy" or "cut"'
									)
							},
							get: function e() {
								return this._action
							}
						}, {
							key: "target",
							set: function e(t) {
								if (void 0 !== t) {
									if (!t || "object" !== ("undefined" ==
											typeof t ? "undefined" : r(t)) ||
										1 !== t.nodeType) throw new Error(
										'Invalid "target" value, use a valid Element'
										);
									if ("copy" === this.action && t
										.hasAttribute("disabled"))
									throw new Error(
											'Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute'
											);
									if ("cut" === this.action && (t
											.hasAttribute("readonly") || t
											.hasAttribute("disabled")))
									throw new Error(
											'Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes'
											);
									this._target = t
								}
							},
							get: function e() {
								return this._target
							}
						}]), e
					}();
				e.exports = c
			})
		}, {
			select: 5
		}],
		8: [function(t, n, o) {
			! function(i, r) {
				if ("function" == typeof e && e.amd) e(["module", "./clipboard-action",
					"tiny-emitter", "good-listener"
				], r);
				else if ("undefined" != typeof o) r(n, t("./clipboard-action"), t("tiny-emitter"),
					t("good-listener"));
				else {
					var a = {
						exports: {}
					};
					r(a, i.clipboardAction, i.tinyEmitter, i.goodListener), i.clipboard = a.exports
				}
			}(this, function(e, t, n, o) {
				"use strict";

				function i(e) {
					return e && e.__esModule ? e : {
						default: e
					}
				}

				function r(e, t) {
					if (!(e instanceof t)) throw new TypeError(
						"Cannot call a class as a function")
				}

				function a(e, t) {
					if (!e) throw new ReferenceError(
						"this hasn't been initialised - super() hasn't been called");
					return !t || "object" != typeof t && "function" != typeof t ? e : t
				}

				function c(e, t) {
					if ("function" != typeof t && null !== t) throw new TypeError(
						"Super expression must either be null or a function, not " +
						typeof t);
					e.prototype = Object.create(t && t.prototype, {
						constructor: {
							value: e,
							enumerable: !1,
							writable: !0,
							configurable: !0
						}
					}), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e
						.__proto__ = t)
				}

				function l(e, t) {
					var n = "data-clipboard-" + e;
					if (t.hasAttribute(n)) return t.getAttribute(n)
				}
				var u = i(t),
					s = i(n),
					f = i(o),
					d = function() {
						function e(e, t) {
							for (var n = 0; n < t.length; n++) {
								var o = t[n];
								o.enumerable = o.enumerable || !1, o.configurable = !0,
									"value" in o && (o.writable = !0), Object.defineProperty(e,
										o.key, o)
							}
						}
						return function(t, n, o) {
							return n && e(t.prototype, n), o && e(t, o), t
						}
					}(),
					h = function(e) {
						function t(e, n) {
							r(this, t);
							var o = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(
								this));
							return o.resolveOptions(n), o.listenClick(e), o
						}
						return c(t, e), d(t, [{
							key: "resolveOptions",
							value: function e() {
								var t = arguments.length > 0 && void 0 !==
									arguments[0] ? arguments[0] : {};
								this.action = "function" == typeof t.action ? t
									.action : this.defaultAction, this.target =
									"function" == typeof t.target ? t.target :
									this.defaultTarget, this.text =
									"function" == typeof t.text ? t.text : this
									.defaultText
							}
						}, {
							key: "listenClick",
							value: function e(t) {
								var n = this;
								this.listener = (0, f.default)(t, "click",
									function(e) {
										return n.onClick(e)
									})
							}
						}, {
							key: "onClick",
							value: function e(t) {
								var n = t.delegateTarget || t.currentTarget;
								this.clipboardAction && (this.clipboardAction =
										null), this.clipboardAction = new u
									.default({
										action: this.action(n),
										target: this.target(n),
										text: this.text(n),
										trigger: n,
										emitter: this
									})
							}
						}, {
							key: "defaultAction",
							value: function e(t) {
								return l("action", t)
							}
						}, {
							key: "defaultTarget",
							value: function e(t) {
								var n = l("target", t);
								if (n) return document.querySelector(n)
							}
						}, {
							key: "defaultText",
							value: function e(t) {
								return l("text", t)
							}
						}, {
							key: "destroy",
							value: function e() {
								this.listener.destroy(), this.clipboardAction &&
									(this.clipboardAction.destroy(), this
										.clipboardAction = null)
							}
						}], [{
							key: "isSupported",
							value: function e() {
								var t = arguments.length > 0 && void 0 !==
									arguments[0] ? arguments[0] : ["copy",
										"cut"],
									n = "string" == typeof t ? [t] : t,
									o = !!document.queryCommandSupported;
								return n.forEach(function(e) {
									o = o && !!document
										.queryCommandSupported(e)
								}), o
							}
						}]), t
					}(s.default);
				e.exports = h
			})
		}, {
			"./clipboard-action": 7,
			"good-listener": 4,
			"tiny-emitter": 6
		}]
	}, {}, [8])(8)
});

// prettyprint
eval(function(p, a, c, k, e, r) {
	e = function(c) {
		return (c < 62 ? '' : e(parseInt(c / 62))) + ((c = c % 62) > 35 ? String.fromCharCode(c + 29) : c
			.toString(36))
	};
	if ('0'.replace(0, e) == 0) {
		while (c--) r[e(c)] = k[c];
		k = [function(e) {
			return r[e] || e
		}];
		e = function() {
			return '([6P-RT-Y]|[1-3]\\w)'
		};
		c = 1
	};
	while (c--)
		if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
	return p
}('6 q=1s;19.2I=!0;(U(){U L(a){U m(a){6 f=a.24(0);T(f!==92)V f;6 b=a.1n(1);V(f=r[b])?f:"0"<=b&&b<="7"?2J(a.W(1),8):b==="u"||b==="x"?2J(a.W(2),16):a.24(1)}U e(a){T(a<32)V(a<16?"\\\\x0":"\\\\x")+a.toString(16);a=2K.2L(a);T(a==="\\\\"||a==="-"||a==="["||a==="]")a="\\\\"+a;V a}U h(a){P(6 f=a.W(1,a.Q-1).1a(/\\\\u[\\dA-Fa-f]{4}|\\\\x[\\dA-Fa-f]{2}|\\\\[0-3][0-7]{0,2}|\\\\[0-7]{1,2}|\\\\[\\S\\s]|[^\\\\]/g),a=[],b=[],o=f[0]==="^",c=o?1:0,i=f.Q;c<i;++c){6 j=f[c];T(/\\\\[bdsw]/i.1i(j))a.R(j);14{6 j=m(j),d;c+2<i&&"-"===f[c+1]?(d=m(f[c+2]),c+=2):d=j;b.R([j,d]);d<65||j>25||(d<65||j>90||b.R([1j.1F(65,j)|32,1j.26(d,90)|32]),d<97||j>25||b.R([1j.1F(97,j)&-33,1j.26(d,25)&-33]))}}b.sort(U(a,f){V a[0]-f[0]||f[1]-a[1]});f=[];j=[27,27];P(c=0;c<b.Q;++c)i=b[c],i[0]<=j[1]+1?j[1]=1j.1F(j[1],i[1]):f.R(j=i);b=["["];o&&b.R("^");b.R.2O(b,a);P(c=0;c<f.Q;++c)i=f[c],b.R(e(i[0])),i[1]>i[0]&&(i[1]+1>i[0]&&b.R("-"),b.R(e(i[1])));b.R("]");V b.1G("")}U y(a){P(6 f=a.2P.1a(/\\[(?:[^\\\\\\]]|\\\\[\\S\\s])*]|\\\\u[\\dA-Fa-f]{4}|\\\\x[\\dA-Fa-f]{2}|\\\\\\d+|\\\\[^\\dux]|\\(\\?[!:=]|[()^]|[^()[\\\\^]+/g),b=f.Q,d=[],c=0,i=0;c<b;++c){6 j=f[c];j==="("?++i:"\\\\"===j.1n(0)&&(j=+j.W(1))&&j<=i&&(d[j]=-1)}P(c=1;c<d.Q;++c)-1===d[c]&&(d[c]=++t);P(i=c=0;c<b;++c)j=f[c],j==="("?(++i,d[i]===1t 0&&(f[c]="(?:")):"\\\\"===j.1n(0)&&(j=+j.W(1))&&j<=i&&(f[c]="\\\\"+d[i]);P(i=c=0;c<b;++c)"^"===f[c]&&"^"!==f[c+1]&&(f[c]="");T(a.2Q&&s)P(c=0;c<b;++c)j=f[c],a=j.1n(0),j.Q>=2&&a==="["?f[c]=h(j):a!=="\\\\"&&(f[c]=j.1e(/[A-Za-z]/g,U(a){a=a.24(0);V"["+2K.2L(a&-33,a|32)+"]"}));V f.1G("")}P(6 t=0,s=!1,l=!1,p=0,d=a.Q;p<d;++p){6 g=a[p];T(g.2Q)l=!0;14 T(/[a-z]/i.1i(g.2P.1e(/\\\\u[\\da-f]{4}|\\\\x[\\da-f]{2}|\\\\[^UXux]/gi,""))){s=!0;l=!1;1b}}P(6 r={b:8,t:9,n:10,v:11,f:12,r:13},n=[],p=0,d=a.Q;p<d;++p){g=a[p];T(g.2S||g.multiline)29 Error(""+g);n.R("(?:"+y(g)+")")}V 2T(n.1G("|"),l?"gi":"g")}U M(a){U m(a){2a(a.1u){15 1:T(e.1i(a.17))1b;P(6 g=a.1o;g;g=g.1c)m(g);g=a.2U;T("BR"===g||"LI"===g)h[s]="\\n",t[s<<1]=y++,t[s++<<1|1]=a;1b;15 3:15 4:g=a.1v,g.Q&&(g=p?g.1e(/\\r\\n?/g,"\\n"):g.1e(/[\\t\\n\\r ]+/g," "),h[s]=g,t[s<<1]=y,y+=g.Q,t[s++<<1|1]=a)}}6 e=/(?:^|\\s)2b(?:\\s|$)/,h=[],y=0,t=[],s=0,l;a.1H?l=a.1H.2X:19.1I&&(l=1w.2Y.1I(a,q).2Z("30-31"));6 p=l&&"1J"===l.W(0,3);m(a);V{a:h.1G("").1e(/\\n$/,""),c:t}}U B(a,m,e,h){m&&(a={a:m,d:a},e(a),h.R.2O(h,a.e))}U x(a,m){U e(a){P(6 l=a.d,p=[l,"1f"],d=0,g=a.a.1a(y)||[],r={},n=0,z=g.Q;n<z;++n){6 f=g[n],b=r[f],o=1t 0,c;T(1K b==="2c")c=!1;14{6 i=h[f.1n(0)];T(i)o=f.1a(i[1]),b=i[0];14{P(c=0;c<t;++c)T(i=m[c],o=f.1a(i[1])){b=i[0];1b}o||(b="1f")}T((c=b.Q>=5&&"X-"===b.W(0,5))&&!(o&&1K o[1]==="2c"))c=!1,b="34";c||(r[f]=b)}i=d;d+=f.Q;T(c){c=o[1];6 j=f.2d(c),k=j+c.Q;o[2]&&(k=f.Q-o[2].Q,j=k-c.Q);b=b.W(5);B(l+i,f.W(0,j),e,p);B(l+i+j,c,C(b,c),p);B(l+i+k,f.W(k),e,p)}14 p.R(l+i,b)}a.e=p}6 h={},y;(U(){P(6 e=a.concat(m),l=[],p={},d=0,g=e.Q;d<g;++d){6 r=e[d],n=r[3];T(n)P(6 k=n.Q;--k>=0;)h[n.1n(k)]=r;r=r[1];n=""+r;p.2e(n)||(l.R(r),p[n]=q)}l.R(/[\\S\\s]/);y=L(l)})();6 t=m.Q;V e}U u(a){6 m=[],e=[];a.2f?m.R(["1k",/^(?:\'\'\'(?:[^\'\\\\]|\\\\[\\S\\s]|\'\'?(?=[^\']))*(?:\'\'\'|$)|"""(?:[^"\\\\]|\\\\[\\S\\s]|""?(?=[^"]))*(?:"""|$)|\'(?:[^\'\\\\]|\\\\[\\S\\s])*(?:\'|$)|"(?:[^"\\\\]|\\\\[\\S\\s])*(?:"|$))/,q,"\'\\""]):a.1p?m.R(["1k",/^(?:\'(?:[^\'\\\\]|\\\\[\\S\\s])*(?:\'|$)|"(?:[^"\\\\]|\\\\[\\S\\s])*(?:"|$)|`(?:[^\\\\`]|\\\\[\\S\\s])*(?:`|$))/,q,"\'\\"`"]):m.R(["1k",/^(?:\'(?:[^\\n\\r\'\\\\]|\\\\.)*(?:\'|$)|"(?:[^\\n\\r"\\\\]|\\\\.)*(?:"|$))/,q,"\\"\'"]);a.35&&e.R(["1k",/^@"(?:[^"]|"")*(?:"|$)/,q]);6 h=a.1d;h&&(a.1g?(h>1?m.R(["1l",/^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/,q,"#"]):m.R(["1l",/^#(?:(?:define|2g|14|endif|error|ifdef|include|ifndef|line|pragma|1L|warning)\\b|[^\\n\\r]*)/,q,"#"]),e.R(["1k",/^<(?:(?:(?:\\.\\.\\/)*|\\/?)(?:[\\w-]+(?:\\/[\\w-]+)+)?[\\w-]+\\.h|[a-z]\\w*)>/,q])):m.R(["1l",/^#[^\\n\\r]*/,q,"#"]));a.1g&&(e.R(["1l",/^\\/\\/[^\\n\\r]*/,q]),e.R(["1l",/^\\/\\*[\\S\\s]*?(?:\\*\\/|$)/,q]));a.1q&&e.R(["X-36",/^(?:^^\\.?|[!+-]|!=|!==|#|%|%=|&|&&|&&=|&=|\\(|\\*|\\*=|\\+=|,|-=|->|\\/|\\/=|:|::|;|<|<<|<<=|<=|=|==|===|>|>=|>>|>>=|>>>|>>>=|[?@[^]|\\^=|\\^\\^|\\^\\^=|{|\\||\\|=|\\|\\||\\|\\|=|~|1b|15|37|1M|do|14|1O|38|V|29|1x|1K)\\s*(\\/(?=[^*/])(?:[^/[\\\\]|\\\\[\\S\\s]|\\[(?:[^\\\\\\]]|\\\\[\\S\\s])*(?:]|$))+\\/)/]);(h=a.2h)&&e.R(["2i",h]);a=(""+a.Y).1e(/^ | $/g,"");a.Q&&e.R(["39",2T("^(?:"+a.1e(/[\\s,]+/g,"|")+")\\\\b"),q]);m.R(["1f",/^\\s+/,q," \\r\\n\\t\\3a"]);e.R(["2j",/^@[$_a-z][\\w$@]*/i,q],["2i",/^(?:[@_]?[A-Z]+[a-z][\\w$@]*|\\w+_t\\b)/,q],["1f",/^[$_a-z][\\w$@]*/i,q],["2j",/^(?:0x[\\da-f]+|(?:\\d(?:_\\d+)*\\d*(?:\\.\\d*)?|\\.\\d\\+)(?:e[+-]?\\d+)?)[a-z]*/i,q,"0123456789"],["1f",/^\\\\[\\S\\s]?/,q],["1P",/^.[^\\s\\w"-$\'./@\\\\`]*/,q]);V x(m,e)}U D(a,m){U e(a){2a(a.1u){15 1:T(k.1i(a.17))1b;T("BR"===a.2U)h(a),a.18&&a.18.3c(a);14 P(a=a.1o;a;a=a.1c)e(a);1b;15 3:15 4:T(p){6 b=a.1v,d=b.1a(t);T(d){6 c=b.W(0,d.3d);a.1v=c;(b=b.W(d.3d+d[0].Q))&&a.18.3e(s.2k(b),a.1c);h(a);c||a.18.3c(a)}}}}U h(a){U b(a,d){6 e=d?a.cloneNode(!1):a,f=a.18;T(f){6 f=b(f,1),g=a.1c;f.1m(e);P(6 h=g;h;h=g)g=h.1c,f.1m(h)}V e}P(;!a.1c;)T(a=a.18,!a)V;P(6 a=b(a.1c,0),e;(e=a.18)&&e.1u===1;)a=e;d.R(a)}6 k=/(?:^|\\s)2b(?:\\s|$)/,t=/\\r\\n?|\\n/,s=a.3f,l;a.1H?l=a.1H.2X:19.1I&&(l=s.2Y.1I(a,q).2Z("30-31"));6 p=l&&"1J"===l.W(0,3);P(l=s.1Q("LI");a.1o;)l.1m(a.1o);P(6 d=[l],g=0;g<d.Q;++g)e(d[g]);m===(m|0)&&d[0].setAttribute("value",m);6 r=s.1Q("OL");r.17="linenums";P(6 n=1j.1F(0,m-1|0)||0,g=0,z=d.Q;g<z;++g)l=d[g],l.17="L"+(g+n)%10,l.1o||l.1m(s.2k("\\3a")),r.1m(l);a.1m(r)}U k(a,m){P(6 e=m.Q;--e>=0;){6 h=m[e];A.2e(h)?19.1R&&1R.warn("cannot 3g language handler %s",h):A[h]=a}}U C(a,m){T(!a||!A.2e(a))a=/^\\s*</.1i(m)?"1y-3h":"1y-1S";V A[a]}U E(a){6 m=a.g;1x{6 e=M(a.h),h=e.a;a.a=h;a.c=e.c;a.d=0;C(m,h)(a);6 k=/\\bMSIE\\b/.1i(navigator.userAgent),m=/\\n/g,t=a.a,s=t.Q,e=0,l=a.c,p=l.Q,h=0,d=a.e,g=d.Q,a=0;d[g]=s;6 r,n;P(n=r=0;n<g;)d[n]!==d[n+2]?(d[r++]=d[n++],d[r++]=d[n++]):n+=2;g=r;P(n=r=0;n<g;){P(6 z=d[n],f=d[n+1],b=n+2;b+2<=g&&d[b+1]===f;)b+=2;d[r++]=z;d[r++]=f;n=b}P(d.Q=r;h<p;){6 o=l[h+2]||s,c=d[a+2]||s,b=1j.26(o,c),i=l[h+1],j;T(i.1u!==1&&(j=t.W(e,b))){k&&(j=j.1e(m,"\\r"));i.1v=j;6 u=i.3f,v=u.1Q("SPAN");v.17=d[a+1];6 x=i.18;x.replaceChild(v,i);v.1m(i);e<o&&(l[h+1]=i=u.2k(t.W(b,o)),x.3e(i,v.1c))}e=b;e>=o&&(h+=2);e>=c&&(a+=2)}}2l(w){"1R"in 19&&1R.log(w&&w.2m?w.2m:w)}}6 v=["1b,37,do,14,P,T,V,1T"],w=[[v,"auto,15,char,const,1y,double,enum,extern,3i,2n,3j,long,register,short,signed,sizeof,static,struct,2a,typedef,union,unsigned,1t,volatile"],"2l,1U,1M,1V,1z,2o,operator,private,protected,public,this,29,1W,1x,1K"],F=[w,"alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,dynamic_cast,explicit,3k,friend,inline,late_check,mutable,namespace,nullptr,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"],G=[w,"abstract,boolean,byte,3l,final,1O,implements,1z,38,1s,native,2p,strictfp,2q,synchronized,throws,transient"],H=[G,"as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,2r,3o,group,implicit,in,interface,internal,into,is,lock,object,out,3g,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,2c,select,uint,ulong,unchecked,unsafe,ushort,6"],w=[w,"debugger,1X,3k,U,get,1s,2t,undefined,6,3p,3q,27"],I=[v,"2u,as,assert,1U,3r,del,2g,except,exec,1O,3o,2S,1z,in,is,lambda,nonlocal,2v,or,pass,2x,raise,1x,3p,3s,False,True,None"],J=[v,"alias,2u,begin,15,1U,3r,defined,2y,end,ensure,1V,in,module,2z,nil,2v,or,2A,rescue,retry,self,2q,2B,1W,1L,1Y,1A,3t,3s,2C,2D"],v=[v,"15,done,2g,esac,1X,fi,U,in,2E,2t,2B,1A"],K=/^(DIR|FILE|vector|(de|priority_)?queue|list|2m|(const_)?iterator|(multi)?(2t|map)|bitset|u?(3j|3i)\\d*)/,N=/\\S/,O=u({Y:[F,H,w,"3u,1M,3v,do,3w,2y,1X,3x,2r,P,2n,T,1z,3y,2E,my,2z,no,3A,2x,2p,2A,3B,3C,1L,1Y,1A,3D,3E,1T,2C,2D"+I,J,v],1d:!0,1g:!0,1p:!0,1q:!0}),A={};k(O,["1y-1S"]);k(x([],[["1f",/^[^<?]+/],["3F",/^<!\\w[^>]*(?:>|$)/],["1l",/^<\\!--[\\S\\s]*?(?:--\\>|$)/],["X-",/^<\\?([\\S\\s]+?)(?:\\?>|$)/],["X-",/^<%([\\S\\s]+?)(?:%>|$)/],["1P",/^(?:<[%?]|[%?]>)/],["X-",/^<1Z\\b[^>]*>([\\S\\s]+?)<\\/1Z\\b[^>]*>/i],["X-js",/^<3G\\b[^>]*>([\\S\\s]*?)(<\\/3G\\b[^>]*>)/i],["X-20",/^<1r\\b[^>]*>([\\S\\s]*?)(<\\/1r\\b[^>]*>)/i],["X-in.21",/^(<\\/?[a-z][^<>]*>)/i]]),["1y-3h","htm","html","mxml","xhtml","xml","xsl"]);k(x([["1f",/^\\s+/,q," \\t\\r\\n"],["2G",/^(?:"[^"]*"?|\'[^\']*\'?)/,q,"\\"\'"]],[["21",/^^<\\/?[a-z](?:[\\w-.:]*\\w)?|\\/?>$/i],["3H",/^(?!1r[\\s=]|on)[a-z](?:[\\w:-]*\\w)?/i],["X-uq.3J",/^=\\s*([^\\s"\'>]*(?:[^\\s"\'/>]|\\/(?=\\s)))/],["1P",/^[/<->]+/],["X-js",/^on\\w+\\s*=\\s*"([^"]+)"/i],["X-js",/^on\\w+\\s*=\\s*\'([^\']+)\'/i],["X-js",/^on\\w+\\s*=\\s*([^\\s"\'>]+)/i],["X-20",/^1r\\s*=\\s*"([^"]+)"/i],["X-20",/^1r\\s*=\\s*\'([^\']+)\'/i],["X-20",/^1r\\s*=\\s*([^\\s"\'>]+)/i]]),["in.21"]);k(x([],[["2G",/^[\\S\\s]+/]]),["uq.3J"]);k(u({Y:F,1d:!0,1g:!0,2h:K}),["c","cc","cpp","cxx","cyc","m"]);k(u({Y:"1s,1W,1V"}),["json"]);k(u({Y:H,1d:!0,1g:!0,35:!0,2h:K}),["cs"]);k(u({Y:G,1g:!0}),["java"]);k(u({Y:v,1d:!0,1p:!0}),["bsh","csh","sh"]);k(u({Y:I,1d:!0,1p:!0,2f:!0}),["cv","py"]);k(u({Y:"3u,1M,3v,do,3w,2y,1X,3x,2r,P,2n,T,1z,3y,2E,my,2z,no,3A,2x,2p,2A,3B,3C,1L,1Y,1A,3D,3E,1T,2C,2D",1d:!0,1p:!0,1q:!0}),["perl","pl","pm"]);k(u({Y:J,1d:!0,1p:!0,1q:!0}),["rb"]);k(u({Y:w,1g:!0,1q:!0}),["js"]);k(u({Y:"all,2u,by,2l,1U,14,3l,1V,1O,P,T,in,is,isnt,loop,2o,no,2v,1s,of,off,on,or,V,2q,2B,1W,1x,1Y,1A,3t,1T,yes",1d:3,1g:!0,multilineStrings:!0,2f:!0,1q:!0}),["coffee"]);k(x([],[["1k",/^[\\S\\s]+/]]),["36"]);19.prettyPrintOne=U(a,m,e){6 h=1w.1Q("PRE");h.3K=a;e&&D(h,e);E({g:m,i:e,h:h});V h.3K};19.prettyPrint=U(a){U m(){P(6 e=19.2I?l.22()+3L:3q;p<h.Q&&l.22()<e;p++){6 n=h[p],k=n.17;T(k.2d("3M")>=0){6 k=k.1a(g),f,b;T(b=!k){b=n;P(6 o=1t 0,c=b.1o;c;c=c.1c)6 i=c.1u,o=i===1?o?b:c:i===3?N.1i(c.1v)?b:o:o;b=(f=o===b?1t 0:o)&&"CODE"===f.23}b&&(k=f.17.1a(g));k&&(k=k[1]);b=!1;P(o=n.18;o;o=o.18)T((o.23==="1J"||o.23==="1S"||o.23==="1Z")&&o.17&&o.17.2d("3M")>=0){b=!0;1b}b||((b=(b=n.17.1a(/\\blinenums\\b(?::(\\d+))?/))?b[1]&&b[1].Q?+b[1]:!0:!1)&&D(n,b),d={g:k,h:n,i:b},E(d))}}p<h.Q?setTimeout(m,3L):a&&a()}P(6 e=[1w.2H("1J"),1w.2H("1S"),1w.2H("1Z")],h=[],k=0;k<e.Q;++k)P(6 t=0,s=e[k].Q;t<s;++t)h.R(e[k][t]);6 e=q,l=3N;l.22||(l={22:U(){V+2o 3N}});6 p=0,d,g=/\\blang(?:uage)?-([\\w.]+)(?!\\S)/;m()};19.PR={createSimpleLexer:x,registerLangHandler:k,sourceDecorator:u,PR_ATTRIB_NAME:"3H",PR_ATTRIB_VALUE:"2G",PR_COMMENT:"1l",PR_DECLARATION:"3F",PR_KEYWORD:"39",PR_LITERAL:"2j",PR_NOCODE:"2b",PR_PLAIN:"1f",PR_PUNCTUATION:"1P",PR_SOURCE:"34",PR_STRING:"1k",PR_TAG:"21",PR_TYPE:"2i"}})();',
	[], 236,
	'||||||var|||||||||||||||||||||||||||||||||||||||||||||for|length|push||if|function|return|substring|lang|keywords||||||else|case||className|parentNode|window|match|break|nextSibling|hashComments|replace|pln|cStyleComments||test|Math|str|com|appendChild|charAt|firstChild|multiLineStrings|regexLiterals|style|null|void|nodeType|nodeValue|document|try|default|import|until|||||max|join|currentStyle|getComputedStyle|pre|typeof|undef|delete||finally|pun|createElement|console|code|while|class|false|true|eval|unless|xmp|css|tag|now|tagName|charCodeAt|122|min|NaN||throw|switch|nocode|string|indexOf|hasOwnProperty|tripleQuotedStrings|elif|types|typ|lit|createTextNode|catch|stack|goto|new|package|super|foreach||set|and|not||print|elsif|next|redo|then|BEGIN|END|local||atv|getElementsByTagName|PR_SHOULD_USE_CONTINUATION|parseInt|String|fromCharCode|||apply|source|ignoreCase||global|RegExp|nodeName|||whiteSpace|defaultView|getPropertyValue|white|space|||src|verbatimStrings|regex|continue|instanceof|kwd|xa0||removeChild|index|insertBefore|ownerDocument|override|markup|float|int|export|extends|||from|with|Infinity|def|yield|when|caller|die|dump|exit|last||our|require|sub|use|wantarray|dec|script|atn||val|innerHTML|250|prettyprint|Date'
	.split('|'), 0, {}));


(function($) {
	$.fn.running = function() {
		function n() {
			var t = $(".animateNum");
			var n = {
				top: $(window).scrollTop(),
				bottom: $(window).scrollTop() + $(window).height()
			};
			t.each(function() {
				var t = $(this).attr("data-animateTarget");
				n.top <= $(this).offset().top + $(this).height() && n.bottom >= $(this).offset().top &&
					!$(this).data("start") && ($(this).data("start", !0), new AnimateNum({
						obj: $(this),
						target: t,
						totalTime: 1e3
					}))
			})
		};

		function b() {
			var t = $(".animateBar");
			var n = {
				top: $(window).scrollTop(),
				bottom: $(window).scrollTop() + $(window).height()
			};
			t.each(function() {
				var t = $(this).attr("data-animateTarget");
				n.top <= $(this).offset().top + $(this).height() && n.bottom >= $(this).offset().top &&
					!$(this).data("start") && ($(this).data("start", !0), new AnimateBar({
						obj: $(this),
						target: t,
						totalTime: 1e3
					}))
			})
		};

		function p() {
			var t = $(".animatePie");
			var n = {
				top: $(window).scrollTop(),
				bottom: $(window).scrollTop() + $(window).height()
			};
			t.each(function() {
				var t = $(this).attr("data-animateTarget");
				n.top <= $(this).offset().top + $(this).height() && n.bottom >= $(this).offset().top &&
					!$(this).data("start") && ($(this).data("start", !0), new AnimatePie({
						obj: $(this),
						target: t,
						totalTime: 1e3
					}))
			})
		};
		$(window).bind("scroll", function() {
			n();
			b();
			p()
		});

		function AnimateNum(t) {
			this.obj = t.obj, this.target = t.target.toString(), this.totalTime = t.totalTime || 1e3, this
			.init()
		};

		function AnimateBar(t) {
			this.obj = t.obj, this.target = t.target.toString(), this.totalTime = t.totalTime || 1e3, this
			.init()
		};

		function AnimatePie(t) {
			this.obj = t.obj, this.target = t.target.toString(), this.totalTime = t.totalTime || 1e3, this
			.init()
		};
		AnimateNum.prototype = {
			init: function() {
				return this.target ? (this.animation(), void 0) : !1
			},
			animation: function() {
				var t = this,
					i = this.target.indexOf("."),
					e = 0;
				i >= 0 && (e = this.target.length - i - 1);
				var n = this.target.replace(".", ""),
					s = this.totalTime / 30 | 0,
					a = n / s | 0,
					r = 0,
					h = 0;
				t.timer = setInterval(function() {
					r++, h += a, t.obj.html(h / Math.pow(10, e)), r >= s && (clearInterval(t
						.timer), t.obj.html(t.target))
				}, 30)
			}
		};
		AnimateBar.prototype = {
			init: function() {
				return this.target ? (this.animation(), void 0) : !1
			},
			animation: function() {
				var t = this,
					i = this.target.indexOf("."),
					e = 0;
				i >= 0 && (e = this.target.length - i - 1);
				var n = this.target.replace(".", ""),
					s = this.totalTime / 30 | 0,
					a = n / s | 0,
					r = 0,
					h = 0;
				t.timer = setInterval(function() {
					r++, h += a, t.obj.css('width', h / Math.pow(10, e) + '%'), r >= s && (
						clearInterval(t.timer), t.obj.animate({
							'width': t.target + '%'
						}))
				}, 30)
			}
		};
		AnimatePie.prototype = {
			init: function() {
				return this.target ? (this.animation(), void 0) : !1
			},
			animation: function() {
				var t = this;
				s = this.totalTime / 60 | 0;
				r = 0;
				t.i = 0;
				t.count = 0;
				t.j = 0;
				num = t.target;

				function start1() {
					t.obj.find('.pieInner span').html(t.i + 1);
					if (num == 0) return false;
					t.i = t.i + 1;
					if (t.i == num) {
						clearInterval(t.t1)
					}
					if (t.i == 50) {
						clearInterval(t.t1);
						num2 = num - 50;
						t.t2 = setInterval(start2, 1)
					};
					t.obj.find(".pieLeftInner").css("-o-transform", "rotate(" + t.i * 3.6 + "deg)");
					t.obj.find(".pieLeftInner").css("-moz-transform", "rotate(" + t.i * 3.6 + "deg)");
					t.obj.find(".pieLeftInner").css("-webkit-transform", "rotate(" + t.i * 3.6 + "deg)")
				};

				function start2() {
					t.obj.find('.pieInner span').html(50 + t.j + 1);
					if (num2 == 0) return false;
					t.j = t.j + 1;
					if (t.j == num2) {
						clearInterval(t.t2)
					}
					if (t.j == 50) {
						clearInterval(t.t2)
					};
					t.obj.find(".pieRightInner").css("-o-transform", "rotate(" + t.j * 3.6 + "deg)");
					t.obj.find(".pieRightInner").css("-moz-transform", "rotate(" + t.j * 3.6 + "deg)");
					t.obj.find(".pieRightInner").css("-webkit-transform", "rotate(" + t.j * 3.6 +
						"deg)")
				};
				t.t1 = setInterval(function() {
					r++;
					r >= s && (clearInterval(t.timer), start1())
				}, 30)
			}
		}
	}
})(jQuery);

/*audio*/
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
		"use strict";
		_gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(a, b, c) {
				var d = function(a) {
						var b, c = [],
							d = a.length;
						for (b = 0; b !== d; c.push(a[b++]));
						return c
					},
					e = function(a, b, c) {
						var d, e, f = a.cycle;
						for (d in f) e = f[d], a[d] = "function" == typeof e ? e(c, b[c]) : e[c % e.length];
						delete a.cycle
					},
					f = function(a, b, d) {
						c.call(this, a, b, d), this._cycle = 0, this._yoyo = this.vars.yoyo === !0 || !!this
							.vars.yoyoEase, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars
							.repeatDelay || 0, this._dirty = !0, this.render = f.prototype.render
					},
					g = 1e-10,
					h = c._internals,
					i = h.isSelector,
					j = h.isArray,
					k = f.prototype = c.to({}, .1, {}),
					l = [];
				f.version = "1.20.2", k.constructor = f, k.kill()._gc = !1, f.killTweensOf = f
					.killDelayedCallsTo = c.killTweensOf, f.getTweensOf = c.getTweensOf, f.lagSmoothing = c
					.lagSmoothing, f.ticker = c.ticker, f.render = c.render, k.invalidate = function() {
						return this._yoyo = this.vars.yoyo === !0 || !!this.vars.yoyoEase, this._repeat = this
							.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._yoyoEase =
							null, this._uncache(!0), c.prototype.invalidate.call(this)
					}, k.updateTo = function(a, b) {
						var d, e = this.ratio,
							f = this.vars.immediateRender || a.immediateRender;
						b && this._startTime < this._timeline._time && (this._startTime = this._timeline._time,
							this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(
								this, this._startTime - this._delay));
						for (d in a) this.vars[d] = a[d];
						if (this._initted || f)
							if (b) this._initted = !1, f && this.render(0, !0, !0);
							else if (this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this
							._firstPT && c._onPluginEvent("_onDisable", this), this._time / this._duration >
							.998) {
							var g = this._totalTime;
							this.render(0, !0, !1), this._initted = !1, this.render(g, !0, !1)
						} else if (this._initted = !1, this._init(), this._time > 0 || f)
							for (var h, i = 1 / (1 - e), j = this._firstPT; j;) h = j.s + j.c, j.c *= i, j.s =
								h - j.c, j = j._next;
						return this
					}, k.render = function(a, b, d) {
						this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
						var e, f, i, j, k, l, m, n, o, p = this._dirty ? this.totalDuration() : this
							._totalDuration,
							q = this._time,
							r = this._totalTime,
							s = this._cycle,
							t = this._duration,
							u = this._rawPrevTime;
						if (a >= p - 1e-7 && a >= 0 ? (this._totalTime = p, this._cycle = this._repeat, this
								._yoyo && 0 !== (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease
									._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = t, this.ratio = this
									._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (e = !0,
									f = "onComplete", d = d || this._timeline.autoRemoveChildren), 0 === t && (
									this._initted || !this.vars.lazy || d) && (this._startTime === this
									._timeline._duration && (a = 0), (0 > u || 0 >= a && a >= -1e-7 || u ===
										g && "isPause" !== this.data) && u !== a && (d = !0, u > g && (f =
										"onReverseComplete")), this._rawPrevTime = n = !b || a || u === a ? a :
									g)) : 1e-7 > a ? (this._totalTime = this._time = this._cycle = 0, this
								.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== r || 0 ===
									t && u > 0) && (f = "onReverseComplete", e = this._reversed), 0 > a && (this
									._active = !1, 0 === t && (this._initted || !this.vars.lazy || d) && (u >=
										0 && (d = !0), this._rawPrevTime = n = !b || a || u === a ? a : g)),
								this._initted || (d = !0)) : (this._totalTime = this._time = a, 0 !== this
								._repeat && (j = t + this._repeatDelay, this._cycle = this._totalTime / j >> 0,
									0 !== this._cycle && this._cycle === this._totalTime / j && a >= r && this
									._cycle--, this._time = this._totalTime - this._cycle * j, this._yoyo &&
									0 !== (1 & this._cycle) && (this._time = t - this._time, o = this
										._yoyoEase || this.vars.yoyoEase, o && (this._yoyoEase || (o !== !0 ||
												this._initted ? this._yoyoEase = o = o === !0 ? this._ease :
												o instanceof Ease ? o : Ease.map[o] : (o = this.vars.ease, this
													._yoyoEase = o = o ? o instanceof Ease ? o : "function" ==
													typeof o ? new Ease(o, this.vars.easeParams) : Ease.map[
													o] || c.defaultEase : c.defaultEase)), this.ratio = o ? 1 -
											o.getRatio((t - this._time) / t) : 0)), this._time > t ? this
									._time = t : this._time < 0 && (this._time = 0)), this._easeType && !o ? (
									k = this._time / t, l = this._easeType, m = this._easePower, (1 === l ||
										3 === l && k >= .5) && (k = 1 - k), 3 === l && (k *= 2), 1 === m ? k *=
									k : 2 === m ? k *= k * k : 3 === m ? k *= k * k * k : 4 === m && (k *= k *
										k * k * k), 1 === l ? this.ratio = 1 - k : 2 === l ? this.ratio = k :
									this._time / t < .5 ? this.ratio = k / 2 : this.ratio = 1 - k / 2) : o || (
									this.ratio = this._ease.getRatio(this._time / t))), q === this._time && !
							d && s === this._cycle) return void(r !== this._totalTime && this._onUpdate && (b ||
							this._callback("onUpdate")));
						if (!this._initted) {
							if (this._init(), !this._initted || this._gc) return;
							if (!d && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars
									.lazy && !this._duration)) return this._time = q, this._totalTime = r, this
								._rawPrevTime = u, this._cycle = s, h.lazyTweens.push(this), void(this
									._lazy = [a, b]);
							!this._time || e || o ? e && this._ease._calcEnd && !o && (this.ratio = this._ease
								.getRatio(0 === this._time ? 0 : 1)) : this.ratio = this._ease.getRatio(this
								._time / t)
						}
						for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this
							._time !== q && a >= 0 && (this._active = !0), 0 === r && (2 === this._initted &&
								a > 0 && this._init(), this._startAt && (a >= 0 ? this._startAt.render(a, b,
									d) : f || (f = "_dummyGS")), this.vars.onStart && (0 !== this._totalTime ||
									0 === t) && (b || this._callback("onStart"))), i = this._firstPT; i;) i.f ?
							i.t[i.p](i.c * this.ratio + i.s) : i.t[i.p] = i.c * this.ratio + i.s, i = i._next;
						this._onUpdate && (0 > a && this._startAt && this._startTime && this._startAt.render(a,
								b, d), b || (this._totalTime !== r || f) && this._callback("onUpdate")), this
							._cycle !== s && (b || this._gc || this.vars.onRepeat && this._callback(
							"onRepeat")), f && (!this._gc || d) && (0 > a && this._startAt && !this._onUpdate &&
								this._startTime && this._startAt.render(a, b, d), e && (this._timeline
									.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this
								.vars[f] && this._callback(f), 0 === t && this._rawPrevTime === g && n !== g &&
								(this._rawPrevTime = 0))
					}, f.to = function(a, b, c) {
						return new f(a, b, c)
					}, f.from = function(a, b, c) {
						return c.runBackwards = !0, c.immediateRender = 0 != c.immediateRender, new f(a, b, c)
					}, f.fromTo = function(a, b, c, d) {
						return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c
							.immediateRender, new f(a, b, d)
					}, f.staggerTo = f.allTo = function(a, b, g, h, k, m, n) {
						h = h || 0;
						var o, p, q, r, s = 0,
							t = [],
							u = function() {
								g.onComplete && g.onComplete.apply(g.onCompleteScope || this, arguments), k
									.apply(n || g.callbackScope || this, m || l)
							},
							v = g.cycle,
							w = g.startAt && g.startAt.cycle;
						for (j(a) || ("string" == typeof a && (a = c.selector(a) || a), i(a) && (a = d(a))), a =
							a || [], 0 > h && (a = d(a), a.reverse(), h *= -1), o = a.length - 1, q = 0; o >=
							q; q++) {
							p = {};
							for (r in g) p[r] = g[r];
							if (v && (e(p, a, q), null != p.duration && (b = p.duration, delete p.duration)),
								w) {
								w = p.startAt = {};
								for (r in g.startAt) w[r] = g.startAt[r];
								e(p.startAt, a, q)
							}
							p.delay = s + (p.delay || 0), q === o && k && (p.onComplete = u), t[q] = new f(a[q],
								b, p), s += h
						}
						return t
					}, f.staggerFrom = f.allFrom = function(a, b, c, d, e, g, h) {
						return c.runBackwards = !0, c.immediateRender = 0 != c.immediateRender, f.staggerTo(a,
							b, c, d, e, g, h)
					}, f.staggerFromTo = f.allFromTo = function(a, b, c, d, e, g, h, i) {
						return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c
							.immediateRender, f.staggerTo(a, b, d, e, g, h, i)
					}, f.delayedCall = function(a, b, c, d, e) {
						return new f(b, 0, {
							delay: a,
							onComplete: b,
							onCompleteParams: c,
							callbackScope: d,
							onReverseComplete: b,
							onReverseCompleteParams: c,
							immediateRender: !1,
							useFrames: e,
							overwrite: 0
						})
					}, f.set = function(a, b) {
						return new f(a, 0, b)
					}, f.isTweening = function(a) {
						return c.getTweensOf(a, !0).length > 0
					};
				var m = function(a, b) {
						for (var d = [], e = 0, f = a._first; f;) f instanceof c ? d[e++] = f : (b && (d[e++] =
							f), d = d.concat(m(f, b)), e = d.length), f = f._next;
						return d
					},
					n = f.getAllTweens = function(b) {
						return m(a._rootTimeline, b).concat(m(a._rootFramesTimeline, b))
					};
				f.killAll = function(a, c, d, e) {
					null == c && (c = !0), null == d && (d = !0);
					var f, g, h, i = n(0 != e),
						j = i.length,
						k = c && d && e;
					for (h = 0; j > h; h++) g = i[h], (k || g instanceof b || (f = g.target === g.vars
						.onComplete) && d || c && !f) && (a ? g.totalTime(g._reversed ? 0 : g
						.totalDuration()) : g._enabled(!1, !1))
				}, f.killChildTweensOf = function(a, b) {
					if (null != a) {
						var e, g, k, l, m, n = h.tweenLookup;
						if ("string" == typeof a && (a = c.selector(a) || a), i(a) && (a = d(a)), j(a))
							for (l = a.length; --l > -1;) f.killChildTweensOf(a[l], b);
						else {
							e = [];
							for (k in n)
								for (g = n[k].target.parentNode; g;) g === a && (e = e.concat(n[k].tweens)),
									g = g.parentNode;
							for (m = e.length, l = 0; m > l; l++) b && e[l].totalTime(e[l].totalDuration()),
								e[l]._enabled(!1, !1)
						}
					}
				};
				var o = function(a, c, d, e) {
					c = c !== !1, d = d !== !1, e = e !== !1;
					for (var f, g, h = n(e), i = c && d && e, j = h.length; --j > -1;) g = h[j], (i ||
							g instanceof b || (f = g.target === g.vars.onComplete) && d || c && !f) && g
						.paused(a)
				};
				return f.pauseAll = function(a, b, c) {
					o(!0, a, b, c)
				}, f.resumeAll = function(a, b, c) {
					o(!1, a, b, c)
				}, f.globalTimeScale = function(b) {
					var d = a._rootTimeline,
						e = c.ticker.time;
					return arguments.length ? (b = b || g, d._startTime = e - (e - d._startTime) * d
						._timeScale / b, d = a._rootFramesTimeline, e = c.ticker.frame, d._startTime =
						e - (e - d._startTime) * d._timeScale / b, d._timeScale = a._rootTimeline
						._timeScale = b, b) : d._timeScale
				}, k.progress = function(a, b) {
					return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 &
						this._cycle) ? 1 - a : a) + this._cycle * (this._duration + this
						._repeatDelay), b) : this._time / this.duration()
				}, k.totalProgress = function(a, b) {
					return arguments.length ? this.totalTime(this.totalDuration() * a, b) : this
						._totalTime / this.totalDuration()
				}, k.time = function(a, b) {
					return arguments.length ? (this._dirty && this.totalDuration(), a > this._duration && (
							a = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? a = this
						._duration - a + this._cycle * (this._duration + this._repeatDelay) : 0 !== this
						._repeat && (a += this._cycle * (this._duration + this._repeatDelay)), this
						.totalTime(a, b)) : this._time
				}, k.duration = function(b) {
					return arguments.length ? a.prototype.duration.call(this, b) : this._duration
				}, k.totalDuration = function(a) {
					return arguments.length ? -1 === this._repeat ? this : this.duration((a - this._repeat *
						this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this
							._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (
								this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1),
						this._totalDuration)
				}, k.repeat = function(a) {
					return arguments.length ? (this._repeat = a, this._uncache(!0)) : this._repeat
				}, k.repeatDelay = function(a) {
					return arguments.length ? (this._repeatDelay = a, this._uncache(!0)) : this._repeatDelay
				}, k.yoyo = function(a) {
					return arguments.length ? (this._yoyo = a, this) : this._yoyo
				}, f
			}, !0), _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"],
				function(a, b, c) {
					var d = function(a) {
							b.call(this, a), this._labels = {}, this.autoRemoveChildren = this.vars
								.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming ===
								!0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
							var c, d, e = this.vars;
							for (d in e) c = e[d], i(c) && -1 !== c.join("").indexOf("{self}") && (e[d] = this
								._swapSelfInParams(c));
							i(e.tweens) && this.add(e.tweens, 0, e.align, e.stagger)
						},
						e = 1e-10,
						f = c._internals,
						g = d._internals = {},
						h = f.isSelector,
						i = f.isArray,
						j = f.lazyTweens,
						k = f.lazyRender,
						l = _gsScope._gsDefine.globals,
						m = function(a) {
							var b, c = {};
							for (b in a) c[b] = a[b];
							return c
						},
						n = function(a, b, c) {
							var d, e, f = a.cycle;
							for (d in f) e = f[d], a[d] = "function" == typeof e ? e(c, b[c]) : e[c % e.length];
							delete a.cycle
						},
						o = g.pauseCallback = function() {},
						p = function(a) {
							var b, c = [],
								d = a.length;
							for (b = 0; b !== d; c.push(a[b++]));
							return c
						},
						q = d.prototype = new b;
					return d.version = "1.20.2", q.constructor = d, q.kill()._gc = q._forcingPlayhead = q
						._hasPause = !1, q.to = function(a, b, d, e) {
							var f = d.repeat && l.TweenMax || c;
							return b ? this.add(new f(a, b, d), e) : this.set(a, d, e)
						}, q.from = function(a, b, d, e) {
							return this.add((d.repeat && l.TweenMax || c).from(a, b, d), e)
						}, q.fromTo = function(a, b, d, e, f) {
							var g = e.repeat && l.TweenMax || c;
							return b ? this.add(g.fromTo(a, b, d, e), f) : this.set(a, e, f)
						}, q.staggerTo = function(a, b, e, f, g, i, j, k) {
							var l, o, q = new d({
									onComplete: i,
									onCompleteParams: j,
									callbackScope: k,
									smoothChildTiming: this.smoothChildTiming
								}),
								r = e.cycle;
							for ("string" == typeof a && (a = c.selector(a) || a), a = a || [], h(a) && (a = p(a)),
								f = f || 0, 0 > f && (a = p(a), a.reverse(), f *= -1), o = 0; o < a.length; o++) l =
								m(e), l.startAt && (l.startAt = m(l.startAt), l.startAt.cycle && n(l.startAt, a,
								o)), r && (n(l, a, o), null != l.duration && (b = l.duration, delete l.duration)), q
								.to(a[o], b, l, o * f);
							return this.add(q, g)
						}, q.staggerFrom = function(a, b, c, d, e, f, g, h) {
							return c.immediateRender = 0 != c.immediateRender, c.runBackwards = !0, this.staggerTo(
								a, b, c, d, e, f, g, h)
						}, q.staggerFromTo = function(a, b, c, d, e, f, g, h, i) {
							return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c
								.immediateRender, this.staggerTo(a, b, d, e, f, g, h, i)
						}, q.call = function(a, b, d, e) {
							return this.add(c.delayedCall(0, a, b, d), e)
						}, q.set = function(a, b, d) {
							return d = this._parseTimeOrLabel(d, 0, !0), null == b.immediateRender && (b
								.immediateRender = d === this._time && !this._paused), this.add(new c(a, 0, b),
								d)
						}, d.exportRoot = function(a, b) {
							a = a || {}, null == a.smoothChildTiming && (a.smoothChildTiming = !0);
							var e, f, g = new d(a),
								h = g._timeline;
							for (null == b && (b = !0), h._remove(g, !0), g._startTime = 0, g._rawPrevTime = g
								._time = g._totalTime = h._time, e = h._first; e;) f = e._next, b &&
								e instanceof c && e.target === e.vars.onComplete || g.add(e, e._startTime - e
									._delay), e = f;
							return h.add(g, 0), g
						}, q.add = function(e, f, g, h) {
							var j, k, l, m, n, o;
							if ("number" != typeof f && (f = this._parseTimeOrLabel(f, 0, !0, e)), !(
								e instanceof a)) {
								if (e instanceof Array || e && e.push && i(e)) {
									for (g = g || "normal", h = h || 0, j = f, k = e.length, l = 0; k > l; l++) i(
										m = e[l]) && (m = new d({
										tweens: m
									})), this.add(m, j), "string" != typeof m && "function" != typeof m && (
										"sequence" === g ? j = m._startTime + m.totalDuration() / m._timeScale :
										"start" === g && (m._startTime -= m.delay())), j += h;
									return this._uncache(!0)
								}
								if ("string" == typeof e) return this.addLabel(e, f);
								if ("function" != typeof e) throw "Cannot add " + e +
									" into the timeline; it is not a tween, timeline, function, or string.";
								e = c.delayedCall(0, e)
							}
							if (b.prototype.add.call(this, e, f), e._time && e.render((this.rawTime() - e
									._startTime) * e._timeScale, !1, !1), (this._gc || this._time === this
									._duration) && !this._paused && this._duration < this.duration())
								for (n = this, o = n.rawTime() > e._startTime; n._timeline;) o && n._timeline
									.smoothChildTiming ? n.totalTime(n._totalTime, !0) : n._gc && n._enabled(!0, !
									1), n = n._timeline;
							return this
						}, q.remove = function(b) {
							if (b instanceof a) {
								this._remove(b, !1);
								var c = b._timeline = b.vars.useFrames ? a._rootFramesTimeline : a._rootTimeline;
								return b._startTime = (b._paused ? b._pauseTime : c._time) - (b._reversed ? b
									.totalDuration() - b._totalTime : b._totalTime) / b._timeScale, this
							}
							if (b instanceof Array || b && b.push && i(b)) {
								for (var d = b.length; --d > -1;) this.remove(b[d]);
								return this
							}
							return "string" == typeof b ? this.removeLabel(b) : this.kill(null, b)
						}, q._remove = function(a, c) {
							b.prototype._remove.call(this, a, c);
							var d = this._last;
							return d ? this._time > this.duration() && (this._time = this._duration, this
									._totalTime = this._totalDuration) : this._time = this._totalTime = this
								._duration = this._totalDuration = 0, this
						}, q.append = function(a, b) {
							return this.add(a, this._parseTimeOrLabel(null, b, !0, a))
						}, q.insert = q.insertMultiple = function(a, b, c, d) {
							return this.add(a, b || 0, c, d)
						}, q.appendMultiple = function(a, b, c, d) {
							return this.add(a, this._parseTimeOrLabel(null, b, !0, a), c, d)
						}, q.addLabel = function(a, b) {
							return this._labels[a] = this._parseTimeOrLabel(b), this
						}, q.addPause = function(a, b, d, e) {
							var f = c.delayedCall(0, o, d, e || this);
							return f.vars.onComplete = f.vars.onReverseComplete = b, f.data = "isPause", this
								._hasPause = !0, this.add(f, a)
						}, q.removeLabel = function(a) {
							return delete this._labels[a], this
						}, q.getLabelTime = function(a) {
							return null != this._labels[a] ? this._labels[a] : -1
						}, q._parseTimeOrLabel = function(b, c, d, e) {
							var f, g;
							if (e instanceof a && e.timeline === this) this.remove(e);
							else if (e && (e instanceof Array || e.push && i(e)))
								for (g = e.length; --g > -1;) e[g] instanceof a && e[g].timeline === this && this
									.remove(e[g]);
							if (f = this.duration() > 99999999999 ? this.recent().endTime(!1) : this._duration,
								"string" == typeof c) return this._parseTimeOrLabel(c, d && "number" == typeof b &&
								null == this._labels[c] ? b - f : 0, d);
							if (c = c || 0, "string" != typeof b || !isNaN(b) && null == this._labels[b]) null ==
								b && (b = f);
							else {
								if (g = b.indexOf("="), -1 === g) return null == this._labels[b] ? d ? this._labels[
									b] = f + c : c : this._labels[b] + c;
								c = parseInt(b.charAt(g - 1) + "1", 10) * Number(b.substr(g + 1)), b = g > 1 ? this
									._parseTimeOrLabel(b.substr(0, g - 1), 0, d) : f
							}
							return Number(b) + c
						}, q.seek = function(a, b) {
							return this.totalTime("number" == typeof a ? a : this._parseTimeOrLabel(a), b !== !1)
						}, q.stop = function() {
							return this.paused(!0)
						}, q.gotoAndPlay = function(a, b) {
							return this.play(a, b)
						}, q.gotoAndStop = function(a, b) {
							return this.pause(a, b)
						}, q.render = function(a, b, c) {
							this._gc && this._enabled(!0, !1);
							var d, f, g, h, i, l, m, n = this._dirty ? this.totalDuration() : this._totalDuration,
								o = this._time,
								p = this._startTime,
								q = this._timeScale,
								r = this._paused;
							if (a >= n - 1e-7 && a >= 0) this._totalTime = this._time = n, this._reversed || this
								._hasPausedChild() || (f = !0, h = "onComplete", i = !!this._timeline
									.autoRemoveChildren, 0 === this._duration && (0 >= a && a >= -1e-7 || this
										._rawPrevTime < 0 || this._rawPrevTime === e) && this._rawPrevTime !== a &&
									this._first && (i = !0, this._rawPrevTime > e && (h = "onReverseComplete"))),
								this._rawPrevTime = this._duration || !b || a || this._rawPrevTime === a ? a : e,
								a = n + 1e-4;
							else if (1e-7 > a)
								if (this._totalTime = this._time = 0, (0 !== o || 0 === this._duration && this
										._rawPrevTime !== e && (this._rawPrevTime > 0 || 0 > a && this
											._rawPrevTime >= 0)) && (h = "onReverseComplete", f = this._reversed),
									0 > a) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ?
									(i = f = !0, h = "onReverseComplete") : this._rawPrevTime >= 0 && this._first &&
									(i = !0), this._rawPrevTime = a;
								else {
									if (this._rawPrevTime = this._duration || !b || a || this._rawPrevTime === a ?
										a : e, 0 === a && f)
										for (d = this._first; d && 0 === d._startTime;) d._duration || (f = !1), d =
											d._next;
									a = 0, this._initted || (i = !0)
								}
							else {
								if (this._hasPause && !this._forcingPlayhead && !b) {
									if (a >= o)
										for (d = this._first; d && d._startTime <= a && !l;) d._duration ||
											"isPause" !== d.data || d.ratio || 0 === d._startTime && 0 === this
											._rawPrevTime || (l = d), d = d._next;
									else
										for (d = this._last; d && d._startTime >= a && !l;) d._duration ||
											"isPause" === d.data && d._rawPrevTime > 0 && (l = d), d = d._prev;
									l && (this._time = a = l._startTime, this._totalTime = a + this._cycle * (this
										._totalDuration + this._repeatDelay))
								}
								this._totalTime = this._time = this._rawPrevTime = a
							}
							if (this._time !== o && this._first || c || i || l) {
								if (this._initted || (this._initted = !0), this._active || !this._paused && this
									._time !== o && a > 0 && (this._active = !0), 0 === o && this.vars.onStart && (
										0 === this._time && this._duration || b || this._callback("onStart")), m =
									this._time, m >= o)
									for (d = this._first; d && (g = d._next, m === this._time && (!this._paused ||
											r));)(d._active || d._startTime <= m && !d._paused && !d._gc) && (l ===
										d && this.pause(), d._reversed ? d.render((d._dirty ? d
											.totalDuration() : d._totalDuration) - (a - d._startTime) * d
											._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b,
											c)), d = g;
								else
									for (d = this._last; d && (g = d._prev, m === this._time && (!this._paused ||
											r));) {
										if (d._active || d._startTime <= o && !d._paused && !d._gc) {
											if (l === d) {
												for (l = d._prev; l && l.endTime() > this._time;) l.render(l
														._reversed ? l.totalDuration() - (a - l._startTime) * l
														._timeScale : (a - l._startTime) * l._timeScale, b, c), l =
													l._prev;
												l = null, this.pause()
											}
											d._reversed ? d.render((d._dirty ? d.totalDuration() : d
													._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d
												.render((a - d._startTime) * d._timeScale, b, c)
										}
										d = g
									}
								this._onUpdate && (b || (j.length && k(), this._callback("onUpdate"))), h && (this
									._gc || (p === this._startTime || q !== this._timeScale) && (0 === this
										._time || n >= this.totalDuration()) && (f && (j.length && k(), this
										._timeline.autoRemoveChildren && this._enabled(!1, !1), this
										._active = !1), !b && this.vars[h] && this._callback(h)))
							}
						}, q._hasPausedChild = function() {
							for (var a = this._first; a;) {
								if (a._paused || a instanceof d && a._hasPausedChild()) return !0;
								a = a._next
							}
							return !1
						}, q.getChildren = function(a, b, d, e) {
							e = e || -9999999999;
							for (var f = [], g = this._first, h = 0; g;) g._startTime < e || (g instanceof c ? b !==
								!1 && (f[h++] = g) : (d !== !1 && (f[h++] = g), a !== !1 && (f = f.concat(g
									.getChildren(!0, b, d)), h = f.length))), g = g._next;
							return f
						}, q.getTweensOf = function(a, b) {
							var d, e, f = this._gc,
								g = [],
								h = 0;
							for (f && this._enabled(!0, !0), d = c.getTweensOf(a), e = d.length; --e > -1;)(d[e]
								.timeline === this || b && this._contains(d[e])) && (g[h++] = d[e]);
							return f && this._enabled(!1, !0), g
						}, q.recent = function() {
							return this._recent
						}, q._contains = function(a) {
							for (var b = a.timeline; b;) {
								if (b === this) return !0;
								b = b.timeline
							}
							return !1
						}, q.shiftChildren = function(a, b, c) {
							c = c || 0;
							for (var d, e = this._first, f = this._labels; e;) e._startTime >= c && (e._startTime +=
								a), e = e._next;
							if (b)
								for (d in f) f[d] >= c && (f[d] += a);
							return this._uncache(!0)
						}, q._kill = function(a, b) {
							if (!a && !b) return this._enabled(!1, !1);
							for (var c = b ? this.getTweensOf(b) : this.getChildren(!0, !0, !1), d = c.length, e = !
									1; --d > -1;) c[d]._kill(a, b) && (e = !0);
							return e
						}, q.clear = function(a) {
							var b = this.getChildren(!1, !0, !0),
								c = b.length;
							for (this._time = this._totalTime = 0; --c > -1;) b[c]._enabled(!1, !1);
							return a !== !1 && (this._labels = {}), this._uncache(!0)
						}, q.invalidate = function() {
							for (var b = this._first; b;) b.invalidate(), b = b._next;
							return a.prototype.invalidate.call(this)
						}, q._enabled = function(a, c) {
							if (a === this._gc)
								for (var d = this._first; d;) d._enabled(a, !0), d = d._next;
							return b.prototype._enabled.call(this, a, c)
						}, q.totalTime = function(b, c, d) {
							this._forcingPlayhead = !0;
							var e = a.prototype.totalTime.apply(this, arguments);
							return this._forcingPlayhead = !1, e
						}, q.duration = function(a) {
							return arguments.length ? (0 !== this.duration() && 0 !== a && this.timeScale(this
								._duration / a), this) : (this._dirty && this.totalDuration(), this._duration)
						}, q.totalDuration = function(a) {
							if (!arguments.length) {
								if (this._dirty) {
									for (var b, c, d = 0, e = this._last, f = 999999999999; e;) b = e._prev, e
										._dirty && e.totalDuration(), e._startTime > f && this._sortChildren && !e
										._paused ? this.add(e, e._startTime - e._delay) : f = e._startTime, e
										._startTime < 0 && !e._paused && (d -= e._startTime, this._timeline
											.smoothChildTiming && (this._startTime += e._startTime / this
												._timeScale), this.shiftChildren(-e._startTime, !1, -9999999999),
											f = 0), c = e._startTime + e._totalDuration / e._timeScale, c > d && (
											d = c), e = b;
									this._duration = this._totalDuration = d, this._dirty = !1
								}
								return this._totalDuration
							}
							return a && this.totalDuration() ? this.timeScale(this._totalDuration / a) : this
						}, q.paused = function(b) {
							if (!b)
								for (var c = this._first, d = this._time; c;) c._startTime === d && "isPause" === c
									.data && (c._rawPrevTime = 0), c = c._next;
							return a.prototype.paused.apply(this, arguments)
						}, q.usesFrames = function() {
							for (var b = this._timeline; b._timeline;) b = b._timeline;
							return b === a._rootFramesTimeline
						}, q.rawTime = function(a) {
							return a && (this._paused || this._repeat && this.time() > 0 && this.totalProgress() <
									1) ? this._totalTime % (this._duration + this._repeatDelay) : this._paused ?
								this._totalTime : (this._timeline.rawTime(a) - this._startTime) * this._timeScale
						}, d
				}, !0), _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function(a,
				b, c) {
				var d = function(b) {
						a.call(this, b), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars
							.repeatDelay || 0, this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this
							._dirty = !0
					},
					e = 1e-10,
					f = b._internals,
					g = f.lazyTweens,
					h = f.lazyRender,
					i = _gsScope._gsDefine.globals,
					j = new c(null, null, 1, 0),
					k = d.prototype = new a;
				return k.constructor = d, k.kill()._gc = !1, d.version = "1.20.2", k.invalidate = function() {
					return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this
						._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), a.prototype
						.invalidate.call(this)
				}, k.addCallback = function(a, c, d, e) {
					return this.add(b.delayedCall(0, a, d, e), c)
				}, k.removeCallback = function(a, b) {
					if (a)
						if (null == b) this._kill(null, a);
						else
							for (var c = this.getTweensOf(a, !1), d = c.length, e = this._parseTimeOrLabel(
									b); --d > -1;) c[d]._startTime === e && c[d]._enabled(!1, !1);
					return this
				}, k.removePause = function(b) {
					return this.removeCallback(a._internals.pauseCallback, b)
				}, k.tweenTo = function(a, c) {
					c = c || {};
					var d, e, f, g = {
							ease: j,
							useFrames: this.usesFrames(),
							immediateRender: !1
						},
						h = c.repeat && i.TweenMax || b;
					for (e in c) g[e] = c[e];
					return g.time = this._parseTimeOrLabel(a), d = Math.abs(Number(g.time) - this._time) /
						this._timeScale || .001, f = new h(this, d, g), g.onStart = function() {
							f.target.paused(!0), f.vars.time !== f.target.time() && d === f.duration() && f
								.duration(Math.abs(f.vars.time - f.target.time()) / f.target._timeScale), c
								.onStart && c.onStart.apply(c.onStartScope || c.callbackScope || f, c
									.onStartParams || [])
						}, f
				}, k.tweenFromTo = function(a, b, c) {
					c = c || {}, a = this._parseTimeOrLabel(a), c.startAt = {
						onComplete: this.seek,
						onCompleteParams: [a],
						callbackScope: this
					}, c.immediateRender = c.immediateRender !== !1;
					var d = this.tweenTo(b, c);
					return d.duration(Math.abs(d.vars.time - a) / this._timeScale || .001)
				}, k.render = function(a, b, c) {
					this._gc && this._enabled(!0, !1);
					var d, f, i, j, k, l, m, n, o = this._dirty ? this.totalDuration() : this
						._totalDuration,
						p = this._duration,
						q = this._time,
						r = this._totalTime,
						s = this._startTime,
						t = this._timeScale,
						u = this._rawPrevTime,
						v = this._paused,
						w = this._cycle;
					if (a >= o - 1e-7 && a >= 0) this._locked || (this._totalTime = o, this._cycle = this
							._repeat), this._reversed || this._hasPausedChild() || (f = !0, j =
							"onComplete", k = !!this._timeline.autoRemoveChildren, 0 === this._duration && (
								0 >= a && a >= -1e-7 || 0 > u || u === e) && u !== a && this._first && (
								k = !0, u > e && (j = "onReverseComplete"))), this._rawPrevTime = this
						._duration || !b || a || this._rawPrevTime === a ? a : e, this._yoyo && 0 !== (1 &
							this._cycle) ? this._time = a = 0 : (this._time = p, a = p + 1e-4);
					else if (1e-7 > a)
						if (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== q ||
								0 === p && u !== e && (u > 0 || 0 > a && u >= 0) && !this._locked) && (j =
								"onReverseComplete", f = this._reversed), 0 > a) this._active = !1, this
							._timeline.autoRemoveChildren && this._reversed ? (k = f = !0, j =
								"onReverseComplete") : u >= 0 && this._first && (k = !0), this
							._rawPrevTime = a;
						else {
							if (this._rawPrevTime = p || !b || a || this._rawPrevTime === a ? a : e, 0 ===
								a && f)
								for (d = this._first; d && 0 === d._startTime;) d._duration || (f = !1), d =
									d._next;
							a = 0, this._initted || (k = !0)
						}
					else if (0 === p && 0 > u && (k = !0), this._time = this._rawPrevTime = a, this
						._locked || (this._totalTime = a, 0 !== this._repeat && (l = p + this._repeatDelay,
							this._cycle = this._totalTime / l >> 0, 0 !== this._cycle && this._cycle ===
							this._totalTime / l && a >= r && this._cycle--, this._time = this
							._totalTime - this._cycle * l, this._yoyo && 0 !== (1 & this._cycle) && (
								this._time = p - this._time), this._time > p ? (this._time = p, a = p +
								1e-4) : this._time < 0 ? this._time = a = 0 : a = this._time)), this
						._hasPause && !this._forcingPlayhead && !b) {
						if (a = this._time, a >= q || this._repeat && w !== this._cycle)
							for (d = this._first; d && d._startTime <= a && !m;) d._duration ||
								"isPause" !== d.data || d.ratio || 0 === d._startTime && 0 === this
								._rawPrevTime || (m = d), d = d._next;
						else
							for (d = this._last; d && d._startTime >= a && !m;) d._duration || "isPause" ===
								d.data && d._rawPrevTime > 0 && (m = d), d = d._prev;
						m && m._startTime < p && (this._time = a = m._startTime, this._totalTime = a + this
							._cycle * (this._totalDuration + this._repeatDelay))
					}
					if (this._cycle !== w && !this._locked) {
						var x = this._yoyo && 0 !== (1 & w),
							y = x === (this._yoyo && 0 !== (1 & this._cycle)),
							z = this._totalTime,
							A = this._cycle,
							B = this._rawPrevTime,
							C = this._time;
						if (this._totalTime = w * p, this._cycle < w ? x = !x : this._totalTime += p, this
							._time = q, this._rawPrevTime = 0 === p ? u - 1e-4 : u, this._cycle = w, this
							._locked = !0, q = x ? 0 : p, this.render(q, b, 0 === p), b || this._gc || this
							.vars.onRepeat && (this._cycle = A, this._locked = !1, this._callback(
								"onRepeat")), q !== this._time) return;
						if (y && (this._cycle = w, this._locked = !0, q = x ? p + 1e-4 : -1e-4, this.render(
								q, !0, !1)), this._locked = !1, this._paused && !v) return;
						this._time = C, this._totalTime = z, this._cycle = A, this._rawPrevTime = B
					}
					if (!(this._time !== q && this._first || c || k || m)) return void(r !== this
						._totalTime && this._onUpdate && (b || this._callback("onUpdate")));
					if (this._initted || (this._initted = !0), this._active || !this._paused && this
						._totalTime !== r && a > 0 && (this._active = !0), 0 === r && this.vars.onStart && (
							0 === this._totalTime && this._totalDuration || b || this._callback("onStart")),
						n = this._time, n >= q)
						for (d = this._first; d && (i = d._next, n === this._time && (!this._paused || v));)
							(d._active || d._startTime <= this._time && !d._paused && !d._gc) && (m === d &&
								this.pause(), d._reversed ? d.render((d._dirty ? d.totalDuration() : d
									._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((
									a - d._startTime) * d._timeScale, b, c)), d = i;
					else
						for (d = this._last; d && (i = d._prev, n === this._time && (!this._paused ||
							v));) {
							if (d._active || d._startTime <= q && !d._paused && !d._gc) {
								if (m === d) {
									for (m = d._prev; m && m.endTime() > this._time;) m.render(m._reversed ?
										m.totalDuration() - (a - m._startTime) * m._timeScale : (a - m
											._startTime) * m._timeScale, b, c), m = m._prev;
									m = null, this.pause()
								}
								d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (
									a - d._startTime) * d._timeScale, b, c) : d.render((a - d
									._startTime) * d._timeScale, b, c)
							}
							d = i
						}
					this._onUpdate && (b || (g.length && h(), this._callback("onUpdate"))), j && (this
						._locked || this._gc || (s === this._startTime || t !== this._timeScale) && (
							0 === this._time || o >= this.totalDuration()) && (f && (g.length && h(),
							this._timeline.autoRemoveChildren && this._enabled(!1, !1), this
							._active = !1), !b && this.vars[j] && this._callback(j)))
				}, k.getActive = function(a, b, c) {
					null == a && (a = !0), null == b && (b = !0), null == c && (c = !1);
					var d, e, f = [],
						g = this.getChildren(a, b, c),
						h = 0,
						i = g.length;
					for (d = 0; i > d; d++) e = g[d], e.isActive() && (f[h++] = e);
					return f
				}, k.getLabelAfter = function(a) {
					a || 0 !== a && (a = this._time);
					var b, c = this.getLabelsArray(),
						d = c.length;
					for (b = 0; d > b; b++)
						if (c[b].time > a) return c[b].name;
					return null
				}, k.getLabelBefore = function(a) {
					null == a && (a = this._time);
					for (var b = this.getLabelsArray(), c = b.length; --c > -1;)
						if (b[c].time < a) return b[c].name;
					return null
				}, k.getLabelsArray = function() {
					var a, b = [],
						c = 0;
					for (a in this._labels) b[c++] = {
						time: this._labels[a],
						name: a
					};
					return b.sort(function(a, b) {
						return a.time - b.time
					}), b
				}, k.invalidate = function() {
					return this._locked = !1, a.prototype.invalidate.call(this)
				}, k.progress = function(a, b) {
					return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 &
						this._cycle) ? 1 - a : a) + this._cycle * (this._duration + this
						._repeatDelay), b) : this._time / this.duration() || 0
				}, k.totalProgress = function(a, b) {
					return arguments.length ? this.totalTime(this.totalDuration() * a, b) : this
						._totalTime / this.totalDuration() || 0
				}, k.totalDuration = function(b) {
					return arguments.length ? -1 !== this._repeat && b ? this.timeScale(this
					.totalDuration() / b) : this : (this._dirty && (a.prototype.totalDuration.call(
							this), this._totalDuration = -1 === this._repeat ? 999999999999 : this
							._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this
						._totalDuration)
				}, k.time = function(a, b) {
					return arguments.length ? (this._dirty && this.totalDuration(), a > this._duration && (
							a = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? a = this
						._duration - a + this._cycle * (this._duration + this._repeatDelay) : 0 !== this
						._repeat && (a += this._cycle * (this._duration + this._repeatDelay)), this
						.totalTime(a, b)) : this._time
				}, k.repeat = function(a) {
					return arguments.length ? (this._repeat = a, this._uncache(!0)) : this._repeat
				}, k.repeatDelay = function(a) {
					return arguments.length ? (this._repeatDelay = a, this._uncache(!0)) : this._repeatDelay
				}, k.yoyo = function(a) {
					return arguments.length ? (this._yoyo = a, this) : this._yoyo
				}, k.currentLabel = function(a) {
					return arguments.length ? this.seek(a, !0) : this.getLabelBefore(this._time + 1e-8)
				}, d
			}, !0),
			function() {
				var a = 180 / Math.PI,
					b = [],
					c = [],
					d = [],
					e = {},
					f = _gsScope._gsDefine.globals,
					g = function(a, b, c, d) {
						c === d && (c = d - (d - b) / 1e6), a === b && (b = a + (c - a) / 1e6), this.a = a, this.b =
							b, this.c = c, this.d = d, this.da = d - a, this.ca = c - a, this.ba = b - a
					},
					h =
					",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
					i = function(a, b, c, d) {
						var e = {
								a: a
							},
							f = {},
							g = {},
							h = {
								c: d
							},
							i = (a + b) / 2,
							j = (b + c) / 2,
							k = (c + d) / 2,
							l = (i + j) / 2,
							m = (j + k) / 2,
							n = (m - l) / 8;
						return e.b = i + (a - i) / 4, f.b = l + n, e.c = f.a = (e.b + f.b) / 2, f.c = g.a = (l +
							m) / 2, g.b = m - n, h.b = k + (d - k) / 4, g.c = h.a = (g.b + h.b) / 2, [e, f, g, h]
					},
					j = function(a, e, f, g, h) {
						var j, k, l, m, n, o, p, q, r, s, t, u, v, w = a.length - 1,
							x = 0,
							y = a[0].a;
						for (j = 0; w > j; j++) n = a[x], k = n.a, l = n.d, m = a[x + 1].d, h ? (t = b[j], u = c[j],
								v = (u + t) * e * .25 / (g ? .5 : d[j] || .5), o = l - (l - k) * (g ? .5 * e : 0 !==
									t ? v / t : 0), p = l + (m - l) * (g ? .5 * e : 0 !== u ? v / u : 0), q = l - (
									o + ((p - o) * (3 * t / (t + u) + .5) / 4 || 0))) : (o = l - (l - k) * e * .5,
								p = l + (m - l) * e * .5, q = l - (o + p) / 2), o += q, p += q, n.c = r = o, 0 !==
							j ? n.b = y : n.b = y = n.a + .6 * (n.c - n.a), n.da = l - k, n.ca = r - k, n.ba = y -
							k, f ? (s = i(k, y, r, l), a.splice(x, 1, s[0], s[1], s[2], s[3]), x += 4) : x++, y = p;
						n = a[x], n.b = y, n.c = y + .4 * (n.d - y), n.da = n.d - n.a, n.ca = n.c - n.a, n.ba = y -
							n.a, f && (s = i(n.a, y, n.c, n.d), a.splice(x, 1, s[0], s[1], s[2], s[3]))
					},
					k = function(a, d, e, f) {
						var h, i, j, k, l, m, n = [];
						if (f)
							for (a = [f].concat(a), i = a.length; --i > -1;) "string" == typeof(m = a[i][d]) &&
								"=" === m.charAt(1) && (a[i][d] = f[d] + Number(m.charAt(0) + m.substr(2)));
						if (h = a.length - 2, 0 > h) return n[0] = new g(a[0][d], 0, 0, a[0][d]), n;
						for (i = 0; h > i; i++) j = a[i][d], k = a[i + 1][d], n[i] = new g(j, 0, 0, k), e && (l = a[
								i + 2][d], b[i] = (b[i] || 0) + (k - j) * (k - j), c[i] = (c[i] || 0) + (l -
							k) * (l - k));
						return n[i] = new g(a[i][d], 0, 0, a[i + 1][d]), n
					},
					l = function(a, f, g, i, l, m) {
						var n, o, p, q, r, s, t, u, v = {},
							w = [],
							x = m || a[0];
						l = "string" == typeof l ? "," + l + "," : h, null == f && (f = 1);
						for (o in a[0]) w.push(o);
						if (a.length > 1) {
							for (u = a[a.length - 1], t = !0, n = w.length; --n > -1;)
								if (o = w[n], Math.abs(x[o] - u[o]) > .05) {
									t = !1;
									break
								} t && (a = a.concat(), m && a.unshift(m), a.push(a[1]), m = a[a.length - 3])
						}
						for (b.length = c.length = d.length = 0, n = w.length; --n > -1;) o = w[n], e[o] = -1 !== l
							.indexOf("," + o + ","), v[o] = k(a, o, e[o], m);
						for (n = b.length; --n > -1;) b[n] = Math.sqrt(b[n]), c[n] = Math.sqrt(c[n]);
						if (!i) {
							for (n = w.length; --n > -1;)
								if (e[o])
									for (p = v[w[n]], s = p.length - 1, q = 0; s > q; q++) r = p[q + 1].da / c[q] +
										p[q].da / b[q] || 0, d[q] = (d[q] || 0) + r * r;
							for (n = d.length; --n > -1;) d[n] = Math.sqrt(d[n])
						}
						for (n = w.length, q = g ? 4 : 1; --n > -1;) o = w[n], p = v[o], j(p, f, g, i, e[o]), t && (
							p.splice(0, q), p.splice(p.length - q, q));
						return v
					},
					m = function(a, b, c) {
						b = b || "soft";
						var d, e, f, h, i, j, k, l, m, n, o, p = {},
							q = "cubic" === b ? 3 : 2,
							r = "soft" === b,
							s = [];
						if (r && c && (a = [c].concat(a)), null == a || a.length < q + 1)
						throw "invalid Bezier data";
						for (m in a[0]) s.push(m);
						for (j = s.length; --j > -1;) {
							for (m = s[j], p[m] = i = [], n = 0, l = a.length, k = 0; l > k; k++) d = null == c ? a[
								k][m] : "string" == typeof(o = a[k][m]) && "=" === o.charAt(1) ? c[m] + Number(o
								.charAt(0) + o.substr(2)) : Number(o), r && k > 1 && l - 1 > k && (i[n++] = (d +
								i[n - 2]) / 2), i[n++] = d;
							for (l = n - q + 1, n = 0, k = 0; l > k; k += q) d = i[k], e = i[k + 1], f = i[k + 2],
								h = 2 === q ? 0 : i[k + 3], i[n++] = o = 3 === q ? new g(d, e, f, h) : new g(d, (2 *
									e + d) / 3, (2 * e + f) / 3, f);
							i.length = n
						}
						return p
					},
					n = function(a, b, c) {
						for (var d, e, f, g, h, i, j, k, l, m, n, o = 1 / c, p = a.length; --p > -1;)
							for (m = a[p], f = m.a, g = m.d - f, h = m.c - f, i = m.b - f, d = e = 0, k = 1; c >=
								k; k++) j = o * k, l = 1 - j, d = e - (e = (j * j * g + 3 * l * (j * h + l * i)) *
								j), n = p * c + k - 1, b[n] = (b[n] || 0) + d * d
					},
					o = function(a, b) {
						b = b >> 0 || 6;
						var c, d, e, f, g = [],
							h = [],
							i = 0,
							j = 0,
							k = b - 1,
							l = [],
							m = [];
						for (c in a) n(a[c], g, b);
						for (e = g.length, d = 0; e > d; d++) i += Math.sqrt(g[d]), f = d % b, m[f] = i, f === k &&
							(j += i, f = d / b >> 0, l[f] = m, h[f] = j, i = 0, m = []);
						return {
							length: j,
							lengths: h,
							segments: l
						}
					},
					p = _gsScope._gsDefine.plugin({
						propName: "bezier",
						priority: -1,
						version: "1.3.8",
						API: 2,
						global: !0,
						init: function(a, b, c) {
							this._target = a, b instanceof Array && (b = {
									values: b
								}), this._func = {}, this._mod = {}, this._props = [], this._timeRes =
								null == b.timeResolution ? 6 : parseInt(b.timeResolution, 10);
							var d, e, f, g, h, i = b.values || [],
								j = {},
								k = i[0],
								n = b.autoRotate || c.vars.orientToBezier;
							this._autoRotate = n ? n instanceof Array ? n : [
								["x", "y", "rotation", n === !0 ? 0 : Number(n) || 0]
							] : null;
							for (d in k) this._props.push(d);
							for (f = this._props.length; --f > -1;) d = this._props[f], this._overwriteProps
								.push(d), e = this._func[d] = "function" == typeof a[d], j[d] = e ? a[d
									.indexOf("set") || "function" != typeof a["get" + d.substr(3)] ? d :
									"get" + d.substr(3)]() : parseFloat(a[d]), h || j[d] !== i[0][d] && (h =
									j);
							if (this._beziers = "cubic" !== b.type && "quadratic" !== b.type && "soft" !== b
								.type ? l(i, isNaN(b.curviness) ? 1 : b.curviness, !1, "thruBasic" === b
									.type, b.correlate, h) : m(i, b.type, j), this._segCount = this
								._beziers[d].length, this._timeRes) {
								var p = o(this._beziers, this._timeRes);
								this._length = p.length, this._lengths = p.lengths, this._segments = p
									.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 =
									this._lengths[0], this._curSeg = this._segments[0], this._s2 = this
									._curSeg[0], this._prec = 1 / this._curSeg.length
							}
							if (n = this._autoRotate)
								for (this._initialRotations = [], n[0] instanceof Array || (this
										._autoRotate = n = [n]), f = n.length; --f > -1;) {
									for (g = 0; 3 > g; g++) d = n[f][g], this._func[d] = "function" ==
										typeof a[d] ? a[d.indexOf("set") || "function" != typeof a["get" + d
											.substr(3)] ? d : "get" + d.substr(3)] : !1;
									d = n[f][2], this._initialRotations[f] = (this._func[d] ? this._func[d]
											.call(this._target) : this._target[d]) || 0, this
										._overwriteProps.push(d)
								}
							return this._startRatio = c.vars.runBackwards ? 1 : 0, !0
						},
						set: function(b) {
							var c, d, e, f, g, h, i, j, k, l, m = this._segCount,
								n = this._func,
								o = this._target,
								p = b !== this._startRatio;
							if (this._timeRes) {
								if (k = this._lengths, l = this._curSeg, b *= this._length, e = this._li,
									b > this._l2 && m - 1 > e) {
									for (j = m - 1; j > e && (this._l2 = k[++e]) <= b;);
									this._l1 = k[e - 1], this._li = e, this._curSeg = l = this._segments[e],
										this._s2 = l[this._s1 = this._si = 0]
								} else if (b < this._l1 && e > 0) {
									for (; e > 0 && (this._l1 = k[--e]) >= b;);
									0 === e && b < this._l1 ? this._l1 = 0 : e++, this._l2 = k[e], this
										._li = e, this._curSeg = l = this._segments[e], this._s1 = l[(this
											._si = l.length - 1) - 1] || 0, this._s2 = l[this._si]
								}
								if (c = e, b -= this._l1, e = this._si, b > this._s2 && e < l.length - 1) {
									for (j = l.length - 1; j > e && (this._s2 = l[++e]) <= b;);
									this._s1 = l[e - 1], this._si = e
								} else if (b < this._s1 && e > 0) {
									for (; e > 0 && (this._s1 = l[--e]) >= b;);
									0 === e && b < this._s1 ? this._s1 = 0 : e++, this._s2 = l[e], this
										._si = e
								}
								h = (e + (b - this._s1) / (this._s2 - this._s1)) * this._prec || 0
							} else c = 0 > b ? 0 : b >= 1 ? m - 1 : m * b >> 0, h = (b - c * (1 / m)) * m;
							for (d = 1 - h, e = this._props.length; --e > -1;) f = this._props[e], g = this
								._beziers[f][c], i = (h * h * g.da + 3 * d * (h * g.ca + d * g.ba)) * h + g
								.a, this._mod[f] && (i = this._mod[f](i, o)), n[f] ? o[f](i) : o[f] = i;
							if (this._autoRotate) {
								var q, r, s, t, u, v, w, x = this._autoRotate;
								for (e = x.length; --e > -1;) f = x[e][2], v = x[e][3] || 0, w = x[e][4] ===
									!0 ? 1 : a, g = this._beziers[x[e][0]], q = this._beziers[x[e][1]], g &&
									q && (g = g[c], q = q[c], r = g.a + (g.b - g.a) * h, t = g.b + (g.c - g
											.b) * h, r += (t - r) * h, t += (g.c + (g.d - g.c) * h - t) * h,
										s = q.a + (q.b - q.a) * h, u = q.b + (q.c - q.b) * h, s += (u - s) *
										h, u += (q.c + (q.d - q.c) * h - u) * h, i = p ? Math.atan2(u - s,
											t - r) * w + v : this._initialRotations[e], this._mod[f] && (i =
											this._mod[f](i, o)), n[f] ? o[f](i) : o[f] = i)
							}
						}
					}),
					q = p.prototype;
				p.bezierThrough = l, p.cubicToQuadratic = i, p._autoCSS = !0, p.quadraticToCubic = function(a, b,
				c) {
					return new g(a, (2 * b + a) / 3, (2 * b + c) / 3, c)
				}, p._cssRegister = function() {
					var a = f.CSSPlugin;
					if (a) {
						var b = a._internals,
							c = b._parseToProxy,
							d = b._setPluginRatio,
							e = b.CSSPropTween;
						b._registerComplexSpecialProp("bezier", {
							parser: function(a, b, f, g, h, i) {
								b instanceof Array && (b = {
									values: b
								}), i = new p;
								var j, k, l, m = b.values,
									n = m.length - 1,
									o = [],
									q = {};
								if (0 > n) return h;
								for (j = 0; n >= j; j++) l = c(a, m[j], g, h, i, n !== j), o[j] = l
									.end;
								for (k in b) q[k] = b[k];
								return q.values = o, h = new e(a, "bezier", 0, 0, l.pt, 2), h.data =
									l, h.plugin = i, h.setRatio = d, 0 === q.autoRotate && (q
										.autoRotate = !0), !q.autoRotate || q
									.autoRotate instanceof Array || (j = q.autoRotate === !0 ? 0 :
										Number(q.autoRotate), q.autoRotate = null != l.end.left ? [
											["left", "top", "rotation", j, !1]
										] : null != l.end.x ? [
											["x", "y", "rotation", j, !1]
										] : !1), q.autoRotate && (g._transform || g
										._enableTransforms(!1), l.autoRotate = g._target
										._gsTransform, l.proxy.rotation = l.autoRotate.rotation ||
										0, g._overwriteProps.push("rotation")), i._onInitTween(l
										.proxy, q, g._tween), h
							}
						})
					}
				}, q._mod = function(a) {
					for (var b, c = this._overwriteProps, d = c.length; --d > -1;) b = a[c[d]], b &&
						"function" == typeof b && (this._mod[c[d]] = b)
				}, q._kill = function(a) {
					var b, c, d = this._props;
					for (b in this._beziers)
						if (b in a)
							for (delete this._beziers[b], delete this._func[b], c = d.length; --c > -1;) d[
								c] === b && d.splice(c, 1);
					if (d = this._autoRotate)
						for (c = d.length; --c > -1;) a[d[c][2]] && d.splice(c, 1);
					return this._super._kill.call(this, a)
				}
			}(), _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(a, b) {
				var c, d, e, f, g = function() {
						a.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = g.prototype
							.setRatio
					},
					h = _gsScope._gsDefine.globals,
					i = {},
					j = g.prototype = new a("css");
				j.constructor = g, g.version = "1.20.0", g.API = 2, g.defaultTransformPerspective = 0, g
					.defaultSkewType = "compensated", g.defaultSmoothOrigin = !0, j = "px", g.suffixMap = {
						top: j,
						right: j,
						bottom: j,
						left: j,
						width: j,
						height: j,
						fontSize: j,
						padding: j,
						margin: j,
						perspective: j,
						lineHeight: ""
					};
				var k, l, m, n, o, p, q, r, s = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
					t = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
					u = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
					v = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
					w = /(?:\d|\-|\+|=|#|\.)*/g,
					x = /opacity *= *([^)]*)/i,
					y = /opacity:([^;]*)/i,
					z = /alpha\(opacity *=.+?\)/i,
					A = /^(rgb|hsl)/,
					B = /([A-Z])/g,
					C = /-([a-z])/gi,
					D = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
					E = function(a, b) {
						return b.toUpperCase()
					},
					F = /(?:Left|Right|Width)/i,
					G = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
					H = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
					I = /,(?=[^\)]*(?:\(|$))/gi,
					J = /[\s,\(]/i,
					K = Math.PI / 180,
					L = 180 / Math.PI,
					M = {},
					N = {
						style: {}
					},
					O = _gsScope.document || {
						createElement: function() {
							return N
						}
					},
					P = function(a, b) {
						return O.createElementNS ? O.createElementNS(b || "http://www.w3.org/1999/xhtml", a) : O
							.createElement(a)
					},
					Q = P("div"),
					R = P("img"),
					S = g._internals = {
						_specialProps: i
					},
					T = (_gsScope.navigator || {}).userAgent || "",
					U = function() {
						var a = T.indexOf("Android"),
							b = P("a");
						return m = -1 !== T.indexOf("Safari") && -1 === T.indexOf("Chrome") && (-1 === a ||
							parseFloat(T.substr(a + 8, 2)) > 3), o = m && parseFloat(T.substr(T.indexOf(
							"Version/") + 8, 2)) < 6, n = -1 !== T.indexOf("Firefox"), (
							/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(T) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/
							.exec(T)) && (p = parseFloat(RegExp.$1)), b ? (b.style.cssText =
							"top:1px;opacity:.55;", /^0.55/.test(b.style.opacity)) : !1
					}(),
					V = function(a) {
						return x.test("string" == typeof a ? a : (a.currentStyle ? a.currentStyle.filter : a
							.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
					},
					W = function(a) {
						_gsScope.console && console.log(a)
					},
					X = "",
					Y = "",
					Z = function(a, b) {
						b = b || Q;
						var c, d, e = b.style;
						if (void 0 !== e[a]) return a;
						for (a = a.charAt(0).toUpperCase() + a.substr(1), c = ["O", "Moz", "ms", "Ms",
							"Webkit"], d = 5; --d > -1 && void 0 === e[c[d] + a];);
						return d >= 0 ? (Y = 3 === d ? "ms" : c[d], X = "-" + Y.toLowerCase() + "-", Y + a) :
							null
					},
					$ = O.defaultView ? O.defaultView.getComputedStyle : function() {},
					_ = g.getStyle = function(a, b, c, d, e) {
						var f;
						return U || "opacity" !== b ? (!d && a.style[b] ? f = a.style[b] : (c = c || $(a)) ? f =
							c[b] || c.getPropertyValue(b) || c.getPropertyValue(b.replace(B, "-$1")
								.toLowerCase()) : a.currentStyle && (f = a.currentStyle[b]), null == e ||
							f && "none" !== f && "auto" !== f && "auto auto" !== f ? f : e) : V(a)
					},
					aa = S.convertToPixels = function(a, c, d, e, f) {
						if ("px" === e || !e && "lineHeight" !== c) return d;
						if ("auto" === e || !d) return 0;
						var h, i, j, k = F.test(c),
							l = a,
							m = Q.style,
							n = 0 > d,
							o = 1 === d;
						if (n && (d = -d), o && (d *= 100), "lineHeight" !== c || e)
							if ("%" === e && -1 !== c.indexOf("border")) h = d / 100 * (k ? a.clientWidth : a
								.clientHeight);
							else {
								if (m.cssText = "border:0 solid red;position:" + _(a, "position") +
									";line-height:0;", "%" !== e && l.appendChild && "v" !== e.charAt(0) &&
									"rem" !== e) m[k ? "borderLeftWidth" : "borderTopWidth"] = d + e;
								else {
									if (l = a.parentNode || O.body, -1 !== _(l, "display").indexOf("flex") && (m
											.position = "absolute"), i = l._gsCache, j = b.ticker.frame, i &&
										k && i.time === j) return i.width * d / 100;
									m[k ? "width" : "height"] = d + e
								}
								l.appendChild(Q), h = parseFloat(Q[k ? "offsetWidth" : "offsetHeight"]), l
									.removeChild(Q), k && "%" === e && g.cacheWidths !== !1 && (i = l._gsCache =
										l._gsCache || {}, i.time = j, i.width = h / d * 100), 0 !== h || f || (
										h = aa(a, c, d, e, !0))
							}
						else i = $(a).lineHeight, a.style.lineHeight = d, h = parseFloat($(a).lineHeight), a
							.style.lineHeight = i;
						return o && (h /= 100), n ? -h : h
					},
					ba = S.calculateOffset = function(a, b, c) {
						if ("absolute" !== _(a, "position", c)) return 0;
						var d = "left" === b ? "Left" : "Top",
							e = _(a, "margin" + d, c);
						return a["offset" + d] - (aa(a, b, parseFloat(e), e.replace(w, "")) || 0)
					},
					ca = function(a, b) {
						var c, d, e, f = {};
						if (b = b || $(a, null))
							if (c = b.length)
								for (; --c > -1;) e = b[c], (-1 === e.indexOf("-transform") || Da === e) && (f[e
									.replace(C, E)] = b.getPropertyValue(e));
							else
								for (c in b)(-1 === c.indexOf("Transform") || Ca === c) && (f[c] = b[c]);
						else if (b = a.currentStyle || a.style)
							for (c in b) "string" == typeof c && void 0 === f[c] && (f[c.replace(C, E)] = b[c]);
						return U || (f.opacity = V(a)), d = Ra(a, b, !1), f.rotation = d.rotation, f.skewX = d
							.skewX, f.scaleX = d.scaleX, f.scaleY = d.scaleY, f.x = d.x, f.y = d.y, Fa && (f.z =
								d.z, f.rotationX = d.rotationX, f.rotationY = d.rotationY, f.scaleZ = d.scaleZ),
							f.filters && delete f.filters, f
					},
					da = function(a, b, c, d, e) {
						var f, g, h, i = {},
							j = a.style;
						for (g in c) "cssText" !== g && "length" !== g && isNaN(g) && (b[g] !== (f = c[g]) ||
							e && e[g]) && -1 === g.indexOf("Origin") && ("number" == typeof f || "string" ==
							typeof f) && (i[g] = "auto" !== f || "left" !== g && "top" !== g ? "" !== f &&
							"auto" !== f && "none" !== f || "string" != typeof b[g] || "" === b[g].replace(
								v, "") ? f : 0 : ba(a, g), void 0 !== j[g] && (h = new sa(j, g, j[g], h)));
						if (d)
							for (g in d) "className" !== g && (i[g] = d[g]);
						return {
							difs: i,
							firstMPT: h
						}
					},
					ea = {
						width: ["Left", "Right"],
						height: ["Top", "Bottom"]
					},
					fa = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
					ga = function(a, b, c) {
						if ("svg" === (a.nodeName + "").toLowerCase()) return (c || $(a))[b] || 0;
						if (a.getCTM && Oa(a)) return a.getBBox()[b] || 0;
						var d = parseFloat("width" === b ? a.offsetWidth : a.offsetHeight),
							e = ea[b],
							f = e.length;
						for (c = c || $(a, null); --f > -1;) d -= parseFloat(_(a, "padding" + e[f], c, !0)) ||
							0, d -= parseFloat(_(a, "border" + e[f] + "Width", c, !0)) || 0;
						return d
					},
					ha = function(a, b) {
						if ("contain" === a || "auto" === a || "auto auto" === a) return a + " ";
						(null == a || "" === a) && (a = "0 0");
						var c, d = a.split(" "),
							e = -1 !== a.indexOf("left") ? "0%" : -1 !== a.indexOf("right") ? "100%" : d[0],
							f = -1 !== a.indexOf("top") ? "0%" : -1 !== a.indexOf("bottom") ? "100%" : d[1];
						if (d.length > 3 && !b) {
							for (d = a.split(", ").join(",").split(","), a = [], c = 0; c < d.length; c++) a
								.push(ha(d[c]));
							return a.join(",")
						}
						return null == f ? f = "center" === e ? "50%" : "0" : "center" === f && (f = "50%"), (
							"center" === e || isNaN(parseFloat(e)) && -1 === (e + "").indexOf("=")) && (e =
							"50%"), a = e + " " + f + (d.length > 2 ? " " + d[2] : ""), b && (b.oxp = -1 !==
							e.indexOf("%"), b.oyp = -1 !== f.indexOf("%"), b.oxr = "=" === e.charAt(1), b
							.oyr = "=" === f.charAt(1), b.ox = parseFloat(e.replace(v, "")), b.oy =
							parseFloat(f.replace(v, "")), b.v = a), b || a
					},
					ia = function(a, b) {
						return "function" == typeof a && (a = a(r, q)), "string" == typeof a && "=" === a
							.charAt(1) ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) : parseFloat(
								a) - parseFloat(b) || 0
					},
					ja = function(a, b) {
						return "function" == typeof a && (a = a(r, q)), null == a ? b : "string" == typeof a &&
							"=" === a.charAt(1) ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) +
							b : parseFloat(a) || 0
					},
					ka = function(a, b, c, d) {
						var e, f, g, h, i, j = 1e-6;
						return "function" == typeof a && (a = a(r, q)), null == a ? h = b : "number" ==
							typeof a ? h = a : (e = 360, f = a.split("_"), i = "=" === a.charAt(1), g = (i ?
								parseInt(a.charAt(0) + "1", 10) * parseFloat(f[0].substr(2)) : parseFloat(f[
									0])) * (-1 === a.indexOf("rad") ? 1 : L) - (i ? 0 : b), f.length && (
								d && (d[c] = b + g), -1 !== a.indexOf("short") && (g %= e, g !== g % (e /
									2) && (g = 0 > g ? g + e : g - e)), -1 !== a.indexOf("_cw") && 0 > g ?
								g = (g + 9999999999 * e) % e - (g / e | 0) * e : -1 !== a.indexOf("ccw") &&
								g > 0 && (g = (g - 9999999999 * e) % e - (g / e | 0) * e)), h = b + g), j > h &&
							h > -j && (h = 0), h
					},
					la = {
						aqua: [0, 255, 255],
						lime: [0, 255, 0],
						silver: [192, 192, 192],
						black: [0, 0, 0],
						maroon: [128, 0, 0],
						teal: [0, 128, 128],
						blue: [0, 0, 255],
						navy: [0, 0, 128],
						white: [255, 255, 255],
						fuchsia: [255, 0, 255],
						olive: [128, 128, 0],
						yellow: [255, 255, 0],
						orange: [255, 165, 0],
						gray: [128, 128, 128],
						purple: [128, 0, 128],
						green: [0, 128, 0],
						red: [255, 0, 0],
						pink: [255, 192, 203],
						cyan: [0, 255, 255],
						transparent: [255, 255, 255, 0]
					},
					ma = function(a, b, c) {
						return a = 0 > a ? a + 1 : a > 1 ? a - 1 : a, 255 * (1 > 6 * a ? b + (c - b) * a * 6 :
							.5 > a ? c : 2 > 3 * a ? b + (c - b) * (2 / 3 - a) * 6 : b) + .5 | 0
					},
					na = g.parseColor = function(a, b) {
						var c, d, e, f, g, h, i, j, k, l, m;
						if (a)
							if ("number" == typeof a) c = [a >> 16, a >> 8 & 255, 255 & a];
							else {
								if ("," === a.charAt(a.length - 1) && (a = a.substr(0, a.length - 1)), la[a])
									c = la[a];
								else if ("#" === a.charAt(0)) 4 === a.length && (d = a.charAt(1), e = a.charAt(
									2), f = a.charAt(3), a = "#" + d + d + e + e + f + f), a = parseInt(a
									.substr(1), 16), c = [a >> 16, a >> 8 & 255, 255 & a];
								else if ("hsl" === a.substr(0, 3))
									if (c = m = a.match(s), b) {
										if (-1 !== a.indexOf("=")) return a.match(t)
									} else g = Number(c[0]) % 360 / 360, h = Number(c[1]) / 100, i = Number(c[
											2]) / 100, e = .5 >= i ? i * (h + 1) : i + h - i * h, d = 2 * i - e,
										c.length > 3 && (c[3] = Number(a[3])), c[0] = ma(g + 1 / 3, d, e), c[
										1] = ma(g, d, e), c[2] = ma(g - 1 / 3, d, e);
								else c = a.match(s) || la.transparent;
								c[0] = Number(c[0]), c[1] = Number(c[1]), c[2] = Number(c[2]), c.length > 3 && (
									c[3] = Number(c[3]))
							}
						else c = la.black;
						return b && !m && (d = c[0] / 255, e = c[1] / 255, f = c[2] / 255, j = Math.max(d, e,
							f), k = Math.min(d, e, f), i = (j + k) / 2, j === k ? g = h = 0 : (l = j - k,
								h = i > .5 ? l / (2 - j - k) : l / (j + k), g = j === d ? (e - f) / l + (f >
									e ? 6 : 0) : j === e ? (f - d) / l + 2 : (d - e) / l + 4, g *= 60), c[
							0] = g + .5 | 0, c[1] = 100 * h + .5 | 0, c[2] = 100 * i + .5 | 0), c
					},
					oa = function(a, b) {
						var c, d, e, f = a.match(pa) || [],
							g = 0,
							h = "";
						if (!f.length) return a;
						for (c = 0; c < f.length; c++) d = f[c], e = a.substr(g, a.indexOf(d, g) - g), g += e
							.length + d.length, d = na(d, b), 3 === d.length && d.push(1), h += e + (b ?
								"hsla(" + d[0] + "," + d[1] + "%," + d[2] + "%," + d[3] : "rgba(" + d.join(",")
								) + ")";
						return h + a.substr(g)
					},
					pa = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
				for (j in la) pa += "|" + j + "\\b";
				pa = new RegExp(pa + ")", "gi"), g.colorStringFilter = function(a) {
					var b, c = a[0] + " " + a[1];
					pa.test(c) && (b = -1 !== c.indexOf("hsl(") || -1 !== c.indexOf("hsla("), a[0] = oa(a[
						0], b), a[1] = oa(a[1], b)), pa.lastIndex = 0
				}, b.defaultStringFilter || (b.defaultStringFilter = g.colorStringFilter);
				var qa = function(a, b, c, d) {
						if (null == a) return function(a) {
							return a
						};
						var e, f = b ? (a.match(pa) || [""])[0] : "",
							g = a.split(f).join("").match(u) || [],
							h = a.substr(0, a.indexOf(g[0])),
							i = ")" === a.charAt(a.length - 1) ? ")" : "",
							j = -1 !== a.indexOf(" ") ? " " : ",",
							k = g.length,
							l = k > 0 ? g[0].replace(s, "") : "";
						return k ? e = b ? function(a) {
							var b, m, n, o;
							if ("number" == typeof a) a += l;
							else if (d && I.test(a)) {
								for (o = a.replace(I, "|").split("|"), n = 0; n < o.length; n++) o[n] = e(o[
									n]);
								return o.join(",")
							}
							if (b = (a.match(pa) || [f])[0], m = a.split(b).join("").match(u) || [], n = m
								.length, k > n--)
								for (; ++n < k;) m[n] = c ? m[(n - 1) / 2 | 0] : g[n];
							return h + m.join(j) + j + b + i + (-1 !== a.indexOf("inset") ? " inset" : "")
						} : function(a) {
							var b, f, m;
							if ("number" == typeof a) a += l;
							else if (d && I.test(a)) {
								for (f = a.replace(I, "|").split("|"), m = 0; m < f.length; m++) f[m] = e(f[
									m]);
								return f.join(",")
							}
							if (b = a.match(u) || [], m = b.length, k > m--)
								for (; ++m < k;) b[m] = c ? b[(m - 1) / 2 | 0] : g[m];
							return h + b.join(j) + i
						} : function(a) {
							return a
						}
					},
					ra = function(a) {
						return a = a.split(","),
							function(b, c, d, e, f, g, h) {
								var i, j = (c + "").split(" ");
								for (h = {}, i = 0; 4 > i; i++) h[a[i]] = j[i] = j[i] || j[(i - 1) / 2 >> 0];
								return e.parse(b, h, f, g)
							}
					},
					sa = (S._setPluginRatio = function(a) {
						this.plugin.setRatio(a);
						for (var b, c, d, e, f, g = this.data, h = g.proxy, i = g.firstMPT, j = 1e-6; i;)
							b = h[i.v], i.r ? b = Math.round(b) : j > b && b > -j && (b = 0), i.t[i.p] = b,
							i = i._next;
						if (g.autoRotate && (g.autoRotate.rotation = g.mod ? g.mod(h.rotation, this.t) : h
								.rotation), 1 === a || 0 === a)
							for (i = g.firstMPT, f = 1 === a ? "e" : "b"; i;) {
								if (c = i.t, c.type) {
									if (1 === c.type) {
										for (e = c.xs0 + c.s + c.xs1, d = 1; d < c.l; d++) e += c["xn" +
											d] + c["xs" + (d + 1)];
										c[f] = e
									}
								} else c[f] = c.s + c.xs0;
								i = i._next
							}
					}, function(a, b, c, d, e) {
						this.t = a, this.p = b, this.v = c, this.r = e, d && (d._prev = this, this._next =
							d)
					}),
					ta = (S._parseToProxy = function(a, b, c, d, e, f) {
						var g, h, i, j, k, l = d,
							m = {},
							n = {},
							o = c._transform,
							p = M;
						for (c._transform = null, M = b, d = k = c.parse(a, b, d, e), M = p, f && (c
								._transform = o, l && (l._prev = null, l._prev && (l._prev._next = null))
								); d && d !== l;) {
							if (d.type <= 1 && (h = d.p, n[h] = d.s + d.c, m[h] = d.s, f || (j = new sa(d,
									"s", h, j, d.r), d.c = 0), 1 === d.type))
								for (g = d.l; --g > 0;) i = "xn" + g, h = d.p + "_" + i, n[h] = d.data[i],
									m[h] = d[i], f || (j = new sa(d, i, h, j, d.rxp[i]));
							d = d._next
						}
						return {
							proxy: m,
							end: n,
							firstMPT: j,
							pt: k
						}
					}, S.CSSPropTween = function(a, b, d, e, g, h, i, j, k, l, m) {
						this.t = a, this.p = b, this.s = d, this.c = e, this.n = i || b, a instanceof ta ||
							f.push(this.n), this.r = j, this.type = h || 0, k && (this.pr = k, c = !0), this
							.b = void 0 === l ? d : l, this.e = void 0 === m ? d + e : m, g && (this._next =
								g, g._prev = this)
					}),
					ua = function(a, b, c, d, e, f) {
						var g = new ta(a, b, c, d - c, e, -1, f);
						return g.b = c, g.e = g.xs0 = d, g
					},
					va = g.parseComplex = function(a, b, c, d, e, f, h, i, j, l) {
						c = c || f || "", "function" == typeof d && (d = d(r, q)), h = new ta(a, b, 0, 0, h, l ?
							2 : 1, null, !1, i, c, d), d += "", e && pa.test(d + c) && (d = [c, d], g
							.colorStringFilter(d), c = d[0], d = d[1]);
						var m, n, o, p, u, v, w, x, y, z, A, B, C, D = c.split(", ").join(",").split(" "),
							E = d.split(", ").join(",").split(" "),
							F = D.length,
							G = k !== !1;
						for ((-1 !== d.indexOf(",") || -1 !== c.indexOf(",")) && (D = D.join(" ").replace(I,
								", ").split(" "), E = E.join(" ").replace(I, ", ").split(" "), F = D.length),
							F !== E.length && (D = (f || "").split(" "), F = D.length), h.plugin = j, h
							.setRatio = l, pa.lastIndex = 0, m = 0; F > m; m++)
							if (p = D[m], u = E[m], x = parseFloat(p), x || 0 === x) h.appendXtra("", x, ia(u,
								x), u.replace(t, ""), G && -1 !== u.indexOf("px"), !0);
							else if (e && pa.test(p)) B = u.indexOf(")") + 1, B = ")" + (B ? u.substr(B) : ""),
							C = -1 !== u.indexOf("hsl") && U, z = u, p = na(p, C), u = na(u, C), y = p.length +
							u.length > 6, y && !U && 0 === u[3] ? (h["xs" + h.l] += h.l ? " transparent" :
								"transparent", h.e = h.e.split(E[m]).join("transparent")) : (U || (y = !1), C ?
								h.appendXtra(z.substr(0, z.indexOf("hsl")) + (y ? "hsla(" : "hsl("), p[0], ia(u[
									0], p[0]), ",", !1, !0).appendXtra("", p[1], ia(u[1], p[1]), "%,", !1)
								.appendXtra("", p[2], ia(u[2], p[2]), y ? "%," : "%" + B, !1) : h.appendXtra(z
									.substr(0, z.indexOf("rgb")) + (y ? "rgba(" : "rgb("), p[0], u[0] - p[0],
									",", !0, !0).appendXtra("", p[1], u[1] - p[1], ",", !0).appendXtra("", p[2],
									u[2] - p[2], y ? "," : B, !0), y && (p = p.length < 4 ? 1 : p[3], h
									.appendXtra("", p, (u.length < 4 ? 1 : u[3]) - p, B, !1))), pa.lastIndex =
							0;
						else if (v = p.match(s)) {
							if (w = u.match(t), !w || w.length !== v.length) return h;
							for (o = 0, n = 0; n < v.length; n++) A = v[n], z = p.indexOf(A, o), h.appendXtra(p
								.substr(o, z - o), Number(A), ia(w[n], A), "", G && "px" === p.substr(z + A
									.length, 2), 0 === n), o = z + A.length;
							h["xs" + h.l] += p.substr(o)
						} else h["xs" + h.l] += h.l || h["xs" + h.l] ? " " + u : u;
						if (-1 !== d.indexOf("=") && h.data) {
							for (B = h.xs0 + h.data.s, m = 1; m < h.l; m++) B += h["xs" + m] + h.data["xn" + m];
							h.e = B + h["xs" + m]
						}
						return h.l || (h.type = -1, h.xs0 = h.e), h.xfirst || h
					},
					wa = 9;
				for (j = ta.prototype, j.l = j.pr = 0; --wa > 0;) j["xn" + wa] = 0, j["xs" + wa] = "";
				j.xs0 = "", j._next = j._prev = j.xfirst = j.data = j.plugin = j.setRatio = j.rxp = null, j
					.appendXtra = function(a, b, c, d, e, f) {
						var g = this,
							h = g.l;
						return g["xs" + h] += f && (h || g["xs" + h]) ? " " + a : a || "", c || 0 === h || g
							.plugin ? (g.l++, g.type = g.setRatio ? 2 : 1, g["xs" + g.l] = d || "", h > 0 ? (g
								.data["xn" + h] = b + c, g.rxp["xn" + h] = e, g["xn" + h] = b, g.plugin || (
									g.xfirst = new ta(g, "xn" + h, b, c, g.xfirst || g, 0, g.n, e, g.pr), g
									.xfirst.xs0 = 0), g) : (g.data = {
								s: b + c
							}, g.rxp = {}, g.s = b, g.c = c, g.r = e, g)) : (g["xs" + h] += b + (d || ""), g)
					};
				var xa = function(a, b) {
						b = b || {}, this.p = b.prefix ? Z(a) || a : a, i[a] = i[this.p] = this, this.format = b
							.formatter || qa(b.defaultValue, b.color, b.collapsible, b.multi), b.parser && (this
								.parse = b.parser), this.clrs = b.color, this.multi = b.multi, this.keyword = b
							.keyword, this.dflt = b.defaultValue, this.pr = b.priority || 0
					},
					ya = S._registerComplexSpecialProp = function(a, b, c) {
						"object" != typeof b && (b = {
							parser: c
						});
						var d, e, f = a.split(","),
							g = b.defaultValue;
						for (c = c || [g], d = 0; d < f.length; d++) b.prefix = 0 === d && b.prefix, b
							.defaultValue = c[d] || g, e = new xa(f[d], b)
					},
					za = S._registerPluginProp = function(a) {
						if (!i[a]) {
							var b = a.charAt(0).toUpperCase() + a.substr(1) + "Plugin";
							ya(a, {
								parser: function(a, c, d, e, f, g, j) {
									var k = h.com.greensock.plugins[b];
									return k ? (k._cssRegister(), i[d].parse(a, c, d, e, f, g, j)) :
										(W("Error: " + b + " js file not loaded."), f)
								}
							})
						}
					};
				j = xa.prototype, j.parseComplex = function(a, b, c, d, e, f) {
					var g, h, i, j, k, l, m = this.keyword;
					if (this.multi && (I.test(c) || I.test(b) ? (h = b.replace(I, "|").split("|"), i = c
							.replace(I, "|").split("|")) : m && (h = [b], i = [c])), i) {
						for (j = i.length > h.length ? i.length : h.length, g = 0; j > g; g++) b = h[g] = h[
							g] || this.dflt, c = i[g] = i[g] || this.dflt, m && (k = b.indexOf(m), l = c
							.indexOf(m), k !== l && (-1 === l ? h[g] = h[g].split(m).join("") : -1 ===
								k && (h[g] += " " + m)));
						b = h.join(", "), c = i.join(", ")
					}
					return va(a, this.p, b, c, this.clrs, this.dflt, d, this.pr, e, f)
				}, j.parse = function(a, b, c, d, f, g, h) {
					return this.parseComplex(a.style, this.format(_(a, this.p, e, !1, this.dflt)), this
						.format(b), f, g)
				}, g.registerSpecialProp = function(a, b, c) {
					ya(a, {
						parser: function(a, d, e, f, g, h, i) {
							var j = new ta(a, e, 0, 0, g, 2, e, !1, c);
							return j.plugin = h, j.setRatio = b(a, d, f._tween, e), j
						},
						priority: c
					})
				}, g.useSVGTransformAttr = !0;
				var Aa, Ba =
					"scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent"
					.split(","),
					Ca = Z("transform"),
					Da = X + "transform",
					Ea = Z("transformOrigin"),
					Fa = null !== Z("perspective"),
					Ga = S.Transform = function() {
						this.perspective = parseFloat(g.defaultTransformPerspective) || 0, this.force3D = g
							.defaultForce3D !== !1 && Fa ? g.defaultForce3D || "auto" : !1
					},
					Ha = _gsScope.SVGElement,
					Ia = function(a, b, c) {
						var d, e = O.createElementNS("http://www.w3.org/2000/svg", a),
							f = /([a-z])([A-Z])/g;
						for (d in c) e.setAttributeNS(null, d.replace(f, "$1-$2").toLowerCase(), c[d]);
						return b.appendChild(e), e
					},
					Ja = O.documentElement || {},
					Ka = function() {
						var a, b, c, d = p || /Android/i.test(T) && !_gsScope.chrome;
						return O.createElementNS && !d && (a = Ia("svg", Ja), b = Ia("rect", a, {
								width: 100,
								height: 50,
								x: 100
							}), c = b.getBoundingClientRect().width, b.style[Ea] = "50% 50%", b.style[Ca] =
							"scaleX(0.5)", d = c === b.getBoundingClientRect().width && !(n && Fa), Ja
							.removeChild(a)), d
					}(),
					La = function(a, b, c, d, e, f) {
						var h, i, j, k, l, m, n, o, p, q, r, s, t, u, v = a._gsTransform,
							w = Qa(a, !0);
						v && (t = v.xOrigin, u = v.yOrigin), (!d || (h = d.split(" ")).length < 2) && (n = a
								.getBBox(), 0 === n.x && 0 === n.y && n.width + n.height === 0 && (n = {
									x: parseFloat(a.hasAttribute("x") ? a.getAttribute("x") : a
										.hasAttribute("cx") ? a.getAttribute("cx") : 0) || 0,
									y: parseFloat(a.hasAttribute("y") ? a.getAttribute("y") : a
										.hasAttribute("cy") ? a.getAttribute("cy") : 0) || 0,
									width: 0,
									height: 0
								}), b = ha(b).split(" "), h = [(-1 !== b[0].indexOf("%") ? parseFloat(b[0]) /
									100 * n.width : parseFloat(b[0])) + n.x, (-1 !== b[1].indexOf("%") ?
									parseFloat(b[1]) / 100 * n.height : parseFloat(b[1])) + n.y]), c.xOrigin =
							k = parseFloat(h[0]), c.yOrigin = l = parseFloat(h[1]), d && w !== Pa && (m = w[0],
								n = w[1], o = w[2], p = w[3], q = w[4], r = w[5], s = m * p - n * o, s && (i =
									k * (p / s) + l * (-o / s) + (o * r - p * q) / s, j = k * (-n / s) + l * (
										m / s) - (m * r - n * q) / s, k = c.xOrigin = h[0] = i, l = c.yOrigin =
									h[1] = j)), v && (f && (c.xOffset = v.xOffset, c.yOffset = v.yOffset, v =
								c), e || e !== !1 && g.defaultSmoothOrigin !== !1 ? (i = k - t, j = l - u, v
									.xOffset += i * w[0] + j * w[2] - i, v.yOffset += i * w[1] + j * w[3] - j) :
								v.xOffset = v.yOffset = 0), f || a.setAttribute("data-svg-origin", h.join(" "))
					},
					Ma = function(a) {
						var b, c = P("svg", this.ownerSVGElement.getAttribute("xmlns") ||
								"http://www.w3.org/2000/svg"),
							d = this.parentNode,
							e = this.nextSibling,
							f = this.style.cssText;
						if (Ja.appendChild(c), c.appendChild(this), this.style.display = "block", a) try {
							b = this.getBBox(), this._originalGetBBox = this.getBBox, this.getBBox = Ma
						} catch (g) {} else this._originalGetBBox && (b = this._originalGetBBox());
						return e ? d.insertBefore(this, e) : d.appendChild(this), Ja.removeChild(c), this.style
							.cssText = f, b
					},
					Na = function(a) {
						try {
							return a.getBBox()
						} catch (b) {
							return Ma.call(a, !0)
						}
					},
					Oa = function(a) {
						return !(!(Ha && a.getCTM && Na(a)) || a.parentNode && !a.ownerSVGElement)
					},
					Pa = [1, 0, 0, 1, 0, 0],
					Qa = function(a, b) {
						var c, d, e, f, g, h, i = a._gsTransform || new Ga,
							j = 1e5,
							k = a.style;
						if (Ca ? d = _(a, Da, null, !0) : a.currentStyle && (d = a.currentStyle.filter.match(G),
								d = d && 4 === d.length ? [d[0].substr(4), Number(d[2].substr(4)), Number(d[1]
									.substr(4)), d[3].substr(4), i.x || 0, i.y || 0].join(",") : ""), c = !d ||
							"none" === d || "matrix(1, 0, 0, 1, 0, 0)" === d, !Ca || !(h = "none" === $(a)
								.display) && a.parentNode || (h && (f = k.display, k.display = "block"), a
								.parentNode || (g = 1, Ja.appendChild(a)), d = _(a, Da, null, !0), c = !d ||
								"none" === d || "matrix(1, 0, 0, 1, 0, 0)" === d, f ? k.display = f : h && Va(k,
									"display"), g && Ja.removeChild(a)), (i.svg || a.getCTM && Oa(a)) && (c && -
								1 !== (k[Ca] + "").indexOf("matrix") && (d = k[Ca], c = 0), e = a.getAttribute(
									"transform"), c && e && (-1 !== e.indexOf("matrix") ? (d = e, c = 0) : -
									1 !== e.indexOf("translate") && (d = "matrix(1,0,0,1," + e.match(
										/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")", c = 0))), c) return Pa;
						for (e = (d || "").match(s) || [], wa = e.length; --wa > -1;) f = Number(e[wa]), e[wa] =
							(g = f - (f |= 0)) ? (g * j + (0 > g ? -.5 : .5) | 0) / j + f : f;
						return b && e.length > 6 ? [e[0], e[1], e[4], e[5], e[12], e[13]] : e
					},
					Ra = S.getTransform = function(a, c, d, e) {
						if (a._gsTransform && d && !e) return a._gsTransform;
						var f, h, i, j, k, l, m = d ? a._gsTransform || new Ga : new Ga,
							n = m.scaleX < 0,
							o = 2e-5,
							p = 1e5,
							q = Fa ? parseFloat(_(a, Ea, c, !1, "0 0 0").split(" ")[2]) || m.zOrigin || 0 : 0,
							r = parseFloat(g.defaultTransformPerspective) || 0;
						if (m.svg = !(!a.getCTM || !Oa(a)), m.svg && (La(a, _(a, Ea, c, !1, "50% 50%") + "", m,
								a.getAttribute("data-svg-origin")), Aa = g.useSVGTransformAttr || Ka), f = Qa(
							a), f !== Pa) {
							if (16 === f.length) {
								var s, t, u, v, w, x = f[0],
									y = f[1],
									z = f[2],
									A = f[3],
									B = f[4],
									C = f[5],
									D = f[6],
									E = f[7],
									F = f[8],
									G = f[9],
									H = f[10],
									I = f[12],
									J = f[13],
									K = f[14],
									M = f[11],
									N = Math.atan2(D, H);
								m.zOrigin && (K = -m.zOrigin, I = F * K - f[12], J = G * K - f[13], K = H * K +
										m.zOrigin - f[14]), m.rotationX = N * L, N && (v = Math.cos(-N), w =
										Math.sin(-N), s = B * v + F * w, t = C * v + G * w, u = D * v + H * w,
										F = B * -w + F * v, G = C * -w + G * v, H = D * -w + H * v, M = E * -w +
										M * v, B = s, C = t, D = u), N = Math.atan2(-z, H), m.rotationY = N * L,
									N && (v = Math.cos(-N), w = Math.sin(-N), s = x * v - F * w, t = y * v - G *
										w, u = z * v - H * w, G = y * w + G * v, H = z * w + H * v, M = A * w +
										M * v, x = s, y = t, z = u), N = Math.atan2(y, x), m.rotation = N * L,
									N && (v = Math.cos(N), w = Math.sin(N), s = x * v + y * w, t = B * v + C *
										w, u = F * v + G * w, y = y * v - x * w, C = C * v - B * w, G = G * v -
										F * w, x = s, B = t, F = u), m.rotationX && Math.abs(m.rotationX) + Math
									.abs(m.rotation) > 359.9 && (m.rotationX = m.rotation = 0, m.rotationY =
										180 - m.rotationY), N = Math.atan2(B, C), m.scaleX = (Math.sqrt(x * x +
										y * y + z * z) * p + .5 | 0) / p, m.scaleY = (Math.sqrt(C * C + D * D) *
										p + .5 | 0) / p, m.scaleZ = (Math.sqrt(F * F + G * G + H * H) * p + .5 |
										0) / p, x /= m.scaleX, B /= m.scaleY, y /= m.scaleX, C /= m.scaleY, Math
									.abs(N) > o ? (m.skewX = N * L, B = 0, "simple" !== m.skewType && (m
										.scaleY *= 1 / Math.cos(N))) : m.skewX = 0, m.perspective = M ? 1 / (0 >
										M ? -M : M) : 0, m.x = I, m.y = J, m.z = K, m.svg && (m.x -= m.xOrigin -
										(m.xOrigin * x - m.yOrigin * B), m.y -= m.yOrigin - (m.yOrigin * y - m
											.xOrigin * C))
							} else if (!Fa || e || !f.length || m.x !== f[4] || m.y !== f[5] || !m.rotationX &&
								!m.rotationY) {
								var O = f.length >= 6,
									P = O ? f[0] : 1,
									Q = f[1] || 0,
									R = f[2] || 0,
									S = O ? f[3] : 1;
								m.x = f[4] || 0, m.y = f[5] || 0, i = Math.sqrt(P * P + Q * Q), j = Math.sqrt(
										S * S + R * R), k = P || Q ? Math.atan2(Q, P) * L : m.rotation || 0, l =
									R || S ? Math.atan2(R, S) * L + k : m.skewX || 0, m.scaleX = i, m.scaleY =
									j, m.rotation = k, m.skewX = l, Fa && (m.rotationX = m.rotationY = m.z = 0,
										m.perspective = r, m.scaleZ = 1), m.svg && (m.x -= m.xOrigin - (m
										.xOrigin * P + m.yOrigin * R), m.y -= m.yOrigin - (m.xOrigin * Q + m
										.yOrigin * S))
							}
							Math.abs(m.skewX) > 90 && Math.abs(m.skewX) < 270 && (n ? (m.scaleX *= -1, m
									.skewX += m.rotation <= 0 ? 180 : -180, m.rotation += m.rotation <= 0 ?
									180 : -180) : (m.scaleY *= -1, m.skewX += m.skewX <= 0 ? 180 : -180)), m
								.zOrigin = q;
							for (h in m) m[h] < o && m[h] > -o && (m[h] = 0)
						}
						return d && (a._gsTransform = m, m.svg && (Aa && a.style[Ca] ? b.delayedCall(.001,
							function() {
								Va(a.style, Ca)
							}) : !Aa && a.getAttribute("transform") && b.delayedCall(.001,
						function() {
							a.removeAttribute("transform")
						}))), m
					},
					Sa = function(a) {
						var b, c, d = this.data,
							e = -d.rotation * K,
							f = e + d.skewX * K,
							g = 1e5,
							h = (Math.cos(e) * d.scaleX * g | 0) / g,
							i = (Math.sin(e) * d.scaleX * g | 0) / g,
							j = (Math.sin(f) * -d.scaleY * g | 0) / g,
							k = (Math.cos(f) * d.scaleY * g | 0) / g,
							l = this.t.style,
							m = this.t.currentStyle;
						if (m) {
							c = i, i = -j, j = -c, b = m.filter, l.filter = "";
							var n, o, q = this.t.offsetWidth,
								r = this.t.offsetHeight,
								s = "absolute" !== m.position,
								t = "progid:DXImageTransform.Microsoft.Matrix(M11=" + h + ", M12=" + i +
								", M21=" + j + ", M22=" + k,
								u = d.x + q * d.xPercent / 100,
								v = d.y + r * d.yPercent / 100;
							if (null != d.ox && (n = (d.oxp ? q * d.ox * .01 : d.ox) - q / 2, o = (d.oyp ? r * d
									.oy * .01 : d.oy) - r / 2, u += n - (n * h + o * i), v += o - (n * j +
									o * k)), s ? (n = q / 2, o = r / 2, t += ", Dx=" + (n - (n * h + o * i) +
									u) + ", Dy=" + (o - (n * j + o * k) + v) + ")") : t +=
								", sizingMethod='auto expand')", -1 !== b.indexOf(
									"DXImageTransform.Microsoft.Matrix(") ? l.filter = b.replace(H, t) : l
								.filter = t + " " + b, (0 === a || 1 === a) && 1 === h && 0 === i && 0 === j &&
								1 === k && (s && -1 === t.indexOf("Dx=0, Dy=0") || x.test(b) && 100 !==
									parseFloat(RegExp.$1) || -1 === b.indexOf(b.indexOf("Alpha")) && l
									.removeAttribute("filter")), !s) {
								var y, z, A, B = 8 > p ? 1 : -1;
								for (n = d.ieOffsetX || 0, o = d.ieOffsetY || 0, d.ieOffsetX = Math.round((q - (
										(0 > h ? -h : h) * q + (0 > i ? -i : i) * r)) / 2 + u), d.ieOffsetY =
									Math.round((r - ((0 > k ? -k : k) * r + (0 > j ? -j : j) * q)) / 2 + v),
									wa = 0; 4 > wa; wa++) z = fa[wa], y = m[z], c = -1 !== y.indexOf("px") ?
									parseFloat(y) : aa(this.t, z, parseFloat(y), y.replace(w, "")) || 0, A =
									c !== d[z] ? 2 > wa ? -d.ieOffsetX : -d.ieOffsetY : 2 > wa ? n - d
									.ieOffsetX : o - d.ieOffsetY, l[z] = (d[z] = Math.round(c - A * (0 === wa ||
										2 === wa ? 1 : B))) + "px"
							}
						}
					},
					Ta = S.set3DTransformRatio = S.setTransformRatio = function(a) {
						var b, c, d, e, f, g, h, i, j, k, l, m, o, p, q, r, s, t, u, v, w, x, y, z = this.data,
							A = this.t.style,
							B = z.rotation,
							C = z.rotationX,
							D = z.rotationY,
							E = z.scaleX,
							F = z.scaleY,
							G = z.scaleZ,
							H = z.x,
							I = z.y,
							J = z.z,
							L = z.svg,
							M = z.perspective,
							N = z.force3D,
							O = z.skewY,
							P = z.skewX;
						if (O && (P += O, B += O), ((1 === a || 0 === a) && "auto" === N && (this.tween
								._totalTime === this.tween._totalDuration || !this.tween._totalTime) || !N) && !
							J && !M && !D && !C && 1 === G || Aa && L || !Fa) return void(B || P || L ? (B *= K,
							x = P * K, y = 1e5, c = Math.cos(B) * E, f = Math.sin(B) * E, d = Math
							.sin(B - x) * -F, g = Math.cos(B - x) * F, x && "simple" === z
							.skewType && (b = Math.tan(x - O * K), b = Math.sqrt(1 + b * b), d *= b,
								g *= b, O && (b = Math.tan(O * K), b = Math.sqrt(1 + b * b), c *= b,
									f *= b)), L && (H += z.xOrigin - (z.xOrigin * c + z.yOrigin *
								d) + z.xOffset, I += z.yOrigin - (z.xOrigin * f + z.yOrigin * g) + z
								.yOffset, Aa && (z.xPercent || z.yPercent) && (q = this.t.getBBox(),
									H += .01 * z.xPercent * q.width, I += .01 * z.yPercent * q
									.height), q = 1e-6, q > H && H > -q && (H = 0), q > I && I > -
								q && (I = 0)), u = (c * y | 0) / y + "," + (f * y | 0) / y + "," + (
								d * y | 0) / y + "," + (g * y | 0) / y + "," + H + "," + I + ")",
							L && Aa ? this.t.setAttribute("transform", "matrix(" + u) : A[Ca] = (z
								.xPercent || z.yPercent ? "translate(" + z.xPercent + "%," + z
								.yPercent + "%) matrix(" : "matrix(") + u) : A[Ca] = (z.xPercent ||
							z.yPercent ? "translate(" + z.xPercent + "%," + z.yPercent +
							"%) matrix(" : "matrix(") + E + ",0,0," + F + "," + H + "," + I + ")");
						if (n && (q = 1e-4, q > E && E > -q && (E = G = 2e-5), q > F && F > -q && (F = G =
								2e-5), !M || z.z || z.rotationX || z.rotationY || (M = 0)), B || P) B *= K, r =
							c = Math.cos(B), s = f = Math.sin(B), P && (B -= P * K, r = Math.cos(B), s = Math
								.sin(B), "simple" === z.skewType && (b = Math.tan((P - O) * K), b = Math.sqrt(
									1 + b * b), r *= b, s *= b, z.skewY && (b = Math.tan(O * K), b = Math
									.sqrt(1 + b * b), c *= b, f *= b))), d = -s, g = r;
						else {
							if (!(D || C || 1 !== G || M || L)) return void(A[Ca] = (z.xPercent || z.yPercent ?
								"translate(" + z.xPercent + "%," + z.yPercent + "%) translate3d(" :
								"translate3d(") + H + "px," + I + "px," + J + "px)" + (1 !== E ||
								1 !== F ? " scale(" + E + "," + F + ")" : ""));
							c = g = 1, d = f = 0
						}
						k = 1, e = h = i = j = l = m = 0, o = M ? -1 / M : 0, p = z.zOrigin, q = 1e-6, v = ",",
							w = "0", B = D * K, B && (r = Math.cos(B), s = Math.sin(B), i = -s, l = o * -s, e =
								c * s, h = f * s, k = r, o *= r, c *= r, f *= r), B = C * K, B && (r = Math.cos(
									B), s = Math.sin(B), b = d * r + e * s, t = g * r + h * s, j = k * s, m =
								o * s, e = d * -s + e * r, h = g * -s + h * r, k *= r, o *= r, d = b, g = t),
							1 !== G && (e *= G, h *= G, k *= G, o *= G), 1 !== F && (d *= F, g *= F, j *= F,
								m *= F), 1 !== E && (c *= E, f *= E, i *= E, l *= E), (p || L) && (p && (H +=
								e * -p, I += h * -p, J += k * -p + p), L && (H += z.xOrigin - (z.xOrigin *
								c + z.yOrigin * d) + z.xOffset, I += z.yOrigin - (z.xOrigin * f + z
								.yOrigin * g) + z.yOffset), q > H && H > -q && (H = w), q > I && I > -q && (
								I = w), q > J && J > -q && (J = 0)), u = z.xPercent || z.yPercent ?
							"translate(" + z.xPercent + "%," + z.yPercent + "%) matrix3d(" : "matrix3d(", u += (
								q > c && c > -q ? w : c) + v + (q > f && f > -q ? w : f) + v + (q > i && i > -
								q ? w : i), u += v + (q > l && l > -q ? w : l) + v + (q > d && d > -q ? w : d) +
							v + (q > g && g > -q ? w : g), C || D || 1 !== G ? (u += v + (q > j && j > -q ? w :
									j) + v + (q > m && m > -q ? w : m) + v + (q > e && e > -q ? w : e), u += v +
								(q > h && h > -q ? w : h) + v + (q > k && k > -q ? w : k) + v + (q > o && o > -
									q ? w : o) + v) : u += ",0,0,0,0,1,0,", u += H + v + I + v + J + v + (M ?
								1 + -J / M : 1) + ")", A[Ca] = u
					};
				j = Ga.prototype, j.x = j.y = j.z = j.skewX = j.skewY = j.rotation = j.rotationX = j.rotationY =
					j.zOrigin = j.xPercent = j.yPercent = j.xOffset = j.yOffset = 0, j.scaleX = j.scaleY = j
					.scaleZ = 1, ya(
						"transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
							parser: function(a, b, c, d, f, h, i) {
								if (d._lastParsedTransform === i) return f;
								d._lastParsedTransform = i;
								var j, k = i.scale && "function" == typeof i.scale ? i.scale : 0;
								"function" == typeof i[c] && (j = i[c], i[c] = b), k && (i.scale = k(r, a));
								var l, m, n, o, p, s, t, u, v, w = a._gsTransform,
									x = a.style,
									y = 1e-6,
									z = Ba.length,
									A = i,
									B = {},
									C = "transformOrigin",
									D = Ra(a, e, !0, A.parseTransform),
									E = A.transform && ("function" == typeof A.transform ? A.transform(r,
										q) : A.transform);
								if (D.skewType = A.skewType || D.skewType || g.defaultSkewType, d
									._transform = D, E && "string" == typeof E && Ca) m = Q.style,
									m[Ca] = E, m.display = "block", m.position = "absolute", O.body
									.appendChild(Q), l = Ra(Q, null, !1), "simple" === D.skewType && (l
										.scaleY *= Math.cos(l.skewX * K)), D.svg && (s = D.xOrigin, t = D
										.yOrigin, l.x -= D.xOffset, l.y -= D.yOffset, (A.transformOrigin ||
											A.svgOrigin) && (E = {}, La(a, ha(A.transformOrigin), E, A
												.svgOrigin, A.smoothOrigin, !0), s = E.xOrigin, t = E
											.yOrigin, l.x -= E.xOffset - D.xOffset, l.y -= E.yOffset - D
											.yOffset), (s || t) && (u = Qa(Q, !0), l.x -= s - (s * u[0] +
											t * u[2]), l.y -= t - (s * u[1] + t * u[3]))), O.body
									.removeChild(Q), l.perspective || (l.perspective = D.perspective),
									null != A.xPercent && (l.xPercent = ja(A.xPercent, D.xPercent)), null !=
									A.yPercent && (l.yPercent = ja(A.yPercent, D.yPercent));
								else if ("object" == typeof A) {
									if (l = {
											scaleX: ja(null != A.scaleX ? A.scaleX : A.scale, D.scaleX),
											scaleY: ja(null != A.scaleY ? A.scaleY : A.scale, D.scaleY),
											scaleZ: ja(A.scaleZ, D.scaleZ),
											x: ja(A.x, D.x),
											y: ja(A.y, D.y),
											z: ja(A.z, D.z),
											xPercent: ja(A.xPercent, D.xPercent),
											yPercent: ja(A.yPercent, D.yPercent),
											perspective: ja(A.transformPerspective, D.perspective)
										}, p = A.directionalRotation, null != p)
										if ("object" == typeof p)
											for (m in p) A[m] = p[m];
										else A.rotation = p;
									"string" == typeof A.x && -1 !== A.x.indexOf("%") && (l.x = 0, l
											.xPercent = ja(A.x, D.xPercent)), "string" == typeof A.y && -
										1 !== A.y.indexOf("%") && (l.y = 0, l.yPercent = ja(A.y, D
											.yPercent)), l.rotation = ka("rotation" in A ? A.rotation :
											"shortRotation" in A ? A.shortRotation + "_short" :
											"rotationZ" in A ? A.rotationZ : D.rotation, D.rotation,
											"rotation", B), Fa && (l.rotationX = ka("rotationX" in A ? A
												.rotationX : "shortRotationX" in A ? A.shortRotationX +
												"_short" : D.rotationX || 0, D.rotationX, "rotationX", B), l
											.rotationY = ka("rotationY" in A ? A.rotationY :
												"shortRotationY" in A ? A.shortRotationY + "_short" : D
												.rotationY || 0, D.rotationY, "rotationY", B)), l.skewX =
										ka(A.skewX, D.skewX), l.skewY = ka(A.skewY, D.skewY)
								}
								for (Fa && null != A.force3D && (D.force3D = A.force3D, o = !0), n = D
									.force3D || D.z || D.rotationX || D.rotationY || l.z || l.rotationX || l
									.rotationY || l.perspective, n || null == A.scale || (l.scaleZ = 1); --
									z > -1;) v = Ba[z], E = l[v] - D[v], (E > y || -y > E || null != A[v] ||
									null != M[v]) && (o = !0, f = new ta(D, v, D[v], E, f), v in B && (f
										.e = B[v]), f.xs0 = 0, f.plugin = h, d._overwriteProps.push(f
									.n));
								return E = A.transformOrigin, D.svg && (E || A.svgOrigin) && (s = D.xOffset,
									t = D.yOffset, La(a, ha(E), l, A.svgOrigin, A.smoothOrigin), f = ua(
										D, "xOrigin", (w ? D : l).xOrigin, l.xOrigin, f, C), f = ua(D,
										"yOrigin", (w ? D : l).yOrigin, l.yOrigin, f, C), (s !== D
										.xOffset || t !== D.yOffset) && (f = ua(D, "xOffset", w ? s : D
										.xOffset, D.xOffset, f, C), f = ua(D, "yOffset", w ? t : D
										.yOffset, D.yOffset, f, C)), E = "0px 0px"), (E || Fa && n && D
									.zOrigin) && (Ca ? (o = !0, v = Ea, E = (E || _(a, v, e, !1,
										"50% 50%")) + "", f = new ta(x, v, 0, 0, f, -1, C), f.b = x[
										v], f.plugin = h, Fa ? (m = D.zOrigin, E = E.split(" "), D
										.zOrigin = (E.length > 2 && (0 === m || "0px" !== E[2]) ?
											parseFloat(E[2]) : m) || 0, f.xs0 = f.e = E[0] + " " + (
											E[1] || "50%") + " 0px", f = new ta(D, "zOrigin", 0, 0,
											f, -1, f.n), f.b = m, f.xs0 = f.e = D.zOrigin) : f.xs0 =
									f.e = E) : ha(E + "", D)), o && (d._transformType = D.svg && Aa || !
									n && 3 !== this._transformType ? 2 : 3), j && (i[c] = j), k && (i
									.scale = k), f
							},
							prefix: !0
						}), ya("boxShadow", {
						defaultValue: "0px 0px 0px 0px #999",
						prefix: !0,
						color: !0,
						multi: !0,
						keyword: "inset"
					}), ya("borderRadius", {
						defaultValue: "0px",
						parser: function(a, b, c, f, g, h) {
							b = this.format(b);
							var i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y = [
									"borderTopLeftRadius", "borderTopRightRadius",
									"borderBottomRightRadius", "borderBottomLeftRadius"
								],
								z = a.style;
							for (q = parseFloat(a.offsetWidth), r = parseFloat(a.offsetHeight), i = b
								.split(" "), j = 0; j < y.length; j++) this.p.indexOf("border") && (y[
									j] = Z(y[j])), m = l = _(a, y[j], e, !1, "0px"), -1 !== m.indexOf(
									" ") && (l = m.split(" "), m = l[0], l = l[1]), n = k = i[j], o =
								parseFloat(m), t = m.substr((o + "").length), u = "=" === n.charAt(1),
								u ? (p = parseInt(n.charAt(0) + "1", 10), n = n.substr(2), p *=
									parseFloat(n), s = n.substr((p + "").length - (0 > p ? 1 : 0)) || ""
									) : (p = parseFloat(n), s = n.substr((p + "").length)), "" === s &&
								(s = d[c] || t), s !== t && (v = aa(a, "borderLeft", o, t), w = aa(a,
									"borderTop", o, t), "%" === s ? (m = v / q * 100 + "%", l = w /
									r * 100 + "%") : "em" === s ? (x = aa(a, "borderLeft", 1, "em"),
									m = v / x + "em", l = w / x + "em") : (m = v + "px", l = w +
									"px"), u && (n = parseFloat(m) + p + s, k = parseFloat(l) + p +
									s)), g = va(z, y[j], m + " " + l, n + " " + k, !1, "0px", g);
							return g
						},
						prefix: !0,
						formatter: qa("0px 0px 0px 0px", !1, !0)
					}), ya(
						"borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", {
							defaultValue: "0px",
							parser: function(a, b, c, d, f, g) {
								return va(a.style, c, this.format(_(a, c, e, !1, "0px 0px")), this.format(
									b), !1, "0px", f)
							},
							prefix: !0,
							formatter: qa("0px 0px", !1, !0)
						}), ya("backgroundPosition", {
						defaultValue: "0 0",
						parser: function(a, b, c, d, f, g) {
							var h, i, j, k, l, m, n = "background-position",
								o = e || $(a, null),
								q = this.format((o ? p ? o.getPropertyValue(n + "-x") + " " + o
									.getPropertyValue(n + "-y") : o.getPropertyValue(n) : a
									.currentStyle.backgroundPositionX + " " + a.currentStyle
									.backgroundPositionY) || "0 0"),
								r = this.format(b);
							if (-1 !== q.indexOf("%") != (-1 !== r.indexOf("%")) && r.split(",")
								.length < 2 && (m = _(a, "backgroundImage").replace(D, ""), m &&
									"none" !== m)) {
								for (h = q.split(" "), i = r.split(" "), R.setAttribute("src", m), j =
									2; --j > -1;) q = h[j], k = -1 !== q.indexOf("%"), k !== (-1 !== i[
									j].indexOf("%")) && (l = 0 === j ? a.offsetWidth - R.width : a
									.offsetHeight - R.height, h[j] = k ? parseFloat(q) / 100 * l +
									"px" : parseFloat(q) / l * 100 + "%");
								q = h.join(" ")
							}
							return this.parseComplex(a.style, q, r, f, g)
						},
						formatter: ha
					}), ya("backgroundSize", {
						defaultValue: "0 0",
						formatter: function(a) {
							return a += "", ha(-1 === a.indexOf(" ") ? a + " " + a : a)
						}
					}), ya("perspective", {
						defaultValue: "0px",
						prefix: !0
					}), ya("perspectiveOrigin", {
						defaultValue: "50% 50%",
						prefix: !0
					}), ya("transformStyle", {
						prefix: !0
					}), ya("backfaceVisibility", {
						prefix: !0
					}), ya("userSelect", {
						prefix: !0
					}), ya("margin", {
						parser: ra("marginTop,marginRight,marginBottom,marginLeft")
					}), ya("padding", {
						parser: ra("paddingTop,paddingRight,paddingBottom,paddingLeft")
					}), ya("clip", {
						defaultValue: "rect(0px,0px,0px,0px)",
						parser: function(a, b, c, d, f, g) {
							var h, i, j;
							return 9 > p ? (i = a.currentStyle, j = 8 > p ? " " : ",", h = "rect(" + i
								.clipTop + j + i.clipRight + j + i.clipBottom + j + i.clipLeft +
								")", b = this.format(b).split(",").join(j)) : (h = this.format(_(a,
								this.p, e, !1, this.dflt)), b = this.format(b)), this.parseComplex(a
								.style, h, b, f, g)
						}
					}), ya("textShadow", {
						defaultValue: "0px 0px 0px #999",
						color: !0,
						multi: !0
					}), ya("autoRound,strictUnits", {
						parser: function(a, b, c, d, e) {
							return e
						}
					}), ya("border", {
						defaultValue: "0px solid #000",
						parser: function(a, b, c, d, f, g) {
							var h = _(a, "borderTopWidth", e, !1, "0px"),
								i = this.format(b).split(" "),
								j = i[0].replace(w, "");
							return "px" !== j && (h = parseFloat(h) / aa(a, "borderTopWidth", 1, j) +
								j), this.parseComplex(a.style, this.format(h + " " + _(a,
									"borderTopStyle", e, !1, "solid") + " " + _(a,
									"borderTopColor", e, !1, "#000")), i.join(" "), f, g)
						},
						color: !0,
						formatter: function(a) {
							var b = a.split(" ");
							return b[0] + " " + (b[1] || "solid") + " " + (a.match(pa) || ["#000"])[0]
						}
					}), ya("borderWidth", {
						parser: ra("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
					}), ya("float,cssFloat,styleFloat", {
						parser: function(a, b, c, d, e, f) {
							var g = a.style,
								h = "cssFloat" in g ? "cssFloat" : "styleFloat";
							return new ta(g, h, 0, 0, e, -1, c, !1, 0, g[h], b)
						}
					});
				var Ua = function(a) {
					var b, c = this.t,
						d = c.filter || _(this.data, "filter") || "",
						e = this.s + this.c * a | 0;
					100 === e && (-1 === d.indexOf("atrix(") && -1 === d.indexOf("radient(") && -1 === d
						.indexOf("oader(") ? (c.removeAttribute("filter"), b = !_(this.data,
						"filter")) : (c.filter = d.replace(z, ""), b = !0)), b || (this.xn1 && (c
							.filter = d = d || "alpha(opacity=" + e + ")"), -1 === d.indexOf("pacity") ?
						0 === e && this.xn1 || (c.filter = d + " alpha(opacity=" + e + ")") : c.filter =
						d.replace(x, "opacity=" + e))
				};
				ya("opacity,alpha,autoAlpha", {
					defaultValue: "1",
					parser: function(a, b, c, d, f, g) {
						var h = parseFloat(_(a, "opacity", e, !1, "1")),
							i = a.style,
							j = "autoAlpha" === c;
						return "string" == typeof b && "=" === b.charAt(1) && (b = ("-" === b
								.charAt(0) ? -1 : 1) * parseFloat(b.substr(2)) + h), j && 1 === h &&
							"hidden" === _(a, "visibility", e) && 0 !== b && (h = 0), U ? f =
							new ta(i, "opacity", h, b - h, f) : (f = new ta(i, "opacity", 100 * h,
									100 * (b - h), f), f.xn1 = j ? 1 : 0, i.zoom = 1, f.type = 2, f
								.b = "alpha(opacity=" + f.s + ")", f.e = "alpha(opacity=" + (f.s + f
									.c) + ")", f.data = a, f.plugin = g, f.setRatio = Ua), j && (f =
								new ta(i, "visibility", 0, 0, f, -1, null, !1, 0, 0 !== h ?
									"inherit" : "hidden", 0 === b ? "hidden" : "inherit"), f.xs0 =
								"inherit", d._overwriteProps.push(f.n), d._overwriteProps.push(c)),
							f
					}
				});
				var Va = function(a, b) {
						b && (a.removeProperty ? (("ms" === b.substr(0, 2) || "webkit" === b.substr(0, 6)) && (
								b = "-" + b), a.removeProperty(b.replace(B, "-$1").toLowerCase())) : a
							.removeAttribute(b))
					},
					Wa = function(a) {
						if (this.t._gsClassPT = this, 1 === a || 0 === a) {
							this.t.setAttribute("class", 0 === a ? this.b : this.e);
							for (var b = this.data, c = this.t.style; b;) b.v ? c[b.p] = b.v : Va(c, b.p), b = b
								._next;
							1 === a && this.t._gsClassPT === this && (this.t._gsClassPT = null)
						} else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
					};
				ya("className", {
					parser: function(a, b, d, f, g, h, i) {
						var j, k, l, m, n, o = a.getAttribute("class") || "",
							p = a.style.cssText;
						if (g = f._classNamePT = new ta(a, d, 0, 0, g, 2), g.setRatio = Wa, g.pr = -
							11, c = !0, g.b = o, k = ca(a, e), l = a._gsClassPT) {
							for (m = {}, n = l.data; n;) m[n.p] = 1, n = n._next;
							l.setRatio(1)
						}
						return a._gsClassPT = g, g.e = "=" !== b.charAt(1) ? b : o.replace(
								new RegExp("(?:\\s|^)" + b.substr(2) + "(?![\\w-])"), "") + ("+" ===
								b.charAt(0) ? " " + b.substr(2) : ""), a.setAttribute("class", g.e),
							j = da(a, k, ca(a), i, m), a.setAttribute("class", o), g.data = j
							.firstMPT, a.style.cssText = p, g = g.xfirst = f.parse(a, j.difs, g, h)
					}
				});
				var Xa = function(a) {
					if ((1 === a || 0 === a) && this.data._totalTime === this.data._totalDuration &&
						"isFromStart" !== this.data.data) {
						var b, c, d, e, f, g = this.t.style,
							h = i.transform.parse;
						if ("all" === this.e) g.cssText = "", e = !0;
						else
							for (b = this.e.split(" ").join("").split(","), d = b.length; --d > -1;) c = b[
								d], i[c] && (i[c].parse === h ? e = !0 : c = "transformOrigin" === c ?
								Ea : i[c].p), Va(g, c);
						e && (Va(g, Ca), f = this.t._gsTransform, f && (f.svg && (this.t.removeAttribute(
								"data-svg-origin"), this.t.removeAttribute("transform")),
							delete this.t._gsTransform))
					}
				};
				for (ya("clearProps", {
						parser: function(a, b, d, e, f) {
							return f = new ta(a, d, 0, 0, f, 2), f.setRatio = Xa, f.e = b, f.pr = -10, f
								.data = e._tween, c = !0, f
						}
					}), j = "bezier,throwProps,physicsProps,physics2D".split(","), wa = j.length; wa--;) za(j[
					wa]);
				j = g.prototype, j._firstPT = j._lastParsedTransform = j._transform = null, j._onInitTween =
					function(a, b, h, j) {
						if (!a.nodeType) return !1;
						this._target = q = a, this._tween = h, this._vars = b, r = j, k = b.autoRound, c = !1,
							d = b.suffixMap || g.suffixMap, e = $(a, ""), f = this._overwriteProps;
						var n, p, s, t, u, v, w, x, z, A = a.style;
						if (l && "" === A.zIndex && (n = _(a, "zIndex", e), ("auto" === n || "" === n) && this
								._addLazySet(A, "zIndex", 0)), "string" == typeof b && (t = A.cssText, n = ca(a,
								e), A.cssText = t + ";" + b, n = da(a, n, ca(a)).difs, !U && y.test(b) && (n
								.opacity = parseFloat(RegExp.$1)), b = n, A.cssText = t), b.className ? this
							._firstPT = p = i.className.parse(a, b.className, "className", this, null, null,
							b) : this._firstPT = p = this.parse(a, b, null), this._transformType) {
							for (z = 3 === this._transformType, Ca ? m && (l = !0, "" === A.zIndex && (w = _(a,
									"zIndex", e), ("auto" === w || "" === w) && this._addLazySet(A,
									"zIndex", 0)), o && this._addLazySet(A, "WebkitBackfaceVisibility", this
									._vars.WebkitBackfaceVisibility || (z ? "visible" : "hidden"))) : A.zoom =
								1, s = p; s && s._next;) s = s._next;
							x = new ta(a, "transform", 0, 0, null, 2), this._linkCSSP(x, null, s), x.setRatio =
								Ca ? Ta : Sa, x.data = this._transform || Ra(a, e, !0), x.tween = h, x.pr = -1,
								f.pop()
						}
						if (c) {
							for (; p;) {
								for (v = p._next, s = t; s && s.pr > p.pr;) s = s._next;
								(p._prev = s ? s._prev : u) ? p._prev._next = p: t = p, (p._next = s) ? s
									._prev = p : u = p, p = v
							}
							this._firstPT = t
						}
						return !0
					}, j.parse = function(a, b, c, f) {
						var g, h, j, l, m, n, o, p, s, t, u = a.style;
						for (g in b) {
							if (n = b[g], "function" == typeof n && (n = n(r, q)), h = i[g]) c = h.parse(a, n,
								g, this, c, f, b);
							else {
								if ("--" === g.substr(0, 2)) {
									this._tween._propLookup[g] = this._addTween.call(this._tween, a.style,
										"setProperty", $(a).getPropertyValue(g) + "", n + "", g, !1, g);
									continue
								}
								m = _(a, g, e) + "", s = "string" == typeof n, "color" === g || "fill" === g ||
									"stroke" === g || -1 !== g.indexOf("Color") || s && A.test(n) ? (s || (n =
											na(n), n = (n.length > 3 ? "rgba(" : "rgb(") + n.join(",") + ")"),
										c = va(u, g, m, n, !0, "transparent", c, 0, f)) : s && J.test(n) ? c =
									va(u, g, m, n, !0, null, c, 0, f) : (j = parseFloat(m), o = j || 0 === j ? m
										.substr((j + "").length) : "", ("" === m || "auto" === m) && (
											"width" === g || "height" === g ? (j = ga(a, g, e), o = "px") :
											"left" === g || "top" === g ? (j = ba(a, g, e), o = "px") : (j =
												"opacity" !== g ? 0 : 1, o = "")), t = s && "=" === n.charAt(1),
										t ? (l = parseInt(n.charAt(0) + "1", 10), n = n.substr(2), l *=
											parseFloat(n), p = n.replace(w, "")) : (l = parseFloat(n), p = s ? n
											.replace(w, "") : ""), "" === p && (p = g in d ? d[g] : o), n = l ||
										0 === l ? (t ? l + j : l) + p : b[g], o !== p && ("" !== p ||
											"lineHeight" === g) && (l || 0 === l) && j && (j = aa(a, g, j, o),
											"%" === p ? (j /= aa(a, g, 100, "%") / 100, b.strictUnits !== !0 &&
												(m = j + "%")) : "em" === p || "rem" === p || "vw" === p ||
											"vh" === p ? j /= aa(a, g, 1, p) : "px" !== p && (l = aa(a, g, l,
												p), p = "px"), t && (l || 0 === l) && (n = l + j + p)), t && (
											l += j), !j && 0 !== j || !l && 0 !== l ? void 0 !== u[g] && (n ||
											n + "" != "NaN" && null != n) ? (c = new ta(u, g, l || j || 0, 0, c,
												-1, g, !1, 0, m, n), c.xs0 = "none" !== n || "display" !== g &&
											-1 === g.indexOf("Style") ? n : m) : W("invalid " + g +
											" tween value: " + b[g]) : (c = new ta(u, g, j, l - j, c, 0, g,
											k !== !1 && ("px" === p || "zIndex" === g), 0, m, n), c.xs0 = p))
							}
							f && c && !c.plugin && (c.plugin = f)
						}
						return c
					}, j.setRatio = function(a) {
						var b, c, d, e = this._firstPT,
							f = 1e-6;
						if (1 !== a || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
							if (a || this._tween._time !== this._tween._duration && 0 !== this._tween._time ||
								this._tween._rawPrevTime === -1e-6)
								for (; e;) {
									if (b = e.c * a + e.s, e.r ? b = Math.round(b) : f > b && b > -f && (b = 0),
										e.type)
										if (1 === e.type)
											if (d = e.l, 2 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2;
											else if (3 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e
										.xn2 + e.xs3;
									else if (4 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e
										.xs3 + e.xn3 + e.xs4;
									else if (5 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e
										.xs3 + e.xn3 + e.xs4 + e.xn4 + e.xs5;
									else {
										for (c = e.xs0 + b + e.xs1, d = 1; d < e.l; d++) c += e["xn" + d] + e[
											"xs" + (d + 1)];
										e.t[e.p] = c
									} else -1 === e.type ? e.t[e.p] = e.xs0 : e.setRatio && e.setRatio(a);
									else e.t[e.p] = b + e.xs0;
									e = e._next
								} else
									for (; e;) 2 !== e.type ? e.t[e.p] = e.b : e.setRatio(a), e = e._next;
							else
								for (; e;) {
									if (2 !== e.type)
										if (e.r && -1 !== e.type)
											if (b = Math.round(e.s + e.c), e.type) {
												if (1 === e.type) {
													for (d = e.l, c = e.xs0 + b + e.xs1, d = 1; d < e.l; d++)
														c += e["xn" + d] + e["xs" + (d + 1)];
													e.t[e.p] = c
												}
											} else e.t[e.p] = b + e.xs0;
									else e.t[e.p] = e.e;
									else e.setRatio(a);
									e = e._next
								}
					}, j._enableTransforms = function(a) {
						this._transform = this._transform || Ra(this._target, e, !0), this._transformType = this
							._transform.svg && Aa || !a && 3 !== this._transformType ? 2 : 3
					};
				var Ya = function(a) {
					this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
				};
				j._addLazySet = function(a, b, c) {
					var d = this._firstPT = new ta(a, b, 0, 0, this._firstPT, 2);
					d.e = c, d.setRatio = Ya, d.data = this
				}, j._linkCSSP = function(a, b, c, d) {
					return a && (b && (b._prev = a), a._next && (a._next._prev = a._prev), a._prev ? a._prev
						._next = a._next : this._firstPT === a && (this._firstPT = a._next, d = !0), c ?
						c._next = a : d || null !== this._firstPT || (this._firstPT = a), a._next = b, a
						._prev = c), a
				}, j._mod = function(a) {
					for (var b = this._firstPT; b;) "function" == typeof a[b.p] && a[b.p] === Math.round &&
						(b.r = 1), b = b._next
				}, j._kill = function(b) {
					var c, d, e, f = b;
					if (b.autoAlpha || b.alpha) {
						f = {};
						for (d in b) f[d] = b[d];
						f.opacity = 1, f.autoAlpha && (f.visibility = 1)
					}
					for (b.className && (c = this._classNamePT) && (e = c.xfirst, e && e._prev ? this
							._linkCSSP(e._prev, c._next, e._prev._prev) : e === this._firstPT && (this
								._firstPT = c._next), c._next && this._linkCSSP(c._next, c._next._next, e
								._prev), this._classNamePT = null), c = this._firstPT; c;) c.plugin && c
						.plugin !== d && c.plugin._kill && (c.plugin._kill(b), d = c.plugin), c = c._next;
					return a.prototype._kill.call(this, f)
				};
				var Za = function(a, b, c) {
					var d, e, f, g;
					if (a.slice)
						for (e = a.length; --e > -1;) Za(a[e], b, c);
					else
						for (d = a.childNodes, e = d.length; --e > -1;) f = d[e], g = f.type, f.style && (b
								.push(ca(f)), c && c.push(f)), 1 !== g && 9 !== g && 11 !== g || !f
							.childNodes.length || Za(f, b, c)
				};
				return g.cascadeTo = function(a, c, d) {
					var e, f, g, h, i = b.to(a, c, d),
						j = [i],
						k = [],
						l = [],
						m = [],
						n = b._internals.reservedProps;
					for (a = i._targets || i.target, Za(a, k, m), i.render(c, !0, !0), Za(a, l), i.render(0,
							!0, !0), i._enabled(!0), e = m.length; --e > -1;)
						if (f = da(m[e], k[e], l[e]), f.firstMPT) {
							f = f.difs;
							for (g in d) n[g] && (f[g] = d[g]);
							h = {};
							for (g in f) h[g] = k[e][g];
							j.push(b.fromTo(m[e], c, h, f))
						} return j
				}, a.activate([g]), g
			}, !0),
			function() {
				var a = _gsScope._gsDefine.plugin({
						propName: "roundProps",
						version: "1.6.0",
						priority: -1,
						API: 2,
						init: function(a, b, c) {
							return this._tween = c, !0
						}
					}),
					b = function(a) {
						for (; a;) a.f || a.blob || (a.m = Math.round), a = a._next
					},
					c = a.prototype;
				c._onInitAllProps = function() {
					for (var a, c, d, e = this._tween, f = e.vars.roundProps.join ? e.vars.roundProps : e.vars
							.roundProps.split(","), g = f.length, h = {}, i = e._propLookup.roundProps; --g > -
						1;) h[f[g]] = Math.round;
					for (g = f.length; --g > -1;)
						for (a = f[g], c = e._firstPT; c;) d = c._next, c.pg ? c.t._mod(h) : c.n === a && (2 ===
							c.f && c.t ? b(c.t._firstPT) : (this._add(c.t, a, c.s, c.c), d && (d._prev = c
								._prev), c._prev ? c._prev._next = d : e._firstPT === c && (e._firstPT =
								d), c._next = c._prev = null, e._propLookup[a] = i)), c = d;
					return !1
				}, c._add = function(a, b, c, d) {
					this._addTween(a, b, c, c + d, b, Math.round), this._overwriteProps.push(b)
				}
			}(),
			function() {
				_gsScope._gsDefine.plugin({
					propName: "attr",
					API: 2,
					version: "0.6.1",
					init: function(a, b, c, d) {
						var e, f;
						if ("function" != typeof a.setAttribute) return !1;
						for (e in b) f = b[e], "function" == typeof f && (f = f(d, a)), this._addTween(
								a, "setAttribute", a.getAttribute(e) + "", f + "", e, !1, e), this
							._overwriteProps.push(e);
						return !0
					}
				})
			}(), _gsScope._gsDefine.plugin({
				propName: "directionalRotation",
				version: "0.3.1",
				API: 2,
				init: function(a, b, c, d) {
					"object" != typeof b && (b = {
						rotation: b
					}), this.finals = {};
					var e, f, g, h, i, j, k = b.useRadians === !0 ? 2 * Math.PI : 360,
						l = 1e-6;
					for (e in b) "useRadians" !== e && (h = b[e], "function" == typeof h && (h = h(d, a)),
						j = (h + "").split("_"), f = j[0], g = parseFloat("function" != typeof a[e] ? a[
							e] : a[e.indexOf("set") || "function" != typeof a["get" + e.substr(3)] ?
							e : "get" + e.substr(3)]()), h = this.finals[e] = "string" == typeof f &&
						"=" === f.charAt(1) ? g + parseInt(f.charAt(0) + "1", 10) * Number(f.substr(
						2)) : Number(f) || 0, i = h - g, j.length && (f = j.join("_"), -1 !== f.indexOf(
								"short") && (i %= k, i !== i % (k / 2) && (i = 0 > i ? i + k : i - k)),
							-1 !== f.indexOf("_cw") && 0 > i ? i = (i + 9999999999 * k) % k - (i / k |
								0) * k : -1 !== f.indexOf("ccw") && i > 0 && (i = (i - 9999999999 * k) %
								k - (i / k | 0) * k)), (i > l || -l > i) && (this._addTween(a, e, g, g +
							i, e), this._overwriteProps.push(e)));
					return !0
				},
				set: function(a) {
					var b;
					if (1 !== a) this._super.setRatio.call(this, a);
					else
						for (b = this._firstPT; b;) b.f ? b.t[b.p](this.finals[b.p]) : b.t[b.p] = this
							.finals[b.p], b = b._next
				}
			})._autoCSS = !0, _gsScope._gsDefine("easing.Back", ["easing.Ease"], function(a) {
				var b, c, d, e = _gsScope.GreenSockGlobals || _gsScope,
					f = e.com.greensock,
					g = 2 * Math.PI,
					h = Math.PI / 2,
					i = f._class,
					j = function(b, c) {
						var d = i("easing." + b, function() {}, !0),
							e = d.prototype = new a;
						return e.constructor = d, e.getRatio = c, d
					},
					k = a.register || function() {},
					l = function(a, b, c, d, e) {
						var f = i("easing." + a, {
							easeOut: new b,
							easeIn: new c,
							easeInOut: new d
						}, !0);
						return k(f, a), f
					},
					m = function(a, b, c) {
						this.t = a, this.v = b, c && (this.next = c, c.prev = this, this.c = c.v - b, this.gap =
							c.t - a)
					},
					n = function(b, c) {
						var d = i("easing." + b, function(a) {
								this._p1 = a || 0 === a ? a : 1.70158, this._p2 = 1.525 * this._p1
							}, !0),
							e = d.prototype = new a;
						return e.constructor = d, e.getRatio = c, e.config = function(a) {
							return new d(a)
						}, d
					},
					o = l("Back", n("BackOut", function(a) {
						return (a -= 1) * a * ((this._p1 + 1) * a + this._p1) + 1
					}), n("BackIn", function(a) {
						return a * a * ((this._p1 + 1) * a - this._p1)
					}), n("BackInOut", function(a) {
						return (a *= 2) < 1 ? .5 * a * a * ((this._p2 + 1) * a - this._p2) : .5 * ((a -=
							2) * a * ((this._p2 + 1) * a + this._p2) + 2)
					})),
					p = i("easing.SlowMo", function(a, b, c) {
						b = b || 0 === b ? b : .7, null == a ? a = .7 : a > 1 && (a = 1), this._p = 1 !==
							a ? b : 0, this._p1 = (1 - a) / 2, this._p2 = a, this._p3 = this._p1 + this._p2,
							this._calcEnd = c === !0
					}, !0),
					q = p.prototype = new a;
				return q.constructor = p, q.getRatio = function(a) {
					var b = a + (.5 - a) * this._p;
					return a < this._p1 ? this._calcEnd ? 1 - (a = 1 - a / this._p1) * a : b - (a = 1 - a /
							this._p1) * a * a * a * b : a > this._p3 ? this._calcEnd ? 1 - (a = (a - this
							._p3) / this._p1) * a : b + (a - b) * (a = (a - this._p3) / this._p1) * a * a *
						a : this._calcEnd ? 1 : b
				}, p.ease = new p(.7, .7), q.config = p.config = function(a, b, c) {
					return new p(a, b, c)
				}, b = i("easing.SteppedEase", function(a, b) {
					a = a || 1, this._p1 = 1 / a, this._p2 = a + (b ? 0 : 1), this._p3 = b ? 1 : 0
				}, !0), q = b.prototype = new a, q.constructor = b, q.getRatio = function(a) {
					return 0 > a ? a = 0 : a >= 1 && (a = .999999999), ((this._p2 * a | 0) + this._p3) *
						this._p1
				}, q.config = b.config = function(a, c) {
					return new b(a, c)
				}, c = i("easing.RoughEase", function(b) {
					b = b || {};
					for (var c, d, e, f, g, h, i = b.taper || "none", j = [], k = 0, l = 0 | (b
								.points || 20), n = l, o = b.randomize !== !1, p = b.clamp === !0, q = b
							.template instanceof a ? b.template : null, r = "number" == typeof b
							.strength ? .4 * b.strength : .4; --n > -1;) c = o ? Math.random() : 1 / l *
						n, d = q ? q.getRatio(c) : c, "none" === i ? e = r : "out" === i ? (f = 1 - c,
							e = f * f * r) : "in" === i ? e = c * c * r : .5 > c ? (f = 2 * c, e = f *
							f * .5 * r) : (f = 2 * (1 - c), e = f * f * .5 * r), o ? d += Math
					.random() * e - .5 * e : n % 2 ? d += .5 * e : d -= .5 * e, p && (d > 1 ? d = 1 :
							0 > d && (d = 0)), j[k++] = {
							x: c,
							y: d
						};
					for (j.sort(function(a, b) {
							return a.x - b.x
						}), h = new m(1, 1, null), n = l; --n > -1;) g = j[n], h = new m(g.x, g.y, h);
					this._prev = new m(0, 0, 0 !== h.t ? h : h.next)
				}, !0), q = c.prototype = new a, q.constructor = c, q.getRatio = function(a) {
					var b = this._prev;
					if (a > b.t) {
						for (; b.next && a >= b.t;) b = b.next;
						b = b.prev
					} else
						for (; b.prev && a <= b.t;) b = b.prev;
					return this._prev = b, b.v + (a - b.t) / b.gap * b.c
				}, q.config = function(a) {
					return new c(a)
				}, c.ease = new c, l("Bounce", j("BounceOut", function(a) {
					return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 /
						2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 :
						7.5625 * (a -= 2.625 / 2.75) * a + .984375
				}), j("BounceIn", function(a) {
					return (a = 1 - a) < 1 / 2.75 ? 1 - 7.5625 * a * a : 2 / 2.75 > a ? 1 - (
						7.5625 * (a -= 1.5 / 2.75) * a + .75) : 2.5 / 2.75 > a ? 1 - (7.5625 * (
						a -= 2.25 / 2.75) * a + .9375) : 1 - (7.5625 * (a -= 2.625 / 2.75) * a +
						.984375)
				}), j("BounceInOut", function(a) {
					var b = .5 > a;
					return a = b ? 1 - 2 * a : 2 * a - 1, a = 1 / 2.75 > a ? 7.5625 * a * a : 2 /
						2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 *
						(a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375,
						b ? .5 * (1 - a) : .5 * a + .5
				})), l("Circ", j("CircOut", function(a) {
					return Math.sqrt(1 - (a -= 1) * a)
				}), j("CircIn", function(a) {
					return -(Math.sqrt(1 - a * a) - 1)
				}), j("CircInOut", function(a) {
					return (a *= 2) < 1 ? -.5 * (Math.sqrt(1 - a * a) - 1) : .5 * (Math.sqrt(1 - (
						a -= 2) * a) + 1)
				})), d = function(b, c, d) {
					var e = i("easing." + b, function(a, b) {
							this._p1 = a >= 1 ? a : 1, this._p2 = (b || d) / (1 > a ? a : 1), this._p3 =
								this._p2 / g * (Math.asin(1 / this._p1) || 0), this._p2 = g / this._p2
						}, !0),
						f = e.prototype = new a;
					return f.constructor = e, f.getRatio = c, f.config = function(a, b) {
						return new e(a, b)
					}, e
				}, l("Elastic", d("ElasticOut", function(a) {
					return this._p1 * Math.pow(2, -10 * a) * Math.sin((a - this._p3) * this._p2) + 1
				}, .3), d("ElasticIn", function(a) {
					return -(this._p1 * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - this._p3) * this
						._p2))
				}, .3), d("ElasticInOut", function(a) {
					return (a *= 2) < 1 ? -.5 * (this._p1 * Math.pow(2, 10 * (a -= 1)) * Math.sin((
							a - this._p3) * this._p2)) : this._p1 * Math.pow(2, -10 * (a -= 1)) *
						Math.sin((a - this._p3) * this._p2) * .5 + 1
				}, .45)), l("Expo", j("ExpoOut", function(a) {
					return 1 - Math.pow(2, -10 * a)
				}), j("ExpoIn", function(a) {
					return Math.pow(2, 10 * (a - 1)) - .001
				}), j("ExpoInOut", function(a) {
					return (a *= 2) < 1 ? .5 * Math.pow(2, 10 * (a - 1)) : .5 * (2 - Math.pow(2, -
						10 * (a - 1)))
				})), l("Sine", j("SineOut", function(a) {
					return Math.sin(a * h)
				}), j("SineIn", function(a) {
					return -Math.cos(a * h) + 1
				}), j("SineInOut", function(a) {
					return -.5 * (Math.cos(Math.PI * a) - 1)
				})), i("easing.EaseLookup", {
					find: function(b) {
						return a.map[b]
					}
				}, !0), k(e.SlowMo, "SlowMo", "ease,"), k(c, "RoughEase", "ease,"), k(b, "SteppedEase",
					"ease,"), o
			}, !0)
	}), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
	function(a, b) {
		"use strict";
		var c = {},
			d = a.document,
			e = a.GreenSockGlobals = a.GreenSockGlobals || a;
		if (!e.TweenLite) {
			var f, g, h, i, j, k = function(a) {
					var b, c = a.split("."),
						d = e;
					for (b = 0; b < c.length; b++) d[c[b]] = d = d[c[b]] || {};
					return d
				},
				l = k("com.greensock"),
				m = 1e-10,
				n = function(a) {
					var b, c = [],
						d = a.length;
					for (b = 0; b !== d; c.push(a[b++]));
					return c
				},
				o = function() {},
				p = function() {
					var a = Object.prototype.toString,
						b = a.call([]);
					return function(c) {
						return null != c && (c instanceof Array || "object" == typeof c && !!c.push && a.call(c) ===
							b)
					}
				}(),
				q = {},
				r = function(d, f, g, h) {
					this.sc = q[d] ? q[d].sc : [], q[d] = this, this.gsClass = null, this.func = g;
					var i = [];
					this.check = function(j) {
						for (var l, m, n, o, p = f.length, s = p; --p > -1;)(l = q[f[p]] || new r(f[p], []))
							.gsClass ? (i[p] = l.gsClass, s--) : j && l.sc.push(this);
						if (0 === s && g) {
							if (m = ("com.greensock." + d).split("."), n = m.pop(), o = k(m.join("."))[n] = this
								.gsClass = g.apply(g, i), h)
								if (e[n] = c[n] = o, "undefined" != typeof module && module.exports)
									if (d === b) {
										module.exports = c[b] = o;
										for (p in c) o[p] = c[p]
									} else c[b] && (c[b][n] = o);
							else "function" == typeof define && define.amd && define((a.GreenSockAMDPath ? a
								.GreenSockAMDPath + "/" : "") + d.split(".").pop(), [], function() {
								return o
							});
							for (p = 0; p < this.sc.length; p++) this.sc[p].check()
						}
					}, this.check(!0)
				},
				s = a._gsDefine = function(a, b, c, d) {
					return new r(a, b, c, d)
				},
				t = l._class = function(a, b, c) {
					return b = b || function() {}, s(a, [], function() {
						return b
					}, c), b
				};
			s.globals = e;
			var u = [0, 0, 1, 1],
				v = t("easing.Ease", function(a, b, c, d) {
					this._func = a, this._type = c || 0, this._power = d || 0, this._params = b ? u.concat(b) : u
				}, !0),
				w = v.map = {},
				x = v.register = function(a, b, c, d) {
					for (var e, f, g, h, i = b.split(","), j = i.length, k = (c || "easeIn,easeOut,easeInOut").split(
							","); --j > -1;)
						for (f = i[j], e = d ? t("easing." + f, null, !0) : l.easing[f] || {}, g = k.length; --g > -1;)
							h = k[g], w[f + "." + h] = w[h + f] = e[h] = a.getRatio ? a : a[h] || new a
				};
			for (h = v.prototype, h._calcEnd = !1, h.getRatio = function(a) {
					if (this._func) return this._params[0] = a, this._func.apply(null, this._params);
					var b = this._type,
						c = this._power,
						d = 1 === b ? 1 - a : 2 === b ? a : .5 > a ? 2 * a : 2 * (1 - a);
					return 1 === c ? d *= d : 2 === c ? d *= d * d : 3 === c ? d *= d * d * d : 4 === c && (d *= d * d *
						d * d), 1 === b ? 1 - d : 2 === b ? d : .5 > a ? d / 2 : 1 - d / 2
				}, f = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], g = f.length; --g > -1;) h = f[g] +
				",Power" + g, x(new v(null, null, 1, g), h, "easeOut", !0), x(new v(null, null, 2, g), h, "easeIn" + (
					0 === g ? ",easeNone" : "")), x(new v(null, null, 3, g), h, "easeInOut");
			w.linear = l.easing.Linear.easeIn, w.swing = l.easing.Quad.easeInOut;
			var y = t("events.EventDispatcher", function(a) {
				this._listeners = {}, this._eventTarget = a || this
			});
			h = y.prototype, h.addEventListener = function(a, b, c, d, e) {
				e = e || 0;
				var f, g, h = this._listeners[a],
					k = 0;
				for (this !== i || j || i.wake(), null == h && (this._listeners[a] = h = []), g = h.length; --g > -
					1;) f = h[g], f.c === b && f.s === c ? h.splice(g, 1) : 0 === k && f.pr < e && (k = g + 1);
				h.splice(k, 0, {
					c: b,
					s: c,
					up: d,
					pr: e
				})
			}, h.removeEventListener = function(a, b) {
				var c, d = this._listeners[a];
				if (d)
					for (c = d.length; --c > -1;)
						if (d[c].c === b) return void d.splice(c, 1)
			}, h.dispatchEvent = function(a) {
				var b, c, d, e = this._listeners[a];
				if (e)
					for (b = e.length, b > 1 && (e = e.slice(0)), c = this._eventTarget; --b > -1;) d = e[b], d && (
						d.up ? d.c.call(d.s || c, {
							type: a,
							target: c
						}) : d.c.call(d.s || c))
			};
			var z = a.requestAnimationFrame,
				A = a.cancelAnimationFrame,
				B = Date.now || function() {
					return (new Date).getTime()
				},
				C = B();
			for (f = ["ms", "moz", "webkit", "o"], g = f.length; --g > -1 && !z;) z = a[f[g] + "RequestAnimationFrame"],
				A = a[f[g] + "CancelAnimationFrame"] || a[f[g] + "CancelRequestAnimationFrame"];
			t("Ticker", function(a, b) {
				var c, e, f, g, h, k = this,
					l = B(),
					n = b !== !1 && z ? "auto" : !1,
					p = 500,
					q = 33,
					r = "tick",
					s = function(a) {
						var b, d, i = B() - C;
						i > p && (l += i - q), C += i, k.time = (C - l) / 1e3, b = k.time - h, (!c || b > 0 ||
								a === !0) && (k.frame++, h += b + (b >= g ? .004 : g - b), d = !0), a !== !0 &&
							(f = e(s)), d && k.dispatchEvent(r)
					};
				y.call(k), k.time = k.frame = 0, k.tick = function() {
					s(!0)
				}, k.lagSmoothing = function(a, b) {
					p = a || 1 / m, q = Math.min(b, p, 0)
				}, k.sleep = function() {
					null != f && (n && A ? A(f) : clearTimeout(f), e = o, f = null, k === i && (j = !1))
				}, k.wake = function(a) {
					null !== f ? k.sleep() : a ? l += -C + (C = B()) : k.frame > 10 && (C = B() - p + 5),
						e = 0 === c ? o : n && z ? z : function(a) {
							return setTimeout(a, 1e3 * (h - k.time) + 1 | 0)
						}, k === i && (j = !0), s(2)
				}, k.fps = function(a) {
					return arguments.length ? (c = a, g = 1 / (c || 60), h = this.time + g, void k.wake()) :
						c
				}, k.useRAF = function(a) {
					return arguments.length ? (k.sleep(), n = a, void k.fps(c)) : n
				}, k.fps(a), setTimeout(function() {
					"auto" === n && k.frame < 5 && "hidden" !== d.visibilityState && k.useRAF(!1)
				}, 1500)
			}), h = l.Ticker.prototype = new l.events.EventDispatcher, h.constructor = l.Ticker;
			var D = t("core.Animation", function(a, b) {
				if (this.vars = b = b || {}, this._duration = this._totalDuration = a || 0, this._delay =
					Number(b.delay) || 0, this._timeScale = 1, this._active = b.immediateRender === !0, this
					.data = b.data, this._reversed = b.reversed === !0, X) {
					j || i.wake();
					var c = this.vars.useFrames ? W : X;
					c.add(this, c._time), this.vars.paused && this.paused(!0)
				}
			});
			i = D.ticker = new l.Ticker, h = D.prototype, h._dirty = h._gc = h._initted = h._paused = !1, h._totalTime =
				h._time = 0, h._rawPrevTime = -1, h._next = h._last = h._onUpdate = h._timeline = h.timeline = null, h
				._paused = !1;
			var E = function() {
				j && B() - C > 2e3 && "hidden" !== d.visibilityState && i.wake();
				var a = setTimeout(E, 2e3);
				a.unref && a.unref()
			};
			E(), h.play = function(a, b) {
				return null != a && this.seek(a, b), this.reversed(!1).paused(!1)
			}, h.pause = function(a, b) {
				return null != a && this.seek(a, b), this.paused(!0)
			}, h.resume = function(a, b) {
				return null != a && this.seek(a, b), this.paused(!1)
			}, h.seek = function(a, b) {
				return this.totalTime(Number(a), b !== !1)
			}, h.restart = function(a, b) {
				return this.reversed(!1).paused(!1).totalTime(a ? -this._delay : 0, b !== !1, !0)
			}, h.reverse = function(a, b) {
				return null != a && this.seek(a || this.totalDuration(), b), this.reversed(!0).paused(!1)
			}, h.render = function(a, b, c) {}, h.invalidate = function() {
				return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, (
					this._gc || !this.timeline) && this._enabled(!0), this
			}, h.isActive = function() {
				var a, b = this._timeline,
					c = this._startTime;
				return !b || !this._gc && !this._paused && b.isActive() && (a = b.rawTime(!0)) >= c && a < c + this
					.totalDuration() / this._timeScale - 1e-7
			}, h._enabled = function(a, b) {
				return j || i.wake(), this._gc = !a, this._active = this.isActive(), b !== !0 && (a && !this
					.timeline ? this._timeline.add(this, this._startTime - this._delay) : !a && this.timeline &&
					this._timeline._remove(this, !0)), !1
			}, h._kill = function(a, b) {
				return this._enabled(!1, !1)
			}, h.kill = function(a, b) {
				return this._kill(a, b), this
			}, h._uncache = function(a) {
				for (var b = a ? this : this.timeline; b;) b._dirty = !0, b = b.timeline;
				return this
			}, h._swapSelfInParams = function(a) {
				for (var b = a.length, c = a.concat(); --b > -1;) "{self}" === a[b] && (c[b] = this);
				return c
			}, h._callback = function(a) {
				var b = this.vars,
					c = b[a],
					d = b[a + "Params"],
					e = b[a + "Scope"] || b.callbackScope || this,
					f = d ? d.length : 0;
				switch (f) {
					case 0:
						c.call(e);
						break;
					case 1:
						c.call(e, d[0]);
						break;
					case 2:
						c.call(e, d[0], d[1]);
						break;
					default:
						c.apply(e, d)
				}
			}, h.eventCallback = function(a, b, c, d) {
				if ("on" === (a || "").substr(0, 2)) {
					var e = this.vars;
					if (1 === arguments.length) return e[a];
					null == b ? delete e[a] : (e[a] = b, e[a + "Params"] = p(c) && -1 !== c.join("").indexOf(
						"{self}") ? this._swapSelfInParams(c) : c, e[a + "Scope"] = d), "onUpdate" === a && (
						this._onUpdate = b)
				}
				return this
			}, h.delay = function(a) {
				return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + a -
					this._delay), this._delay = a, this) : this._delay
			}, h.duration = function(a) {
				return arguments.length ? (this._duration = this._totalDuration = a, this._uncache(!0), this
					._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== a &&
					this.totalTime(this._totalTime * (a / this._duration), !0), this) : (this._dirty = !1, this
					._duration)
			}, h.totalDuration = function(a) {
				return this._dirty = !1, arguments.length ? this.duration(a) : this._totalDuration
			}, h.time = function(a, b) {
				return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(a > this._duration ?
					this._duration : a, b)) : this._time
			}, h.totalTime = function(a, b, c) {
				if (j || i.wake(), !arguments.length) return this._totalTime;
				if (this._timeline) {
					if (0 > a && !c && (a += this.totalDuration()), this._timeline.smoothChildTiming) {
						this._dirty && this.totalDuration();
						var d = this._totalDuration,
							e = this._timeline;
						if (a > d && !c && (a = d), this._startTime = (this._paused ? this._pauseTime : e._time) - (
								this._reversed ? d - a : a) / this._timeScale, e._dirty || this._uncache(!1), e
							._timeline)
							for (; e._timeline;) e._timeline._time !== (e._startTime + e._totalTime) / e
								._timeScale && e.totalTime(e._totalTime, !0), e = e._timeline
					}
					this._gc && this._enabled(!0, !1), (this._totalTime !== a || 0 === this._duration) && (J
						.length && Z(), this.render(a, b, !1), J.length && Z())
				}
				return this
			}, h.progress = h.totalProgress = function(a, b) {
				var c = this.duration();
				return arguments.length ? this.totalTime(c * a, b) : c ? this._time / c : this.ratio
			}, h.startTime = function(a) {
				return arguments.length ? (a !== this._startTime && (this._startTime = a, this.timeline && this
						.timeline._sortChildren && this.timeline.add(this, a - this._delay)), this) : this
					._startTime
			}, h.endTime = function(a) {
				return this._startTime + (0 != a ? this.totalDuration() : this.duration()) / this._timeScale
			}, h.timeScale = function(a) {
				if (!arguments.length) return this._timeScale;
				if (a = a || m, this._timeline && this._timeline.smoothChildTiming) {
					var b = this._pauseTime,
						c = b || 0 === b ? b : this._timeline.totalTime();
					this._startTime = c - (c - this._startTime) * this._timeScale / a
				}
				return this._timeScale = a, this._uncache(!1)
			}, h.reversed = function(a) {
				return arguments.length ? (a != this._reversed && (this._reversed = a, this.totalTime(this
					._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this
					._totalTime : this._totalTime, !0)), this) : this._reversed
			}, h.paused = function(a) {
				if (!arguments.length) return this._paused;
				var b, c, d = this._timeline;
				return a != this._paused && d && (j || a || i.wake(), b = d.rawTime(), c = b - this._pauseTime, !
						a && d.smoothChildTiming && (this._startTime += c, this._uncache(!1)), this._pauseTime = a ?
						b : null, this._paused = a, this._active = this.isActive(), !a && 0 !== c && this
						._initted && this.duration() && (b = d.smoothChildTiming ? this._totalTime : (b - this
							._startTime) / this._timeScale, this.render(b, b === this._totalTime, !0))), this._gc &&
					!a && this._enabled(!0, !1), this
			};
			var F = t("core.SimpleTimeline", function(a) {
				D.call(this, 0, a), this.autoRemoveChildren = this.smoothChildTiming = !0
			});
			h = F.prototype = new D, h.constructor = F, h.kill()._gc = !1, h._first = h._last = h._recent = null, h
				._sortChildren = !1, h.add = h.insert = function(a, b, c, d) {
					var e, f;
					if (a._startTime = Number(b || 0) + a._delay, a._paused && this !== a._timeline && (a._pauseTime = a
							._startTime + (this.rawTime() - a._startTime) / a._timeScale),
						a.timeline && a.timeline._remove(a, !0), a.timeline = a._timeline = this, a._gc && a._enabled(!
							0, !0), e = this._last, this._sortChildren)
						for (f = a._startTime; e && e._startTime > f;) e = e._prev;
					return e ? (a._next = e._next, e._next = a) : (a._next = this._first, this._first = a), a._next ? a
						._next._prev = a : this._last = a, a._prev = e, this._recent = a, this._timeline && this
						._uncache(!0), this
				}, h._remove = function(a, b) {
					return a.timeline === this && (b || a._enabled(!1, !0), a._prev ? a._prev._next = a._next : this
						._first === a && (this._first = a._next), a._next ? a._next._prev = a._prev : this._last ===
						a && (this._last = a._prev), a._next = a._prev = a.timeline = null, a === this._recent && (
							this._recent = this._last), this._timeline && this._uncache(!0)), this
				}, h.render = function(a, b, c) {
					var d, e = this._first;
					for (this._totalTime = this._time = this._rawPrevTime = a; e;) d = e._next, (e._active || a >= e
						._startTime && !e._paused && !e._gc) && (e._reversed ? e.render((e._dirty ? e
					.totalDuration() : e._totalDuration) - (a - e._startTime) * e._timeScale, b, c) : e.render((
						a - e._startTime) * e._timeScale, b, c)), e = d
				}, h.rawTime = function() {
					return j || i.wake(), this._totalTime
				};
			var G = t("TweenLite", function(b, c, d) {
					if (D.call(this, c, d), this.render = G.prototype.render, null == b)
					throw "Cannot tween a null target.";
					this.target = b = "string" != typeof b ? b : G.selector(b) || b;
					var e, f, g, h = b.jquery || b.length && b !== a && b[0] && (b[0] === a || b[0].nodeType && b[0]
							.style && !b.nodeType),
						i = this.vars.overwrite;
					if (this._overwrite = i = null == i ? V[G.defaultOverwrite] : "number" == typeof i ? i >> 0 : V[
							i], (h || b instanceof Array || b.push && p(b)) && "number" != typeof b[0])
						for (this._targets = g = n(b), this._propLookup = [], this._siblings = [], e = 0; e < g
							.length; e++) f = g[e], f ? "string" != typeof f ? f.length && f !== a && f[0] && (f[
							0] === a || f[0].nodeType && f[0].style && !f.nodeType) ? (g.splice(e--, 1), this
							._targets = g = g.concat(n(f))) : (this._siblings[e] = $(f, this, !1), 1 === i &&
							this._siblings[e].length > 1 && aa(f, this, null, 1, this._siblings[e])) : (f = g[
							e--] = G.selector(f), "string" == typeof f && g.splice(e + 1, 1)) : g.splice(e--, 1);
					else this._propLookup = {}, this._siblings = $(b, this, !1), 1 === i && this._siblings.length >
						1 && aa(b, this, null, 1, this._siblings);
					(this.vars.immediateRender || 0 === c && 0 === this._delay && this.vars.immediateRender !== !
					1) && (this._time = -m, this.render(Math.min(0, -this._delay)))
				}, !0),
				H = function(b) {
					return b && b.length && b !== a && b[0] && (b[0] === a || b[0].nodeType && b[0].style && !b
						.nodeType)
				},
				I = function(a, b) {
					var c, d = {};
					for (c in a) U[c] || c in b && "transform" !== c && "x" !== c && "y" !== c && "width" !== c &&
						"height" !== c && "className" !== c && "border" !== c || !(!R[c] || R[c] && R[c]._autoCSS) || (
							d[c] = a[c], delete a[c]);
					a.css = d
				};
			h = G.prototype = new D, h.constructor = G, h.kill()._gc = !1, h.ratio = 0, h._firstPT = h._targets = h
				._overwrittenProps = h._startAt = null, h._notifyPluginsOfEnabled = h._lazy = !1, G.version = "1.20.2",
				G.defaultEase = h._ease = new v(null, null, 1, 1), G.defaultOverwrite = "auto", G.ticker = i, G
				.autoSleep = 120, G.lagSmoothing = function(a, b) {
					i.lagSmoothing(a, b)
				}, G.selector = a.$ || a.jQuery || function(b) {
					var c = a.$ || a.jQuery;
					return c ? (G.selector = c, c(b)) : "undefined" == typeof d ? b : d.querySelectorAll ? d
						.querySelectorAll(b) : d.getElementById("#" === b.charAt(0) ? b.substr(1) : b)
				};
			var J = [],
				K = {},
				L = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
				M = /[\+-]=-?[\.\d]/,
				N = function(a) {
					for (var b, c = this._firstPT, d = 1e-6; c;) b = c.blob ? 1 === a && this.end ? this.end : a ? this
						.join("") : this.start : c.c * a + c.s, c.m ? b = c.m(b, this._target || c.t) : d > b && b > -
						d && !c.blob && (b = 0), c.f ? c.fp ? c.t[c.p](c.fp, b) : c.t[c.p](b) : c.t[c.p] = b, c = c
						._next
				},
				O = function(a, b, c, d) {
					var e, f, g, h, i, j, k, l = [],
						m = 0,
						n = "",
						o = 0;
					for (l.start = a, l.end = b, a = l[0] = a + "", b = l[1] = b + "", c && (c(l), a = l[0], b = l[1]),
						l.length = 0, e = a.match(L) || [], f = b.match(L) || [], d && (d._next = null, d.blob = 1, l
							._firstPT = l._applyPT = d), i = f.length, h = 0; i > h; h++) k = f[h], j = b.substr(m, b
							.indexOf(k, m) - m), n += j || !h ? j : ",", m += j.length, o ? o = (o + 1) % 5 :
						"rgba(" === j.substr(-5) && (o = 1), k === e[h] || e.length <= h ? n += k : (n && (l.push(n),
							n = ""), g = parseFloat(e[h]), l.push(g), l._firstPT = {
							_next: l._firstPT,
							t: l,
							p: l.length - 1,
							s: g,
							c: ("=" === k.charAt(1) ? parseInt(k.charAt(0) + "1", 10) * parseFloat(k.substr(2)) :
								parseFloat(k) - g) || 0,
							f: 0,
							m: o && 4 > o ? Math.round : 0
						}), m += k.length;
					return n += b.substr(m), n && l.push(n), l.setRatio = N, M.test(b) && (l.end = 0), l
				},
				P = function(a, b, c, d, e, f, g, h, i) {
					"function" == typeof d && (d = d(i || 0, a));
					var j, k = typeof a[b],
						l = "function" !== k ? "" : b.indexOf("set") || "function" != typeof a["get" + b.substr(3)] ?
						b : "get" + b.substr(3),
						m = "get" !== c ? c : l ? g ? a[l](g) : a[l]() : a[b],
						n = "string" == typeof d && "=" === d.charAt(1),
						o = {
							t: a,
							p: b,
							s: m,
							f: "function" === k,
							pg: 0,
							n: e || b,
							m: f ? "function" == typeof f ? f : Math.round : 0,
							pr: 0,
							c: n ? parseInt(d.charAt(0) + "1", 10) * parseFloat(d.substr(2)) : parseFloat(d) - m || 0
						};
					return ("number" != typeof m || "number" != typeof d && !n) && (g || isNaN(m) || !n && isNaN(d) ||
						"boolean" == typeof m || "boolean" == typeof d ? (o.fp = g, j = O(m, n ? parseFloat(o.s) + o
							.c : d, h || G.defaultStringFilter, o), o = {
							t: j,
							p: "setRatio",
							s: 0,
							c: 1,
							f: 2,
							pg: 0,
							n: e || b,
							pr: 0,
							m: 0
						}) : (o.s = parseFloat(m), n || (o.c = parseFloat(d) - o.s || 0))), o.c ? ((o._next = this
						._firstPT) && (o._next._prev = o), this._firstPT = o, o) : void 0
				},
				Q = G._internals = {
					isArray: p,
					isSelector: H,
					lazyTweens: J,
					blobDif: O
				},
				R = G._plugins = {},
				S = Q.tweenLookup = {},
				T = 0,
				U = Q.reservedProps = {
					ease: 1,
					delay: 1,
					overwrite: 1,
					onComplete: 1,
					onCompleteParams: 1,
					onCompleteScope: 1,
					useFrames: 1,
					runBackwards: 1,
					startAt: 1,
					onUpdate: 1,
					onUpdateParams: 1,
					onUpdateScope: 1,
					onStart: 1,
					onStartParams: 1,
					onStartScope: 1,
					onReverseComplete: 1,
					onReverseCompleteParams: 1,
					onReverseCompleteScope: 1,
					onRepeat: 1,
					onRepeatParams: 1,
					onRepeatScope: 1,
					easeParams: 1,
					yoyo: 1,
					immediateRender: 1,
					repeat: 1,
					repeatDelay: 1,
					data: 1,
					paused: 1,
					reversed: 1,
					autoCSS: 1,
					lazy: 1,
					onOverwrite: 1,
					callbackScope: 1,
					stringFilter: 1,
					id: 1,
					yoyoEase: 1
				},
				V = {
					none: 0,
					all: 1,
					auto: 2,
					concurrent: 3,
					allOnStart: 4,
					preexisting: 5,
					"true": 1,
					"false": 0
				},
				W = D._rootFramesTimeline = new F,
				X = D._rootTimeline = new F,
				Y = 30,
				Z = Q.lazyRender = function() {
					var a, b = J.length;
					for (K = {}; --b > -1;) a = J[b], a && a._lazy !== !1 && (a.render(a._lazy[0], a._lazy[1], !0), a
						._lazy = !1);
					J.length = 0
				};
			X._startTime = i.time, W._startTime = i.frame, X._active = W._active = !0, setTimeout(Z, 1), D._updateRoot =
				G.render = function() {
					var a, b, c;
					if (J.length && Z(), X.render((i.time - X._startTime) * X._timeScale, !1, !1), W.render((i.frame - W
							._startTime) * W._timeScale, !1, !1), J.length && Z(), i.frame >= Y) {
						Y = i.frame + (parseInt(G.autoSleep, 10) || 120);
						for (c in S) {
							for (b = S[c].tweens, a = b.length; --a > -1;) b[a]._gc && b.splice(a, 1);
							0 === b.length && delete S[c]
						}
						if (c = X._first, (!c || c._paused) && G.autoSleep && !W._first && 1 === i._listeners.tick
							.length) {
							for (; c && c._paused;) c = c._next;
							c || i.sleep()
						}
					}
				}, i.addEventListener("tick", D._updateRoot);
			var $ = function(a, b, c) {
					var d, e, f = a._gsTweenID;
					if (S[f || (a._gsTweenID = f = "t" + T++)] || (S[f] = {
							target: a,
							tweens: []
						}), b && (d = S[f].tweens, d[e = d.length] = b, c))
						for (; --e > -1;) d[e] === b && d.splice(e, 1);
					return S[f].tweens
				},
				_ = function(a, b, c, d) {
					var e, f, g = a.vars.onOverwrite;
					return g && (e = g(a, b, c, d)), g = G.onOverwrite, g && (f = g(a, b, c, d)), e !== !1 && f !== !1
				},
				aa = function(a, b, c, d, e) {
					var f, g, h, i;
					if (1 === d || d >= 4) {
						for (i = e.length, f = 0; i > f; f++)
							if ((h = e[f]) !== b) h._gc || h._kill(null, a, b) && (g = !0);
							else if (5 === d) break;
						return g
					}
					var j, k = b._startTime + m,
						l = [],
						n = 0,
						o = 0 === b._duration;
					for (f = e.length; --f > -1;)(h = e[f]) === b || h._gc || h._paused || (h._timeline !== b
						._timeline ? (j = j || ba(b, 0, o), 0 === ba(h, j, o) && (l[n++] = h)) : h._startTime <=
						k && h._startTime + h.totalDuration() / h._timeScale > k && ((o || !h._initted) && k - h
							._startTime <= 2e-10 || (l[n++] = h)));
					for (f = n; --f > -1;)
						if (h = l[f], 2 === d && h._kill(c, a, b) && (g = !0), 2 !== d || !h._firstPT && h._initted) {
							if (2 !== d && !_(h, b)) continue;
							h._enabled(!1, !1) && (g = !0)
						} return g
				},
				ba = function(a, b, c) {
					for (var d = a._timeline, e = d._timeScale, f = a._startTime; d._timeline;) {
						if (f += d._startTime, e *= d._timeScale, d._paused) return -100;
						d = d._timeline
					}
					return f /= e, f > b ? f - b : c && f === b || !a._initted && 2 * m > f - b ? m : (f += a
						.totalDuration() / a._timeScale / e) > b + m ? 0 : f - b - m
				};
			h._init = function() {
				var a, b, c, d, e, f, g = this.vars,
					h = this._overwrittenProps,
					i = this._duration,
					j = !!g.immediateRender,
					k = g.ease;
				if (g.startAt) {
					this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), e = {};
					for (d in g.startAt) e[d] = g.startAt[d];
					if (e.overwrite = !1, e.immediateRender = !0, e.lazy = j && g.lazy !== !1, e.startAt = e.delay =
						null, e.onUpdate = g.onUpdate, e.onUpdateScope = g.onUpdateScope || g.callbackScope || this,
						this._startAt = G.to(this.target, 0, e), j)
						if (this._time > 0) this._startAt = null;
						else if (0 !== i) return
				} else if (g.runBackwards && 0 !== i)
					if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;
					else {
						0 !== this._time && (j = !1), c = {};
						for (d in g) U[d] && "autoCSS" !== d || (c[d] = g[d]);
						if (c.overwrite = 0, c.data = "isFromStart", c.lazy = j && g.lazy !== !1, c
							.immediateRender = j, this._startAt = G.to(this.target, 0, c), j) {
							if (0 === this._time) return
						} else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this
							._startAt = null)
					} if (this._ease = k = k ? k instanceof v ? k : "function" == typeof k ? new v(k, g
					.easeParams) : w[k] || G.defaultEase : G.defaultEase, g.easeParams instanceof Array && k
					.config && (this._ease = k.config.apply(k, g.easeParams)), this._easeType = this._ease._type,
					this._easePower = this._ease._power, this._firstPT = null, this._targets)
					for (f = this._targets.length, a = 0; f > a; a++) this._initProps(this._targets[a], this
						._propLookup[a] = {}, this._siblings[a], h ? h[a] : null, a) && (b = !0);
				else b = this._initProps(this.target, this._propLookup, this._siblings, h, 0);
				if (b && G._onPluginEvent("_onInitAllProps", this), h && (this._firstPT || "function" != typeof this
						.target && this._enabled(!1, !1)), g.runBackwards)
					for (c = this._firstPT; c;) c.s += c.c, c.c = -c.c, c = c._next;
				this._onUpdate = g.onUpdate, this._initted = !0
			}, h._initProps = function(b, c, d, e, f) {
				var g, h, i, j, k, l;
				if (null == b) return !1;
				K[b._gsTweenID] && Z(), this.vars.css || b.style && b !== a && b.nodeType && R.css && this.vars
					.autoCSS !== !1 && I(this.vars, b);
				for (g in this.vars)
					if (l = this.vars[g], U[g]) l && (l instanceof Array || l.push && p(l)) && -1 !== l.join("")
						.indexOf("{self}") && (this.vars[g] = l = this._swapSelfInParams(l, this));
					else if (R[g] && (j = new R[g])._onInitTween(b, this.vars[g], this, f)) {
					for (this._firstPT = k = {
							_next: this._firstPT,
							t: j,
							p: "setRatio",
							s: 0,
							c: 1,
							f: 1,
							n: g,
							pg: 1,
							pr: j._priority,
							m: 0
						}, h = j._overwriteProps.length; --h > -1;) c[j._overwriteProps[h]] = this._firstPT;
					(j._priority || j._onInitAllProps) && (i = !0), (j._onDisable || j._onEnable) && (this
						._notifyPluginsOfEnabled = !0), k._next && (k._next._prev = k)
				} else c[g] = P.call(this, b, g, "get", l, g, 0, null, this.vars.stringFilter, f);
				return e && this._kill(e, b) ? this._initProps(b, c, d, e, f) : this._overwrite > 1 && this
					._firstPT && d.length > 1 && aa(b, this, c, this._overwrite, d) ? (this._kill(c, b), this
						._initProps(b, c, d, e, f)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration ||
						this.vars.lazy && !this._duration) && (K[b._gsTweenID] = !0), i)
			}, h.render = function(a, b, c) {
				var d, e, f, g, h = this._time,
					i = this._duration,
					j = this._rawPrevTime;
				if (a >= i - 1e-7 && a >= 0) this._totalTime = this._time = i, this.ratio = this._ease._calcEnd ?
					this._ease.getRatio(1) : 1, this._reversed || (d = !0, e = "onComplete", c = c || this._timeline
						.autoRemoveChildren), 0 === i && (this._initted || !this.vars.lazy || c) && (this
						._startTime === this._timeline._duration && (a = 0), (0 > j || 0 >= a && a >= -1e-7 || j ===
							m && "isPause" !== this.data) && j !== a && (c = !0, j > m && (e =
						"onReverseComplete")), this._rawPrevTime = g = !b || a || j === a ? a : m);
				else if (1e-7 > a) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease
					.getRatio(0) : 0, (0 !== h || 0 === i && j > 0) && (e = "onReverseComplete", d = this
					._reversed), 0 > a && (this._active = !1, 0 === i && (this._initted || !this.vars.lazy || c) &&
						(j >= 0 && (j !== m || "isPause" !== this.data) && (c = !0), this._rawPrevTime = g = !b ||
							a || j === a ? a : m)), (!this._initted || this._startAt && this._startAt.progress()) &&
					(c = !0);
				else if (this._totalTime = this._time = a, this._easeType) {
					var k = a / i,
						l = this._easeType,
						n = this._easePower;
					(1 === l || 3 === l && k >= .5) && (k = 1 - k), 3 === l && (k *= 2), 1 === n ? k *= k : 2 ===
						n ? k *= k * k : 3 === n ? k *= k * k * k : 4 === n && (k *= k * k * k * k), 1 === l ? this
						.ratio = 1 - k : 2 === l ? this.ratio = k : .5 > a / i ? this.ratio = k / 2 : this.ratio =
						1 - k / 2
				} else this.ratio = this._ease.getRatio(a / i);
				if (this._time !== h || c) {
					if (!this._initted) {
						if (this._init(), !this._initted || this._gc) return;
						if (!c && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !
								this._duration)) return this._time = this._totalTime = h, this._rawPrevTime = j, J
							.push(this), void(this._lazy = [a, b]);
						this._time && !d ? this.ratio = this._ease.getRatio(this._time / i) : d && this._ease
							._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
					}
					for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !==
						h && a >= 0 && (this._active = !0), 0 === h && (this._startAt && (a >= 0 ? this._startAt
							.render(a, b, c) : e || (e = "_dummyGS")), this.vars.onStart && (0 !== this._time ||
							0 === i) && (b || this._callback("onStart"))), f = this._firstPT; f;) f.f ? f.t[f.p](f
						.c * this.ratio + f.s) : f.t[f.p] = f.c * this.ratio + f.s, f = f._next;
					this._onUpdate && (0 > a && this._startAt && a !== -1e-4 && this._startAt.render(a, b, c), b ||
						(this._time !== h || d || c) && this._callback("onUpdate")), e && (!this._gc || c) && (
						0 > a && this._startAt && !this._onUpdate && a !== -1e-4 && this._startAt.render(a, b,
							c), d && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this
							._active = !1), !b && this.vars[e] && this._callback(e), 0 === i && this
						._rawPrevTime === m && g !== m && (this._rawPrevTime = 0))
				}
			}, h._kill = function(a, b, c) {
				if ("all" === a && (a = null), null == a && (null == b || b === this.target)) return this._lazy = !
					1, this._enabled(!1, !1);
				b = "string" != typeof b ? b || this._targets || this.target : G.selector(b) || b;
				var d, e, f, g, h, i, j, k, l, m = c && this._time && c._startTime === this._startTime && this
					._timeline === c._timeline;
				if ((p(b) || H(b)) && "number" != typeof b[0])
					for (d = b.length; --d > -1;) this._kill(a, b[d], c) && (i = !0);
				else {
					if (this._targets) {
						for (d = this._targets.length; --d > -1;)
							if (b === this._targets[d]) {
								h = this._propLookup[d] || {}, this._overwrittenProps = this._overwrittenProps ||
								[], e = this._overwrittenProps[d] = a ? this._overwrittenProps[d] || {} : "all";
								break
							}
					} else {
						if (b !== this.target) return !1;
						h = this._propLookup, e = this._overwrittenProps = a ? this._overwrittenProps || {} : "all"
					}
					if (h) {
						if (j = a || h, k = a !== e && "all" !== e && a !== h && ("object" != typeof a || !a
								._tempKill), c && (G.onOverwrite || this.vars.onOverwrite)) {
							for (f in j) h[f] && (l || (l = []), l.push(f));
							if ((l || !a) && !_(this, c, b, l)) return !1
						}
						for (f in j)(g = h[f]) && (m && (g.f ? g.t[g.p](g.s) : g.t[g.p] = g.s, i = !0), g.pg && g.t
								._kill(j) && (i = !0), g.pg && 0 !== g.t._overwriteProps.length || (g._prev ? g
									._prev._next = g._next : g === this._firstPT && (this._firstPT = g._next), g
									._next && (g._next._prev = g._prev), g._next = g._prev = null), delete h[f]),
							k && (e[f] = 1);
						!this._firstPT && this._initted && this._enabled(!1, !1)
					}
				}
				return i
			}, h.invalidate = function() {
				return this._notifyPluginsOfEnabled && G._onPluginEvent("_onDisable", this), this._firstPT = this
					._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this
					._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], D.prototype.invalidate
					.call(this), this.vars.immediateRender && (this._time = -m, this.render(Math.min(0, -this
						._delay))), this
			}, h._enabled = function(a, b) {
				if (j || i.wake(), a && this._gc) {
					var c, d = this._targets;
					if (d)
						for (c = d.length; --c > -1;) this._siblings[c] = $(d[c], this, !0);
					else this._siblings = $(this.target, this, !0)
				}
				return D.prototype._enabled.call(this, a, b), this._notifyPluginsOfEnabled && this._firstPT ? G
					._onPluginEvent(a ? "_onEnable" : "_onDisable", this) : !1
			}, G.to = function(a, b, c) {
				return new G(a, b, c)
			}, G.from = function(a, b, c) {
				return c.runBackwards = !0, c.immediateRender = 0 != c.immediateRender, new G(a, b, c)
			}, G.fromTo = function(a, b, c, d) {
				return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, new G(a,
					b, d)
			}, G.delayedCall = function(a, b, c, d, e) {
				return new G(b, 0, {
					delay: a,
					onComplete: b,
					onCompleteParams: c,
					callbackScope: d,
					onReverseComplete: b,
					onReverseCompleteParams: c,
					immediateRender: !1,
					lazy: !1,
					useFrames: e,
					overwrite: 0
				})
			}, G.set = function(a, b) {
				return new G(a, 0, b)
			}, G.getTweensOf = function(a, b) {
				if (null == a) return [];
				a = "string" != typeof a ? a : G.selector(a) || a;
				var c, d, e, f;
				if ((p(a) || H(a)) && "number" != typeof a[0]) {
					for (c = a.length, d = []; --c > -1;) d = d.concat(G.getTweensOf(a[c], b));
					for (c = d.length; --c > -1;)
						for (f = d[c], e = c; --e > -1;) f === d[e] && d.splice(c, 1)
				} else if (a._gsTweenID)
					for (d = $(a).concat(), c = d.length; --c > -1;)(d[c]._gc || b && !d[c].isActive()) && d.splice(
						c, 1);
				return d || []
			}, G.killTweensOf = G.killDelayedCallsTo = function(a, b, c) {
				"object" == typeof b && (c = b, b = !1);
				for (var d = G.getTweensOf(a, b), e = d.length; --e > -1;) d[e]._kill(c, a)
			};
			var ca = t("plugins.TweenPlugin", function(a, b) {
				this._overwriteProps = (a || "").split(","), this._propName = this._overwriteProps[0], this
					._priority = b || 0, this._super = ca.prototype
			}, !0);
			if (h = ca.prototype, ca.version = "1.19.0", ca.API = 2, h._firstPT = null, h._addTween = P, h.setRatio = N,
				h._kill = function(a) {
					var b, c = this._overwriteProps,
						d = this._firstPT;
					if (null != a[this._propName]) this._overwriteProps = [];
					else
						for (b = c.length; --b > -1;) null != a[c[b]] && c.splice(b, 1);
					for (; d;) null != a[d.n] && (d._next && (d._next._prev = d._prev), d._prev ? (d._prev._next = d
						._next, d._prev = null) : this._firstPT === d && (this._firstPT = d._next)), d = d._next;
					return !1
				}, h._mod = h._roundProps = function(a) {
					for (var b, c = this._firstPT; c;) b = a[this._propName] || null != c.n && a[c.n.split(this
						._propName + "_").join("")], b && "function" == typeof b && (2 === c.f ? c.t._applyPT.m =
						b : c.m = b), c = c._next
				}, G._onPluginEvent = function(a, b) {
					var c, d, e, f, g, h = b._firstPT;
					if ("_onInitAllProps" === a) {
						for (; h;) {
							for (g = h._next, d = e; d && d.pr > h.pr;) d = d._next;
							(h._prev = d ? d._prev : f) ? h._prev._next = h: e = h, (h._next = d) ? d._prev = h : f = h,
								h = g
						}
						h = b._firstPT = e
					}
					for (; h;) h.pg && "function" == typeof h.t[a] && h.t[a]() && (c = !0), h = h._next;
					return c
				}, ca.activate = function(a) {
					for (var b = a.length; --b > -1;) a[b].API === ca.API && (R[(new a[b])._propName] = a[b]);
					return !0
				}, s.plugin = function(a) {
					if (!(a && a.propName && a.init && a.API)) throw "illegal plugin definition.";
					var b, c = a.propName,
						d = a.priority || 0,
						e = a.overwriteProps,
						f = {
							init: "_onInitTween",
							set: "setRatio",
							kill: "_kill",
							round: "_mod",
							mod: "_mod",
							initAll: "_onInitAllProps"
						},
						g = t("plugins." + c.charAt(0).toUpperCase() + c.substr(1) + "Plugin", function() {
							ca.call(this, c, d), this._overwriteProps = e || []
						}, a.global === !0),
						h = g.prototype = new ca(c);
					h.constructor = g, g.API = a.API;
					for (b in f) "function" == typeof a[b] && (h[f[b]] = a[b]);
					return g.version = a.version, ca.activate([g]), g
				}, f = a._gsQueue) {
				for (g = 0; g < f.length; g++) f[g]();
				for (h in q) q[h].func || a.console.log("GSAP encountered missing dependency: " + h)
			}
			j = !1
		}
	}("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window,
		"TweenMax");

console.log('\n' + ' %c Modown Designed by 1 %c https://www.baidu.com ' + '\n',
	'color: #fadfa3; background: #030307; padding:5px 0; font-size:12px;',
	'background: #fadfa3; padding:5px 0; font-size:12px;');
