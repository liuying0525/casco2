  	/**
	 * date: 2017-09-28 15:40:43
	 * author:LiuYing
	 * describe:
	 */
  
 $(function(){
	//输入框图标显示消失效果
	$("footer input").bind("input propertychange",function(){//keycode==13
		$("footer icon").hide();
		if($(this).val()==""){
			$("footer icon").show();
		}
	});
	
	//动态渲染数据
	$.ajax({
		type:"POST",
		url:setUrl+"/WebReport/csmis/fault/alarmDetailAPP.tg",
		data:{id:localStorage.getItem("id")},
		dataType:"json",
		success:function(res){
			if(res.result!=0) return;		
			console.log(res);
			var topList=$.parseJSON(res.data).detail;
			var centerList=$.parseJSON(res.data).list;
			var weixiu=$.parseJSON(res.data).weixiu;
			console.log(topList);
			console.log(centerList);
			console.log(weixiu);
			//轮播图
			swiperImg(topList);
			
			//轮播图图片放大
   			mui.previewImage();  
   			
   			//站点概况描述
   			sidetailsTop(topList);
   			
   			//维修建议详细内容
			sidetailsCenter(centerList,weixiu);
		}
	});
	
	//轮播图效果 - ajax
	function swiperImg(topList){
		var str="";
		var manualList=[];
		if(topList.imgs&&topList.imgs.length!=0){
			manualList=topList.imgs.split(',');
			
			$.each(manualList, function(item) {
				str+='<div class="swiper-slide">';
				str+='<img src="'+setUrl+'/WebReport'+manualList[item]+'" alt="" data-preview-src="" data-preview-group="'+item+'"/>';
				str+='</div>';
			});
			$(".swiper-wrapper").append(str);		
			
			//初始化轮播图
			initSwiper();
		}
	}
	
	//初始化轮播图
	function initSwiper(){
	    var swiper = new Swiper('.swiper-container', {
	        pagination: '.swiper-pagination',
	        slidesPerView: "auto",
			centeredSlides: true,
	        watchSlidesProgress: !0,
	        paginationClickable: true,
	        spaceBetween: 0,
	        loop: true,
			loopedSlides :3,
			initialSlide:1,
	        onProgress: function(a) {
				var b, c, d;
				for(b = 0; b < a.slides.length; b++) c = a.slides[b], d = c.progress, scale = 1 - Math.min(Math.abs(.2 * d), 1), es = c.style, es.opacity = 1 - Math.min(Math.abs(d / 2), 1), es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = "translate3d(0px,0," + -Math.abs(150 * d) + "px)";
			},
			onSetTransition: function(a, b) {
				for(var c = 0; c < a.slides.length; c++) es = a.slides[c].style, es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = b + "ms"
			}
	    });
	}
	
	//站点概况描述-ajax
	function sidetailsTop(topList){						
		var str="";	
		var bstr='';
		str+='<li><span>站点</span><span>'+topList.station+'</span></li>';
		str+='<li><span>设备名称</span><span>'+topList.driveName+'</span></li>';
		str+='<li><span>设备类型</span><span>'+topList.driveType+'</span></li>';
		str+='<li><span>发生时间</span><span>'+topList.startTime+'</span></li>';
		str+='<li><span>故障描述</span><span>'+topList.content+'</span></li>';
		
		$(".sidetails-top ul").append(str);	
		
		if(topList.state==2){			
			bstr+='<button>确认报警</button>';
		}else{
			bstr+='<button>处理完成</button>';
		}
			$(".sidetails-top").append(bstr);
	}
	
	//维修建议详细内容-ajax
	function sidetailsCenter(centerList,weixiu){
		var str="";
		str+='<span>维修人：'+weixiu+'</span>';	
		$(".sidetails-center h6").append(str);
		$.each(centerList,function(i,val){	
		var listr='';
			if(val.handTime){
				var vhandTime=val.handTime.split(" ").pop();
			}		
			var dayTime=vhandTime.split(":")[0];
			var tDaytime=dayTime<12?"上午":"下午";
			
			listr+='<li>';
			listr+='<span><em>'+vhandTime+'</em><em>'+tDaytime+'</em></span>';
			listr+='<span><em>'+val.uname+'</em><em>'+val.content+'</em></span>';
			listr+='</li>';
			$(".sidetails-center ul."+(i?'off':'on')).append(listr);			
		});		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
});
