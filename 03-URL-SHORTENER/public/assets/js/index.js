$(document).ready( () => {
	$("form").submit( (e) =>{
	    e.preventDefault();

    let inputURL = $("#inputURL").val();

	if(inputURL){
		location.href = '/new/' + inputURL;
	}

	});
});