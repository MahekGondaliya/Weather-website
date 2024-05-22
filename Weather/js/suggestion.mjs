import { checkweather } from './script.mjs';

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const suggestionsBox = document.getElementById('suggestions');
    const submitbtn = document.querySelector('button');

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        if (query) {
            const suggestions = getSuggestions(query);
            showSuggestions(suggestions);
        } else {
            hideSuggestions();
        }
    });

    submitbtn.addEventListener('click', (e) => {

        e.preventDefault();
        try {
            checkweather(searchInput.value);
            saveSearchHistory(searchInput.value);
            hideSuggestions();

        } catch (error) {
            console.warn(error.message);
        }

    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('#suggestions')) {
            hideSuggestions();
        }
    });

    function getSuggestions(query) {
        const history = getSearchHistory();
        return history.filter(item => item.toLowerCase().includes(query));
    }



    function showSuggestions(suggestions) {
        suggestionsBox.innerHTML = suggestions.map(s => `<div>${s}</div>`).join('');
        suggestionsBox.style.display = 'block';

        suggestionsBox.querySelectorAll('div').forEach((div, index) => {
            div.addEventListener('click', () => {
                searchInput.value = suggestions[index];
                saveSearchHistory(suggestions[index]);
                hideSuggestions();
            });
        });
    }

    function hideSuggestions() {
        suggestionsBox.style.display = 'none';
    }

    function getSearchHistory() {
        const history = localStorage.getItem('searchHistory');
        return history ? JSON.parse(history) : [];
    }

function saveSearchHistory(query) {
        let history = getSearchHistory();
        if (!history.includes(query)) {
            history.push(query);
            localStorage.setItem('searchHistory', JSON.stringify(history));
        }
    }
});

