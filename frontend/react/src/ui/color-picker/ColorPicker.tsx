import React, { useState } from 'react';
import { SketchPicker } from 'react-color';

import PickerField from './picker-field/PickerFileld';
import ColorUtils from '../../utils/color-utils';

export type PickerColor = {
  color: string;
  contrast: string;
};

const getContrast = (hexColor: string) => {
  if (!hexColor) {
    return null;
  }

  const [r, g, b] = ColorUtils.hexToRgb(hexColor);
  return ColorUtils.checkContrastColor(r, g, b);
};

const getColor = (hexColor: string): PickerColor => ({
  color: hexColor,
  contrast: getContrast(hexColor)
});

type Props = {
  color?: string;
  secondColor?: string;
  opened?: boolean;
  onColorChange?: (color: PickerColor) => void;
};

const ColorPicker = ({ opened: pickerOpened, color, onColorChange }: Props) => {
  const [opened, setOpened] = useState<boolean>(pickerOpened);

  const handleColorChange = color => onColorChange(getColor(color.hex));

  const handlePickerOpen = () => setOpened(true);

  const handleClose = () => setOpened(false);

  return (
    <>
      <PickerField savedColor={color} onOpenPicker={handlePickerOpen} />

      {opened && (
        <>
          <div className='picker-cover' onClick={handleClose} />
          <SketchPicker
            onChangeComplete={handleColorChange}
            color={color}
            presetColors={[]}
            disableAlpha
          />
        </>
      )}
    </>
  );
};

export default ColorPicker;
