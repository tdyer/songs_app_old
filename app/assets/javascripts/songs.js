$(document).ready(function(){
  // Need to use delegate here as the form with id='new_song' is 
  // *not* available when the page is loaded. This form is inserted into 
  // the page when clicking the "New Song" link.
  $('#new_song_form_container').delegate('#new_song',"submit", function(event){
  	event.preventDefault();
  	var formData = {song: {name: '', duration: '', price: ''}};
  	formData.song.name = $('#song_name').val();
  	formData.song.duration = $('#song_duration').val();
  	formData.song.price = $('#song_price').val();
  	$.ajax({
  		url: '/songs',
  		type: 'POST',
  		dataType: 'script',
  		data: formData,
  		success: function(data){
  			console.log(data);
  			$('#new_song').remove();
  		}
  	})
  });

  $('#new_link').click(function(event){
	 event.preventDefault();
	 $.ajax({
	   url: '/songs/new',
	   dataType: 'script',
	 	 success: function(data){
	 		event.preventDefault();
	 		console.log(data);
	 	}
	 });
  });
});

