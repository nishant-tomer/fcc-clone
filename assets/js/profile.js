$(document).ready(function () {

  function hide(){
    setTimeout( function(){
      $("#message").hide(500)
    }, 3000)
  }

  hide()

  $(document).on('click', '#editPasswordLink', function (e) {
          e.stopPropagation()
          e.preventDefault()
          $("#editPassword").toggleClass("no-display")
      });


     $("#allPinsLink").on("click",function(event){
       $("#allPins").removeClass("no-display")
       $("#myPins").addClass("no-display")
     })

     $("#myPinsLink").on("click",function(event){
       $("#allPins").addClass("no-display")
       $("#myPins").removeClass("no-display")
     })




    $.validator.addMethod("alphanumerical", function(value, element, regexpr) {
     return !(regexpr.test(value));
   }, "Only Letter,numbers and spaces allowed. Case sensitive");

   $("#editPassword").validate({
        rules: {
          currentpassword: {
              alphanumerical: /[^a-zA-Z 0-9]+/,
               required: true,
               minlength: 6,
               maxlength: 15
           },
          confirmnewpassword: {
            required: true,
            alphanumerical: /[^a-zA-Z 0-9]+/,
               minlength: 6,
               maxlength: 15,
               equalTo: '#newPassword'
           },
          newpassword: {
             required: true,
             alphanumerical: /[^a-zA-Z 0-9]+/,
             minlength: 6,
             maxlength: 15
            }

       }
   });
   $("#addPin").validate({
        rules: {

          title:{
            required: true,
            alphanumerical: /[^a-zA-Z 0-9]+/,
            minlength:2,
            maxlength:40
          },
          url: {
              required: true,
              url: true
           }
       }
   });

   var container = $('.grid');
   container.imagesLoaded( function() {
     container.masonry({
         itemSelector : '.grid-item',
         columnWidth: '.grid-sizer',
         gutter: '.gutter-sizer',
         percentPosition: true
     });
      $('#allPins').addClass("no-display").css('visibility','visible');
   });


})
