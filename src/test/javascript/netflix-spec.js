describe("netflix", function() {
  var $table, $updateButton
  beforeEach(function() {
    $table = $.jasmine.inject('<table id="qbody"></table>');
    $updateButton = $.jasmine.inject('<input value="Update Instant Queue"/>');    
  });
  
  describe(".sortQueue", function() {
    context("a queue with 'Zoro' followed by 'Alien'", function() {
      var $zoro,$alien;
      beforeEach(function() {
        spyOn($.fn, "fadeIn");
        
        $zoro = $('<tr><td><input class="o" value="1" /><a class="mdpLink">Zoro</a></td></tr>').appendTo($table);
        $alien = $('<tr><td><input class="o" value="2" /><a class="mdpLink">Alien</a></td></tr>').appendTo($table);
        
        netflix.sortQueue();
      });
      
      it("assigns 'Alien' a lower position than 'Zoro'", function() {
        expect($alien.find('input').val()).toBeLessThan($zoro.find('input').val());
      });
      
      it("moves the 'Alien' HTML table row above that of 'Zoro'", function() {        
        expect($table.find('tr:first')).toHaveText($alien.text());
      });
      
      it("starts counting sorted rows at 1 (not zero)", function() {
        expect($alien.find('input')).toHaveValue(1);
      });
      
      describe("~ inserting the reminder span", function() {
        var $reminder;
        beforeEach(function() {
          $reminder = $updateButton.prev();
        });
        
        it("is inserted in the DOM immediately previous to the update button", function() {
          expect($reminder).toExist();
        });
        
        it("has class 'reminder'", function() {
          expect($reminder).toHaveClass('reminder');
        });
        
        it("contains a message to remind the user to click Update", function() {
          expect($reminder).toHaveText('<--  Now remember to click update!');
        });
        
        it("fades in slowly", function() {
          expect($.fn.fadeIn).toHaveBeenCalledWith(1400);
        });

        it("fades in the reminder span", function() {
          var $valueOfThisWhenLastFadedIn = $.fn.fadeIn.mostRecentCall.object;
          expect($valueOfThisWhenLastFadedIn[0]).toBe($reminder[0]);
        });
        
        describe("styling the reminder", function() {
        
          //We _could_ verify parts of the style attr directly
          it("specifies line height as 1.3 times font size", function() {
            expect($reminder.attr('style')).toContain('line-height: 1.3');
          });
          
          it("is floated right", function() {
            expect($reminder.attr('style')).toContain('float: right');
          });
          
          it("has a red background", function() {
            expect($reminder).toHaveStyle('background-color','rgb(255, 0, 0)');
          });
          
          //Or we could write a custom matcher that uses the $.fn.css() method
          it("has font size 20px", function() {
            expect($reminder).toHaveStyle('font-size','20px');
          });
          
          it("has white text", function() {
            expect($reminder.attr('style')).toContain('color: white');
          });
  
          it("has some left margin", function() {
            expect($reminder).toHaveStyle('margin-left','20px');
          });

          //Or we could use even more descriptive matchers to describe the behavior we want
          it("is initially hidden", function() {
            expect($reminder).not.toBeVisible();
          });
          
        });
        

        
      });
    });
  });
});