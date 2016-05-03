$(document).ready(function () {

  function hide(){
    setTimeout( function(){
      $("#message").hide(500)
    }, 3000)
  }

  hide()

  $.validator.addMethod("alphanumerical", function(value, element, regexpr) {
   return !(regexpr.test(value));
 }, "Only Letter and numbers allowed. Case sensitive");

   $("#signupForm").validate({
        rules: {

          username:{
            required: true,
            alphanumerical: /[^a-zA-Z0-9]+/,
            minlength: 2,
            maxlength:40
          },
          password: {
              alphanumerical: /[^a-zA-Z0-9]+/,
               required: true,
               minlength: 6,
               maxlength: 15
           },
          confirmpassword: {
            required: true,
            alphanumerical: /[^a-zA-Z0-9]+/,
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
            alphanumerical: /[^a-zA-Z0-9]+/,
            minlength: 2,
            maxlength:40
          },
          password: {
              alphanumerical: /[^a-zA-Z0-9]+/,
               required: true,
               minlength: 6,
               maxlength: 15
           }
       }
   });


})
