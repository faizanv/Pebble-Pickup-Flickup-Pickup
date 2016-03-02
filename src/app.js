var UI = require('ui');
var ajax = require('ajax');
var Accel = require('ui/accel');
var Vibe = require('ui/vibe');

Accel.init();

// Create a Card with title and subtitle
var card = new UI.Card({
  title:'Flick your wrist',
  subtitle: 'For Mad Game'
});
card.show();


var line = new UI.Card({
        body: "Flick again",
        scrollable: true
      });
//var flag = false;
Accel.on('tap', newPickupLine);

function newPickupLine() {
  Vibe.vibrate('short');
  var loading = new UI.Card({
    title:'Chill I am loading'
  });
  line.hide();
  loading.show();
  // Get information
  
  ajax(
    { url: 'http://pebble-pickup.faizanv.xyz/tweets/random'},
    function(data) {
      //var size = data.results.length;
      //var index = Math.floor(Math.random()*(size));
      console.log(data);
      data = JSON.parse(data);
      line.hide();
      line.title(data.tweet);
      loading.hide();
//       if (!flag) {
//         flag = true;
//         line.show();
//       }
      line.show();
    }, function(error) {
      console.log('error');
      loading.subtitle('error loading pickup line');
    });  
}