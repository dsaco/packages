import {
  // useMask,
  // useModal,
  Modal,
  Mask,
} from '@/components/Modal';
import { useSpringValue, animated } from '@react-spring/web';
import { useEffect, useRef, useState } from 'react';
import { useMask } from '@/components/Modal/Mask';
import { useModal } from '@/components/Modal/Modal';

const Item = () => {
  const [value, set] = useState('');
  return (
    <input type="text" value={value} onChange={(e) => set(e.target.value)} />
  );
};

export default function ModalPage() {
  // const { Mask, set: setVisible } = useMask();
  // const { Mask: Mask2, set: setVisible2 } = useMask({
  //   // color: 'rgba(0, 0, 255, 0.3)',
  //   // duration: 200,
  //   blur: 0,
  // });

  const [v, setv] = useState(false);
  const opacity = useSpringValue(0, {
    onRest(a: any) {
      if (a.value === 0.2) {
        // console.log('remove');
      }
    },
  });
  useEffect(() => {
    if (v) {
      opacity.start(0.8);
    } else {
      opacity.start(0.2);
    }
  }, [v]);

  // const { Modal, set: setModalVisible } = useModal();
  const [maskVisible, setMaskVisible] = useState(false);

  const maskRef = useRef<any>({});
  const [mmmm] = useMask();
  const [nnnn] = useModal();

  return (
    <div className="h-screen p-5">
      <button
        onClick={() => {
          mmmm.open();
        }}
      >
        open mask
      </button>
      <button
        onClick={() => {
          // maskRef.current?.open();
          // console.log(maskRef.current());
          // maskRef.current?.open();
          // mmmm.open();
          nnnn.open();
        }}
      >
        open modal
      </button>
      <Mask
        api={mmmm}
        // mmm={(open: any, close: any) => {
        //   maskRef.current.open = open;
        //   maskRef.current.close = close;
        // }}
        // visible={maskVisible}
        // onCancel={() => setMaskVisible(false)}
        maskColor="rgb(255 0 0 / 30%)"
        maskBlur={2}
        maskClosable
        className="asdfjklsdj"
        // contentScalable={false}
      >
        <h1
          onClick={() => {
            // setMaskVisible(false);
            // console.log(maskRef.current);
            // maskRef.current?.close();
            mmmm.close();
          }}
        >
          close
        </h1>
        <h1>sdfsfj</h1>
        <h1>sdfsfj</h1>
      </Mask>
      <Modal
        api={nnnn}
        // visible={v}
        // onCancel={() => setv(false)}
        title="创建深深"
        maskClosable
        width={768}
        // destroyOnClose
      >
        <h1>sadkfjslkdjf</h1>
        <h1>sadkfjslkdjf</h1>
        <h1>sadkfjslkdjf</h1>
        <h1>sadkfjslkdjf</h1>
        <h3 onClick={() => nnnn.close()}>close</h3>
        <Item />
      </Modal>
      <animated.div style={{ opacity, color: 'red' }}>SOME</animated.div>
      <button onClick={() => setv(false)}>0</button>
      <br />
      <button onClick={() => opacity.start(0.5)}>0.5</button>
      <br />
      <button onClick={() => setv(true)}>1</button>
      <br />

      {/* <button onClick={() => setVisible(true)}>open mask</button>
      <hr />
      <button onClick={() => setVisible2(true)}>open mask2</button> */}
      {/* <Mask>
        <h1 className="bg-white">mask count&apos;t close</h1>
        <button onClick={() => setVisible2(true)}>open mask2</button>
      </Mask>
      <Mask2 closable>
        <h1 className="bg-white">mask closeable</h1>
        <Item />
      </Mask2> */}
      <hr />
      {/* <button onClick={() => setModalVisible(true)}>open modal</button> */}
      {/* <Modal title="超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长">
        <h2>haha</h2>
        <h2>haha</h2>
        <h2>haha</h2>
        <h2>haha</h2>
        <h2>haha</h2>
        <h2>haha</h2>
      </Modal> */}
    </div>
  );
}
