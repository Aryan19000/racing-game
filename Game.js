class Game{
    constructor(){

    }

    getState(){
        var gameStateRef=database.ref("gameState");
        gameStateRef.on("value", function(data){
            gameState=data.val();
        })

    }

    update(state){
        database.ref("/").update({
            gameState:state
        })
    }

    async start(){
        if(gameState===0){
            player=new Player();
            var playerCountRef=await database.ref("playerCount").once("value");
            if(playerCountRef.exists()){
                playerCount=playerCountRef.val();
                player.getCount();
            }
            form=new Form();
            form.display();
        }
        car1=createSprite(100, 0);
        car2=createSprite(300, 0);
        car3=createSprite(500, 0);
        car4=createSprite(700, 0);
        car1.addImage(car_1);
        car2.addImage(car_2);
        car3.addImage(car_3);
        car4.addImage(car_4);
        cars=[car1, car2, car3, car4];

    }

    play(){
        form.hide();
        //textSize(35);
        //text("Game Starts", 250, 100);
        Player.getPlayerInfo();

        if(allPlayers!==undefined){
            background("gray");
            image(track, 0, (-displayHeight*5)+400, displayWidth, displayHeight*6); 
            image(track, 0, -(displayHeight*5)*2+400, displayWidth, displayHeight*6); 
            var index=0;
            var x=175;
            var y;
            //var displayPosition=250;
            for(var plr in allPlayers){
                index=index+1;
                x=x+200;
                //use data from the database to display the cars in y direction.
                y=(displayHeight+200)-allPlayers[plr].distance;
                cars[index-1].x=x;
                cars[index-1].y=y;
                if(index===player.index){
                    cars[index-1].shapeColor="red";
                    camera.position.x=displayWidth/2;
                    camera.position.y=cars[index-1].y;
                    stroke(10);
                    fill(rgb(255, 0, 0, 0.5));
                    ellipse(x, y, 100, 100);
                }
                /*if(plr==="players"+player.index){
                    fill("red");
                }else{
                    fill("black");
                }
            displayPosition+=20;
            textSize(20);
            text(allPlayers[plr].name+": "+allPlayers[plr].distance, 250 ,displayPosition);*/
            }
        }
        if(keyDown(UP_ARROW) && player.index!==null){
            player.distance+=50;
            player.update();
        }
        if(player.distance>=4000){
            gameState=2;
        }
    drawSprites();
    }

    end(){
        console.log("game ended");
        alert("Game Ended");
    }
}