const colorScheme = localStorage.getItem('colorScheme');
const btnChangeColorScheme = document.getElementById('js_btn-color-scheme')

function setColorScheme(color) {
    document.documentElement.setAttribute('data-color-scheme', color);
    localStorage.setItem('colorScheme', color);
}

function changeColorScheme() {
    const preference = document.documentElement.getAttribute('data-color-scheme');
    if (preference == 'light') {
        setColorScheme('dark');
    }
    if (preference == 'dark') {
        setColorScheme('light');  
    }
}

if (colorScheme){
    document.documentElement.setAttribute('data-color-scheme', colorScheme);
} else {
    setColorScheme('light');
}

btnChangeColorScheme.addEventListener('click', changeColorScheme);