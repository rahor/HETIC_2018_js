
/*
Déclaration de variables
*/

//Le li nth-chid 1
// let homeButton = document.querySelector('nav li:nth-child(1) a');
// console.log(homeButton);

let myNav = document.querySelectorAll('nav a');
console.log(myNav);
//


/*
Activer la nav
*/
    //FAire boucle sur nav
    for(let items of myNav){
        console.log(items);

        //Capter le click sur le lien
        items.addEventListener( 'click', () => {
            //Bloquer le comportement naturel de la balise
            //a ne va plus afficher les href
            event.preventDefault(); 

            //Récup la valeur de link-data

            const pageName = items.getAttribute('link-data');
            // document.querySelector('body').style.color = "#00bfff" ;  
           let bodyBouleur = document.body.style.color =  getRandomColor();
            document.body.style.backgroundColor = getRandomColor();


          //ajouter le contenu dans le DOM
          fetchHtmlData(pageName);
            
        });
    };
//



/*
Création d'une fonction fetch
 */
    const fetchHtmlData = (page = 'contacts') => {
        
        //on se situe au meme niveau que l'index
        fetch(`./content/${page}.html`)
        //1er callback : analyse et traitement du fetch
        //Pleins de then possibles
        .then( rawReponse => {
           // console.log(rawReponse)

            //Renvoyer la reponse au format text
            return rawReponse.text()
        })

        //Ca prend le return 2eme callback : manipuler les données
        .then( textResponse =>{
            // console.log(textResponse)
            //Ajouter dans le DOM
            document.querySelector('main').innerHTML = textResponse;
            //return ('ca marche')

         

            //Retourne le paramète
            return page
        })

        .then ( (page)=>{
            console.log(page);
            //Vérifier le nom de la page
            if( page === 'contacts') submitForm()
        })
        
        // .then( message =>{
        //     console.log(message)
        // })

        //Capter les erreurs
        .catch( error => {
            console.error(error)
        })
    }
//



/*
Gestion du form
*/
const submitForm = () => {
    let myForm = document.querySelector('form');
    console.log(myForm);

    //Validation du formulaire Déclaration des variables
    let msgSubject = document.querySelector('[placeholder="Sujet"]');
    let msgEmail = document.querySelector('[placeholder="Email"]');
    let msgMessage = document.querySelector('[placeholder="Votre message"]');
    let msgList = document.querySelector('form + ul');

    myForm.addEventListener('submit', (event)=>{
        //Initier une variable pour la gestion des erreurs
        let formError=0;
        
        //Bloquer le comportement naturel de la balise
        event.preventDefault();
        

        //Sujet est valide s'il contient au minimum 2 caractères
        if(msgSubject.value.length < 2) {
            
            formError++
            msgSubject.classList.add('errorForm')
        }
        
        //L'email est valide s'il contient au minimum 2 caractères
        if(msgEmail.value.length <5) {
            formError++
            msgEmail.classList.add('errorForm')
        }  
     
        //L'email est valide s'il contient au minimum 2 caractères
        if(msgMessage.value.length <5) {
            formError++
            msgMessage.classList.add('errorForm')
        }

        //Validation finale du formulaire
        if(formError === 0){
            console.log('Le formulaire est validé')

            //Afficher le message dans la liste
            msgList.innerHTML +=`
            <li>
                <h3>${msgSubject.value} <b>${msgEmail.value}</b></h3>
                <p>${msgMessage.value}</p>
            </li>
            `
            
            //Vider le formulaire
            msgEmail.value = ''
            msgMessage.value =''
            msgSubject.value = ''


        }
    })

    //Supprimer les messages d'erreur au focus
    msgSubject.addEventListener( 'focus', () =>{
        msgSubject.classList.remove('errorForm')
    })

    //Supprimer les messages d'erreur au focus
    msgEmail.addEventListener( 'focus', () =>{
        msgEmail.classList.remove('errorForm')
    })

    //Supprimer les messages d'erreur au focus
    msgMessage.addEventListener( 'focus', () =>{
        msgMessage.classList.remove('errorForm')
    })

};
//

fetchHtmlData();


/*
Génération de couleur aléatoire
*/

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  