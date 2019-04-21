export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchRes: document.querySelector('.results') , // zaradi loaderot
    searchResList: document.querySelector('.results__list'),
    searchResPages:document.querySelector('.results__pages')
};

export const elementStrings = {
    loader: 'loader'
};

// ovde pocnuva strelkata - loader dodeka cekas da se vcita stranicata 
export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

// za da prestane da se vrti loaderot koga ke se vcitaat rezultatite
export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
};
