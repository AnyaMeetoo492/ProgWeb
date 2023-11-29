
//affiche le tableau a l'ecran
function afficheTab(taille, table, matrice){
    table.innerHTML = ""; // efface le tableau pour mettre des nouvelles valeurs
    
    // affiche le tableau
    for (let i=0; i<taille; i++){ // pour chaque ligne 
    
        const Ligne = document.createElement("TR"); 

        for (let j=0; j<taille; j++){ // pour chaque colonne
            const Cell = document.createElement("TD");
            // ajoute l'élement nécéssaire à chaque cellule du tableau

            if (matrice[i][j] == -1){
                Cell.innerHTML = "<button type='button' style='background-color: red'>"+matrice[i][j]+"</button>"; 
            }
            else if (matrice[i][j]>0){
                Cell.innerHTML = "<button type='button' style='background-color: blue'>"+matrice[i][j]+"</button>";
            }
            else {
                Cell.innerHTML = "<button type='button'>"+matrice[i][j]+"</button>";
            }
            Ligne.appendChild(Cell);
            
        }
        
        table.appendChild(Ligne);
    }  
}

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

    let matrice = Chiffres(matriceBombe, taille, taille)
    afficheTab(taille, table, matrice);
     
}

function Chiffres(matrice, maxLigne, maxColonne){
    for(let i = 0; i < maxLigne; i++){ //maxLigne est le num de la dernière ligne 
        for(let j = 0; j < maxColonne; j++){ //maxColonne est le num de la dernière colonne
            if(matrice[i][j] == -1){
                // Au-dessus de la bombe (en i-1)
                if(i-1 >= 0){ // il ne faut pas que la colonne d'avant soit inférieur à 0
                    if(matrice[i-1][j-1] < 9){ //9 bombes max autout d'une case
                                matrice[i-1][j-1] = matrice[i-1][j-1] + 1;
                    }
                    if(matrice[i-1][j] < 9){
                        matrice[i-1][j] = matrice[i-1][j] + 1;
                    }
                    if(j+1 < maxColonne){
                        if(matrice[i-1][j+1] < 9){
                            matrice[i-1][j+1] = matrice[i-1][j+1] + 1;
                        }
                    }
                }
                // Des 2 côtés de la bombe (en i)
                if(matrice[i][j-1] < 9){
                    matrice[i][j-1] = matrice[i][j-1] + 1;
                }
                //ici mettre pour la bombe???
                if(j+1 < maxColonne){
                    if(matrice[i][j+1] < 9){
                        matrice[i][j+1] = matrice[i][j+1] + 1;
                    }
                }
                // Sous la bombe (en i + 1)
                if(i+1 < maxLigne){ // il ne faut pas que la colonne d'après soit supérieur au max des colonnes
                    if(j-1 >= 0){
                        if(matrice[i+1][j-1] < 9){
                            matrice[i+1][j-1] = matrice[i+1][j-1] + 1;
                        }
                    }
                    if(matrice[i+1][j] < 9){
                        matrice[i+1][j] = matrice[i+1][j] + 1;
                    }
                    if(j+1 < maxColonne){
                        if(matrice[i+1][j+1] < 9){
                            matrice[i+1][j+1] = matrice[i+1][j+1] + 1;
                        }
                    }
                }
            }
        }
    }
    return matrice;
}