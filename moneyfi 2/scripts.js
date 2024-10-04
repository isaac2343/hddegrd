// Function to show the popup for selecting the operating system
function showPopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'flex';
    setTimeout(() => popup.style.opacity = '1', 10); // Ensure smooth fade-in
}

// Function to close the popup
function closePopup() {
    const popup = document.getElementById('popup');
    popup.style.opacity = '0';
    setTimeout(() => popup.style.display = 'none', 300); // Smooth fade-out
}

// Function to redirect users to sign-up (you can modify this with your actual sign-up logic)
function signUp() {
    window.location.href = "#join";
}
