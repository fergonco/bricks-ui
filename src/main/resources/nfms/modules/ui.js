define([ "jquery", "message-bus" ], function($, bus) {

   bus.listen("ui-button:create", function(e, options) {
      $("<span/>")//
      .appendTo("#" + options.parentDiv)//
      .html(options.text)//
      .attr("id", options.div)//
      .attr("class", "bricksui-span-button")//
      .on("click", function() {
         bus.send(options.sendEventName, [ options.sendEventMessage ]);
      })
   });

   bus.listen("ui-input-field:create", function(e, options) {
      var div = $("<div/>")//
      .attr("id", options.div)//
      .appendTo("#" + options.parentDiv);

      $("<label/>")//
      .appendTo(div)//
      .html(options.text);

      var input = $("<input/>")//
      .appendTo(div);

      if (options.changeListener) {
         input.on("input", function(e) {
            options.changeListener(input.val(), e);
         });
      }

      bus.listen(options.div + "-field-value-fill", function(e, message) {
         input.val(message);
      });
   });

   bus.listen("ui-progress:create", function(e, options) {
      var div = $("<div/>")//
      .attr("id", options.div)//
      .appendTo("#" + options.parentDiv);

      $("<label/>")//
      .appendTo(div)//
      .html(options.text);

      var input = $("<progress/>")//
      .attr("max", "100")//
      .appendTo(div);

      function updateTooltip(value) {
         if (options.tooltip) {
            var tooltip = options.tooltip(value);
            input.attr("title", tooltip != null ? tooltip : "");
         }
      }
      updateTooltip(input.attr("value"));

      bus.listen(options.div + "-field-value-fill", function(e, message) {
         input.attr("value", message);
         updateTooltip(input.attr("value"));
      });
   });

});