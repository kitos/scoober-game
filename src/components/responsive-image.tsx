import * as React from 'react'

interface Props
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  name: string
}

let ResponsiveImage = ({ name, ...props }: Props) => (
  <img
    src={`/img/${name}.png`}
    srcSet={`/img/${name}.png, /img/${name}@2x.png 2x, /img/${name}@3x.png 3x`}
    {...props}
  />
)

export default ResponsiveImage
export { ResponsiveImage }
