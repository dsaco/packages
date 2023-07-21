import { Ripple } from '@/components';

export default function RipplePage() {
  return (
    <div className="h-screen p-5">
      <div
        style={{
          width: 200,
          height: 100,
          backgroundColor: '#eee',
          border: '1px solid #ddd',
          position: 'relative',
        }}
        onClick={() => {
          console.log('click');
        }}
      >
        <Ripple duration={300} />
      </div>
    </div>
  );
}
