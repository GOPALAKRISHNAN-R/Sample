$(document).ready(function() {
	
	// add
	$(".add").click(function(e) {
//		 $(".myForm1").css("display", "block");
		$('.myForm1 #exampleModal1').modal();

	});

	// delete
	$(".del").click(function(e) {
		var id = $(this).attr('id').split("_")[1]
		$.ajax({
			url : '/delete/' + id,
			type : 'POST',
			context : $(this),
			contentType : "application/json",
			data : "id=" + id,
			success : function(response) {
				$(id).remove();
			}
		});
		setTimeout(function() {
			window.location.reload(1);
		}, 500);

	});

});
//double click to update
$('table tbody').on(
		'dblclick',
		'td.data',
		function(e, key, cell, originalEvent) {
			var inVal = $(this).text();
			$(this).html(
					"<input pval='" + inVal
							+ "' class='user-data' type='text'  value='"
							+ $(this).text() + "' />");
			$(this).find('input[type=text]').focus();
		});

$(document).on('keypress', 'input.user-data', function(e) {
	var regex = new RegExp("^[A-Za-z0-9_\]+$");
	var charCode = !e.charCode ? e.which : e.charCode;
	if (charCode == 13) {
		var inObj = $(e.srcElement || e.target);
		setData(inObj);
	}
	var str = String.fromCharCode(charCode);
	if (regex.test(str)) {
		return true;
	}
	e.preventDefault();
	return false;
});

$(document).on(
		'blur',
		'input.user-data',
		function(e) {
			var inObj = $(e.srcElement || e.target);

			if ($(this).attr('pval') === $(this).val()) {
							$(this).parent().text($(this).val());
			}

			else {

				var primaryKey = $(this).parent().attr('id').split("_")[1]
				var col = $(this).parent().attr('id').split("_")[0]
				var nval = $(this).val();
				var sendData = {};
				sendData['id'] = primaryKey;
				$(this).parent().parent().children().each(
						function(i, el) {
							if ($.trim($(this).attr("class")) == "data") {
								var key = $.trim($(this).attr("id")), 
								val = $.trim($(this).text()),
								obj = {}; 
//								alert(key + "--" + val );
								sendData[key.split("_")[0] ] = val;

							}
						});
				sendData[col] = nval;
				alert(JSON.stringify(sendData))
				$.ajax({
					url : '/edit',
					type : 'post',
					context : $(this),
					contentType : "application/json",
					data : JSON.stringify(sendData),
					success : function(response) {
//						alert("success")

					}
				});
				setTimeout(function() {
					window.location.reload(1);
				}, 500);

			}

		});
