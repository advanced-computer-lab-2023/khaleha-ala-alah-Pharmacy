import React, { useContext, useState, useEffect } from "react";
import { useAuth } from '../AuthContext'; 

const NotFound = () => {
  const { role } = useAuth(); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (role) {
      setIsLoading(false);
    }
  }, [role]);

  return (
    <div>
      {isLoading ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : (
        <h1>Not Found</h1>
      )}
    </div>
  );
};

export default NotFound;
