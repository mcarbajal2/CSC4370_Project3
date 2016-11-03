function startTimer(duration)
{
  var timeLeft = duration;
  var countDown = function()
  {
    if(timeLeft >= duration/2)
    {
      var output = "<div id = gameTimer>You have ";
      output += "<p class = green>"
      output += timeLeft.toFixed(2);
      output += " </p>seconds remaining!"
      output += "</div>";
      $("#gameTimer").replaceWith(output);
      timeLeft -= .010;
    }
    else if(timeLeft < duration/2 && timeLeft >= duration/4)
    {
      var output = "<div id = gameTimer>You have ";
      output += "<p class = yellow>"
      output += timeLeft.toFixed(2);
      output += " </p>seconds remaining!"
      output += "</div>";
      $("#gameTimer").replaceWith(output);
      timeLeft -= .010;
    }
    else if(timeLeft < duration/4 && timeLeft >= 0)
    {
      var output = "<div id = gameTimer>You have ";
      output += "<p class = red>"
      output += timeLeft.toFixed(2);
      output += " </p>seconds remaining!"
      output += "</div>";
      $("#gameTimer").replaceWith(output);
      timeLeft -= .010;
    }
    else if (timeLeft <= 0)
    {
      stopTimer();
      var output = "<div id = gameTimer>You have<p class = red>0.00</p> seconds remaining!</div>"
      $("gameTimer").replaceWith(output);
    }
  }
  timerID = setInterval(countDown, 10);
  countDown();
}

function stopTimer()
{
  clearInterval(timerID);
}
