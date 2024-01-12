import { ButtonAnt, ButtonMui } from '@/components/Button';

import styles from './ButtonPage.module.scss';

export default function ButtonPage() {
  return (
    <div className="h-screen p-5">
      <div className="flex items-center border-zinc-500 border-b py-2">
        <span className="mr-4">类型</span>
        <ButtonAnt>default</ButtonAnt>
        <span className="mr-4"></span>
        <ButtonAnt type="outline">outline</ButtonAnt>
        <span className="mr-4"></span>
        <ButtonAnt type="filled">filled</ButtonAnt>
        <span className="mr-4"></span>
        <ButtonAnt type="dashed">dashed</ButtonAnt>
        <span className="mr-4"></span>
        <ButtonAnt type="link">link</ButtonAnt>
        <span className="mr-4"></span>
        <ButtonAnt type="text">text</ButtonAnt>
      </div>
      <div className="flex items-center border-zinc-500 border-b py-2">
        <span className="mr-4">color: danger</span>
        <ButtonAnt color="danger">default</ButtonAnt>
        <span className="mr-4"></span>
        <ButtonAnt color="danger" type="outline">
          outline
        </ButtonAnt>
        <span className="mr-4"></span>
        <ButtonAnt color="danger" type="filled">
          filled
        </ButtonAnt>
        <span className="mr-4"></span>
        <ButtonAnt color="danger" type="dashed">
          dashed
        </ButtonAnt>
        <span className="mr-4"></span>
        <ButtonAnt color="danger" type="link">
          link
        </ButtonAnt>
        <span className="mr-4"></span>
        <ButtonAnt color="danger" type="text">
          text
        </ButtonAnt>
      </div>
      <div className="flex items-center border-zinc-500 border-b py-2">
        <span className="mr-4">color: #800080</span>
        <ButtonAnt color="#800080">default</ButtonAnt>
        <span className="mr-4"></span>
        <ButtonAnt color="#800080" type="outline">
          outline
        </ButtonAnt>
        <span className="mr-4"></span>
        <ButtonAnt type="filled" color="#800080">
          filled
        </ButtonAnt>
        <span className="mr-4"></span>
        <ButtonAnt type="dashed" color="#800080">
          dashed
        </ButtonAnt>
        <span className="mr-4"></span>
        <ButtonAnt type="link" color="#800080">
          link
        </ButtonAnt>
        <span className="mr-4"></span>
        <ButtonAnt type="text" color="#800080">
          text
        </ButtonAnt>
      </div>
      <div className="flex items-center border-zinc-500 border-b py-2">
        <span className="mr-4">ghost</span>
        <ButtonAnt ghost>default</ButtonAnt>
        <span className="mr-4"></span>
        <ButtonAnt type="outline" ghost>
          outline
        </ButtonAnt>
        <span className="mr-4"></span>
        <ButtonAnt type="filled" ghost>
          filled
        </ButtonAnt>
        <span className="mr-4"></span>
        <ButtonAnt type="dashed" ghost>
          dashed
        </ButtonAnt>
        <span className="mr-4"></span>
        <ButtonAnt type="link" ghost>
          link
        </ButtonAnt>
        <span className="mr-4"></span>
        <ButtonAnt type="text" ghost>
          text
        </ButtonAnt>
      </div>
      <div className="flex items-center border-zinc-500 border-b py-2">
        <span className="mr-4">圆角</span>
        <ButtonAnt round>default</ButtonAnt>
        <span className="mr-4"></span>
        <ButtonAnt round type="outline">
          outline
        </ButtonAnt>
        <span className="mr-4"></span>
        <ButtonAnt round type="filled">
          filled
        </ButtonAnt>
        <span className="mr-4"></span>
        <ButtonAnt round type="dashed">
          dashed
        </ButtonAnt>
        <span className="mr-4"></span>
        <ButtonAnt round type="link">
          link
        </ButtonAnt>
        <span className="mr-4"></span>
        <ButtonAnt round type="text">
          text
        </ButtonAnt>
      </div>
      <div className="flex items-center border-zinc-500 border-b py-2">
        <span className="mr-4">不可用状态</span>
        <ButtonAnt disabled>default</ButtonAnt>
        <span className="mr-4"></span>
        <ButtonAnt disabled type="outline">
          outline
        </ButtonAnt>
        <span className="mr-4"></span>
        <ButtonAnt disabled type="filled">
          filled
        </ButtonAnt>
        <span className="mr-4"></span>
        <ButtonAnt disabled type="dashed">
          dashed
        </ButtonAnt>
        <span className="mr-4"></span>
        <ButtonAnt disabled type="link">
          link
        </ButtonAnt>
        <span className="mr-4"></span>
        <ButtonAnt disabled type="text">
          text
        </ButtonAnt>
        <span className="mr-4"></span>
        <ButtonAnt disabled type="filled" ghost>
          disabled outline ghost
        </ButtonAnt>
      </div>

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
          // className={`${styles.rounded} ${styles.a}`}
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
