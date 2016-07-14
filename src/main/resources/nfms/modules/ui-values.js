define([ "jquery" ], function($) {

   function get(id) {
      var element = $("#" + id);
      if (element.attr("type") == "checkbox") {
         return element.is(":checked");
      } else {
         return element.val();
      }
   }

   function set(id, value) {
      var element = $("#" + id);
      if (element.attr("type") == "checkbox") {
         return element.prop("checked", value);
      } else {
         return element.val(value);
      }
   }

   return {
      "get" : get,
      "set" : set
   }
});