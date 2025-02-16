import { useState, useEffect } from 'react';

export default function ProfileIcon({ userId }) {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const randomId = Math.floor(Math.random() * 1000);
    fetch(`https://picsum.photos/id/${randomId}/info`)
      .then(response => response.json())
      .then(data => setImageUrl(data.download_url))
      .catch(error => console.error('Error fetching profile image:', error));
  }, [userId]);

  return (
    <img
      src={imageUrl}
      alt="Profile"
      style={{ width: '40px', height: '40px', borderRadius: '50%' }}
    />
  );
}