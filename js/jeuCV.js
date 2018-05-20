'use strict';
//window.onload = function(){
window.addEventListener('DOMContentLoaded', function () {

    // GETTER D'ELEMENTS HTML
    var container = window.document.getElementById('charaContainer');
    var link = window.document.getElementById('link');
    var gameFrame = window.document.getElementById('gameFrame');




    // INIT SCORE
    /************************** Gestion du score ***********************************/
    var divScore = window.document.getElementById('divScore');
    divScore.innerHTML = 'Score = ';
    var scoreValue = 0;
    var scoreIncrement = function () {
        scoreValue = scoreValue + 15;
        divScore.innerHTML = 'Score = ' + scoreValue;
        console.log(scoreValue);
    };

    /************************** Fin de la gestion du score *************************/


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

    /*
    GESTION DES MOUVEMENTS et INTERVALS
    */
    var arrowInterval;
    var bowAttackIndex = 0;
    var swordIndex = 0;
    var rightIndex = 0;
    var leftIndex = 0;
    var topIndex = 0;
    var bottomIndex = 0;
    var decompositionLink = {
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
        }]
    };
    /*
    FIN DE LA GESTION DES MOUVEMENTS
    */
    container.style.top = '383px';
    container.style.left = '0px';
    container.style.width = '65px';
    container.style.height = '63px';
    gameFrame.style.width = '1280px';
    gameFrame.style.height = '470px';

    var pixelLeft = parseFloat(container.style.left);
    var pixelTop = parseFloat(container.style.top);
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
        this.damageCount = 0;
        this.enemiesContainer;
        this.spriteEnemies;
        this.pixelEnemiesLeft;
        this.pixelEnemiesTop;
        this.pixelTop;
        var that = this;
        this.initEnemies = function () {

            that.enemiesContainer = window.document.createElement('div');
            that.enemiesContainer.setAttribute('id', 'enemiesContainer');
            that.enemiesContainer.style.position = 'absolute';
            that.enemiesContainer.style.overflow = 'hidden';
            that.enemiesContainer.style.border = 'solid';
            var deltaTop = parseFloat(container.style.top) + (parseFloat(container.style.height) / 4);
            that.enemiesContainer.style.top = deltaTop + 'px';
            that.enemiesContainer.style.left = '1300px';
            that.enemiesContainer.style.width = '36px';
            that.enemiesContainer.style.height = '47px';
            that.enemiesContainer.style.display = 'none';
            that.spriteEnemies = window.document.createElement('img');
            that.spriteEnemies.setAttribute('id', 'enemies');
            that.spriteEnemies.setAttribute('src', '../sprites/megamanX.png');
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
            that.pixelTop = parseFloat(container.style.top);

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
                that.pixelEnemiesTop = that.pixelTop + 'px';
            }

            that.enemiesContainer.style.display = 'block';
            that.enemiesContainer.style.width = that.decompositionEnemies.walkingLeft[that.compteurEnemies].maskWidth;
            that.enemiesContainer.style.height = that.decompositionEnemies.walkingLeft[that.compteurEnemies].maskHeight;
            that.spriteEnemies.style.top = that.decompositionEnemies.walkingLeft[that.compteurEnemies].imageTop;
            that.spriteEnemies.style.left = that.decompositionEnemies.walkingLeft[that.compteurEnemies].imageLeft;

            that.compteurEnemies++;

            that.pixelEnemiesLeft = that.pixelEnemiesLeft - 2;
            that.enemiesContainer.style.left = that.pixelEnemiesLeft + 'px';
            that.pixelEnemiesTop = that.pixelTop;
        };
    };

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
            arrowSprite.setAttribute('src', '../sprites/linksprite.png');
            var leftArrow = parseFloat(container.style.left) + 49; // distance depuis laquelle la fleche part
            var topArrow = parseFloat(container.style.top);
            topArrow = topArrow + (parseFloat(container.style.height) / 2);
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
            var pixelLeftArrow = parseFloat(that.arrowDiv.style.left);
            var widthArrow = parseFloat(that.arrowDiv.style.width);
            pixelLeftArrow = pixelLeftArrow + 3;
            that.arrowDiv.style.left = pixelLeftArrow + 'px';
            if (parseFloat(that.arrowDiv.style.left) >= 1000) {
                that.arrowDiv.remove();
            }

            for (var indexArrow = 0; indexArrow < listEnemies.length; indexArrow++) {
                that.leftEnemy = parseFloat(listEnemies[indexArrow].enemiesContainer.style.left);
                that.widthEnemy = parseFloat(listEnemies[indexArrow].enemiesContainer.style.width);
                if (pixelLeftArrow >= (that.leftEnemy + that.widthEnemy) && pixelLeftArrow <= (that.leftEnemy - that.widthEnemy)) {
                    console.log('collision Flèche');
                    that.arrowDiv.remove();

                    listEnemies[indexArrow].enemiesContainer.style.width = listEnemies[indexArrow].decompositionEnemies.damagedEnemies[0].maskWidth;
                    listEnemies[indexArrow].enemiesContainer.style.height = listEnemies[indexArrow].decompositionEnemies.damagedEnemies[0].maskHeight;
                    listEnemies[indexArrow].spriteEnemies.style.top = listEnemies[indexArrow].decompositionEnemies.damagedEnemies[0].imageTop;
                    listEnemies[indexArrow].spriteEnemies.style.left = listEnemies[indexArrow].decompositionEnemies.damagedEnemies[0].imageLeft;
                    listEnemies[indexArrow].damageCount++;

                    if (listEnemies[indexArrow].damageCount == 3) {
                        console.log('enemi touché 3 fois');
                    }
                }
            }
        };        
    };

    var listEnemies = [];
    var nbEnemies = 0;

    var arrowApparition = function(){
        var arrow = new ArrowConstructor();
        arrow.arrowCreation();
        setInterval(arrow.arrowDeplacement, 5);
    };

    var enemiesApparition = function () {
        if (nbEnemies < 5) {
            listEnemies[nbEnemies] = new RobotConstructor();
            listEnemies[nbEnemies].initEnemies();
            setInterval(listEnemies[nbEnemies].animationEnemies, 20);
            nbEnemies++;
        }
    };


    /************************* Animation de Link **************************/
    var animationLinkDroite = function () {
        if (rightIndex >= decompositionLink.walkingRight.length) {
            rightIndex = 0;
        }
        container.style.width = decompositionLink.walkingRight[rightIndex].maskWidth;
        container.style.height = decompositionLink.walkingRight[rightIndex].maskHeight;
        link.style.top = decompositionLink.walkingRight[rightIndex].imageTop;
        link.style.left = decompositionLink.walkingRight[rightIndex].imageLeft;
        rightIndex++;
        if (parseFloat(container.style.left) > 1240) {
            pixelLeft = pixelLeft + 0;
            container.style.left = pixelLeft + 'px';
        } else {
            pixelLeft = pixelLeft + 2;
            container.style.left = pixelLeft + 'px';
        }
    };
    var animationLinkGauche = function () {
        if (leftIndex >= decompositionLink.walkingLeft.length) {
            leftIndex = 0;
        }
        container.style.width = decompositionLink.walkingLeft[leftIndex].maskWidth;
        container.style.height = decompositionLink.walkingLeft[leftIndex].maskHeight;
        link.style.top = decompositionLink.walkingLeft[leftIndex].imageTop;
        link.style.left = decompositionLink.walkingLeft[leftIndex].imageLeft;
        leftIndex++;
        if (parseFloat(container.style.left) < 0) {
            pixelLeft = pixelLeft - 0;
            container.style.left = pixelLeft + 'px';
        } else {
            pixelLeft = pixelLeft - 2;
            container.style.left = pixelLeft + 'px';
        }
    };
    var animationLinkTop = function () {
        if (topIndex >= decompositionLink.walkingRight.length) {
            topIndex = 0;
        }
        container.style.width = decompositionLink.walkingRight[topIndex].maskWidth;
        container.style.height = decompositionLink.walkingRight[topIndex].maskHeight;
        link.style.top = decompositionLink.walkingRight[topIndex].imageTop;
        link.style.left = decompositionLink.walkingRight[topIndex].imageLeft;
        topIndex++;
        if (parseFloat(container.style.top) < 360) {
            pixelTop = pixelTop - 0;
            container.style.top = pixelTop + 'px';
        } else {
            pixelTop = pixelTop - 2;
            container.style.top = pixelTop + 'px';
        }
    };
    var animationLinkBottom = function () {
        if (bottomIndex >= decompositionLink.walkingRight.length) {
            bottomIndex = 0;
        }
        container.style.width = decompositionLink.walkingRight[bottomIndex].maskWidth;
        container.style.height = decompositionLink.walkingRight[bottomIndex].maskHeight;
        link.style.top = decompositionLink.walkingRight[bottomIndex].imageTop;
        link.style.left = decompositionLink.walkingRight[bottomIndex].imageLeft;
        bottomIndex++;
        if (parseFloat(container.style.top) > 383) {
            pixelTop = pixelTop + 0;
            container.style.top = pixelTop + 'px';
        } else {
            pixelTop = pixelTop + 2;
            container.style.top = pixelTop + 'px';
        }
    };
    var swordCounter = 0;
    var swordAttackAnimation = function () {
        var swordInterval = setInterval(function () {
            if (swordIndex >= decompositionLink.swordAttackMotion.length) {
                swordIndex = 0;
                clearInterval(swordInterval);
            }
            container.style.width = decompositionLink.swordAttackMotion[swordIndex].maskWidth;
            container.style.height = decompositionLink.swordAttackMotion[swordIndex].maskHeight;
            link.style.top = decompositionLink.swordAttackMotion[swordIndex].imageTop;
            link.style.left = decompositionLink.swordAttackMotion[swordIndex].imageLeft;
            swordIndex++;
            for (var index = 0; index < listEnemies.length; index++) {
                if (pixelLeft >= (pixelLeft + parseFloat(listEnemies[index].enemiesContainer.style.width)) && (pixelLeft + parseFloat(container.style.width)) <= parseFloat(listEnemies[index].enemiesContainer.style.left)) {
                    console.log('Collision Epee');
                    listEnemies[index].enemiesContainer.style.width = listEnemies[index].decompositionEnemies.damagedEnemies[0].maskWidth;
                    listEnemies[index].enemiesContainer.style.height = listEnemies[index].decompositionEnemies.damagedEnemies[0].maskHeight;
                    listEnemies[index].spriteEnemies.style.top = listEnemies[index].decompositionEnemies.damagedEnemies[0].imageTop;
                    listEnemies[index].spriteEnemies.style.left = listEnemies[index].decompositionEnemies.damagedEnemies[0].imageLeft;
                    swordCounter++;
                }
            }
            container.style.left = pixelLeft + 'px';
        }, 50);
    };
    var bowAttackAnimation = function () {
        var bowAnimationInterval = setInterval(function () {
            if (bowAttackIndex >= decompositionLink.bowAttackMotions.length) {
                bowAttackIndex = 0;
                arrowApparition();
                clearInterval(bowAnimationInterval);
            }

            container.style.width = decompositionLink.bowAttackMotions[bowAttackIndex].maskWidth;
            container.style.height = decompositionLink.bowAttackMotions[bowAttackIndex].maskHeight;
            link.style.top = decompositionLink.bowAttackMotions[bowAttackIndex].imageTop;
            link.style.left = decompositionLink.bowAttackMotions[bowAttackIndex].imageLeft;

            bowAttackIndex++;

            container.style.left = pixelLeft + 'px';
        }, 200);
    };
    /************************** Fin de l'animation de Link *************************/
    /************************** Gestion des flèches ********************************/
    
    // var arrowCreation = function () {
    //     var arrowDiv = document.createElement('div');
    //     arrowDiv.setAttribute('id', 'divFleche');
    //     var arrowSprite = document.createElement('img');
    //     arrowSprite.setAttribute('id', 'spriteFleche');
    //     arrowSprite.setAttribute('src', '../sprites/linksprite.png');
    //     var leftArrow = parseFloat(container.style.left) + 49; // distance depuis laquelle la fleche part
    //     var topArrow = parseFloat(container.style.top);
    //     topArrow = topArrow + (parseFloat(container.style.height) / 2);
    //     arrowDiv.style.position = 'absolute';
    //     arrowDiv.style.overflow = 'hidden';
    //     arrowDiv.style.width = '49px';
    //     arrowDiv.style.height = '10px';
    //     arrowDiv.style.top = topArrow + 'px';
    //     arrowDiv.style.left = leftArrow + 'px';
    //     arrowSprite.style.transform = 'scaleX(-1)';
    //     arrowSprite.style.position = 'absolute';
    //     arrowSprite.style.left = '-540px';
    //     arrowSprite.style.top = '-604px';
    //     arrowDiv.appendChild(arrowSprite);
    //     gameFrame.appendChild(arrowDiv);

    //     var leftEnemy;
    //     var widthEnemy;
    //     var widthArrow = parseFloat(arrowDiv.style.width);

    //     var arrowDeplacement = function () {
    //         var pixelLeftArrow = parseFloat(arrowDiv.style.left);
    //         pixelLeftArrow = pixelLeftArrow + 3;
    //         arrowDiv.style.left = pixelLeftArrow + 'px';
    //         if (parseFloat(arrowDiv.style.left) >= 1000) {
    //             arrowDiv.remove();
    //             console.log(arrowDiv.style.left);
    //         }
    //         for (var indexArrow = 0; indexArrow < listEnemies.length; indexArrow++) {
    //             leftEnemy = parseFloat(listEnemies[indexArrow].enemiesContainer.style.left);
    //             widthEnemy = parseFloat(listEnemies[indexArrow].enemiesContainer.style.width);
    //             if (pixelLeftArrow <= (leftEnemy + widthEnemy) && (pixelLeftArrow + widthArrow) >= leftEnemy) {
    //                 console.log('collision Flèche');
    //                 arrowDiv.remove();

    //                 listEnemies[indexArrow].enemiesContainer.style.width = listEnemies[indexArrow].decompositionEnemies.damagedEnemies[0].maskWidth;
    //                 listEnemies[indexArrow].enemiesContainer.style.height = listEnemies[indexArrow].decompositionEnemies.damagedEnemies[0].maskHeight;
    //                 listEnemies[indexArrow].spriteEnemies.style.top = listEnemies[indexArrow].decompositionEnemies.damagedEnemies[0].imageTop;
    //                 listEnemies[indexArrow].spriteEnemies.style.left = listEnemies[indexArrow].decompositionEnemies.damagedEnemies[0].imageLeft;
    //                 listEnemies[indexArrow].damageCount++;
    //                 if (listEnemies[indexArrow].damageCount == 3) {
    //                     console.log('enemi touché 3 fois');
    //                 }
    //             }


    //         }
    //     };
    //     arrowInterval = setInterval(arrowDeplacement, 5);
    // };

    /************************** Debut du gestionnaire de touches *******************/
    window.onkeydown = function (event) {
        var code = event.keyCode;
        console.log(code);
        switch (code) {
            case 68: // Marque la touche D pour la droite
                animationLinkDroite();
                break;
            case 81: // Marque la touche Q pour la gauche
                animationLinkGauche();
                break;
            case 90: // Marque la touche Z pour le haut
                animationLinkTop();
                break;
            case 83: // Marque la touche S pour le bas
                animationLinkBottom();
                break;
            case 13: // Marque la touche entrée pour coup d'épée
                swordAttackAnimation();
                break;
            case 170: // marque la touche étoiles pour tir arc
                bowAttackAnimation();
                break;
            case 220:
                bowAttackAnimation();
                break;
        }; // fin du switch 
    }; // fin du keydown

    /* INTERVALS D'ANIMATIONS */
    setInterval(blinkTitle, 200);
    setInterval(enemiesApparition, 3000);
});
//};

// DIFFERENCIER LA PARTIE INIT DE LA PARTIE ANIMATION (set Interval sur la partie animation)