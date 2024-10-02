import { NavLink } from "react-router-dom";
import {UsersProps} from "../../../../types/clients.ts";

const Users = ({ users }: UsersProps) => {

  const scrollTo = () => window.innerWidth < 768 ? window.scrollTo({top: 600, behavior: 'smooth'}) : false

  return (<div className="items">
              {users && users.map(user => <NavLink onClick={scrollTo} key={user.id} to={'/clients/' + user.id}>
                                              <li>
                                                  <h4>
                                                        {user.id}
                                                        <img width={30} src={user?.image} alt="avatar" /> 
                                                        {user?.firstName + ' ' + user?.lastName}
                                                  </h4>
                                              </li>
                                          </NavLink>)}
          </div>);
}
export default Users