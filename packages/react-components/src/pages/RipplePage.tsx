import Ripple from '@/components/Ripple';

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
        <Ripple duration={1000} />
      </div>
    </div>
  );
}
