import MainCategory from './MainCategory/MainCategory'
import MainInfo from './MainInfo/MainInfo'
import MainLogin from './MainLogin/MainLogin'
import Slider from './Slider/Slider';

const Main = () => {

  return (<section className='main__page'>
              <Slider />
              <MainInfo />
              <MainCategory />
              <MainLogin />
          </section>);
}
export default Main;