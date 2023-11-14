# ProgWeb

Cahier des charges

Projet 2 
Marie-Line Da Costa Bento, Léo Dalquier, Saad Zeghari, Anya Meetoo

Au moins une page HTML + JS
On fait une web application

REQUIRE:

1. String object
2. Functions
3. Conditional Statements 
4. Loops: should include the use of at least While, for ... in and for .. of loop
5. Arrays
6. JavaScript Validation
7. Prototypes & User-defined objects
8. DOM, more specifically manipulation of HTML elements using JavaScript. Manipulation should include:
    - addition of HTML elements
    - remove of HTML elements
    - Update of HTML elements (changing the content or changing the style)

The web application should be hosted online. There are several online services that propose free hosting.



Idée : Démineur 

Nécessité :

- Table nxn => couvert => découvert sur appui
- bombes / chiffres / vides / drapeau 
- nb de drapeaux 
- temps 
- changement de niveaux
- animations 
- sons 

Déroulement :

- Tableau caché
- user clique n'importe où => tableau de mines crée
- user met drapeau ou pas (click gauche = mettre, clique droit = retirer)
    - si user sur bombe = fin partie
    - si user pas bombe = revele chiffre 
        - si chiffre 0 = libere cases vides autour  

- fin de partie = revele toutes les bombes et le nb de drapeaux restants

- facultatif 
    - Leaderboard
    - click sur chiffre = casse un bout 
