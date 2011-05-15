/* Types in the alphabetical order of a user's netflix queue into the little input boxes
*  on the left side of each row. 
*****/
(function($){
  window.netflix = {
    sortQueue: function() {
      alphabetizeTitles();
      $('<span class="reminder"><--  Now remember to click update!</span>').insertBefore('input[value="Update Instant Queue"]').css({'line-height':'1.3','font-size':'20px','float':'right','background-color':'red',color:'white','margin-left':'20px',display:'none'}).fadeIn(1400)
      $('html, body').animate({
        scrollTop: $(".reminder").offset().top - 10
      }, 200);      
    }
  };
  
  var alphabetizeTitles = function() {
    $.each(sortTitlesInAlphaOrder(),applyOrder);
  };
  
  var sortTitlesInAlphaOrder = function() {
    return $('#qbody tr a.mdpLink').contents().toArray().sort(lexicalNodeComparator);
  };
  
  var applyOrder = function(index,textNode) {
    var $row = $(textNode).closest('tr');
    $row.find('input.o').val(index+1);
    $row.appendTo('#qbody');
  };
  
  var lexicalNodeComparator = function(left,right){ 
    var LEFT_IS_GREATER = 1,
        RIGHT_IS_GREATER = -1;
    if($.trim($(left).text()) > $.trim($(right).text())) {
      return LEFT_IS_GREATER;
    } else {
      return RIGHT_IS_GREATER;
    } 
  };
  
})(jQuery)