import Ceiling from "./Ceiling/Ceiling.tsx";
import Floor from "./Floor/Floor.tsx";
import Mobile from './Mobile/Mobile.tsx'

const Header = () => {
    
    return (<header className='header'>
                <Ceiling />
                <Mobile />
                <Floor />
            </header>);
}
export default Header;