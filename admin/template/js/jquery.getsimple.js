/* reverseOrder : jQuery order reverser plugin
 * Written by Corey H Maass for Arc90
 * (c) Arc90, Inc.
 * 
 * Licensed under:Creative Commons Attribution-Share Alike 3.0 http://creativecommons.org/licenses/by-sa/3.0/us/
 */
(function($){$.fn.reverseOrder=function(){return this.each(function(){$(this).prependTo($(this).parent())})}})(jQuery);

/*
 * GetSimple js file	
 */
function updateCoords(c) {
	$('#handw').show();
  $('#x').val(c.x);
  $('#y').val(c.y);
  $('#w').val(c.w);
  $('#h').val(c.h);
  $('#pich').html(c.h);
  $('#picw').html(c.w);
};
	
jQuery(document).ready(function() { 

	var loadingAjaxIndicator = $('#loader');
	
	function DeleteComp(id) {
		var message = $("#del-" + id).attr("title");
		var answer = confirm(message);
	  loadingAjaxIndicator.show();
	  if (answer){
	  	$("#section-" + id).slideToggle('40000').remove();
	  	if($("#divlist-" + id).length) {
	  		$("#divlist-" + id).remove();
	  	}  	
	  }
	  loadingAjaxIndicator.fadeOut(1000);
		return false;
	};
				
	
	
	function checkCoords() {
	  if (parseInt($('#x').val())) return true;
	  alert('Please select a crop region then press submit.');
	  return false;
	};
	
	var imageTableElement = $("#imageTable");
	function attachFilterChangeEvent() {
		$("#imageFilter").change(function(){
			loadingAjaxIndicator.show();
			var filterx = $(this).val();
			imageTableElement.find("tr").hide();
			if (filterx == 'Images'){
				imageTableElement.find("tr .imgthumb").show();
			} else {
				imageTableElement.find("tr .imgthumb").hide();
			}		
			$("#filetypetoggle").html('&nbsp;&nbsp;/&nbsp;&nbsp;' + filterx);
			imageTableElement.find("tr." + filterx).show();
			imageTableElement.find("tr.folder").show();
			imageTableElement.find("tr:first-child").show();
	   	imageTableElement.find("tr.deletedrow").hide();
	   	loadingAjaxIndicator.fadeOut(500);
		});
	}
	
	
	//upload.php
	attachFilterChangeEvent();

	//image.php	
	var copyKitTextArea = $('textarea.copykit');
	$("select#img-info").change(function() {
		var codetype = $(this).val();
		var code = $('p#'+ codetype).html();
		var originalBG = $('textarea.copykit').css('background-color'); 
		var fadeColor = "#FFFFD1"; 
		copyKitTextArea.fadeOut(500).fadeIn(500).html(code);
	});
	$(".select-all").live("click", function() {
    copyKitTextArea.focus().select();
    return false;
  });
  
  
	//autofocus index.php & resetpassword.php fields on pageload
	$("#index input#userid").focus();
	$("#resetpassword input[name='username']").focus();
	
	
	// components.php
	$(".delconfirmcomp").live("click", function($e) {
		$e.preventDefault();
		loadingAjaxIndicator.show();
		var message = $(this).attr("title");
		var answer = confirm(message);
	    if (answer){
	    	var compid = $(this).attr("rel");
	    	$(compid).slideToggle(500).remove();
	    }
	  loadingAjaxIndicator.fadeOut(500);
	});
	$("#addcomponent").live("click", function($e) {
		$e.preventDefault();
		loadingAjaxIndicator.show();
		var id = $("#id").val();
		$("#divTxt").append('<div style="display:none;" class="compdiv" id="section-' + id + '"><table class="comptable"><tr><td><b>Title: </b><input type="text" class="text newtitle" name="title[]" value="" /></td><td class="delete"><a href="#" title="Delete Component:?" id="del-'+ id +'" onclick="DeleteComp('+ id +'); return false;" >&times;</a></td></tr></table><textarea name="val[]"></textarea><input type="hidden" name="slug[]" value="" /><input type="hidden" name="id[]" value="' + id + '" /><div>');
		$("#section-" + id).slideToggle('fast');
		id = (id - 1) + 2;
		$("#id").val(id);
		loadingAjaxIndicator.fadeOut(500);
		$('#submit_line').fadeIn();
	});
	$("b.editable").dblclick(function () {
		var t = $(this).html();
		$(this).parents('.compdiv').find("input.comptitle").hide();
		$(this).after('<div id="changetitle"><b>Title: </b><input class="text newtitle titlesaver" name="title[]" value="'+t+'" /></div>');
		$(this).parents('.compdiv').find("input.compslug").val('');
		$(this).hide();
	});
	$("input.titlesaver").live("keyup", function () {
		var myval = $(this).val();
		$(this).parents('.compdiv').find(".compslugcode").html("'"+myval.toLowerCase()+"'");
		$(this).parents('.compdiv').find("b.editable").html(myval);
	}).live("focusout", function () {
		var myval = $(this).val();
		$(this).parents('.compdiv').find(".compslugcode").html("'"+myval.toLowerCase()+"'");
		$(this).parents('.compdiv').find("b.editable").html(myval);
		$("b.editable").show();
		$('#changetitle').remove();
	});


	// other general functions
	$(".snav a.current").live("click", function($e) {
		$e.preventDefault();
	});
	$(".confirmation").live("click", function($e) {
		loadingAjaxIndicator.show();
		var message = $(this).attr("title");
		var answer = confirm(message);
	    if (!answer){
	    	loadingAjaxIndicator.fadeOut(500);
	    	return false;
	    }
	  loadingAjaxIndicator.fadeOut(500);
	});
	$(".delconfirm").live("click", function() {
		var message = $(this).attr("title");
		var dlink = $(this).attr("href");
		var mytr=$(this).parents("tr");
	  mytr.css("font-style", "italic");
	    var answer = confirm(message);
	    if (answer){
	    	loadingAjaxIndicator.show();
	    	mytr.addClass('deletedrow');
	    	mytr.fadeOut(500, function(){
					$.ajax({
			       type: "GET",
			       url: dlink,
			       success: function(response){
			          mytr.remove();
			          if($("#pg_counter").length) {
			        	  counter=$("#pg_counter").html();
				          $("#pg_counter").html(counter-1);
					      }
				        
				        $('div.wrapper .updated').remove();
				        $('div.wrapper .error').remove();
                if($(response).find('div.error').html()) {
                  $('div.bodycontent').before('<div class="error"><p>'+ $(response).find('div.error').html() + '</p></div>');
                  popAlertMsg();
                }
                if($(response).find('div.updated').html()) {
                  $('div.bodycontent').before('<div class="updated"><p>'+ $(response).find('div.updated').html() + '</p></div>');
                  popAlertMsg(); 
                }
				     }
				  });
					loadingAjaxIndicator.fadeOut(500);
				});
	    } else {
	    	mytr.css('font-style', 'normal');
	    	return false;
	    }
	    return false;
	});
	$("#waittrigger").click(function(){
		loadingAjaxIndicator.fadeIn();
		$("#waiting").fadeIn(1000).fadeOut(1000).fadeIn(1000).fadeOut(1000).fadeIn(1000).fadeOut(1000).fadeIn(1000);
	});

	function popAlertMsg() {	
		$(".updated").fadeOut(500).fadeIn(500);
		$(".error").fadeOut(500).fadeIn(500);
		setTimeout(function() {
			$(".updated").slideUp(function() {
				$(".updated").remove();
			});
			$(".error").slideUp(function() {
				$(".error").remove();
			});
		  
		}, 10000);
	}
	popAlertMsg();
	
	if(jQuery().fancybox) {
		$('a[rel*=facybox]').fancybox();
		$('a[rel*=facybox_s]').fancybox();
	}

	
	//plugins.php
	$(".toggleEnable").live("click", function($e) {
		$e.preventDefault();
		loadingAjaxIndicator.show();
		var message = $(this).attr("title");
		var dlink = $(this).attr("href");
		var mytd=$(this).parents("td");
		var mytr=$(this).parents("tr");
  	mytd.find('a').toggleClass('hidden');
  	mytr.toggleClass('enabled');
  	mytr.toggleClass('disabled');
  	$.ajax({
       type: "GET",
       url: dlink,
       success: function(response){
	        $('#header').load(location.href+' #header');
	        $('#sidebar').load(location.href+' #sidebar');
	        $('#maincontent').load(location.href+' #maincontent');
	     }
	  });
	  loadingAjaxIndicator.fadeOut();
	});
	
		
	// edit.php
	if ( $("#edit input#post-title:empty").val() == '' ) {
		$("#edit input#post-title").focus();
	}
	$("#metadata_toggle").live("click", function($e) {
		$e.preventDefault();
		$("#metadata_window").slideToggle('fast');
		$(this).toggleClass('current');
	});
	
	var privateLabel = $("#post-private-wrap label");
	$("#post-private").change(function(){
	  if ($(this).is(":checked")) { 
	  	privateLabel.css("color", '#cc0000');
	  } else {
	    privateLabel.css("color", '#333333'); 
	  }
	});
	if ($("#post-private").is(":checked")) { 
  	privateLabel.css("color", '#cc0000');
  } else {
    privateLabel.css("color", '#333333'); 
  }
	$("#post-menu-enable").live("click", function() {
      $("#menu-items").slideToggle("fast");
	});
  if ($("#post-menu-enable").is(":checked")) { 
  } else {
     $("#menu-items").css("display","none");
  }
  
  var edit_line = $('#submit_line span').html();
  $('#js_submit_line').html(edit_line);
  $("#js_submit_line input.submit").live("click", function() {
      $("#submit_line input.submit").trigger('click');
	});
  
  
  // pages.php
  $("#show-characters").live("click", function() {
  	 $(".showstatus").toggle();
  	 $(this).toggleClass('current');
  });
  
  
  // log.php
  if(jQuery().reverseOrder) {
	  $('ol.more li').reverseOrder(); 
	} 
  $("ol.more").each(function() {
    $("li:gt(4)", this).hide(); /* :gt() is zero-indexed */
    $("li:nth-child(5)", this).after("<li class='more'><a href='#'>More...</a></li>"); /* :nth-child() is one-indexed */
  });
  $("li.more a").live("click", function($e) {
    $e.preventDefault();
    var li = $(this).parents("li:first");
    li.parent().children().show();
    li.remove();
  });
  
   
  // theme-edit.php
 	$("#theme-folder").change(function(){
    var thmfld = $(this).val();
	  $.ajax({
       type: "GET",
       url: "inc/ajax.php?dir="+thmfld,
       success: function(response){
         $("#themefiles").html(response);
	     }
	  });
	});


	//title filtering on pages.php & backups.php
	var filterSearchInput = $("#filter-search");
	$('#filtertable').live("click", function($e) {
		$e.preventDefault();
		filterSearchInput.slideToggle();
		$(this).toggleClass('current');
		filterSearchInput.find('#q').focus();
	});
	$("#filter-search #q").keydown(function($e){
		if($e.keyCode == 13) {
			$e.preventDefault();
		}
	});
	$("#editpages tr:has(td.pagetitle)").each(function(){
   var t = $(this).find('td.pagetitle').text().toLowerCase();
   $("<td class='indexColumn'></td>").hide().text(t).appendTo(this);
 	});
	$("#filter-search #q").keyup(function(){
		var s = $(this).val().toLowerCase().split(" ");
		$("#editpages tr:hidden").show();
		$.each(s, function(){
    	$("#editpages tr:visible .indexColumn:not(:contains('" + this + "'))").parent().hide();
 		});
	});
	$("#filter-search .cancel").live("click", function($e) {
		$e.preventDefault();
		$("#editpages tr").show();
		$('#filtertable').toggleClass('current');
		filterSearchInput.find('#q').val('');
		filterSearchInput.slideUp();
	});
	
	
	//create new folder in upload.php
	var newFolderDiv = $("#new-folder");
	$('#createfolder').live("click", function($e) {
		$e.preventDefault();
		newFolderDiv.find("form").show();
		$(this).hide();
		newFolderDiv.find('#foldername').focus();
	});
	$("#new-folder .cancel").live("click", function($e) {
		$e.preventDefault();
		newFolderDiv.find("#foldername").val('');
		newFolderDiv.find("form").hide();
		$('#createfolder').show();
	});
	
	// upload.php ajax folder creation
	$('#new-folder form').submit(function() {
		loadingAjaxIndicator.show();
		var dataString = $(this).serialize();
		var newfolder = $('#foldername').val();
		var hrefaction = $(this).attr('action');
	  $.ajax({
       type: "GET",
       data: dataString,
       url: hrefaction,
       success: function(response){
       		$('#imageTable').load(location.href+' #imageTable', function() {
						attachFilterChangeEvent();
						newFolderDiv.find("#foldername").val('');
						newFolderDiv.find("form").hide();
						$('#createfolder').show();
        	  counter=parseInt($("#pg_counter").text());
		        $("#pg_counter").html(counter++);
						$("tr."+newfolder+" td").css("background-color", "#F9F8B6");
						loadingAjaxIndicator.fadeOut();
					});
       }
    });
		return false;
	});
	
//end of javascript for getsimple
}); 
