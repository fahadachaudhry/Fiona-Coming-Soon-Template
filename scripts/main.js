$(document).ready(function(){
  const maxBlobs = 30;
  let generatedBlobHtml = [];
  for(let i = 0 ; i < maxBlobs; i++){
    generatedBlobHtml.push(`<div class="blob blur-${Math.floor(Math.random() * (3 - 1) + 1)} size-${Math.floor(Math.random() * (3 - 1) + 1)}"></div>`);
  }
  $('.blob-container').html(generatedBlobHtml.join(''));
  animateDiv();
});

function makeNewPosition(){
  // Get viewport dimensions (remove the dimension of the div)
  var h = $(window).height();
  var w = $(window).width();
  var nh = Math.floor((Math.random() * h));
  var nw = Math.floor((Math.random() * w));
  return [nh,nw];    
}

function animateDiv(){
  var blobArray = $('.blob-container').children();
  for( let i = 0 ; i < blobArray.length; i++){
    var newq = makeNewPosition();
    var oldq = $(blobArray[i]).offset();
    var speed = calcSpeed([oldq.top, oldq.left], newq);
    
    $(blobArray[i]).animate({ top: newq[0], left: newq[1] }, speed, function(){
      animateDiv();        
    });
  }
};

function calcSpeed(prev, next) {
  var x = Math.abs(prev[1] - next[1]);
  var y = Math.abs(prev[0] - next[0]);
  var greatest = x > y ? x : y;
  var speedModifier = 0.05;
  var speed = Math.ceil(greatest/speedModifier);
  return speed;
}