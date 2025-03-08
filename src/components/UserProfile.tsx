import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UserProfile as UserProfileSettings } from './UserProfile/UserProfile';

export function UserProfile() {
  return (
    <Routes>
      <Route index element={<UserProfileSettings />} />
      <Route path="*" element={<Navigate to="/profile" replace />} />
    </Routes>
  );
}