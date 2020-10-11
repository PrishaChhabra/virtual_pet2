class Food{
constructor(){
    this.foodStock=0
    this.lastFed
    this.foodimage=loadImage("images/Milk.png")
}


getFoodStock(){
    /*var foodStock=database.ref('foodStock')
    foodStock.on("value",function(data){
        foodStock=data.val();
    })*/
    return this.foodStock;
}
   

  


 updateFoodStock(foodStock){
    /*database.ref('/').update({
        foodStock:foodStock
    })*/
    this.foodStock=foodStock
}
  
getFed(lastFed){
    this.lastFed=lastFed;

}







display(){
    var x=80, y=100;
    imageMode(CENTER);
    image(this.foodimage,720,220,70,70);

    if(this.foodStock!=0){
        for(var i=0;i<this.foodStock;i++){
            if(i%10==0){
                x=80;
                y=y+50;
            }
                image(this.foodimage,x,y,50,50);
                x=x+30;
        }

}








}


}