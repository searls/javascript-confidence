/* Types in the alphabetical order of a user's netflix queue into the little input boxes
*  on the left side of each row. 
*****/
(function($){
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
})(jQuery)