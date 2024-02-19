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
        <span className="mr-4">contained</span>
        <ButtonMui type="contained">默认</ButtonMui>
        &nbsp;&nbsp;&nbsp;
        <ButtonMui type="contained" color="primary">
          primary
        </ButtonMui>
        &nbsp;&nbsp;&nbsp;
        <ButtonMui type="contained" color="secondary">
          secondary
        </ButtonMui>
        &nbsp;&nbsp;&nbsp;
        <ButtonMui type="contained" color="#800080">
          #800080
        </ButtonMui>
        &nbsp;&nbsp;&nbsp;
        <ButtonMui type="contained" round>
          圆角
        </ButtonMui>
        &nbsp;&nbsp;&nbsp;
        <ButtonMui type="contained" disabled>
          不可用
        </ButtonMui>
      </div>
      <div className="flex items-center border-zinc-500 border-b py-2">
        <span className="mr-4">outlined</span>
        <ButtonMui type="outlined">默认</ButtonMui>
        &nbsp;&nbsp;&nbsp;
        <ButtonMui type="outlined" color="primary">
          primary
        </ButtonMui>
        &nbsp;&nbsp;&nbsp;
        <ButtonMui type="outlined" color="secondary">
          secondary
        </ButtonMui>
        &nbsp;&nbsp;&nbsp;
        <ButtonMui type="outlined" color="#800080">
          #800080
        </ButtonMui>
        &nbsp;&nbsp;&nbsp;
        <ButtonMui type="outlined" round>
          圆角
        </ButtonMui>
        &nbsp;&nbsp;&nbsp;
        <ButtonMui type="outlined" disabled>
          不可用
        </ButtonMui>
      </div>
      <div className="flex items-center border-zinc-500 border-b py-2">
        <span className="mr-4">text</span>
        <ButtonMui type="text">默认</ButtonMui>
        &nbsp;&nbsp;&nbsp;
        <ButtonMui type="text" color="primary">
          primary
        </ButtonMui>
        &nbsp;&nbsp;&nbsp;
        <ButtonMui type="text" color="secondary">
          secondary
        </ButtonMui>
        &nbsp;&nbsp;&nbsp;
        <ButtonMui type="text" color="#800080">
          #800080
        </ButtonMui>
        &nbsp;&nbsp;&nbsp;
        <ButtonMui type="text" round>
          圆角
        </ButtonMui>
        &nbsp;&nbsp;&nbsp;
        <ButtonMui type="text" disabled>
          不可用
        </ButtonMui>
      </div>
      <div className="flex items-center border-zinc-500 border-b py-2">
        <span className="mr-4">自定义遮罩颜色</span>
        <ButtonMui type="outlined" rippleColor="rgb(0 255 255 / 30%)">
          rgb(0 255 255 / 30%)
        </ButtonMui>
        &nbsp;&nbsp;&nbsp;
        <ButtonMui
          type="outlined"
          color="primary"
          rippleColor="rgb(255 0 0 / 30%)"
        >
          rgb(255 0 0 / 30%)
        </ButtonMui>
        &nbsp;&nbsp;&nbsp;
        <ButtonMui type="contained" color="secondary" rippleColor="#f009">
          #f009
        </ButtonMui>
        &nbsp;&nbsp;&nbsp;
        <ButtonMui
          type="outlined"
          color="#800080"
          rippleColor="#ff00ff99"
          round
        >
          #ff00ff99
        </ButtonMui>
      </div>
    </div>
  );
}
