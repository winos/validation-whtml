
function Validate(input, config) {

  this.input = input

  var defaultConf = {
    required: true
  }

  this.config = config || defaultConf 

  /**
   * IssueTracker Object 
   */
  function IssueTracker() {
    this.error = []
  }

  IssueTracker.prototype = {

    addError: function (message) {
      this.error.push(message)
    },

    listError: function () {
      var message = "";
      switch (this.error.length) {
        case 0:
          // do nothing because message is already ""
          break;
        case 1:
          message = "Please correct the following issue:\n" + this.error[0];
          break;
        default:
          message = "Please correct the following issues:\n" + this.error.join("\n");
          break;
        }
      return message;
    }
  };

  /**
   * RulesValidator Object 
   */
  function RulesValidator (input) {
    this.input = input
    this.issuesTrack = new IssueTracker();
  }

  RulesValidator.prototype = {

    min: function (val) {
      return this.input.length < val 
    },

    max: function (val) {
      return this.input.length > val 
    },

    equal: function (input) {
      return ( this.input === input ) 
    },

    pullErrors: function () {
      return this.issuesTrack.listError()
    },

    pushErrors: function (msg) {
      return this.issuesTrack.addError(msg)
    }
  }

  var _validate = function(input) {
    
    var ruleVal = new RulesValidator(input.value)

    // Match
    if ( config.hasOwnProperty('equal') ) {
      if ( !ruleVal.equal(config.equal) ) {
        ruleVal.pushErrors('the password is not equal')
      }
    }

    if ( config.hasOwnProperty('min') ) {
      if ( ruleVal.min(config.min) ) {
        ruleVal.pushErrors(config.min + ' characters')
      }
    }

    if (config.hasOwnProperty('max')) {
      if ( ruleVal.max(config.max) ) {
        ruleVal.pushErrors(config.max + ' characters')
      }
    }

    if (config.hasOwnProperty('simbol')) {
      if (!input.value.match(config.simbol)) {
        ruleVal.pushErrors("missing a symbol (!, @, #, $, %, ^, &, *)");
      }
    }

    if (config.hasOwnProperty('number')) {
      if (!input.value.match(/\d/g)) {
        ruleVal.pushErrors("missing a number");
      }
    }

    if (config.hasOwnProperty('lowercase')) {
      if (!input.value.match(/[a-z]/g)) {
        ruleVal.pushErrors("missing a lowercase letter");
      }
    }

    if (config.hasOwnProperty('uppercase')) {
      if (!input.value.match(/[A-Z]/g)) {
        ruleVal.pushErrors("missing a uppercase letter");
      }
    }

    if (config.hasOwnProperty('ilegal')) {
      var illegalCharacterGroup = input.value.match(config.ilegal)
      if (illegalCharacterGroup) {
        illegalCharacterGroup.forEach(function (illegalChar) {
          ruleVal.pushErrors("includes illegal character: " + illegalChar);
        });
      }
    }

    // Change message 
    input.setCustomValidity(ruleVal.pullErrors())
    
  }.bind(this, this.input);

  // Return Public functions
  return {
    check: _validate
  }
}