import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import ProfileIcon from './ProfileIcon';

export default function Header({ user }) {
  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <header>
      <h1>Task Board</h1>
      <ProfileIcon userId={user.uid} />
      <button onClick={handleSignOut}>Sign Out</button>
    </header>
  );
}