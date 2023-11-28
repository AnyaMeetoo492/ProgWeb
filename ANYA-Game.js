
// Initialise le mode = easy/medium/hard 
// donne la taille du tableau et le nombre de drapeau
// function modeChoisi(){
//     const mode = document.getElementById("mode").value;
//     let taille = 0;
//     let nbdrapeau = 0;

//     if (mode == "easy"){
//         taille = 10;
//         nbdrapeau = 10;
//     }
//     else if (mode == "medium"){
//         taille = 14;
//         nbdrapeau = 40;
//     }
//     else {
//         taille = 20;
//         nbdrapeau = 99;
//     }
//     return (taille,nbdrapeau);

// }

// Initialise une matrice avec bombes et chiffres et la renvoit 
// Modifie le tableau pour le début de partie
function initTable(){
    let taille = 10;
    let nbbombe = 10;
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

    // taille,nbdrapeau = modeChoisi(); // taille du tableau 

    table.innerHTML = ""; // efface le tableau pour mettre des nouvelles valeurs
    
    // affiche le tableau
    for (let i=0; i<taille; i++){ // pour chaque ligne 
    
        const Ligne = document.createElement("TR"); 

        for (let j=0; j<taille; j++){ // pour chaque colonne
            const Cell = document.createElement("TD");
            // ajoute l'élement nécéssaire à chaque cellule du tableau
            Cell.innerHTML = "<button type='button'>"+matriceBombe[i][j]+"</button>"; 
            Ligne.appendChild(Cell);
            
        }
        
        table.appendChild(Ligne);
    }   
}