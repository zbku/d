// $('.test_layer').on('click', function() {
//   layer.alert("内容");
// })
// 提示层
// layer.msg("玩命提示中");
var locationHOST = location.protocol + "//" + location.host;
var imgHOST = 'https://www.haole.com';
// rem
(function(doc, win) {
	var docEl = doc.documentElement,
		resizeEvt =
		"orientationchange" in window ? "orientationchange" : "resize",
		recalc = function() {
			var clientWidth = docEl.clientWidth;
			if (!clientWidth) return;
			if (clientWidth >= 640) {
				docEl.style.fontSize = "50px";
			} else {
				docEl.style.fontSize = 80 * (clientWidth / 640) + "px";
			}
		};
	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener("DOMContentLoaded", recalc, false);
})(document, window);

// 测试列表数据
var homeListsData = [ // eslint-disable-line

];
/*获取get 传参参数
 * 用法
 * var sid = $_GetParams['goodsId','bbb']; console.log(sid)
 * */


function isMobile() {
	var isMobile = false;
	// 判断是否手机端访问
	var userAgentInfo = navigator.userAgent.toLowerCase();
	var Agents = ['android', 'iphone', 'symbianos', 'windows phone', 'ipad', 'ipod'];
	for (var v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) >= 0) {
			isMobile = true
		}
	}
	return isMobile
}

function showModal() { // eslint-disable-line
	// getVCode();
	$(".modal_box").on('scroll mousewheel touchmove', stopScrolling);
	$(".modal_box").slideDown(270);
	// $('.footer_lists li').eq(4).addClass('actived').siblings().removeClass('actived')
	$('#goodsVideo').css('display', 'none');
	stopPropagation();
}

function showRPModal() {
	// getVCode();
	$(".rp_modal_mask").on('scroll mousewheel touchmove', stopScrolling);
	$(".rp_modal_mask").slideDown(270);
	$('#goodsVideo').css('display', 'none');
}

function hideModal() { // eslint-disable-line
	$(".modal_box").off('scroll mousewheel touchmove', stopScrolling);
	$('.modal_box').slideUp(270);
	// $('.footer_lists li').eq(4).removeClass('actived')
	var timer = setTimeout(function() {
		$('#goodsVideo').css('display', 'block')
	}, 300);
	
}

function hideRPModal() { // eslint-disable-line
	$(".rp_modal_mask").off('scroll mousewheel touchmove', stopScrolling);
	$('.rp_modal_mask').slideUp(270);
	var timer = setTimeout(function() {
		$('#goodsVideo').css('display', 'block')
	}, 300);
	if (nowPage) {
		showPage(nowPage, true)
	}
}

function stopPropagation(e) {
	e = e || window.event;
	if (e.stopPropagation) { //W3C阻止冒泡方法
		e.stopPropagation();
	} else {
		e.cancelBubble = true; //IE阻止冒泡方法
	}
}

// 禁止冒泡到頁面滾動
function stopScrolling(e) {
	e.preventDefault();
	e.stopPropagation();
	return false;
}


function showSearch() { // eslint-disable-line
	$(".search_box").slideDown(100);
}

function hideSearch() { // eslint-disable-line
	$(".search_box").slideUp(100);
}

