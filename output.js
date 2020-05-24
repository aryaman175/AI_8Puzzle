// while playing shuffle
var play= false;
var solvable =false;
var playClicked =false;
function playGame()
{
  if (!end && !play && !showing)
{
    play =true;
  playClicked =true;
  solvable = checkSol8(start.gridValues)
}
}
function shuffleGrid()
{

  if (!play && !showing)
  {
    document.querySelector("ul").style.border = "";
    playClicked =false;
    end = false;
    solvable = false;
    openSet =[]
    closedSet =[]
    start = new gameState()
    var tempArray=[]
    for (let i=0;i<l;i++)
    {

         for(let j=0;j<l;j++)
           tempArray.push(gridFinal[i][j])
     }

for (let p=0;p<l;p++)
{
    start.grid[p] =[]
    for (let q=0;q<l;q++)
    {
        var index = Math.floor(random() * (((tempArray.length-1) - 0) + 0));
       var elem = tempArray[index]
       tempArray.splice(index,1)
       start.grid[p].push(new tile(p,q))
       start.grid[p][q].value = elem;
   }

   }
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
         console.log("enter")
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
}

// function shuffleGrid()
// {
//
//     if (!play)
//     {
//       document.querySelector("ul").style.border = "";
//       playClicked =false;
//       end = false;
//       solvable = false;
//       openSet =[]
//       closedSet =[]
//       start = new gameState()
//       for(let i=0;i<l;i++)
//       {
//         start.grid[i] =[]
//         for (let j=0;j<l;j++)
//         {
//           start.grid[i].push(new tile(i,j))
//         }
//       }
//
//
//
//       start.grid[0][0].value = 8
//       start.grid[0][1].value = 2
//       start.grid[0][2].value = 7
//       start.grid[1][0].value = 1
//       start.grid[1][1].value = 5
//       start.grid[1][2].value = 6
//       start.grid[2][0].value = 4
//       start.grid[2][1].value = 3
//       start.grid[2][2].value = 0
//
//        for(let i=0;i<l;i++)
//        {
//          start.gridValues[i] =[];
//          for (let j=0;j<l;j++)
//          {
//            start.gridValues[i].push(start.grid[i][j].value)
//            start.grid[i][j].tileGroup = start;
//          }
//        }
//        //finding 0 pos of start!
//        for (let i=0;i<l;i++)
//        {
//          for(let j=0;j<l;j++)
//          {
//            if (start.grid[i][j].value == 0)
//          {
//            console.log("enter")
//             start.posI = start.grid[i][j].i;
//             start.posJ = start.grid[i][j].j;
//          }
//          }
//        }
//        for (let i=0;i<l;i++)
//         for (let j=0;j<l;j++)
//         {
//
//           if (start.gridValues[i][j]!=0)
//           {
//             document.querySelectorAll("li")[3*i + j].innerHTML = start.gridValues[i][j];
//           }
//           else {
//             $(document.querySelectorAll("li")[3*i + j]).addClass("empty")
//             document.querySelectorAll("li")[3*i + j].innerHTML ="";
//           }
//         }
//
//       start.g = 0;
//       openSet.push(start)
//     }
//   }
