import HelloWorld from '../components/helloWorld'
import { UserButton } from '@clerk/nextjs'

export default function Home() {
  return (
    <div className={''}>
      <div className={'w-screen flex pr-4'}>
        <div className={'grow'}></div>
        <UserButton />
      </div>
      <div className={'flex flex-row pt-4 justify-center items-center'}>
        <div className={'w-96'}>
          <HelloWorld />
        </div>
      </div>
    </div>
  )
}
