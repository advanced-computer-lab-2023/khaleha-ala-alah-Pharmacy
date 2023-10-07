import React from 'react';
import ColorCircle from './Circle';

import ColorUtils from '../../../utils/color-utils';
import './PickerField.scss';

const getContrast = (hexColor: string) => {
  const [r, g, b] = ColorUtils.hexToRgb(hexColor);
  return ColorUtils.checkContrastColor(r, g, b);
};

type Props = {
  savedColor: string;
  onOpenPicker: (color: string) => void;
};

const PickerField = ({ savedColor, onOpenPicker }: Props) => {
  const handleOpenPicker = () => onOpenPicker(savedColor);

  return (
    <div className='color-field'>
      <ColorCircle
        color={savedColor}
        onClick={handleOpenPicker}
        contrastColor={getContrast(savedColor)}
      />

      <div className='selected-color-value'>{savedColor}</div>
    </div>
  );
};

export default PickerField;
