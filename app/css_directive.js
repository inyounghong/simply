app.directive('parseStyle', function($interpolate) {
    return function(scope, elem) {
        var exp = $interpolate(elem.html()),
            watchFunc = function () { return exp(scope); };

        scope.$watch(watchFunc, function (html) {
            elem.html(html);
        });
    };
});

app.directive("formOnChange", function($parse, $interpolate){
  return {
    require: "form",
    link: function(scope, element, attrs){
      var cb = $parse(attrs.formOnChange);
      element.on("change", function(){
        cb(scope);
      });
    }
  };
});