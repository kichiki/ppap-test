window.AudioContext = window.AudioContext || window.webkitAudioContext;  
var context = new AudioContext();

var button;


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


var randomize = function(array) {
  var n = array.length;  

  for (var i = 1; i < n; i++) {
    var r = Math.random();
    r *= (n - i);
    var j1 = Math.floor(r) + i;
    var x = array[i-1];
    array[i-1] = array[j1];
    array[j1] = x;
  }
}

var change_button_text = function(label) {
  button.textContent = label;
}
var append_button_text = function(label) {
  button.textContent += label;
}


// main
window.onload = function() {

  button = document.getElementById("btn_start");


  getAudioBuffer('PPAP-1.wav', function(buffer1) {
    sample1 = buffer1;
  });
  getAudioBuffer('PPAP-4-2.wav', function(buffer2) {
    sample2 = buffer2;
  });
  getAudioBuffer('PPAP-3-P1_.wav', function(buffer3) {
    sample3 = buffer3;
  });
  getAudioBuffer('PPAP-3-PA_.wav', function(buffer4) {
    sample4 = buffer4;
  });
  getAudioBuffer('PPAP-3-AP_.wav', function(buffer5) {
    sample5 = buffer5;
  });
  getAudioBuffer('PPAP-3-P2_.wav', function(buffer6) {
    sample6 = buffer6;
  });
  getAudioBuffer('PPAP-5.wav', function(buffer78) {
    sample7 = buffer78;
  });
};


var start = function() {
  button.disabled = true;

  // We'll start playing the rhythm 100 milliseconds from "now"
  var startTime = context.currentTime + 0.100;

  var bar = 1.762; // duration for 1 bar
  var eighthNoteTime = bar / 8;


  // initialization
  var ppap = new Array(4);
  for(var i = 0; i < 4; i++)
  {
    ppap[i] = i;
  }
    
  var time = startTime;

  // intro
  setTimeout(function(){ change_button_text("（PPAP）")}, (time + bar * 1.5 - context.currentTime) * 1000);
  playSound(sample1, time);
  time = time + bar * 2;

  // theme
  setTimeout(function(){ change_button_text("（レッツビギーン）")}, (time - context.currentTime) * 1000);
  playSound(sample2, time);
  time = time + bar;

  while (1) {
    var status = 0;

    randomize(ppap);
    setTimeout(function(){ change_button_text("")}, (time - context.currentTime) * 1000 - 10);
    for (var i = 0; i < 4; i++) {
      if (ppap[i] == 0) {
        // pen
	setTimeout(function(){ append_button_text("ペン")}, (time - context.currentTime) * 1000);
        playSound(sample3, time);
        time = time + eighthNoteTime;
      } else if (ppap[i] == 1) {
        // pineapple
	setTimeout(function(){ append_button_text("パイナポー")}, (time - context.currentTime) * 1000);
        playSound(sample4, time);
        time = time + eighthNoteTime * 3;
      } else if (ppap[i] == 2) {
        // apple
	setTimeout(function(){ append_button_text("アポー")}, (time - context.currentTime) * 1000);
        playSound(sample5, time);
        time = time + eighthNoteTime * 2;
      } else if (ppap[i] == 3) {
        // pen
	setTimeout(function(){ append_button_text("ペーン")}, (time - context.currentTime) * 1000);
        playSound(sample6, time);
        time = time + eighthNoteTime * 2;
      } else {
        // piko
	setTimeout(function(){ append_button_text("ピコ")}, (time - context.currentTime) * 1000);
        playSound(sample7, time);
        time = time + eighthNoteTime * 2;
      }
    }

    // PPAP test
    if (ppap[0] == 0 &&
        ppap[1] == 1 &&
        ppap[2] == 2 &&
        ppap[3] == 3) {
        break;
    }

    // theme
    setTimeout(function(){ change_button_text("（トライアゲーン）")}, (time - context.currentTime) * 1000);
    playSound(sample2, time);
    time = time + bar;

  }

  // piko
  setTimeout(function(){ change_button_text("\\(^O^)/")}, (time - context.currentTime) * 1000);
  playSound(sample7, time);
  time = time + eighthNoteTime * 2;


  setTimeout(function(){ change_button_text("スタート")}, (time + bar - context.currentTime) * 1000);
  setTimeout(function(){ button.disabled = false;}, (time + bar - context.currentTime) * 1000);
};
