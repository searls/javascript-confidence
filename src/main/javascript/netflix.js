/* Types in the alphabetical order of a user's netflix queue into the little input boxes
*  on the left side of each row. 
*****/
(function($){
  window.netflix = {
    sortQueue: function() {
      alphabetizeTitles();
      var $reminder = renderReminderToClickUpdateButton();
      scrollTo($reminder);
    }
  };
  
  //Alphabetizing stuff -- to be grouped somehow later.
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
  
  //Reminder-rendering stuff
  renderReminderToClickUpdateButton = function() {
    var $reminder = prependReminder('<--  Now remember to click update!');
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
    fadeIn($reminder);
  };
  
  var prependReminder = function(message) {
    var $updateButton = $('input[value="Update Instant Queue"]');
    return $('<span class="reminder">'+message+'</span>').insertBefore($updateButton);
  };
  
  var fadeIn = function(node) {
    $(node).hide().fadeIn(1400);
  };
  
  //Scrolling
  var scrollTo = function(node) {
    $('html, body').animate({
      scrollTop: $(node).offset().top - 10
    }, 200);
  };
  
})(jQuery)