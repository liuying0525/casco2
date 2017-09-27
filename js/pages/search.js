	/**
	 * date: 2017-08-22 18:00:27
	 * author:brown
	 * describe:
	 * email:zxrnhy1993@sina.com
	 */
	
	$(function(){

		$("#searchBtn").click(function(){
			var str=$("#cont").val();
			if(str==null){
				alert("请输入关键字!");
			}else{
				localStorage.setItem("str",str);
				var url="/casco/pages/malfunction.html";
				var newUrl=url+"?str="+str;
				location.href=newUrl;
			}
		});
		
	});