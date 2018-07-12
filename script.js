$(document).ready(() => {
  var isItOn = false;
  var isItStrict;
  var addToSeries;
  var checkingSeries;
  var series = [];
  var playerSeries = [];
  var counter = 0;
  
  $("#on-off").on('click', () => {
    if(!isItOn) {
      isItOn = true;
      $("#count").css("color", "red");
      addToSeries = true;
      isItStrict = false;
    } else {
      isItOn = false
      series = [];
      playerSeries = [];
      $("#count").html("--");
      $("#count").css("color", "rgba(255,0,0,0.05)");
      $("#check-strict").css("background", "black");
    }
  });
  
  $("#strict").on('click', () => {
    if(!isItOn) { return null; }
    isItStrict = isItStrict ? false : true;
    isItStrict ? $("#check-strict").css("background", "red") : $("#check-strict").css("background", "black");
  });
  
  $("#start").on('click', () => {
    if(!isItOn) { return null; }
    
    $("#count").html("--");
    series = [];
    playerSeries = [];
    $.when(flashCount()).done((flash) => {
      series = addOneToSeries(series);
    });
  });
  
  $("#0").on('click', () => {
    if(!isItOn || addToSeries || checkingSeries) { return null; }
    flashPad(0);
    checkingSeries = true;
    if(series[counter++] !== 0) {
      flashError(series);
    } else if(playerSeries.length < counter) {
      playerSeries.push(0);
    }
    if(series.length === playerSeries.length) {
      $.when(checkPlayerSeries(series, playerSeries)).done((check) => {
        if(check === 'error') {
          flashError(series);
        } else if(check === 'end game') {
          flashGameEnd();
        } else {
          series = addOneToSeries(series);
        }
      });
    } else {
      checkingSeries = false;
    }
  });
  $("#1").on('click', () => {
    if(!isItOn || addToSeries || checkingSeries) { return null; }
    flashPad(1);
    checkingSeries = true;
    if(series[counter++] !== 1) {
      flashError(series);
    } else if(playerSeries.length < counter) {
      playerSeries.push(1);
    }
    if(series.length === playerSeries.length) {
      $.when(checkPlayerSeries(series, playerSeries)).done((check) => {
        if(check === 'error') {
          flashError(series);
        } else if(check === 'end game') {
          flashGameEnd();
        } else {
          series = addOneToSeries(series);
        }
      });
    } else {
      checkingSeries = false;
    }
  });
  $("#2").on('click', () => {
    if(!isItOn || addToSeries || checkingSeries) { return null; }
    flashPad(2);
    checkingSeries = true;
    if(series[counter++] !== 2) {
      flashError(series);
    } else if(playerSeries.length < counter) {
      playerSeries.push(2);
    }
    if(series.length === playerSeries.length) {
      $.when(checkPlayerSeries(series, playerSeries)).done((check) => {
        if(check === 'error') {
          flashError(series);
        } else if(check === 'end game') {
          flashGameEnd();
        } else {
          series = addOneToSeries(series);
        }
      });
    } else {
      checkingSeries = false;
    }
  });
  $("#3").on('click', () => {
    if(!isItOn || addToSeries || checkingSeries) { return null; }
    flashPad(3);
    checkingSeries = true;
    if(series[counter++] !== 3) {
      flashError(series);
    } else if(playerSeries.length < counter) {
      playerSeries.push(3);
    }
    if(series.length === playerSeries.length) {
      $.when(checkPlayerSeries(series, playerSeries)).done((check) => {
        if(check === 'error') {
          flashError(series);
        } else if(check === 'end game') {
          flashGameEnd();
        } else {
          series = addOneToSeries(series);
        }
      });
    } else {
      checkingSeries = false;
    }
  });
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async function flashCount() {
    $("#count").css("color", "rgba(255,0,0,0.05)");
    await sleep(250);
    $("#count").css("color", "red");
    await sleep(250);
    $("#count").css("color", "rgba(255,0,0,0.05)");
    await sleep(250);
    $("#count").css("color", "red");
    await sleep(400);
    return null;
  }
  
  async function flashPad(pad) {
    $("#" + pad).addClass("highlight");
    $("#audio" + pad)[0].play();
    await sleep(100);
    $("#" + pad).removeClass("highlight");
  }
  
  async function flashSeries(series) {
    await sleep(200);
    for(var i = 0; i < series.length; i++) {
      if(!isItOn) { break; }
      $("#" + series[i]).addClass("highlight");
      $("#audio" + series[i])[0].play();
      await sleep(650);
      $("#" + series[i]).removeClass("highlight");
      await sleep(200);
    }
    checkingSeries = false;
    addToSeries = false;
    counter = 0;
    return null;
  }
  
  function flashError(series) {
    $("#count").html("!!");
    $.when(flashCount()).done(() => {
      let count = series.length;
      if(count < 10) { count = "0" + count }
      $("#count").html(count);
      if(isItStrict) {
        $("#start").trigger('click');
      } else {
        flashSeries(series);
      }
    });
    
  }
  
  function flashGameEnd() {
    $("#count").html("**");
    flashCount();
    return null;
  }
  
  function addOneToSeries(series) {
    addToSeries = true;
    function copySeries(series) {
      let copy = [];
      for(var i = 0; i < series.length; i++) {
        copy[i] = series[i];
      }
      return copy;
    }
    
    let newSeries = copySeries(series);
    let num = Math.floor(Math.random() * 4);
    newSeries.push(num);
    let count = newSeries.length;
    if(count < 10) { count = "0" + count; }
    $("#count").html(count);
    flashSeries(newSeries);
    return newSeries;
  }
  
  async function checkPlayerSeries(series1, series2) {
    for(var i = 0; i < series1.length; i++) {
      if(series1[i] !== series2[i]) {
        return 'error'
      }
    }
    if(series.length === 20) {
      return 'end game';
    } else {
      await sleep(1500);
      checkingSeries = false;
      return 'next step';
    }
  }
});