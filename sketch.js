//Create variables here
var dog,happyDog,foodS=20,foodStock;
var dogImg,happyDogImg;
var database;
var foodObj,FeedTime,lastFed,feedButton,addButton;
function preload()
{
  dogImg=loadImage("images/dogImg.png")
  happyDogImg=loadImage("images/dogImg1.png")


	//load images here
}

function setup() {
  database=firebase.database();
  createCanvas(500,500);
  dog=createSprite(300,400,10,40)
  dog.addImage(dogImg)
  dog.scale=0.2
 foodObj= new Food();
 feedButton=createButton("Feed the Dog");
 feedButton.position(650,95);
 feedButton.mousePressed(feedDog);

 addButton=createButton("Add Food");
addButton.position(450,95);
addButton.mousePressed(addFood);

  foodStock=database.ref('Food')
  foodStock.on("value",readStock,showError);

  
  
}


function draw() {  
background(46,139,87);
foodObj.display();
 FeedTime=database.ref('FeedTime');
 FeedTime.on("value",function(data){
   lastFed=data.val();
 })
  //add styles here
  
  textSize(20)
  fill("yellow")
  if(lastFed>=12){
    text("Last Feed="+ lastFed%12 +"PM",150,120);

  }
  else if(lastFed==0){
    text("Last Feed=12 AM",150,120);
  }
  else{
    text("Last Feed="+ lastFed+"AM",150,120);
  }
  
  text("Food Remaining="+foodS ,95,100)
  drawSprites();
}
function readStock(data){
  console.log(data.val())
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
  
}

function writeStock(milk){
  /*if(milk<=0){
    milk=0;}
    else{
      milk=milk+1
    }*/

    database.ref('food').update({
      foodStock:milk
      
    })
    
}



function showError(){
  console.log("Error")
}



function feedDog(){
  dog.addImage(happyDogImg);

  /*foodS=foodS-1
  writeStock(foodS);*/
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFood(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })

}

