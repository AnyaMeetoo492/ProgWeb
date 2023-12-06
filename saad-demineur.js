let taille = 0;
let nbbombe = 0;
let drapeau =0;

//affiche le tableau a l'ecran
function afficheTab(taille, table, matrice){
    table.innerHTML = ""; // efface le tableau pour mettre des nouvelles valeurs
    
    // affiche le tableau
    for (let i=0; i<taille; i++){ // pour chaque ligne 
    
        const Ligne = document.createElement("TR"); 

        for (let j=0; j<taille; j++){ // pour chaque colonne
            let Cell = document.createElement("TD");
            // ajoute l'élement nécéssaire à chaque cellule du tableau

            if (matrice[i][j] == -1){ // bombe
                Cell.innerHTML = "<button type='button' name='button' id='buttonhide' onclick='jeu(1,matrice[i][j])'>"+matrice[i][j]+"</button>"; 
            }
            else { //chiffre
                Cell.innerHTML = "<button type='button' name='button' id='buttonhide' onclick='jeu(0,matrice[i][j])'>"+matrice[i][j]+"</button>"; 
            }

            Ligne.appendChild(Cell);
            
        }
        
        table.appendChild(Ligne);
    }  
}

// Initialise le mode = easy/medium/hard 
// donne la taille du tableau et le nombre de drapeau
function modeChoisi(){
    let mode = document.getElementById("mode").value;

    if (mode == "Easy"){
        taille = 10;
        nbbombe = 10;
        drapeau = 5;
    }
    else if (mode == "Medium"){
        taille = 14;
        nbbombe = 40;
        drapeau = 10;
    }
    else {
        taille = 20;
        nbbombe = 99;
        drapeau = 15;
    }
    return (taille,nbbombe);

}

// Initialise une matrice avec bombes et chiffres et la renvoit 
// Modifie le tableau pour le début de partie
function initTable(){
    // let taille = 10;
    // let nbbombe = 10;
    const table = document.getElementById("tableNonCache"); // tableau affiché sur écran

    let matriceBombe = []; // matrice des bombes

    // remplit la matrice de zeros --- difficile a creer une matrice de zeros 
    for (let l=0; l<taille; l++){
        let arrayzeros = [];
        for (let c=0; c<taille; c++){
            arrayzeros.push(0);
        }
        matriceBombe.push(arrayzeros);
    }

    // les bombes dans la matrice a des positions randoms
    while (nbbombe>0){

        let randomligne = Math.floor(Math.random() * taille);
        let randomcolonne =  Math.floor(Math.random() * taille);

        if (matriceBombe[randomligne][randomcolonne] == 0){ // si pas de bommbe déjà
             matriceBombe[randomligne][randomcolonne] = -1; // mettre une bombe
             nbbombe--; 
        }

    }

    // taille,nbbombe = modeChoisi(); // taille du tableau 

    let matrice = Chiffres(matriceBombe, taille, taille)
    afficheTab(taille, table, matrice);
     
}

//decompteur
$("#StartButton").click(function(){
    resetdecompteur();
  });

function decompteur(){
    let temps = 100;
    const timerElement = document.getElementById("timer");
    function Red_Temps(){
        timerElement.innerText = temps;
        let minutes = parseInt(temps / 60, 10)
        let secondes = parseInt(temps % 60, 10)
        temps = temps <= 0 ? 0 : temps - 1;
        console.log('idle');
        }
    decompte = setInterval(Red_Temps,1000);//1000 c'est 1s, en gros ça fait red_temps toutes les 1s
}
function ResetDecompte(){
    clearInterval(decompte);
    decompteur();
}

document.getElementById("StartButton").addEventListener("click", ResetDecompte());

/////////////////PROBLEMEEEEEEEEEE
function Chiffres(matrice, maxLigne, maxColonne){
    for(let i = 0; i < maxLigne; i++){ //maxLigne est le num de la dernière ligne 
        for(let j = 0; j < maxColonne; j++){ //maxColonne est le num de la dernière colonne
            if(matrice[i][j] == -1){
                let Ideb = 0;
                let Ifin = 0;
                let Jdeb = 0;
                let Jfin = 0;
                if (i-1 >= 0){
                    Ideb = i - 1;
                }
                else{
                    Ideb = i;
                }
                if (i+1 < maxLigne){
                    Ifin = i + 1;
                }
                else{
                    Ifin = i;
                }
                if (j-1 >= 0){
                    Jdeb = j - 1;
                }
                else{
                    Jdeb = j;
                }
                if (j+1 < maxColonne){
                    Jfin = j + 1;
                }
                else{
                    Jfin = j;
                }
                for(let l = Ideb; l<=Ifin ; l++){
                    for(let c = Jdeb; c<=Jfin; c++){
                        if(matrice[l][c]!=-1 && matrice[l][c]<9){
                            matrice[l][c] = matrice[l][c] + 1;
                        }
                    }
                }
            }
        }
    }
    return matrice;
}

// Lance le jeu
// fini le jeu si on trouve toutes les bombes ou user a clique sur une bombe
function jeu(GameOver,valeur){
    if (GameOver){
        console.log("OVER");
    }
    else {
         
        console.log("WOOHOOO jsuis trop forte");
    }
}

function disparaitre_droit(){
    document.addEventListener('contextmenu', (clickdroit)=>
    {
        if (e.target.nodeName === 'carré tata'){
        clickdroit.preventDefault();
        }
        
    })
}

function gestion_cliques(event){
    var boubaloo;
if (event.which) {
    switch (event.which) {
        case 1: //Clique gauche
            boubaloo = "G";
            break;
        case 2: //clique milieu
            boubaloo = "M";
            break;
        case 3: //clique droit
            boubaloo = "D";
            break;
    }
}
alert(boubaloo)
}

function compteur_drapeau(){
    let drapeau = 10;
    const nombre_drapeaux= document.getElementById("flag");
        }