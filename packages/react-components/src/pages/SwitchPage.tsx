import { SwitchAnt } from '@/components/Switch';
import { useState } from 'react';

export default function SwitchPage() {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [value, setValue] = useState(false);
  const [value1, setValue1] = useState(false);

  return (
    <div className="h-screen p-5">
      {/* <div className="flex items-center border-zinc-500 border-b py-2">
        <span className="mr-4">Disabled</span>
        <SwitchAnt checked={disabled} onChange={setDisabled} />
      </div>
      <div className="flex items-center border-zinc-500 border-b py-2">
        <span className="mr-4">Loading</span>
        <SwitchAnt checked={loading} onChange={setLoading} />
      </div> */}
      <div className="flex items-center border-zinc-500 border-b py-2">
        <SwitchAnt
          loading={loading}
          disabled={disabled}
          checked={value}
          onChange={setValue}
        />
      </div>
      {/* <div className="flex items-center border-zinc-500 border-b py-2">
        <SwitchAnt
          checked={value}
          onChange={setValue}
          loading={loading}
          disabled={disabled}
          checkedChildren="开启"
          unCheckedChildren="关闭"
        />
      </div>
      <div className="flex items-center border-zinc-500 border-b py-2">
        <SwitchAnt
          checked={value1}
          onChange={setValue1}
          loading={loading}
          disabled={disabled}
          checkedChildren="开启的"
          unCheckedChildren="关闭"
        />
      </div>
      <div className="flex items-center border-zinc-500 border-b py-2">
        <span className="mr-4">默认样式</span>
        <SwitchAnt
          checked={value1}
          onChange={setValue1}
          loading={loading}
          disabled={disabled}
        />
      </div>
      <div className="flex items-center border-zinc-500 border-b py-2">
        <span className="mr-4">设定高度30</span>
        <SwitchAnt
          checked={value1}
          onChange={setValue1}
          loading={loading}
          disabled={disabled}
          height={30}
        />
      </div>
      <div className="flex items-center border-zinc-500 border-b py-2">
        <span className="mr-4">设定宽度100 高度30</span>
        <SwitchAnt
          checked={value1}
          onChange={setValue1}
          loading={loading}
          disabled={disabled}
          width={100}
          height={30}
        />
      </div>
      <div className="flex items-center border-zinc-500 border-b py-2">
        <SwitchAnt
          checked={!value1}
          onChange={() => setValue1(!value1)}
          loading={loading}
          disabled={disabled}
          height={66}
          padding={6}
          checkedChildren="开启的"
          activeColor="#f00"
          unCheckedChildren={
            <span style={{ fontSize: 20, color: 'red' }}>关闭Children</span>
          }
        />
      </div> */}
    </div>
  );
}
