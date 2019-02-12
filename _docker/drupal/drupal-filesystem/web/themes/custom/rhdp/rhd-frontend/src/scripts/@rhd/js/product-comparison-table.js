$(function() {
  if ($('.assembly-type-product_comparison_table').length) {

    $('#left-button').hide();

    //left scrolling button action
    $('#left-button').click(function(){

      $('#right-button').show();   
      $("#content").animate({scrollLeft: "-=228px"}, "slow", function(){
        if($('#content').scrollLeft() <= 0){
          $('#left-button').hide();
        }
      });
    });

    //rightscrolling  button action
    $('#right-button').click(function(){
      $('#left-button').show(); 

      $("#content").animate({scrollLeft: "+=228px"}, "slow", function(){
        if ($('#content')[0].scrollWidth - $('#content').scrollLeft() == $('#content').width()){
          $("#right-button").hide();
        }
      });
    });
  }
});
