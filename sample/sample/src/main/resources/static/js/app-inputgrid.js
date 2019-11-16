var iCnt = 0;
var container = $(document.createElement('div')).css({
	padding : '5px',
	margin : '20px',
	width : '200px',
	overflow : 'hidden',
	border : '1px dashed',
	borderTopColor : '#999',
	borderBottomColor : '#999',
	borderLeftColor : '#999',
	borderRightColor : '#999',
	font : '13px verdana'
});
var options = {
		url: "../../json/countries.json",

		getValue: "name",

		list: {
			match: {
				enabled: true
			},
			maxNumberOfElements: 8
		},

		theme: "plate-dark"

	};
var availableTags = [
    "ActionScript",
    "AppleScript",
    "Asp",
    "BASIC",
    "C",
    "C++",
    "Clojure",
    "COBOL",
    "ColdFusion",
    "Erlang",
    "Fortran",
    "Groovy",
    "Haskell",
    "Java",
    "JavaScript",
    "Lisp",
    "Perl",
    "PHP",
    "Python",
    "Ruby",
    "Scala",
    "Scheme"
  ];
function addButton(obj){
	++iCnt;
	$(obj).parent().last()
	.append(
			'<div class="row">'
            +'<div class="col-sm-4"><input class="form-control input-sm" type=text class="input" id=dataset'+iCnt
					+ ' placeholder="DATASET'+ iCnt
					+ '" /> '
					+'</div><div class="col-sm-2"><button action="DELETE" type="button" class="btn btn-space-table btn-default btn-sm">'
					+'<i class="icon s7-close"></i></button></span>'
					+'</div></div>');
	$("#dataset"+iCnt).easyAutocomplete(options);
	/*$( "#dataset"+iCnt ).autocomplete({
	      source: availableTags
	    });*/
		
}
$(document)
		.ready(
				function() {
					
					
					
					$("#btAdd").click(function() {
						alert('button clicked');
					});
					$('#btAdd1')
							.click(
									function() {
										if (iCnt <= 19) {
											iCnt = iCnt + 1;
											$(container)
													.append(
															'<input type=text class="input" id=tb'
																	+ iCnt
																	+ ' value="Text Element '
																	+ iCnt
																	+ '" />');
											if (iCnt == 1) {
												var divSubmit = $(document
														.createElement('div'));
												$(divSubmit)
														.append(
																'<input type=button class="bt" onclick="GetTextValue()" id=btSubmit value=Submit />');
											}
											$('#main').after(container,
													divSubmit);
										} else {
											$(container)
													.append(
															'<label>Reached the limit</label>');
											$('#btAdd').attr('class',
													'bt-disable');
											$('#btAdd').attr('disabled',
													'disabled');
										}
									});
					$('#btRemove').click(function() {
						if (iCnt != 0) {
							$('#tb' + iCnt).remove();
							iCnt = iCnt - 1;
						}
						if (iCnt == 0) {
							$(container).empty();
							$(container).remove();
							$('#btSubmit').remove();
							$('#btAdd').removeAttr('disabled');
							$('#btAdd').attr('class', 'bt')
						}
					});
					$('#btRemoveAll').click(function() {
						$(container).empty();
						$(container).remove();
						$('#btSubmit').remove();
						iCnt = 0;
						$('#btAdd').removeAttr('disabled');
						$('#btAdd').attr('class', 'bt');
					});
				});
var divValue, values = '';
function GetTextValue() {
	$(divValue).empty();
	$(divValue).remove();
	values = '';
	$('.input').each(function() {
		divValue = $(document.createElement('div')).css({
			padding : '5px',
			width : '200px'
		});
		values += this.value + '<br />'
	});
	$(divValue).append('<p><b>Your selected values</b></p>' + values);
	$('#showvalues').append(divValue);
}