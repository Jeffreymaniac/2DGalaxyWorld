$(document).ready(function(){
    var vid = document.getElementById("music");
    vid.autoplay = true;
    vid.loop = true;

    setTimeout(function() {
        $("#layout").css("visibility","visible");
    },1000);


    function makeBg(){

        for (var i=0; i<18; i++){ // i is row

            var row = $("<div/>");
            $('#board').append(row);

            for (var j=0; j<30; j++){ // j is column
                var col = $("<div/>");

                if(i==2 && j<=8 && j>=6){
                    col.addClass("clouds");
                }
                if(i==6 && j==8){
                    col.addClass("clouds");
                }

                if(i==3 && j>=5 &&j<=9){
                    col.addClass("clouds");
                }
                if(i==5 && j>=7 &&j<=9){
                    col.addClass("clouds");
                }

                if(i==4 && j>3 && j<12 ){
                    col.addClass("clouds");
                }
                if (i==14 && j>13 && j<17){
                    col.addClass("rock divBg");
                }
                if(i==2 && j==5){
                    col.addClass("pidgey divBg");
                }
                if (i==14 && j>3 && j<7){
                    col.addClass("leaf divBg");
                }
                if (i==13 && j==5){
                    col.addClass("leaf divBg");
                }
                if (j>=22 && j<=26 && i<=10 && i>6){
                    col.addClass("leaf divBg");
                }
                if (i < 15 && i> 10  && j==24){
                    col.addClass("tree divBg");
                }
                if (i ==14 && j==23){
                    col.addClass("crafting-table divBg");
                }
                if (i==14 && j==2 ){
                    col.addClass("bulbasaur divBg");
                }
                if (i==14 && j==13){
                    col.addClass("charmander divBg");
                }
                if (i==14 && j==17){
                    col.addClass("squirtle divBg");
                }
                if (i==14 && j==28){
                    col.addClass("mewtwo divBg");
                }

                if (i==15){
                    col.addClass("grass divBg");
                }
                if (i==16 && j==5){
                    col.addClass("dirt divBg");
                }
                else if (i>=16){
                    col.addClass("dirt divBg");
                }
                else{
                    col.addClass("divBg");
                }

                col.click(divSelect);
                row.append(col);


            }
        }

    }


    var toolArray = ["pickaxe","shovel","axe","pokeball"];

    var toolImages =["images/pickaxe.png","images/shovel.png","images/axe.png","images/ball.png"];

    function toolMaker(){

        for (var t=0;t<toolArray.length;t++){
            var div = $("<div/>");
            div.addClass("tool " + toolArray[t]);
            var pic = $("<img/>");
            pic.attr("src",toolImages[t]);
            //pic.attr("height","55px");
            div.append(pic);
            var words = $("<p/>");
            words.text(toolArray[t]);
            $('#tools').append(div);
            div.append(words);
            div.click(toolSelect);

        }

    }

    var selectedTool;
    var carrying;

    function toolSelect(){
        if(backgroundTimer==0){
            selectedTool = $(this);
            $('.tool').css("background-color","black");
            selectedTool.css("background-color","blue");
            carrying = selectedTool.attr("class");
            currentResource="";
        }
    }

    /*the counts store the inventory of each resource*/

    var dirtCount=0;
    var grassCount =0;
    var leafCount =0;
    var treeCount=0;
    var rockCount =0;

    var craftingTableCount =0;
    var diglettCount =0;
    var pidgeyCount =0;
    var bulbasaurCount =0;
    var charmanderCount =0;
    var mewtwoCount =0;
    var squirtleCount =0;
    var pokeCount=0;


    var backgroundTimer=0;

    var noClick= false;

    function blinkRed(){

            if (noClick==false){
                noClick = true;
                var backgroundInterval = setInterval(function(){
                    selectedTool.toggleClass("backgroundRed");
                    backgroundTimer++;

                    if(backgroundTimer==4){
                        clearInterval(backgroundInterval);
                        backgroundTimer=0;
                        noClick = false;
                    }
                },300)
            }

        }

        var healthbarTimer=0;
        function blinkRedPokemon(){
            if (noClick==false){
                noClick = true;

                var healthbarInterval = setInterval(function(){
                $("#healthbar").toggleClass("backgroundRed green");
                healthbarTimer++;

                if(healthbarTimer==4){
                    clearInterval(healthbarInterval);
                    healthbarTimer=0;
                    noClick = false;
                }
            },100)

            }
        }


    function divSelect(){

        var selectedDiv = $(this).attr("class");

        if(selectedDiv!='divBg'){

            if (selectedDiv =='dirt divBg' || selectedDiv =='grass divBg'){

      
                    $(this).removeClass(selectedDiv);
                    $(this).addClass("divBg");

                    if(selectedDiv =='dirt divBg'){
                        dirtCount++;
                    }
                    else if(selectedDiv =='grass divBg'){
                        grassCount++;
                   
                }
            }

            else if(selectedDiv =='leaf divBg' ||selectedDiv =='tree divBg'){

                    $(this).removeClass(selectedDiv);
                    $(this).addClass("divBg");

                    if(selectedDiv =='leaf divBg'){
                        leafCount++;

                    }
                    else if(selectedDiv =='tree divBg'){
                        treeCount++;
                    }
                }
               
            }
            else if(selectedDiv =='rock divBg'){

                    $(this).removeClass(selectedDiv);
                    $(this).addClass("divBg");
                    rockCount++;
                

  
            }

            else if(selectedDiv =='crafting-table divBg'){

                    $(this).removeClass(selectedDiv);
                    $(this).addClass("divBg");
                    craftingTableCount++;           

            }
            else if(selectedDiv =='crafting-table divBg'){

                
            }

            var strNameUpdate = selectedDiv.replace(" divBg","");
            updateInventory(strNameUpdate);

        }
        if (selectedDiv=='divBg'){

            var classToAdd = currentResource + " divBg";
            var currPokeCount = checkPokemon(currentResource);

            if (currPokeCount>0){
                $(this).removeClass(selectedDiv);
                $(this).addClass(classToAdd);
                subtractInventory(currentResource);
            }


            updateInventory(currentResource);
        }

    }

    var resourceArray = ["grass","leaf","dirt","rock","tree","crafting-table"];

    var countNames= [grassCount,leafCount,dirtCount,rockCount,treeCount,craftingTableCount];

    function inventoryMaker(){
        for (var y=0; y<resourceArray.length;y++){
            var div = $("<button/>");
            var currCount = $("<p/>");
            currCount.attr('id',resourceArray[y] + 'Number');
            currCount.text(countNames[y]);
            div.addClass("inventory");
            div.addClass(resourceArray[y]);
            div.append(currCount);
            $('#inventory').append(div);
            div.click(getResource);

        }
    }
    var currentResource;

    function getResource(){
        var curr = $(this).attr("class");
        var resourceName = curr.replace("inventory ","");
        currentResource = resourceName;
        carrying="";
        $('.tool').css("background-color","black");
    }



    function updateInventory(resourceToUpdate){
        var hash = "#" + resourceToUpdate + "Number";
        var hashCount;

        switch (resourceToUpdate) {
            case 'leaf': hashCount= leafCount;
                break;
            case 'tree': hashCount= treeCount;
                break;
            case 'dirt': hashCount= dirtCount;
                break;
            case 'grass': hashCount= grassCount;
                break;
            case 'rock': hashCount= rockCount;
                break;
            case 'crafting-table': hashCount= craftingTableCount;
                break;
            case 'charmander': hashCount= charmanderCount;
                break;
            case 'squirtle': hashCount= squirtleCount;
                break;
            case 'bulbasaur': hashCount= bulbasaurCount;
                break;
            case 'diglett': hashCount= diglettCount;
                break;
            case 'pidgey': hashCount= pidgeyCount;
                break;
            case 'mewtwo': hashCount= mewtwoCount;
                break;
        }
        $(hash).html(hashCount);
    }

    function subtractInventory(resourceToUpdate){
        var hash = "#" + resourceToUpdate + "Number";
        var hashCount;

        switch (resourceToUpdate) {
            case 'leaf': hashCount= leafCount--;
                break;
            case 'tree': hashCount= treeCount--;
                break;
            case 'dirt': hashCount= dirtCount--;
                break;
            case 'grass': hashCount= grassCount--;
                break;
            case 'rock': hashCount= rockCount--;
                break;
            case 'crafting-table': hashCount= craftingTableCount--;
                break;
            case 'charmander': hashCount= charmanderCount--;
                break;
            case 'squirtle': hashCount= squirtleCount--;
                break;
            case 'bulbasaur': hashCount= bulbasaurCount--;
                break;
            case 'diglett': hashCount= diglettCount--;
                break;
            case 'pidgey': hashCount= pidgeyCount--;
                break;
            case 'mewtwo': hashCount= mewtwoCount--;
                break;
        }
        $(hash).html(hashCount);
    }


    function checkPokemon(poke){
        var currPoke;

        switch(poke){
        case 'crafting-table': currPoke= craftingTableCount;
            break;
        case 'charmander': currPoke= charmanderCount;
            break;
        case 'squirtle': currPoke= squirtleCount;
            break;
        case 'bulbasaur': currPoke= bulbasaurCount;
            break;
        case 'diglett': currPoke= diglettCount;
            break;
        case 'pidgey': currPoke= pidgeyCount;
            break;
        case 'mewtwo': currPoke= mewtwoCount;
            break;

            case 'leaf': currPoke= leafCount;
                break;
            case 'tree': currPoke= treeCount;
                break;
            case 'dirt': currPoke= dirtCount;
                break;
            case 'grass': currPoke= grassCount;
                break;
            case 'rock': currPoke= rockCount;
                break;
}
        return currPoke;
    }


    function reduceHealth(poke){

        var currDamage;

        switch(poke){
        case 'crafting-table': currDamage= $(".crafting-table").data("attack");
        break;
        case 'charmander': currDamage= $(".charmander").data("attack");
            break;
        case 'squirtle': currDamage= $(".squirtle").data("attack");
            break;
        case 'bulbasaur': currDamage= $(".bulbasaur").data("attack");
            break;
        case 'diglett': currDamage= $(".diglett").data("attack");
            break;
        case 'pidgey': currDamage= $(".pidgey").data("attack");
            break;
        case 'mewtwo': currDamage= $(".mewtwo").data("attack");
            break;
    }
        return currDamage;

    }

    var displayed= false;
    var resetButton = $('#restore').click(resetBoard);

    function resetBoard(){
        $("#board").html("");
        $("#tools").html("");
        $("#inventory").html("");

        dirtCount=0;
        grassCount =0;
        leafCount =0;
        treeCount=0;
        rockCount =0;
        craftingTableCount =1;
        mewtwoCount =0;
        pidgeyCount =0;
        bulbasaurCount =0;
        charmanderCount =0;
        diglettCount =0;
        squirtleCount =0;
        pokeCount =0;
        selectedTool="";

        makeBg();
        toolMaker();
        inventoryMaker();

        charHealth = 60;
        squirtHealth= 100;
        digHealth = 101;
        mewHealth = 170;
        pidgHealth = 100;
        bulbHealth = 120;

        capturedChar=false;
        capturedSquirt=false;
        capturedBulb=false;
        capturedDig=false;
        capturedPidg=false
        capturedMewtwo=false;
        displayed=false;

        $('#healthbar').css("width","180px");

        $(".diglett").data("health",digHealth);
        $(".diglett").data("attack",13);

        $(".squirtle").data("health",squirtHealth);
        $(".squirtle").data("attack",15);

        $(".crafting-table").data("attack",5);

        $(".charmander").data("health",charHealth);
        $(".charmander").data("attack",10);

        $(".mewtwo").data("health",mewHealth);
        $(".mewtwo").data("attack",50);

        $(".pidgey").data("health",pidgHealth);
        $(".pidgey").data("attack",6);

        $(".bulbasaur").data("health",bulbHeath);
        $(".bulbasaur").data("attack",19);


        $(".charmander,.squirtle,.diglett,.mewtwo,.pidgey,.bulbasaur").hover(function(){
            num = $(this).data("health");
            $('#healthbar').css("width",num);
        });

        $(".charmander,.squirtle,.diglett,.mewtwo,.pidgey,.bulbasaur").mouseout(function(){
            $('#healthbar').css("width","180px");
        });
    }


    makeBg();
    toolMaker();
    inventoryMaker();

    var charHealth = 60;
    var squirtHealth= 100;
    var digHealth = 101;
    var mewHealth = 170;
    var pidgHealth = 100;
    var bulbHealth = 120;

    var num;

    var capturedChar=false;
    var capturedSquirt=false;
    var capturedBulb=false;
    var capturedDig=false;
    var capturedPidg=false
    var capturedMewtwo=false;

    $(".diglett").data("health",digHealth);
    $(".diglett").data("attack",13);

    $(".squirtle").data("health",squirtHealth);
    $(".squirtle").data("attack",15);

    $(".crafting-table").data("attack",5);

    $(".charmander").data("health",charHealth);
    $(".charmander").data("attack",10);

    $(".mewtwo").data("health",mewHealth);
    $(".mewtwo").data("attack",50);

    $(".pidgey").data("health",pidgHealth);
    $(".pidgey").data("attack",6);

    $(".bulbasaur").data("health",bulbHealth);
    $(".bulbasaur").data("attack",19);


    $(".charmander,.squirtle,.diglett,.mewtwo,.pidgey,.bulbasaur").hover(function(){
        num = $(this).data("health");
        $('#healthbar').css("width",num);
    });
    $(".charmander,.squirtle,.diglett,.mewtwo,.pidgey,.bulbasaur").mouseout(function(){
        $('#healthbar').css("width","180px");
    });

    $(".divbg").hover(function(){
        $('#healthbar').css("width","180px");
    });


});
