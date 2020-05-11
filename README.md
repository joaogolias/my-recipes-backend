# my-recipes-backend

> Name will change

## Installation

Just clone the project and run

```
yarn install
```

Any new dependency must be added by using yarn. Pay attention to put the correct dependencies into "devDependencies"

```
yarn add -D
```

## Running

Remember to set environment variables

Locally with Hot Reload

```
yarn start:dev

```

Locally without Hot Reload

```
yarn start:index
```

Deployment must be done thought this command

```
yarn deploy
```

## Authentication

We use JWT to use both access_token and refresh_token in our application.

The refresh_token may be related to a device in order to allow blocking access from a specified device ("anourmous activity"). However it is optional.

For now, boths token are set up to expire in 360 days. It will change later.

## Endpoints

- [x] Signup: creates a new user and authenticates them
- [x] Login: performs login
- [ ] GetProfile: returns logged user data
- [ ] DeleteAccount: deletes logged user account
- [ ] CreateRecipe: creates a new recipe and updates ingredients table
- [ ] EditRecipe: edits a recipe and updates ingredients table
- [ ] GetRecipe: returns a recipe according to provided id
- [ ] DeleteReceipe: deletes a recipe according to provided id and logged user
- [ ] SearchRecipe: performs the search of a recipe using a single term
- [ ] SearchIngredient: performs the search of a ingredient using a single term
- [ ] SuggestIngredient: suggests an auto complete text of and ingredient
      (maybe it will be the merged with SearchIngredient)
