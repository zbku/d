//动态播放视频
function jinsom_play_video(post_id, video_url, obj) {
	post_id = parseInt(Math.random() * (999999 - 9999 + 1) + 9999);
	$(obj).before('<div id="jinsom-video-' + post_id + '" post_id="' + post_id + '"></div>');
	$(obj).remove();
	video_type = jinsom_video_type(video_url);
	window['video_' + post_id] = new window[video_type]({
		id: 'jinsom-video-' + post_id,
		url: video_url,
		'x5-video-player-type': 'h5',
		'x5-video-player-fullscreen': false,
		playbackRate: [0.5, 1, 1.5, 2, 6],
		fitVideoSize: 'fixWidth',
		playsinline: true,
		autoplay: true,
		ignores: ['volume', 'pc'],
		closeVideoTouch: true,
		rotate: {
			innerRotate: true, //只旋转内部video
			clockwise: false // 旋转方向是否为顺时针
		}
	});
	window['video_' + post_id].on('play', function() {
		if ($('.jinsom-video-playing').length > 0) {
			current_post_id = $('.jinsom-video-playing').attr('post_id');
			window['video_' + current_post_id].pause();
		}

		$('#jinsom-video-' + post_id).addClass('jinsom-video-playing');
	})
	window['video_' + post_id].on('pause', function() {
		$('#jinsom-video-' + post_id).removeClass('jinsom-video-playing');
	})
}

//获取视频播放类型
function jinsom_video_type(video_url) {
	var index1 = video_url.lastIndexOf(".");
	var index2 = video_url.length;
	var type = video_url.substring(index1, index2);
	if (type == '.m3u8') {
		return 'HlsJsPlayer';
	} else if (type == '.flv') {
		return 'FlvJsPlayer';
	} else {
		return 'Player';
	}
}


