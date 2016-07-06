define([ "jquery", "message-bus" ], function($, bus) {

   bus.listen("ui-show", function(e, id) {
      $("#" + id).show();
   });
   bus.listen("ui-hide", function(e, id) {
      $("#" + id).hide();
   });
   bus.listen("ui-remove", function(e, id) {
      $("#" + id).remove();
   });
   bus.listen("ui-set-content", function(e, options) {
      $("#" + options.div).html(options.html);
   });
   bus.listen("ui-css", function(e, options) {
      $("#" + options.div).css(options.property, options.value);
   });
   bus.listen("ui-element:create", function(e, options) {
      var element;
      if (options.element) {
         element = $(options.element);
      } else {
         var parent = "body";
         if (options.parentDiv != null) {
            parent = "#" + options.parentDiv;
         }
         element = $("<" + options.type + "/>")//
         .appendTo(parent);

         if (options.div) {
            element.attr("id", options.div);
         }
      }
      element//
      .html(options.html)//
      .attr("class", "bricksui-" + options.type);
   });
   bus.listen("ui-choice-field:create", function(e, options) {
      var element;
      if (options.element) {
         element = $(options.element);
      } else {
         var parent = "body";
         if (options.parentDiv != null) {
            parent = "#" + options.parentDiv;
         }
         element = $("<select/>").appendTo(parent);

         if (options.div) {
            element.attr("id", options.div);
         }
      }
      element//
      .attr("class", "bricksui-select")//
      .on("change", function(event) {
         if (options.changeEventName) {
            bus.send(options.changeEventName, [ element.val() ]);
         }
      });

      for (var i = 0; i < options.values.length; i++) {
         var value = options.values[i];
         $("<option/>").appendTo(element)//
         .attr("value", value.value)//
         .html(value.text);
      }
   });

   bus.listen("ui-button:create", function(e, options) {
      var element;
      if (options.element) {
         element = $(options.element);
      } else {
         var parent = "body";
         if (options.parentDiv != null) {
            parent = "#" + options.parentDiv;
         }
         element = $("<span/>").appendTo(parent)//
         .attr("id", options.div);
      }
      element//
      .html(options.text)//
      .attr("class", "bricksui-span-button")//
      .on("click", function(event) {
         event.stopPropagation();
         if (options.sendEventName) {
            bus.send(options.sendEventName, [ options.sendEventMessage ]);
         }
      })
   });

   bus.listen("ui-input-field:create", function(e, options) {
      var div = $("<div/>")//
      .appendTo("#" + options.parentDiv);

      $("<label/>")//
      .appendTo(div)//
      .html(options.text);

      var input = $("<input/>")//
      .attr("id", options.div)//
      .appendTo(div);

      input.on("input", function(e) {
         if (options.changeEventName) {
            bus.send(options.changeEventName, input.val());
         }
      });

      bus.listen(options.div + "-field-value-fill", function(e, message) {
         input.val(message);
      });
   });

   bus.listen("ui-text-area-field:create", function(e, options) {

      var input = $("<textarea/>")//
      .attr("id", options.div)//
      .appendTo("#" + options.parentDiv);

      input.on("input", function(e) {
         if (options.changeEventName) {
            bus.send(options.changeEventName, input.val());
         }
      });

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

   bus.listen("ui-key-listen", function(e, message) {
      if (message.div == null) {
         if (message.keydownEventName) {
            $(document).on("keydown." + message.keydownEventName, function(e) {
               bus.send(message.keydownEventName, [ e ]);
            });
         }
      } else {
         throw "only div==null supported";
      }
   });

   bus.listen("ui-key-unlisten", function(e, message) {
      if (message.div == null) {
         if (message.keydownEventName) {
            $(document).unbind("keydown." + message.keydownEventName);
         }
      } else {
         throw "only div==null supported";
      }
   });

});