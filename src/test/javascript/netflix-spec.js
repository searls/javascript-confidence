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
    });
  });
});