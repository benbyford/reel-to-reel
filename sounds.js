$(function() {
	var volume = 1;
	var playing = false;
	var paused = false;

    // add sounds to sounds array
    var currentAudio = "sounds/bg_music.ogg";
    var audio = new Audio();

	$svg = $('div.audio');

	// setup audio variable
	audio.playbackRate = 1;
	audio.loop = false;

	// onClick
	$svg.on('click',function(){
		// if already playing
		if(playing){
			console.log('Paused');
			// pause audio
			audio.pause();

			// svg
			downSpool();

			paused = true;
			playing = false;
		}else{
			if(paused){
				audio.play();

				// svg
				upSpool();

				paused = false;
				playing = true;
			}else{
				// load currentAudio
				audio.setAttribute("src", currentAudio);
			    audio.load();
			}
		}
	});

    // LISTENER ready
    audio.addEventListener('canplaythrough', function() {
        console.log('Can play audio');
        console.log('Audio duration: '+audio.duration);

		// svg
		upSpool();

		// play audio when loaded
		audio.play();

		playing = true;
    }, false);

    // LISTENER finished
    audio.addEventListener('ended', function() {
        console.log('Audio ended');

		// svg
		downSpool();
    }, false);

	$spoolY = parseFloat($('.spool').attr('cy'));
	var prevTape = $('.tape').attr('d');
	var newTape = 'M90.3,250.5c0,0,9,39.7,29.4,76.1c16.5,13.5,386.5,10.5,400.7-2c14.4-33.1,24.1-74.1,24.1-74.1';
	function upSpool(){

		$svg.addClass('playing');

		$('.spool').attr('cy',$spoolY - 14);
		$('.tape').attr('d',newTape);
	}
	function downSpool(){

		$svg.removeClass('playing');

		$('.spool').attr('cy',$spoolY);
		$('.tape').attr('d',prevTape);
	}
});
