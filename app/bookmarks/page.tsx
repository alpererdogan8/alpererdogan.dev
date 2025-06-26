import Card from '@/components/ui-server-components/components/card';
export const fetchCache = "force-no-store";
export const revalidate = 0; // seconds
export const dynamic = "force-dynamic";
const getBookmarks = async () => {
  const response = await fetch(
    `https://api.raindrop.io/rest/v1/raindrops/56941831`,
    {
      headers: {
        Authorization: `Bearer ${process.env.RAINDROP_ACCESS_TOKEN}`,
      },
      next: {
        revalidate: 0,
      },
    },
  );
  const data = await response.json();
  return [...data.items];
};

export default async function Bookmarks() {
  const bookmarks = await getBookmarks();
  /**
 * 
 * _id
link
title
excerpt
cover
created
 */
  return (
    <div className="flex flex-col gap-6  ">
      <div className="w-full flex flex-col gap-6">
        {bookmarks.map((item: any) => {
          return (
            <Card
              key={item._id}
              title={item.title}
              url={item.link}
              image={item.cover}
              createdAt={item.created}
              description={item.excerpt}
            />
          );
        })}
      </div>
    </div>
  );
}
