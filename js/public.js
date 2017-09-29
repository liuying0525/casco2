



var setUrl = "http://192.168.3.127:8084";
(function (doc, win) { 
	
	
   var docEl = doc.documentElement,    
   resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',    
   recalc = function () {    
     var clientWidth = docEl.clientWidth;    
     if (!clientWidth) return;    
     docEl.style.fontSize = 20 * (clientWidth / 375) + 'px';    
    };    
     if (!doc.addEventListener) return;    
     win.addEventListener(resizeEvt, recalc, false);    
     doc.addEventListener('DOMContentLoaded', recalc, false);    
   })(document, window);  

//时间戳转换
	function add0(m){return m<10?'0'+m:m}
	function format(shijianchuo){
		//shijianchuo是整数，否则要parseInt转换
		var time= new Date(shijianchuo);
		var y=time.getFullYear();
		var m=time.getMonth()+1;
		var d=time.getDate();
		var h=time.getHours();
		var mm=time.getMinutes();
		var s=time.getSeconds();
		//return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
		return y+'-'+add0(m)+'-'+add0(d);		
	}
	
	//截取url后面的字符串
	function getParam(paramName) { 
    	paramValue = "", isFound = !1; 
    	if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) { 
       		arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0; 
       		while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++     			
			} 
    		return paramValue == "" && (paramValue = null), paramValue;
	} 							
//		console.log(getParam("did"));		

	// 获取url？后面id参数
	function GetRequest() {
		var paraString = location.href.substring(location.href.indexOf("?") + 1, location.href.length).split("&");
		var id1 = paraString[0].replace("line=", "");
		return id1;
	}

	function ajaxfun(url, data, succ) {
    $.ajax({
        type: "POST",
		url: url,
        // xhrFields: {
       	// 	withCredentials: true
       	// },
       	// crossDomain: true,
        data: data,
		dataType: "JSON",
		success: succ,
        error: function() {
            console.log("ajax-error");
        }
    });
}

