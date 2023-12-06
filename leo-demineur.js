let taille = 0;
let nbbombe = 0;
let matriceBombesChiffres = [];
let matriceHistorique = [];
let matriceBombes = [];
let i=0;
let j=0;


//affiche le tableau a l'ecran
function afficheTab(table){
    table.innerHTML = ""; // efface le tableau pour mettre des nouvelles valeurs
    // affiche le tableau
    for (i=0; i<taille; i++){ // pour chaque ligne 
    
        const Ligne = document.createElement("TR"); 

        for (j=0; j<taille; j++){ // pour chaque colonne
            let Cell = document.createElement("TD");
            // ajoute l'élement nécéssaire à chaque cellule du tableau
            if (matriceHistorique[i][j]==-1){
                if (matriceBombesChiffres[i][j] == -1){ // bombe
                    Cell.innerHTML = "<button type='button' name='button' id='buttonhide' onclick='jeu(1,table)'>"+matriceBombesChiffres[i][j]+"</button>"; 
                }
                else {
                Cell.innerHTML = "<button type='button' name='button' id='buttonhide' onclick='jeu(0,table)'>"+matriceBombesChiffres[i][j]+"</button>";
                }
            }
            else {
                if (matriceBombesChiffres[i][j] ==0){ // bombe
                    Cell.innerHTML = "<button type='button' name='button' id='buttonrien'>"+matriceBombesChiffres[i][j]+"</button>"; 
                }
                else if (matriceBombesChiffres[i][j] ==-1){ // bombe
                    Cell.innerHTML = "<button type='button' name='button' id='buttonbombe'>"+matriceBombesChiffres[i][j]+"</button>"; 
                }
                else {
                Cell.innerHTML = "<button type='button' name='button' id='buttonchiffre'>"+matriceBombesChiffres[i][j]+"</button>";
                }

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
    // let taille = 10;
    // let nbbombe = 10;
    const table = document.getElementById("tableNonCache"); // tableau affiché sur écran

    matriceBombesChiffres = [];

    // remplit la matriceBombesChiffres de zeros --- difficile a creer une matriceBombesChiffres de zeros 
    for (let l=0; l<taille; l++){
        let arrayzeros = [];
        for (let c=0; c<taille; c++){
            arrayzeros.push(0);
        }
        matriceBombesChiffres.push(arrayzeros);
    }

    matriceHistorique = [];

    // matrice historique update quand user clique sur un button
    for (let l=0; l<taille; l++){
        let arrayvide = [];
        for (let c=0; c<taille; c++){
            arrayvide.push(-1);
        }
        matriceHistorique.push(arrayvide);
    }
    matriceBombes = matriceBombesChiffres;

    // les bombes dans la matriceBombesChiffres a des positions randoms
    while (nbbombe>0){

        let randomligne = Math.floor(Math.random() * taille);
        let randomcolonne =  Math.floor(Math.random() * taille);

        if (matriceBombesChiffres[randomligne][randomcolonne] == 0){ // si pas de bommbe déjà
            matriceBombes[randomligne][randomcolonne] = -1;
            matriceBombesChiffres[randomligne][randomcolonne] = -1; // mettre une bombe
            nbbombe--; 
        }

    }

    // Compte les bombes autour de chaque case
    matriceBombesChiffres = Chiffres(matriceBombesChiffres, taille, taille)
    afficheTab(table);
     
}

//decompteur
let decompte;
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
document.getElementById("Startbutton").addEventListener("click", ResetDecompte());

// Compte les nombres de bombes autour d'une case et update la matriceBombesChiffres
function Chiffres(matriceBombesChiffres, maxLigne, maxColonne){
    for(let i = 0; i < maxLigne; i++){ //maxLigne est le num de la dernière ligne 
        for(let j = 0; j < maxColonne; j++){ //maxColonne est le num de la dernière colonne
            if(matriceBombesChiffres[i][j] == -1){
                let Ideb = 0;
                let Ifin = 0;
                let Jdeb = 0;
                let Jfin = 0;
                if (i-1 >= 0){
                    Ideb = i - 1;
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
                        if(matriceBombesChiffres[l][c]!=-1 && matriceBombesChiffres[l][c]<9){
                            matriceBombesChiffres[l][c] = matriceBombesChiffres[l][c] + 1;
                        }
                    }
                }
            }
        }
    }
    return matriceBombesChiffres;
}

// Lance le jeu
// fini le jeu si on trouve toutes les bombes ou user a clique sur une bombe
function jeu(GameOver,i,j,table){
    if (GameOver){
        console.log("OVER");
    }
    else {
        matriceHistorique[i][j]=0;
        if (matriceHistorique==matriceBombes){
            console.log("Victoire");
        }
    }
    afficheTab(table);
}
