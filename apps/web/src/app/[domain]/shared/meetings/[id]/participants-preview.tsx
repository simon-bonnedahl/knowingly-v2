"use client";
import { Avatar, useCallStateHooks } from '@stream-io/video-react-sdk';
import React from 'react';

export const ParticipantsPreview = () => {
  const { useCallSession } = useCallStateHooks();
  const session = useCallSession();

  if (session?.participants || session?.participants.length === 0) return null;

  return (
    <div className='flex flex-col'>
      <div>Already in call ({session?.participants.length}):</div>
      <div className='flex'>
        {session?.participants.map((participant) => (
          <div>
            <Avatar
              name={participant.user.name}
              imageSrc={participant.user.image}
            />
            {participant.user.name && <div>{participant.user.name}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};