document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const indexationForm = document.getElementById('indexationForm');
    const loader = document.getElementById('loader');
    const messageDiv = document.getElementById('message');
    const logoutButton = document.getElementById('logoutButton');
    let base64Credentials = localStorage.getItem('base64Credentials') || '';

    const showIndexationForm = () => {
        document.getElementById('automationForm').style.display = 'flex';
        loginForm.style.display = 'none';
        setDefaultValues();
    };

    const hideIndexationForm = () => {
        document.getElementById('automationForm').style.display = 'none';
        loginForm.style.display = 'flex';
    };

    const showLoading = () => {
        loader.style.display = 'flex';
    };

    const hideLoading = () => {
        loader.style.display = 'none';
    };

    const setDefaultValues = () => {
        const now = new Date();
        const dateHeure = document.getElementById('dateHeure');
        dateHeure.value = now.toISOString().slice(0, 16);

        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            const urlInput = document.getElementById('url');
            urlInput.value = tabs[0].url;
        });
    };

    const displayWelcomeMessage = (firstName, lastName, fullName) => {
        const automationForm = document.getElementById('automationForm');
        const welcomeMessage = document.createElement('span');
        let nameToDisplay = fullName;
        if (!fullName && firstName && lastName) {
            nameToDisplay = `${firstName} ${lastName}`;
        } else if (!fullName && firstName) {
            nameToDisplay = firstName;
        } else if (!fullName && lastName) {
            nameToDisplay = lastName;
        } else if (!nameToDisplay) {
            nameToDisplay = 'Utilisateur';
        }
        welcomeMessage.textContent = `Bonjour ${nameToDisplay},`;
        automationForm.insertBefore(welcomeMessage, automationForm.firstChild);
    };

    const authenticate = async (credentials) => {
        try {
            showLoading();
            
            const response = await fetch("https://indexation.io/wp-json/wp/v2/users/me", {
                method: 'GET',
                headers: {
                    'Authorization': `Basic ${credentials}`,
                    'Content-Type': 'application/json'
                },
                credentials: 'omit' 
            });

            if (!response.ok) {
                throw new Error('Échec de l\'authentification');
            }

            const user = await response.json();
            const firstName = user.first_name || null;
            const lastName = user.last_name || null;
            const fullName = user.name || null;

            localStorage.setItem('base64Credentials', credentials);
            base64Credentials = credentials;
            displayWelcomeMessage(firstName, lastName, fullName);
            showIndexationForm();
        } catch (error) {
            messageDiv.innerHTML = `<p style="color: red;">Erreur : ${error.message}</p>`;
            hideIndexationForm();
        } finally {
            hideLoading();
        }
    };

    if (base64Credentials) {
        authenticate(base64Credentials);
    } else {
        hideIndexationForm();
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const base64Credentials = btoa(`${username}:${password}`);
        await authenticate(base64Credentials);
    });

    indexationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        showLoading();

        const dateHeure = document.getElementById('dateHeure').value;
        const url = document.getElementById('url').value;

        try {
            const userResponse = await fetch("https://indexation.io/wp-json/wp/v2/users/me", {
                method: 'GET',
                headers: {
                    'Authorization': `Basic ${base64Credentials}`,
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                },
                credentials: 'omit' 
            });

            if (!userResponse.ok) {
                throw new Error('Échec de la récupération des données utilisateur : Indexation.io Premium est requis');
            }

            const user = await userResponse.json();
            const userId = user.id;

            const automationResponse = await fetch(`https://indexation.io/wp-json/custom/v1/users/${userId}/automatisation`, {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${base64Credentials}`,
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                },
                body: JSON.stringify({
                    automatisation: [
                        { date_heure: dateHeure, url: url }
                    ]
                }),
                credentials: 'omit'
            });

            if (!automationResponse.ok) {
                throw new Error('Échec de l\'ajout de l\'automatisation de l\'URL');
            }

            messageDiv.innerHTML = '<p style="color: #2EC260;">URL ajoutée avec succès.</p>';
            indexationForm.reset();
            setDefaultValues();
        } catch (error) {
            messageDiv.innerHTML = `<p style="color: red;">Erreur : ${error.message}</p>`;
        } finally {
            hideLoading();
        }
    });

    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('base64Credentials');
        hideIndexationForm();
    });
});