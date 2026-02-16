// ====================================================
// GOOGLE AUTHENTICATION WITH SUPABASE - CB ORGANIC STORE
// ====================================================
// Uses Supabase's built-in Google OAuth
// ====================================================

// Supabase Configuration
const SUPABASE_URL = 'https://hdlgqdjmleezidpvakjd.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkbGdxZGptbGVlemlkcHZha2pkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5Njc4NzQsImV4cCI6MjA4NjU0Mzg3NH0.7ZGT025I70RyCWBMf3GwphvoZd6MBntU7Y7wORoy_tU';

// Custom domain for display
const SITE_URL = 'https://gousamhitha.com';

// Initialize Supabase client
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ====================================================
// GOOGLE SIGN IN
// ====================================================

async function handleGoogleSignIn() {
    console.log('Initiating Google Sign In with Supabase...');
    
    try {
        const { data, error } = await supabaseClient.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: SITE_URL + '/index.html',
                queryParams: {
                    access_type: 'offline',
                    prompt: 'select_account'
                }
            }
        });

        if (error) {
            console.error('Google sign in error:', error);
            alert('Failed to sign in with Google. Please try again.');
        }
        
        // Supabase will handle the redirect automatically
    } catch (error) {
        console.error('Google sign in error:', error);
        alert('Failed to sign in with Google. Please try again.');
    }
}

// ====================================================
// GOOGLE SIGN UP
// ====================================================

async function handleGoogleSignUp() {
    console.log('Initiating Google Sign Up with Supabase...');
    
    // For Supabase, sign in and sign up are the same
    // It automatically creates an account if it doesn't exist
    await handleGoogleSignIn();
}

// ====================================================
// CHECK AUTH SESSION
// ====================================================

async function checkGoogleAuthSession() {
    try {
        const { data: { session }, error } = await supabaseClient.auth.getSession();
        
        if (error) {
            console.error('Session check error:', error);
            return;
        }

        if (session) {
            console.log('User is authenticated:', session.user);
            
            // Store user info in localStorage for compatibility
            const user = session.user;
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', JSON.stringify({
                id: user.id,
                email: user.email,
                name: user.user_metadata.full_name || user.email,
                picture: user.user_metadata.avatar_url
            }));
            localStorage.setItem('userRole', 'customer');
            localStorage.setItem('supabaseSession', JSON.stringify(session));
            
            // Show success message
            showMessage('Signed in successfully with Google!', 'success');
            
            // Close auth modal if open
            if (typeof closeAuthModal === 'function') {
                closeAuthModal();
            }
            
            // Update UI
            if (typeof updateAuthUI === 'function') {
                updateAuthUI();
            }
        }
    } catch (error) {
        console.error('Session check error:', error);
    }
}

// ====================================================
// SIGN OUT
// ====================================================

async function handleGoogleSignOut() {
    try {
        const { error } = await supabaseClient.auth.signOut();
        
        if (error) {
            console.error('Sign out error:', error);
            return;
        }
        
        // Clear localStorage
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userRole');
        localStorage.removeItem('supabaseSession');
        
        showMessage('Signed out successfully', 'success');
        
        // Redirect to home
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Sign out error:', error);
    }
}

// ====================================================
// LISTEN FOR AUTH CHANGES
// ====================================================

supabaseClient.auth.onAuthStateChange((event, session) => {
    console.log('Auth state changed:', event, session);
    
    if (event === 'SIGNED_IN' && session) {
        // User signed in
        const user = session.user;
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify({
            id: user.id,
            email: user.email,
            name: user.user_metadata.full_name || user.email,
            picture: user.user_metadata.avatar_url
        }));
        localStorage.setItem('userRole', 'customer');
        localStorage.setItem('supabaseSession', JSON.stringify(session));
        
        showMessage('Signed in successfully with Google!', 'success');
        
        // Close modal and update UI
        if (typeof closeAuthModal === 'function') {
            closeAuthModal();
        }
        if (typeof updateAuthUI === 'function') {
            updateAuthUI();
        }
    } else if (event === 'SIGNED_OUT') {
        // User signed out
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userRole');
        localStorage.removeItem('supabaseSession');
    }
});

// ====================================================
// HELPER FUNCTIONS
// ====================================================

function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 10000;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => messageDiv.remove(), 3000);
}

// ====================================================
// INITIALIZE ON PAGE LOAD
// ====================================================

document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already authenticated
    checkGoogleAuthSession();
});
