'use strict';

window.onload = function(){ 
    // Getter d'elements html.
    
    var container = window.document.getElementById('charaContainer');
    var link = window.document.getElementById('link');
    var gameFrame = window.document.getElementById('gameFrame');
    var enemiesContainer = window.document.getElementById('enemiesContainer');
    var omegaman = window.document.getElementById('enemies');
    var divScore = window.document.getElementById('divScore');
    var titrePrincipal = window.document.getElementById('titre');
    var iconeCv = window.document.getElementById('iconeCv');
    var iconeGit = window.document.getElementById('iconeGit');
    
    //---------------------------------------------------------
    
    // initialisation du score
    var scoreValue = 0;
    var textScore = document.createTextNode('Score = '+ scoreValue);
    divScore.appendChild(textScore);
    
    // Permet de gérer l'opacité du Titre.
    var opacite = 1;
    var sensOpacite = 0.15;
    
    var blinkTitle = function(){
        if (((sensOpacite > 0) && (opacite >= 1)) || ((sensOpacite < 0) && (opacite <= 0))){
             sensOpacite *= -1
         }
        opacite = opacite + sensOpacite;
        titrePrincipal.style.opacity = opacite;
    };
    
    // Gestion de l'opacité des logos.
    
    iconeCv.onmouseover = function(){
        iconeCv.style.opacity = 1;
    };
    
    iconeCv.onmouseout = function(){
        iconeCv.style.opacity = 0.7;
    }
    
    iconeGit.onmouseover = function(){
        iconeGit.style.opacity = 1;
    };
    
    iconeGit.onmouseout = function(){
        iconeGit.style.opacity = 0.7;
    }
    
    
    /*
    
    GESTION DES MOUVEMENTS
    */
    
    
    
    var monIntervalAttack;
    var monIntervalFleche;
        
    var decompositionLink = {
		marcherDroite: [{
			largeurMasque: '64px',
			hauteurMasque: '63px',
			topDeImage: '-200px',
			leftDeImage: '-307px'
		},{
			largeurMasque: '65px',
			hauteurMasque: '63px',
			topDeImage: '-200px',
			leftDeImage: '-378px'
		},{
			largeurMasque: '57px',
			hauteurMasque: '63px',
			topDeImage: '-200px',
			leftDeImage: '-446px'
		},{
			largeurMasque: '57px',
			hauteurMasque: '63px',
			topDeImage: '-200px',
			leftDeImage: '-511px'
		},{
			largeurMasque: '67px',
			hauteurMasque: '63px',
			topDeImage: '-200px',
			leftDeImage: '-575px'
		},{
			largeurMasque: '75px',
			hauteurMasque: '63px',
			topDeImage: '-200px',
			leftDeImage: '-651px'
		},{
			largeurMasque: '65px',
			hauteurMasque: '63px',
			topDeImage: '-200px',
			leftDeImage: '-378px'
		}],
        marcherGauche: [{
			largeurMasque: '65px',
			hauteurMasque: '63px',
			topDeImage: '-200px',
			leftDeImage: '-378px'
        },{
			largeurMasque: '75px',
			hauteurMasque: '63px',
			topDeImage: '-200px',
			leftDeImage: '-651px'
		},{
			largeurMasque: '57px',
			hauteurMasque: '63px',
			topDeImage: '-200px',
			leftDeImage: '-511px'
		},{
			largeurMasque: '67px',
			hauteurMasque: '63px',
			topDeImage: '-200px',
			leftDeImage: '-575px'
		},{
			largeurMasque: '65px',
			hauteurMasque: '63px',
			topDeImage: '-200px',
			leftDeImage: '-378px'
		},{
			largeurMasque: '57px',
			hauteurMasque: '63px',
			topDeImage: '-200px',
			leftDeImage: '-446px'
		},{
			largeurMasque: '64px',
			hauteurMasque: '63px',
			topDeImage: '-200px',
			leftDeImage: '-307px'
		}],
        attaqueDroite: [{
			largeurMasque: '54px',
			hauteurMasque: '59px',
			topDeImage: '-393px',
			leftDeImage: '-247px'
		},{
			largeurMasque: '47px',
			hauteurMasque: '60px',
			topDeImage: '-393px',
			leftDeImage: '-310px'
		},{
			largeurMasque: '81px',
			hauteurMasque: '59px',
			topDeImage: '-393px',
			leftDeImage: '-365px'
		},{
            largeurMasque: '64px',
			hauteurMasque: '63px',
			topDeImage: '-200px',
			leftDeImage: '-307px'
        }],
        attaqueArc: [{
			largeurMasque: '60px',
			hauteurMasque: '63px',
			topDeImage: '-550px',
			leftDeImage: '-424px'
		},{
			largeurMasque: '84px',
			hauteurMasque: '63px',
			topDeImage: '-550px',
			leftDeImage: '-492px'
		},{
			largeurMasque: '75px',
			hauteurMasque: '66px',
			topDeImage: '-550px',
			leftDeImage: '-581px'
		},{
			largeurMasque: '60px',
			hauteurMasque: '63px',
			topDeImage: '-550px',
			leftDeImage: '-656px'
		},{
            largeurMasque: '64px',
			hauteurMasque: '63px',
			topDeImage: '-200px',
			leftDeImage: '-307px'
        }]
	};
    var decompositionEnemies = {
        avancerGauche: [{
          largeurMasque: '36px',
          hauteurMasque: '47px',
          topDeImage: '-135px',
          leftDeImage: '-423px'
      },{
          largeurMasque: '42px',
          hauteurMasque: '47px',
          topDeImage: '-135px',
          leftDeImage: '-373px'
      },{
          largeurMasque: '43px',
          hauteurMasque: '47px',
          topDeImage: '-135px',
          leftDeImage: '-700px'
      },{
          largeurMasque: '33px',
          hauteurMasque: '47px',
          topDeImage: '-135px',
          leftDeImage: '-654px'
      },{
          largeurMasque: '36px',
          hauteurMasque: '47px',
          topDeImage: '-135px',
          leftDeImage: '-610px'
      },{
          largeurMasque: '41px',
          hauteurMasque: '47px',
          topDeImage: '-135px',
          leftDeImage: '-565px'
      },{
          largeurMasque: '41px',
          hauteurMasque: '47px',
          topDeImage: '-135px',
          leftDeImage: '-515px'
      },{
          largeurMasque: '38px',
          hauteurMasque: '47px',
          topDeImage: '-135px',
          leftDeImage: '-468px'
      }],
       damagedEnemies: [{
          largeurMasque: '47px',
          hauteurMasque: '47px',   
          topDeImage: '-71px',
          leftDeImage: '-556px' 
       },{
          largeurMasque: '47px',
          hauteurMasque: '47px',
          topDeImage: '-71px',
          leftDeImage: '-605px'
       }],
        disparitionEnemies: [{
          largeurMasque: '35px',
          hauteurMasque: '47px',
          topDeImage: '-71px',
          leftDeImage: '-658px'
        },{
          largeurMasque: '35px',
          hauteurMasque: '47px',
          topDeImage: '-71px',
          leftDeImage: '-658px' 
        },{
          largeurMasque: '20px',
          hauteurMasque: '47px',
          topDeImage: '-71px',
          leftDeImage: '-730px'  
        }]
    };
    
/*
FIN DE LA GESTION DES MOUVEMENTS
*/
    
    container.style.top = '383px';
    container.style.left = '0px';
    container.style.width = '65px';
    container.style.height = '63px';
    
    enemiesContainer.style.top = '400px';
    enemiesContainer.style.left = '1300px';
    enemiesContainer.style.width = '36px';
    enemiesContainer.style.height = '47px';
    
    
    gameFrame.style.width = '1280px';
    gameFrame.style.height = '470px';
    
    var pixelLeft = parseFloat(container.style.left);
    var pixelTop = parseFloat(container.style.top);
    
    var pixelEnemiesLeft = parseFloat(enemiesContainer.style.left);
    var pixelEnemiesTop = parseFloat(enemiesContainer.style.top);
    
//     PERMET DE DEPLACER LE SPRITE DE FACON CONTINUE. (a utiliser pour les méchants.) avec un setInterval (à la fin)
    //************************* Gestion des ennemis ******************************/
    
    var compteurEnemies = 0;
    var animationEnemies = function(){
            if(compteurEnemies >= decompositionEnemies.avancerGauche.length){
                compteurEnemies = 0;
            }
        
            while(parseFloat(enemiesContainer.style.left) > 1243){
                    enemiesContainer.style.display = 'none';
                    console.log('Ah');
                    pixelEnemiesLeft = pixelEnemiesLeft - 2;
                    enemiesContainer.style.left = pixelEnemiesLeft + 'px';
                    pixelEnemiesTop = pixelTop;
                }
            enemiesContainer.style.display = 'block';
            enemiesContainer.style.width = decompositionEnemies.avancerGauche[compteurEnemies].largeurMasque;
            enemiesContainer.style.height = decompositionEnemies.avancerGauche[compteurEnemies].hauteurMasque;
            omegaman.style.top = decompositionEnemies.avancerGauche[compteurEnemies].topDeImage;
            omegaman.style.left = decompositionEnemies.avancerGauche[compteurEnemies].leftDeImage;
            compteurEnemies++;

            pixelEnemiesLeft = pixelEnemiesLeft - 2;
            enemiesContainer.style.left = pixelEnemiesLeft + 'px';
            pixelEnemiesTop = pixelTop;
        
    };

    var apparitionEnemies = function(){
        
        var containerEnemies = document.createElement('div');
        containerEnemies.setAttribute('id', 'containerEnemies');
        var spriteEnemies = document.createElement('img');
        spriteEnemies.setAttribute('id', 'spriteEnemies');
        spriteEnemies.setAttribute('src', '../sprites/omegaman.png');
        var topEnemies = parseFloat(containerEnemies.style.top);
        var leftEnemies = parseFloat(containerEnemies.style.top);
        topEnemies = topEnemies + parseFloat(container.style.top);
        
        containerEnemies.style.position = 'absolute';
        containerEnemies.style.overflow = 'hidden';
        containerEnemies.style.width = '49px';
        containerEnemies.style.height = '10px';
        containerEnemies.style.border = 'solid black 1px';
        containerEnemies.style.top = topEnemies + 'px';
             
        containerEnemies.style.left = leftEnemies + 'px';
        spriteEnemies.style.transform = 'scaleX(-1)';
        spriteEnemies.style.position = 'absolute';
        spriteEnemies.style.left = '-423px';
        spriteEnemies.style.top = '-135px';
        
        containerEnemies.appendChild(spriteEnemies);
        gameFrame.appendChild(containerEnemies);
        animationEnemies();
        
    };
    
    /************************* Fin de la gestion des ennemis ***************************/    
    
    /************************* Animation de Link **************************/
    
    var i = 0;
    var animationLinkDroite = function(){
         
            if(i >= decompositionLink.marcherDroite.length){
                i = 0;
            }
            container.style.width = decompositionLink.marcherDroite[i].largeurMasque;
            container.style.height = decompositionLink.marcherDroite[i].hauteurMasque;
            link.style.top = decompositionLink.marcherDroite[i].topDeImage;
            link.style.left = decompositionLink.marcherDroite[i].leftDeImage;
            i++;
        
        // console.log(container.style.width, container.style.height, link.style.top, link.style.left);
        //console.log('LEFT : ' + container.style.left)
        
            if(parseFloat(container.style.left) > 1240){
                pixelLeft = pixelLeft + 0;
                container.style.left = pixelLeft + 'px';
            } else {
                pixelLeft = pixelLeft + 2;
                container.style.left = pixelLeft + 'px';
            }
        
    };
    var j = 0;
    
    var animationLinkGauche = function(){
        
        if(j >= decompositionLink.marcherGauche.length){
            j = 0;
        }
        container.style.width = decompositionLink.marcherGauche[j].largeurMasque;
        container.style.height = decompositionLink.marcherGauche[j].hauteurMasque;
        link.style.top = decompositionLink.marcherGauche[j].topDeImage;
        link.style.left = decompositionLink.marcherGauche[j].leftDeImage;
        j++;
        
        //console.log(container.style.width, container.style.height, link.style.top, link.style.left)

        if(parseFloat(container.style.left) < 0){
            pixelLeft = pixelLeft - 0;
            container.style.left = pixelLeft + 'px';
            
        } else {
            pixelLeft = pixelLeft - 2;
            container.style.left = pixelLeft + 'px';
        }
    };
    var m = 0
    
    var animationLinkTop = function(){
         
            if(m >= decompositionLink.marcherDroite.length){
                m = 0;
            }
            container.style.width = decompositionLink.marcherDroite[m].largeurMasque;
            container.style.height = decompositionLink.marcherDroite[m].hauteurMasque;
            link.style.top = decompositionLink.marcherDroite[m].topDeImage;
            link.style.left = decompositionLink.marcherDroite[m].leftDeImage;
            m++;
        
        // console.log(container.style.width, container.style.height, link.style.top, link.style.left);
        //console.log('LEFT : ' + container.style.left)
            if(parseFloat(container.style.top) < 360){
                pixelTop = pixelTop - 0;
                container.style.top = pixelTop + 'px';
            } else {
                pixelTop = pixelTop - 2;
                container.style.top = pixelTop + 'px';
            }
    };
    
    var n = 0
    var animationLinkBottom = function(){
         
            if(n >= decompositionLink.marcherDroite.length){
                n = 0;
            }
            container.style.width = decompositionLink.marcherDroite[n].largeurMasque;
            container.style.height = decompositionLink.marcherDroite[n].hauteurMasque;
            link.style.top = decompositionLink.marcherDroite[n].topDeImage;
            link.style.left = decompositionLink.marcherDroite[n].leftDeImage;
            n++;
        
        // console.log(container.style.width, container.style.height, link.style.top, link.style.left);
        //console.log('LEFT : ' + container.style.left)
            if(parseFloat(container.style.top) > 383){
                pixelTop = pixelTop + 0;
                container.style.top = pixelTop + 'px';
            } else {
                pixelTop = pixelTop + 2;
                container.style.top = pixelTop + 'px';                
            }
    };
    
    var k = 0;
    var animationLinkAttack = function(){
        
         monIntervalAttack = setInterval(function(){ 
            
             if(k >= decompositionLink.attaqueDroite.length){
                    k = 0; 
                    clearInterval(monIntervalAttack);
            }
             
            container.style.width = decompositionLink.attaqueDroite[k].largeurMasque;
            container.style.height = decompositionLink.attaqueDroite[k].hauteurMasque;
            link.style.top = decompositionLink.attaqueDroite[k].topDeImage;
            link.style.left = decompositionLink.attaqueDroite[k].leftDeImage;
            k++;

            //console.log(container.style.width, container.style.height, link.style.top, link.style.left);
        
            container.style.left = pixelLeft + 'px';
            
        }, 50);
        // clearInterval(monIntervalAttack); // interval à effacer
    };
    
    var animationLinkArcAttack = function(){
        var l = 0;
         monIntervalFleche = setInterval(function(){ 
            
             
            container.style.width = decompositionLink.attaqueArc[l].largeurMasque;
            container.style.height = decompositionLink.attaqueArc[l].hauteurMasque;
            link.style.top = decompositionLink.attaqueArc[l].topDeImage;
            link.style.left = decompositionLink.attaqueArc[l].leftDeImage;
            l++;

            //console.log(container.style.width, container.style.height, link.style.top, link.style.left);
        
            container.style.left = pixelLeft + 'px';
            if(l >= decompositionLink.attaqueArc.length){
                    l = 0;
                    clearInterval(monIntervalFleche);
                flecheCreation();
            }
        }, 200);
    };
    
    /************************** Fin de l'animation de Link *************************/
    
    
    
    /************************** Gestion des flèches ********************************/
    
    var flecheCreation = function(){
      
        var divFleche = document.createElement('div');
        divFleche.setAttribute('id', 'divFleche');
        var spriteFleche = document.createElement('img');
        spriteFleche.setAttribute('id', 'spriteFleche');
        spriteFleche.setAttribute('src', '../sprites/linksprite.png');
        var leftFleche = parseFloat(container.style.left) + 49; // distance depuis laquelle la fleche part
        var topFleche = parseFloat(container.style.top); 
        topFleche = topFleche + (parseFloat(container.style.height) / 2);
        
             divFleche.style.position = 'absolute';
             divFleche.style.overflow = 'hidden';
             divFleche.style.width = '49px';
             divFleche.style.height = '10px';
             divFleche.style.top = topFleche + 'px';
             
             divFleche.style.left = leftFleche + 'px';
             spriteFleche.style.transform = 'scaleX(-1)';
             spriteFleche.style.position = 'absolute';
             spriteFleche.style.left = '-540px';
             spriteFleche.style.top = '-604px';
        
             divFleche.appendChild(spriteFleche);
             gameFrame.appendChild(divFleche);
            
            var arrowDeplacement = function(){
        
            var pixelFleche = parseFloat(divFleche.style.left);
                pixelFleche = pixelFleche + 10;
                divFleche.style.left = pixelFleche + 'px';
        
        if(parseFloat(divFleche.style.left) >= 1000){
            divFleche.style.display = 'none';
            divFleche.remove();
                    //clearInterval(monIntervalFleche);
        }
    };
        
        
        
             monIntervalFleche = setInterval(arrowDeplacement, 5);
        
    };
    
    /************************** Fin de la gestion des flèches **********************/
    
    /************************** Gestion du score ***********************************/
    
    var scoreIncrement = function(){
        scoreValue++;
        console.log(scoreValue);
    };
    
    /************************** Fin de la gestion du score *************************/
    
    
    /************************** Debut du gestionnaire de touches *******************/
    
    window.onkeydown = function(event){
        
        var code = event.keyCode;
        console.log(code);
        
        switch(code){
            
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
                
                animationLinkAttack();
                
            break;
                
            case 170: // marque la touche étoiles pour tir arc
                animationLinkArcAttack();
            break;
        }; // fin du switch 
    }; // fin du keydown

/******************* fin du gestionnaire de touches ***************************/
    
/* INTERVALS D'ANIMATIONS */
    
    setInterval(blinkTitle, 200);  
    //setInterval(apparitionEnemies, 80);
    //setInterval(scoreIncrement, 300);

};


