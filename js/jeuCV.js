'use strict';
//window.onload = function(){
window.addEventListener('DOMContentLoaded', function () {
$(document).ready(function(){
document.getElementById('formations').style.display = 'none';
document.getElementById('xp').style.display = 'none';

    // GETTER D'ELEMENTS HTML
    var containerLink = window.document.getElementById('charaContainer');
    var link = window.document.getElementById('link');
    var gameFrame = window.document.getElementById('gameFrame');
    var skillFrame = document.getElementById('skillFrame');
    var divFormaXp = $('#forma-xp');

    // Display none pour ne pas l'afficher dès le début.
    document.getElementById('forma-xp').style.display = 'none';



    // INIT SCORE
    /************************** Gestion du score ***********************************/
    var divScore = window.document.getElementById('divScore');
    var scoreValue = 0;
    divScore.innerHTML = 'Score : ' + scoreValue;

    var scoreIncrement = function () { 
        
            if(scoreValue === 500){
                divFormaXp.show(1000);
                $('#formations').fadeIn(1000, 'linear');
                $('#xp').fadeIn(1000, 'swing');
            }
             
          
        

        scoreValue = scoreValue + 50;
        divScore.innerHTML = 'Score = ' + scoreValue;
        console.log(scoreValue);

        if(scoreValue === 1500){
            console.log('Rentréeeee');
            containerLink.style.display = 'none';
            var fightingGif = document.createElement('img');
            fightingGif.setAttribute('src', 'img/fight.gif');
            fightingGif.style.position = 'absolute';
            fightingGif.style.width = '500px';
            fightingGif.style.left = '355px';
            fightingGif.style.top = '100px';
            gameFrame.appendChild(fightingGif);
        }          
    };

    // INIT OPACITE TITRE
    var principalTitle = window.document.getElementById('titre');
    var cvIcon = window.document.getElementById('iconeCv');
    var gitIcon = window.document.getElementById('iconeGit');
    var opacity = 1;
    var opcityDirection = 0.15;

    var blinkTitle = function () {

        if (((opcityDirection > 0) && (opacity >= 1)) || ((opcityDirection < 0) && (opacity <= 0))) {
            opcityDirection *= -1
        }
        opacity = opacity + opcityDirection;
        principalTitle.style.opacity = opacity;
    };


    // Gestion de l'opacité des logos.
    cvIcon.onmouseover = function () {
        cvIcon.style.opacity = 1;
    };
    cvIcon.onmouseout = function () {
        cvIcon.style.opacity = 0.7;
    }
    gitIcon.onmouseover = function () {
        gitIcon.style.opacity = 1;
    };
    gitIcon.onmouseout = function () {
        gitIcon.style.opacity = 0.7;
    }


    // MOTIONS ET INTERVALS
    var nbEnemies = 0;
    var bowAttackIndex = 0;
    var swordIndex = 0;
    var rightIndex = 0;
    var leftIndex = 0;
    var topIndex = 0;
    var bottomIndex = 0;
    var listEnemies = [];
    var arrowInterval;
    var enemiesInterval;


    // - Tableau d'Objet représentants les décomposition du mouvement de Link
    var linkMotions = {
        walkingRight: [{
            maskWidth: '64px',
            maskHeight: '63px',
            imageTop: '-200px',
            imageLeft: '-307px'
        }, {
            maskWidth: '65px',
            maskHeight: '63px',
            imageTop: '-200px',
            imageLeft: '-378px'
        }, {
            maskWidth: '57px',
            maskHeight: '63px',
            imageTop: '-200px',
            imageLeft: '-446px'
        }, {
            maskWidth: '57px',
            maskHeight: '63px',
            imageTop: '-200px',
            imageLeft: '-511px'
        }, {
            maskWidth: '67px',
            maskHeight: '63px',
            imageTop: '-200px',
            imageLeft: '-575px'
        }, {
            maskWidth: '75px',
            maskHeight: '63px',
            imageTop: '-200px',
            imageLeft: '-651px'
        }, {
            maskWidth: '65px',
            maskHeight: '63px',
            imageTop: '-200px',
            imageLeft: '-378px'
        }],
        walkingLeft: [{
            maskWidth: '65px',
            maskHeight: '63px',
            imageTop: '-200px',
            imageLeft: '-378px'
        }, {
            maskWidth: '75px',
            maskHeight: '63px',
            imageTop: '-200px',
            imageLeft: '-651px'
        }, {
            maskWidth: '57px',
            maskHeight: '63px',
            imageTop: '-200px',
            imageLeft: '-511px'
        }, {
            maskWidth: '67px',
            maskHeight: '63px',
            imageTop: '-200px',
            imageLeft: '-575px'
        }, {
            maskWidth: '65px',
            maskHeight: '63px',
            imageTop: '-200px',
            imageLeft: '-378px'
        }, {
            maskWidth: '57px',
            maskHeight: '63px',
            imageTop: '-200px',
            imageLeft: '-446px'
        }, {
            maskWidth: '64px',
            maskHeight: '63px',
            imageTop: '-200px',
            imageLeft: '-307px'
        }],
        swordAttackMotion: [{
            maskWidth: '54px',
            maskHeight: '59px',
            imageTop: '-393px',
            imageLeft: '-247px'
        }, {
            maskWidth: '47px',
            maskHeight: '60px',
            imageTop: '-393px',
            imageLeft: '-310px'
        }, {
            maskWidth: '81px',
            maskHeight: '59px',
            imageTop: '-393px',
            imageLeft: '-365px'
        }, {
            maskWidth: '64px',
            maskHeight: '63px',
            imageTop: '-200px',
            imageLeft: '-307px'
        }],
        bowAttackMotions: [{
            maskWidth: '60px',
            maskHeight: '63px',
            imageTop: '-550px',
            imageLeft: '-424px'
        }, {
            maskWidth: '84px',
            maskHeight: '63px',
            imageTop: '-550px',
            imageLeft: '-492px'
        }, {
            maskWidth: '75px',
            maskHeight: '66px',
            imageTop: '-550px',
            imageLeft: '-581px'
        }, {
            maskWidth: '60px',
            maskHeight: '63px',
            imageTop: '-550px',
            imageLeft: '-656px'
        }, {
            maskWidth: '64px',
            maskHeight: '63px',
            imageTop: '-200px',
            imageLeft: '-307px'
        }],
        victoryFrame: [{
            maskWidth: '42px',
            maskHeight: '61px',
            imageTop: '-43px',
            imageLeft: '-508px'
        }]
    };

    // MISE EN PLACE DE LINK
    containerLink.style.top = '383px';
    containerLink.style.left = '0px';
    containerLink.style.width = '65px';
    containerLink.style.height = '63px';
    gameFrame.style.width = '1280px';
    gameFrame.style.height = '470px';

    // - Récupération des valeurs de Link.
    var containerLinkLeft = parseFloat(containerLink.style.left);
    var containerLinkTop = parseFloat(containerLink.style.top);

    // - CONSTRUCTEURS D'ENNEMIS 
    var RobotConstructor = function () {
        this.compteurEnemies = 0;
        this.decompositionEnemies = {
            walkingLeft: [{
                maskWidth: '36px',
                maskHeight: '47px',
                imageTop: '-135px',
                imageLeft: '-423px'
            }, {
                maskWidth: '42px',
                maskHeight: '47px',
                imageTop: '-135px',
                imageLeft: '-373px'
            }, {
                maskWidth: '43px',
                maskHeight: '47px',
                imageTop: '-135px',
                imageLeft: '-700px'
            }, {
                maskWidth: '33px',
                maskHeight: '47px',
                imageTop: '-135px',
                imageLeft: '-654px'
            }, {
                maskWidth: '36px',
                maskHeight: '47px',
                imageTop: '-135px',
                imageLeft: '-610px'
            }, {
                maskWidth: '41px',
                maskHeight: '47px',
                imageTop: '-135px',
                imageLeft: '-565px'
            }, {
                maskWidth: '41px',
                maskHeight: '47px',
                imageTop: '-135px',
                imageLeft: '-515px'
            }, {
                maskWidth: '38px',
                maskHeight: '47px',
                imageTop: '-135px',
                imageLeft: '-468px'
            }],
            damagedEnemies: [{
                maskWidth: '46px',
                maskHeight: '46px',
                imageTop: '-71px',
                imageLeft: '-561px'
            }],
            disparitionEnemies: [{
                maskWidth: '35px',
                maskHeight: '47px',
                imageTop: '-71px',
                imageLeft: '-658px'
            }, {
                maskWidth: '35px',
                maskHeight: '47px',
                imageTop: '-71px',
                imageLeft: '-658px'
            }, {
                maskWidth: '20px',
                maskHeight: '47px',
                imageTop: '-71px',
                imageLeft: '-730px'
            }]
        };

        this.enemiesContainer;
        this.spriteEnemies;
        this.pixelEnemiesLeft;
        this.pixelEnemiesTop;
        this.containerLinkTop;

        // On évite ici le transfert de contexte.
        var that = this;
        that.damageCount = 0;
        // METHODE DE MISE EN PLACE DE L'ENNEMI
        this.initEnemies = function () {

            that.enemiesContainer = window.document.createElement('div');
            that.enemiesContainer.setAttribute('id', 'enemiesContainer');
            that.enemiesContainer.style.position = 'absolute';
            that.enemiesContainer.style.overflow = 'hidden';
            var deltaTop = parseFloat(containerLink.style.top) + (parseFloat(containerLink.style.height) / 4);
            that.enemiesContainer.style.top = deltaTop + 'px';
            that.enemiesContainer.style.left = '1300px';
            that.enemiesContainer.style.width = '36px';
            that.enemiesContainer.style.height = '47px';
            that.enemiesContainer.style.display = 'none';
            that.spriteEnemies = window.document.createElement('img');
            that.spriteEnemies.setAttribute('id', 'enemies');
            that.spriteEnemies.setAttribute('src', 'sprites/megamanX.png');
            that.spriteEnemies.style.position = 'absolute';
            that.spriteEnemies.style.width = '765px';
            that.spriteEnemies.style.height = '765px';
            that.spriteEnemies.style.transform = 'scaleX(-1)';
            that.enemiesContainer.appendChild(that.spriteEnemies);
            gameFrame.appendChild(that.enemiesContainer);
            console.log('init enemies finished');
        };

        this.animationEnemies = function () {
            that.pixelEnemiesLeft = parseFloat(that.enemiesContainer.style.left);
            that.pixelEnemiesTop = parseFloat(that.enemiesContainer.style.top);
            that.containerLinkTop = parseFloat(containerLink.style.top);

            if (that.compteurEnemies >= that.decompositionEnemies.walkingLeft.length) {
                that.compteurEnemies = 0;
            }
            if (parseFloat(that.enemiesContainer.style.left) < -1) {
                that.enemiesContainer.remove();
            }

            while (parseFloat(that.enemiesContainer.style.left) > 1243) {
                that.enemiesContainer.style.display = 'none';
                that.pixelEnemiesLeft = that.pixelEnemiesLeft - 2;
                that.enemiesContainer.style.left = that.pixelEnemiesLeft + 'px';
                that.pixelEnemiesTop = that.containerLinkTop + 'px';
            }

            that.enemiesContainer.style.display = 'block';
            that.enemiesContainer.style.width = that.decompositionEnemies.walkingLeft[that.compteurEnemies].maskWidth;
            that.enemiesContainer.style.height = that.decompositionEnemies.walkingLeft[that.compteurEnemies].maskHeight;
            that.spriteEnemies.style.top = that.decompositionEnemies.walkingLeft[that.compteurEnemies].imageTop;
            that.spriteEnemies.style.left = that.decompositionEnemies.walkingLeft[that.compteurEnemies].imageLeft;

            that.compteurEnemies++;

            that.pixelEnemiesLeft = that.pixelEnemiesLeft - 4;
            that.enemiesContainer.style.left = that.pixelEnemiesLeft + 'px';
            that.pixelEnemiesTop = that.containerLinkTop;
        };
    };

    // - CONSTRUCTEUR DE FLECHES
    var ArrowConstructor = function(){
        this.leftEnemy;
        this.widthEnemy;
        this.arrowDiv;
        this.compteurDisparition = 0;
        var that = this;

        this.arrowCreation = function () {
            that.arrowDiv = window.document.createElement('div');
            that.arrowDiv.setAttribute('id', 'divFleche');
            var arrowSprite = window.document.createElement('img');
            arrowSprite.setAttribute('id', 'spriteFleche');
            arrowSprite.setAttribute('src', 'sprites/linksprite.png');
            var leftArrow = parseFloat(containerLink.style.left) + 49; // distance depuis laquelle la fleche part
            var topArrow = parseFloat(containerLink.style.top);
            topArrow = topArrow + (parseFloat(containerLink.style.height) / 2);
            that.arrowDiv.style.position = 'absolute';
            that.arrowDiv.style.overflow = 'hidden';
            that.arrowDiv.style.width = '49px';
            that.arrowDiv.style.height = '10px';
            that.arrowDiv.style.top = topArrow + 'px';
            that.arrowDiv.style.left = leftArrow + 'px';
            arrowSprite.style.transform = 'scaleX(-1)';
            arrowSprite.style.position = 'absolute';
            arrowSprite.style.left = '-540px';
            arrowSprite.style.top = '-604px';
            that.arrowDiv.appendChild(arrowSprite);
            gameFrame.appendChild(that.arrowDiv);
        };
            
        this.arrowDeplacement = function () {
            var arrowDivLeft = parseFloat(that.arrowDiv.style.left);
            var arrowDivWidth = parseFloat(that.arrowDiv.style.width);
            var intervalArrowDeplacement = setInterval(function(){

                arrowDivLeft = arrowDivLeft + 5;
                that.arrowDiv.style.left = arrowDivLeft + 'px';
                if (parseFloat(that.arrowDiv.style.left) >= 700) {
                    that.arrowDiv.remove();
                    clearInterval(intervalArrowDeplacement);
                } else {
                    for (var indexArrow = 0; indexArrow < listEnemies.length; indexArrow++) {
                        that.leftEnemy = parseFloat(listEnemies[indexArrow].enemiesContainer.style.left);
                        that.widthEnemy = parseFloat(listEnemies[indexArrow].enemiesContainer.style.width);
                        
                        if (collisionDetection(that.arrowDiv, listEnemies[indexArrow].enemiesContainer)) {
                            listEnemies[indexArrow].enemiesContainer.style.width = listEnemies[indexArrow].decompositionEnemies.damagedEnemies[0].maskWidth;
                            listEnemies[indexArrow].enemiesContainer.style.height = listEnemies[indexArrow].decompositionEnemies.damagedEnemies[0].maskHeight;
                            listEnemies[indexArrow].spriteEnemies.style.top = listEnemies[indexArrow].decompositionEnemies.damagedEnemies[0].imageTop;
                            listEnemies[indexArrow].spriteEnemies.style.left = listEnemies[indexArrow].decompositionEnemies.damagedEnemies[0].imageLeft;
                            listEnemies[indexArrow].damageCount++;
                            clearInterval(intervalArrowDeplacement);

                            that.arrowDiv.remove(); 
                        
                            if(listEnemies[indexArrow].damageCount == 3){
                                listEnemies[indexArrow].enemiesContainer.style.top = '0px';
                                listEnemies[indexArrow].enemiesContainer.style.display = 'none';
                                scoreIncrement();
                                skillApparition(indexArrow);
                                listEnemies[indexArrow].enemiesContainer.remove();
                                
                            }
                        }
                    }
                }
            }, 5);
        };        
    };

    // - Fonction permettant de déclancher l'initialisation et l'animation d'une nouvelle Flèche
    var arrowApparition = function(){
        var arrow = new ArrowConstructor();
        arrow.arrowCreation();
        arrow.arrowDeplacement();        
    };
    
    // - Fonction permettant de déclancher l'apparition des ennemis
    var enemiesApparition = function () {
        if (nbEnemies < 30) { // - Ici 30 correspond au nombre total d'ennemis
            listEnemies[nbEnemies] = new RobotConstructor();
            listEnemies[nbEnemies].initEnemies();
            enemiesInterval = setInterval(listEnemies[nbEnemies].animationEnemies, 50);
            
            nbEnemies++;
        }
    };


    // - Animations de Link 
    var linkRightAnimation = function () {
        if (rightIndex >= linkMotions.walkingRight.length) {
            rightIndex = 0;
        }
        containerLink.style.width = linkMotions.walkingRight[rightIndex].maskWidth;
        containerLink.style.height = linkMotions.walkingRight[rightIndex].maskHeight;
        link.style.top = linkMotions.walkingRight[rightIndex].imageTop;
        link.style.left = linkMotions.walkingRight[rightIndex].imageLeft;
        rightIndex++;
        if (parseFloat(containerLink.style.left) > 1240) {
            containerLinkLeft = containerLinkLeft + 0;
            containerLink.style.left = containerLinkLeft + 'px';
        } else {
            containerLinkLeft = containerLinkLeft + 2;
            containerLink.style.left = containerLinkLeft + 'px';
        }
    };

    var linkLeftAnimation = function () {
        if (leftIndex >= linkMotions.walkingLeft.length) {
            leftIndex = 0;
        }
        containerLink.style.width = linkMotions.walkingLeft[leftIndex].maskWidth;
        containerLink.style.height = linkMotions.walkingLeft[leftIndex].maskHeight;
        link.style.top = linkMotions.walkingLeft[leftIndex].imageTop;
        link.style.left = linkMotions.walkingLeft[leftIndex].imageLeft;
        leftIndex++;
        if (parseFloat(containerLink.style.left) < 0) {
            containerLinkLeft = containerLinkLeft - 0;
            containerLink.style.left = containerLinkLeft + 'px';
        } else {
            containerLinkLeft = containerLinkLeft - 2;
            containerLink.style.left = containerLinkLeft + 'px';
        }
    };

    var linkTopAnimation = function () {
        if (topIndex >= linkMotions.walkingRight.length) {
            topIndex = 0;
        }
        containerLink.style.width = linkMotions.walkingRight[topIndex].maskWidth;
        containerLink.style.height = linkMotions.walkingRight[topIndex].maskHeight;
        link.style.top = linkMotions.walkingRight[topIndex].imageTop;
        link.style.left = linkMotions.walkingRight[topIndex].imageLeft;
        topIndex++;
        if (parseFloat(containerLink.style.top) < 360) {
            containerLinkTop = containerLinkTop - 0;
            containerLink.style.top = containerLinkTop + 'px';
        } else {
            containerLinkTop = containerLinkTop - 2;
            containerLink.style.top = containerLinkTop + 'px';
        }
    };

    var linkBottomAnimation = function () {
        if (bottomIndex >= linkMotions.walkingRight.length) {
            bottomIndex = 0;
        }
        containerLink.style.width = linkMotions.walkingRight[bottomIndex].maskWidth;
        containerLink.style.height = linkMotions.walkingRight[bottomIndex].maskHeight;
        link.style.top = linkMotions.walkingRight[bottomIndex].imageTop;
        link.style.left = linkMotions.walkingRight[bottomIndex].imageLeft;
        bottomIndex++;
        if (parseFloat(containerLink.style.top) > 383) {
            containerLinkTop = containerLinkTop + 0;
            containerLink.style.top = containerLinkTop + 'px';
        } else {
            containerLinkTop = containerLinkTop + 2;
            containerLink.style.top = containerLinkTop + 'px';
        }
    };

    // - Animations d'attaque
    var swordAttackAnimation = function () {
        var swordInterval = setInterval(function () {
            if (swordIndex >= linkMotions.swordAttackMotion.length) {
                swordIndex = 0;
                clearInterval(swordInterval);
            }
            containerLink.style.width = linkMotions.swordAttackMotion[swordIndex].maskWidth;
            containerLink.style.height = linkMotions.swordAttackMotion[swordIndex].maskHeight;
            link.style.top = linkMotions.swordAttackMotion[swordIndex].imageTop;
            link.style.left = linkMotions.swordAttackMotion[swordIndex].imageLeft;
            swordIndex++;
            
            for (var index = 0; index < listEnemies.length; index++) {
                if (collisionDetection(containerLink, listEnemies[index].enemiesContainer)) {
                    console.log('Damage count for enemy : ' + listEnemies[index].damageCount + '\nSword damage.');
                    listEnemies[index].enemiesContainer.style.width = listEnemies[index].decompositionEnemies.damagedEnemies[0].maskWidth;
                    listEnemies[index].enemiesContainer.style.height = listEnemies[index].decompositionEnemies.damagedEnemies[0].maskHeight;
                    listEnemies[index].spriteEnemies.style.top = listEnemies[index].decompositionEnemies.damagedEnemies[0].imageTop;
                    listEnemies[index].spriteEnemies.style.left = listEnemies[index].decompositionEnemies.damagedEnemies[0].imageLeft;
                    listEnemies[index].damageCount++;

                    if(listEnemies[index].damageCount == 3){
                        listEnemies[index].enemiesContainer.remove();
                        scoreIncrement();
                        skillApparition(index);
                        console.log('threeeeee !');
                    }


                }
            }
            containerLink.style.left = containerLinkLeft + 'px';
        }, 50);
    };

    var bowAttackAnimation = function () {
        var bowAnimationInterval = setInterval(function () {
            if (bowAttackIndex >= linkMotions.bowAttackMotions.length) {
                bowAttackIndex = 0;
                arrowApparition();
                clearInterval(bowAnimationInterval);
            }

            containerLink.style.width = linkMotions.bowAttackMotions[bowAttackIndex].maskWidth;
            containerLink.style.height = linkMotions.bowAttackMotions[bowAttackIndex].maskHeight;
            link.style.top = linkMotions.bowAttackMotions[bowAttackIndex].imageTop;
            link.style.left = linkMotions.bowAttackMotions[bowAttackIndex].imageLeft;

            bowAttackIndex++;

            containerLink.style.left = containerLinkLeft + 'px';
        }, 200);
    };


    // - Fonction permettant de détecter une collision entre 2 containers.
    var collisionDetection = function(container1, container2){

        var container1Left = parseFloat(container1.style.left);
        var container1Top = parseFloat(container1.style.top);
        var container1Height = parseFloat(container1.style.height);
        var container1Width = parseFloat(container1.style.width);

        var container2Left = parseFloat(container2.style.left);
        var container2Width = parseFloat(container2.style.width);
        var container2Top = parseFloat(container2.style.top);
        var container2Height = parseFloat(container2.style.height);

        if((container2Left >= container1Left + container1Width) || (container2Left + container2Width <= container1Left) 
        || (container2Top >= container1Top + container1Height) || (container2Top + container2Height <= container1Top)){
            return false;
        } else {
            return true;
        }
    };

    // - Fonction qui gère l'apparition des compétences.
    var skillApparition = function(skillCount){
        
        var logoHTML = window.document.createElement('div');
        logoHTML.setAttribute('id', 'logoHTML');
        var logoCSS3 = window.document.createElement('div');
        logoCSS3.setAttribute('id', 'logoCSS3');
        var logoJavaScript = window.document.createElement('div');
        logoJavaScript.setAttribute('id', 'logoJavaScript');
        var logoAngular = window.document.createElement('div');
        logoAngular.setAttribute('id', 'logoAngular');
        var logoJQuery = window.document.createElement('div');
        logoJQuery.setAttribute('id', 'logoJQuery');
        var logoBootstrap = window.document.createElement('div');
        logoBootstrap.setAttribute('id', 'logoBootstrap');
        var logoNodeJS = window.document.createElement('div');
        logoNodeJS.setAttribute('id', 'logoNodeJS');
        var logoMongoDB = window.document.createElement('div');
        logoMongoDB.setAttribute('id', 'logoMongoDB');
        var logoXpress = window.document.createElement('div');
        logoXpress.setAttribute('id', 'logoXpress');
        var logoMeteor = window.document.createElement('div');
        logoMeteor.setAttribute('id', 'logoMeteor');
        var logoAjax = window.document.createElement('div');
        logoAjax.setAttribute('id', 'logoAjax');

        if(skillCount === 1){
            
            var imgHTML = document.createElement('img');
            imgHTML.setAttribute('src', 'img/html5Logo.png');
            imgHTML.style.width = '70px';
            imgHTML.style.height = '70px';
            logoHTML.style.width = '70px';
            logoHTML.style.height = '70px';
            logoHTML.style.overflow = 'hidden';
            logoHTML.style.display = 'none';
            logoHTML.appendChild(imgHTML);
            skillFrame.appendChild(logoHTML);
            $('#logoHTML').fadeIn(1300, 'linear');

        } else if(skillCount === 3){
            var imgCSS3 = document.createElement('img');
            imgCSS3.setAttribute('src', 'img/css3Logo.png');
            imgCSS3.style.width = '70px';
            imgCSS3.style.height = '70px';
            logoCSS3.style.width = '70px';
            logoCSS3.style.height = '70px';
            logoCSS3.style.overflow = 'hidden';
            logoCSS3.style.display = 'none';
            logoCSS3.appendChild(imgCSS3);
            skillFrame.appendChild(logoCSS3);
            $('#logoCSS3').fadeIn(2000, 'swing');

        } else if(skillCount === 5){
            var imgJavaScript = document.createElement('img');
            imgJavaScript.setAttribute('src', 'img/javascriptLogo.png');
            imgJavaScript.style.width = '70px';
            imgJavaScript.style.height = '70px';
            logoJavaScript.style.width = '70px';
            logoJavaScript.style.height = '70px';
            logoJavaScript.style.overflow = 'hidden';
            logoJavaScript.style.display = 'none';
            logoJavaScript.appendChild(imgJavaScript);
            skillFrame.appendChild(logoJavaScript);
            $('#logoJavaScript').fadeIn(1300, 'linear');

        } else if(skillCount === 7){
            var imgAngular = document.createElement('img');
            imgAngular.setAttribute('src', 'img/angularLogo.png');
            imgAngular.style.width = '70px';
            imgAngular.style.height = '70px';
            logoAngular.style.width = '70px';
            logoAngular.style.height = '70px';
            logoAngular.style.overflow = 'hidden';
            logoAngular.style.display = 'none';
            logoAngular.appendChild(imgAngular);
            skillFrame.appendChild(logoAngular);
            $('#logoAngular').fadeIn(1300, 'swing');

        } else if(skillCount === 9){
            var imgJquery = document.createElement('img');
            imgJquery.setAttribute('src', 'img/jqueryLogo.png');
            imgJquery.style.width = '70px';
            imgJquery.style.height = '70px';
            logoJQuery.style.width = '70px';
            logoJQuery.style.height = '70px';
            logoJQuery.style.overflow = 'hidden';
            logoJQuery.style.display = 'none';
            logoJQuery.appendChild(imgJquery);
            skillFrame.appendChild(logoJQuery);
            $('#logoJQuery').fadeIn(1300, 'linear');

        } else if(skillCount === 11){
            var imgBootstrap = document.createElement('img');
            imgBootstrap.setAttribute('src', 'img/bootstrapLogo.png');
            imgBootstrap.style.width = '70px';
            imgBootstrap.style.height = '70px';
            logoBootstrap.style.width = '70px';
            logoBootstrap.style.height = '70px';
            logoBootstrap.style.overflow = 'hidden';
            logoBootstrap.style.display = 'none';
            logoBootstrap.appendChild(imgBootstrap);
            skillFrame.appendChild(logoBootstrap);
            $('#logoBootstrap').fadeIn(1300, 'swing');

        } else if(skillCount === 13){
            var imgNode = document.createElement('img');
            imgNode.setAttribute('src', 'img/nodeJSLogo.png');
            imgNode.style.width = '95px';
            imgNode.style.height = '75px';
            logoNodeJS.style.width = '95px';
            logoNodeJS.style.height = '75px';
            logoNodeJS.style.overflow = 'hidden';
            logoNodeJS.style.display = 'none';
            logoNodeJS.appendChild(imgNode);
            skillFrame.appendChild(logoNodeJS);
            $('#logoNodeJS').fadeIn(1300, 'linear');

        } else if(skillCount === 15){
            var imgMongoDB = document.createElement('img');
            imgMongoDB.setAttribute('src', 'img/mongoDBLogo.png');
            imgMongoDB.style.width = '70px';
            imgMongoDB.style.height = '70px';
            logoMongoDB.style.width = '70px';
            logoMongoDB.style.height = '70px';
            logoMongoDB.style.overflow = 'hidden';
            logoMongoDB.style.display = 'none';
            logoMongoDB.appendChild(imgMongoDB);
            skillFrame.appendChild(logoMongoDB);
            $('#logoMongoDB').fadeIn(1300, 'swing');

        } else if(skillCount === 18){
            var imgXpress = document.createElement('img');
            imgXpress.setAttribute('src', 'img/expressJSLogo.png');
            imgXpress.style.width = '95px';
            imgXpress.style.height = '45px';
            logoXpress.style.width = '95px';
            logoXpress.style.height = '45px';
            logoXpress.style.overflow = 'hidden';
            logoXpress.style.display = 'none';
            logoXpress.appendChild(imgXpress);
            skillFrame.appendChild(logoXpress);
            $('#logoXpress').fadeIn(1300, 'linear');

        } else if(skillCount === 21){
            var imgMeteor = document.createElement('img');
            imgMeteor.setAttribute('src', 'img/meteorJSLogo.png');
            imgMeteor.style.width = '70px';
            imgMeteor.style.height = '70px';
            logoMeteor.style.width = '70px';
            logoMeteor.style.height = '70px';
            logoMeteor.style.overflow = 'hidden';
            logoMeteor.style.display = 'none';
            logoMeteor.appendChild(imgMeteor);
            skillFrame.appendChild(logoMeteor);
            $('#logoMeteor').fadeIn(1300, 'swing');

        } else if(skillCount === 23){
            var imgAjax = document.createElement('img');
            imgAjax.setAttribute('src', 'img/ajaxLogo.png');
            imgAjax.style.width = '95px';
            imgAjax.style.height = '45px';
            logoAjax.style.width = '95px';
            logoAjax.style.height = '45px';
            logoAjax.style.overflow = 'hidden';
            logoAjax.style.display = 'none';
            logoAjax.appendChild(imgAjax);
            skillFrame.appendChild(logoAjax);
            $('#logoAjax').fadeIn(1300, 'linear');
        }

    };

    // - Debut du gestionnaire de touches 
    window.onkeydown = function (event) {
        var code = event.keyCode;
        console.log(code);
        switch (code) {
            case 68: // Marque la touche D pour la droite
                linkRightAnimation();
                break;
            case 81: // Marque la touche Q pour la gauche
                linkLeftAnimation();
                break;
            case 90: // Marque la touche Z pour le haut
                linkTopAnimation();
                break;
            case 83: // Marque la touche S pour le bas
                linkBottomAnimation();
                break;
            case 13: // Marque la touche entrée pour coup d'épée
                swordAttackAnimation();
                break;
            case 170: // marque la touche étoile pour tir arc
                bowAttackAnimation();
                break;
            case 220: // Marque la touche étoile pour autres Navigateurs.
                bowAttackAnimation();
                break;
        };
    };

    /* INTERVALS D'ANIMATIONS */
    setInterval(blinkTitle, 200);
    setInterval(enemiesApparition, 3000);
});
});
