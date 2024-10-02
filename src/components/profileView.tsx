// src/components/ProfileView.tsx

import React from 'react';
import { gql, useQuery } from '@apollo/client';

// GraphQL query to get the user profile
const GET_USER_PROFILE = gql`
  query GetUserProfile($userId: ID!) {
    userProfile(userId: $userId) {
      userId
      classificationCounts {
        Achiever
        Explorer
        Socializer
        Killer
      }
    }
  }
`;

const ProfileView = ({ userId }: { userId: string }) => {
  const { loading, error, data } = useQuery(GET_USER_PROFILE, {
    variables: { userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { classificationCounts } = data.userProfile;

  return (
    <div className="profile-view">
      <h2>User Profile for {userId}</h2>
      <p><strong>Achiever:</strong> {classificationCounts.Achiever}</p>
      <p><strong>Explorer:</strong> {classificationCounts.Explorer}</p>
      <p><strong>Socializer:</strong> {classificationCounts.Socializer}</p>
      <p><strong>Killer:</strong> {classificationCounts.Killer}</p>
    </div>
  );
};

export default ProfileView;
