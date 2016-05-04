$(document).ready(function () {

  function hide(){
    setTimeout( function(){
      $("#message").hide(500)
    }, 3000)
  }

  hide()

  $.validator.addMethod("alphanumerical", function(value, element, regexpr) {
   return !(regexpr.test(value));
 }, "Only Letter, numbers and spaces allowed. Case sensitive");

   $("#signupForm").validate({
        rules: {

          username:{
            required: true,
            alphanumerical: /[^a-zA-Z 0-9]+/,
            minlength: 2,
            maxlength:40
          },
          password: {
              alphanumerical: /[^a-zA-Z 0-9]+/,
               required: true,
               minlength: 6,
               maxlength: 15
           },
          confirmpassword: {
            required: true,
            alphanumerical: /[^a-zA-Z 0-9]+/,
               minlength: 6,
               maxlength: 15,
               equalTo: '#loginPassword'
           }
       }
   });

   $("#loginForm").validate({
        rules: {

          username:{
            required: true,
            alphanumerical: /[^a-zA-Z 0-9]+/,
            minlength: 2,
            maxlength:40
          },
          password: {
              alphanumerical: /[^a-zA-Z 0-9]+/,
               required: true,
               minlength: 6,
               maxlength: 15
           }
       }
   });


    var area = $('.post-area');
      area.hide();

      var container = $('.grid');
      container.imagesLoaded( function() {
        area.fadeIn();
        container.masonry({
            itemSelector : '.grid-item'
        });
      });

})
