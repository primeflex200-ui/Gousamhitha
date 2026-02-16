// ====================================================
// GOOGLE AUTHENTICATION - CB ORGANIC STORE
// ====================================================
// Handles Google OAuth Sign In and Sign Up
// ====================================================

// Google OAuth Configuration
const GOOGLE_CONFIG = {
    clientId: '488030012275-q24mqkugm2l0t6hgbc0uvd5lf0lj155q.apps.googleusercontent.com',
    redirectUri: 'https://hdlgqdjmleezidpvakjd.supabase.co/auth/v1/callback',
    scope: 'openid email profile',
    responseType: 'code',
    authEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth'
};

// ====================================================
// GOOGLE SIGN IN
// ====================================================

function handleGoogleSignIn() {
    console.log('Initiating Google Sign In...');
    
    // Build Google OAuth URL
    const authUrl = buildGoogleAuthUrl('signin');
    
    // Store the action type for callback handling
    localStorage.setItem('googleAuthAction', 'signin');
    
    // Redirect to Google OAuth
    window.location.href = authUrl;
}

// ====================================================
// GOOGLE SIGN UP
// ====================================================

function handleGoogleSignUp() {
    console.log('Initiating Google Sign Up...');
    
    // Build Google OAuth URL
    const authUrl = buildGoogleAuthUrl('signup');
    
    // Store the action type for callback handling
    localStorage.setItem('googleAuthAction', 'signup');
    
    // Redirect to Google OAuth
    window.location.href = authUrl;
}

// ====================================================
// BUILD GOOGLE AUTH URL
// ====================================================

function buildGoogleAuthUrl(action) {
    const params = new URLSearchParams({
        client_id: GOOGLE_CONFIG.clientId,
        redirect_uri: GOOGLE_CONFIG.redirectUri,
        response_type: GOOGLE_CONFIG.responseType,
        scope: GOOGLE_CONFIG.scope,
        access_type: 'offline',
        prompt: action === 'signup' ? 'consent' : 'select_account',
        state: generateRandomState()
    });
    
    return `${GOOGLE_CONFIG.authEndpoint}?${params.toString()}`;
}

// ====================================================
// HANDLE GOOGLE CALLBACK
// ====================================================

async function handleGoogleCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const error = urlParams.get('error');
    
    if (error) {
        console.error('Google OAuth error:', error);
        alert('Google authentication failed. Please try again.');
        window.location.href = '/';
        return;
    }
    
    if (!code) {
        console.error('No authorization code received');
        return;
    }
    
    // Verify state to prevent CSRF attacks
    const savedState = localStorage.getItem('googleAuthState');
    if (state !== savedState) {
        console.error('State mismatch - possible CSRF attack');
        alert('Authentication failed. Please try again.');
        window.location.href = '/';
        return;
    }
    
    try {
        // Exchange code for tokens and user info
        const userInfo = await exchangeCodeForUserInfo(code);
        
        // Get the action (signin or signup)
        const action = localStorage.getItem('googleAuthAction') || 'signin';
        
        if (action === 'signup') {
            await handleGoogleSignUpComplete(userInfo);
        } else {
            await handleGoogleSignInComplete(userInfo);
        }
        
        // Clean up
        localStorage.removeItem('googleAuthAction');
        localStorage.removeItem('googleAuthState');
        
    } catch (error) {
        console.error('Google authentication error:', error);
        alert('Authentication failed. Please try again.');
        window.location.href = '/';
    }
}

// ====================================================
// EXCHANGE CODE FOR USER INFO
// ====================================================

async function exchangeCodeForUserInfo(code) {
    // This should be done on your backend for security
    // For now, we'll call your backend API
    
    const response = await fetch('http://localhost:5000/api/auth/google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
    });
    
    if (!response.ok) {
        throw new Error('Failed to exchange code for user info');
    }
    
    const data = await response.json();
    return data.user;
}

// ====================================================
// COMPLETE GOOGLE SIGN IN
// ====================================================

async function handleGoogleSignInComplete(userInfo) {
    console.log('Completing Google Sign In for:', userInfo.email);
    
    // Check if user exists in your database
    const response = await fetch('http://localhost:5000/api/auth/google/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: userInfo.email,
            name: userInfo.name,
            googleId: userInfo.sub,
            picture: userInfo.picture
        })
    });
    
    const data = await response.json();
    
    if (data.success) {
        // Store user session
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        localStorage.setItem('userRole', data.user.role);
        
        // Show success message
        showMessage('Signed in successfully with Google!', 'success');
        
        // Redirect based on role
        setTimeout(() => {
            if (data.user.role === 'admin') {
                window.location.href = 'admin-dashboard.html';
            } else {
                window.location.href = 'index.html';
            }
        }, 1000);
    } else {
        throw new Error(data.error || 'Sign in failed');
    }
}

// ====================================================
// COMPLETE GOOGLE SIGN UP
// ====================================================

async function handleGoogleSignUpComplete(userInfo) {
    console.log('Completing Google Sign Up for:', userInfo.email);
    
    // Create new user account
    const response = await fetch('http://localhost:5000/api/auth/google/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: userInfo.email,
            name: userInfo.name,
            googleId: userInfo.sub,
            picture: userInfo.picture
        })
    });
    
    const data = await response.json();
    
    if (data.success) {
        // Store user session
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        localStorage.setItem('userRole', 'customer');
        
        // Show success message
        showMessage('Account created successfully with Google!', 'success');
        
        // Redirect to home
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    } else {
        throw new Error(data.error || 'Sign up failed');
    }
}

// ====================================================
// HELPER FUNCTIONS
// ====================================================

function generateRandomState() {
    const state = Math.random().toString(36).substring(2, 15) + 
                  Math.random().toString(36).substring(2, 15);
    localStorage.setItem('googleAuthState', state);
    return state;
}

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
    // Check if this is a Google OAuth callback
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('code') && urlParams.has('state')) {
        handleGoogleCallback();
    }
});