// 图片放大插件初始化 start
var initPhotoSwipeFromDOM = function(gallerySelector) {
	// 解析来自DOM元素幻灯片数据（URL，标题，大小...）
	var parseThumbnailElements = function(el) {
		// console.log("pswpUid", el.dataset.pswpUid);
		var thumbElements = el.childNodes,
			numNodes = thumbElements.length,
			items = [],
			figureEl,
			linkEl,
			size,
			item,
			divEl;
		var index = 0;
		var imgElm = $("[data-pswp-uid=" + el.dataset.pswpUid + "] figure img");
		for (var i = 0; i < numNodes; i++) {
			figureEl = thumbElements[i]; // <figure> element
			// 仅包括元素节点
			if (figureEl.nodeType !== 1) {
				continue;
			}
			divEl = figureEl.children[0];
			linkEl = divEl.children[0]; // <a> element
			size = linkEl.getAttribute("data-size").split("x");
			// 获取对应的列表项 并设置图片宽高
			// console.log("imgElm", imgElm, "index", index);
			var imgs = new Image();
			imgs.src = imgElm.eq(index).attr("src");
			var w = imgs.width;
			var h = imgs.height;

			// 创建幻灯片对象
			item = {
				src: linkEl.getAttribute("href"),
				w: w,
				h: h
			};
			if (figureEl.children.length > 1) {
				item.title = figureEl.children[1].innerHTML;
			}
			if (linkEl.children.length > 0) {
				// <img> 缩略图节点, 检索缩略图网址
				item.msrc = linkEl.children[0].getAttribute("src");
			}
			item.el = figureEl; // 保存链接元素 for getThumbBoundsFn
			items.push(item);
			index++;
		}
		return items;
	};

	// 查找最近的父节点
	var closest = function closest(el, fn) {
		return el && (fn(el) ? el : closest(el.parentNode, fn));
	};

	// 当用户点击缩略图触发
	var onThumbnailsClick = function(e) {
		e = window.event || e;
		e.preventDefault ? e.preventDefault() : (e.returnValue = false);
		var eTarget = e.target || e.srcElement;
		var clickedListItem = closest(eTarget, function(el) {
			return el.tagName && el.tagName.toUpperCase() === "FIGURE";
		});
		if (!clickedListItem) {
			return;
		}
		var clickedGallery = clickedListItem.parentNode,
			childNodes = clickedListItem.parentNode.childNodes,
			numChildNodes = childNodes.length,
			nodeIndex = 0,
			index;
		for (var i = 0; i < numChildNodes; i++) {
			if (childNodes[i].nodeType !== 1) {
				continue;
			}
			if (childNodes[i] === clickedListItem) {
				index = nodeIndex;
				break;
			}
			nodeIndex++;
		}
		if (index >= 0) {
			openPhotoSwipe(index, clickedGallery);
		}
		return false;
	};

	var photoswipeParseHash = function() {
		var hash = window.location.hash.substring(1),
			params = {};
		if (hash.length < 5) {
			return params;
		}
		var vars = hash.split("&");
		for (var i = 0; i < vars.length; i++) {
			if (!vars[i]) {
				continue;
			}
			var pair = vars[i].split("=");
			if (pair.length < 2) {
				continue;
			}
			params[pair[0]] = pair[1];
		}
		if (params.gid) {
			params.gid = parseInt(params.gid, 10);
		}
		return params;
	};

	var openPhotoSwipe = function(
		index,
		galleryElement,
		disableAnimation,
		fromURL
	) {
		var pswpElement = document.querySelectorAll(".pswp")[0],
			gallery,
			options,
			items;
		items = parseThumbnailElements(galleryElement);
		// 这里可以定义参数
		options = {
			barsSize: {
				top: 100,
				bottom: 100
			},
			fullscreenEl: false,
			shareButtons: [{
					id: "wechat",
					label: "分享微信",
					url: "#"
				},
				{
					id: "weibo",
					label: "新浪微博",
					url: "#"
				},
				{
					id: "download",
					label: "保存图片",
					url: "{{raw_image_url}}",
					download: true
				}
			],
			galleryUID: galleryElement.getAttribute("data-pswp-uid"),
			getThumbBoundsFn: function(index) {
				var thumbnail = items[index].el.getElementsByTagName("img")[0], // find thumbnail
					pageYScroll =
					window.pageYOffset || document.documentElement.scrollTop,
					rect = thumbnail.getBoundingClientRect();
				return {
					x: rect.left,
					y: rect.top + pageYScroll,
					w: rect.width
				};
			}
		};
		if (fromURL) {
			if (options.galleryPIDs) {
				for (var j = 0; j < items.length; j++) {
					if (items[j].pid == index) {
						options.index = j;
						break;
					}
				}
			} else {
				options.index = parseInt(index, 10) - 1;
			}
		} else {
			options.index = parseInt(index, 10);
		}
		if (isNaN(options.index)) {
			return;
		}
		if (disableAnimation) {
			options.showAnimationDuration = 0;
		}
		gallery = new PhotoSwipe(
			pswpElement,
			PhotoSwipeUI_Default,
			items,
			options
		);
		gallery.init();
	};

	var galleryElements = document.querySelectorAll(gallerySelector);
	for (var i = 0, l = galleryElements.length; i < l; i++) {
		galleryElements[i].setAttribute("data-pswp-uid", i + 1);
		galleryElements[i].onclick = onThumbnailsClick;
	}
	var hashData = photoswipeParseHash();
	if (hashData.pid && hashData.gid) {
		openPhotoSwipe(
			hashData.pid,
			galleryElements[hashData.gid - 1],
			true,
			true
		);
	}
};
// 图片放大插件初始化 end

