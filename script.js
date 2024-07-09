
     document.addEventListener('DOMContentLoaded', () => {
            const loginForm = document.getElementById('loginForm');
            const automationForm = document.getElementById('automationForm');

        
            if (automationForm.style.display === 'block') {
                loginForm.style.display = 'none';
            }
        });
