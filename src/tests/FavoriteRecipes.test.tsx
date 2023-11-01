import { screen } from '@testing-library/dom';
import { MOCKdoneRecipesData } from './helpers/mocks/data/doneRecipesMock';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Teste da Página Favorite Recipes', () => {
  afterEach(() => {
    localStorage.clear();
  });

  const initialEntry = '/favorite-recipes';
  const allFilter = 'filter-by-all-btn';
  const mealFilter = 'filter-by-meal-btn';
  const drinkFilter = 'filter-by-drink-btn';
  const recipesImg = /-horizontal-image/i;
  const recipesName = /-horizontal-name/i;
  const recipesCategory = /-horizontal-top-text/i;
  const recipesShareBtn = /-horizontal-share-btn/i;
  const recipesFavoriteBtn = /-horizontal-favorite-btn/i;

  it('testa se pega dados do LocalStorage e rederiza na tela', () => {
    global.localStorage.setItem('favoriteRecipes', JSON.stringify(MOCKdoneRecipesData));

    const state = {
      revenues: {
        drinks: [],
        meals: [],
        loading: false,
      },
    };

    renderWithRouterAndRedux(<App />, { initialEntries: [initialEntry], initialState: state });
    const allFilterBtn = screen.getByTestId(allFilter);
    const mealFilterBtn = screen.getByTestId(mealFilter);
    const drinkFilterBtn = screen.getByTestId(drinkFilter);
    const recipesImgRender = screen.queryAllByTestId(recipesImg);
    const recipesNameRender = screen.queryAllByTestId(recipesName);
    const recipesCategoryRender = screen.queryAllByTestId(recipesCategory);
    const recipesShareBtnRender = screen.queryAllByTestId(recipesShareBtn);
    const recipesFavoriteBtnRender = screen.queryAllByTestId(recipesFavoriteBtn);

    expect(allFilterBtn).toBeInTheDocument();
    expect(mealFilterBtn).toBeInTheDocument();
    expect(drinkFilterBtn).toBeInTheDocument();
    expect(recipesImgRender).toHaveLength(3);
    expect(recipesImgRender[0]).toHaveAttribute('src', MOCKdoneRecipesData[0].image);
    expect(recipesNameRender).toHaveLength(3);
    expect(recipesNameRender[0]).toHaveTextContent(MOCKdoneRecipesData[0].name);
    expect(recipesCategoryRender).toHaveLength(3);
    expect(recipesCategoryRender[0]).toHaveTextContent(`${MOCKdoneRecipesData[0].nationality} - ${MOCKdoneRecipesData[0].category}`);
    expect(recipesCategoryRender[1]).toHaveTextContent(`${MOCKdoneRecipesData[1].alcoholicOrNot}`);
    expect(recipesShareBtnRender).toHaveLength(3);
    expect(recipesFavoriteBtnRender).toHaveLength(3);
  });

  test('testa filtro FOOD, DRINKS e ALL', async () => {
    global.localStorage.setItem('favoriteRecipes', JSON.stringify(MOCKdoneRecipesData));
    const state = {
      revenues: {
        drinks: [],
        meals: [],
        loading: false,
      },
    };
    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: [initialEntry], initialState: state });
    const allFilterBtn = screen.getByTestId(allFilter);
    const mealFilterBtn = screen.getByTestId(mealFilter);
    const drinkFilterBtn = screen.getByTestId(drinkFilter);
    const recipesNameRender = screen.queryAllByTestId(recipesName);

    expect(recipesNameRender).toHaveLength(3);
    await user.click(mealFilterBtn);

    const recipesNameMealRender = screen.queryAllByTestId(recipesName);
    expect(recipesNameMealRender).toHaveLength(1);
    expect(recipesNameMealRender[0]).toHaveTextContent(MOCKdoneRecipesData[0].name);

    await user.click(drinkFilterBtn);
    const recipesNameDrinkRender = screen.queryAllByTestId(recipesName);
    expect(recipesNameDrinkRender).toHaveLength(2);
    expect(recipesNameDrinkRender[0]).toHaveTextContent(MOCKdoneRecipesData[1].name);
    expect(recipesNameDrinkRender[1]).toHaveTextContent(MOCKdoneRecipesData[2].name);

    await user.click(allFilterBtn);
    const recipesNameAllRender = screen.queryAllByTestId(recipesName);
    expect(recipesNameAllRender).toHaveLength(3);
  });

  test('testa click de compartilhamento', async () => {
    global.localStorage.setItem('favoriteRecipes', JSON.stringify(MOCKdoneRecipesData));
    const pathname = window.location.host;
    const state = {
      revenues: {
        drinks: [],
        meals: [],
        loading: false,
      },
    };
    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: [initialEntry], initialState: state });
    const recipesShareBtnRender = screen.queryAllByTestId(recipesShareBtn);
    expect(recipesShareBtnRender).toHaveLength(3);
    await user.click(recipesShareBtnRender[0]);
    const linkCopiedText = screen.getByText('Link copied!');
    const shareLink = await window.navigator.clipboard.readText();
    const urlCopiedOne = `http://${pathname}/${MOCKdoneRecipesData[0].type}s/${MOCKdoneRecipesData[0].id}`;
    expect(linkCopiedText).toBeInTheDocument();
    expect(shareLink).toBe(urlCopiedOne);

    await user.click(recipesShareBtnRender[2]);
    const shareLinkTwo = await window.navigator.clipboard.readText();
    const urlCopiedTwo = `http://${pathname}/${MOCKdoneRecipesData[2].type}s/${MOCKdoneRecipesData[2].id}`;
    expect(shareLinkTwo).toBe(urlCopiedTwo);
  });

  test('teste click de desfavoritar', async () => {
    global.localStorage.setItem('favoriteRecipes', JSON.stringify(MOCKdoneRecipesData));
    const state = {
      revenues: {
        drinks: [],
        meals: [],
        loading: false,
      },
    };
    const { user } = renderWithRouterAndRedux(<App />, { initialEntries: [initialEntry], initialState: state });
    const favoriteBtnRender = screen.queryAllByTestId(recipesFavoriteBtn);
    const recipesNameRender = screen.queryAllByTestId(recipesName);
    expect(recipesNameRender).toHaveLength(3);
    expect(recipesNameRender[0]).toHaveTextContent(MOCKdoneRecipesData[0].name);
    await user.click(favoriteBtnRender[0]);
    const recipesNameRenderTwo = screen.queryAllByTestId(recipesName);
    expect(recipesNameRenderTwo).toHaveLength(2);
    expect(recipesNameRenderTwo[0]).toHaveTextContent(MOCKdoneRecipesData[1].name);
    expect(recipesNameRenderTwo[1]).toHaveTextContent(MOCKdoneRecipesData[2].name);
  });
});