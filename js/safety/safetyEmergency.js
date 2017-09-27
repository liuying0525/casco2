$(function(){	

var myStorage=localStorage.getItem('storage')||'';
if(myStorage){
	myStorage=myStorage.split(',');
	$.each(myStorage,function(index,item){
		tab(item);
	});
}

$('.navTab>strong,.classTab>strong').click(function(){
	var tabName=$(this).attr('class').split(' ')[0];
	tab(tabName);
	var arr=[];
	$('.navTab>strong,.classTab>strong').each(function(){
		if($(this).hasClass('on')){
			arr.push($(this).attr('class').split(' ')[0]);
		}	
	});

	localStorage.setItem('storage',arr.join(','));
}); 


function tab(str){
	$('#'+str).addClass('on').siblings().removeClass('on');
	$('.'+str).addClass('on').siblings().removeClass('on');
}
	
})
