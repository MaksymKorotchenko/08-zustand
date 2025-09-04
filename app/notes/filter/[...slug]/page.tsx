import { fetchNotes } from '@/lib/api';
import Notes from './Notes.client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

type Params = {
  params: Promise<{ slug: string[] }>;
};

export default async function App({ params }: Params) {
  const queryClient = new QueryClient();
  const { slug } = await params;
  const tag = slug[0];

  await queryClient.prefetchQuery({
    queryKey: ['notes', { search: '', page: 1, perPage: 12, tag }],
    queryFn: () => fetchNotes('', 1, 12, tag),
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Notes category={tag} />
      </HydrationBoundary>
    </div>
  );
}
