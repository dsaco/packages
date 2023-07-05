import { Switch } from '@/components/Switch';
import { useState } from 'react';

export default function SwitchPage() {
  const [value1, setValue1] = useState(false);
  return (
    <div className="h-screen p-5">
      <Switch value={value1} onChange={setValue1} />
    </div>
  );
}
