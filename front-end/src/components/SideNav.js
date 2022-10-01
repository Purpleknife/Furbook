import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SideNav = () => {

  const [user, setUser] = useState(null);

  const getUser = async() => {
    const userData = await axios.get('/users/1');
    console.log('userData', userData);
    setUser(userData.data[0]);
  };

  useEffect(() => {
    getUser();    
  }, []);

  return (
    <div>Navbar!
      {user.first_name}
    </div>
  );
}
 
export default SideNav;