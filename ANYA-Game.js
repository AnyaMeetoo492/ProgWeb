let taille = 0;
let nbbombe = 0;

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
                Cell.innerHTML = "<button type='button' name='button' id='buttonbombe' style='background-color: red' onclick='jeu(1)'>"+matrice[i][j]+"</button>"; 
            }
            else if (matrice[i][j]>0){
                Cell.innerHTML = "<button type='button' name='button' id='buttonchiffre' style='background-color: blue'  onclick='jeu(0)'>"+matrice[i][j]+"</button>";
            }
            else {
                Cell.innerHTML = "<button type='button  name='button' id='buttonrien' onclick='jeu(0)'>"+matrice[i][j]+"</button>";
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


/////////////////PROBLEMEEEEEEEEEE
function Chiffres(matrice, maxLigne, maxColonne){
    console.log(matrice);
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
                if (i+1 < maxLigne){
                    Ifin = i + 1;
                }
                if (j-1 >= 0){
                    Jdeb = j - 1;
                }
                if (j+1 < maxColonne){
                    Jfin = j + 1;
                }
                for(let l = Ideb; l<Ifin ; l++){
                    for(let c = Jdeb; c<Jfin; c++){
                        if(matrice[l][c] =! -1){
                            matrice[l][c] = matrice[l][c] + 1;
                        }
                    }
                }
            }
        }
    }
    return matrice;
}
    


            //     if(i-1 >= 0){ // il ne faut pas que la colonne d'avant soit inférieur à 0
            //         if(matrice[i-1][j-1] < 9){ //9 bombes max autour d'une case
            //             matrice[i-1][j-1] = matrice[i-1][j-1] + 1;
            //         }
            //         if(matrice[i-1][j] < 9){
            //             matrice[i-1][j] = matrice[i-1][j] + 1;
            //         }
            //         if(j+1 < maxColonne){
            //             if(matrice[i-1][j+1] < 9){
            //                 matrice[i-1][j+1] = matrice[i-1][j+1] + 1;
            //             }
            //         }
            //     }
            // // Des 2 côtés de la bombe (en i)
            //     if(j-1 >= 0){
            //         if(matrice[i][j-1] < 9){
            //             matrice[i][j-1] = matrice[i][j-1] + 1;
            //         }
            //     }
            //     if(j+1 < maxColonne){
            //         if(matrice[i][j+1] < 9){
            //             matrice[i][j+1] = matrice[i][j+1] + 1;
            //         }
            //     }
            //     // Sous la bombe (en i + 1)
            //     if(i+1 < maxLigne){ // il ne faut pas que la colonne d'après soit supérieur au max des lignes
            //         if(j-1 >= 0){
            //             if(matrice[i+1][j-1] < 9){
            //                 matrice[i+1][j-1] = matrice[i+1][j-1] + 1;
            //             }
            //         }
            //         if(matrice[i+1][j] < 9){
            //             matrice[i+1][j] = matrice[i+1][j] + 1;
            //         }
            //         if(j+1 < maxColonne){
            //             if(matrice[i+1][j+1] < 9){
            //                 matrice[i+1][j+1] = matrice[i+1][j+1] + 1;
            //             }
            //         }
            //     }
   

function jeu(GameOver){
    if (GameOver){
        console.log("OVER");
    }
    else {
        console.log("WOOHOOO jsuis trop forte");
    }
}
