var gameArray = [];
var marioArray = ['MarioImage/1.png','MarioImage/2.png','MarioImage/3.png','MarioImage/4.png','MarioImage/5.png','MarioImage/6.png'
,'MarioImage/7.png','MarioImage/8.png','MarioImage/9.png','MarioImage/10.png','MarioImage/11.png','MarioImage/12.png','MarioImage/13.png'
,'MarioImage/14.png','MarioImage/15.png',' '];

var values = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15',' '];
var answerKey = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15',' '];
var tilesSelectedThisTurnArray = [];
var indicisSelectedThisTurnArray = [];

function setupGame(duration)
{
  stopTimer();
  buildBoard();
  shuffle();
  drawBoard();
  startTimer(duration);
}

function startDemo(duration)
{
  stopTimer();
  buildBoard();
  drawBoard();
  startTimer(duration);
}

 function shuffle()
{
    var i = values.length;
    var j;
    var temp;

    while(--i > 0)
    {
        j = Math.floor(Math.random() * (i+1));
        temp = values[j];
        values[j] = values[i];
        values[i] = temp;

        temp = gameArray[j];
        gameArray[j] = gameArray[i];
        gameArray[i] = temp;
    }
}

function buildBoard()
{
  //re sort the values array
  for(var i = 0; i < answerKey.length; i++)
  {
    values[i] = answerKey[i];
  }

  //build the game array
  gameArray = [];
  var output = "";
  for(var i = 0; i < answerKey.length-1; i++)
  {
    output = '<div id="'+i+'" onclick="clicked(this)">';
    output += '<img src = ';
    output += marioArray[i];
    output +='></img></div>';
    gameArray.push(output);
  }
  output = '<div id="'+i+'" onclick="clicked(this)">'+marioArray[15]+'</div>';
  gameArray.push(output);
}

function drawBoard()
{
  //output the gameArray
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
  var id = tile.id;

  $('#'+id).css('border', 'solid 2px yellow');

  if(tilesSelectedThisTurnArray.length == 0)
  {
    tilesSelectedThisTurnArray.push(contents);
    var index = find(contents);
    indicisSelectedThisTurnArray.push(index);
  }
  else if(tilesSelectedThisTurnArray.length == 1)
  {
    drawBoard();
    tilesSelectedThisTurnArray.push(contents);
    var index = find(contents);
    indicisSelectedThisTurnArray.push(index);
    //check to swap

    if(isValuesSwappable())
    {
      if(isIndicesSwappable())
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

function isValuesSwappable()
{
  return values[indicisSelectedThisTurnArray[0]] == " " || values[indicisSelectedThisTurnArray[1]] == " ";
}

function isIndicesSwappable()
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


  var value1 = values[index1];
  var value2 = values[index2];
  values[index1] = value2;
  values[index2] = value1;

  //re draw array
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
  for(var i = 0; i < values.length; i++)
  {
    var temp = values[i];

    if(temp != answerKey[i])
    {
      return;
    }
  }

  $("#board").html("You win");
  stopTimer();
}
