/*
 * @Author: sobrown 
 * @Date: 2017-09-27 14:53:17 
 * @Last Modified by: sobrown
 * @Last Modified time: 2017-09-29 09:38:21
 */
$(function(){
    //取消click300ms的延迟
    FastClick.attach(document.body);
    var startDate=$("#startDate");//开始时间
    var endDate=$("#endDate"); //结束时间
    var methods={
        searchUrl:setUrl+"/WebReport/csmis/fault/lineStatisAPP.tg",
        event:function(){
            $("#searchIcon").click(function(){
                methods.submit();
            })
        },
        submit:function(){
            ajaxfun(methods.searchUrl,{"start":startDate.val(),"end":endDate.val()},function(res){
                $(".list-cont").html("");
                if(res.result===0){
                    if(res.data!=null){
                        for(let i=0;i<res.data.length;i++){
                            var $html=template("contList",res);
                            $(".list-cont").html($html);
                        }
                    }else{
						$(".list-cont").html("<div>暂无数据</div>");
					}
                }
                $(".list-item").each(function(k,v){
                    $(v).click(function(){
                        var line=$(this).attr("sid");
                        localStorage.setItem("line",line);
                        location.href="signal.html";
                    })
                })
            });
        },
        init:function(){
            methods.event();
            methods.submit();
        }
    }
    //根据时间显示故障列表
    methods.init();
});