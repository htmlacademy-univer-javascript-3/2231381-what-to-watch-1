import Header from '../../components/header/header';
import {AuthStatus} from '../../types/AuthStatus';
import Footer from '../../components/footer/footer';

function Page404(){
  return(
    <div className="user-page">
      <Header isAuthorised={AuthStatus.OnSignInPage} className='user-page__head'/>

      <h1 style={{textAlign: 'center'}}>404. Такой страницы не существует</h1>

      <Footer/>
    </div>);
}

export default Page404;
