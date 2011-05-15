(function(){
  window.context = window.describe;
  window.xcontext = window.xdescribe;
  
  beforeEach(function() {
    this.addMatchers({
      toHaveStyle: function(styleAttr,styleVal) {
        var actual = $(this.actual).css(styleAttr);
        this.message = function() {
          return 'expected '+$(this.actual)[0].outerHTML+' to have value "'+styleVal+'"'+
                  ' for CSS property "'+styleAttr+'", but was actually "'+actual+'"';
        }
        return this.env.equals_(actual,styleVal);
      }
    });
  });
})();