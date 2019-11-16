function showMenu(){
	var mainDiv=$('body div').first();
	 cls=mainDiv.attr("class");
	if(cls.indexOf("am-fixed-sidebar")>-1){  
		mainDiv.attr("class","am-wrapper am-nosidebar-left");
		$('#leftmenu').hide();
	}
	else {
		$('#leftmenu').show();
		mainDiv.attr("class","am-wrapper am-fixed-sidebar");
	}
	
}