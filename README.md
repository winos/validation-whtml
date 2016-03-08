#Validation Wrap HTML5

Wrap for form validation.


## Use

var inputPassword = document.querySelector('#password');

var validateInputPassword = validate(inputPassword, {
     min: 16,
     max: 100,
     simbol: /[\!\@\#\$\%\^\&\*]/g,
     number: true,
     lowercase: true,
     uppercase: true,
     ilegal: /[^A-z0-9\!\@\#\$\%\^\&\*]/g
  });
