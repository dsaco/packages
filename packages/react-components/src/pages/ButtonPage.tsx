import { ButtonMui } from '@/components/Button';

import styles from './ButtonPage.module.scss';

export default function ButtonPage() {
  return (
    <div className="h-screen p-5">
      <div className="flex items-center border-zinc-500 border-b py-2">
        <span className="mr-4">variant: disabled</span>
        <ButtonMui variant="text" disabled>
          text
        </ButtonMui>
        &nbsp;&nbsp;&nbsp;
        <ButtonMui variant="contained" disabled>
          contained
        </ButtonMui>
        &nbsp;&nbsp;&nbsp;
        <ButtonMui variant="outlined" disabled>
          outlined
        </ButtonMui>
      </div>
      <div className="flex items-center border-zinc-500 border-b py-2">
        <span className="mr-4">color: primary</span>
        <ButtonMui variant="text" color="primary">
          text
        </ButtonMui>
        &nbsp;&nbsp;&nbsp;
        <ButtonMui variant="contained" color="primary">
          contained
        </ButtonMui>
        &nbsp;&nbsp;&nbsp;
        <ButtonMui variant="outlined" color="primary">
          outlined
        </ButtonMui>
      </div>
      <div className="flex items-center border-zinc-500 border-b py-2">
        <span className="mr-4">color: primary round</span>
        <ButtonMui variant="text" color="primary" round>
          text
        </ButtonMui>
        &nbsp;&nbsp;&nbsp;
        <ButtonMui
          variant="contained"
          color="primary"
          round
          className={`${styles.rounded} ${styles.a}`}
        >
          contained styles className
        </ButtonMui>
        &nbsp;&nbsp;&nbsp;
        <ButtonMui variant="outlined" color="primary" round>
          outlined
        </ButtonMui>
      </div>
      <div className="flex items-center border-zinc-500 border-b py-2">
        <span className="mr-4">color: secondary</span>
        <ButtonMui variant="text" color="secondary">
          text
        </ButtonMui>
        &nbsp;&nbsp;&nbsp;
        <ButtonMui variant="contained" color="secondary">
          contained
        </ButtonMui>
        &nbsp;&nbsp;&nbsp;
        <ButtonMui variant="outlined" color="secondary">
          outlined
        </ButtonMui>
      </div>
      <div className="flex items-center border-zinc-500 border-b py-2">
        <span className="mr-4">color: #800080</span>
        <ButtonMui variant="text" color="#800080">
          text
        </ButtonMui>
        &nbsp;&nbsp;&nbsp;
        <ButtonMui variant="contained" color="#800080">
          contained
        </ButtonMui>
        &nbsp;&nbsp;&nbsp;
        <ButtonMui variant="outlined" color="#800080">
          outlined
        </ButtonMui>
      </div>
      <div className="flex items-center border-zinc-500 border-b py-2">
        <span className="mr-4">color: #ffff00</span>
        <ButtonMui variant="text" color="#ffff00">
          text
        </ButtonMui>
        &nbsp;&nbsp;&nbsp;
        <ButtonMui variant="contained" color="#ffff00">
          contained
        </ButtonMui>
        &nbsp;&nbsp;&nbsp;
        <ButtonMui variant="outlined" color="#ffff00">
          outlined
        </ButtonMui>
      </div>
    </div>
  );
}
