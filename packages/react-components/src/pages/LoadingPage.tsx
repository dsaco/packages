import { CircularProgress, LoadingCube } from '@/components/Loading';

export default function LoadingPage() {
  return (
    <div className="h-screen p-5">
      <CircularProgress />
      <hr />
      <LoadingCube />
    </div>
  );
}
