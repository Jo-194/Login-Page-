const emailReg =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let email = document.getElementById("email");
let password = document.getElementById("password");

let nameError = document.getElementById("erreur-nom");
let prenomError = document.querySelector("#erreur-prenom");
let emailError = document.querySelector("#erreur-email");
let passError = document.querySelector("#erreur-pass");

const form = document.querySelector("#validate");

    function validateData() {
        let isvalid = true;

        if(firstName.value === "" ){
        nameError.innerText = "!";
        isvalid = false;
        }
        if(lastName.value === "" ){
            prenomError.innerText = "!";
            isvalid = false;
        }
        
        if (!emailReg.test(email.value)) {
        emailError.innerText = "!";
        isvalid = false;
        }

        if (!passReg.test(password.value)){
            passError.innerText = "!";
            isvalid = false;
        }

        return isvalid;
     }


     async function recupData() {
        try {
            const response = await fetch("https://randomuser.me/api/?inc=location, picture, phone, name");
            const data = await response.json(); // convertir en JSON
            return data.results[0]; // voir les données
            
        } catch (error) {
            console.error("Erreur:", error);
        }
    }

    form.addEventListener("submit", async function (evenement) {
        evenement.preventDefault();
        if(validateData()) {
             const formdata = {
                 userName: firstName.value,
                userLast: lastName.value,
                userEmail: email.value,
                userPass: password.value
        };
            
        //Fonction pour recuperer les données de l'api
           

         async function main() {
             let resul = await recupData();
             
             const FinalData = {
                ...formdata,
                userAdress: `${resul.location.street.name}, ${resul.location.street.number}`,
                userPhone: resul.phone,
                userProfil:resul.picture.medium
             };


             localStorage.setItem("users", JSON.stringify(FinalData));
             alert("Enrégistrer avec succès");
            
         }
      main(); 

         form.reset();
         reload();

        }
        
       
    });


    let doonnee = JSON.parse(localStorage.getItem("users"));




   document.getElementById("nom").innerText = doonnee.userName;
   document.getElementById("prenom").innerText = doonnee.userLast;
   document.getElementById("Email").innerText = doonnee.userEmail;
   document.getElementById("adress").innerText = doonnee.userAdress;
   document.getElementById("telephone").innerText = doonnee.userPhone;
   let profil = document.getElementById("image");
   profil.setAttribute("src", doonnee.userProfil);

   
      

      
