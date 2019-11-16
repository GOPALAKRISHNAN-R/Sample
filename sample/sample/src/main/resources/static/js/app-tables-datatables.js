var App = (function() {
	'use strict';

	var btnHTML = "<div class=\"tools1\">"
			+ "<button action='EDIT' disabled='true' type=\"button\" class=\"btn btn-space-table btn-primary btn-sm\"><i class=\"icon s7-note\"></i></button>"
			+ "<button  action='DELETE' type=\"button\" class=\"btn btn-space-table btn-primary btn-sm\"><i class=\"icon s7-trash\"></i></button></div>";
	function format(d) {
		// `d` is the original data object for the row
		return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'
				+ '<tr>'
				+ '<td>Full name:</td>'
				+ '<td>'
				+ d.firstName
				+ '</td>'
				+ '</tr>'
				+ '<tr>'
				+ '<td>Extension number:</td>'
				+ '<td>'
				+ d.email
				+ '</td>'
				+ '</tr>'
				+ '<tr>'
				+ '<td>Extra info:</td>'
				+ '<td>And any further details here (images etc)...</td>'
				+ '</tr>' + '</table>';
	}
	function getData(objInput,intInd){
		var inpElem=$($(objInput).parents("tr").find('td')[intInd]).first();
		if(inpElem)return inpElem.val();
	}
	App.dataTables = function() {

		// We use this to apply style to certain elements
		$.extend(true, $.fn.dataTable.defaults, {
			dom : "<'row am-datatable-header'<'col-sm-6'l><'col-sm-6'f>>"
					+ "<'row am-datatable-body'<'col-sm-12'tr>>"
					+ "<'row am-datatable-footer'<'col-sm-5'i><'col-sm-7'p>>"
		});
		var events = $('#events');
		var table = $("#table1")
				.DataTable(
						{
							keys: true,
							"ajax" : "/admin/user/list",
							"order" : [ [ 1, "asc" ] ],
							"columns" : [ {
								"className" : 'details-control',
								"orderable" : false,
								"data" : null,
								"defaultContent" : ''
							}, {
								"className" : 'editable',
								"data" : "firstName"
							}, {
								"className" : 'editable',
								"data" : "lastName"
							}, {
								"data" : "email"
							}],
							"columnDefs" : [ {
								"targets" : 4,
								"data" : null,
								"defaultContent" : btnHTML
							} ],
							buttons : {
								buttons : [ {
									text : 'Add New User',
									className : 'btn-space-table-head btn-primary',
									action : function(e, dt, node, config) {
										$.ajax({
											url : '/async/users/new',
											type : 'get',
											data : $(this).serialize(),
											success : function(response) {
												var fIndex=response.indexOf('>')+2;
												var sIndex=response.length-fIndex-9
												var rsub=response.substr(fIndex,sIndex);
												$('#userInfo').html(rsub);
												$(node).attr('data-toggle', 'modal');
												$(node).attr('href', '#form-primary');
											}
										});
										
										// this.disable(); // disable button
									}
								} ]
							},
							"lengthMenu" : [ [10, 25, 50, -1 ],
									[  10, 25, 50, "All" ] ],
							dom : "<'row am-datatable-header'<'col-sm-8'l><'col-sm-2'f><'col-sm-2'B>>"
									+ "<'row am-datatable-body'<'col-sm-12'tr>>"
									+ "<'row am-datatable-footer'<'col-sm-5'i><'col-sm-7'p>>"
						});
		$('#table1 tbody').on('dblclick','td.editable', function(e, datatable, key, cell, originalEvent) {
			if($(this).html().indexOf('lev-dtinput')==-1) {
				e.preventDefault();
				$(this).html("<input class='lev-dtinput' type='text'  value='"+$(this).text()+"' />");
				$(this).find('input[type=text]').focus();
				
			}
			else {
				//$(this).find('input[type=text]').focus();
				//$(this).parents("tr")
			}
		});
		function setData(inObj){
			var td=inObj.parent();
	    	var data=table.row($(inObj).parents('tr')).data();
	    	var blnIsChanged=false;
	    	if(inObj.parent().index()==1){
	    		if(inObj.val()!=data.firstName){
	    			data.firstName=inObj.val();
	    			blnIsChanged=true;
	    		}
	    		
	    	}
	    	else if(inObj.parent().index()==2){	    		
	    		if(inObj.val()!=data.lastName){
	    			data.lastName=inObj.val();
	    			blnIsChanged=true;
	    		}
	    	};
	    	td.html(inObj.val());
	    	if(blnIsChanged)
				$(td).parent().find('button')[0].disabled=false;
	    	else
				$(td).parent().find('button')[0].disabled=true;
		}
		$(document).on('blur','input.lev-dtinput',function (e) {
			var inObj=$(e.srcElement||e.target);
			setData($(this));
		});
		$(document).on('keypress','input.lev-dtinput',function (e) {
		    var regex = new RegExp("^[a-zA-Z0-9]+$");
		    var charCode=!e.charCode ? e.which : e.charCode;
		    if(charCode==13){
		    	var inObj=$(e.srcElement||e.target);
		    	setData(inObj);
		    }
		    var str = String.fromCharCode(charCode);
		    if (regex.test(str)) {
		        return true;
		    }

		    e.preventDefault();
		    return false;
		});

		table
        .on( 'key', function ( e, datatable, key, cell, originalEvent ) {
            if(key==13){
            	
            	if($(cell.node()).find('input').length==0){
            		//$(cell.node()).dblclick();
            		//$(cell.node()).find('input')[0].focus();
        				$(cell.node()).html("<input class='lev-dtinput' type='text'  value='"+$(cell.node()).text()+"' />");
        				$(cell.node()).find('input[type=text]').focus();
        				
        			
            	}
            }
        } );
		 
		$('#table1 tbody').on('click', 'button', function() {
			
			var data = table.row($(this).parents('tr')).data();
			//alert(data.firstName +":"+data.email + "': " + data.id + $(this).attr('action'));
			var urlS='';
			if($(this).attr('action')=='DELETE'){
				urlS='/async/users/delete';
				//$(this).attr('data-toggle', 'modal');
				//$(this).attr('href', '#mod-error');
				//return;
			}
			else
				urlS='/async/users/edit';
			$("#progresshead").show();
			$.ajax({
				url : urlS,
				type : 'post',
				context:$(this),
				contentType: "application/json",
				data : JSON.stringify(data),
				success : function(response) {
					if($(this).attr("action")=="DELETE") {
						table.row($(this).parents('tr')).remove().draw();
						$("#progresshead").hide();
					}						
					else {
						$(this).prop("disabled",true);
						$("#progresshead").hide()
					}
						
				}
			});
		});
		$('#table1 tbody').on('click', 'td.details-control', function() {
			var tr = $(this).closest('tr');
			var row = table.row(tr);

			if (row.child.isShown()) {
				// This row is already open - close it
				row.child.hide();
				tr.removeClass('shown');
			} else {
				// Open this row
				row.child(format(row.data())).show();
				tr.addClass('shown');
			}
		});
		var userJson;
		$('#userInfo').on('submit', function(e) {
			userJson={
					firstName:$('#firstName').val(),
					lastName:$('#lastName').val(),
					email:$('#email').val()
			};
			e.preventDefault();
			$.ajax({
				url : $(this).attr('action'),
				type : 'post',
				context:table,
				data : $(this).serialize(),
				success : function(response) {
					// if the response contains any errors, replace the form
					if ($(response).find('.has-error').length) {
						//$(this).replaceWith(response);
						var fIndex=response.indexOf('>')+2;
						var sIndex=response.length-fIndex-9
						var rsub=response.substr(fIndex,sIndex);
						$('#userInfo').html(rsub);
					} else {
						$('#userInfo').html(response)
						table.row.add(userJson).draw();
					}
				}
			});
		});

	};

	return App;
})(App || {});