// 获取页面的高度、宽度
function getPageSize() {
	var xScroll, yScroll;
	if (window.innerHeight && window.scrollMaxY) {
		xScroll = window.innerWidth + window.scrollMaxX;
		yScroll = window.innerHeight + window.scrollMaxY;
	} else {
		if (document.body.scrollHeight > document.body.offsetHeight) { // all but Explorer Mac
			xScroll = document.body.scrollWidth;
			yScroll = document.body.scrollHeight;
		} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
			xScroll = document.body.offsetWidth;
			yScroll = document.body.offsetHeight;
		}
	}
	var windowWidth, windowHeight;
	if (self.innerHeight) { // all except Explorer
		if (document.documentElement.clientWidth) {
			windowWidth = document.documentElement.clientWidth;
		} else {
			windowWidth = self.innerWidth;
		}
		windowHeight = self.innerHeight;
	} else {
		if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
			windowWidth = document.documentElement.clientWidth;
			windowHeight = document.documentElement.clientHeight;
		} else {
			if (document.body) { // other Explorers
				windowWidth = document.body.clientWidth;
				windowHeight = document.body.clientHeight;
			}
		}
	}
	// for small pages with total height less then height of the viewport
	if (yScroll < windowHeight) {
		pageHeight = windowHeight;
	} else {
		pageHeight = yScroll;
	}
	// for small pages with total width less then width of the viewport
	if (xScroll < windowWidth) {
		pageWidth = xScroll;
	} else {
		pageWidth = windowWidth;
	}
	arrayPageSize = [pageWidth, pageHeight, windowWidth, windowHeight];
	return arrayPageSize;
}
// 获取页面的高度、宽度

// 进入筛选列表
// var loadNum=0;
// function toFilterPage(param) {
//   if (!param || param === '') {
//     layerMsg = layer.msg("该分类暂无产品！",{time:1*1000});
//     return
//   }
//   if ($('.page_box').length > 0) {
//     loadNum++;//计算浏览器加载次数
//     if (loadNum==1) {
//       // localStorage.setItem("categoryParam", param)
//       // $('.page_box').html('')
//       // $('.page_box').load('templates/pages/filter_page.html')
//       window.location.href = locationHOST + param
//     }
//   }
// }

// 进入商品详情
function toGoodsDetail(goodsId) { // eslint-disable-line
	var locationHOST = location.protocol + "//" + location.host;
	window.location.href = locationHOST + "/goods.php?id=" + goodsId;
}

function toFindtags(page, urlname) {
	if (!urlname || urlname === '') {
		layerMsg = layer.msg("该分类暂无产品！", {
			time: 1 * 1000
		});
		return
	}
	var href = decodeURIComponent(location.href);
	if (href.indexOf(urlname) != -1) return;
	localStorage.setItem("findParam", urlname);
	window.location.href = locationHOST + '/tags-' + urlname
}
