import { Pagination } from '@/components/Pagination';

export default function PaginationPage() {
  return (
    <div className="h-screen p-5">
      <Pagination total={100} />
    </div>
  );
}
