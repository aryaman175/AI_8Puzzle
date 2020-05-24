//var grid=[];
var gridFinal=[];
//var gridValues =[]
var l=3; // length of each side
var start;
var openSet =[]
var closedSet =[];
var finalInfo=[];
var end = false;
function setup()

{
  cnv = createCanvas(400,400)
// creating goal
   var count =1;
  for(let i=0;i<l;i++)
  {
    gridFinal[i] =[]
    //finalInfo[i] =[]
    for (let j=0;j<l;j++)
    {
       gridFinal[i][j] = count;
       count++;
        var tempObj = {posX:i,posY:j}
       finalInfo.push(tempObj);
       if (i==2 && j==2)
       {
         gridFinal[i][j] = 0;
       }
    }
  }

  // creating start
   start = new gameState()
for(let i=0;i<l;i++)
{
  start.grid[i] = [];
  for (let j=0;j<l;j++)
  {
    start.grid[i][j] = new tile(i,j)
  }
}
// giving values to start
start.grid[0][0].value = 1
start.grid[0][1].value = 2
start.grid[0][2].value = 3
start.grid[1][0].value = 4
start.grid[1][1].value = 5
start.grid[1][2].value = 6
start.grid[2][0].value = 7
start.grid[2][1].value = 8
start.grid[2][2].value = 0


// start.grid[0][1].value = 2
// start.grid[0][2].value = 4
// start.grid[0][0].value = 5
// start.grid[0][1].value = 2
// start.grid[0][2].value = 4
// start.grid[0][3].value = 7
// start.grid[1][0].value = 6
// start.grid[1][1].value = 15
// start.grid[1][2].value = 3
// start.grid[1][3].value = 8
// start.grid[2][0].value = 1
// start.grid[2][1].value = 10
// start.grid[2][2].value = 11
// start.grid[2][3].value = 12
// start.grid[3][0].value = 9
// start.grid[3][1].value = 13
// start.grid[3][2].value = 14
// start.grid[3][3].value = 0
 // start.grid[0][0].value = 13
 // start.grid[0][1].value = 2
 // start.grid[0][2].value = 10
 // start.grid[0][3].value = 3
 // start.grid[1][0].value = 1
 // start.grid[1][1].value = 12
 // start.grid[1][2].value = 8
 // start.grid[1][3].value = 4
 // start.grid[2][0].value = 5
 // start.grid[2][1].value = 0
 // start.grid[2][2].value = 9
 // start.grid[2][3].value = 6
 // start.grid[3][0].value = 15
 // start.grid[3][1].value = 13
 // start.grid[3][2].value = 11
 // start.grid[3][3].value = 7

 for(let i=0;i<l;i++)
 {
   start.gridValues[i] =[];
   for (let j=0;j<l;j++)
   {
     start.gridValues[i].push(start.grid[i][j].value)
     start.grid[i][j].tileGroup = start;
   }
 }
 //finding 0 pos of start!
 for (let i=0;i<l;i++)
 {
   for(let j=0;j<l;j++)
   {
     if (start.grid[i][j].value == 0)
   {

      start.posI = start.grid[i][j].i;
      start.posJ = start.grid[i][j].j;
   }
   }
 }
 for (let i=0;i<l;i++)
  for (let j=0;j<l;j++)
  {

    if (start.gridValues[i][j]!=0)
    {
      document.querySelectorAll("li")[3*i + j].innerHTML = start.gridValues[i][j];
    }
    else {
      $(document.querySelectorAll("li")[3*i + j]).addClass("empty")
      document.querySelectorAll("li")[3*i + j].innerHTML ="";
    }
  }


start.g = 0;
openSet.push(start)
}

function draw()
{
  //background(255)
  if (play&&solvable)
   think();

 textShow();


}
function textShow()
{
  var comment = document.getElementById("comment")
  if (showing || (!play && end))
    comment.innerHTML ="Got it!"

  else  if(playClicked && !solvable && !play && !end)
    comment.innerHTML = "Unsolvable State!";
  else if(play &&solvable)
    comment.innerHTML ="Thinking...";
  // else  if (!play&& end)
  //   comment.innerHTML ="Got it!";
    else
    comment.innerHTML ="";
}
