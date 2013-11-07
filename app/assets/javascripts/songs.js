$(document).ready(function(){
  //   $('#new_song').submit(function(event){
	 // event.preventDefault();
	 // sendForm();
  //   });


	$('#new_link').click(function(event){
	// var url = $('#new_link').href
	event.preventDefault();

	$.ajax({
		url: '/songs/new',
		dataType: 'script',
		success: function(data){
			console.log(data);
			alert(data);
		}
	});
});

// var sendForm = function(){
// 	var formData = {};
// 	formData.name = $('#song_name').val();
// 	formData.duration = $('#song_duration').val();
// 	formData.price = $('#song_price').val();
// 	$.ajax({
// 		url: '/songs',
// 		type: 'POST',
// 		data: formData,
// 		success: function(data){
// 			console.log(data);
// 			alert(data);
// 		}
// 	});
// };
});
