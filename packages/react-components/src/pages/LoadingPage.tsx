import { CircularProgress, LoadingCube } from '@/components/Loading';

import { WaveProgress } from '@/components/Progress/WaveProgress';

export default function LoadingPage() {
  return (
    <div className="h-screen p-5">
      {/* <CircularProgress /> */}
      <hr />
      {/* <LoadingCube /> */}
      <hr />
      <WaveProgress />
    </div>
  );
}
