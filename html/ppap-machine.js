window.AudioContext = window.AudioContext || window.webkitAudioContext;  
var context = new AudioContext();


var getAudioBuffer = function(url, fn) {  
  var request = new XMLHttpRequest();
  request.responseType = 'arraybuffer';

  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      if (request.status === 0 || request.status === 200) {
        context.decodeAudioData(request.response, function(buffer) {
          fn(buffer);
        });
      }
    }
  };

  request.open('GET', url, true);
  request.send('');
};


var playSound = function(buffer, time) {
  var source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start(time);
};


var sample1 = null;
var sample2 = null;
var sample3 = null;
var sample4 = null;
var sample5 = null;
var sample6 = null;
var sample7 = null;


// main
window.onload = function() {
  getAudioBuffer('PPAP-1.wav', function(buffer1) {
    sample1 = buffer1;
  });
  getAudioBuffer('PPAP-4.wav', function(buffer2) {
    sample2 = buffer2;
  });
  getAudioBuffer('PPAP-3-P1.wav', function(buffer3) {
    sample3 = buffer3;
  });
  getAudioBuffer('PPAP-3-PA.wav', function(buffer4) {
    sample4 = buffer4;
  });
  getAudioBuffer('PPAP-3-AP.wav', function(buffer5) {
    sample5 = buffer5;
  });
  getAudioBuffer('PPAP-3-P2.wav', function(buffer6) {
    sample6 = buffer6;
  });
  getAudioBuffer('PPAP-5.wav', function(buffer78) {
    sample7 = buffer78;
  });


    btn1.onclick = function() {
	playSound(sample1, 0);
    };
    btn2.onclick = function() {
	playSound(sample2, 0);
    };
    btn3.onclick = function() {
	playSound(sample3, 0);
    };
    btn4.onclick = function() {
	playSound(sample4, 0);
    };
    btn5.onclick = function() {
	playSound(sample5, 0);
    };
    btn6.onclick = function() {
	playSound(sample6, 0);
    };
    btn78.onclick = function() {
	playSound(sample7, 0);
    };
    
    document.onkeydown = function(e) {
        var keyCode = false;
        
        if (e) {
            event = e;
        }
        
        if (event) {
            if (event.keyCode) {
                keyCode = event.keyCode;
            } else if (event.which) {
                keyCode = event.which;
            }
        }
        
        if (keyCode == 81 // Q
            || keyCode == 0x37 // 7
           ) {
            playSound(sample1, 0);
        } else if (keyCode == 87 // W
                   || keyCode == 0x38 // 8
                  ) {
            playSound(sample2, 0);
        } else if (keyCode == 69 // E
                   || keyCode == 0x39 // 9
                  ) {
            playSound(sample3, 0);
        } else if (keyCode == 65 // A
                   || keyCode == 0x34 // 4
                  ) {
            playSound(sample4, 0);
        } else if (keyCode == 83 // S
                   || keyCode == 0x35 // 5
                  ) {
            playSound(sample5, 0);
        } else if (keyCode == 68 // D
                   || keyCode == 0x36 // 6
                  ) {
            playSound(sample6, 0);
        } else if (keyCode == 90 // Z
                   || keyCode == 88 // X
                   || keyCode == 67 // C
                   || keyCode == 0x31 // 1
                   || keyCode == 0x32 // 2
                   || keyCode == 0x33 // 3
                   || keyCode == 0x20 // SPC
                  ) {
            playSound(sample7, 0);
        }
    };

};
