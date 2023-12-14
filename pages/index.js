import Head from 'next/head';
import Link from 'next/link';
import { get_sorted_contact_list} from '../lib/contacts_data';

// define a getStaticProps() function - this name is defined by next.js
export async function getStaticProps() {
  const all_data = await get_sorted_contact_list();
  console.log(all_data);

  return {
    props: { all_data },
    revalidate: 60
  };
}

export default function Home( {all_data}) {
    return (
      <>
        <Head>
            <title>Homepage</title>
        </Head>
  
        <h1 className='display-4'>This is a page</h1>

        <h3>This is a list of Products</h3>

        <div className='list-group'>
          {all_data.map(
              ({id, first_name}) => (
                <Link key={id} href={`/${id}`} className="list-group-item list-group-item-action list-group-item-info">
                  {first_name}
                </Link>
              )
            )
          }
        </div>
      </>
    );
  }