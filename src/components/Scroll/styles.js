import styled from 'styled-components'
import { ArrowDown as Down } from 'styled-icons/evil/ArrowDown'
import { Fire as Up } from 'styled-icons/remix-fill/Fire'

export const Arrow = styled(Down).attrs(({ direction, size }) => ({
  as: direction === `up` && Up,
  size,
}))`
  ${({ theme, show, size }) => `
  z-index: 2;
  background-color: transparent;
  color: #ff1600;
  border-radius: 50%;
  transition: all .3s;
  position: fixed;
  bottom: ${size};
  opacity: ${show ? 1 : 0};
  visibility: ${show ? `visible` : `hidden`};
  :hover {
    transform: scale(1.15);
  }
  right: ${size};`}
`