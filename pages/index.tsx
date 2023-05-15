import Hello from '../components/hello'
import { UserButton } from '@clerk/nextjs'
import { supabase } from '../lib/supabaseClient'

export default function Home({ flavors }) {
  return (
    <div className={''}>
      <div className={'w-screen flex pr-4'}>
        <div className={'grow'}></div>
        <UserButton />
      </div>
      <div className={'flex flex-row pt-4 justify-center items-center'}>
        <div className={'w-96'}>
          <Hello />
          <ul className={'p-4'}>
            {flavors
              .sort((a, b) => a.id - b.id)
              .map((flavor) => (
                <li key={flavor.id}>{flavor.name}</li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  let { data } = await supabase.from('flavors').select()

  return {
    props: {
      flavors: data,
    },
  }
}
