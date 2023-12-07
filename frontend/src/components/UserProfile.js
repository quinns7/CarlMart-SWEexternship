import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { username } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:5000/user?username=${username}`);
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          setError(`Failed to fetch user data. HTTP status: ${response.status}`);
        }
      } catch (error) {
        setError(`Error fetching user data: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="user-profile">
      <h2>User Profile: {userData.username}</h2>
      <div className="user-details">
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>First Name:</strong> {userData.firstname}</p>
        <p><strong>Last Name:</strong> {userData.lastname}</p>
      </div>
    </div>
  );
};

export default UserProfile;
