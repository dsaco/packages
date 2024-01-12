import {
  // useMask,
  // useModal,
  Modal as OModal,
  Mask,
} from '@/components/Modal';
import { useSpringValue, animated } from '@react-spring/web';
import { useEffect, useState } from 'react';

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
  return (
    <div className="h-screen p-5">
      <button onClick={() => setMaskVisible(true)}>open mask</button>
      <Mask
        visible={maskVisible}
        // onCancel={() => setMaskVisible(false)}
        maskColor="rgb(255 0 0 / 30%)"
        maskBlur={2}
        maskClosable
        className="asdfjklsdj"
      >
        <h1
          onClick={() => {
            setMaskVisible(false);
          }}
        >
          close
        </h1>
        <h1>sdfsfj</h1>
        <h1>sdfsfj</h1>
      </Mask>
      <OModal
        visible={v}
        onCancel={() => setv(false)}
        title="创建深深"
        maskClosable
        width={768}
        // destroyOnClose
      >
        <h1>sadkfjslkdjf</h1>
        <h1>sadkfjslkdjf</h1>
        <h1>sadkfjslkdjf</h1>
        <h1>sadkfjslkdjf</h1>
        <Item />
      </OModal>
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
