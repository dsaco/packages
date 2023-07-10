import { ButtonMui } from '@/components/Button';

export default function ButtonPage() {
  return (
    <div className="h-screen p-5">
      <div className="flex items-center border-zinc-500 border-b py-2">
        <span className="mr-4">variant: </span>
        <ButtonMui variant="text">text</ButtonMui>
        &nbsp;&nbsp;&nbsp;
        <ButtonMui variant="contained">contained</ButtonMui>
        &nbsp;&nbsp;&nbsp;
        <ButtonMui variant="outlined">outlined</ButtonMui>
      </div>
      <div className="flex items-center border-zinc-500 border-b py-2">
        <span className="mr-4">theme: </span>
        <ButtonMui variant="contained" theme="primary">
          primary
        </ButtonMui>
        &nbsp;&nbsp;&nbsp;
        <ButtonMui variant="contained" theme="secondary">
          secondary
        </ButtonMui>
        &nbsp;&nbsp;&nbsp;
        <ButtonMui variant="contained" theme="#800080">
          #800080
        </ButtonMui>
      </div>
    </div>
  );
}
