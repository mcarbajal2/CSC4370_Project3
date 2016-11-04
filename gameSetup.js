var gameArray = [];
var size8 = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15',' '];
var answerKey = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15',' '];
var tilesSelectedThisTurnArray = [];
var indicisSelectedThisTurnArray = [];


function setupGame(duration)
{
  stopTimer();
  drawBoard();
  startGame(duration);
}

function startGame(duration)
{
  startTimer(duration)
}

function drawBoard()
{
  gameArray = [];
  var output = "";
  for(var i = 0; i < size8.length; i++)
  {
    output = '<div id="'+i+'" onclick="clicked(this)">'+answerKey[i]+'</div>';
    gameArray.push(output);
  }

  output = "";
  for(var i = 0; i < gameArray.length; i++)
  {
    output += gameArray[i];
  }
  $("#board").html(output);
}

function clicked(tile)
{
  var contents = $(tile).html();

  if(tilesSelectedThisTurnArray.length == 0)
  {
    tilesSelectedThisTurnArray.push(contents);
    var index = find(contents);
    indicisSelectedThisTurnArray.push(index);
  }
  else if(tilesSelectedThisTurnArray.length == 1)
  {
    tilesSelectedThisTurnArray.push(contents);
    var index = find(contents);
    indicisSelectedThisTurnArray.push(index);
    //check to swap

    if(isContentSwapable())
    {
      if(isIndicesSwapable())
      {
        swap();
      }
    }

    tilesSelectedThisTurnArray = [];
    indicisSelectedThisTurnArray = [];
  }


}

function find(contents)
{
  var temp;
  for(var i = 0; i < gameArray.length; i++)
  {
    temp = gameArray[i];
    var tempContents = $(temp).html();
    if(tempContents == contents)
    {
      return i;
    }
  }
}

function isContentSwapable()
{
  return tilesSelectedThisTurnArray[0] == " " || tilesSelectedThisTurnArray[1] == " "
}

function isIndicesSwapable()
{
  var index1 = indicisSelectedThisTurnArray[0];
  var index2 = indicisSelectedThisTurnArray[1];

  var difference = index1 - index2;

  return difference == 1|| difference == -1 || difference == 4 || difference == -4;

}

function swap()
{
  var index1 = indicisSelectedThisTurnArray[0];
  var index2 = indicisSelectedThisTurnArray[1];

  var contents1 = gameArray[index1];
  var contents2 = gameArray[index2];

  gameArray[index1] = contents2;
  gameArray[index2] = contents1;


  output = "";
  for(var i = 0; i < gameArray.length; i++)
  {
    output += gameArray[i];
  }
  $("#board").html(output);
  isWin();
}

function isWin()
{
  for(var i = 0; i < gameArray.length; i++)
  {
    var temp = gameArray[i];
    var contents = $(temp).html();

    if(contents != answerKey[i])
    {
      return;
    }
  }

  $("#board").html("You win");
  stopTimer();
}
