import Head from 'next/head'
import ArticleCard from '../components/ArticleCard'
import { allArticles } from 'contentlayer/generated';
import { select } from '../utils/select';

export default function Home({articles}) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
     <main>
     {articles.map(
            ({
              title,
              description,
              slug,
              image,
              category,
              publishedAt,
              readingTime,
            }) => (
              <ArticleCard
                key={slug}
                title={title}
                description={description}
                slug={slug}
                image={image}
                category={category}
                dateTime={publishedAt}
                date={publishedAt}
                readingTime={readingTime.text}
              />
            )
          )}

      </main>
    </div>
  )
}

export function getStaticProps() {
  const articles = allArticles
    .map((article) =>
      select(article, [
        'slug',
        'title',
        'description',
        'publishedAt',
        'readingTime',
        'author',
        'category',
        'image',
      ])
    )
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
    );

  return { props: { articles } };
}