import { useState, useEffect, useRef } from 'react'
import Hello from '../components/hello'
import { UserButton } from '@clerk/nextjs'
import { supabase } from '../lib/supabaseClient'

export default function Home({ flavors }) {
  const [localFlavors, setLocalFlavors] = useState(flavors)
  const inputRef = useRef<HTMLInputElement>(null)

  async function fetchFlavors() {
    try {
      const { data, error } = await supabase.from('flavors').select()
      if (data) {
        setLocalFlavors(data.sort((a, b) => a.id - b.id))
      }
    } catch (error) {
      console.log({ error })
    } finally {
    }
  }

  async function addNewFlavor() {
    try {
      const { error } = await supabase
        .from('flavors')
        .insert({ name: inputRef.current.value, color: 'white' })
    } catch (error) {
      console.log({ error })
    } finally {
      fetchFlavors()
    }
  }

  function saveFlavor() {
    addNewFlavor()
    inputRef.current.value = '' // clear input
  }
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
            {localFlavors
              .sort((a, b) => a.id - b.id)
              .map((flavor) => (
                <Flavor
                  key={flavor.id}
                  flavor={flavor}
                  handleFetchFlavors={fetchFlavors}
                />
              ))}
          </ul>
          <div className={'p-4 flex flex-col'}>
            <label className={'p-2'}>Add Flavor</label>
            <input
              className={'px-2 py-1'}
              placeholder={'ice cream flavor'}
              ref={inputRef}
            />
            <button
              className={'my-4 bg-blue-300 hover: bg-blue-400'}
              onClick={() => saveFlavor()}
            >
              save flavor
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

type FlavorProps = {
  flavor: any
  handleFetchFlavors: () => void
}

function Flavor({ flavor, handleFetchFlavors }: FlavorProps) {
  const [showColorEdit, setShowColorEdit] = useState<boolean>(false)
  const [name, setName] = useState<string>(flavor.name)
  const [color, setColor] = useState<string>(flavor.color)

  useEffect(() => {
    updateFlavorName()
  }, [name])

  useEffect(() => {
    updateFlavorColor()
  }, [color])

  async function updateFlavorName() {
    try {
      const { error } = await supabase
        .from('flavors')
        .update({ name })
        .eq('id', flavor.id)
    } catch (error) {
      console.log({ error })
    } finally {
      handleFetchFlavors()
    }
  }

  async function updateFlavorColor() {
    try {
      const { error } = await supabase
        .from('flavors')
        .update({ color })
        .eq('id', flavor.id)
    } catch (error) {
      console.log({ error })
    } finally {
      handleFetchFlavors()
    }
  }

  async function deleteFlavor() {
    try {
      const { error } = await supabase
        .from('flavors')
        .delete()
        .eq('id', flavor.id)
    } catch (error) {
      console.log({ error })
    } finally {
      handleFetchFlavors()
    }
  }

  return (
    <li className={`flex ${flavor.color}`}>
      {showColorEdit ? (
        <div className={'flex'}>
          <div className={'grow flex'}>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <input value={color} onChange={(e) => setColor(e.target.value)} />
            <div
              className={'cursor-pointer hover:text-red-400'}
              onClick={() => deleteFlavor()}
            >
              delete
            </div>
          </div>
          <div onClick={() => setShowColorEdit(false)}>&times;</div>
        </div>
      ) : (
        <>
          <div className={'grow'}>{flavor.name}</div>
          <div onClick={() => setShowColorEdit(true)}>edit</div>
        </>
      )}
    </li>
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
