import React from 'react';
import className from '../../../utils/class-names';

type Props = {
  color: string;
  onClick: () => void;
  contrastColor?: string;
};

const ColorCircle = ({
  color = 'transparent',
  onClick,
  contrastColor = '#ffffff'
}: Props) => {
  const handleCircleClick = () => onClick();

  const cursorClasses = className({
    cursor: true,
    black: contrastColor !== '#ffffff'
  });

  return (
    <div className='circle' onClick={handleCircleClick}>
      <div className='bg'>
        <div className='white' />
        <div className='transparent' />
        <div className='bg-color' style={{ backgroundColor: color }} />
      </div>
      <div className={cursorClasses} />
    </div>
  );
};

export default ColorCircle;
