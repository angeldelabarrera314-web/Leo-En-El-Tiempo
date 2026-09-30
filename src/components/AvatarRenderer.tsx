import React from 'react';
import { AvatarItem } from '../types';
import { Leo2DAvatar } from './Leo2DAvatar';

interface AvatarRendererProps {
  equippedItems?: Record<string, AvatarItem>;
  size?: 'sm' | 'md' | 'lg';
  speaking?: boolean;
}

export const AvatarRenderer: React.FC<AvatarRendererProps> = ({
  equippedItems = {},
  size = 'md',
  speaking = false,
}) => {
  return (
    <div className="flex items-center justify-center">
      <Leo2DAvatar equippedItems={equippedItems} size={size} speaking={speaking} interactive={true} />
    </div>
  );
};

