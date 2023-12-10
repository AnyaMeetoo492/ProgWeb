let taille = 0; // taille de la grille
let nbbombe = 0; // nombre de bombes dans la grille
let matriceBombesChiffres = []; // matrice contenant les bombes et les chiffres (nb de bombes au voisinage de la case)
let matriceHistorique = []; // matrice qui sauvegarde les cases cliquees du user
let matriceBombes = []; // matrice des positions des bombes
let table = []; // table affichee en HTML

// NOTE
// Bombes represente avec -1


//affiche le tableau a l'ecran
function afficheTab(table){
    table.innerHTML = ""; // efface le tableau pour mettre des nouvelles valeurs
    // affiche le tableau
    let i=0; // ligne 0
    let j=0; // colonne 0
    for (i=0; i<taille; i++){ // pour chaque ligne 
    
        const Ligne = document.createElement("TR"); 

        for (j=0; j<taille; j++){ // pour chaque colonne
            let Cell = document.createElement("TD"); // pour chaque case sur la ligne du tableau
            // ajoute l'élement nécéssaire à chaque cellule du tableau
            if (matriceHistorique[i][j]==-1){ // si la case n'a pas ete cliquee
                if (matriceBombesChiffres[i][j] == -1){ // si c'est une bombe
                    Cell.innerHTML = "<button type='button' name='button' id='buttonhide' onclick='jeu(1,"+i+","+j+")'>"+matriceBombesChiffres[i][j]+"</button>"; 
                }
                else { // si c'est un chiffre
                Cell.innerHTML = "<button type='button' name='button' id='buttonhide' onclick='jeu(0,"+i+","+j+")'></button>";
                }
            }
            else { // si la case a deja ete cliquee
                if (matriceBombesChiffres[i][j] == 0){ // si c'est un 0
                    Cell.innerHTML = "<button type='button' name='button' id='buttonrien'>"+matriceBombesChiffres[i][j]+"</button>"; 
                }
                else if (matriceBombesChiffres[i][j] == -1){ // si c'est une bombe
                    Cell.innerHTML = "<button type='button' name='button' id='buttonbombe'>"+matriceBombesChiffres[i][j]+"</button>"; 
                }
                else { // si c'est un chiffre
                Cell.innerHTML = "<button type='button' name='button' id='buttonchiffre'>"+matriceBombesChiffres[i][j]+"</button>";
                }

            }
            // on ecrit la ligne case par case
            Ligne.appendChild(Cell);
            
        }
        // on ecrit le tableau ligne par ligne
        table.appendChild(Ligne);
    }  
}

// Initialise le mode = easy/medium/hard 
// donne la taille du tableau et le nombre de drapeau
function modeChoisi(){
    let mode = document.getElementById("mode").value;

    if (mode == "Easy"){
        taille = 5;
        nbbombe = 2;
    }
    else if (mode == "Medium"){
        taille = 14;
        nbbombe = 40;
    }
    else {
        taille = 20;
        nbbombe = 99;
    }
    return (taille,nbbombe);

}

// Initialise une matriceBombesChiffres avec bombes et chiffres et la renvoit 
// Modifie le tableau pour le début de partie
function initTable(){
    table = document.getElementById("tableNonCache"); // tableau affiché sur écran

    matriceBombesChiffres = [];
    matriceBombes = [];
    matriceHistorique = [];

    // remplit la matriceBombesChiffres de zeros
    for (let l=0; l<taille; l++){
        let arrayzeros1 = [];
        for (let c=0; c<taille; c++){
            arrayzeros1.push(0);
        }
        matriceBombesChiffres.push(arrayzeros1);
    }
    // remplit la matriceBombes de zeros
    for (let l=0; l<taille; l++){
        let arrayzeros2 = [];
        for (let c=0; c<taille; c++){
            arrayzeros2.push(0);
        }
        matriceBombes.push(arrayzeros2);

    }
    
     // remplit la matriceHistorique de -1
    for (let l=0; l<taille; l++){
        let arrayvide = [];
        for (let c=0; c<taille; c++){
            arrayvide.push(-1);
        }
        matriceHistorique.push(arrayvide);
    }

    // les bombes dans la matriceBombesChiffres a des positions randoms et on copie les positions dans matriceBombes
    while (nbbombe>0){

        let randomligne = Math.floor(Math.random() * taille); // ligne random
        let randomcolonne =  Math.floor(Math.random() * taille); // colonne random

        if (matriceBombesChiffres[randomligne][randomcolonne] == 0){ // si pas de bommbe déjà, mettre une bombe
            matriceBombes[randomligne][randomcolonne] = -1;
            matriceBombesChiffres[randomligne][randomcolonne] = -1; 
            nbbombe--; 
        }

    }

    // Compte les bombes autour de chaque case
    Chiffres(matriceBombesChiffres, taille, taille)
    // Affiche la table à l'écran
    afficheTab(table);
     
}

