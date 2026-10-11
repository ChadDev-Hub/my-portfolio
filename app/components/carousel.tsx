

"use client";



type Props = {
    children: React.ReactNode
}

const Carousel = ({children}: Props) => {
  
  return (
    <>
     <article className="carousel ">
        {children}
      </article>
    </>
   
  )
}

export default Carousel