import { useMask, useModal } from '@/components/Modal';
export default function ModalPage() {
  const { Mask, set: setVisible } = useMask();
  const { Mask: Mask2, set: setVisible2 } = useMask();

  const { Modal, set: setModalVisible } = useModal();
  return (
    <div className="h-screen p-5">
      <button onClick={() => setVisible(true)}>open mask</button>
      <hr />
      <button onClick={() => setVisible2(true)}>open mask2</button>
      <Mask>
        <h1 className="bg-white">mask count&apos;t close</h1>
        <button onClick={() => setVisible2(true)}>open mask2</button>
      </Mask>
      <Mask2 maskClosable>
        <h1 className="bg-white">mask closeable</h1>
      </Mask2>
      <hr />
      <button onClick={() => setModalVisible(true)}>open modal</button>
      <Modal title="超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长超长">
        <h2>haha</h2>
        <h2>haha</h2>
        <h2>haha</h2>
        <h2>haha</h2>
        <h2>haha</h2>
        <h2>haha</h2>
      </Modal>
    </div>
  );
}
