import {FilmInfo} from '../../types/FilmInfo';
import FilmOverview from '../film-overview/film-overview';
import FilmDetails from '../film-details/film-details';
import FilmReviews from '../film-reviews/film-reviews';
import {useMemo, useState} from 'react';

type TabProps = {
  filmInfo: FilmInfo;
}

function Tabs(props: TabProps) {
  const tabsNames = ['Overview', 'Details', 'Reviews'];
  const [tab, setTab] = useState(tabsNames[0]);

  const renderNavigation = () => {
    const tabs = [];

    for (const content of tabsNames){
      const className = content === tab ? 'film-nav__item--active' : '';
      tabs.push(
        <li className={`film-nav__item ${className}`} key={content}>
          <button className="film-nav__link"
            onClick={() => setTab(content)}
            style={{background:'transparent', border:'none'}}
            data-testid={`${content}-tab`}
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

  const renderTab = (name: string) => {
    switch (name) {
      case 'Details':
        return <FilmDetails filmInfo={props.filmInfo}/>;
      case 'Reviews':
        return <FilmReviews/>;
      default:
        return <FilmOverview filmInfo={props.filmInfo}/>;
    }
  };
  const tabContent = useMemo(() => renderTab(tab), [tab]);

  return (
    <div className="film-card__desc">
      { renderNavigation() }
      { tabContent }
    </div>
  );
}

export default Tabs;
