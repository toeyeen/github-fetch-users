import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { Spinner, CloseRounded } from './icons'
import { VisuallyHidden } from './VisuallyHidden'
import {
  color,
  space,
  shadow,
  transition,
  fontSize,
  lineHeight,
  radius,
  device,
  fontWeight,
} from './theme'

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

export const fieldStyles = props => css`
  font-family: inherit;
  background-color: ${props.invalid ? color.marsLightestAlpha : color.stardust};
  border-radius: ${props.rounded ? space[32] : radius.md};
  width: 100%;
  font-size: ${fontSize[18]};
  line-height: ${props.as === 'textarea' ? lineHeight.copy : lineHeight.solid};
  height: ${props.as === 'textarea' ? 'auto' : space[56]};
  padding-top: ${props.as === 'textarea' ? space[12] : 0};
  padding-bottom: ${props.as === 'textarea' ? space[12] : 0};
  padding-left: ${props.leftAdornment ? space[48] : space[16]};
  padding-right: ${(props.value && props.value.length && props.onReset) ||
  props.isLoading ||
  props.rightAdornment
    ? space[48]
    : space[16]};
  color: ${color.space};
  box-shadow: none;
  border: 0;
  text-align: left;
  appearance: none;
  transition: box-shadow ${transition}, background-color ${transition};
  -webkit-font-smoothing: auto;
  ${props.as === 'textarea' &&
    css`
      resize: vertical;
      min-height: ${space[96]};
    `};
  &[type='search']::-webkit-search-decoration {
    appearance: none;
  }
  &[type='number']::-webkit-outer-spin-button,
  &[type='number']::-webkit-inner-spin-button,
  &[type='time']::-webkit-inner-spin-button,
  &[type='date']::-webkit-clear-button,
  &[type='date']::-webkit-inner-spin-button,
  &[type='date']::-webkit-calendar-picker-indicator {
    appearance: none;
    display: none;
  }
  &:focus,
  &.focus {
    outline: none;
    box-shadow: ${shadow.strong};
    background-color: ${props.invalid ? color.marsLightestAlpha : 'white'};
  }
  &::placeholder {
    color: ${color.spaceLight};
  }
  &.invalid {
    color: ${color.mars} !important;
  }
  &::-webkit-search-cancel-button {
    display: none;
  }
`

const Field = styled.input`
  ${fieldStyles};
`

export const Label = styled.label`
  position: relative;
  display: block;
`

export const LabelText = styled.span`
  display: inline-block;
  color: ${color.spaceMedium};
  margin-bottom: ${space[4]};
`

export const Adornment = styled.span`
  position: absolute;
  z-index: 1;
  top: 0;
  color: ${color.spaceMedium};
  left: ${props => (props.left ? 0 : 'auto')};
  right: ${props => (props.right ? 0 : 'auto')};
  bottom: 0;
  width: ${space[48]};
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transition: color ${transition};
  ${Label}:focus-within & {
    color: ${color.space};
  }
`

Adornment.defaultProps = { className: 'adornment' }

const ResetButton = styled.button`
  line-height: 0;
  opacity: 0.35;
  transition: opacity ${transition};
  &:hover,
  &:focus {
    opacity: 0.5;
    outline: 0;
  }
`

export const Help = styled.p`
  font-size: ${fontSize[14]};
  margin-bottom: 0;
  margin-top: ${6 / 16}rem;
  color: ${color.spaceLight};
  @media ${device.tablet} {
    font-size: ${fontSize[16]};
  }
`

export const InputMenu = styled.div`
  text-align: left;
  position: absolute;
  z-index: 2;
  left: 0;
  right: 0;
  top: calc(100% + ${space[4]});
  border-radius: ${radius.md};
  background-color: white;
  box-shadow: ${shadow.strong};
  overflow: hidden;
`

export const InputMenuFooter = styled.footer`
  text-align: right;
  padding: ${space[4]} ${space[16]};
  border-top: 1px solid ${color.spaceLightest};
`

export const InputMenuList = styled.ul`
  max-height: ${space[256]};
  margin: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 0;
`

const InputMenuItemContainer = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  z-index: 1;
  padding-left: ${props => (props.adornment ? space[48] : space[16])};
  padding-right: ${space[16]};
  min-height: ${space[56]};
  background-color: ${props => (props.highlighted ? color.stardust : 'white')};
  font-weight: ${props =>
    props.selected ? fontWeight.semiBold : fontWeight.regular};
  color: ${props => (props.selected ? color.earth : props.space)};
  cursor: pointer;
  transition: color ${transition};
  margin: 0;
  & + ${() => InputMenuItemContainer} {
    border-top: 1px solid ${color.spaceLightest};
  }
`

export const InputMenuItem = React.forwardRef(({ children, ...props }, ref) => (
  <InputMenuItemContainer {...props} ref={ref}>
    {props.adornment && <Adornment left>{props.adornment}</Adornment>}
    {children}
  </InputMenuItemContainer>
))

export const Input = React.forwardRef(
  ({ id, label, hideLabel, labelProps, validate, loading, ...props }, ref) => {
    const invalid =
      typeof validate === 'undefined'
        ? false
        : typeof validate === 'function'
        ? !validate(props.value)
        : !validate

    return (
      <Label htmlFor={!labelProps && id} {...labelProps}>
        {hideLabel ? (
          <VisuallyHidden>
            <LabelText>{label}</LabelText>
          </VisuallyHidden>
        ) : (
          <LabelText>{label}</LabelText>
        )}
        <InputWrapper>
          {props.leftAdornment ? (
            <Adornment left>{props.leftAdornment}</Adornment>
          ) : null}
          <Field
            ref={ref}
            id={id}
            invalid={invalid}
            isLoading={loading}
            {...props}
          />
          {loading ? (
            <Adornment right>
              <Spinner size={24} />
            </Adornment>
          ) : props.value && props.value.length && props.onReset ? (
            <Adornment right>
              <ResetButton
                onClick={props.onReset}
                type="button"
                data-testid="reset-button"
              >
                <CloseRounded size={16} />
              </ResetButton>
            </Adornment>
          ) : props.rightAdornment ? (
            <Adornment right>{props.rightAdornment}</Adornment>
          ) : null}
          {props.menu && props.menu}
        </InputWrapper>
        {props.help && <Help>{props.help}</Help>}
      </Label>
    )
  }
)

Input.defaultProps = {
  type: 'text',
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  hideLabel: PropTypes.bool,
  loading: PropTypes.bool,
  labelProps: PropTypes.object,
  leftAdornment: PropTypes.node,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  type: PropTypes.string,
  onChange: PropTypes.func,
  menu: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  validate: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  onReset: PropTypes.func,
  placeholder: PropTypes.string,
}