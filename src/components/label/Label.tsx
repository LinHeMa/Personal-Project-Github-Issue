import React from 'react';
import styled from 'styled-components';
import _ from 'lodash';
interface WrapperProps {
  borderColor?: string;
  color?: string;
  bgColor?: string;
  fontSize?: string;
  fontWeight?: string;
  isLight?: boolean;
  $labelColor?: string;
}

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '500')};
  padding: 0 7px;
  line-height: 18px;
  white-space: nowrap;
  color: ${(props) => (props.isLight ? props.color : '#000000')};
  background-color: ${(props) => props.bgColor};
  background-color: ${(props) => (props.$labelColor ? props.$labelColor : '')};
  border-radius: 2em;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) =>
    _.lowerCase(props.bgColor) === 'ffffff' ? '#d0d7de' : props.borderColor};
`;

interface LabelProps {
  text: string;
  borderColor?: string;
  color?: string;
  bgColor?: string;
  fontSize?: string;
  fontWeight?: string;
  isLight?: boolean;
  $labelColor?: string;
  $newName?: string;
  // $newDescription: string;
}

const Label = ({
  text,
  borderColor,
  color,
  bgColor,
  fontWeight,
  fontSize,
  isLight,
  $labelColor,
  $newName
}: LabelProps) => {
  return (
    <Wrapper
      borderColor={borderColor}
      color={color}
      bgColor={bgColor}
      fontWeight={fontWeight}
      fontSize={fontSize}
      isLight={isLight}
      $labelColor={$labelColor}
    >
      {$newName ? $newName : text}
    </Wrapper>
  );
};

export default Label;
