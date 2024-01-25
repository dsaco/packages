export { SwitchAnt } from './SwitchAnt';
export type { SwitchAntProps } from './SwitchAnt';

export type SwitchProps = {
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
};
