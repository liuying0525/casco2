	/**
	 * date: 2017-08-18 10:22:11
	 * author:brown
	 * describe:
	 * email:zxrnhy1993@sina.com
	 */
	$(function(){
		
		$("#casco").click(function(){
			var company=$(this).attr("company");
			localStorage.setItem("company",company);
			var url="/casco/pages/malfunction.html";
			var newUrl=url+"?company="+company;
			location.href=newUrl;
			
		});

		$("#zh").click(function(){
			var company=$(this).attr("company");
			localStorage.setItem("company",company);
			var url="/casco/pages/malfunction.html";
			var newUrl=url+"?company="+company;
			location.href=newUrl;
		
		});

		$("#jk").click(function(){
			var company=$(this).attr("company");
			localStorage.setItem("company",company);
			var url="/casco/pages/malfunction.html";
			var newUrl=url+"?company="+company;
			location.href=newUrl;
		});

	});