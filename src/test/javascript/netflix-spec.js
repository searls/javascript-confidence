describe("netflix", function() {  
  describe(".sortQueue", function() {
    var $reminder;
    beforeEach(function() {
      $reminder = $('');
      spyOn(netflix, "alphabetizeTitles");
      spyOn(netflix, "renderReminderToClickUpdateButton").andReturn($reminder);
      spyOn($.fn,'scrollWindow');
      
      netflix.sortQueue();
    });
    
    it("alphabetizes the titles", function() {
      expect(netflix.alphabetizeTitles).toHaveBeenCalled();
    });
    
    it("renders reminder button", function() {
      expect(netflix.renderReminderToClickUpdateButton).toHaveBeenCalled();
    });
    
    it("scrolls the window to the reminder", function() {
      expect($.fn.scrollWindow).toHaveBeenCalledWith({
        offset: 10,
        speed: 200
      });
    });
    
  });
  
  describe(".alphabetizeTitles", function() {
    context("a queue with 'Zoro' followed by 'Alien'", function() {
      var $table,$zoro,$alien;
      beforeEach(function() {
        $table = $.jasmine.inject('<table id="qbody"></table>');    
        $zoro = $('<tr><td><input class="o" value="1" /><a class="mdpLink">Zoro</a></td></tr>').appendTo($table);
        $alien = $('<tr><td><input class="o" value="2" /><a class="mdpLink">Alien</a></td></tr>').appendTo($table);
        
        netflix.alphabetizeTitles();
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
    });
  });
  
  describe(".renderReminderToClickUpdateButton", function() {
    var $reminder;
    beforeEach(function() {
      spyOn($.fn, "fadeIn");
      $.jasmine.inject('<input value="Update Instant Queue"/>');    
      
      $reminder = netflix.renderReminderToClickUpdateButton();
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
    
    describe("~ styling the reminder", function() {
    
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
      
      //but it's more fun to write a custom matcher that uses the $.fn.css() method
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


describe("$.fn", function() {
  
  describe("#scrollWindow", function() {
    var REMINDER_HEIGHT = 456,
        OFFSET = 10,
        SPEED = 250,
        animateCall,
        $node,
        result;
    beforeEach(function() {
      $node = $('<div></div>');
      spyOn($.fn, "animate");
      spyOn($.fn, "offset").andReturn({ top: REMINDER_HEIGHT});

      result = $node.scrollWindow({
        offset: OFFSET,
        speed: SPEED
      });
    });
    
    it("animates on 'html, body' for great IE justice", function() {
      expect(animateCall().object.selector).toBe('html, body');
    });

    it("sets the scroll top to 10 pixels higher than the reminder div", function() {
      expect(animateCall().args[0].scrollTop).toBe(REMINDER_HEIGHT - OFFSET);
    });
    
    it("animates at the specified speed", function() {
      expect(animateCall().args[1]).toBe(SPEED);
    });
    
    it("returns the passed argument (to enable chaining)", function() {
      expect(result[0]).toBe($node[0]);
    });
    
    var animateCall = function() {
      return $.fn.animate.mostRecentCall;
    };
  });
  
  describe("#lexicalSort", function() {
    var result;
    
    context("sorting ` b`,`a`, and `c`", function() {
      beforeEach(function() {
        result = $('<li> b</li><li>a</li><li>c</li>').lexicalSort();
      });

      it("puts 'a' first", function() {
        expect($(result[0])).toHaveText('a')
      });
      
      it("puts 'b' second", function() {
        expect($(result[1])).toHaveText(' b')
      });
      
      it("puts 'c' third", function() {
        expect($(result[2])).toHaveText('c')
      });
      
    });

  });
  
});