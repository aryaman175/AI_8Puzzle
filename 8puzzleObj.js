function tile(i,j)
{
   this.value;
   this.i =i;
   this.j =j;
   this.neighbours=[];
   this.tileGroup =[];

  this.findNeighbours = function()
{
   if (this.i<l-1)
  {

    this.neighbours.push(this.tileGroup.grid[this.i + 1][this.j])
  }
  if (this.i>0)
 {
   this.neighbours.push(this.tileGroup.grid[this.i - 1][this.j])
 }
 if (this.j<l-1)
{

  this.neighbours.push(this.tileGroup.grid[this.i][this.j + 1])
}
if (this.j>0)
{
 this.neighbours.push(this.tileGroup.grid[this.i][this.j -1])
}
}
}

function gameState()
{
  this.grid =[]
  this.gridValues =[];
  this.g;
  this.h;
  this.f;
  this.posI;
  this.posJ;
  this.children =[];
  this.parent;

  this.reproduce =function()
  {

    // find neigbours of 0 of this;
    this.grid[this.posI][this.posJ].findNeighbours();

    // give birth to children by pushing game states
    // giving them 2d grid
    // grid consists of tiles
    // grid ditto of this
    var length = this.grid[this.posI][this.posJ].neighbours.length
    for(let i=0;i<length;i++)
    {
       this.children.push(new gameState())
       var child = this.children[i]
       for (let j=0;j<l;j++)
       {
         child.grid[j] =[]
         for (let k=0;k<l;k++)
         {
           child.grid[j].push(new tile(j,k))
           child.grid[j][k].value = this.grid[j][k].value
           child.grid[j][k].tileGroup = child;
         }
       }
     }

    // fiding pos 0 of children
    // exchaning
     for (let i=0;i<length;i++)
  {
      var child = this.children[i]
        child.posI = this.grid[this.posI][this.posJ].neighbours[i].i
      child.posJ = this.grid[this.posI][this.posJ].neighbours[i].j
      var temp = child.grid[child.posI][child.posJ].value;
      child.grid[child.posI][child.posJ].value =0;
      child.grid[this.posI][this.posJ].value = temp;
  //child.pos is it's zero pos  child.parent.pos is number pos
  // final;
// creating gridvalue for children
     for (let j=0;j<l;j++)
    {

        child.gridValues[j] =[]
        for (let k=0;k<l;k++)
      {

        child.gridValues[j].push(child.grid[j][k].value);
      }
     }

  }
}
  this.calcScore = function(x)
  {
    var h =0;
    var g = x;
    for (let i=0;i<l;i++)
      {
        for (let j=0;j<l;j++)
        {
          //console.log(this)
          //console.log("i = " + i + "j = " + j)
          var value= this.gridValues[i][j]
          //console.log(value)
         if (value !=0)
        {
          var tempI = finalInfo[value-1].posX
          var tempJ = finalInfo[value-1].posY
          //h=h + Math.abs(tempI -i) + Math.abs(tempJ -j)
        }
        else {
          var tempI = finalInfo[8].posX
          var tempJ = finalInfo[8].posY
        }
          h=h + Math.abs(tempI -i) + Math.abs(tempJ -j)
          }
        }
        return h+g;
      }

  }
