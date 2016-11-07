var gameArray = [];
var marioArray1 = ['MarioImage/1.png','MarioImage/2.png','MarioImage/3.png','MarioImage/4.png','MarioImage/5.png','MarioImage/6.png'
,'MarioImage/7.png','MarioImage/8.png','MarioImage/9.png','MarioImage/10.png','MarioImage/11.png','MarioImage/12.png','MarioImage/13.png'
,'MarioImage/14.png','MarioImage/15.png',' '];

var marioArray2 = ['MarioImage/2_1.png','MarioImage/2_2.png','MarioImage/2_3.png','MarioImage/2_4.png','MarioImage/2_5.png','MarioImage/2_6.png'
,'MarioImage/2_7.png','MarioImage/2_8.png','MarioImage/2_9.png','MarioImage/2_10.png','MarioImage/2_11.png','MarioImage/2_12.png','MarioImage/2_13.png'
,'MarioImage/2_14.png','MarioImage/2_15.png',' '];

var marioArray3 = ['MarioImage/3_1.png','MarioImage/3_2.png','MarioImage/3_3.png','MarioImage/3_4.png','MarioImage/3_5.png','MarioImage/3_6.png'
,'MarioImage/3_7.png','MarioImage/3_8.png','MarioImage/3_9.png','MarioImage/3_10.png','MarioImage/3_11.png','MarioImage/3_12.png','MarioImage/3_13.png'
,'MarioImage/3_14.png','MarioImage/3_15.png',' '];

var marioArray4 = ['MarioImage/4_1.png','MarioImage/4_2.png','MarioImage/4_3.png','MarioImage/4_4.png','MarioImage/4_5.png','MarioImage/4_6.png'
,'MarioImage/4_7.png','MarioImage/4_8.png','MarioImage/4_9.png','MarioImage/4_10.png','MarioImage/4_11.png','MarioImage/4_12.png','MarioImage/4_13.png'
,'MarioImage/4_14.png','MarioImage/4_15.png',' '];

var values = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15',' '];
var answerKey = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15',' '];
var puzzleArray;
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
  var index = 15;
  var random;

  for(var i = 0; i < 100; i++)
  {
    random = getRandom();

    if((index + random < 16) && (index + random >= 0))
    {
      temp = values[index];
      values[index] = values[index + random];
      values[index + random] = temp;

      temp = gameArray[index];
      gameArray[index] = gameArray[index + random];
      gameArray[index + random] = temp;

      index += random;
    }
  }
}

function getRandom()
{
  var random = Math.floor(Math.random() * 4) + 1;

  if(random == 1)
  {
    return -1;
  }

  if(random == 2)
  {
    return 1;
  }

  if(random == 3)
  {
    return -4;
  }

  if(random == 4)
  {
    return 4;
  }
}


function buildBoard()
{

  var puzzle = $("#puzzle").val();

  if(puzzle == "mario1")
  {
    puzzleArray = marioArray1;
  }
  else if(puzzle == "mario2")
  {
    puzzleArray = marioArray2;
  }
  else if(puzzle == "mario3")
  {
    puzzleArray = marioArray3;
  }
  else
  {
    puzzleArray = marioArray4;
  }

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
    output += puzzleArray[i];
    output +='></img></div>';
    gameArray.push(output);
  }
  output = '<div id="'+i+'" onclick="clicked(this)">'+puzzleArray[15]+'</div>';
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
  $("#board").html("You win :)");
  stopTimer();
}
