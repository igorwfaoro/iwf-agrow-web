import { HexColorPicker } from 'react-colorful';
import { COLORS } from '../../../../util/colors';

interface FieldColorProps {
  onChange: (value: string) => void;
  value: string | undefined;
}

const DEFAULT_COLOR = COLORS.primary;

export default function FieldColor({
  onChange,
  value = DEFAULT_COLOR
}: FieldColorProps) {
  return (
    <div className="flex items-center gap-6 h-32">
      <HexColorPicker
        onChange={onChange}
        color={value}
        style={{ width: '100%', height: '128px' }}
      />
      <div
        className="w-28 h-full rounded-3xl"
        style={{ backgroundColor: value }}
      />
    </div>
  );
}
