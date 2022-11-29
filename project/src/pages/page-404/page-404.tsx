import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

function Page404(){
  return(
    <div className="user-page">
      <Header className='user-page__head'/>

      <h1 style={{textAlign: 'center'}}>404. Такой страницы не существует</h1>

      <Footer/>
    </div>);
}

export default Page404;
