import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {  // za da gi izbrise podatocite od poleto za prebaruvawe posle prebaruvanjeto
    elements.searchInput.value = '';
};

export const clearResults = () => { // za da gi izbrise rezultatite pred slednoto prebaruvanje
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

/*  Akumulator za dolzina na recenicata za da se stavi posle tri tocki posle
ogranicuvanjeto na dolzinata vo slucajov e limit = 17 
Objasnuvanje kako rabotu akumulatorot  za broj na zborovi 
na primer recenicata 

//'Pasta with tomato and spinach'

acc: 0 / acc + cur.length = 5 / newTitle = ['Pasta'] zborot sodrzi 5 karakteri
acc: 5 / acc + cur.length = 9 / newTitle = ['Pasta', 'with'] zborot sodrzi 4 karakteri
acc: 9 / acc + cur.length = 15 / newTitle = ['Pasta', 'with', 'tomato'] zborot sodrzi 6 karakteri
acc: 15 / acc + cur.length = 18 / newTitle = ['Pasta', 'with', 'tomato', 'and'] zborot sodrzi 3 karakteri
acc: 18 / acc + cur.length = 25 / newTitle = ['Pasta', 'with', 'tomato', 'and', 'spinach'] zborot sodrzi 7 karakteri
*/
const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        // return the result
        return `${newTitle.join(' ')} ...`;
    }
    return title;
}

const renderRecipe = recipe => {
    const markup = `
        <li>
             <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>

    `;
    elements.searchResList.insertAdjacentHTML('beforeend',markup);

};

// funkcija za kreiranje na kopcinjata nex i prev
// type moze da bide 'prev' ili 'next'
const createButton = (page, type) => `

    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use> 
        </svg>
       
    </button>  
`;

// Render Buttons - pagination kopcinja 
const renderButtons = (page, numResults, resPerPage) => {
    // kolku strani deleno na rezultati po strana 
    const pages = Math.ceil(numResults / resPerPage); 

    let button;
    if (page === 1 && pages > 1){       // Znaci ako e pocetnata strana t.e. strana e 1 i ima poveke od edna strana  togas dodadi samo edno kopce
        // Kopce odi na sledna strana 
        button = createButton(page, 'next');
    } else if (page < pages) { //ako stranata e pomala od vkupno stranite (ne e posledna ne e ni prvata)
        //dvete kopcinja 
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    }else if (page === pages && pages > 1){     // ako stranata e ednakva na brojot na vkupno stranite  t.e e poslednata strana 
        // Samo kopce odi na predhodna strana 
        button = createButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

// za da gi prikazuva rezultatite 10 na broj na edna strana
export const renderResults = (recipes, page = 1, resPerPage = 10 ) => {
    
    // render results of current page
    const start = (page-1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecipe);

    // renden pagination buttons
    renderButtons(page, recipes.length, resPerPage);
};