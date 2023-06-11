document.addEventListener('DOMContentLoaded', function() {
  var estInput = document.getElementById('estInput');
  var aftInput = document.getElementById('aftInput');
  var convertButton = document.getElementById('convertButton');

  convertButton.addEventListener('click', function() {
    var estTime = estInput.value.trim();
    var amPm = getAmPmFromTime(estTime);

    // Normalize the input to the format "H:MM AM/PM" for time parsing
    estTime = normalizeTimeFormat(estTime, amPm);

    // Implement the conversion logic here and set the result to `aftInput.value`
    // You may use JavaScript's `Date` object or external libraries like moment.js

    // For example, assuming AFT is always 8 hours ahead of EST:
    if (estTime) {
      var estDate = new Date(`${estTime}`);
      var aftDate = new Date(estDate.getTime() + 8 * 60 * 60 * 1000);
      aftInput.value = formatTimeWithAmPm(aftDate);
    } else {
      aftInput.value = '';
    }
  });

  function getAmPmFromTime(time) {
    // Check if the time string contains "am" or "pm" (case-insensitive)
    if (/am/i.test(time)) {
      return 'AM';
    } else if (/pm/i.test(time)) {
      return 'PM';
    }
    return '';
  }

  function normalizeTimeFormat(time, amPm) {
    // Normalize the time format to "H:MM AM/PM"
    if (time.includes(':')) {
      // Time in the format "H:MM"
      return time + ' ' + amPm;
    } else {
      // Time in the format "H"
      return time + ':00 ' + amPm;
    }
  }

  function formatTimeWithAmPm(date) {
    // Format the time with AM/PM indication
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var amPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // Convert 0 to 12
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + amPm;
  }
});
