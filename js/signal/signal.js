$(function(){

	//取消click300ms的延迟
    FastClick.attach(document.body);
	var startDate=$("#startDate");//开始时间
    var endDate=$("#endDate"); //结束时间

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

	var obj={
		url:setUrl+'/WebReport/csmis/fault/lineListAPP.tg',
		event:function(){
			$("#searchIcon").click(function(){
				localStorage.setItem("line")
				obj.submit();
			});
		},
		submit:function(){
			ajaxfun(obj.url,{"start":startDate.val(),"end":endDate.val(),"line":localStorage.getItem("line")},function(res){
				$("#faultList").html("");
				if(res.result===0){
					if(res.data!=null){
						for(let i=0;i<res.data.detailList.length;i++){
							var $html=template("cont",res.data);
                            $("#faultList").html($html);
						}
					}else{
						$("#faultList").html("<div>暂无数据</div>");
					}
				}
				obj.detail();
			});
		},
		detail:function(){
			$(".detail").each(function(k,v){
				$(v).click(function(){
					
					var id = $(this).attr("did");
					localStorage.setItem("id",id);
					location.href="siDetails.html";
				});
			});
		},
		init:function(){
			obj.event();
			obj.submit();
		}
	}
	
	//根据日期搜索数据
	obj.init();

});
