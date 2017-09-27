	/**
	 * date: 2017-08-18 15:22:36
	 * author:brown
	 * describe:
	 * email:zxrnhy1993@sina.com
	 */

	$(function(){
		var t; //定时器
		var flag=false;
		var z={
			url:setUrl+"/csmis/fault/getItemsHTMLFAULT.tg",
			collection:setUrl+"/csmis/fault/collectHTMLFAULT.tg",
			personUrl:setUrl+"/csmis/fault/selfCollectHTMLFAULT.tg",
			detail:setUrl+"/csmis/fault/itemInfoHTMLFAULT.tg",
			delUrl:setUrl+"/csmis/fault/collectDeleteHTMLFAULT.tg",
			success:function(res){
				if(res.result==0){
					if(res.data!=null){
						localStorage.removeItem("str");
						var list=res.data;
						$("#tab1").empty();
						$("#page-cont").empty();
						for(name in list){
							$("#tab1").append('<li tabId='+list[name].id+'>'+list[name].name+'</li>');
							$("#page-cont").append(createList2(list[name].sonFaultTypes));
						}
					}
				}
				$(".collection-icon").each(function(k,v){
					$(v).click(function(){
						if(!$(v).is(".on")){
							clearInterval(t);
							$(".tips").show();
							$(".tips").text("收藏成功,至个人收藏夹查看");
							t=setInterval(hide,2000);
							$(this).addClass("on");
						}else{
							clearInterval(t);
							$(".tips").show();
							$(".tips").text("取消收藏成功");
							t=setInterval(hide,2000);
							$(this).removeClass("on");
						}
						var faultId=$(this).attr("iconId");
						ajaxfun(z.collection,{"faultId":faultId},z.success2);	
					});
				});
			},
			success2:function(res){
				if(res.result==0){
					console(res.msg);
				}
				else if(res.result==2){
					alert(res.msg);
				}
			},
			success3:function(res){
				if(res.result==0){
					$("#faultImg").empty();
					if(res.data!=null){
						$(".modal").show();
						$("#faultName").text(res.data.name);
						$("#faultJudge").text(res.data.judge);
						$("#faultImg").append(res.data.step);
					}
				}
				if(res.result==2){
					alert(res.msg);
				}
			},
			success4:function(res){
				if(res.result==0){
					if(res.data!=null){
						var list=res.data;
						$("#tab2").empty();
						$("#page-cont1").empty();
						for(name in list){
							$("#tab2").append('<li tabId='+list[name].id+'>'+list[name].name+'</li>');
							$("#page-cont1").append(createList3(list[name].sonFaultTypes));
						}
					}
				}
				$.scroll();
				deleteData();
			},
			success5:function(res){
				if(res.result==0){
					if(res.data!=null){
						console.log("yes");
					}
				}
			}
		}

		//定时器方法
		function hide(){
			clearInterval(t);
			$(".tips").hide();
		}

		//一级tab点击与显示
		$(".page-header .header-item").click(function(){
			$(this).children().addClass("on").parent().siblings().children().removeClass("on");
			console.log($(this).children().parent().siblings().children());
			var index=$(".page-header .header-item").index(this);
			$("div.tab-cont > div").eq(index).show().siblings().hide();
			var state=$(this).attr("state");
			if(state=="personal"){
				$("#search").css("display","none");
				$("#personal").addClass("on");
				ajaxfun(z.personUrl,{},z.success4);
			}
			if(state=="fault"){
				$("#search").css("display","block");
				$("#personal").removeClass("on");
				ajaxfun(z.url,{"company":localStorage.getItem("company"),"searchStr":localStorage.getItem("str")},z.success);
			}
		})

		//二级tab点击与显示
		$("#tab1").on('click','li',function(){
			$(this).addClass("is-active").siblings().removeClass("is-active");
			var index=$(".page-tab li").index(this);
			$("div.page-cont > div").eq(index).show().siblings().hide();
		})

		$("#tab2").on('click','li',function(){
			$(this).addClass("is-active").siblings().removeClass("is-active");
			var index=$(".page-tab li").index(this);
			$("div.page-cont > div").eq(index).show().siblings().hide();
		})
		
		//modal关闭按钮
		$("#closeBtn").click(function(){
			$(".modal").hide();
		})

		//故障详情modal
		$("#page-cont").on('click','li p',function(){
			var fault=$(this).attr("contId");
			$(".modal").show();
			ajaxfun(z.detail,{"faultId":fault},z.success3);
		});

		//页面首次加载tab数据
		(function loadData(){
			ajaxfun(z.url,{"company":localStorage.getItem("company"),"searchStr":localStorage.getItem("str")},z.success);
		})();

		//创建数据
		function createList2(list){
			var html="";
			html+="<div class='cont-item'>";
			for(name in list){
				html+="<div class='item-list'>";
				html+="<div class='title'>";
				html+="<span titleId='"+list[name].id+"'>"+list[name].name+"</span>";
				html+="</div>";
				html+="<ul class='cont-list'>";
				var list3=list[name].faults;
				for(name in list3){
					html+="<li>";
					html+="<p contId='"+list3[name].id+"'>"+list3[name].name+"</p>";
					if(list3[name].isCollect==true){
						html+="<span class='on collection-icon' iconId="+list3[name].id+"></span>";
					}else{
						html+="<span iconId='"+list3[name].id+"' class='collection-icon'></span>";
					}
					html+="</li>";
				}
				html+="<ul>";
				html+="</div>";
			}
			html+="</div>";
			return html;
		}

		//创建dom
		function createList3(list){
			var html="";
				html+="<div class='cont-item'>";
				if(list==null){	
					html+="<div class='empty-tips'>"
					html+="<img src='../images/Page 1@2x.png' alt='bg' class='bg'>";
					html+="<span>收藏夹空空</span>";
					html+="</div>"
				}
				else{
					for(name in list){
						html+="<div class='item-list'>";
						html+="<div class='title'>";
						html+="<span titleId='"+list[name].id+"'>"+list[name].name+"</span>";
						html+="</div>";
						html+="<ul class='cont-list favorite-list'>";
						var list3=list[name].faults;
						for(name in list3){
							html+="<li class='data-list'>";
							html+="<div class='list-scroll'>";
							html+="<p>"+list3[name].name+"</p>";
							html+="<div class='cancel'>";
							html+="<button class='delBtn' contId='"+list3[name].id+"' ><em>取消</em><em>收藏</em></button>";			
							html+="</div>";				
							html+="</li>";
						}
						html+="<ul>";
						html+="</div>";
					}
				}
				html+="</div>";
			return html;
		}

		//删除
		function deleteData(){
			$(".delBtn").each(function(index,item){
				$(item).click(function(){
					var contId=$(this).attr("contId");
					$(this).parents(".data-list").remove();
					ajaxfun(z.delUrl,{"faultId":contId},z.success5);
				});
			});
		}

	});