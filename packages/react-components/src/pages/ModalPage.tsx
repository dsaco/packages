import { useMask } from '@/components/Modal';
export default function ModalPage() {
  const { Mask, set: setVisible } = useMask();
  const { Mask: Mask2, set: setVisible2 } = useMask({ duration: 3000 });
  return (
    <div className="h-screen p-5">
      <button onClick={() => setVisible(true)}>click</button>
      <button onClick={() => setVisible2(true)}>click</button>
      <Mask>
        <h1 className="bg-white">hello</h1>
        <button onClick={() => setVisible2(true)}>click</button>
      </Mask>
      <Mask2 maskClosable>
        <h1 className="bg-white">world</h1>
      </Mask2>
    </div>
  );
}
