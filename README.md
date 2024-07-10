# Indexation.io Premium : Extension Google Chrome

## Description
L'extension [**Indexation.io Premium**](https://indexation.io/premium/) pour Google Chrome permet de vous connecter à votre compte Indexation.io Premium et de programmer l'indexation de vos pages web en un seul clic. Ce projet est conçu pour faciliter la gestion et l'automatisation de l'indexation des pages web directement depuis votre navigateur.

## Installation depuis GitHub
1. Clonez ce dépôt sur votre machine locale :
    ```bash
    git clone https://github.com/kevinbenabdelhak/indexation-io-premium-google-chrome.git
    ```
2. Ouvrez Google Chrome et allez à `chrome://extensions/`.
3. Activez le **Mode développeur** (généralement situé en haut à droite de la page des extensions).
4. Cliquez sur le bouton **Charger l'extension non empaquetée**.
5. Sélectionnez le dossier où vous avez cloné ce dépôt.

## Installation depuis Google Chrome
1. Rendez-vous sur https://chromewebstore.google.com/detail/indexationio/hadolmcngcbcffopkfnlokpappphchem
2. Cliquez sur "Installer l'extension"

## Fonctionnalités
- **Connexion** : Utilisez vos identifiants Indexation.io pour vous connecter via l'extension.
- **Programmation de l'indexation** : Planifiez l'indexation de vos URL à une date et une heure spécifiques.
- **Sauvegarde des sessions** : Vos identifiants sont sauvegardés localement pour permettre une connexion rapide. Votre compte de connexion est pour l'instant géré via localStorage.


## Permissions
L'extension requiert les permissions suivantes :
- **tabs** : Pour accéder à l'URL de l'onglet actif et permettre une indexation rapide.
- **Historique de navigation** : En réalité, l'extension n'utilisera jamais votre historique personnel mais utilise seulement l'URL de l'onglet actif sur votre navigateur. 

## Utilisation
1. **Connexion** :
   - Entrez votre nom d'utilisateur et votre clé secrète dans le formulaire de connexion (La clé secrète est disponible sur votre compte Indexation.io Premium)
   - Cliquez sur **Se connecter**.
2. **Programmation de l'indexation** :
   - Une fois connecté, utilisez le formulaire pour entrer l'URL à indexer et la date/heure de l'indexation.
   - Cliquez sur **Indexer** pour programmer l'indexation de l'URL sélectionné à partir de l'onglet actif sur Google Chrome.

## Scripts
- `popup.html` : Fichier HTML pour l'interface utilisateur du popup.
- `popup.js` : Contient la logique JavaScript pour gérer les événements utilisateur et l'authentification.
- `script.js` : Scripts JavaScript pour gérer l'affichage des formulaires et l'état de connexion.
- `styles.css` : Feuille de style CSS pour styliser l'extension.

## Dépendances
Aucune dépendance extérieure n'est nécessaire pour cette extension.


Merci d'utiliser **Indexation.io Premium**!

---

Pour toute question ou assistance, veuillez contacter notre support à support@indexation.io ou sur notre formulaire de contact sur indexation.io
