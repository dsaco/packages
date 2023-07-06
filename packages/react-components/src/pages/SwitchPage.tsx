import { Switch } from '@/components/Switch';
import { SwitchMove } from '@/components/Switch/SwitchAnt';
import { useState } from 'react';

export default function SwitchPage() {
  const [value1, setValue1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="h-screen p-5">
      <Switch.Ant checked={value1} onChange={setValue1} />
      <hr />
      <Switch.Ant checked={loading} onChange={setLoading} />
      Loading
      <hr />
      <Switch.Ant checked={disabled} onChange={setDisabled} />
      Disabled
      <hr />
      <Switch.Ant loading={loading} checked={true} onChange={setValue1} />
      <hr />
      <Switch.Ant disabled />
      <Switch.Ant disabled checked />
      <hr />
      --------------------
      <br />
      <SwitchMove
        checked={value1}
        onChange={setValue1}
        loading={loading}
        disabled={disabled}
        checkedChildren="开启的"
        unCheckedChildren={
          <span style={{ fontSize: 20, color: 'red' }}>关闭Children</span>
        }
      />
      <hr />
      <SwitchMove
        checked={value1}
        onChange={setValue1}
        loading={loading}
        disabled={disabled}
      />
      <hr />
      <SwitchMove
        checked={value1}
        onChange={setValue1}
        loading={loading}
        disabled={disabled}
        height={66}
        checkedChildren="开启的"
        unCheckedChildren={
          <span style={{ fontSize: 20, color: 'red' }}>关闭Children</span>
        }
      />
    </div>
  );
}
