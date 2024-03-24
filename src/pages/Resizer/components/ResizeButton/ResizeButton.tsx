import { FC } from 'react';
import { Logo } from '@assets/icons/app/Logo';

interface IResizeButtonProps {
  [key: string]: any;
}

export const ResizeButton: FC<IResizeButtonProps> = () => {
  return (
    <div>
      <label>
        <Logo width={32} height={32} />
        <span>Select an image to resize</span>
        <input type="file" />
      </label>
    </div>
  );
};
