/* Types in the alphabetical order of a user's netflix queue into the little input boxes
*  on the left side of each row. 
*****/
(function($){
  $.fn.scrollWindow = function(config) {
    $('html, body').animate({
      scrollTop: $(this).offset().top - config.offset
    }, config.speed);
    return $(this);    
  };
  
  window.netflix = {
    sortQueue: function() {
      this.alphabetizeTitles();
      var $reminder = this.renderReminderToClickUpdateButton();
      $reminder.scrollWindow({
        speed:200,
        offset:10
      });
    }, 
    alphabetizeTitles: function() {
      $.each(sortTitlesInAlphaOrder(),applyOrder);
    }, 
    renderReminderToClickUpdateButton: function() {
      var $reminder = prependReminder('<--  Now remember to click update!');
      styleReminder($reminder);
      fadeIn($reminder);
      return $reminder;
    }
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
  
  var prependReminder = function(message) {
    var $updateButton = $('input[value="Update Instant Queue"]');
    return $('<span class="reminder">'+message+'</span>').insertBefore($updateButton);
  };
  
  var styleReminder = function($reminder) {
    $reminder.css({
      //Position
      float: 'right',
      marginLeft: '20px',
      //Size
      fontSize: '20px',
      lineHeight: '1.3',
      //Color
      backgroundColor: 'red',
      color: 'white'
    });    
  }
  
  var fadeIn = function(node) {
    $(node).hide().fadeIn(1400);
  };
  
})(jQuery)