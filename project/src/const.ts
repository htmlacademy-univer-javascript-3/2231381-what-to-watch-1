export enum AppRoute {
  Login = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
  Page404 = '*'
}

export enum Namespace {
  Auth = 'AUTH',
  Film = 'FILM',
  Main = 'MAIN',
  MyList = 'MYLIST'
}
