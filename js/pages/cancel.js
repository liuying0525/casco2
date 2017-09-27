$(function(){
	$.scroll=function(){
	$(".list-scroll").width($(".list-scroll p").width()+$(".cancel").width());
	
	$(".list-scroll p").width($(".favorite-list li").width());
	
	var lines=$(".list-scroll p");
	var len=lines.length;
	var lastX,lastXForMobile;
	
	//记录被按下的对象
	var pressedObj;
	var lastLeftObj;
	
	//记录按下的点
	var start;
	
	//网页在移动端运行时的监听
	for(var i=0;i<len;++i){
		lines[i].addEventListener("touchstart",function(e){
			lastXForMobile=e.changedTouches[0].pageX;
			pressedObj=this;  
			
			var touches=event.touches[0];
			start={
				x:touches.pageX,
				y:touches.pageY
			};
		});
		
		lines[i].addEventListener("touchmove",function(e){
			var touches=event.touches[0];
			delta={
				x:touches.pageX-start.x,
				y:touches.pageY-start.y
			};
			
			//横向位移大于纵向位移，阻止纵向滚动
			if(Math.abs(delta.x)>Math.abs(delta.y)){
				event.preventDefault();
			}
		});
		
		lines[i].addEventListener('touchend',function(e){
			if(lastLeftObj&&pressedObj!=lastLeftObj){
				$(lastLeftObj).animate({marginLeft:"0"},300);
				lastLeftObj=null;
			}
			var diffx=e.changedTouches[0].pageX-lastXForMobile;
			if(diffx<-5){
				$(pressedObj).animate({marginLeft:"-3rem"},300);
				lastLeftObj&&lastLeftObj!=pressedObj&&$(lastLeftObj).animate({marginLeft:"0"},300);
				lastLeftObj=pressedObj;
			}else if(diffx>5){
				if(pressedObj==lastLeftObj){
					$(pressedObj).animate({marginLeft:"0"},300);
					lastLeftObj=null;
				}
			}
		});
	}
	
	//网页在PC浏览器中运行时的监听
	for(var i=0;i<len;++i){
		$(lines[i]).bind("mousedown",function(e){
			lastX=e.clientX;
			pressedObj=this;   
		});
		
		$(lines[i]).bind("mouseup",function(e){
			if(lastLeftObj&&pressedObj!=lastLeftObj){
				$(lastLeftObj).animate({marginLeft:"0"},300);
				lastLeftObj=null;
			}
			var diffx=e.clientX-lastX;
			if(diffx<-5){
				$(pressedObj).animate({marginLeft:"-3rem"},300);
				lastLeftObj&&lastLeftObj!=pressedObj&&$(lastLeftObj).animate({marginLeft:"0"},300);
				lastLeftObj=pressedObj;
			}else if(diffx>5){
				if(pressedObj==lastLeftObj){
					$(pressedObj).animate({marginLeft:"0"},300);
					lastLeftObj=null;
				}
			}
		})
	}
	}
})
