'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route')

Route.on('/').render('welcome')

// User Registration
Route.post('/register', 'UserController.store')
Route.post('/login', 'UserController.login')
Route.get('/profile', 'UserController.show').middleware('auth')

// Search Tweets Routes
Route.post('/search/tweets', 'SearchtweetsController.search')
Route.post('/search', 'SentimentsController.get')

Route.post('/user', 'UserController.update').middleware('auth')
Route.post('/user/campaigns', 'UserController.save')
Route.get('/user/campaigns', 'UserController.getCampaign').middleware('auth')
Route.post('/campaigns', 'CampaignController.createCampaign').middleware('auth')
Route.post('/grape', 'GrapeController.createGrape')
