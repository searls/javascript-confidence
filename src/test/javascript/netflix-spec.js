describe("netflix", function() {
  var $table, $updateButton
  beforeEach(function() {
    $table = $.jasmine.inject('<table id="qbody"></table>');
    $updateButton = $.jasmine.inject('<input value="Update Instant Queue"/>');    
  });
  
  describe(".sortQueue", function() {
    context("a queue with two items not in alphabetical order", function() {
      var $zoro,$alien;
      beforeEach(function() {
        $zoro = $('<tr><td><input class="o" value="1" /><a class="mdpLink">Zoro</a></td></tr>').appendTo($table);
        $alien = $('<tr><td><input class="o" value="2" /><a class="mdpLink">Alien</a></td></tr>').appendTo($table);
        
        netflix.sortQueue();
      });
      
      it("the item earlier in the alphabet gets assigned a lower position", function() {
        expect($alien.find('input').val()).toBeLessThan($zoro.find('input').val());
      });
    });
  });
});