
$(document).ready(function(){


   //Variable declaration
   var myDiv = $('.uxer');
   var myDiv_end = $('.uxer_end');

   //The offset is actually the position of an element compared
   //to the edges of the document itself (meaning the very top of the content and the very right;
   var position = $('.uxer').offset();

   var pos_right = "";
  var top_value = "";
  var initial_pos = false;
  var our_timeout = "";


   $( window ).resize(function() {
     character_move();
   });
  //Simple call to the scroll event listener (provided by jQuery)
  //whenever a scroll happens on the window element (everywhere)
  $( window ).scroll(function(){
     character_move();
  });

function character_move(){
     //This is just an arbitrary value to give an higher
     //threshold to our page scroll (the detection will happen faster if the offset is bigger)
     current_offset=80;



     var costume_position =  $('.uxer_end').offset();

     //We add an offset to match the costume. (the characters are a bit to the right)
     //NB. we declare this variable here since somebody could resize his window, therefore changing the right position of our element.
     top_value = $(window).scrollTop();
     pos_right = costume_position.right-10+"px";


     //Condition that checks if the scrollTop() value of the window
     //is bigger than our character offset.top, but smaller than our costume offset.top
     if($(window).scrollTop()+current_offset > position.top && $(window).scrollTop()+current_offset < costume_position.top
     ){

         if (initial_pos==false){
           //Remember that in css, a position "fixed" mean that the
           //element is fixed compared to the window, i.e. it's not going to move while you scroll.
           myDiv.css({
             "display": "block",
             "position": "absolute",
             "z-index":"0",
             "right":pos_right,
           });
           myDiv.animate({
             top: top_value,
           });

           initial_pos=true;
         }

         clearTimeout(our_timeout);

         our_timeout = setTimeout(function(){
         myDiv.animate({
           right: pos_right,
           top: top_value,
         });
         }, 200);

     }
     //Second condition, we want our character to stay in his clothes when he reaches them!
     //We check to see if the window scroll reaches the top of the costume and we "lock" our character in position.
     else if(
       $(window).scrollTop()+current_offset >= costume_position.top
     ){
       //The css position absolute is very usefull, it moves an
       //element compared to its first relative parent. If none are found, it uses the document itself.
       //Since our Character doesn't have a relative parent,
       //we give it a top value of the costume offset.top and a  value of the regular offset. of our character.
       myDiv.css({
         "display": "block",
         "position": "absolute",
         "right": pos_right,
         "margin-top": "35px",
         "z-index":"0",
       });
       myDiv.animate({
                       top: costume_position.top,

       });



       initial_pos=false;
     }
     //If our scrolling is back to the top of our character, we need to flush our custom css instructions
     //so he takes back his original place.
     else{
     myDiv.removeAttr( 'style' );
       initial_pos=false;
     }


}

});
