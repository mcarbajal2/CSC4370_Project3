function startTimer(duration)
{
  var countDown = function()
  {
    if(duration > 0)
    {
      document.getElementById("gameTimer").innerHTML = "You have " + duration.toFixed(2) + " seconds remaining!";
      duration -= .010;
    }
    else if (duration <= 0)
    {
      stopTimer();
      document.getElementById("gameTimer").innerHTML = "You have 0.00 seconds remaining!";
    }
  }
  timerID = setInterval(countDown, 10);
  countDown();
}

function stopTimer()
{
  clearInterval(timerID);
}
