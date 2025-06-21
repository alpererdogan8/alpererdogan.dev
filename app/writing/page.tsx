import Card from '@/components/ui-server-components/components/card';
import { Suspense } from 'react';
import { parseStringPromise } from 'xml2js';
import Loading from './loading';

export const fetchCache = "force-no-store";
export const revalidate = 0; // seconds
export const dynamic = "force-dynamic";

const getMediumAPI = async (username: string): Promise<any> => {
  const response = await fetch(`https://medium.com/feed/@${username}`, {
    cache: 'no-cache',
  });
  const xmlData = await response.text();
  const jsonData: any = await parseStringPromise(xmlData);
  const posts = jsonData.rss?.channel[0]?.item;
  return posts.map((post: any) => {
    return {
      title: post['title'][0],
      url: post['link'][0],
      category: post['category'][0],
      author: post['dc:creator'][0],
      createdAt: post['pubDate'][0],
      content: post['content:encoded'][0],
    };
  });
};
/** title link category dc:creator pubDate content:encoded */
export default async function Blog() {
  const data = await getMediumAPI('alpererdogan8');
  const regex = /(<([^>]+)>)/gi;

  return (
    <Suspense fallback={<Loading />}>
      <div className="w-full flex flex-col gap-6">
        {data.map((content: any, key: number) => {
          return (
            <Card
              key={key}
              title={content.title}
              createdAt={content.createdAt}
              description={content.content.replace(regex, '')}
              url={content.url}
            />
          );
        })}
      </div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </Suspense>
  );
}
