/* Types in the alphabetical order of a user's netflix queue into the little input boxes
*  on the left side of each row. 
*****/
(function($){
  window.netflix = {
    sortQueue: function() {
      $.each(
          $('#qbody tr a.mdpLink').contents().toArray().sort(
            function(a,b){ 
              return a.nodeValue > b.nodeValue ? 1 : -1; 
            }
          ),
          function(i,e){ 
            $(this).closest('tr').find('input.o').val(i+1).closest('tr').appendTo('#qbody')
          }
        );
      $('<span class="reminder"><--  Now remember to click update!</span>').insertBefore('input[value="Update Instant Queue"]').css({'line-height':'1.3','font-size':'20px','float':'right','background-color':'red',color:'white','margin-left':'20px',display:'none'}).fadeIn(1400)
      $('html, body').animate({
        scrollTop: $(".reminder").offset().top - 10
      }, 200);      
    }
  };
})(jQuery)