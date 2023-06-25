import Button from '@/components/Button';
import Header from '@/components/Header';

export default function Home() {
  return (
    <div className="h-screen">
      <img
        src="https://cdn.ds-or.com/web/bg2.jpg"
        alt=""
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
      <Header>
        <Button>登录</Button>
      </Header>
    </div>
  );
}
