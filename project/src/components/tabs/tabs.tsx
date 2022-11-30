import {FilmInfo} from '../../types/FilmInfo';
import FilmOverview from './film-overview';
import FilmDetails from './film-details';
import FilmReviews from './film-reviews';
import {useState} from 'react';

type TabProps = {
  filmInfo: FilmInfo;
}

function Tabs(props: TabProps) {
  const tabContent = ['Overview', 'Details', 'Reviews'];

  const [tab, setTab] = useState(tabContent[0]);

  const renderTab = () => {
    switch (tab) {
      case 'Details':
        return <FilmDetails filmInfo={props.filmInfo}/>;
      case 'Reviews':
        return <FilmReviews/>;
      default:
        return <FilmOverview filmInfo={props.filmInfo}/>;
    }
  };

  const renderNavigation = () => {
    const tabs = [];

    for (const content of tabContent){
      const className = content === tab ? 'film-nav__item--active' : '';
      tabs.push(
        <li className={`film-nav__item ${className}`} key={content}>
          <button className="film-nav__link"
            onClick={() => setTab(content)}
            style={{background:'transparent', border:'none'}}
          >
            {content}
          </button>
        </li> );
    }

    return (
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          { tabs }
        </ul>
      </nav>
    );
  };

  return (
    <div className="film-card__desc">
      { renderNavigation() }
      { renderTab() }
    </div>
  );
}

export default Tabs;
