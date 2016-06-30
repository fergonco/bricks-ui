define([ "jquery" ], function($) {

   function get(id) {
      var element = $("#" + id);
      return element.val();
   }
   
   function set(id, value) {
      var element = $("#" + id);
      return element.val(value);
   }

   return {
      "get" : get,
      "set" : set
   }
});