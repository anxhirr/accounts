import { AnimatedLogoSvg } from '@/components/svg'

const Loading = () => {
  return (
    <div className='h-full w-full flex items-center justify-center'>
      <div className='w-24 sm:w-32'>
        <AnimatedLogoSvg />
      </div>
    </div>
  )
}

export { Loading }
