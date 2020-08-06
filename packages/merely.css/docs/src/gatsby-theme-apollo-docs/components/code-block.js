import PropTypes from 'prop-types';
import React, {useRef} from 'react';
import styled from '@emotion/styled';
import useCopyToClipboard from 'react-use/lib/useCopyToClipboard';
import {Button} from '@apollo/space-kit/Button';
import { LivePreview, LiveProvider } from 'react-live'
import {
  GA_EVENT_CATEGORY_CODE_BLOCK,
} from 'gatsby-theme-apollo-docs/src/components/multi-code-block';
import {Select} from 'gatsby-theme-apollo-docs/src/components/select';
import {colors} from 'gatsby-theme-apollo-core';
import { CodeStringContext } from './template'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const Container = styled.div({
  marginBottom: '1.45rem',
  border: `1px solid ${colors.divider}`,
  borderRadius: 4
});

const Header = styled.div({
  position: 'relative',
  // alignItems: 'center',
  padding: `10px 15px`,
  borderBottom: `1px solid ${colors.divider}`
});

const StyledSelect = styled(Select)({
  marginRight: 8
});

const InnerContainer = styled.div({
  position: 'relative',
  padding: 15,
  backgroundColor: colors.background,
  overflow: 'auto'
});

const ButtonWrap = styled.div({
  position: 'absolute',
  top: '10px',
  right: '10px',
  zIndex: 9
})

export default function CodeBlock(props) {
  const asts = useContext(CodeStringContext)
  const [codeAst, updateCodeAst] = useState({})
  const code = useRef();
  const [copied, copyToClipboard] = useCopyToClipboard();

  function handleCopy() {
    if (typeof window.analytics !== 'undefined') {
      window.analytics.track('Copy', {
        category: GA_EVENT_CATEGORY_CODE_BLOCK
      });
    }

    copyToClipboard(code.current.innerText);
  }

  useEffect(() => {
    if (code) {
      const node = code.current.closest('.gatsby-highlight');
      const index = Array.prototype.indexOf.call(node.parentNode.childNodes, node);
      updateCodeAst(asts[index])
    }
  }, [code])

  return (
    <Container>
      <Header>
        <LiveProvider code={codeAst.value} language={codeAst.lang}>
          <LivePreview></LivePreview>
        </LiveProvider>
      </Header>
      <InnerContainer>
        <ButtonWrap>
          <Button feel="raised" size="small" onClick={handleCopy} size="small">
            {copied.value ? 'Copied!' : 'Copy'}
          </Button>
        </ButtonWrap>
        <pre className={props.className} ref={code}>
          {props.children}
        </pre>
      </InnerContainer>
    </Container>
  );
}

CodeBlock.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};
