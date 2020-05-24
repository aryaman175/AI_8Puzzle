var winner;
var checker =0;
var path =[]
var showing = false;
function think()
{
  if (openSet.length >0)
  {
    // calc winner
     winner =0;
    for(let i=0;i<openSet.length;i++)
    {
       if (openSet[i].f <openSet[winner].f)
        {
          if (openSet[i].g<31)
          {
            winner = i;
          }
            else {
              openSet.splice(i,1)
              closedSet.push(openSet[i])
              i--;
            }
         }
     }

    var current = openSet[winner];

    if (arrayComp(current.gridValues,gridFinal))
    {      
       checker++;
       //console.table(openSet[winner].gridValues)
       play = false;
       end = true;
       path.push(openSet[winner])
       var temp = openSet[winner]
       openSet =[]
       closedSet =[]
       while (temp.parent) {
         temp = temp.parent
         path.push(temp)
       }
        if (path.length!=1)
    {
      for (let n=path.length-1;n>0;n--)
       {
          (function(n)

          {
            setTimeout(function()
            {
              showing = true;
              moveTile(path[n].posI,path[n].posJ,path[n-1].posI,path[n-1].posJ,n)

            },1000*(path.length-1-n))
          })(n);
         }
       }
       else {
         play =false;
         solvable = false;
         end = true;
         showing = false;
         path =[];
         document.querySelector("ul").style.border = "10px solid green";


       }

    }
    else
    {   // reproducing
        current.reproduce()
        // moving to closedSet
        openSet.splice(winner,1)
        closedSet.push(current)

        // work with each child
        for (let i=0;i<current.children.length;i++)
        {
          var child = current.children[i]
          child.parent = current;

          for (let n=0;n<closedSet.length;n++)
          {
             var expanded;
           expanded = arrayComp(closedSet[n].gridValues,child.gridValues)
           if(expanded) {
             n=closedSet.length
           }
          }
          if (!expanded)
          {
            var tempG = current.g + 1;
            var tempF = child.calcScore(tempG)
            if (openSet.includes(child))
            {
               if (tempF<child.f)
            {
                 child.f =tempF;
                child.g =tempG;
             }
            }
            else {
                child.f =tempF;
                child.g =tempG;
                openSet.push(child)
            }
          }else {
            // just checking
            //console.log("enter yo")
          }

        }
    }

  }

  }


function arrayComp(a,b)
{
  var count =0;
  for (let p=0;p<l;p++)
  {   for(let q=0;q<l;q++)
     {

       if (a[p][q]==b[p][q])
        count++;
        else
        return false;
     }
  }
 if (count==9)
 return true;
 else
 return false;
}
function invCount(arr)
{
  var tempArray =[]
  for(let i = 0; i < l; i++)
  {
     for (let j = 0; j < l; j++)
    tempArray.push(arr[i][j])
  }
  var inv_count = 0;
  for (let i = 0; i < l*l- 1; i++)
  {
     // 2d array !
      for (let j = i + 1; j < l * l; j++)
      {
          if (tempArray[j] && tempArray[i] && tempArray[i] > tempArray[j])
        {

              inv_count++;
        }
      }
    }
  return inv_count;
}
function checkSol8(arr)
{
  var inv_count = invCount(arr)
  if (inv_count%2==0)
     return true;
     else {
      //console.log("enter else")
       play =false;
       return false;
     }
}
function checkSol15(arr)
{
  var inv_count = invCount(arr)
  if ((start.posI==0 || start.posI==2) && inv_count%2 !=0)
       return true;
       else if ((start.posI==1 || start.posI==3) && inv_count%2 ==0) {
         return true;
       }
       else {
         return false;
     }
}
function moveTile(inI,inJ,finI,finJ,n)
{
  // for zero
  startPos = 3*inI + inJ
  finalPos = 3*finI + finJ

  var tempValue= path[n].gridValues[path[n-1].posI][path[n-1].posJ]

  $(document.querySelectorAll("li")[startPos]).removeClass("empty")
  document.querySelectorAll("li")[startPos].innerHTML = tempValue;

  $(document.querySelectorAll("li")[finalPos]).addClass("empty")
  document.querySelectorAll("li")[finalPos].innerHTML = "";
  if (n==1)
  {
  document.querySelector("ul").style.border = "10px solid green";
  play =false;
  solvable = false;
  end = true;
  showing = false;
  path =[]
}

}
