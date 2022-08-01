(function() {
  browser.runtime.onMessage.addListener((message) => {
    if (!message.command === 'autofill') {
      return;
    }

    var fillInHours = function(people, index) {
      var fields = Array.from(document.getElementsByName('actuals_hours'));
      var i = 0;
      while (i < fields.length) {
        var field = fields[i];
        if (!field.alt.includes('') || field.alt.includes("Sun,") || field.alt.includes("Sat")) {
          fields.splice(i, 1);
        }
        else {
          i = i+1;
        }
      }

      for (var i=0; i < fields.length; i++) {
        fields[i].value="8";
      }

      var aTags = document.getElementsByTagName("button");
      var searchText = "Submit for Approval";
      var found;

      for (var i = 0; i < aTags.length; i++) {
        if (aTags[i].textContent == searchText) {
          found = aTags[i];
          break;
        }
      }
   
      found.click();

      setTimeout(fillTimesheet, 3000, people, index+1);
    }

    var populateTimesheet = function(people, index) {
      var aTags = document.getElementsByTagName("button");
      var searchText = "Populate";
      var found;

      for (var i = 0; i < aTags.length; i++) {
        if (aTags[i].textContent == searchText) {
          found = aTags[i];
          break;
        }
      }

      found.click();
      setTimeout(fillInHours, 3000, people, index);
    }
   
    var fillTimesheet = function(people, index) {
        people[index].click();
        setTimeout(populateTimesheet, 4000, people, index);
    }

    const people = document.getElementsByClassName('caui-ndeTimesheet');
    setTimeout(fillTimesheet, 2000, people, 0);
    
  });
})();
