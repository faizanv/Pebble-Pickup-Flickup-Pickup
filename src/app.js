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


Accel.on('tap', newPickupLine);

function newPickupLine() {
  Vibe.vibrate('short');
  var loading = new UI.Card({
    title:'Chill I am loading'
  });
  loading.show();
  // Get information
  
  var line = new UI.Card({
        title: "",
        body: "Flick again",
        scrollable: true
      });
  
  ajax(
    { url: 'https://pebble-pickup.herokuapp.com/tweets/random'},
    function(data) {
      //var size = data.results.length;
      //var index = Math.floor(Math.random()*(size));
      console.log(data);
      data = JSON.parse(data);
      line.hide();
      line = new UI.Card({
        title: data.tweet,
        body: "Flick again",
        scrollable: true
      });
      loading.hide();
      line.show();
    }, function(error) {
      console.log('error');
      loading.subtitle('error loading pickup line');
    });  
}