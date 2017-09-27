$(function(){
	var myStorage=localStorage.getItem('storage')||'';
	var myTitle=localStorage.getItem("title")||'';
	if(myStorage){
		myStorage=myStorage.split(',');
		$.each(myStorage,function(index,item){
			tab(item);
		});
	}
	if(myTitle){
		$("title").text(myTitle);
	}
	
	$('.navTab>strong').click(function(){
		var tabName=$(this).attr('class').split(' ')[0];
		tab(tabName);
		var arr=[];
		$(".Tab1").hasClass("on") ? $("title").text("报警列表"):$("title").text("运维周报/月报");
		$('.navTab>strong').each(function(){
			if($(this).hasClass('on')){
				arr.push($(this).attr('class').split(' ')[0]);
			}	
		});

		localStorage.setItem('storage',arr.join(','));
		localStorage.setItem('title',$("title").text());
	}); 


	function tab(str){
		$('#'+str).addClass('on').siblings().removeClass('on');
		$('.'+str).addClass('on').siblings().removeClass('on');
	}

});
