import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { Spinner } from './icons'
import {
  color,
  space,
  radius,
  shadow,
  fontSize,
  fontWeight,
  lineHeight,
  easing,
} from './theme'

const StyledButton = styled.button`
  position: relative;
  font-family: inherit;
  font-weight: ${fontWeight.semiBold};
  text-align: center;
  border: none;
  padding: 0
    ${props =>
      props.square
        ? 0
        : props.icon && props.width === 'full'
        ? space[48]
        : space[24]};
  display: inline-flex;
  vertical-align: middle;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.24),
    rgba(255, 255, 255, 0)
  );
  line-height: ${lineHeight.solid};
  border-radius: ${props => (props.rounded ? space[32] : radius.md)};
  font-size: ${props => (props.size === 'small' ? fontSize[16] : fontSize[18])};
  width: ${props =>
    props.width === 'full'
      ? '100%'
      : props.square
      ? props.size === 'small'
        ? space[44]
        : space[56]
      : 'auto'};
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
  height: ${props => (props.size === 'small' ? space[44] : space[56])};
  transition: color 100ms ${easing.easeInOutCubic},
    background-color 100ms ${easing.easeInOutCubic},
    text-shadow 100ms ${easing.easeInOutCubic};
  ${props =>
    props.variant !== 'secondary' &&
    css`
      svg:not([aria-label='Spinner']) {
        filter: drop-shadow(${shadow.text});
      }
    `};
  ${props =>
    props.variant === 'primary' &&
    css`
      background-color: ${color.earth};
      color: white;
      text-shadow: ${shadow.text};
    `};
  ${props =>
    props.variant === 'secondary' &&
    css`
      background-color: ${props.active ? color.earth : color.skyLighter};
      color: ${props.active ? 'white' : color.earth};
      text-shadow: ${props.active ? shadow.text : 'none'};
    `};
  ${props =>
    props.variant === 'caution' &&
    css`
      background-color: #fff4f4;
      color: ${color.mars};
      text-shadow: none;
    `};
  ${props =>
    props.variant === 'inverted' &&
    css`
      text-shadow: none;
      background-color: white;
      color: ${color.earth};
      svg {
        filter: none;
      }
    `};
  ${props =>
    props.variant === 'success' &&
    css`
      color: white;
      background-color: ${color.titan};
      text-shadow: ${shadow.text};
    `};
  ${props =>
    props.variant === 'warning' &&
    css`
      color: white;
      background-color: ${color.sun};
      text-shadow: ${shadow.text};
    `};
  ${props =>
    props.variant === 'danger' &&
    css`
      color: white;
      background-color: ${color.mars};
      text-shadow: ${shadow.text};
    `};
  ${props =>
    props.variant === 'facebook' &&
    css`
      color: white;
      background-color: ${color.facebook};
      text-shadow: ${shadow.text};
    `};
  ${props =>
    props.disabled &&
    css`
      color: rgba(255, 255, 255, 0.6);
    `};
  ${props =>
    props.variant === 'secondary' &&
    props.disabled &&
    css`
      color: ${color.earthLighterAlpha};
    `};
  ${props =>
    props.variant === 'caution' &&
    props.disabled &&
    css`
      color: ${color.marsLighterAlpha};
    `};
  ${props =>
    props.variant === 'inverted' &&
    props.disabled &&
    css`
      background-color: white;
      color: ${color.earthLighter};
    `};
  &:focus {
    outline: 0;
    box-shadow: none;
  }
  &:focus::after {
    content: '';
    position: absolute;
    left: -1px;
    top: -1px;
    right: -1px;
    bottom: -1px;
    background-color: transparent;
    border-radius: ${props =>
      props.rounded ? space[32] : `calc(${radius.md} + 1px)`};
    box-shadow: 0 0 0 ${space[4]} ${color.earthFocusAlpha};
    pointer-events: none;
    ${props =>
      props.variant === 'success' &&
      css`
        box-shadow: 0 0 0 ${space[4]} ${color.titanFocusAlpha};
      `};
    ${props =>
      props.variant === 'caution' &&
      css`
        box-shadow: 0 0 0 ${space[4]} ${color.marsFocusAlpha};
      `};
    ${props =>
      props.variant === 'warning' &&
      css`
        box-shadow: 0 0 0 ${space[4]} ${color.sunFocusAlpha};
      `};
    ${props =>
      props.variant === 'danger' &&
      css`
        box-shadow: 0 0 0 ${space[4]} ${color.marsFocusAlpha};
      `};
    ${props =>
      props.variant === 'facebook' &&
      css`
        box-shadow: 0 0 0 ${space[4]} ${color.facebookFocusAlpha};
      `};
  }
  &:hover {
    ${props =>
      props.variant === 'primary' &&
      css`
        color: white;
        text-shadow: ${shadow.text};
        background-color: ${color.earthLight};
      `};
    ${props =>
      props.variant === 'secondary' &&
      css`
        background-color: ${props.active ? color.earthLight : color.sky};
        color: ${props.active ? 'white' : color.earth};
        text-shadow: ${props.active ? shadow.text : 'none'};
      `};
    ${props =>
      props.variant === 'caution' &&
      css`
        background-color: #fee9e9;
        color: ${color.mars};
        text-shadow: none;
      `};
    ${props =>
      props.variant === 'inverted' &&
      css`
        text-shadow: none;
        background-color: white;
        color: ${color.earthLight};
      `};
    ${props =>
      props.variant === 'success' &&
      css`
        background-color: ${color.titanLight};
      `};
    ${props =>
      props.variant === 'warning' &&
      css`
        background-color: ${color.sunLight};
      `};
    ${props =>
      props.variant === 'danger' &&
      css`
        background-color: ${color.marsLight};
      `};
    ${props =>
      props.variant === 'facebook' &&
      css`
        background-color: ${color.facebookLight};
      `};
    ${props =>
      props.disabled &&
      css`
        color: rgba(255, 255, 255, 0.6);
        background-color: ${color.earth};
      `};
    ${props =>
      props.variant === 'success' &&
      props.disabled &&
      css`
        background-color: ${color.titan};
      `};
    ${props =>
      props.variant === 'warning' &&
      props.disabled &&
      css`
        background-color: ${color.sun};
      `};
    ${props =>
      props.variant === 'danger' &&
      props.disabled &&
      css`
        background-color: ${color.mars};
      `};
    ${props =>
      props.variant === 'secondary' &&
      props.disabled &&
      css`
        color: ${color.earthLighterAlpha};
        background-color: ${color.skyLighter};
      `};
    ${props =>
      props.variant === 'caution' &&
      props.disabled &&
      css`
        color: ${color.marsLighterAlpha};
        background-color: #fff4f4;
      `};
    ${props =>
      props.variant === 'facebook' &&
      props.disabled &&
      css`
        background-color: ${color.facebook};
      `};
    ${props =>
      props.variant === 'inverted' &&
      props.disabled &&
      css`
        background-color: white;
        color: ${color.earthLighter};
      `};
  }
  &:active {
    outline: 0;
    ${props =>
      !props.disabled &&
      css`
        background-image: none;
        background-color: ${color.earthLight};
      `};
    ${props =>
      !props.disabled &&
      props.variant === 'secondary' &&
      css`
        background-color: ${props.active
          ? color.earthLight
          : color.earthLightestAlpha};
        color: ${props.active ? 'white' : color.earth};
        text-shadow: ${props.active ? shadow.text : 'none'};
      `};
    ${props =>
      !props.disabled &&
      props.variant === 'caution' &&
      css`
        background-color: ${color.marsLightest};
        color: ${color.mars};
        text-shadow: none;
      `};
    ${props =>
      !props.disabled &&
      props.variant === 'success' &&
      css`
        background-color: ${color.titanLight};
      `};
    ${props =>
      !props.disabled &&
      props.variant === 'warning' &&
      css`
        background-color: ${color.sunLight};
      `};
    ${props =>
      !props.disabled &&
      props.variant === 'danger' &&
      css`
        background-color: ${color.marsLight};
      `};
    ${props =>
      !props.disabled &&
      props.variant === 'facebook' &&
      css`
        background-color: ${color.facebookLight};
      `};
    ${props =>
      !props.disabled &&
      props.variant === 'inverted' &&
      css`
        color: ${color.earth};
        background-color: white;
      `};
  }
`

const Adornment = styled.span`
  margin-left: -${space[4]};
  margin-right: ${space[12]};
`

export const Button = React.forwardRef(
  ({ 
    children, 
    onClick, 
    loading, 
    // https://github.com/ReactTraining/react-router/blob/46701dc1450582979dd63311ca31dce55223b6a4/packages/react-router-dom/modules/Link.js#L101
    navigate, 
    ...props 
  }, ref) => (
    <StyledButton
      ref={ref}
      onClick={loading ? () => null : navigate ? navigate : onClick}
      isLoading={loading}
      {...props}
    >
      {loading || props.leftAdornment ? (
        <Adornment>
          {loading ? <Spinner size={24} /> : props.leftAdornment}
        </Adornment>
      ) : null}
      {children}
    </StyledButton>
  )
)

Button.defaultProps = {
  variant: 'primary',
}

Button.propTypes = {
  icon: PropTypes.string,
  loading: PropTypes.bool,
}