// Compte les nombres de bombes autour d'une case et update la matriceBombesChiffres
function Chiffres(matriceBombesChiffres, maxLigne, maxColonne){
    for(let i = 0; i < maxLigne; i++){ //maxLigne est le num de la dernière ligne 
        for(let j = 0; j < maxColonne; j++){ //maxColonne est le num de la dernière colonne
            if(matriceBombesChiffres[i][j] == -1){ // si on est sur une bombe
                let Ideb = i; // ligne debut
                let Ifin = i; // ligne fin
                let Jdeb = j; // colonne debut
                let Jfin = j; // colonne fin

                // LIGNE DEBUT
                if (i-1 >= 0){ // si on est pas sur le bord haut
                    Ideb = i - 1; 
                }
                // LIGNE FIN
                if (i+1 < maxLigne){ // si on est pas sur le bord bas
                    Ifin = i + 1; 
                }

                // COLONNE DEBUT
                if (j-1 >= 0){ // si on est pas sur le bord gauche
                    Jdeb = j - 1;
                }
                // COLONNE FIN
                if (j+1 < maxColonne){ // si on est pas sur le bord droit
                    Jfin = j + 1;
                }
                
                // On ajoute des 1 sur les cases au voisinage de la bombe
                for(let l = Ideb; l<=Ifin ; l++){
                    for(let c = Jdeb; c<=Jfin; c++){
                        if(matriceBombesChiffres[l][c]!=-1 && matriceBombesChiffres[l][c]<9){ // si on n'est pas sur la case bombe
                            matriceBombesChiffres[l][c] = matriceBombesChiffres[l][c] + 1; // rajout un 1
                        }
                    }
                }
            }
        }
    }
}

// ANYA : MARCHE PAS, PAS TOUCHE
// Affiche tous les zeors au voisinage de la case zero clique
// function afficheZeros(matriceHistorique, i, j) {
//     directions = 0;
//     while (directions < 4) {
//         i_zeros = i;
//         j_zeros = j;
//         while (matriceBombesChiffres[i][j] == 0 && i >= 0 && i < taille && j >= 0 && j < taille) { // tant qu'on est sur un zero
//             matriceHistorique[i_zeros][j_zeros] = 0;
//             if (directions = 0) { // on va a gauche
//                 i_zeros = i_zeros - 1;
//             }
//             if (directions = 1) { // on va a droite
//                 i_zeros = i_zeros + 1;
//             }
//             if (directions = 2) { // on va en haut
//                 j_zeros = j_zeros - 1;
//             }
//             if (directions = 3) { // on va en bas
//                 j_zeros = j_zeros + 1;
//             }
//         }
//         directions++; // change de direction
//     }
// }

// Comparaison entre 2 matrices
function matrice_egale(matA,matB){
    let i=0;
    let j=0;
    let res=1;
    for (i=0;i<matA.length;i++){ // chaque ligne 
        for (j=0;j<matA[i].length;j++){ //chaque colonne
            if (matA[i][j]!=matB[i][j]){ // si les cases sont différentes
                res=0;
            }
        }
    }
    return res;
}

// Faire un popup avec le text donne
function popup(texte) {
    alert(texte);
}

// Si le user a perdu le jeu, montre le score et reset le jeu
function perdu(){
    popup("Perdu");
    console.log("OVER");
    modeChoisi();
    ChangeBack();
    initTable(); // reset la grille et l'affiche
    ResetDecompte();
}

// Si le user a gagne, montre le score et reset le jeu
function gagne(){
    popup("Victoire");
    console.log("Victoire");
    modeChoisi();
    ChangeBack();
    initTable(); // reset la grille et l'affiche
    ResetDecompte();
}

// Lance le jeu
// fini le jeu si on trouve toutes les bombes ou user a clique sur une bombe
function jeu(GameOver,i,j){
    if (GameOver){ // si user clique sur une bombe
        perdu();
    }
    else { // si c'est un chiffre
        matriceHistorique[i][j] = 0; // update la matrice de cliques, on a clique sur la case
        // afficheZeros(matriceHistorique,i,j);
        if (matrice_egale(matriceHistorique,matriceBombes)){ // si on a clique sur toutes les cases sauf les bombes, on a gagne
            gagne();
        }
    }
    afficheTab(table); // affiche le tableau updated
}

//TIMER DU JEU
let decompte; 
function decompteur(){
    let temps;
    let mode = document.getElementById("mode").value; //récupération du mode sur la page
    //différents temps selon le mode choisi
    if (mode == "Easy"){
        temps = 120 ;
    }
    else if (mode == "Medium"){
        temps = 420;
    }
    else {
        temps = 900;
    }
    const timerElement = document.getElementById("timer"); //timer affiché sur la page
    function Red_Temps(){ 
        let m = parseInt(temps / 60, 10); //définit les minutes
        let s = parseInt(temps % 60, 10); //définit les secondes
        //pour l'affichage avec 00:00
        if (m<10){ 
            m = "0" + m;
        }
        if (s<10){
            s = "0" + s;
        }
        timerElement.innerText = m + ":" + s;
        if (temps<=0){
            temps = 0;
        }
        else{
            temps--;
        }
        // arrêter le jeu quand le decompte est terminé
        if (m==0 && s==0){
            jeu(1,0,0);
        }
    }
    decompte = setInterval(Red_Temps,1000);//1000 c'est 1s, effectue Red_temps les 1s
}
function ResetDecompte(){
    //function qui permet de remettre le compteur à 0 quand partie terminée/changement de mode
    clearInterval(decompte);
    decompteur();
}

//IMAGE DE FOND
function ChangeBack(){
    // fonction qui permet de changer l'image de fond du jeu selon le mode
    let mode = document.getElementById("mode").value; //récupération du mode
    if (mode == "Easy"){
        document.body.style.backgroundImage= 'url(easy.jpg)';
        document.body.style.color = 'black';
    }
    else if (mode == "Medium"){
        document.body.style.backgroundImage= 'url(medium.jpg)';
        document.body.style.color = 'white';
    }
    else {
        document.body.style.backgroundImage= 'url(hell.jpg)';
        document.body.style.color = 'white';
    }
    document.body.style.backgroundSize="cover";
}
