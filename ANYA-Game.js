function initTable(){
    const taille = 5;
    const table = document.getElementById("tableNonCache");
    
    for (let i=0; i<taille; i++){ //Chaque ligne
    
        const Ligne = document.createElement("TR");

        for (let j=0; j<taille; j++){ // chaque colonne
            const Cell = document.createElement("TD");
            Cell.innerHTML = "<button type='button'>j</button>";
            Ligne.appendChild(Cell);
            
        }
        
        table.appendChild(Ligne);
    }   
}