let chaine = '';
let stock1 = '';
let stock2 = '';
let op;
let cptOp = 0;
let cptVirguleChiffre1 = 0;
let cptVirguleChiffre2 = 0;

/* fonction pour entrer des caractères */
function ajoutTexte( /** @type {string | number} */ b) {
    if (chaine == '' && isNaN(b) && b != '.') {
        affiche("Saisir un chiffre");
    } else if (!(cptOp == 0 && isNaN(b) && b != '.'))
        if (!(cptOp == 1 && isNaN(b) && b != '.'))
            if (b == '.' && ((cptOp == 0 && cptVirguleChiffre1 == 1) || (cptOp == 1 && cptVirguleChiffre2 == 1))) {
                affiche("Max une virgule /terme");
            } else if (b == '.' && cptOp == 0 && cptVirguleChiffre1 == 0) {
        cptVirguleChiffre1 = 1;
        chaine += b;
        affiche(chaine);
    } else if (b == '.' && cptOp == 1 && cptVirguleChiffre2 == 0) {
        cptVirguleChiffre2 = 1;
        chaine += b;
        affiche(chaine);
    } else {
        chaine += b;
        affiche(chaine);
    } else {
        affiche("Max une opération");
    } else {
        cptOp = 1;
        if (chaine.slice(-1) == '.') {
            chaine = chaine.substring(0, chaines.length - 1);
        } else {
            debugger;
        }
        chaine += b;
        affiche(chaine);
    }
}

/* fonction addition */
function add(a, b) {
    return (+a) + (+b);
}

/* fonction produit */
function prod(a, b) {
    return (+a) * (+b);
}

/* fonction division */
/**
 * @param {string} a
 * @param {string} b
 */
function divi(a, b) {
    if ((+b) != 0) {
        return (+a) / (+b);
    } else { /* On interdit la division par 0 */
        return ("Pas de division par 0!");
    }
}

/* fonction soustraction */
function soustraction(a, b) {
    return (+a) - (+b);
}


function affiche(b) {
    document.getElementById("ecran").innerHTML = b;
}

/* fonction qui vide l'écran */
function CE() {
    chaine = '';
    document.getElementById("ecran").innerHTML = chaine;
    cptOp = 0;
    cptVirguleChiffre1 = 0;
    cptVirguleChiffre2 = 0;
}

/* fonction supprimant le deuxième nombre de l'opération */
function C() {
    let pasTrouve = true; /* avant de parcourir toute la chaine de char on a pas encore trouvé l'opérateur */
    let i = 0;
    newchaine = '';
    for (let char of chaine) {
        if ((!isNaN(char) || char == '.') && pasTrouve) { /* si le char est un chiffre et qu'on a pas encore trouvé l'opérateur */
            newchaine += char;
        } else { /* si l'opérateur a été trouvé...*/
            pasTrouve = false;
            if (isNaN(char) && char != '.') { /* ...et que le char n'est pas un chiffre (donc c'est l'opérateur en question) */
                newchaine += char;
            }
        }
    }
    cptVirguleChiffre2 = 0;
    chaine = newchaine;
    affiche(chaine);
}


/* la fonction pour supprimer le dernier caractère entré */
function supp() {
    if (chaine != '') {
        // si le dernier char est un point et qu'on a pas encore choisi d'opérateur (première opérande)
        if (chaine.slice(-1) == '.' && cptOp == 0) {
            cptVirguleChiffre1 = 0;
        }
        // si le dernier char est un point et qu'on a déjà choisi l'opérateur (seconde opérande)
        else if (chaine.slice(-1) == '.' && cptOp == 1) {
            cptVirguleChiffre2 = 0;
        }
        // si le dernier char est l'opérateur
        // @ts-ignore
        else if (isNaN(chaines.slice(-1)) && chaines.slice(-1) != '.') {
            cptOp = 0;
            op = null;
        }
        // dans tous les cas on supprime le dernier élément de la chaine
        chaine = chaine.substring(0, chaine.length - 1);
        affiche(chaines);
    }
}

/* la fonction pour afficher le résultat quand on clique sur la touche = */
function resultat() {
    // on initialise les variables à 0 car on commence avec le premier caractère de la chaine
    cptOp = 0;
    cptVirguleChiffre1 = 0;
    cptVirguleChiffre2 = 0;
    for (let char of chaine) {
        if ((!isNaN(char) || char == '.') && cptOp == 0) {
            stock1 += char;
        } else if ((!isNaN(char) || char == '.') && cptOp == 1) {
            stock2 += char;
        } else if ((char == '+' || char == '-' || char == '/' || char == '*')) {
            if (cptOp == 0) {
                cptOp += 1;
                op = char;
            }
        }
    }
    /* affichage du résultat en fonction de l'opérateur choisi */
    switch (op) {
        case "+":
            chaine = add(stock1, stock2);
            affiche(add(stock1, stock2));
            break;
        case "-":
            chaine = soustraction(stock1, stock2);
            affiche(soustraction(stock1, stock2));
            break;
        case "/":
            chaine = divi(stock1, stock2);
            affiche(divi(stock1, stock2));
            break;
        case "*":
            chaine = prod(stock1, stock2);
            affiche(prod(stock1, stock2));
            break;
    }
    /* à la fin du calcul de l'opération on réinitialise toutes les variables à leurs valeurs par défaut */
    stock1 = '';
    stock2 = '';
    chaines = '';
    cptOp = 0;
    cptVirguleChiffre1 == 0;
    cptVirguleChiffre2 == 0;
}