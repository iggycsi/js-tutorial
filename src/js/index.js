import Search from './models/Search';
<<<<<<< HEAD
import Recipe from './models/Recipe';
=======
>>>>>>> e17d808dbfe8e06b0a30124d00c30054bb8a2bc0
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader} from './views/base';// gi vcituva elementite i render loaderot

/* Global state od the app
 - Search object
 - Current recipe object
 - Shopping list object
 - Liked recepies
 */
const state = {};

<<<<<<< HEAD
/*
*SEARCH CONTROLLER 
*/

=======
>>>>>>> e17d808dbfe8e06b0a30124d00c30054bb8a2bc0
const controlSearch = async () => {
    // 1) Get query from view
    const query = searchView.getInput();   //TODO
  
    if (query) {
        // 2) New search object and add to state
        state.search = new Search(query);

        //3) Prepare UI for results
        searchView.clearInput(); // gi brise podatocite od poleto za prebaruvawe posle prebaruvanjeto
        searchView.clearResults(); // za da gi izbrise rezultatite pred slednoto prebaruvanje
        renderLoader(elements.searchRes);// go pokazuva loaderot strelka sto se vrti 

<<<<<<< HEAD
        try {
            // 4) Search for recipes
            await state.search.getResults();

            //5) Render results on UI
            clearLoader();// go trga loaderot otkako ke se vcitaat rezultatite
            searchView.renderResults(state.search.result);
        }catch (err) {
            alert('Nesto ne e vo red so prebaruvanjeto ...');
            clearLoader();
        }
=======
        // 4) Search for recipes
        await state.search.getResults();

        //5) Render results on UI
        clearLoader();// go trga loaderot otkako ke se vcitaat rezultatite
        searchView.renderResults(state.search.result);
>>>>>>> e17d808dbfe8e06b0a30124d00c30054bb8a2bc0
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

// za da gi grupira site elementi vo kopceto za da mozes da go kliknes bilo kade na kopceto 
// (se upotrebuva Element.closest()  a toa e vaka 
//  const btn = e.target.closest('btn-inline'); kade e. target e metodata, closest e metodot a 
//'btn-inline' e klasata na elementot 
elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage); // odi na drugata strana 
    }
<<<<<<< HEAD
});


/*
*RECIPE CONTROLLER 
*/
const controlRecipe = async () => {
    // Get ID from url
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if (id) {
        // prepare UI for Changes

        // Create new recipe object
        state.recipe = new Recipe(id);

        try {
            // Get recipe data
            await state.recipe.getRecipe();

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();
            // Render recipe
            console.log (state.recipe);
        }catch (err){
            alert('Greska vo procesuiranjeto na receptot!');
        }
    }
}
/*
window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', controlRecipe);
*/

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
=======
});
>>>>>>> e17d808dbfe8e06b0a30124d00c30054bb8a2bc0
