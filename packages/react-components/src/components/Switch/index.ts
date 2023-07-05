import { SwitchAnt as _SwitchAnt } from './SwitchAnt';

export type SwitchProps = {
  checked?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onChange?: (checked: boolean) => void;
};

export const SwitchAnt = _SwitchAnt;
export const Switch = {
  Ant: SwitchAnt,
};
