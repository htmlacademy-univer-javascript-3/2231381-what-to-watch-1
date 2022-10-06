import Main from '../../pages/main/main';
import {MainPageProps} from '../../pages/main/main';

function App(props: MainPageProps): JSX.Element {
  return (<Main promoFilmName={props.promoFilmName}
                promoFilmGenre={props.promoFilmGenre}
                promoFilmYear={props.promoFilmYear}
                promoFilmPosterImgSrc={props.promoFilmPosterImgSrc}
                promoFilmBackgroundImgSrc={props.promoFilmBackgroundImgSrc}
          />);
}

export default App;
