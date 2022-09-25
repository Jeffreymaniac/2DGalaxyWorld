$(document).ready(function(){
    var vid = document.getElementById("music");
    vid.autoplay = true;
    vid.loop = true;


    $("#myModal").modal('show');
    $("#tutorial").click(function() {
        $("#tutorialModal").modal('show');
        $("#myModal").modal('hide');
    });
    $("#returnToMain").click(function() {
        $("#tutorialModal").modal('hide');
        $("#myModal").modal('show');
    });
    $("#play").click(function() {
        $("#myModal").modal('hide');
    });
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

                if (i==15){
                    col.addClass("grass divBg");
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


    var toolArray = ["picaxe","shovel","axe"];

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

                if(carrying=='tool shovel'){
                    $(this).removeClass(selectedDiv);
                    $(this).addClass("divBg");

                    if(selectedDiv =='dirt divBg'){
                        dirtCount++;
                    }
                    else if(selectedDiv =='grass divBg'){
                        grassCount++;
                    }
                }

                else if(carrying=='tool axe' || carrying=='tool picaxe' || carrying=='tool pokeball'){
                    blinkRed();

                }

            }

            else if(selectedDiv =='leaf divBg' ||selectedDiv =='tree divBg'){

                if(carrying=='tool axe'){
                    $(this).removeClass(selectedDiv);
                    $(this).addClass("divBg");

                    if(selectedDiv =='leaf divBg'){
                        leafCount++;

                    }
                    else if(selectedDiv =='tree divBg'){
                        treeCount++;
                    }
                }
                else if(carrying=='tool shovel' || carrying=='tool picaxe' || carrying=='tool pokeball'){
                    blinkRed();
                }
            }
            else if(selectedDiv =='rock divBg'){

                if(carrying=='tool picaxe'){
                    $(this).removeClass(selectedDiv);
                    $(this).addClass("divBg");
                    rockCount++;
                }

                else if(carrying=='tool axe' || carrying=='tool shovel' || carrying=='tool pokeball'){
                    blinkRed();
                }
            }

         

            var strNameUpdate = selectedDiv.replace(" divBg","");
            updateInventory(strNameUpdate);

        }
        if (selectedDiv=='divBg'){

            var classToAdd = currentResource + " divBg";



            updateInventory(currentResource);
        }

    }

    var resourceArray = ["grass","leaf","dirt","rock","tree"];

    var countNames= [grassCount,leafCount,dirtCount,rockCount,treeCount];

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
        }
        $(hash).html(hashCount);
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
     
        selectedTool="";

        makeBg();
        toolMaker();
        inventoryMaker();

 
        displayed=false;

        $('#healthbar').css("width","180px");

        

    makeBg();
    toolMaker();
    inventoryMaker();

});
