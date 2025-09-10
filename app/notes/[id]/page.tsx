import { fetchNoteById } from '@/lib/api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NoteAboutClient from './NoteDetails.client';

type NoteAboutProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: NoteAboutProps) {
  const { id } = await params;

  //   return {
  //     title: `${id} notes`,
  //     description: `Page with notes filtered by ${tag} caategory`,
  //     openGraph: {
  //       title: `${tag} notes`,
  //       description: `Page with notes filtered by ${tag} caategory`,
  //       url: ``,
  //       images: [
  //         {
  //           url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
  //           width: 1200,
  //           height: 650,
  //           alt: 'NoteHub page image',
  //         },
  //       ],
  //     },
  //   };
}

export default async function NoteAbout({ params }: NoteAboutProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteAboutClient />
      </HydrationBoundary>
    </div>
  );
}
